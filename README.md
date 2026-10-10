# Website Sleepdienst De Tak

Website voor Sleepdienst De Tak in Den Haag: 24/7 sleepdienst, pechhulp en autotransport.

## Online zetten met Vercel

De repository is klaar voor Vercel; de instellingen staan in `vercel.json`.

1. Ga naar vercel.com, log in met GitHub en kies **Add New → Project**.
2. Kies de repository `sleepdienstdetak` en klik op **Import**.
3. Laat alle instellingen staan zoals ze zijn (Framework: *Other*). Klik op **Deploy**.
4. Koppel daarna onder **Settings → Domains** het domein `sleepdienstdetak.nl` en `www.sleepdienstdetak.nl`
   (stel `www` in als hoofddomein, de site gebruikt `https://www.sleepdienstdetak.nl`).

Vercel bouwt de pagina's automatisch met `node src/build.mjs` en publiceert de map `site/`.
Elke wijziging die op GitHub in `main` komt, staat binnen een minuut live.

Andere hosting kan ook: upload dan de inhoud van de map **`site/`**. Voor Netlify of Cloudflare Pages
staat `site/_headers` klaar, voor Apache-hosting `site/.htaccess`.

## Pagina's

| Pagina | Adres |
| --- | --- |
| Homepage | `/` |
| Diensten | `/pechhulp/`, `/auto-afslepen/`, `/autotransport/`, `/ongevalsberging/`, `/auto-verkopen/`, `/zakelijk/` |
| Plaatsen | `/sleepdienst-den-haag/`, `-rijswijk/`, `-delft/`, `-zoetermeer/`, `-westland/`, `-leidschendam-voorburg/`, `-wassenaar/`, `-scheveningen/`, `-ypenburg/`, `-pijnacker-nootdorp/`, `-midden-delfland/`, `-leiden/` |
| Kennisbank | `/kennisbank/` met 6 artikelen (pech op de snelweg, kosten afslepen, auto uit het buitenland, sloopauto verkopen, elektrische auto afslepen, na een ongeluk) |
| Overig | `/werkgebied/`, `/veelgestelde-vragen/`, `/contact/`, `/privacy/` |
| Engels / Duits | `/en/`, `/de/` |

## Functies

- Aanvraagformulier met drie tabbladen: pech melden, offerte voor transport en auto verkopen
- Kentekencheck: merk, model, bouwjaar, kleur, brandstof en gewicht uit de open data van de RDW
- Kenteken scannen met de camera (tekstherkenning op het eigen apparaat, wordt pas geladen bij gebruik)
- GPS-locatie delen bij pech
- Alles gaat als één bericht via WhatsApp naar 06 44 55 66 74 (of per e-mail)
- Optioneel: elke aanvraag ook per e-mail via een formulierdienst. Vul daarvoor `FORM_ENDPOINT` in `site/js/main.js` in
  (bijvoorbeeld een Formspree-adres)
- Kaarten van Europa en de regio Haaglanden, animaties met GSAP en motion blur
- Gegevens voor Google (schema.org), sitemap, Engelse en Duitse versie

## Wijzigen

De HTML-pagina's worden gemaakt met een klein bouwscript. Pas teksten aan in `src/`, niet in `site/*.html`:

- `src/site.mjs`: bedrijfsgegevens (telefoon, adres, **KvK- en btw-nummer**), menu, footer, formulier
- `src/pages/`: de teksten per pagina (nieuw artikel? voeg het toe in `src/pages/kennisbank.mjs`)

Daarna opnieuw bouwen (Node.js nodig):

```
npm install      # alleen de eerste keer, voor de hulpscripts
npm run build    # maakt alle pagina's in site/ opnieuw
npm run serve    # bekijken op http://localhost:8000
```

Hulpscripts in `tools/` (alleen nodig bij nieuwe foto's, iconen of kaarten):
`python3 tools/make-images.py`, `node tools/extract-icons.mjs`, `npm run maps`.

## SEO buiten de site

- Google Bedrijfsprofiel aanmaken (categorie Sleepdienst, 24 uur open) en reviews verzamelen
- Site aanmelden bij Google Search Console en `https://www.sleepdienstdetak.nl/sitemap.xml` indienen
- Bing Places en Apple Business Connect, en vermeldingen in bedrijvengidsen met overal dezelfde naam, adres en telefoon

## Nog in te vullen

- KvK- en btw-nummer in `src/site.mjs` (daarna `npm run build`)
- Algemene voorwaarden, zodra die er zijn
- Google Bedrijfsprofiel aanmaken en de site aanmelden bij Google Search Console

## Licenties

Lettertype Barlow (SIL Open Font License), iconen Lucide (ISC), GSAP, Tesseract.js (Apache 2.0),
kaartdata Natural Earth (publiek domein).
