// Maakt de kaarten voor de website uit open kaartdata (Natural Earth via world-atlas)
//  - site/images/kaart-europa.svg : Europa met Nederland uitgelicht en een pin op Den Haag
//  - src/regio-kaart.json         : regio Haaglanden (land, zee, plaatsen) om inline te tekenen
import { readFileSync, writeFileSync } from "node:fs";
import { geoConicConformal, geoMercator, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";

const r = (n) => Math.round(n * 10) / 10;
const world50 = JSON.parse(readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
const world10 = JSON.parse(readFileSync("node_modules/world-atlas/countries-10m.json", "utf8"));
const countries50 = feature(world50, world50.objects.countries).features;
const countries10 = feature(world10, world10.objects.countries).features;
const NL_ID = "528";
const denHaag = [4.3007, 52.0705];

// ---------- Europa ----------
{
  const W = 800, H = 640;
  const box = { type: "Feature", geometry: { type: "Polygon", coordinates: [[[-10, 36], [-10, 60], [28, 60], [28, 36], [-10, 36]]] } };
  const proj = geoConicConformal().parallels([40, 60]).rotate([-10, 0]).fitExtent([[0, 0], [W, H]], box).clipExtent([[-5, -5], [W + 5, H + 5]]);
  const path = geoPath(proj).digits(0);
  const near = countries50.filter((f) => {
    const [[x0, y0], [x1, y1]] = path.bounds(f);
    return x1 > -50 && x0 < W + 50 && y1 > -50 && y0 < H + 50;
  });
  const others = near.filter((f) => f.id !== NL_ID).map((f) => path(f)).join("");
  const nl = path(countries50.find((f) => f.id === NL_ID));
  const [px, py] = proj(denHaag).map(r);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t">
<title id="t">Kaart van Europa met Nederland uitgelicht en Den Haag als standplaats</title>
<defs><radialGradient id="g" cx="${px}" cy="${py}" r="260" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffc400" stop-opacity=".16"/><stop offset="1" stop-color="#ffc400" stop-opacity="0"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="#121417"/>
<path d="${path(geoGraticule10())}" fill="none" stroke="#ffffff" stroke-opacity=".04"/>
<circle cx="${px}" cy="${py}" r="260" fill="url(#g)"/>
<path d="${others}" fill="#30343b" stroke="#14161a" stroke-width="1"/>
<path d="${nl}" fill="#ffc400" stroke="#14161a" stroke-width="1"/>
<circle cx="${px}" cy="${py}" r="18" fill="none" stroke="#ffc400" stroke-width="2" opacity=".5"/>
<circle cx="${px}" cy="${py}" r="6" fill="#111" stroke="#fff" stroke-width="2.5"/>
<g font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" letter-spacing="1">
<rect x="${px - 104}" y="${py - 46}" width="88" height="26" rx="4" fill="#111" stroke="#ffc400"/>
<text x="${px - 60}" y="${py - 28}" fill="#ffc400" font-size="15" text-anchor="middle">DEN HAAG</text>
</g>
</svg>`;
  writeFileSync("site/images/kaart-europa.svg", svg);
  console.log("europa:", (svg.length / 1024).toFixed(1), "KB");
}

// ---------- Regio Haaglanden ----------
{
  const W = 640, H = 520;
  const box = { type: "Feature", geometry: { type: "Polygon", coordinates: [[[4.08, 51.94], [4.08, 52.19], [4.6, 52.19], [4.6, 51.94], [4.08, 51.94]]] } };
  const proj = geoMercator().fitExtent([[0, 0], [W, H]], box);
  const path = geoPath(proj).digits(1);
  const land = countries10.filter((f) => ["528", "056"].includes(f.id)).map((f) => path(f)).join("");
  const places = [
    { slug: "den-haag", name: "Den Haag", c: denHaag, main: true },
    { slug: "rijswijk", name: "Rijswijk", c: [4.3254, 52.0363] },
    { slug: "delft", name: "Delft", c: [4.3571, 52.0116] },
    { slug: "zoetermeer", name: "Zoetermeer", c: [4.4931, 52.0575] },
    { slug: "westland", name: "Westland", c: [4.2094, 51.994] },
    { slug: "leidschendam-voorburg", name: "Leidschendam-Voorburg", c: [4.3889, 52.0833] },
    { slug: "wassenaar", name: "Wassenaar", c: [4.4011, 52.1428] }
  ].map((p) => ({ ...p, xy: proj(p.c).map(r) }));
  const [hx, hy] = proj(denHaag);
  const pxPerKm = proj([4.3007 + 1 / (111.32 * Math.cos((52.07 * Math.PI) / 180)), 52.0705])[0] - hx;
  writeFileSync("src/regio-kaart.json", JSON.stringify({ W, H, land, places, center: [r(hx), r(hy)], kmPx: r(pxPerKm) }));
  console.log("regio: 10 km =", r(pxPerKm * 10), "px");
}
