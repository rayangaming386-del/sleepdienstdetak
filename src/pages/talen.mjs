// Engelse en Duitse homepage (korte versie met formulier)
import { SITE, icon, img, ctaButtons, aanvraagSection, telHref, waHref, T, businessSchema, ticker } from "../site.mjs";

const COPY = {
  en: {
    path: "/en/",
    title: "Sleepdienst De Tak | 24/7 towing and car transport in The Hague",
    description: "24/7 breakdown help, towing and car transport from The Hague, across the Netherlands and Europe. Call +31 6 44 55 66 74 or request a quote via WhatsApp.",
    eyebrow: "Available now · 24/7",
    h1a: "Breakdown or accident?",
    h1b: "We're on our way.",
    lead: "Towing and car transport from The Hague. Day and night, across the Netherlands and Europe. We speak English.",
    servicesKicker: "What we do",
    servicesTitle: "Our services",
    servicesLead: "Prices on request: you always know the price before we start.",
    services: [
      ["battery-charging", "Breakdown help", "Jump start, tyre change or a small repair at the roadside."],
      ["truck", "Towing", "Car, van, camper or motorbike safely on our flatbed to a garage or address of your choice."],
      ["route", "Car transport", "Planned transport across the Netherlands and Europe, drivable or not."],
      ["triangle-alert", "Recovery after an accident", "Your vehicle removed quickly and safely, with storage if needed."],
      ["hand-coins", "Sell your car", "Scrap or damaged car? Send photos and we make you an offer."],
      ["building-2", "Business", "Transport for garages, car dealers and leasing companies."]
    ],
    formKicker: "Request",
    formTitle: "Report a breakdown or request a quote",
    formLead: "Enter your Dutch licence plate and we look up the make and model. Foreign plate? Just type the make and model yourself. Everything is sent to us in one WhatsApp message.",
    contactTitle: "Need help right now?",
    contactText: "Available day and night, including weekends.",
    address: "Address", phone: "Phone", email: "Email", hours: "Available", hoursText: "24 hours a day, 7 days a week"
  },
  de: {
    path: "/de/",
    title: "Sleepdienst De Tak | 24/7 Abschleppdienst in Den Haag",
    description: "24/7 Pannenhilfe, Abschleppdienst und Autotransport aus Den Haag, in den Niederlanden und ganz Europa. Rufen Sie +31 6 44 55 66 74 an.",
    eyebrow: "Jetzt erreichbar · 24/7",
    h1a: "Panne oder Unfall?",
    h1b: "Wir sind unterwegs.",
    lead: "Abschleppdienst und Autotransport aus Den Haag. Tag und Nacht, in den ganzen Niederlanden und Europa.",
    servicesKicker: "Unsere Leistungen",
    servicesTitle: "Was wir für Sie tun",
    servicesLead: "Preise auf Anfrage: Sie kennen den Preis immer, bevor wir anfangen.",
    services: [
      ["battery-charging", "Pannenhilfe", "Starthilfe, Reifenwechsel oder eine kleine Reparatur am Straßenrand."],
      ["truck", "Abschleppen", "Auto, Transporter, Wohnmobil oder Motorrad sicher auf unserem Plateau zur Werkstatt oder Wunschadresse."],
      ["route", "Autotransport", "Geplanter Transport in den Niederlanden und ganz Europa, fahrbereit oder nicht."],
      ["triangle-alert", "Bergung nach Unfall", "Ihr Fahrzeug schnell und sicher entfernt, auf Wunsch mit Unterstellung."],
      ["hand-coins", "Auto verkaufen", "Unfall- oder Schrottauto? Schicken Sie Fotos, wir machen Ihnen ein Angebot."],
      ["building-2", "Geschäftskunden", "Transport für Werkstätten, Autohäuser und Leasinggesellschaften."]
    ],
    formKicker: "Anfrage",
    formTitle: "Panne melden oder Angebot anfordern",
    formLead: "Geben Sie Ihr niederländisches Kennzeichen ein, dann suchen wir Marke und Modell. Ausländisches Kennzeichen? Tragen Sie Marke und Modell einfach selbst ein. Alles wird in einer WhatsApp-Nachricht an uns gesendet.",
    contactTitle: "Sofort Hilfe nötig?",
    contactText: "Tag und Nacht erreichbar, auch am Wochenende.",
    address: "Adresse", phone: "Telefon", email: "E-Mail", hours: "Erreichbar", hoursText: "24 Stunden am Tag, 7 Tage die Woche"
  }
};

function langHome(lang) {
  const c = COPY[lang];
  const t = T[lang];
  return {
    path: c.path,
    lang,
    title: c.title,
    description: c.description,
    hasForm: true,
    bodyClass: "is-home",
    alternates: { nl: "/", en: "/en/", de: "/de/", "x-default": "/" },
    schema: [businessSchema()],
    body: `
    <section id="top" class="hero">
      <div class="hero-media">${img("sleepwagens-nacht", "Sleepdienst De Tak tow trucks at night", { priority: true, cls: "hero-bg" })}</div>
      <div class="hero-shade"></div>
      <div class="wrap hero-grid">
        <div class="hero-content">
          <p class="eyebrow" data-hero><span class="live-dot" aria-hidden="true"></span> ${c.eyebrow}</p>
          <h1>
            <span class="line"><span class="line-inner" data-mblur="1">${c.h1a}</span></span>
            <span class="line"><span class="line-inner accent" data-mblur="2">${c.h1b}</span></span>
          </h1>
          <p class="lead" data-hero>${c.lead}</p>
          <div class="hero-actions" data-hero>
            ${ctaButtons(lang)}
          </div>
        </div>
      </div>
    </section>
    ${ticker(lang)}

    <section id="diensten" class="section">
      <div class="wrap">
        <div class="section-head">
          <div>
            <p class="kicker" data-reveal>${c.servicesKicker}</p>
            <h2 data-reveal>${c.servicesTitle}</h2>
          </div>
          <p class="section-lead" data-reveal>${c.servicesLead}</p>
        </div>
        <div class="cards" data-stagger>
          ${c.services.map(([ic, h, p]) => `<div class="card">
            <span class="card-icon">${icon(ic)}</span>
            <h3>${h}</h3>
            <p>${p}</p>
          </div>`).join("\n          ")}
        </div>
      </div>
    </section>

    ${aanvraagSection({ lang, type: "pech", kicker: c.formKicker, title: c.formTitle, lead: c.formLead, alt: true })}

    <section id="contact" class="section section-dark">
      <div class="wrap contact-grid">
        <div>
          <p class="kicker" data-reveal>${t.contact}</p>
          <h2 data-reveal>${c.contactTitle}</h2>
          <p class="big-phone" data-reveal><a href="${telHref}">${SITE.phoneIntlDisplay}</a></p>
          <p data-reveal>${c.contactText}</p>
          <div class="hero-actions" data-reveal>
            <a class="btn btn-yellow" href="${telHref}">${icon("phone")}${t.callNow}</a>
            <a class="btn btn-whatsapp" href="${waHref(t.waText)}" target="_blank" rel="noopener">${icon("message-circle")}WhatsApp</a>
          </div>
        </div>
        <dl class="contact-list" data-reveal>
          <div>${icon("map-pin")}<dt>${c.address}</dt><dd>${SITE.street}<br>${SITE.postal} ${SITE.city}</dd></div>
          <div>${icon("phone")}<dt>${c.phone}</dt><dd><a href="${telHref}">${SITE.phoneIntlDisplay}</a></dd></div>
          <div>${icon("mail")}<dt>${c.email}</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div>
          <div>${icon("clock")}<dt>${c.hours}</dt><dd>${c.hoursText}</dd></div>
        </dl>
      </div>
    </section>`
  };
}

export default [langHome("en"), langHome("de")];
