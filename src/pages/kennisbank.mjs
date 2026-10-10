// Kennisbank: artikelen waar mensen op Google naar zoeken
import {
  SITE, icon, img, pageHero, breadcrumbSchema, businessSchema, ctaBand, telHref, waHref, T, SERVICES
} from "../site.mjs";

const PUBLISHED = "2026-10-10";

export const ARTICLES = [
  {
    slug: "pech-op-de-snelweg",
    title: "Pech op de snelweg: wat moet je doen?",
    metaTitle: "Pech op de snelweg: wat moet je doen? | Sleepdienst De Tak",
    description: "Pech op de snelweg? Lees stap voor stap wat je moet doen om veilig te blijven, wie je belt en hoe je auto snel van de weg komt.",
    photo: "transport-nacht", focus: "center 62%",
    minutes: 4,
    services: ["pechhulp", "auto-afslepen"],
    intro: "Pech op de snelweg is gevaarlijk. Het verkeer rijdt hard en je staat vaak op een plek waar je niet wilt staan. Met deze stappen blijf je zo veilig mogelijk.",
    sections: [
      ["1. Zet je auto zo veilig mogelijk neer", "<p>Merk je dat er iets mis is? Zet direct je alarmlichten aan en probeer de vluchtstrook of een vluchthaven te bereiken. Stuur je auto zo ver mogelijk naar rechts en draai je wielen van de rijbaan af.</p><p>Is er geen vluchtstrook, bijvoorbeeld bij een spitsstrook of werkzaamheden? Probeer dan door te rijden naar de eerstvolgende afrit of parkeerplaats, als dat veilig kan.</p>"],
      ["2. Stap aan de rechterkant uit", "<p>Trek als het kan een veiligheidshesje aan voordat je uitstapt. Stap aan de kant van de berm uit, nooit aan de kant van het verkeer. Laat ook je passagiers aan de rechterkant uitstappen.</p>"],
      ["3. Ga achter de vangrail staan", "<p>Blijf niet in of bij je auto staan. Ga met iedereen achter de vangrail staan, zo ver mogelijk van de weg en een stukje achter je auto (tegen de rijrichting in). Dan ben je beschermd als er iemand tegen je auto aanrijdt.</p><p>Een gevarendriehoek plaatsen op de snelweg wordt afgeraden: het lopen langs de rijbaan is te gevaarlijk.</p>"],
      ["4. Bel voor hulp", "<p>Is er direct gevaar of zijn er gewonden? Bel dan altijd eerst <strong>112</strong>.</p><p>Is iedereen veilig? Bel dan een sleepdienst of pechhulp. Kijk op de hectometerpaaltjes langs de weg: daarop staat het nummer van de weg, de rijrichting (Re of Li) en de afstand. Zo weten wij precies waar je staat. Je kunt ook je GPS-locatie delen via ons formulier.</p>"],
      ["5. Wacht veilig op hulp", "<p>Blijf achter de vangrail tot de hulp er is. Ga niet aan je auto sleutelen langs de rijbaan. Wij zetten je auto op het oprijplateau en brengen hem naar je garage, naar huis of naar een ander adres.</p>"]
    ]
  },
  {
    slug: "wat-kost-auto-afslepen",
    title: "Wat kost auto afslepen?",
    metaTitle: "Wat kost auto afslepen? Dit bepaalt de prijs | De Tak",
    description: "Wat kost het om je auto te laten afslepen? Lees welke factoren de prijs bepalen en hoe je vooraf een duidelijke prijs krijgt.",
    photo: "sprinter-oprijplateau", focus: "center 55%",
    minutes: 3,
    services: ["auto-afslepen", "autotransport"],
    intro: "Er is geen vaste prijs voor afslepen: elke situatie is anders. Wel kun je vooraf weten waar je aan toe bent. Dit zijn de dingen die de prijs bepalen.",
    sections: [
      ["De afstand", "<p>Hoe ver moet je auto? Een rit naar een garage om de hoek kost minder dan transport door het hele land of naar het buitenland. Ook de afstand die wij moeten rijden om bij je te komen telt mee.</p>"],
      ["Het tijdstip", "<p>’s Nachts, in het weekend of op feestdagen gelden vaak andere tarieven dan op een doordeweekse dag. Wij zijn 24/7 bereikbaar, ook op die momenten.</p>"],
      ["Het soort voertuig", "<p>Een personenauto is anders dan een bestelbus, camper of motor. Het formaat, het gewicht en de manier van vastzetten bepalen mee hoeveel werk het is.</p>"],
      ["De staat van de auto", "<p>Rijdt de auto nog, of moet hij met een lier op het plateau getrokken worden? Is er schade na een ongeluk? Ook dat maakt verschil.</p>"],
      ["Zo krijg je vooraf een duidelijke prijs", "<p>Bij Sleepdienst De Tak werken we met prijzen op aanvraag. Vul het formulier in met je kenteken, de ophaal- en afleverplek en wat er aan de hand is, of bel ons. Je hoort vooraf wat het kost, zodat je niet voor verrassingen komt te staan.</p><p>Tip: kijk ook even of je autoverzekering of pechhulpabonnement het afslepen vergoedt.</p>"]
    ]
  },
  {
    slug: "auto-uit-buitenland-laten-ophalen",
    title: "Auto uit het buitenland laten ophalen",
    metaTitle: "Auto uit het buitenland laten ophalen | Sleepdienst De Tak",
    description: "Een auto gekocht in Duitsland, België of verder? Lees hoe je de auto laat ophalen met autotransport en waar je op moet letten.",
    photo: "golf-oprijwagen", focus: "center 58%",
    minutes: 4,
    services: ["autotransport", "zakelijk"],
    intro: "Steeds meer mensen kopen een auto in het buitenland, bijvoorbeeld in Duitsland of België. Zelf ophalen kost veel tijd. Met autotransport komt de auto veilig naar Nederland, zonder kilometers erbij.",
    sections: [
      ["Waarom autotransport?", "<p>Met autotransport hoef je niet zelf heen en weer te reizen. De auto komt op een oprijplateau naar Nederland, dus er komen geen kilometers bij. Je hebt ook geen tijdelijke exportkentekens nodig om ermee te rijden. Ook een auto die niet rijdt of schade heeft, kan zo worden opgehaald.</p>"],
      ["Wat heb je nodig?", "<p>Spreek met de verkoper af wanneer de auto klaarstaat en zorg dat de papieren meegaan, zoals het kentekenbewijs, de aankoopfactuur en eventuele sleutels en onderhoudsboekjes. Vraag de verkoper of er nog iets geregeld moet worden voordat de auto mee mag.</p>"],
      ["Na aankomst in Nederland", "<p>Een auto uit het buitenland moet in Nederland worden gekeurd door de RDW en er moet BPM worden betaald voordat je hem op Nederlands kenteken kunt zetten. Wij kunnen de auto na aankomst naar een keuringsstation of garage brengen. Kijk voor de precieze regels op de websites van de RDW en de Belastingdienst.</p>"],
      ["Een offerte aanvragen", "<p>Geef in ons formulier het ophaaladres in het buitenland, het afleveradres en je gewenste datum door. Je krijgt snel een duidelijke prijs. Wij rijden door heel Europa, bijvoorbeeld naar Duitsland, België en Frankrijk.</p>"]
    ]
  },
  {
    slug: "sloopauto-of-schadeauto-verkopen",
    title: "Sloopauto of schadeauto verkopen: zo werkt het",
    metaTitle: "Sloopauto of schadeauto verkopen: zo werkt het | De Tak",
    description: "Je sloopauto of schadeauto verkopen zonder gedoe? Lees hoe je een eerlijk bod krijgt, wat je klaarlegt en hoe de overschrijving gaat.",
    photo: "golf-oprijwagen", focus: "center 58%",
    minutes: 3,
    services: ["auto-verkopen", "ongevalsberging"],
    intro: "Een auto met schade, motorproblemen of zonder APK verkoop je niet makkelijk via een advertentie. Gelukkig kan het ook eenvoudiger.",
    sections: [
      ["Stap 1: zet de gegevens klaar", "<p>Zoek het kenteken, de kilometerstand en een korte beschrijving van de schade of het probleem op. Hoe eerlijker en vollediger, hoe beter het bod dat je krijgt klopt.</p>"],
      ["Stap 2: maak een paar foto’s", "<p>Maak foto’s van alle kanten, van de schade, het interieur en de kilometerstand. Bij ons stuur je die na het invullen van het formulier direct via WhatsApp mee.</p>"],
      ["Stap 3: ontvang een bod", "<p>Op basis van de gegevens en foto’s doen wij je een passend bod. Je zit nergens aan vast: jij beslist of je het accepteert.</p>"],
      ["Stap 4: ophalen en overschrijven", "<p>Ga je akkoord, dan halen wij de auto op met de oprijwagen. Spreek altijd af hoe de overschrijving of afmelding bij de RDW wordt geregeld, zodat de auto niet meer op jouw naam staat. Bewaar het bewijs daarvan goed.</p>"]
    ]
  },
  {
    slug: "elektrische-auto-afslepen",
    title: "Elektrische auto afslepen: waar moet je op letten?",
    metaTitle: "Elektrische auto afslepen: waar let je op? | De Tak",
    description: "Een elektrische of hybride auto afslepen gaat anders dan een benzineauto. Lees waarom een oprijplateau belangrijk is en wat je moet doen bij pech.",
    photo: "transport-nacht", focus: "center 62%",
    minutes: 3,
    services: ["auto-afslepen", "pechhulp"],
    intro: "Steeds meer mensen rijden elektrisch of hybride. Krijg je pech met zo’n auto, dan is het belangrijk dat hij op de juiste manier wordt vervoerd.",
    sections: [
      ["Waarom niet slepen aan een kabel?", "<p>Bij veel elektrische auto’s zijn de wielen direct verbonden met de elektromotor. Als de auto met de wielen over de weg wordt gesleept, kan de motor stroom opwekken en kan er schade ontstaan. Daarom raden veel fabrikanten aan om een elektrische auto niet aan een kabel of met de aangedreven wielen op de weg te slepen. Kijk in de handleiding van je auto wat de fabrikant adviseert.</p>"],
      ["Een oprijplateau is de veiligste keuze", "<p>Op een oprijplateau staan alle wielen stil op de wagen. Zo komt er geen belasting op de motor en de aandrijving. Sleepdienst De Tak vervoert auto’s altijd op het plateau van onze Mercedes Sprinter.</p>"],
      ["Lege accu of lege batterij?", "<p>Een elektrische auto heeft ook een gewone 12-voltaccu. Is die leeg, dan start de auto soms niet, ook al is de grote batterij vol. Is de grote batterij leeg, dan moet de auto naar een laadpaal of naar huis worden gebracht.</p>"],
      ["Bij pech", "<p>Zet je auto veilig neer, ga op een veilige plek staan en bel ons. Vertel dat het om een elektrische of hybride auto gaat. Vul je kenteken in op ons formulier, dan zien wij direct om welke auto het gaat.</p>"]
    ]
  },
  {
    slug: "wat-te-doen-na-een-ongeluk",
    title: "Wat te doen na een ongeluk met je auto?",
    metaTitle: "Wat te doen na een ongeluk met je auto? | Sleepdienst De Tak",
    description: "Een aanrijding gehad? Lees stap voor stap wat je moet doen: veiligheid, 112, het schadeformulier, foto’s en het weghalen van je auto.",
    photo: "sleepwagens-nacht", focus: "20% 60%",
    minutes: 4,
    services: ["ongevalsberging", "auto-afslepen"],
    intro: "Een ongeluk komt altijd onverwacht. Door de juiste stappen te zetten, blijf je veilig en voorkom je problemen met de verzekering.",
    sections: [
      ["1. Zorg eerst voor veiligheid", "<p>Zet je alarmlichten aan, trek als het kan een veiligheidshesje aan en zorg dat iedereen op een veilige plek staat. Op de snelweg ga je achter de vangrail staan.</p>"],
      ["2. Bel 112 bij gewonden of gevaar", "<p>Zijn er gewonden, is er gevaar of lekt er brandstof? Bel dan direct <strong>112</strong>. Is er niemand gewond, maar staat de weg vast of is er onenigheid, bel dan de politie op 0900-8844.</p>"],
      ["3. Vul het schadeformulier in", "<p>Vul samen met de andere partij het Europees schadeformulier in, op papier of via een app. Noteer de namen, adressen, kentekens en verzekeringsgegevens van alle betrokkenen en eventuele getuigen.</p>"],
      ["4. Maak foto’s", "<p>Maak foto’s van de schade, de positie van de auto’s, de omgeving en eventuele remsporen. Dat helpt bij de afhandeling met de verzekering.</p>"],
      ["5. Laat je auto veilig weghalen", "<p>Kan de auto niet meer rijden? Bel dan een sleepdienst. Wij halen je auto weg en brengen hem naar je eigen garage, een schadehersteller of naar de stalling, totdat duidelijk is wat de verzekering doet. Let op: op de snelweg bepalen de politie of de weginspecteur soms welke berger komt.</p>"],
      ["6. Meld de schade bij je verzekeraar", "<p>Neem zo snel mogelijk contact op met je verzekeraar en stuur het schadeformulier en de foto’s mee.</p>"]
    ]
  }
];

const hubCrumbs = [{ name: "Kennisbank" }];

function articleCard(a) {
  return `<a class="card card-link-block article-card" href="/kennisbank/${a.slug}/">
            <span class="article-photo">${img(a.photo, "", { sizes: "(max-width: 640px) 100vw, 33vw", style: `object-position:${a.focus}` })}</span>
            <span class="article-meta">${icon("clock")} ${a.minutes} min lezen</span>
            <h3>${a.title}</h3>
            <p>${a.description}</p>
            <span class="card-more">Lees verder ${icon("arrow-right")}</span>
          </a>`;
}

export function articleTeasers(slugs) {
  return ARTICLES.filter((a) => slugs.includes(a.slug)).map(articleCard).join("\n          ");
}

const hub = {
  path: "/kennisbank/",
  lang: "nl",
  title: "Kennisbank: tips bij pech, afslepen en transport | De Tak",
  description: "Handige tips en uitleg over pech op de snelweg, de kosten van afslepen, autotransport uit het buitenland, elektrische auto’s en meer.",
  body: `
    ${pageHero({ crumbs: hubCrumbs, title: "Kennisbank", lead: "Handige tips en uitleg over pech, afslepen, ongelukken en autotransport. Staat je vraag er niet tussen? Bel of app ons.", photo: "sprinter-oprijplateau", focus: "center 55%" })}

    <section class="section">
      <div class="wrap">
        <p class="kicker" data-reveal>Artikelen</p>
        <h2 data-reveal>Goed voorbereid op de weg</h2>
        <div class="cards" data-stagger>
          ${ARTICLES.map(articleCard).join("\n          ")}
        </div>
      </div>
    </section>

    ${ctaBand()}`,
  schema: [businessSchema(), breadcrumbSchema(hubCrumbs), {
    "@type": "CollectionPage",
    name: "Kennisbank",
    url: `${SITE.url}/kennisbank/`,
    hasPart: ARTICLES.map((a) => ({ "@type": "Article", headline: a.title, url: `${SITE.url}/kennisbank/${a.slug}/` }))
  }]
};

function articlePage(a) {
  const crumbs = [{ name: "Kennisbank", href: "/kennisbank/" }, { name: a.title }];
  const services = SERVICES.filter((s) => a.services.includes(s.slug));
  const others = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  const body = `
    ${pageHero({ crumbs, kicker: `${a.minutes} min lezen`, title: a.title, lead: a.intro, photo: a.photo, focus: a.focus })}

    <section class="section">
      <div class="wrap article-layout">
        <article class="prose article-body">
          ${a.sections.map(([h, html]) => `<h2>${h}</h2>\n          ${html}`).join("\n          ")}
          <p class="article-date">Bijgewerkt op 10 oktober 2026</p>
        </article>
        <aside class="article-aside" aria-label="Hulp en diensten">
          <div class="aside-card">
            <p class="aside-title">Direct hulp nodig?</p>
            <p>Dag en nacht bereikbaar, ook in het weekend en op feestdagen.</p>
            <a class="btn btn-yellow btn-block" href="${telHref}">${icon("phone")}${SITE.phoneDisplay}</a>
            <a class="btn btn-whatsapp btn-block" href="${waHref(T.nl.waText)}" target="_blank" rel="noopener">${icon("message-circle")}WhatsApp</a>
            <a class="btn btn-outline btn-block" href="/contact/?type=offerte#aanvragen">${icon("clipboard-list")}Offerte aanvragen</a>
          </div>
          <div class="aside-links">
            <p class="aside-title">Onze diensten</p>
            ${services.map((s) => `<a href="/${s.slug}/">${icon(s.icon)}<span>${s.name}</span>${icon("arrow-right", "arrow")}</a>`).join("\n            ")}
          </div>
        </aside>
      </div>
    </section>

    <section class="section section-alt">
      <div class="wrap">
        <p class="kicker" data-reveal>Kennisbank</p>
        <h2 data-reveal>Meer handige artikelen</h2>
        <div class="cards" data-stagger>
          ${others.map(articleCard).join("\n          ")}
        </div>
      </div>
    </section>

    ${ctaBand()}`;
  return {
    path: `/kennisbank/${a.slug}/`,
    lang: "nl",
    title: a.metaTitle,
    description: a.description,
    ogType: "article",
    body,
    schema: [businessSchema(), breadcrumbSchema(crumbs), {
      "@type": "Article",
      headline: a.title,
      description: a.description,
      image: `${SITE.url}/images/og-image.jpg`,
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      author: { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` },
      publisher: { "@id": `${SITE.url}/#bedrijf` },
      mainEntityOfPage: `${SITE.url}/kennisbank/${a.slug}/`
    }]
  };
}

export default [hub, ...ARTICLES.map(articlePage)];
