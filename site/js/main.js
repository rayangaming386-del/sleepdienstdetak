// Sleepdienst De Tak — menu, aanvraagformulier, kentekencheck (RDW), kentekenscan en WhatsApp
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "31644556674";
  var EMAIL = "info@sleepdienstdetak.nl";
  // Optioneel: vul hier een adres in (bijv. van Formspree of Getform) om elke aanvraag
  // ook per e-mail te ontvangen. Leeg laten = alleen WhatsApp.
  var FORM_ENDPOINT = "";
  // Open data van de RDW (gratis, geen sleutel nodig)
  var RDW_VOERTUIG = "https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=";
  var RDW_BRANDSTOF = "https://opendata.rdw.nl/resource/8ys7-d773.json?kenteken=";

  var lang = (document.documentElement.lang || "nl").slice(0, 2);
  var STRINGS = {
    nl: {
      titles: { pech: "Pechmelding", offerte: "Offerte-aanvraag autotransport", verkoop: "Auto aanbieden" },
      via: "via de website",
      vehicle: "Voertuig", name: "Naam", phone: "Telefoon", plate: "Kenteken", car: "Auto", data: "Gegevens",
      problem: "Probleem", location: "Locatie", gps: "Mijn GPS-locatie", accuracy: "nauwkeurig tot ca.",
      pickup: "Ophalen", dropoff: "Afleveren", date: "Datum", state: "Staat", km: "Kilometerstand", place: "Plaats", note: "Opmerking",
      lookup: "Kenteken opzoeken bij de RDW...",
      notFound: "Kenteken niet gevonden. Vul hieronder zelf het merk en model in.",
      lookupFail: "Opzoeken lukt nu niet. Vul hieronder zelf het merk en model in.",
      geoNo: "Je telefoon kan geen locatie delen. Typ het adres of de hectometerpaal.",
      geoBusy: "Locatie zoeken...",
      geoOk: "Locatie gevonden, nauwkeurig tot ongeveer {m} meter.",
      geoFail: "Locatie niet gevonden. Sta locatie toe of typ waar je bent.",
      required: "Vul de rood gemarkeerde velden in.",
      badPhone: "Vul een geldig telefoonnummer in.",
      scanLoad: "Scanner laden, even geduld...",
      scanRead: "Kenteken lezen...",
      scanOk: "Gevonden: {p}. Controleer even of dit klopt.",
      scanFail: "Kenteken niet herkend. Maak een scherpe foto van dichtbij, of typ het kenteken in.",
      scanErr: "Scannen lukt niet op dit apparaat. Typ het kenteken in.",
      sent: "Je WhatsApp-bericht staat klaar. Druk in WhatsApp nog op verzenden."
    },
    en: {
      titles: { pech: "Breakdown report", offerte: "Car transport quote request", verkoop: "Car for sale" },
      via: "via the website",
      vehicle: "Vehicle", name: "Name", phone: "Phone", plate: "Licence plate", car: "Car", data: "Details",
      problem: "Problem", location: "Location", gps: "My GPS location", accuracy: "accurate to approx.",
      pickup: "Pick-up", dropoff: "Delivery", date: "Date", state: "Condition", km: "Mileage", place: "Location", note: "Note",
      lookup: "Looking up the plate...",
      notFound: "Plate not found. Please enter the make and model below.",
      lookupFail: "Lookup is not available right now. Please enter the make and model below.",
      geoNo: "Your phone cannot share its location. Please type the address.",
      geoBusy: "Finding your location...",
      geoOk: "Location found, accurate to about {m} metres.",
      geoFail: "Location not found. Allow location access or type where you are.",
      required: "Please fill in the fields marked in red.",
      badPhone: "Please enter a valid phone number.",
      scanLoad: "Loading the scanner, please wait...",
      scanRead: "Reading the plate...",
      scanOk: "Found: {p}. Please check that this is correct.",
      scanFail: "Plate not recognised. Take a sharp close-up photo, or type the plate.",
      scanErr: "Scanning does not work on this device. Please type the plate.",
      sent: "Your WhatsApp message is ready. Press send in WhatsApp."
    },
    de: {
      titles: { pech: "Pannenmeldung", offerte: "Angebotsanfrage Autotransport", verkoop: "Auto zum Verkauf" },
      via: "über die Website",
      vehicle: "Fahrzeug", name: "Name", phone: "Telefon", plate: "Kennzeichen", car: "Auto", data: "Daten",
      problem: "Problem", location: "Standort", gps: "Mein GPS-Standort", accuracy: "Genauigkeit ca.",
      pickup: "Abholung", dropoff: "Lieferung", date: "Datum", state: "Zustand", km: "Kilometerstand", place: "Ort", note: "Bemerkung",
      lookup: "Kennzeichen wird gesucht...",
      notFound: "Kennzeichen nicht gefunden. Bitte Marke und Modell unten eintragen.",
      lookupFail: "Suche derzeit nicht möglich. Bitte Marke und Modell unten eintragen.",
      geoNo: "Ihr Telefon kann den Standort nicht teilen. Bitte Adresse eingeben.",
      geoBusy: "Standort wird gesucht...",
      geoOk: "Standort gefunden, Genauigkeit ca. {m} Meter.",
      geoFail: "Standort nicht gefunden. Standortzugriff erlauben oder Ort eingeben.",
      required: "Bitte die rot markierten Felder ausfüllen.",
      badPhone: "Bitte eine gültige Telefonnummer eingeben.",
      scanLoad: "Scanner wird geladen, bitte warten...",
      scanRead: "Kennzeichen wird gelesen...",
      scanOk: "Gefunden: {p}. Bitte prüfen, ob es stimmt.",
      scanFail: "Kennzeichen nicht erkannt. Bitte ein scharfes Foto aus der Nähe machen oder eintippen.",
      scanErr: "Scannen funktioniert auf diesem Gerät nicht. Bitte Kennzeichen eintippen.",
      sent: "Ihre WhatsApp-Nachricht ist bereit. Bitte in WhatsApp auf Senden tippen."
    }
  };
  var S = STRINGS[lang] || STRINGS.nl;

  // ---------- Header ----------
  var header = document.querySelector(".site-header");
  var floatWa = document.querySelector(".float-wa");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
    if (floatWa) floatWa.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  function closeNav() {
    if (!nav) return;
    nav.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
  }

  // Dropdown "Diensten": op mobiel openklappen met een tik, op desktop ook met toetsenbord
  document.querySelectorAll(".nav-sub-toggle").forEach(function (btn) {
    var item = btn.closest(".has-sub");
    btn.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!item.contains(e.target)) {
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  var form = document.getElementById("aanvraag-form");
  if (!form) return;

  // ---------- Tabbladen ----------
  var tabs = form.querySelectorAll(".tab");
  var indicator = form.querySelector(".tab-indicator");
  var formError = document.getElementById("form-error");
  var urlType = (location.search.match(/[?&]type=(pech|offerte|verkoop)/) || [])[1];
  var type = urlType || form.getAttribute("data-default-type") || "pech";

  function setType(next) {
    type = next;
    tabs.forEach(function (tab, i) {
      var active = tab.getAttribute("data-type") === next;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      if (active && indicator) indicator.style.transform = "translateX(" + (i * 100) + "%)";
    });
    form.querySelectorAll("[data-show]").forEach(function (el) {
      el.hidden = el.getAttribute("data-show").split(" ").indexOf(next) === -1;
    });
    form.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });
    formError.textContent = "";
    document.dispatchEvent(new CustomEvent("detak:tab", { detail: next }));
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { setType(tab.getAttribute("data-type")); });
  });

  // Links als "Offerte aanvragen" openen direct het juiste tabblad
  document.querySelectorAll("[data-tab-link]").forEach(function (link) {
    link.addEventListener("click", function () { setType(link.getAttribute("data-tab-link")); });
  });

  // ---------- Kenteken ----------
  var plateInput = document.getElementById("kenteken");
  var vehicleBox = document.getElementById("vehicle");
  var modelField = document.getElementById("field-model");
  var vehicle = null;
  var lookupTimer = null;
  var lastLookup = "";

  function cleanPlate(value) {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  }

  // Zet streepjes op de plek van een wissel tussen letters en cijfers (V073ZG -> V-073-ZG)
  function formatPlate(raw) {
    var groups = raw.match(/[A-Z]+|[0-9]+/g) || [];
    if (raw.length === 6 && groups.length === 2) {
      // Oude notatie zoals AB-12-34 of 12-34-AB
      var long = groups[0].length === 4 ? 0 : 1;
      var g = groups[long];
      groups.splice(long, 1, g.slice(0, 2), g.slice(2));
    }
    return groups.join("-");
  }

  function titleCase(s) {
    return (s || "").toLowerCase().replace(/(^|[\s-])\S/g, function (c) { return c.toUpperCase(); });
  }

  // Merk en model: korte afkortingen (BMW, GTI, AMG) blijven in hoofdletters
  function nameCase(s) {
    return (s || "").split(" ").map(function (w) {
      return w.length <= 3 ? w.toUpperCase() : titleCase(w);
    }).join(" ");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function showVehicle(state, html) {
    vehicleBox.hidden = false;
    vehicleBox.className = "vehicle " + state;
    vehicleBox.innerHTML = html;
    document.dispatchEvent(new CustomEvent("detak:vehicle", { detail: state }));
  }

  function lookup(raw) {
    lastLookup = raw;
    vehicle = null;
    showVehicle("loading", '<span class="spinner" aria-hidden="true"></span>' + S.lookup);

    var getJson = function (url) {
      return fetch(url + encodeURIComponent(raw)).then(function (r) {
        if (!r.ok) throw new Error("RDW " + r.status);
        return r.json();
      });
    };

    Promise.all([getJson(RDW_VOERTUIG), getJson(RDW_BRANDSTOF).catch(function () { return []; })])
      .then(function (res) {
        if (raw !== lastLookup) return; // er is intussen iets anders getypt
        var v = res[0][0];
        if (!v) {
          modelField.hidden = false;
          showVehicle("notfound", S.notFound);
          return;
        }
        var fuel = (res[1] || []).map(function (f) { return titleCase(f.brandstof_omschrijving); })
          .filter(Boolean).join(" / ");
        var d = v.datum_eerste_toelating || "";
        vehicle = {
          merk: nameCase(v.merk),
          model: nameCase(v.handelsbenaming),
          kleur: titleCase(v.eerste_kleur && v.eerste_kleur !== "N.v.t." ? v.eerste_kleur : ""),
          bouwjaar: d.slice(0, 4),
          brandstof: fuel,
          soort: titleCase(v.voertuigsoort),
          gewicht: v.massa_ledig_voertuig ? v.massa_ledig_voertuig + " kg" : ""
        };
        modelField.hidden = true;
        // Soort voertuig alvast goed zetten op basis van de RDW
        var select = form.elements.voertuig;
        var soort = (v.voertuigsoort || "").toLowerCase();
        var idx = soort.indexOf("bedrijfsauto") > -1 ? 1 : soort.indexOf("motor") > -1 || soort.indexOf("bromfiets") > -1 ? 3 : soort.indexOf("kampeer") > -1 ? 2 : soort.indexOf("personenauto") > -1 ? 0 : -1;
        if (select && idx > -1) select.selectedIndex = idx;
        var specs = [vehicle.bouwjaar, vehicle.kleur, vehicle.brandstof, vehicle.gewicht]
          .filter(Boolean).map(function (s) { return "<li>" + escapeHtml(s) + "</li>"; }).join("");
        showVehicle("found",
          '<span class="vehicle-name">' + escapeHtml(vehicle.merk + " " + vehicle.model) + "</span>" +
          escapeHtml(formatPlate(raw) + (vehicle.soort ? " · " + vehicle.soort : "")) +
          (specs ? '<ul class="vehicle-specs">' + specs + "</ul>" : ""));
      })
      .catch(function () {
        if (raw !== lastLookup) return;
        modelField.hidden = false;
        showVehicle("notfound", S.lookupFail);
      });
  }

  function onPlateInput() {
    var raw = cleanPlate(plateInput.value);
    // Alleen Nederlandse kentekens (6 tekens) krijgen automatisch streepjes;
    // een buitenlands kenteken blijft zoals het is getypt
    var typed = plateInput.value.toUpperCase();
    var formatted = raw.length <= 6 ? formatPlate(raw) : typed;
    if (plateInput.value !== formatted) plateInput.value = formatted;
    clearTimeout(lookupTimer);
    if (raw.length === 6) {
      if (raw !== lastLookup) lookupTimer = setTimeout(function () { lookup(raw); }, 250);
    } else {
      lastLookup = "";
      vehicle = null;
      vehicleBox.hidden = true;
      if (!raw) modelField.hidden = true;
      // Buitenlands of afwijkend kenteken: laat zelf merk en model invullen
      if (raw.length > 6) modelField.hidden = false;
    }
  }

  function setPlate(value) {
    plateInput.value = value;
    onPlateInput();
  }

  if (plateInput) plateInput.addEventListener("input", onPlateInput);

  // ---------- Kenteken scannen met de camera ----------
  var scanInput = document.getElementById("scan-input");
  var scanStatus = document.getElementById("scan-status");
  var scanBtn = scanInput ? scanInput.closest(".scan-btn") : null;
  var scanLoading = null;

  function setScan(text, cls) {
    scanStatus.hidden = !text;
    scanStatus.textContent = text || "";
    scanStatus.className = "hint" + (cls ? " " + cls : "");
  }

  function loadScanner() {
    if (window.DeTakScan) return Promise.resolve(window.DeTakScan);
    if (!scanLoading) {
      scanLoading = new Promise(function (resolve, reject) {
        var s = document.createElement("script");
        s.src = "/js/scan.js";
        s.onload = function () { resolve(window.DeTakScan); };
        s.onerror = function () { scanLoading = null; reject(new Error("scan.js")); };
        document.head.appendChild(s);
      });
    }
    return scanLoading;
  }

  if (scanInput) {
    scanInput.addEventListener("change", function () {
      var file = scanInput.files && scanInput.files[0];
      scanInput.value = "";
      if (!file) return;
      scanBtn.classList.add("busy");
      setScan(S.scanLoad);
      loadScanner()
        .then(function (scanner) {
          return scanner.read(file, function (step) { if (step === "read") setScan(S.scanRead); });
        })
        .then(function (plate) {
          if (plate) {
            setPlate(plate);
            setScan(S.scanOk.replace("{p}", formatPlate(plate)), "ok");
          } else {
            setScan(S.scanFail, "err");
            plateInput.focus();
          }
        })
        .catch(function () { setScan(S.scanErr, "err"); })
        .then(function () { scanBtn.classList.remove("busy"); });
    });
  }

  // ---------- Snelstart vanuit de hero ----------
  var quickPlate = document.getElementById("quick-plate");
  if (quickPlate) {
    quickPlate.addEventListener("input", function () {
      var formatted = formatPlate(cleanPlate(quickPlate.value));
      if (quickPlate.value !== formatted) quickPlate.value = formatted;
    });
    document.querySelectorAll("[data-quick]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setType(btn.getAttribute("data-quick"));
        if (cleanPlate(quickPlate.value)) setPlate(quickPlate.value);
        document.getElementById("aanvragen").scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(function () {
          var next = cleanPlate(quickPlate.value) ? document.getElementById("naam") : plateInput;
          next.focus({ preventScroll: true });
        }, 700);
      });
    });
    quickPlate.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        document.querySelector('[data-quick="offerte"]').click();
      }
    });
  }

  // ---------- Locatie ----------
  var geoBtn = document.getElementById("geo-btn");
  var geoStatus = document.getElementById("geo-status");
  var locInput = document.getElementById("locatie");
  var coords = null;

  function setStatus(text, cls) {
    geoStatus.textContent = text;
    geoStatus.className = "hint" + (cls ? " " + cls : "");
  }

  if (geoBtn) {
    geoBtn.addEventListener("click", function () {
      if (!("geolocation" in navigator)) {
        setStatus(S.geoNo, "err");
        return;
      }
      setStatus(S.geoBusy);
      geoBtn.disabled = true;
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          coords = {
            lat: pos.coords.latitude.toFixed(6),
            lng: pos.coords.longitude.toFixed(6),
            acc: Math.max(1, Math.round(pos.coords.accuracy))
          };
          locInput.value = S.gps + " (" + coords.lat + ", " + coords.lng + ")";
          locInput.removeAttribute("aria-invalid");
          setStatus(S.geoOk.replace("{m}", coords.acc), "ok");
          geoBtn.disabled = false;
        },
        function () {
          setStatus(S.geoFail, "err");
          geoBtn.disabled = false;
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
      );
    });

    locInput.addEventListener("input", function () {
      if (coords && locInput.value.indexOf(coords.lat) === -1) {
        coords = null;
        setStatus("");
      }
    });
  }

  // ---------- Bericht opbouwen ----------
  var mailLink = document.getElementById("mail-fallback");

  function val(name) {
    var el = form.elements[name];
    return el ? el.value.trim() : "";
  }

  function vehicleLines() {
    var lines = [];
    var plate = cleanPlate(val("kenteken"));
    if (plate) lines.push(S.plate + ": " + (plate.length === 6 ? formatPlate(plate) : val("kenteken").toUpperCase()));
    if (vehicle) {
      lines.push(S.car + ": " + vehicle.merk + " " + vehicle.model + (vehicle.bouwjaar ? " (" + vehicle.bouwjaar + ")" : ""));
      var extra = [vehicle.kleur, vehicle.brandstof, vehicle.gewicht].filter(Boolean).join(", ");
      if (extra) lines.push(S.data + ": " + extra);
    } else if (val("model")) {
      lines.push(S.car + ": " + val("model"));
    }
    return lines;
  }

  function buildMessage() {
    var lines = [S.titles[type] + " " + S.via, ""];
    lines.push(S.name + ": " + val("naam"));
    lines.push(S.phone + ": " + val("telefoon"));
    lines = lines.concat(vehicleLines());
    lines.push(S.vehicle + ": " + val("voertuig"));

    if (type === "pech") {
      lines.push(S.problem + ": " + val("hulp"));
      lines.push(coords
        ? S.location + ": https://maps.google.com/?q=" + coords.lat + "," + coords.lng + " (" + S.accuracy + " " + coords.acc + " m)"
        : S.location + ": " + val("locatie"));
    } else if (type === "offerte") {
      lines.push(S.pickup + ": " + val("ophalen"));
      lines.push(S.dropoff + ": " + val("afleveren"));
      if (val("datum")) lines.push(S.date + ": " + val("datum").split("-").reverse().join("-"));
      lines.push(S.state + ": " + val("rijdend"));
    } else if (type === "verkoop") {
      if (val("km")) lines.push(S.km + ": " + val("km"));
      lines.push(S.state + ": " + val("staat"));
      lines.push(S.place + ": " + val("plaats"));
    }

    if (val("opmerking")) lines.push(S.note + ": " + val("opmerking"));
    return lines.join("\n");
  }

  function validate() {
    var required = ["naam", "telefoon"];
    form.querySelectorAll('[data-required="' + type + '"]').forEach(function (el) { required.push(el.name); });
    var missing = [];
    required.forEach(function (name) {
      var el = form.elements[name];
      if (!el.value.trim()) {
        el.setAttribute("aria-invalid", "true");
        missing.push(el);
      } else {
        el.removeAttribute("aria-invalid");
      }
    });
    var phoneEl = form.elements.telefoon;
    if (phoneEl.value.trim() && phoneEl.value.replace(/\D/g, "").length < 8) {
      phoneEl.setAttribute("aria-invalid", "true");
      formError.textContent = S.badPhone;
      phoneEl.focus();
      return false;
    }
    if (missing.length) {
      formError.textContent = S.required;
      missing[0].focus();
      return false;
    }
    formError.textContent = "";
    return true;
  }

  // Kopie per e-mail via een formulierdienst (alleen als FORM_ENDPOINT is ingevuld)
  function sendCopy(message) {
    if (!FORM_ENDPOINT || !window.fetch) return;
    try {
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: S.titles[type] + " " + S.via,
          soort: type,
          naam: val("naam"),
          telefoon: val("telefoon"),
          bericht: message
        }),
        keepalive: true
      }).catch(function () {});
    } catch (e) { /* niets: WhatsApp blijft werken */ }
  }

  function showSent() {
    var note = form.querySelector(".form-sent");
    if (!note) {
      note = document.createElement("p");
      note.className = "form-sent";
      note.setAttribute("role", "status");
      form.querySelector("#submit-btn").before(note);
    }
    note.textContent = S.sent;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    var message = buildMessage();
    sendCopy(message);
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener");
    showSent();
  });

  if (mailLink) {
    mailLink.addEventListener("click", function (e) {
      e.preventDefault();
      if (!validate()) return;
      var message = buildMessage();
      sendCopy(message);
      window.location.href = "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(S.titles[type] + " " + S.via) +
        "&body=" + encodeURIComponent(message);
    });
  }

  // Gewenste datum kan niet in het verleden liggen
  var dateInput = document.getElementById("datum");
  if (dateInput) {
    var now = new Date();
    dateInput.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  // Tabblad uit de link openen, bijvoorbeeld /contact/#aanvragen via de knop "Offerte"
  setType(type);
})();
