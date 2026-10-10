// Homepage, werkgebied, veelgestelde vragen, contact, privacy en 404
import {
  SITE, icon, img, ctaButtons, aanvraagSection, faqList, faqSchema, breadcrumbSchema,
  businessSchema, serviceCards, regioMap, ctaBand, pageHero, telHref, waHref, PLACES, T, ticker
} from "../site.mjs";

// ---------- Veelgestelde vragen ----------
const FAQ_GROUPS = [
  ["Pech en afslepen", [
    ["Wat moet ik doen als ik pech heb?", "Zet je alarmlichten aan en trek, als dat veilig kan, een veiligheidshesje aan. Ga op een veilige plek staan. Sta je op de snelweg? Ga dan achter de vangrail staan.</p><p>Bel ons vervolgens op 06&nbsp;44&nbsp;55&nbsp;66&nbsp;74 of stuur je locatie via het formulier.</p><p>Bij direct gevaar of gewonden bel je altijd eerst 112."],
    ["Zijn jullie echt 24/7 bereikbaar?", "Ja. Wij zijn 24 uur per dag, 7 dagen per week bereikbaar, ook in het weekend en op feestdagen."],
    ["Moet ik lid zijn van een pechhulpdienst?", "Nee. Iedereen kan ons bellen, ook zonder lidmaatschap of abonnement."],
    ["Mag ik meerijden in de sleepwagen?", "Meestal wel. Geef het even door als je belt, dan houden we er rekening mee."],
    ["Hoe deel ik mijn locatie?", "Druk in het formulier op 'Gebruik mijn locatie'. Je telefoon vraagt om toestemming, daarna gaat je exacte locatie mee in het WhatsApp-bericht."]
  ]],
  ["Transport", [
    ["Vervoeren jullie ook auto’s die niet meer rijden?", "Ja. Ook niet-rijdende auto’s en schadeauto’s kunnen wij veilig op het oprijplateau laden en vervoeren."],
    ["Kunnen jullie ook naar het buitenland?", "Ja. Wij verzorgen autotransport door heel Nederland en naar of vanuit andere Europese landen."],
    ["Welke voertuigen kunnen jullie vervoeren?", "Personenauto's, bestelbussen, campers, motoren en scooters. Twijfel je over een voertuig? Vraag het ons."],
    ["Hoe snel kunnen jullie een transport plannen?", "Vaak al op korte termijn. Geef je gewenste datum door in het formulier, dan laten we weten wat er kan."]
  ]],
  ["Prijzen", [
    ["Wat kost afslepen of autotransport?", "De kosten zijn afhankelijk van de situatie, de afstand en het type voertuig. Daarom werken wij met prijzen op aanvraag. Vul het formulier in of neem telefonisch contact met ons op. Je ontvangt vooraf een duidelijke prijsopgave."],
    ["Krijg ik vooraf een prijs?", "Ja. Je weet waar je aan toe bent voordat we beginnen."]
  ]],
  ["Auto verkopen", [
    ["Kopen jullie ook auto’s op?", "Ja. Wij kopen onder andere sloop- en schadeauto’s op. We beoordelen de auto en doen je een passend bod.</p><p>Kies ‘Auto verkopen’ in het formulier en stuur indien mogelijk een aantal foto’s van de auto mee."],
    ["Moet ik de auto zelf brengen?", "Nee, wij halen de auto op met de oprijwagen."]
  ]],
  ["Het formulier", [
    ["Waarom vragen jullie mijn kenteken?", "Met het kenteken zoekt de website in de openbare gegevens van de RDW het merk, model en bouwjaar op. Zo weten we direct welk voertuig het is en welke prijs past."],
    ["Kan ik mijn kenteken scannen?", "Ja. Druk op het camera-icoon naast het kenteken en maak een foto van de plaat. Controleer daarna even of het kenteken goed is overgenomen."],
    ["Wat als ik geen WhatsApp heb?", "Dan kun je je aanvraag per e-mail sturen via de link onder het formulier, of gewoon bellen."]
  ]]
];
const FAQ_ALL = FAQ_GROUPS.flatMap(([, items]) => items);
const FAQ_HOME = [FAQ_GROUPS[0][1][0], FAQ_GROUPS[2][1][0], FAQ_GROUPS[0][1][1], FAQ_GROUPS[1][1][1], FAQ_GROUPS[1][1][0], FAQ_GROUPS[3][1][0]];

// ---------- Diensten op de homepage ----------
const HOME_SERVICES = [
  ["battery-charging", "Pechhulp", "Starthulp, een band wisselen of een kleine reparatie langs de weg. We helpen je weer zo snel mogelijk op weg.", "/pechhulp/"],
  ["truck", "Auto afslepen", "Je auto wordt veilig op de oprijwagen naar de garage, naar huis of naar een adres naar keuze gebracht.", "/auto-afslepen/"],
  ["route", "Autotransport", "Gepland vervoer van je auto door Nederland en Europa. Bijvoorbeeld naar een garage, dealer, koper of ander adres.", "/autotransport/"],
  ["triangle-alert", "Berging na een ongeluk", "Na een aanrijding halen we je voertuig snel en veilig van de weg en zorgen we ervoor dat de locatie zo snel mogelijk wordt vrijgemaakt.", "/ongevalsberging/"],
  ["container", "Bestelbus en camper", "Ook grotere voertuigen, zoals bestelbussen en campers, kunnen wij veilig en vakkundig vervoeren.", "/auto-afslepen/"],
  ["motorbike", "Motor en scooter", "Is je motor of scooter defect of beschadigd? Wij vervoeren deze zorgvuldig en zetten hem veilig vast op de oprijwagen.", "/auto-afslepen/"],
  ["hand-coins", "Sloop- en schadeauto’s", "Wil je van je oude, beschadigde of sloopauto af? Wij halen de auto bij je op en doen je een eerlijk bod.", "/auto-verkopen/"],
  ["warehouse", "Stalling", "Heeft je voertuig tijdelijk een veilige plek nodig? Wij kunnen het voertuig stallen, bijvoorbeeld in afwachting van een reparatie, transport of afhandeling met de verzekering.", "/ongevalsberging/"]
];

// ---------- Home ----------
const home = {
  path: "/",
  lang: "nl",
  title: "Sleepdienst De Tak | 24/7 sleepdienst en autotransport Den Haag",
  description: "Sleepdienst De Tak uit Den Haag: 24/7 pechhulp, auto afslepen en autotransport in heel Nederland en Europa. Prijs vooraf. Bel 06 44 55 66 74.",
  hasForm: true,
  bodyClass: "is-home",
  alternates: { nl: "/", en: "/en/", de: "/de/", "x-default": "/" },
  schema: [businessSchema(), faqSchema(FAQ_HOME)],
  body: `
    <section id="top" class="hero">
      <div class="hero-media">${img("sleepwagens-nacht", "Twee gele sleepwagens van Sleepdienst De Tak 's nachts op straat", { priority: true, cls: "hero-bg" })}</div>
      <div class="hero-shade"></div>
      <div class="wrap hero-grid">
        <div class="hero-content">
          <p class="eyebrow" data-hero><span class="live-dot" aria-hidden="true"></span> Nu bereikbaar &middot; 24/7</p>
          <h1>
            <span class="line"><span class="line-inner" data-mblur="1">Pech of een ongeluk?</span></span>
            <span class="line"><span class="line-inner accent" data-mblur="2">Wij komen eraan.</span></span>
          </h1>
          <p class="lead" data-hero>Sleepdienst en autotransport vanuit Den Haag. Dag en nacht snel ter plaatse, in heel Nederland en Europa.</p>
          <p class="hero-points" data-hero><span>24/7 bereikbaar</span><span>Nederland &amp; Europa</span><span>Duidelijke prijs vooraf</span></p>
          <div class="hero-actions" data-hero>
            <a class="btn btn-yellow btn-lg" href="${telHref}">${icon("phone")}Bel direct</a>
            <a class="btn btn-ghost btn-lg" href="#aanvragen" data-tab-link="offerte">${icon("clipboard-list")}Offerte aanvragen</a>
          </div>
        </div>

        <aside class="quick-card" data-hero aria-labelledby="quick-title">
          <p class="quick-title" id="quick-title">${icon("scan-line")} Direct regelen</p>
          <p class="quick-sub">Vul je kenteken in en kies wat je nodig hebt. Wij zoeken je auto op.</p>
          <div class="plate plate-sm">
            <span class="plate-eu" aria-hidden="true"><span class="plate-stars"></span>NL</span>
            <input id="quick-plate" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="10" placeholder="AB-123-C" aria-label="Kenteken">
          </div>
          <div class="quick-types">
            <button type="button" data-quick="pech">${icon("battery-charging")}<span>Pech</span></button>
            <button type="button" data-quick="offerte">${icon("route")}<span>Transport</span></button>
            <button type="button" data-quick="verkoop">${icon("hand-coins")}<span>Verkopen</span></button>
          </div>
        </aside>
      </div>
    </section>

    ${ticker("nl")}

    <section class="trust" aria-label="Waarom De Tak">
      <div class="wrap trust-grid" data-stagger>
        <div class="trust-item">${icon("clock")}<span><strong>24/7</strong> bereikbaar</span></div>
        <div class="trust-item">${icon("globe")}<span><strong>NL &amp; Europa</strong> werkgebied</span></div>
        <div class="trust-item">${icon("badge-euro")}<span><strong>Prijs vooraf</strong> op aanvraag</span></div>
        <div class="trust-item">${icon("shield-check")}<span><strong>Op het plateau</strong> vervoerd</span></div>
      </div>
    </section>

    <section id="diensten" class="section">
      <div class="wrap">
        <div class="section-head">
          <div>
            <p class="kicker" data-reveal>Wat we doen</p>
            <h2 data-reveal>Onze diensten</h2>
          </div>
          <p class="section-lead" data-reveal>Van een lege accu tot het transport van een auto naar Spanje. Wij helpen je snel en veilig met pechhulp, berging en autotransport. Je ontvangt vooraf een duidelijke prijsopgave.</p>
        </div>
        <div class="cards cards-4" data-stagger>
          ${HOME_SERVICES.map(([ic, title, text, href]) => `<a class="card card-link-block" href="${href}">
            <span class="card-icon">${icon(ic)}</span>
            <h3>${title}</h3>
            <p>${text}</p>
            <span class="card-more">Meer informatie ${icon("arrow-right")}</span>
          </a>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section section-dark how">
      <div class="wrap">
        <p class="kicker" data-reveal>Waarom De Tak?</p>
        <h2 data-reveal>Als je stilstaat, telt elke minuut</h2>
        <ol class="how-steps" data-stagger>
          <li>
            <span class="how-icon">${icon("navigation")}</span>
            <span class="how-num">01</span>
            <h3>Snel ter plaatse</h3>
            <p>Vanuit Den Haag zijn we snel in de regio en kunnen we ook landelijk en internationaal transport verzorgen. We geven vooraf duidelijk aan wanneer je ons kunt verwachten.</p>
          </li>
          <li>
            <span class="how-icon">${icon("shield-check")}</span>
            <span class="how-num">02</span>
            <h3>Ervaring</h3>
            <p>We weten hoe we verschillende voertuigen veilig moeten laden, vastzetten en vervoeren. Je voertuig is bij ons in goede handen.</p>
          </li>
          <li>
            <span class="how-icon">${icon("clock")}</span>
            <span class="how-num">03</span>
            <h3>24/7 bereikbaar</h3>
            <p>Overdag, ’s nachts, in het weekend of op een feestdag: je kunt ons 24 uur per dag, 7 dagen per week bereiken.</p>
          </li>
        </ol>
      </div>
    </section>

    <section id="autotransport" class="section transport">
      <div class="wrap transport-grid">
        <figure class="transport-photo" data-wipe>
          ${img("golf-oprijwagen", "Zwarte Volkswagen Golf op het oprijplateau van de gele Sprinter", { sizes: "(max-width: 960px) 90vw, 40vw" })}
        </figure>
        <div class="transport-text">
          <p class="kicker" data-reveal>Autotransport</p>
          <h2 data-reveal>Je auto van A naar B, in heel Nederland en Europa</h2>
          <p data-reveal>Een auto gekocht in Groningen of Duitsland? Moet je auto naar de garage, naar een APK-keuring of naar een ander adres? Wij regelen het transport op een moment dat het jou uitkomt.</p>
          <ul class="checks" data-stagger>
            <li>Rijdende én niet-rijdende auto’s</li>
            <li>Schadeauto’s, sportwagens en oldtimers</li>
            <li>Van en naar garage, dealer, veiling of koper</li>
            <li>Transport binnen Nederland en naar het buitenland</li>
            <li>Zorgvuldig vastgezet op een professioneel oprijplateau</li>
          </ul>
          <div class="hero-actions" data-reveal>
            <a class="btn btn-yellow btn-lg" href="#aanvragen" data-tab-link="offerte">${icon("clipboard-list")}Vraag een offerte aan</a>
            <a class="btn btn-outline btn-lg" href="/autotransport/">Meer over transport</a>
          </div>
        </div>
      </div>
    </section>

    ${aanvraagSection({ alt: true })}

    <section class="section section-dark gallery-section" aria-label="Foto's van ons werk">
      <div class="wrap">
        <p class="kicker" data-reveal>Onderweg</p>
        <h2 data-reveal>Dag en nacht op de weg</h2>
        <p class="section-lead" data-reveal>Of je nu overdag, ’s avonds, ’s nachts of in het weekend pech krijgt: Sleepdienst De Tak staat voor je klaar.</p>
      </div>
      <div class="wrap gallery">
        <figure data-wipe>${img("transport-nacht", "Zwarte auto 's nachts op de oprijwagen van De Tak", { sizes: "(max-width: 760px) 72vw, 33vw" })}</figure>
        <figure data-wipe>${img("sprinter-oprijplateau", "Gele Mercedes Sprinter met oprijplateau langs de weg", { sizes: "(max-width: 760px) 72vw, 33vw" })}</figure>
        <figure data-wipe>${img("golf-oprijwagen", "Schadeauto veilig vastgezet op de oprijwagen", { sizes: "(max-width: 760px) 72vw, 33vw" })}</figure>
      </div>
    </section>

    <section id="werkgebied" class="section">
      <div class="wrap werk-grid">
        <div>
          <p class="kicker" data-reveal>Werkgebied</p>
          <h2 data-reveal>Vanuit Den Haag naar heel Nederland en Europa</h2>
          <p data-reveal>Onze standplaats is Den Haag. Daardoor zijn we snel beschikbaar in Den Haag en omgeving, waaronder Rijswijk, Delft, Voorburg, Leidschendam, Wassenaar, Zoetermeer en het Westland.</p>
          <p data-reveal>Moet je voertuig verder weg? Geen probleem. Wij verzorgen transport door heel Nederland en naar of vanuit andere Europese landen, bijvoorbeeld Duitsland, België en Frankrijk.</p>
          <p class="area-line" data-reveal>Den Haag <span>·</span> Regio Haaglanden <span>·</span> Nederland <span>·</span> Europa</p>
          <ul class="tags tags-links" data-stagger>
            ${PLACES.map((p) => `<li><a href="/sleepdienst-${p.slug}/">${p.name}</a></li>`).join("")}
          </ul>
          <a class="text-link" href="/werkgebied/" data-reveal>Bekijk het hele werkgebied ${icon("arrow-right")}</a>
        </div>
        <figure class="map-figure" data-wipe>
          <img src="/images/kaart-europa.svg" alt="Kaart van Europa met Nederland in het geel en Den Haag als standplaats" width="800" height="640" loading="lazy">
        </figure>
      </div>
    </section>

    <section class="section section-yellow business-band">
      <div class="wrap business-inner">
        <div data-reveal>
          <p class="kicker">Zakelijk</p>
          <h2>Garage, dealer of leasemaatschappij?</h2>
          <p>Gepland of op afroep transport, met één vast aanspreekpunt. In heel Nederland en Europa.</p>
        </div>
        <a class="btn btn-black btn-lg" href="/zakelijk/" data-reveal>${icon("building-2")}Zakelijke mogelijkheden</a>
      </div>
    </section>

    <section id="over-ons" class="section">
      <div class="wrap over-grid">
        <figure class="over-logo" data-wipe>
          <img src="/images/logo/logo-wagen.webp" alt="Logo van Sleepdienst De Tak: gele sleepwagen met de tekst 24/7 sleepdienst en autotransport" width="1100" height="527" loading="lazy">
        </figure>
        <div>
          <p class="kicker" data-reveal>Over ons</p>
          <h2 data-reveal>Een nieuwe sleepdienst met ervaring</h2>
          <p data-reveal>Sleepdienst De Tak is een nieuw bedrijf uit Den Haag, opgericht door mensen met ervaring in het vak. We beschikken over een Mercedes Sprinter met oprijplateau, geschikt voor het vervoeren van personenauto’s, bestelbussen en motoren.</p>
          <p data-reveal>Bij ons krijg je geen callcenter, maar direct contact met de mensen die je ook daadwerkelijk komen helpen. We vertellen vooraf wat de kosten zijn en gaan zorgvuldig met jouw voertuig om.</p>
          <a class="btn btn-yellow btn-lg" href="${telHref}" data-reveal>${icon("phone")}Bel ons: ${SITE.phoneDisplay}</a>
        </div>
      </div>
    </section>

    <section id="faq" class="section section-alt">
      <div class="wrap narrow">
        <p class="kicker" data-reveal>Veelgestelde vragen</p>
        <h2 data-reveal>Goed om te weten</h2>
        <div class="faq" data-stagger>
          ${faqList(FAQ_HOME)}
        </div>
        <a class="text-link" href="/veelgestelde-vragen/" data-reveal>Alle veelgestelde vragen ${icon("arrow-right")}</a>
      </div>
    </section>

    ${contactSection()}`
};

function contactSection() {
  return `<section id="contact" class="section section-dark">
      <div class="wrap contact-grid">
        <div>
          <p class="kicker" data-reveal>Contact</p>
          <h2 data-reveal>Direct hulp nodig?</h2>
          <p class="big-phone" data-reveal><a href="${telHref}">${SITE.phoneDisplay}</a></p>
          <p data-reveal>Dag en nacht bereikbaar, ook in het weekend.</p>
          <div class="hero-actions" data-reveal>
            <a class="btn btn-yellow" href="${telHref}">${icon("phone")}Bel direct</a>
            <a class="btn btn-whatsapp" href="${waHref(T.nl.waText)}" target="_blank" rel="noopener">${icon("message-circle")}WhatsApp</a>
          </div>
        </div>
        <dl class="contact-list" data-reveal>
          <div>${icon("map-pin")}<dt>Adres</dt><dd>${SITE.street}<br>${SITE.postal} ${SITE.city}</dd></div>
          <div>${icon("phone")}<dt>Telefoon</dt><dd><a href="${telHref}">${SITE.phoneDisplay}</a></dd></div>
          <div>${icon("mail")}<dt>E-mail</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div>
          <div>${icon("clock")}<dt>Bereikbaar</dt><dd>24 uur per dag, 7 dagen per week</dd></div>
        </dl>
      </div>
    </section>`;
}

// ---------- Werkgebied ----------
const werkCrumbs = [{ name: "Werkgebied" }];
const werkgebied = {
  path: "/werkgebied/",
  lang: "nl",
  title: "Werkgebied | Den Haag, Nederland en Europa | Sleepdienst De Tak",
  description: "Sleepdienst De Tak werkt vanuit Den Haag in de hele regio Haaglanden en rijdt door heel Nederland en Europa. Bekijk het werkgebied.",
  body: `
    ${pageHero({ crumbs: werkCrumbs, kicker: "Standplaats Den Haag", title: "Ons werkgebied", lead: "Vanuit Den Haag zijn we snel in de hele regio. Voor transport rijden we door heel Nederland en Europa.", photo: "sprinter-oprijplateau", focus: "center 55%" })}

    <section class="section">
      <div class="wrap split split-map">
        <div class="prose">
          <p class="kicker" data-reveal>Regio Haaglanden</p>
          <h2 data-reveal>Snel ter plaatse in de regio</h2>
          <p data-reveal>Onze standplaats is in Den Haag. Daardoor zijn we snel bij je in de stad en de gemeenten eromheen. Klik op een plaats voor meer informatie.</p>
          <div class="place-list" data-stagger>
            ${PLACES.map((p) => `<a href="/sleepdienst-${p.slug}/">${icon("map-pin")}<span>Sleepdienst ${p.name}</span>${icon("arrow-right", "arrow")}</a>`).join("\n            ")}
          </div>
        </div>
        <div class="map-card" data-reveal>
          ${regioMap()}
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="wrap werk-grid">
        <div>
          <p class="kicker" data-reveal>Nederland en Europa</p>
          <h2 data-reveal>Transport over langere afstand</h2>
          <p data-reveal>Een auto gekocht aan de andere kant van het land, of in het buitenland? Of moet je auto na pech op vakantie terug naar huis? We rijden door heel Nederland en naar andere Europese landen, zoals België, Duitsland en Frankrijk.</p>
          <ul class="checks" data-stagger>
            <li>Heel Nederland</li>
            <li>België, Duitsland, Frankrijk en verder</li>
            <li>Rijdende en niet-rijdende auto's</li>
          </ul>
          <a class="btn btn-yellow btn-lg" href="/autotransport/#aanvragen" data-reveal>${icon("clipboard-list")}Offerte voor transport</a>
        </div>
        <figure class="map-figure" data-wipe>
          <img src="/images/kaart-europa.svg" alt="Kaart van Europa met Nederland in het geel en Den Haag als standplaats" width="800" height="640" loading="lazy">
        </figure>
      </div>
    </section>

    ${ctaBand()}`,
  schema: [businessSchema(), breadcrumbSchema(werkCrumbs)]
};

// ---------- Veelgestelde vragen ----------
const faqCrumbs = [{ name: "Veelgestelde vragen" }];
const faqPage = {
  path: "/veelgestelde-vragen/",
  lang: "nl",
  title: "Veelgestelde vragen | Sleepdienst De Tak",
  description: "Antwoorden op veelgestelde vragen over pechhulp, afslepen, autotransport, prijzen en auto verkopen bij Sleepdienst De Tak in Den Haag.",
  body: `
    ${pageHero({ crumbs: faqCrumbs, title: "Veelgestelde vragen", lead: "Staat je vraag er niet tussen? Bel of app ons, dan helpen we je direct.", photo: "transport-nacht", focus: "center 62%" })}

    <section class="section">
      <div class="wrap faq-layout">
        <nav class="faq-nav" aria-label="Onderwerpen">
          <p class="kicker">Onderwerpen</p>
          ${FAQ_GROUPS.map(([g], i) => `<a href="#onderwerp-${i + 1}">${g}</a>`).join("\n          ")}
        </nav>
        <div>
          ${FAQ_GROUPS.map(([g, items], i) => `<div class="faq-group" id="onderwerp-${i + 1}">
            <h2 data-reveal>${g}</h2>
            <div class="faq" data-stagger>
              ${faqList(items)}
            </div>
          </div>`).join("\n          ")}
        </div>
      </div>
    </section>

    ${ctaBand("nl", "Vraag niet beantwoord?", "Bel of app ons. We zijn dag en nacht bereikbaar.")}`,
  schema: [businessSchema(), breadcrumbSchema(faqCrumbs), faqSchema(FAQ_ALL)]
};

// ---------- Contact ----------
const contactCrumbs = [{ name: "Contact" }];
const contact = {
  path: "/contact/",
  lang: "nl",
  title: "Contact | 24/7 bereikbaar | Sleepdienst De Tak",
  description: `Neem contact op met Sleepdienst De Tak in Den Haag. Bel ${SITE.phoneDisplay}, stuur een WhatsApp of e-mail naar ${SITE.email}. Dag en nacht bereikbaar.`,
  hasForm: true,
  body: `
    ${pageHero({ crumbs: contactCrumbs, kicker: "Nu bereikbaar", title: "Contact", lead: "Dag en nacht bereikbaar. Bel, app of vul het formulier in.", photo: "sleepwagens-nacht", focus: "20% 60%", buttons: false })}

    <section class="section">
      <div class="wrap contact-cards" data-stagger>
        <a class="contact-card" href="${telHref}">
          <span class="contact-card-icon">${icon("phone")}</span>
          <span class="contact-card-label">Bellen</span>
          <strong>${SITE.phoneDisplay}</strong>
          <span>24/7, ook in het weekend</span>
        </a>
        <a class="contact-card" href="${waHref(T.nl.waText)}" target="_blank" rel="noopener">
          <span class="contact-card-icon wa">${icon("message-circle")}</span>
          <span class="contact-card-label">WhatsApp</span>
          <strong>Stuur een bericht</strong>
          <span>Handig voor foto's en je locatie</span>
        </a>
        <a class="contact-card" href="mailto:${SITE.email}">
          <span class="contact-card-icon">${icon("mail")}</span>
          <span class="contact-card-label">E-mail</span>
          <strong>${SITE.email}</strong>
          <span>Voor offertes en zakelijke vragen</span>
        </a>
        <div class="contact-card">
          <span class="contact-card-icon">${icon("map-pin")}</span>
          <span class="contact-card-label">Adres</span>
          <strong>${SITE.street}</strong>
          <span>${SITE.postal} ${SITE.city}</span>
        </div>
      </div>
    </section>

    ${aanvraagSection({ alt: true, kicker: "Formulier", title: "Stuur je aanvraag" })}

    <section class="section">
      <div class="wrap split split-map">
        <div class="prose">
          <p class="kicker" data-reveal>Bedrijfsgegevens</p>
          <h2 data-reveal>${SITE.name}</h2>
          <dl class="company-data" data-reveal>
            <dt>Adres</dt><dd>${SITE.street}, ${SITE.postal} ${SITE.city}</dd>
            <dt>Telefoon</dt><dd><a href="${telHref}">${SITE.phoneDisplay}</a></dd>
            <dt>E-mail</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd>
            <dt>KvK-nummer</dt><dd>${SITE.kvk || '<span class="todo-dark">volgt</span>'}</dd>
            <dt>Btw-nummer</dt><dd>${SITE.btw || '<span class="todo-dark">volgt</span>'}</dd>
            <dt>Bereikbaar</dt><dd>24 uur per dag, 7 dagen per week</dd>
          </dl>
        </div>
        <div class="map-card" data-reveal>
          ${regioMap("den-haag")}
        </div>
      </div>
    </section>`,
  schema: [businessSchema(), breadcrumbSchema(contactCrumbs)]
};

// ---------- Privacy ----------
const privacy = {
  path: "/privacy/",
  lang: "nl",
  title: "Privacyverklaring | Sleepdienst De Tak",
  description: "Lees hoe Sleepdienst De Tak omgaat met je persoonsgegevens.",
  noindex: true,
  body: `
    <section class="page">
      <div class="wrap narrow prose">
        <nav class="breadcrumbs breadcrumbs-dark" aria-label="Kruimelpad"><a href="/">Home</a><span>/</span><span aria-current="page">Privacyverklaring</span></nav>
        <h1>Privacyverklaring</h1>
        <p>${SITE.name}, ${SITE.street}, ${SITE.postal} ${SITE.city}, gaat zorgvuldig om met je persoonsgegevens. Hieronder lees je welke gegevens we gebruiken en waarom.</p>

        <h2>Welke gegevens</h2>
        <p>Als je ons belt, appt, mailt of het formulier gebruikt, krijgen we de gegevens die je zelf doorgeeft: je naam, telefoonnummer, kenteken, het soort voertuig, je locatie of adressen en een eventuele opmerking.</p>

        <h2>Waarvoor</h2>
        <p>We gebruiken deze gegevens alleen om je te helpen: om naar je toe te komen, contact met je op te nemen, een prijs te geven, het voertuig te vervoeren en een factuur te maken.</p>

        <h2>Het formulier en WhatsApp</h2>
        <p>Als je op de knop drukt, opent WhatsApp (of je e-mailprogramma) met je bericht. Pas als je het daar verstuurt, ontvangen wij het. Je locatie wordt alleen opgehaald als je zelf op "Gebruik mijn locatie" drukt. Voor het versturen via WhatsApp geldt ook de privacyverklaring van WhatsApp.</p>

        <h2>Kenteken opzoeken en scannen</h2>
        <p>Als je een kenteken invult, zoekt de website het merk, model en bouwjaar op in de openbare gegevens van de RDW. Daarvoor wordt alleen het kenteken naar de RDW gestuurd, geen naam of telefoonnummer. Scan je het kenteken met je camera, dan wordt de foto alleen op je eigen telefoon verwerkt en niet naar ons of anderen verstuurd.</p>

        <h2>Hoe lang bewaren we het</h2>
        <p>We bewaren je gegevens niet langer dan nodig. Gegevens op facturen bewaren we 7 jaar, omdat de wet dat verplicht.</p>

        <h2>Delen met anderen</h2>
        <p>We verkopen je gegevens nooit. We delen ze alleen als dat nodig is voor de opdracht, bijvoorbeeld met de garage waar je voertuig naartoe moet of met je verzekeraar, of als de wet ons dat verplicht.</p>

        <h2>Cookies</h2>
        <p>Deze website gebruikt geen tracking- of advertentiecookies.</p>

        <h2>Je rechten</h2>
        <p>Je mag altijd vragen welke gegevens we van je hebben, en vragen om ze te verbeteren of te verwijderen. Mail daarvoor naar <a href="mailto:${SITE.email}">${SITE.email}</a>. Ben je niet tevreden over hoe we met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.</p>
      </div>
    </section>`
};

// ---------- 404 ----------
const notFound = {
  path: "/404.html",
  file: "404.html",
  lang: "nl",
  title: "Pagina niet gevonden | Sleepdienst De Tak",
  description: "Deze pagina bestaat niet.",
  noindex: true,
  body: `
    <section class="page page-404">
      <div class="wrap narrow center-text">
        <p class="big-404">4<span>0</span>4</p>
        <h1>Deze pagina is weggesleept</h1>
        <p>De pagina die je zoekt bestaat niet (meer). Ga terug naar de homepage, of bel ons als je hulp nodig hebt.</p>
        <div class="hero-actions center-actions">
          <a class="btn btn-yellow btn-lg" href="/">Naar de homepage</a>
          <a class="btn btn-dark btn-lg" href="${telHref}">${icon("phone")}${SITE.phoneDisplay}</a>
        </div>
      </div>
    </section>`
};

export default [home, werkgebied, faqPage, contact, privacy, notFound];
