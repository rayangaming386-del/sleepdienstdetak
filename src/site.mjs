// Gedeelde gegevens en bouwstenen voor alle pagina's van Sleepdienst De Tak.
import { readFileSync } from "node:fs";

const icons = JSON.parse(readFileSync(new URL("./icons.json", import.meta.url), "utf8"));
const images = JSON.parse(readFileSync(new URL("./images.json", import.meta.url), "utf8"));
const regio = JSON.parse(readFileSync(new URL("./regio-kaart.json", import.meta.url), "utf8"));

export const SITE = {
  name: "Sleepdienst De Tak",
  url: "https://www.sleepdienstdetak.nl",
  phone: "+31644556674",
  phoneDisplay: "06\u00a044\u00a055\u00a066\u00a074",
  phoneIntlDisplay: "+31\u00a06\u00a044\u00a055\u00a066\u00a074",
  whatsapp: "31644556674",
  email: "info@sleepdienstdetak.nl",
  street: "Tak van Poortvlietstraat 100",
  postal: "2521 ZD",
  city: "Den Haag",
  // TODO: invullen zodra bekend
  kvk: "",
  btw: ""
};

export const telHref = `tel:${SITE.phone}`;
export const waHref = (text) => `https://wa.me/${SITE.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : "");

// ---------- Hulpjes ----------
export function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

export function icon(name, cls = "") {
  if (!icons[name]) throw new Error(`Icoon bestaat niet: ${name}`);
  return `<svg class="icon${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icons[name]}</svg>`;
}

// Foto met srcset (webp in meerdere breedtes)
export function img(name, alt, { sizes = "100vw", cls = "", lazy = true, priority = false, style = "" } = {}) {
  const m = images[name];
  if (!m) throw new Error(`Foto bestaat niet: ${name}`);
  const largest = m.sizes[m.sizes.length - 1];
  const h = Math.round((m.h * largest) / m.w);
  const srcset = m.sizes.map((w) => `/images/foto/${name}-${w}.webp ${w}w`).join(", ");
  return `<img${cls ? ` class="${cls}"` : ""} src="/images/foto/${name}-${largest}.webp" srcset="${srcset}" sizes="${sizes}" alt="${esc(alt)}" width="${largest}" height="${h}"${lazy && !priority ? ' loading="lazy" decoding="async"' : ""}${priority ? ' fetchpriority="high"' : ""}${style ? ` style="${style}"` : ""}>`;
}

export function imgSrc(name) {
  const m = images[name];
  return `/images/foto/${name}-${m.sizes[m.sizes.length - 1]}.webp`;
}

// ---------- Teksten per taal ----------
export const T = {
  nl: {
    skip: "Naar de inhoud",
    menu: "Menu",
    services: "Diensten",
    allServices: "Alle diensten",
    area: "Werkgebied",
    business: "Zakelijk",
    about: "Over ons",
    faq: "Veelgestelde vragen",
    contact: "Contact",
    available: "24/7 bereikbaar",
    call: "Bel",
    callNow: "Bel direct",
    quote: "Offerte",
    requestQuote: "Offerte aanvragen",
    waText: "Hallo Sleepdienst De Tak, ik heb hulp nodig.",
    footerAbout: "Sleepdienst en autotransport uit Den Haag. Dag en nacht bereikbaar, in heel Nederland en Europa.",
    places: "Plaatsen",
    privacy: "Privacyverklaring",
    kvk: "KvK",
    btw: "Btw",
    follows: "volgt",
    home: "Home",
    form: {
      tabs: { pech: "Pech", offerte: "Transport", verkoop: "Verkopen" },
      tabsLabel: "Soort aanvraag",
      plate: "Kenteken",
      scan: "Scan kenteken",
      model: "Merk en model",
      vehicle: "Soort voertuig",
      vehicles: ["Personenauto", "Bestelbus", "Camper of caravan", "Motor of scooter", "Anders"],
      modelPh: "Bijvoorbeeld: Volkswagen Golf",
      name: "Naam",
      phone: "Telefoonnummer",
      problem: "Wat is er aan de hand?",
      problems: ["Auto start niet", "Lekke band", "Ongeluk", "Afslepen naar garage of adres", "Anders"],
      where: "Waar ben je?",
      wherePh: "Adres, snelweg + hectometerpaaltje",
      useLocation: "Gebruik mijn locatie",
      pickup: "Ophaaladres",
      dropoff: "Afleveradres",
      addrPh: "Straat, plaats of land",
      date: "Gewenste datum",
      state: "Staat van de auto",
      states: ["Rijdend", "Niet rijdend", "Schade"],
      km: "Kilometerstand",
      kmPh: "Bijvoorbeeld: 185.000 km",
      condition: "Staat",
      conditions: ["Rijdend", "Niet rijdend", "Schadeauto", "Sloopauto"],
      carWhere: "Waar staat de auto?",
      carWherePh: "Plaats",
      note: "Opmerking",
      optional: "(optioneel)",
      photosHint: "Na het versturen van je aanvraag kun je via WhatsApp direct foto’s van de auto meesturen.",
      submit: "Verstuur via WhatsApp",
      noWa: "Werkt WhatsApp niet? Stuur je aanvraag dan per e-mail naar",
      byMail: "info@sleepdienstdetak.nl"
    }
  },
  en: {
    skip: "Skip to content",
    menu: "Menu",
    services: "Services",
    allServices: "All services",
    area: "Service area",
    business: "Business",
    about: "About us",
    faq: "FAQ",
    contact: "Contact",
    available: "Available 24/7",
    call: "Call",
    callNow: "Call now",
    quote: "Quote",
    requestQuote: "Request a quote",
    waText: "Hello Sleepdienst De Tak, I need help.",
    footerAbout: "Towing and car transport from The Hague. Available day and night, across the Netherlands and Europe.",
    places: "Places",
    privacy: "Privacy statement (Dutch)",
    kvk: "Chamber of Commerce",
    btw: "VAT",
    follows: "to follow",
    home: "Home",
    form: {
      tabs: { pech: "Breakdown", offerte: "Transport", verkoop: "Sell car" },
      tabsLabel: "Type of request",
      plate: "Licence plate",
      scan: "Scan plate",
      model: "Make and model",
      vehicle: "Type of vehicle",
      vehicles: ["Car", "Van", "Camper or caravan", "Motorbike or scooter", "Other"],
      modelPh: "E.g. Volkswagen Golf",
      name: "Name",
      phone: "Phone number",
      problem: "What happened?",
      problems: ["Car won't start", "Flat tyre", "Accident", "Tow to garage or address", "Other"],
      where: "Where are you?",
      wherePh: "Address, motorway + marker post",
      useLocation: "Use my location",
      pickup: "Pick-up address",
      dropoff: "Delivery address",
      addrPh: "Street, city or country",
      date: "Preferred date",
      state: "Condition of the car",
      states: ["Drivable", "Not drivable", "Damaged"],
      km: "Mileage (km)",
      kmPh: "E.g. 185000",
      condition: "Condition",
      conditions: ["Drivable", "Not drivable", "Damaged", "For scrap"],
      carWhere: "Where is the car?",
      carWherePh: "City",
      note: "Note",
      optional: "(optional)",
      photosHint: "After sending, you can add photos of the car in WhatsApp.",
      submit: "Send via WhatsApp",
      noWa: "WhatsApp not working? Send your request by email to",
      byMail: "info@sleepdienstdetak.nl"
    }
  },
  de: {
    skip: "Zum Inhalt",
    menu: "Menü",
    services: "Leistungen",
    allServices: "Alle Leistungen",
    area: "Einsatzgebiet",
    business: "Geschäftskunden",
    about: "Über uns",
    faq: "Häufige Fragen",
    contact: "Kontakt",
    available: "24/7 erreichbar",
    call: "Anrufen",
    callNow: "Jetzt anrufen",
    quote: "Angebot",
    requestQuote: "Angebot anfordern",
    waText: "Hallo Sleepdienst De Tak, ich brauche Hilfe.",
    footerAbout: "Abschleppdienst und Autotransport aus Den Haag. Tag und Nacht erreichbar, in den ganzen Niederlanden und Europa.",
    places: "Orte",
    privacy: "Datenschutz (Niederländisch)",
    kvk: "Handelsregister",
    btw: "USt-IdNr.",
    follows: "folgt",
    home: "Start",
    form: {
      tabs: { pech: "Panne", offerte: "Transport", verkoop: "Verkaufen" },
      tabsLabel: "Art der Anfrage",
      plate: "Kennzeichen",
      scan: "Kennzeichen scannen",
      model: "Marke und Modell",
      vehicle: "Fahrzeugart",
      vehicles: ["Pkw", "Transporter", "Wohnmobil oder Wohnwagen", "Motorrad oder Roller", "Sonstiges"],
      modelPh: "Z. B. Volkswagen Golf",
      name: "Name",
      phone: "Telefonnummer",
      problem: "Was ist passiert?",
      problems: ["Auto springt nicht an", "Reifenpanne", "Unfall", "Abschleppen zur Werkstatt oder Adresse", "Sonstiges"],
      where: "Wo sind Sie?",
      wherePh: "Adresse, Autobahn + Kilometerstein",
      useLocation: "Meinen Standort verwenden",
      pickup: "Abholadresse",
      dropoff: "Lieferadresse",
      addrPh: "Straße, Ort oder Land",
      date: "Wunschtermin",
      state: "Zustand des Autos",
      states: ["Fahrbereit", "Nicht fahrbereit", "Unfallschaden"],
      km: "Kilometerstand",
      kmPh: "Z. B. 185000",
      condition: "Zustand",
      conditions: ["Fahrbereit", "Nicht fahrbereit", "Unfallwagen", "Zur Verschrottung"],
      carWhere: "Wo steht das Auto?",
      carWherePh: "Ort",
      note: "Bemerkung",
      optional: "(optional)",
      photosHint: "Nach dem Senden können Sie in WhatsApp Fotos vom Auto mitschicken.",
      submit: "Per WhatsApp senden",
      noWa: "WhatsApp funktioniert nicht? Senden Sie Ihre Anfrage per E-Mail an",
      byMail: "info@sleepdienstdetak.nl"
    }
  }
};

// ---------- Diensten en plaatsen (voor menu, footer en links) ----------
export const SERVICES = [
  { slug: "pechhulp", name: "Pechhulp", icon: "battery-charging", short: "Starthulp, band wisselen of een kleine reparatie langs de weg." },
  { slug: "auto-afslepen", name: "Auto afslepen", icon: "truck", short: "Auto, bestelbus, camper of motor veilig naar de garage of naar huis." },
  { slug: "autotransport", name: "Autotransport", icon: "route", short: "Gepland vervoer door heel Nederland en Europa, rijdend of niet." },
  { slug: "ongevalsberging", name: "Berging na ongeluk", icon: "triangle-alert", short: "Snel en veilig weg na een aanrijding, en stalling tot het geregeld is." },
  { slug: "auto-verkopen", name: "Auto verkopen", icon: "hand-coins", short: "Sloop- of schadeauto kwijt? Wij doen een bod en halen hem op." },
  { slug: "zakelijk", name: "Zakelijk", icon: "building-2", short: "Vast transport voor garages, autobedrijven en leasemaatschappijen." }
];

export const PLACES = [
  { slug: "den-haag", name: "Den Haag" },
  { slug: "rijswijk", name: "Rijswijk" },
  { slug: "delft", name: "Delft" },
  { slug: "zoetermeer", name: "Zoetermeer" },
  { slug: "westland", name: "Westland" },
  { slug: "leidschendam-voorburg", name: "Leidschendam-Voorburg" },
  { slug: "wassenaar", name: "Wassenaar" },
  { slug: "scheveningen", name: "Scheveningen" },
  { slug: "ypenburg", name: "Ypenburg" },
  { slug: "pijnacker-nootdorp", name: "Pijnacker-Nootdorp" },
  { slug: "midden-delfland", name: "Midden-Delfland" },
  { slug: "leiden", name: "Leiden" }
];

const LANG_HOME = { nl: "/", en: "/en/", de: "/de/" };

// ---------- Header ----------
export function header(page) {
  const t = T[page.lang];
  const nl = page.lang === "nl";
  const homeHref = LANG_HOME[page.lang];
  const active = (p) => (page.path === p ? ' aria-current="page"' : "");
  const servicesMenu = nl
    ? `<div class="nav-item has-sub">
          <button class="nav-sub-toggle" type="button" aria-expanded="false" aria-controls="sub-diensten">${t.services}${icon("chevron-down", "chev")}</button>
          <div class="sub" id="sub-diensten">
            <div class="sub-grid">
              ${SERVICES.map((s) => `<a href="/${s.slug}/"${active(`/${s.slug}/`)}><span class="sub-icon">${icon(s.icon)}</span><span><strong>${s.name}</strong><small>${s.short}</small></span></a>`).join("\n              ")}
            </div>
          </div>
        </div>
        <a href="/autotransport/"${active("/autotransport/")}>Autotransport</a>
        <a href="/werkgebied/"${active("/werkgebied/")}>${t.area}</a>
        <a href="/kennisbank/"${page.path.startsWith("/kennisbank/") ? ' aria-current="page"' : ""}>Kennisbank</a>
        <a href="/veelgestelde-vragen/"${active("/veelgestelde-vragen/")}>FAQ</a>
        <a href="/contact/"${active("/contact/")}>${t.contact}</a>`
    : `<a href="${homeHref}#diensten">${t.services}</a>
        <a href="${homeHref}#aanvragen">${t.requestQuote}</a>
        <a href="${homeHref}#contact">${t.contact}</a>`;

  const langs = ["nl", "en", "de"].map((l) =>
    `<a href="${LANG_HOME[l]}" hreflang="${l}" lang="${l}"${l === page.lang ? ' aria-current="true"' : ""}>${l.toUpperCase()}</a>`).join("");

  return `<header class="site-header">
    <div class="wrap header-inner">
      <a class="logo" href="${homeHref}" aria-label="${SITE.name}, ${t.home}">
        <img src="/images/logo/logo-horizontaal.webp" alt="${SITE.name}" width="640" height="95">
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="${t.menu}">
        <span></span><span></span><span></span>
      </button>
      <nav id="nav" class="nav" aria-label="${t.menu}">
        ${servicesMenu}
        <div class="lang-switch" role="group" aria-label="Taal / Language">${langs}</div>
        <a class="header-call" href="${telHref}">
          <span class="header-call-icon">${icon("phone")}</span>
          <span class="header-call-text"><small>${t.available}</small>${nl ? SITE.phoneDisplay : SITE.phoneIntlDisplay}</span>
        </a>
      </nav>
    </div>
  </header>`;
}

// ---------- Footer ----------
export function footer(page) {
  const t = T[page.lang];
  const nl = page.lang === "nl";
  const year = new Date().getFullYear();
  const cols = nl
    ? `<div>
          <h2 class="footer-title">${t.services}</h2>
          <ul>${SERVICES.map((s) => `<li><a href="/${s.slug}/">${s.name}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h2 class="footer-title">${t.area}</h2>
          <ul>${PLACES.slice(0, 7).map((p) => `<li><a href="/sleepdienst-${p.slug}/">Sleepdienst ${p.name}</a></li>`).join("")}<li><a href="/werkgebied/">Alle plaatsen, NL en Europa</a></li></ul>
        </div>`
    : "";
  return `<footer class="site-footer">
    <div class="wrap footer-grid${nl ? "" : " footer-grid-short"}">
      <div class="footer-brand">
        <img class="footer-logo" src="/images/logo/logo-compact.webp" alt="${SITE.name}" width="640" height="281" loading="lazy">
        <p>${t.footerAbout}</p>
      </div>
      ${cols}
      <div>
        <h2 class="footer-title">${t.contact}</h2>
        <ul class="footer-contact">
          <li>${icon("phone")}<a href="${telHref}">${nl ? SITE.phoneDisplay : SITE.phoneIntlDisplay}</a></li>
          <li>${icon("message-circle")}<a href="${waHref(t.waText)}" target="_blank" rel="noopener">WhatsApp</a></li>
          <li>${icon("mail")}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li>${icon("map-pin")}<span>${SITE.street}<br>${SITE.postal} ${SITE.city}</span></li>
          <li>${icon("clock")}<span>${t.available}</span></li>
        </ul>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <p>&copy; ${year} ${SITE.name} &middot; ${t.kvk}: ${SITE.kvk || `<span class="todo">${t.follows}</span>`} &middot; ${t.btw}: ${SITE.btw || `<span class="todo">${t.follows}</span>`}</p>
      <p><a href="/privacy/">${t.privacy}</a>${nl ? ` &middot; <a href="/veelgestelde-vragen/">${t.faq}</a> &middot; <a href="/kennisbank/">Kennisbank</a> &middot; <a href="/werkgebied/">${t.area}</a>` : ""}</p>
    </div>
  </footer>`;
}

// ---------- Vaste knoppen onderin op mobiel ----------
export function mobileBar(page) {
  const t = T[page.lang];
  const quoteHref = page.hasForm ? "#aanvragen" : (page.lang === "nl" ? "/contact/?type=offerte#aanvragen" : `${LANG_HOME[page.lang]}?type=offerte#aanvragen`);
  return `<div class="mobile-bar">
    <a class="mb-call" href="${telHref}">${icon("phone")}${t.call}</a>
    <a class="mb-wa" href="${waHref(t.waText)}" target="_blank" rel="noopener">${icon("message-circle")}WhatsApp</a>
    <a class="mb-quote" href="${quoteHref}" data-tab-link="offerte">${icon("clipboard-list")}${t.quote}</a>
  </div>`;
}

// ---------- Knoppen ----------
export function ctaButtons(lang, { quote = true, ghost = true, size = "btn-lg" } = {}) {
  const t = T[lang];
  return `<a class="btn btn-yellow ${size}" href="${telHref}">${icon("phone")}${t.callNow}</a>
          <a class="btn btn-whatsapp ${size}" href="${waHref(t.waText)}" target="_blank" rel="noopener">${icon("message-circle")}WhatsApp</a>${quote ? `
          <a class="btn ${ghost ? "btn-ghost" : "btn-outline"} ${size}" href="#aanvragen" data-tab-link="offerte">${icon("clipboard-list")}${t.requestQuote}</a>` : ""}`;
}

// ---------- Aanvraagformulier ----------
export function aanvraagForm(lang, defaultType = "pech") {
  const f = T[lang].form;
  const opts = (arr) => arr.map((o) => `<option>${esc(o)}</option>`).join("");
  return `<form id="aanvraag-form" class="form" novalidate data-default-type="${defaultType}" data-reveal>
          <div class="tabs" role="tablist" aria-label="${f.tabsLabel}">
            ${["pech", "offerte", "verkoop"].map((k) => `<button type="button" role="tab" class="tab" id="tab-${k}" aria-selected="${k === defaultType}" aria-controls="aanvraag-form" data-type="${k}">${f.tabs[k]}</button>`).join("\n            ")}
            <span class="tab-indicator" aria-hidden="true"></span>
          </div>

          <div class="field">
            <label for="kenteken">${f.plate}</label>
            <div class="plate-row">
              <div class="plate">
                <span class="plate-eu" aria-hidden="true"><span class="plate-stars"></span>NL</span>
                <input id="kenteken" name="kenteken" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="10" placeholder="AB-123-C">
              </div>
              <label class="scan-btn" title="${f.scan}">
                ${icon("camera")}<span class="sr-only">${f.scan}</span>
                <input type="file" id="scan-input" accept="image/*" capture="environment" hidden>
              </label>
            </div>
            <p id="scan-status" class="hint" aria-live="polite" hidden></p>
            <div id="vehicle" class="vehicle" aria-live="polite" hidden></div>
          </div>

          <div class="field" id="field-model" hidden>
            <label for="model">${f.model}</label>
            <input id="model" name="model" type="text" placeholder="${f.modelPh}">
          </div>

          <div class="field">
            <label for="voertuig">${f.vehicle}</label>
            <select id="voertuig" name="voertuig">${opts(f.vehicles)}</select>
          </div>

          <div class="field-row">
            <div class="field">
              <label for="naam">${f.name}</label>
              <input id="naam" name="naam" type="text" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="telefoon">${f.phone}</label>
              <input id="telefoon" name="telefoon" type="tel" autocomplete="tel" inputmode="tel" required>
            </div>
          </div>

          <div class="field" data-show="pech">
            <label for="hulp">${f.problem}</label>
            <select id="hulp" name="hulp">${opts(f.problems)}</select>
          </div>
          <div class="field" data-show="pech">
            <label for="locatie">${f.where}</label>
            <div class="input-with-btn">
              <input id="locatie" name="locatie" type="text" placeholder="${f.wherePh}" data-required="pech">
              <button type="button" id="geo-btn" class="btn btn-dark btn-sm">${icon("navigation")}${f.useLocation}</button>
            </div>
            <p id="geo-status" class="hint" aria-live="polite"></p>
          </div>

          <div class="field-row" data-show="offerte">
            <div class="field">
              <label for="ophalen">${f.pickup}</label>
              <input id="ophalen" name="ophalen" type="text" placeholder="${f.addrPh}" data-required="offerte">
            </div>
            <div class="field">
              <label for="afleveren">${f.dropoff}</label>
              <input id="afleveren" name="afleveren" type="text" placeholder="${f.addrPh}" data-required="offerte">
            </div>
          </div>
          <div class="field-row" data-show="offerte">
            <div class="field">
              <label for="datum">${f.date}</label>
              <input id="datum" name="datum" type="date">
            </div>
            <div class="field">
              <label for="rijdend">${f.state}</label>
              <select id="rijdend" name="rijdend">${opts(f.states)}</select>
            </div>
          </div>

          <div class="field-row" data-show="verkoop">
            <div class="field">
              <label for="km">${f.km}</label>
              <input id="km" name="km" type="text" inputmode="numeric" placeholder="${f.kmPh}">
            </div>
            <div class="field">
              <label for="staat">${f.condition}</label>
              <select id="staat" name="staat">${opts(f.conditions)}</select>
            </div>
          </div>
          <div class="field" data-show="verkoop">
            <label for="plaats">${f.carWhere}</label>
            <input id="plaats" name="plaats" type="text" placeholder="${f.carWherePh}" data-required="verkoop">
          </div>

          <div class="field">
            <label for="opmerking">${f.note} <span class="optional">${f.optional}</span></label>
            <textarea id="opmerking" name="opmerking" rows="2"></textarea>
          </div>

          <p class="hint" data-show="verkoop">${f.photosHint}</p>
          <p id="form-error" class="form-error" role="alert"></p>
          <button type="submit" class="btn btn-yellow btn-lg btn-block" id="submit-btn">${icon("message-circle")}${f.submit}</button>
          <p class="hint center">${f.noWa} <a id="mail-fallback" href="mailto:${SITE.email}">${f.byMail}</a>.</p>
        </form>`;
}

// Sectie met uitleg links en het formulier rechts
export function aanvraagSection({ lang = "nl", type = "pech", kicker = "Aanvragen", title = "Pech melden of offerte aanvragen", subtitle, lead, alt = false } = {}) {
  const leadText = lead ?? "Vul je kenteken in en we zoeken automatisch het merk, model en bouwjaar van je auto op. Je aanvraag wordt vervolgens overzichtelijk via WhatsApp naar ons verstuurd.";
  const sub = subtitle ?? (lang === "nl" ? "Snel hulp nodig? Laat je gegevens achter." : "");
  const howLabel = { nl: "Zo werkt het:", en: "How it works:", de: "So funktioniert es:" }[lang];
  const nl = lang === "nl";
  const steps = {
    nl: [["Kies wat je nodig hebt", "Pechhulp, autotransport of je auto verkopen."], ["Vul je kenteken in", "Je voertuiggegevens verschijnen direct in beeld."], ["Verstuur je aanvraag via WhatsApp", "Je ontvangt zo snel mogelijk een reactie en een duidelijke prijsopgave."]],
    en: [["Choose what you need", "Breakdown help, transport or selling your car."], ["Enter your licence plate", "Dutch plates are looked up automatically."], ["Send your request via WhatsApp", "You receive a reply and a clear quote as soon as possible."]],
    de: [["Wählen Sie, was Sie brauchen", "Pannenhilfe, Transport oder Auto verkaufen."], ["Kennzeichen eingeben", "Niederländische Kennzeichen werden automatisch erkannt."], ["Anfrage per WhatsApp senden", "Sie erhalten so schnell wie möglich eine Antwort und ein klares Angebot."]]
  }[lang];
  const note = {
    nl: `Liever direct iemand spreken? Bel ons op <a href="${telHref}">${SITE.phoneDisplay}</a>.<br>Bij gewonden of direct gevaar: bel altijd eerst <a href="tel:112">112</a>.`,
    en: `Rather talk to someone right away? <a href="${telHref}">Call ${SITE.phoneIntlDisplay}</a>. If anyone is injured or in danger, always call <a href="tel:112">112</a> first.`,
    de: `Lieber direkt sprechen? <a href="${telHref}">Rufen Sie ${SITE.phoneIntlDisplay} an</a>. Bei Verletzten oder Gefahr immer zuerst <a href="tel:112">112</a> anrufen.`
  }[lang];
  return `<section id="aanvragen" class="section${alt ? " section-alt" : ""}">
      <div class="wrap aanvraag-grid">
        <div class="aanvraag-intro">
          <p class="kicker" data-reveal>${kicker}</p>
          <h2 data-reveal>${title}</h2>
          ${sub ? `<p class="section-sub" data-reveal>${sub}</p>` : ""}
          <p class="section-lead" data-reveal>${leadText}</p>
          <p class="steps-label" data-reveal>${howLabel}</p>
          <ol class="steps" data-stagger>
            ${steps.map(([a, b], i) => `<li><span class="step-num">${i + 1}</span><div><strong>${a}</strong><span>${b}</span></div></li>`).join("\n            ")}
          </ol>
          <p class="note" data-reveal>${icon("siren")}<span>${note}</span></p>
        </div>
        ${aanvraagForm(lang, type)}
      </div>
    </section>`;
}

// ---------- Paginakop voor subpagina's ----------
export function pageHero({ lang = "nl", crumbs = [], kicker = "", title, lead, photo = "sleepwagens-nacht", focus = "center 60%", buttons = true }) {
  const bc = crumbs.length
    ? `<nav class="breadcrumbs" aria-label="Kruimelpad" data-hero><a href="/">Home</a>${crumbs.map((c) => c.href ? `<span>/</span><a href="${c.href}">${c.name}</a>` : `<span>/</span><span aria-current="page">${c.name}</span>`).join("")}</nav>`
    : "";
  return `<section class="page-hero">
      <div class="hero-media">${img(photo, "", { priority: true, cls: "hero-bg", style: `object-position:${focus}` })}</div>
      <div class="hero-shade"></div>
      <div class="wrap page-hero-content">
        ${bc}
        ${kicker ? `<p class="eyebrow" data-hero><span class="live-dot" aria-hidden="true"></span> ${kicker}</p>` : ""}
        <h1><span class="line"><span class="line-inner" data-mblur="1">${title}</span></span></h1>
        <p class="lead" data-hero>${lead}</p>
        ${buttons ? `<div class="hero-actions" data-hero>
          ${ctaButtons(lang)}
        </div>` : ""}
      </div>
    </section>
    ${ticker(lang)}`;
}

// ---------- Bewegende balk met tekst onder de hero ----------
const TICKER = {
  nl: ["24/7 bereikbaar", "Sleepdienst", "Pechhulp", "Autotransport", "Heel Nederland en Europa", "Prijs vooraf", "Berging na ongeluk", "Rijdend en niet-rijdend", "Sloop- en schadeauto's", "Standplaats Den Haag"],
  en: ["Available 24/7", "Towing", "Breakdown help", "Car transport", "Netherlands and Europe", "Price up front", "Accident recovery", "Drivable or not", "Based in The Hague"],
  de: ["24/7 erreichbar", "Abschleppdienst", "Pannenhilfe", "Autotransport", "Niederlande und Europa", "Preis vorab", "Unfallbergung", "Fahrbereit oder nicht", "Standort Den Haag"]
};
export function ticker(lang = "nl") {
  const items = TICKER[lang].map((t) => `<span class="ticker-item">${t}</span><span class="ticker-sep"></span>`).join("");
  return `<div class="ticker" role="presentation">
      <div class="ticker-track" aria-hidden="true">${items}${items}</div>
      <p class="sr-only">${TICKER[lang].join(", ")}</p>
    </div>`;
}

// ---------- Kaart van de regio (inline SVG) ----------
export function regioMap(highlight = "", { linked = true } = {}) {
  // Extra plaatsen alleen tonen op hun eigen pagina, anders wordt de kaart te vol
  const dots = regio.places.filter((p) => !p.extra || p.slug === highlight).map((p) => {
    const on = p.slug === highlight || (!highlight && p.main);
    const [x, y] = p.xy;
    const anchorEnd = ["westland"].includes(p.slug) ? false : false;
    const label = `<text x="${x + 12}" y="${y + 5}"${anchorEnd ? ' text-anchor="end"' : ""}>${p.name}</text>`;
    const inner = `<circle class="dot-ring" cx="${x}" cy="${y}" r="14"/><circle class="dot" cx="${x}" cy="${y}" r="6"/>${label}`;
    return linked
      ? `<a href="/sleepdienst-${p.slug}/" class="place${on ? " on" : ""}">${inner}</a>`
      : `<g class="place${on ? " on" : ""}">${inner}</g>`;
  }).join("");
  const [cx, cy] = regio.center;
  const ring = (km) => `<circle class="km" cx="${cx}" cy="${cy}" r="${(regio.kmPx * km).toFixed(1)}"/>`;
  return `<svg class="regio-map" viewBox="0 0 ${regio.W} ${regio.H}" role="${linked ? "group" : "img"}" aria-label="Kaart van de regio Haaglanden met Den Haag, Rijswijk, Delft, Zoetermeer, Westland, Leidschendam-Voorburg en Wassenaar">
          <rect class="sea" width="${regio.W}" height="${regio.H}"/>
          <path class="land" d="${regio.land}"/>
          ${ring(10)}${ring(20)}
          <text class="km-label" x="${cx}" y="${(cy - regio.kmPx * 10 - 6).toFixed(1)}" text-anchor="middle">10 km</text>
          <text class="km-label" x="${cx}" y="${(cy - regio.kmPx * 20 - 6).toFixed(1)}" text-anchor="middle">20 km</text>
          <text class="sea-label" x="70" y="120">Noordzee</text>
          ${dots}
        </svg>`;
}

// ---------- FAQ ----------
export function faqList(items) {
  return items.map(([q, a]) => `<details>
            <summary>${q}</summary>
            <div class="details-body"><p>${a}</p></div>
          </details>`).join("\n          ");
}

export function faqSchema(items) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q.replace(/<[^>]+>/g, ""),
      acceptedAnswer: { "@type": "Answer", text: a.replace(/<\/p><p>/g, " ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ") }
    }))
  };
}

// ---------- Kaarten met diensten ----------
export function serviceCards(exclude = "") {
  return SERVICES.filter((s) => s.slug !== exclude).map((s) => `<a class="card card-link-block" href="/${s.slug}/">
            <span class="card-icon">${icon(s.icon)}</span>
            <h3>${s.name}</h3>
            <p>${s.short}</p>
            <span class="card-more">Meer informatie ${icon("arrow-right")}</span>
          </a>`).join("\n          ");
}

// Afsluitende balk met knoppen
export function ctaBand(lang = "nl", title = "Direct hulp nodig?", text = "Dag en nacht bereikbaar, ook in het weekend en op feestdagen.") {
  return `<section class="cta-band">
      <div class="wrap cta-band-inner">
        <div data-reveal>
          <h2>${title}</h2>
          <p>${text}</p>
        </div>
        <div class="hero-actions" data-reveal>
          <a class="btn btn-black btn-lg" href="${telHref}">${icon("phone")}${SITE.phoneDisplay}</a>
          <a class="btn btn-white btn-lg" href="${waHref(T[lang].waText)}" target="_blank" rel="noopener">${icon("message-circle")}WhatsApp</a>
        </div>
      </div>
    </section>`;
}

// ---------- Schema.org ----------
export function businessSchema() {
  return {
    "@type": "AutomotiveBusiness",
    "@id": `${SITE.url}/#bedrijf`,
    name: SITE.name,
    description: "24/7 sleepdienst, pechhulp en autotransport vanuit Den Haag, in heel Nederland en Europa.",
    url: `${SITE.url}/`,
    logo: `${SITE.url}/images/logo/logo-compact.webp`,
    image: `${SITE.url}/images/og-image.jpg`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "Op aanvraag",
    address: { "@type": "PostalAddress", streetAddress: SITE.street, postalCode: SITE.postal, addressLocality: SITE.city, addressCountry: "NL" },
    geo: { "@type": "GeoCoordinates", latitude: 52.07, longitude: 4.3 },
    areaServed: [...PLACES.map((p) => p.name), "Nederland", "Europa"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59"
    },
    makesOffer: SERVICES.filter((s) => s.slug !== "zakelijk").map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${SITE.url}/${s.slug}/` }
    }))
  };
}

export function serviceSchema(name, slug, description) {
  return {
    "@type": "Service",
    name,
    description,
    url: `${SITE.url}/${slug}/`,
    provider: { "@id": `${SITE.url}/#bedrijf` },
    areaServed: ["Den Haag", "Nederland", "Europa"]
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", href: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${SITE.url}${c.href}` } : {})
    }))
  };
}

// ---------- Volledige pagina ----------
export function layout(page) {
  const t = T[page.lang];
  const url = `${SITE.url}${page.path}`;
  const schema = page.schema && page.schema.length
    ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": page.schema })}</script>`
    : "";
  const alternates = page.alternates
    ? Object.entries(page.alternates).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${SITE.url}${p}">`).join("\n  ")
    : "";
  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="theme-color" content="#111111">
  ${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
  ${alternates}
  <meta property="og:type" content="${page.ogType || "website"}">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:image" content="${SITE.url}/images/og-image.jpg">
  <meta property="og:url" content="${url}">
  <meta property="og:locale" content="${{ nl: "nl_NL", en: "en_GB", de: "de_DE" }[page.lang]}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/images/favicon-48.png" type="image/png" sizes="48x48">
  <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/fonts/barlow-condensed-latin-800-italic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/barlow-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/css/style.css?v=${page.version}">
  <script>document.documentElement.classList.add("js");setTimeout(function(){if(!window.__motionReady)document.documentElement.classList.add("no-motion");},2500);</script>
  ${schema}
</head>
<body class="${page.bodyClass || ""}">
  <a class="skip" href="#main">${t.skip}</a>
  <svg class="fx-defs" aria-hidden="true" focusable="false">
    <filter id="mblur-1" x="-50%" y="-10%" width="200%" height="120%"><feGaussianBlur stdDeviation="0 0"/></filter>
    <filter id="mblur-2" x="-50%" y="-10%" width="200%" height="120%"><feGaussianBlur stdDeviation="0 0"/></filter>
    <filter id="mblur-3" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="0 0"/></filter>
  </svg>

  ${header(page)}

  <main id="main">
    ${page.hasForm ? page.body : page.body.replaceAll('href="#aanvragen"', 'href="/contact/?type=offerte#aanvragen"')}
  </main>

  ${footer(page)}
  <aside class="quick-contact" aria-label="${t.contact}">
  ${mobileBar(page)}
  <a class="float-wa" href="${waHref(t.waText)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("message-circle")}<span>WhatsApp</span></a>
  </aside>

  <script src="/js/vendor/gsap.min.js" defer></script>
  <script src="/js/vendor/ScrollTrigger.min.js" defer></script>
  <script src="/js/main.js?v=${page.version}" defer></script>
  <script src="/js/motion.js?v=${page.version}" defer></script>
</body>
</html>
`;
}
