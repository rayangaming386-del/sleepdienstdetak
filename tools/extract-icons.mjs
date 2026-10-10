// Haalt de gebruikte Lucide-iconen (ISC-licentie) uit node_modules naar src/icons.json
import { readFileSync, writeFileSync } from "node:fs";

const names = [
  "zap", "truck", "car-front", "triangle-alert", "warehouse", "hand-coins", "route", "building-2",
  "phone", "message-circle", "map-pin", "clock", "shield-check", "check", "chevron-down", "arrow-right",
  "camera", "globe", "motorbike", "recycle", "calendar-check", "badge-euro", "wrench", "battery-charging",
  "clipboard-list", "handshake", "mail", "navigation", "circle-check", "key-round", "fuel", "scan-line",
  "languages", "siren", "car", "container", "map"
];

const out = {};
for (const n of names) {
  const svg = readFileSync(`node_modules/lucide-static/icons/${n}.svg`, "utf8");
  out[n] = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/\s*\n\s*/g, "").trim();
}
writeFileSync("src/icons.json", JSON.stringify(out, null, 0));
console.log("iconen:", Object.keys(out).length);
