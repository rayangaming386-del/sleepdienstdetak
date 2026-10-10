# Website Sleepdienst De Tak

Website voor Sleepdienst De Tak in Den Haag: 24/7 sleepdienst, pechhulp en autotransport.

## Online zetten

Alles wat online moet staat in de map **`site/`**. Upload de inhoud van die map naar de hosting
(of koppel `site/` als publicatiemap bij Netlify of Cloudflare Pages). Er is geen server of database nodig.

- Netlify en Cloudflare Pages gebruiken `site/_headers` voor beveiliging en caching.
- Apache-hosting (veel Nederlandse hostingpartijen) gebruikt `site/.htaccess`, inclusief doorsturen naar `https://www.`.
- De 404-pagina is `site/404.html`.

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
