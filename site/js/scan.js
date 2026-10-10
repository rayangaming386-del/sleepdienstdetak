// Sleepdienst De Tak — kenteken scannen van een foto.
// Wordt pas geladen als iemand op de camera-knop drukt. Alles gebeurt op het eigen apparaat
// met Tesseract.js (tekstherkenning); de foto wordt nergens naartoe gestuurd.
(function () {
  "use strict";

  var BASE = new URL("/js/vendor/tesseract/", location.href).href;
  var workerPromise = null;

  // Alle Nederlandse zijcodes met 6 tekens (L = letter, D = cijfer)
  var SIDECODES = ["LL-DD-DD", "DD-DD-LL", "DD-LL-DD", "LL-DD-LL", "LL-LL-DD", "DD-LL-LL", "DD-LLL-D", "D-LLL-DD",
    "LL-DDD-L", "L-DDD-LL", "LLL-DD-L", "L-DD-LLL", "D-LL-DDD", "DDD-LL-D"];
  var TO_DIGIT = { O: "0", Q: "0", D: "0", U: "0", I: "1", L: "1", T: "1", Z: "2", A: "4", S: "5", G: "6", B: "8" };
  var TO_LETTER = { "0": "D", "1": "J", "2": "Z", "4": "A", "5": "S", "6": "G", "7": "T", "8": "B" };

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function hasSimd() {
    try {
      return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
    } catch (e) {
      return false;
    }
  }

  function getWorker() {
    if (!workerPromise) {
      workerPromise = loadScript(BASE + "tesseract.min.js")
        .then(function () {
          return window.Tesseract.createWorker("eng", 1, {
            workerPath: BASE + "worker.min.js",
            corePath: BASE + (hasSimd() ? "tesseract-core-simd-lstm.js" : "tesseract-core-lstm.js"),
            langPath: BASE.replace(/\/$/, ""),
            workerBlobURL: false
          });
        })
        .then(function (worker) {
          return worker.setParameters({
            tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-",
            tessedit_pageseg_mode: "7"
          }).then(function () { return worker; });
        });
      workerPromise.catch(function () { workerPromise = null; });
    }
    return workerPromise;
  }

  function loadImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = reject;
      img.src = url;
    });
  }

  // Zoek gele, rechthoekige vlakken: Nederlandse kentekenplaten zijn geel
  function findPlates(img) {
    var scale = Math.min(1, 900 / Math.max(img.naturalWidth, img.naturalHeight));
    var w = Math.max(1, Math.round(img.naturalWidth * scale));
    var h = Math.max(1, Math.round(img.naturalHeight * scale));
    var c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    var ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    var d = ctx.getImageData(0, 0, w, h).data;
    var mask = new Uint8Array(w * h);
    for (var i = 0; i < w * h; i++) {
      var r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2];
      // Geel/oranjegeel op kleurtoon, zodat ook een plaat in de schaduw wordt gevonden
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      if (max < 70 || max - min < 0.5 * max || b !== min || g < 0.45 * r) continue;
      var hue = 60 * ((g - b) / (max - min));
      if (r !== max) hue = 60 * (2 + (b - r) / (max - min));
      if (hue >= 28 && hue <= 62) mask[i] = 1;
    }
    // Losse gaatjes (letters) dichten door een kleine horizontale "dilate"
    var grown = new Uint8Array(w * h);
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var on = 0;
        for (var k = -2; k <= 2 && !on; k++) {
          var xx = x + k;
          if (xx >= 0 && xx < w && mask[y * w + xx]) on = 1;
        }
        grown[y * w + x] = on;
      }
    }
    var seen = new Uint8Array(w * h);
    var comps = [];
    var stack = [];
    for (var p = 0; p < w * h; p++) {
      if (!grown[p] || seen[p]) continue;
      var minX = w, minY = h, maxX = 0, maxY = 0, count = 0;
      stack.push(p);
      seen[p] = 1;
      while (stack.length) {
        var q = stack.pop();
        var qx = q % w, qy = (q - qx) / w;
        count++;
        if (qx < minX) minX = qx;
        if (qx > maxX) maxX = qx;
        if (qy < minY) minY = qy;
        if (qy > maxY) maxY = qy;
        var nb = [q - 1, q + 1, q - w, q + w];
        for (var n = 0; n < 4; n++) {
          var t = nb[n];
          if (t < 0 || t >= w * h || seen[t] || !grown[t]) continue;
          if ((n === 0 && qx === 0) || (n === 1 && qx === w - 1)) continue;
          seen[t] = 1;
          stack.push(t);
        }
      }
      var bw = maxX - minX + 1, bh = maxY - minY + 1;
      var aspect = bw / bh;
      var fill = count / (bw * bh);
      if (count < 120 || aspect < 1.6 || aspect > 9 || fill < 0.35) continue;
      var shape = 1 / (1 + Math.abs(Math.log(aspect / 4.3)));
      comps.push({ x: minX / scale, y: minY / scale, w: bw / scale, h: bh / scale, score: Math.sqrt(count) * shape * fill });
    }
    comps.sort(function (a, b) { return b.score - a.score; });
    return comps.slice(0, 4);
  }

  function isYellow(r, g, b) {
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max < 70 || max - min < 0.5 * max || b !== min || g < 0.45 * r) return false;
    var hue = r === max ? 60 * ((g - b) / (max - min)) : 60 * (2 + (b - r) / (max - min));
    return hue >= 28 && hue <= 62;
  }

  // Uitsnede rechtzetten en omzetten naar zwarte letters op wit:
  // alles wat geel is wordt wit, de rest (de letters) zwart.
  function prepare(img, box) {
    var pad = Math.max(box.w, box.h) * 0.25;
    var sx = Math.max(0, box.x - pad), sy = Math.max(0, box.y - pad);
    var sw = Math.min(img.naturalWidth - sx, box.w + pad * 2), sh = Math.min(img.naturalHeight - sy, box.h + pad * 2);
    var k = 160 / box.h;
    var W = Math.round(sw * k), H = Math.round(sh * k);
    var a = document.createElement("canvas");
    a.width = W; a.height = H;
    var actx = a.getContext("2d", { willReadFrequently: true });
    actx.imageSmoothingQuality = "high";
    actx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);

    // Scheefstand meten: lijn door het midden van het gele vlak per kolom
    var d = actx.getImageData(0, 0, W, H).data;
    var xs = [], ys = [];
    for (var x = 0; x < W; x += 2) {
      var sum = 0, n = 0;
      for (var y = 0; y < H; y++) {
        var i = (y * W + x) * 4;
        if (isYellow(d[i], d[i + 1], d[i + 2])) { sum += y; n++; }
      }
      if (n > 10) { xs.push(x); ys.push(sum / n); }
    }
    var angle = 0;
    if (xs.length > 10) {
      var mx = 0, my = 0;
      for (var j = 0; j < xs.length; j++) { mx += xs[j]; my += ys[j]; }
      mx /= xs.length; my /= ys.length;
      var num = 0, den = 0;
      for (var q = 0; q < xs.length; q++) { num += (xs[q] - mx) * (ys[q] - my); den += (xs[q] - mx) * (xs[q] - mx); }
      if (den) angle = Math.atan(num / den);
      if (Math.abs(angle) > 0.5) angle = 0;
    }

    var b = document.createElement("canvas");
    b.width = W; b.height = H;
    var bctx = b.getContext("2d", { willReadFrequently: true });
    bctx.translate(W / 2, H / 2);
    bctx.rotate(-angle);
    bctx.drawImage(a, -W / 2, -H / 2);
    var px = bctx.getImageData(0, 0, W, H).data;

    // Strakke rand om het gele vlak (rijen/kolommen met genoeg geel)
    var rows = new Array(H).fill(0), cols = new Array(W).fill(0);
    var yel = new Uint8Array(W * H);
    for (var t = 0; t < W * H; t++) {
      if (isYellow(px[t * 4], px[t * 4 + 1], px[t * 4 + 2])) { yel[t] = 1; rows[(t / W) | 0]++; cols[t % W]++; }
    }
    var maxRow = Math.max.apply(null, rows), maxCol = Math.max.apply(null, cols);
    var top = rows.findIndex(function (v) { return v > maxRow * 0.35; });
    var bottom = H - 1 - rows.slice().reverse().findIndex(function (v) { return v > maxRow * 0.35; });
    var left = cols.findIndex(function (v) { return v > maxCol * 0.25; });
    var right = W - 1 - cols.slice().reverse().findIndex(function (v) { return v > maxCol * 0.25; });
    if (top < 0 || left < 0 || bottom <= top || right <= left) { top = 0; left = 0; bottom = H - 1; right = W - 1; }

    var cw = right - left + 1, ch = bottom - top + 1, border = 24;
    var c = document.createElement("canvas");
    c.width = cw + border * 2;
    c.height = ch + border * 2;
    var ctx = c.getContext("2d");
    var out = ctx.createImageData(c.width, c.height);
    for (var o = 0; o < out.data.length; o++) out.data[o] = 255;
    for (var yy = 0; yy < ch; yy++) {
      for (var xx = 0; xx < cw; xx++) {
        var si = (top + yy) * W + (left + xx);
        // Donker en niet geel = letter
        var lum = px[si * 4] * 0.3 + px[si * 4 + 1] * 0.59 + px[si * 4 + 2] * 0.11;
        var black = !yel[si] && lum < 140;
        if (black) {
          var oi = ((yy + border) * c.width + (xx + border)) * 4;
          out.data[oi] = out.data[oi + 1] = out.data[oi + 2] = 0;
        }
      }
    }
    ctx.putImageData(out, 0, 0);
    return c;
  }

  // Zoek in herkende tekst naar iets dat op een Nederlands kenteken lijkt
  function extractPlate(text) {
    var lines = String(text || "").toUpperCase().split(/\n+/);
    var best = null;
    for (var l = 0; l < lines.length; l++) {
      var compact = lines[l].replace(/[^A-Z0-9]/g, "");
      // Groepjes zoals de streepjes ze laten zien, bijv. V-073-2G -> 1,3,2
      var groups = lines[l].split(/[^A-Z0-9]+/).filter(Boolean).map(function (g) { return g.length; }).join(",");
      for (var start = 0; start + 6 <= compact.length; start++) {
        var win = compact.substr(start, 6);
        for (var s = 0; s < SIDECODES.length; s++) {
          var code = SIDECODES[s].replace(/-/g, ""), out = "", fixes = 0, ok = true;
          for (var c = 0; c < 6 && ok; c++) {
            var ch = win[c];
            var wantDigit = code[c] === "D";
            var isDigit = ch >= "0" && ch <= "9";
            if (wantDigit === isDigit) out += ch;
            else if (wantDigit && TO_DIGIT[ch]) { out += TO_DIGIT[ch]; fixes++; }
            else if (!wantDigit && TO_LETTER[ch]) { out += TO_LETTER[ch]; fixes++; }
            else ok = false;
          }
          // Minste correcties wint; een volledige regel van precies 6 tekens telt extra mee
          var penalty = fixes + (compact.length === 6 ? 0 : 0.5);
          // Kloppen de streepjes met deze zijcode? Dan is dit vrijwel zeker de juiste
          if (groups === SIDECODES[s].split("-").map(function (g) { return g.length; }).join(",")) penalty -= 1.5;
          if (ok && (!best || penalty < best.penalty)) best = { plate: out, penalty: penalty };
        }
      }
    }
    return best && best.penalty <= 2.5 ? best.plate : null;
  }

  function read(file, onProgress) {
    var img;
    return loadImage(file)
      .then(function (i) {
        img = i;
        if (onProgress) onProgress("load");
        return getWorker();
      })
      .then(function (worker) {
        if (onProgress) onProgress("read");
        var boxes = findPlates(img);
        var attempt = function (idx) {
          if (idx >= boxes.length) return Promise.resolve(null);
          return worker.recognize(prepare(img, boxes[idx])).then(function (res) {
            return extractPlate(res.data.text) || attempt(idx + 1);
          });
        };
        return attempt(0).then(function (plate) {
          if (plate) return plate;
          // Geen geel vlak gevonden: probeer de hele foto
          var c = document.createElement("canvas");
          var sc = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
          c.width = Math.round(img.naturalWidth * sc);
          c.height = Math.round(img.naturalHeight * sc);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          return worker.setParameters({ tessedit_pageseg_mode: "11" })
            .then(function () { return worker.recognize(c); })
            .then(function (res) {
              return worker.setParameters({ tessedit_pageseg_mode: "7" }).then(function () {
                return extractPlate(res.data.text);
              });
            });
        });
      })
      .finally(function () {
        if (img && img.src) URL.revokeObjectURL(img.src);
      });
  }

  window.DeTakScan = { read: read, extractPlate: extractPlate };
})();
