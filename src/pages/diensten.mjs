// Aparte pagina per dienst
import {
  SITE, icon, img, pageHero, aanvraagSection, faqList, faqSchema, serviceSchema,
  breadcrumbSchema, businessSchema, serviceCards, ctaBand, telHref
} from "../site.mjs";
import { ARTICLES, articleTeasers } from "./kennisbank.mjs";

function featureGrid(items) {
  return items.map(([ic, title, text]) => `<div class="feature">
            <span class="feature-icon">${icon(ic)}</span>
            <div><h3>${title}</h3><p>${text}</p></div>
          </div>`).join("\n          ");
}

function servicePage(d) {
  const crumbs = [{ name: d.name }];
  const body = `
    ${pageHero({ crumbs, kicker: d.kicker || "24/7 bereikbaar", title: d.h1, lead: d.lead, photo: d.photo, focus: d.focus })}

    <section class="section">
      <div class="wrap split">
        <div class="prose">
          <p class="kicker" data-reveal>${d.introKicker}</p>
          <h2 data-reveal>${d.introTitle}</h2>
          ${d.intro.map((p) => `<p data-reveal>${p}</p>`).join("\n          ")}
          ${d.checks ? `<ul class="checks" data-stagger>${d.checks.map((c) => `<li>${c}</li>`).join("")}</ul>` : ""}
        </div>
        <figure class="split-photo" data-wipe>
          ${img(d.sidePhoto, d.sideAlt, { sizes: "(max-width: 960px) 100vw, 40vw" })}
        </figure>
      </div>
    </section>

    <section class="section section-dark">
      <div class="wrap">
        <p class="kicker" data-reveal>${d.featuresKicker || "Wat je van ons krijgt"}</p>
        <h2 data-reveal>${d.featuresTitle}</h2>
        <div class="features" data-stagger>
          ${featureGrid(d.features)}
        </div>
      </div>
    </section>

    ${aanvraagSection({ type: d.formType, title: d.formTitle, lead: d.formLead })}

    <section class="section section-alt">
      <div class="wrap narrow">
        <p class="kicker" data-reveal>Veelgestelde vragen</p>
        <h2 data-reveal>${d.faqTitle || "Goed om te weten"}</h2>
        <div class="faq" data-stagger>
          ${faqList(d.faq)}
        </div>
      </div>
    </section>

    ${(() => {
      const rel = ARTICLES.filter((a) => a.services.includes(d.slug)).map((a) => a.slug).slice(0, 3);
      return rel.length ? `<section class="section">
      <div class="wrap">
        <p class="kicker" data-reveal>Kennisbank</p>
        <h2 data-reveal>Handige artikelen</h2>
        <div class="cards" data-stagger>
          ${articleTeasers(rel)}
        </div>
      </div>
    </section>` : "";
    })()}

    <section class="section section-alt">
      <div class="wrap">
        <p class="kicker" data-reveal>Meer van De Tak</p>
        <h2 data-reveal>Andere diensten</h2>
        <div class="cards" data-stagger>
          ${serviceCards(d.slug)}
        </div>
      </div>
    </section>

    ${ctaBand()}`;

  return {
    path: `/${d.slug}/`,
    lang: "nl",
    title: d.title,
    description: d.description,
    hasForm: true,
    body,
    schema: [businessSchema(), serviceSchema(d.name, d.slug, d.description), breadcrumbSchema(crumbs), faqSchema(d.faq)]
  };
}

export default [
  servicePage({
    slug: "pechhulp",
    name: "Pechhulp",
    title: "Pechhulp Den Haag | 24/7 hulp bij pech | Sleepdienst De Tak",
    description: "Pech in Den Haag of omgeving? Sleepdienst De Tak helpt 24/7 met starthulp, band wisselen en kleine reparaties. Lukt het niet, dan slepen we je auto weg.",
    h1: "Pechhulp, dag en nacht",
    lead: "Lege accu, lekke band of een auto die niet meer wil? Bel of app, dan komen we naar je toe. Ook als je geen lid bent van een pechhulpdienst.",
    photo: "sleepwagens-nacht",
    focus: "20% 60%",
    introKicker: "Pechhulp",
    introTitle: "Snel weer op weg",
    intro: [
      "Staat je auto stil langs de weg, op een parkeerplaats of voor de deur? We komen met de sleepwagen naar je toe en kijken eerst of we je ter plaatse weer op weg kunnen helpen.",
      "Lukt dat niet, dan zetten we je auto direct op het plateau en brengen we hem naar je garage, naar huis of naar een ander adres. Je hoeft dus niet twee keer te bellen."
    ],
    checks: ["Starthulp bij een lege accu", "Band wisselen met je reservewiel", "Kleine reparaties ter plaatse", "Lukt het niet, dan slepen we direct af", "Voor iedereen, ook zonder lidmaatschap"],
    sidePhoto: "transport-nacht",
    sideAlt: "Sleepwagen van De Tak 's nachts onderweg met een auto op het plateau",
    featuresTitle: "Waarom pechhulp van De Tak",
    features: [
      ["clock", "24/7 bereikbaar", "Ook 's nachts, in het weekend en op feestdagen krijg je iemand aan de lijn."],
      ["navigation", "Locatie in één klik", "Deel je GPS-locatie via het formulier, dan weten we precies waar je staat."],
      ["badge-euro", "Prijs vooraf", "Je hoort wat het kost voordat we beginnen. Geen verrassingen achteraf."],
      ["truck", "Direct afslepen als het moet", "We komen met een oprijwagen, dus je auto kan meteen mee als het nodig is."]
    ],
    formType: "pech",
    formTitle: "Pech melden",
    formLead: "Vul je kenteken en locatie in. Alles gaat in één bericht via WhatsApp naar ons, dan bellen we je terug.",
    faq: [
      ["Wat moet ik doen als ik pech heb?", "Zet je alarmlichten aan, trek een veiligheidshesje aan en ga op een veilige plek staan. Op de snelweg ga je achter de vangrail staan. Bel ons daarna of stuur je locatie via het formulier."],
      ["Moet ik lid zijn van een pechhulpdienst?", "Nee. Iedereen kan ons bellen, ook zonder lidmaatschap of abonnement."],
      ["Wat als jullie mijn auto niet ter plaatse kunnen maken?", "Dan slepen we hem direct weg naar je garage, naar huis of naar een ander adres. We hebben een oprijwagen bij ons."],
      ["Wat kost pechhulp?", "Dat hangt af van de plek, het tijdstip en wat er mis is. Je hoort de prijs vooraf, zodat je niet voor verrassingen komt te staan."]
    ]
  }),

  servicePage({
    slug: "auto-afslepen",
    name: "Auto afslepen",
    title: "Auto afslepen Den Haag | 24/7 sleepdienst | Sleepdienst De Tak",
    description: "Auto, bestelbus, camper of motor afslepen in Den Haag en omgeving. Sleepdienst De Tak is 24/7 bereikbaar en vervoert je voertuig veilig op een oprijwagen.",
    h1: "Auto afslepen",
    lead: "Je auto, bestelbus, camper of motor veilig op de oprijwagen naar de garage, naar huis of naar een adres naar keuze. Dag en nacht.",
    photo: "transport-nacht",
    focus: "center 62%",
    introKicker: "Afslepen",
    introTitle: "Veilig vervoerd op een oprijwagen",
    intro: [
      "We slepen niet aan een kabel, maar zetten je voertuig op het plateau van onze Mercedes Sprinter. Zo komen er geen extra kilometers op je auto en blijft hij heel.",
      "Waar moet hij naartoe? Naar je eigen garage, de dealer, je huisadres of een ander adres. Moet de auto even blijven staan, dan kunnen we hem ook tijdelijk voor je stallen."
    ],
    checks: ["Personenauto's", "Bestelbussen en campers", "Motoren en scooters", "Elektrische en hybride auto's", "Tijdelijke stalling als het nodig is"],
    sidePhoto: "sprinter-oprijplateau",
    sideAlt: "Gele Mercedes Sprinter met het oprijplateau omlaag",
    featuresTitle: "Zo werkt afslepen bij De Tak",
    features: [
      ["phone", "Bel of app", "Vertel waar je staat en waar de auto naartoe moet. Je hoort direct de prijs."],
      ["navigation", "We komen eraan", "We zeggen eerlijk hoe laat we er zijn en houden je op de hoogte."],
      ["shield-check", "Goed vastgezet", "Je voertuig gaat op het plateau en wordt met spanbanden vastgezet."],
      ["map-pin", "Afgeleverd waar jij wilt", "Garage, dealer, thuis of stalling. Je mag meestal meerijden."]
    ],
    formType: "pech",
    formTitle: "Afslepen aanvragen",
    formLead: "Vul je kenteken en locatie in en kies waar de auto naartoe moet. We nemen zo snel mogelijk contact met je op.",
    faq: [
      ["Kunnen jullie ook een auto slepen die niet rijdt?", "Ja. We trekken de auto met een lier op het plateau, ook als hij niet meer start of niet kan sturen."],
      ["Mag ik meerijden in de sleepwagen?", "Meestal wel. Geef het even door als je belt, dan houden we er rekening mee."],
      ["Slepen jullie ook elektrische auto's?", "Ja. Elektrische auto's horen op een plateau vervoerd te worden, en dat is precies hoe wij werken."],
      ["Kunnen jullie mijn auto ook stallen?", "Ja, als de auto even niet naar de garage kan, bijvoorbeeld in afwachting van de verzekering, kunnen we hem tijdelijk stallen."]
    ]
  }),

  servicePage({
    slug: "autotransport",
    name: "Autotransport",
    title: "Autotransport Nederland en Europa | Sleepdienst De Tak",
    description: "Autotransport vanuit Den Haag door heel Nederland en Europa. Rijdende en niet-rijdende auto's, schadeauto's en oldtimers. Vraag direct een offerte aan.",
    h1: "Autotransport in Nederland en Europa",
    lead: "Een auto gekocht in Groningen of Duitsland? Moet je wagen naar de garage, de APK of een nieuw adres? Wij plannen het transport op een moment dat jou past.",
    photo: "golf-oprijwagen",
    focus: "center 58%",
    kicker: "Prijs op aanvraag",
    introKicker: "Autotransport",
    introTitle: "Je auto van A naar B, zonder kilometers erbij",
    intro: [
      "Met autotransport komt je auto veilig aan zonder dat iemand ermee hoeft te rijden. Handig als je een auto koopt of verkoopt op afstand, als hij niet rijklaar is, of als je zelf geen tijd hebt.",
      "We halen de auto op waar hij staat en leveren hem af waar jij wilt: bij een garage, dealer, veiling, koper of bij je thuis. Binnen Nederland en naar of vanuit het buitenland."
    ],
    checks: ["Rijdende en niet-rijdende auto's", "Schadeauto's, sportwagens en oldtimers", "Van en naar garage, dealer, veiling of koper", "Binnenland en buitenland", "Goed vastgezet op een oprijplateau"],
    sidePhoto: "golf-oprijwagen",
    sideAlt: "Zwarte Volkswagen Golf op het oprijplateau van de gele Sprinter",
    featuresKicker: "Zo werkt het",
    featuresTitle: "In drie stappen geregeld",
    features: [
      ["clipboard-list", "1. Offerte aanvragen", "Vul het kenteken, het ophaal- en afleveradres en je gewenste datum in."],
      ["badge-euro", "2. Prijs en planning", "Je krijgt snel een prijs en we spreken samen een moment af."],
      ["truck", "3. Ophalen en afleveren", "We halen de auto op, zetten hem goed vast en leveren hem netjes af."],
      ["globe", "Ook naar het buitenland", "België, Duitsland, Frankrijk of verder: vraag het ons, dan kijken we wat er kan."]
    ],
    formType: "offerte",
    formTitle: "Offerte voor autotransport",
    formLead: "Vul het kenteken in, dan zien we direct om welke auto het gaat. Geef het ophaal- en afleveradres door en je krijgt snel een prijs.",
    faq: [
      ["Wat kost autotransport?", "Dat hangt af van de afstand, de auto en of hij rijdt. Vraag een offerte aan, dan hoor je vooraf precies wat het kost."],
      ["Vervoeren jullie ook auto's die niet rijden?", "Ja. Niet-rijdende auto's en schadeauto's lieren we veilig op het plateau."],
      ["Kunnen jullie een auto uit het buitenland ophalen?", "Ja. We rijden door heel Europa. Geef het adres door in het formulier, dan maken we een offerte."],
      ["Hoe snel kunnen jullie een transport plannen?", "Vaak al op korte termijn. Geef je gewenste datum door, dan laten we weten wat er kan."]
    ]
  }),

  servicePage({
    slug: "ongevalsberging",
    name: "Berging na ongeluk",
    title: "Berging na een ongeluk in Den Haag | Sleepdienst De Tak",
    description: "Ongeluk gehad? Sleepdienst De Tak haalt je voertuig snel en veilig weg, brengt het naar je garage of schadehersteller en stalt het tijdelijk. 24/7.",
    h1: "Berging na een ongeluk",
    lead: "Na een aanrijding wil je dat het snel en goed geregeld wordt. We halen je voertuig veilig weg en brengen het naar de plek die jij of je verzekeraar kiest.",
    photo: "transport-nacht",
    focus: "center 62%",
    introKicker: "Ongevalsberging",
    introTitle: "Eerst veiligheid, dan je auto",
    intro: [
      "Is er iemand gewond of is de situatie gevaarlijk? Bel dan altijd eerst 112. Daarna helpen wij met het weghalen van je voertuig.",
      "We zetten de auto op het plateau en brengen hem naar je eigen garage, een schadehersteller of naar de stalling, tot duidelijk is wat de verzekering doet. Op de snelweg bepalen de politie of de weginspecteur soms welke berger komt. Op andere wegen en op eigen terrein kun je ons direct bellen."
    ],
    checks: ["Personenauto's, bestelbussen en motoren", "Naar garage, schadehersteller of huis", "Tijdelijke stalling tot het geregeld is", "Ook als de auto niet meer rijdt"],
    sidePhoto: "sleepwagens-nacht",
    sideAlt: "Gele sleepwagens van De Tak 's nachts klaar voor vertrek",
    featuresTitle: "Wat we voor je regelen",
    features: [
      ["clock", "Dag en nacht", "Ongelukken gebeuren niet alleen overdag. We zijn 24/7 bereikbaar."],
      ["warehouse", "Stalling", "Moet de auto blijven staan tot de verzekering reageert? Dan stallen we hem tijdelijk."],
      ["clipboard-list", "Rustig en duidelijk", "We vertellen wat we doen en waar je auto naartoe gaat."],
      ["route", "Daarna verder vervoeren", "Moet de auto later naar een andere garage of naar de sloop? Dat kan ook."]
    ],
    formType: "pech",
    formTitle: "Berging aanvragen",
    formLead: "Kies 'Ongeluk' bij het probleem en deel je locatie. Of bel direct, dat is na een ongeluk vaak het snelst.",
    faq: [
      ["Wat moet ik doen na een ongeluk?", "Zorg eerst voor veiligheid en bel 112 als er gewonden zijn of als er gevaar is. Vul daarna samen met de andere partij het schadeformulier in en bel ons voor het weghalen van je voertuig."],
      ["Waar gaat mijn auto naartoe?", "Naar de plek die jij kiest: je eigen garage, een schadehersteller, je huis of onze stalling."],
      ["Betaalt mijn verzekering de berging?", "Dat hangt af van je verzekering. Vraag het na bij je verzekeraar; wij kunnen je de gegevens geven die zij nodig hebben."],
      ["Kunnen jullie de auto ook later naar de sloop brengen?", "Ja. En als je de auto wilt verkopen, kunnen we ook een bod doen."]
    ]
  }),

  servicePage({
    slug: "auto-verkopen",
    name: "Auto verkopen",
    title: "Sloopauto of schadeauto verkopen | Sleepdienst De Tak",
    description: "Sloopauto of schadeauto verkopen in Den Haag en omgeving? Stuur het kenteken en een paar foto's, dan doet Sleepdienst De Tak een bod en halen we de auto op.",
    h1: "Sloop- of schadeauto verkopen",
    lead: "Van je oude, kapotte of beschadigde auto af? Stuur het kenteken en een paar foto's, dan doen we je een bod en halen we hem op.",
    photo: "golf-oprijwagen",
    focus: "center 58%",
    kicker: "Snel een bod",
    introKicker: "Auto verkopen",
    introTitle: "Geen gedoe met advertenties",
    intro: [
      "Een auto met schade, motorproblemen of zonder APK verkoop je niet makkelijk via een advertentie. Bij ons hoef je geen kijkers te ontvangen of te onderhandelen met onbekenden.",
      "Vul het formulier in met het kenteken, de kilometerstand en de staat van de auto. Stuur daarna in WhatsApp een paar foto's mee. Je krijgt snel een bod, en als je akkoord gaat halen we de auto op. Hoe de overschrijving of afmelding wordt geregeld, spreken we vooraf met je af."
    ],
    checks: ["Schadeauto's", "Sloopauto's", "Auto's zonder APK", "Auto's die niet meer rijden", "Wij halen de auto op"],
    sidePhoto: "golf-oprijwagen",
    sideAlt: "Schadeauto veilig vastgezet op de oprijwagen",
    featuresKicker: "Zo werkt het",
    featuresTitle: "Van aanvraag tot ophalen",
    features: [
      ["clipboard-list", "1. Kenteken en gegevens", "Vul het kenteken in, dan zien we direct om welke auto het gaat."],
      ["camera", "2. Foto's via WhatsApp", "Stuur een paar foto's van de auto en de schade."],
      ["hand-coins", "3. Bod", "Je krijgt snel een bod. Je zit nergens aan vast."],
      ["truck", "4. Ophalen", "Akkoord? Dan plannen we een moment en halen we de auto op."]
    ],
    formType: "verkoop",
    formTitle: "Auto aanbieden",
    formLead: "Vul het kenteken, de kilometerstand en de staat in. Na het versturen kun je in WhatsApp direct foto's meesturen.",
    faq: [
      ["Welke auto's kopen jullie?", "Vooral schadeauto's, sloopauto's, auto's zonder APK en auto's die niet meer rijden. Twijfel je? Stuur het kenteken, dan laten we het weten."],
      ["Moet ik de auto zelf brengen?", "Nee, wij halen de auto op met de oprijwagen."],
      ["Hoe wordt de overschrijving geregeld?", "Dat spreken we vooraf met je af, zodat je precies weet wanneer de auto niet meer op jouw naam staat."],
      ["Zit ik vast aan het bod?", "Nee. Je krijgt een bod en beslist zelf of je het accepteert."]
    ]
  }),

  servicePage({
    slug: "zakelijk",
    name: "Zakelijk",
    title: "Zakelijk autotransport en sleepdienst | Sleepdienst De Tak",
    description: "Autotransport en sleepdienst voor garages, autobedrijven, dealers en leasemaatschappijen. Gepland of op afroep, in heel Nederland en Europa.",
    h1: "Zakelijk transport en sleepdienst",
    lead: "Voor garages, autobedrijven, dealers, leasemaatschappijen en verhuurbedrijven. Gepland of op afroep, in heel Nederland en Europa.",
    photo: "sprinter-oprijplateau",
    focus: "center 55%",
    kicker: "Voor bedrijven",
    introKicker: "Zakelijk",
    introTitle: "Een vaste partner voor je voertuigen",
    intro: [
      "Moeten er regelmatig auto's van of naar je bedrijf? Denk aan inkoop van een andere locatie, levering aan een klant, een auto die naar de spuiterij moet of een huurauto met pech. Wij plannen het in, of komen direct als het spoed heeft.",
      "Je hebt één aanspreekpunt en hoeft niet steeds een nieuwe partij te zoeken. Afspraken over planning, prijzen en facturatie maken we samen, passend bij hoe jouw bedrijf werkt."
    ],
    checks: ["Garages en schadeherstelbedrijven", "Autobedrijven en dealers", "Leasemaatschappijen en verhuurbedrijven", "Inkoop en levering in binnen- en buitenland", "Ook voor parkeerterreinen en bedrijfsterreinen"],
    sidePhoto: "sprinter-oprijplateau",
    sideAlt: "Sprinter van De Tak met leeg oprijplateau klaar voor een ophaalrit",
    featuresTitle: "Wat we zakelijke klanten bieden",
    features: [
      ["handshake", "Vast aanspreekpunt", "Je spreekt direct met de mensen die ook rijden. Kort contact, snelle afspraken."],
      ["calendar-check", "Gepland of op afroep", "Vaste ritten inplannen of direct bellen als het spoed heeft."],
      ["clock", "24/7 voor spoed", "Klant met pech met een huur- of leaseauto? Ook 's nachts komen we."],
      ["globe", "Nederland en Europa", "Inkoop of levering in het buitenland kunnen we ook voor je regelen."]
    ],
    formType: "offerte",
    formTitle: "Kennismaken of offerte aanvragen",
    formLead: "Vul een eerste rit in of zet in de opmerking wat je zoekt, bijvoorbeeld vaste ritten per week. We nemen snel contact op.",
    faq: [
      ["Kunnen we vaste afspraken maken?", "Ja. We spreken samen af hoe vaak, tegen welke prijzen en hoe de facturatie loopt."],
      ["Rijden jullie ook voor één losse rit?", "Natuurlijk. Je kunt ook gewoon per rit een offerte aanvragen."],
      ["Kunnen jullie auto's uit het buitenland ophalen?", "Ja. We rijden door heel Europa voor inkoop en levering."],
      ["Hoe snel kunnen jullie bij spoed?", "Bel ons, dan hoor je direct een eerlijke inschatting van wanneer we er kunnen zijn."]
    ]
  })
];

export { featureGrid };
