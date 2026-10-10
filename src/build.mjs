// Bouwt de complete website in de map site/.
// Gebruik: npm run build   (of: node src/build.mjs)
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { layout, SITE } from "./site.mjs";
import algemeen from "./pages/algemeen.mjs";
import diensten from "./pages/diensten.mjs";
import plaatsen from "./pages/plaatsen.mjs";
import talen from "./pages/talen.mjs";
import kennisbank from "./pages/kennisbank.mjs";

const OUT = new URL("../site/", import.meta.url).pathname;

// Versie op basis van de inhoud van css en js, zodat browsers nieuwe versies ophalen
const version = createHash("md5")
  .update(["css/style.css", "js/main.js", "js/motion.js"].map((f) => readFileSync(join(OUT, f))).join(""))
  .digest("hex").slice(0, 8);

const pages = [...algemeen, ...diensten, ...plaatsen, ...kennisbank, ...talen];

for (const page of pages) {
  const file = page.file || join(page.path.replace(/^\//, ""), "index.html");
  const html = layout({ ...page, version });
  const target = join(OUT, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}

// Sitemap
const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter((p) => !p.noindex).map((p) => {
  const prio = p.path === "/" ? "1.0" : p.path.startsWith("/kennisbank/") ? "0.6" : p.path.startsWith("/sleepdienst-") ? "0.7" : "0.8";
  return `  <url><loc>${SITE.url}${p.path}</loc><lastmod>${today}</lastmod><priority>${prio}</priority></url>`;
});
writeFileSync(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`);

writeFileSync(join(OUT, "robots.txt"), `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`);

writeFileSync(join(OUT, "site.webmanifest"), JSON.stringify({
  name: SITE.name,
  short_name: "De Tak",
  start_url: "/",
  display: "standalone",
  background_color: "#111111",
  theme_color: "#111111",
  icons: [{ src: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
}, null, 2));

console.log(`${pages.length} pagina's gebouwd (versie ${version})`);
