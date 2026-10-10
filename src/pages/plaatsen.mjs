// Pagina per plaats in de regio
import {
  SITE, icon, pageHero, aanvraagSection, faqList, faqSchema, breadcrumbSchema,
  businessSchema, regioMap, ctaBand, PLACES, SERVICES
} from "../site.mjs";

const DATA = {
  "den-haag": {
    photo: "sleepwagens-nacht", focus: "20% 60%",
    lead: "Onze standplaats is in Den Haag. Daardoor zijn we snel bij je, in elke wijk van de stad en op de snelwegen eromheen.",
    local: [
      "Van Scheveningen tot Ypenburg en van Loosduinen tot Leidschenveen: Den Haag is onze thuisbasis. Op een plek waar je niet lang kunt blijven staan, zoals een drukke straat in het centrum, telt elke minuut.",
      "Ook op de A4, A12 en A13 rond de stad en op de Utrechtsebaan helpen we je. Op de snelweg is het belangrijk dat je eerst veilig achter de vangrail gaat staan voordat je belt."
    ],
    areas: ["Centrum", "Scheveningen", "Segbroek", "Loosduinen", "Escamp", "Laak", "Haagse Hout", "Ypenburg", "Leidschenveen"]
  },
  rijswijk: {
    photo: "transport-nacht", focus: "center 62%",
    lead: "Rijswijk ligt direct naast onze standplaats in Den Haag. Pech of transport nodig in Rijswijk? Dan zijn we er snel.",
    local: [
      "Of je nu in een woonwijk staat, op bedrijventerrein Plaspoelpolder of in Rijswijk-Buiten: we komen naar je toe met de oprijwagen.",
      "Rijswijk ligt tussen de A4 en de A13, twee drukke snelwegen. Krijg je daar pech, ga dan eerst veilig achter de vangrail staan en bel ons daarna."
    ],
    areas: ["Oud-Rijswijk", "Plaspoelpolder", "Rijswijk-Buiten", "Havenkwartier", "Te Werve", "Steenvoorde"]
  },
  delft: {
    photo: "golf-oprijwagen", focus: "center 58%",
    lead: "Pech in Delft of een auto die van of naar Delft moet? Vanuit Den Haag zijn we er zo, dag en nacht.",
    local: [
      "In de binnenstad van Delft zijn de straten smal en is parkeren lastig. Met onze compacte Sprinter met oprijplateau kunnen we op plekken komen waar een grote vrachtwagen niet past.",
      "Ook bij de TU, op Technopolis, in Tanthof en op de A13 en A4 rond Delft kun je ons bellen."
    ],
    areas: ["Binnenstad", "Tanthof", "Voorhof", "Buitenhof", "Hof van Delft", "Wippolder", "TU-wijk", "Den Hoorn"]
  },
  zoetermeer: {
    photo: "sprinter-oprijplateau", focus: "center 55%",
    lead: "Sleepdienst en pechhulp in Zoetermeer. Via de A12 zijn we snel vanuit Den Haag bij je.",
    local: [
      "Zoetermeer ligt aan de A12, een van de drukste snelwegen van het land. Op de snelweg of in de stad: we komen naar je toe en nemen je auto mee als het moet.",
      "Ook voor transport van en naar autobedrijven en garages in Zoetermeer kun je bij ons terecht."
    ],
    areas: ["Centrum", "Dorp", "Meerzicht", "Rokkeveen", "Seghwaert", "Noordhove", "Oosterheem", "Driemanspolder"]
  },
  westland: {
    photo: "transport-nacht", focus: "center 62%",
    lead: "Pechhulp, afslepen en transport in het Westland. Voor particulieren en voor bedrijven in de tuinbouw.",
    local: [
      "Het Westland heeft veel bedrijven die elke dag op de weg zijn. Staat er een auto of bestelbus stil op de N211 of de N213, bij een kas of op een bedrijventerrein? Dan komen we eraan.",
      "We helpen in alle kernen van de gemeente, van Naaldwijk tot Monster en van 's-Gravenzande tot Wateringen."
    ],
    areas: ["Naaldwijk", "Monster", "'s-Gravenzande", "Wateringen", "De Lier", "Poeldijk", "Honselersdijk", "Maasdijk", "Kwintsheul"]
  },
  "leidschendam-voorburg": {
    photo: "sleepwagens-nacht", focus: "20% 60%",
    lead: "Leidschendam-Voorburg grenst aan Den Haag. Daardoor zijn we snel bij je voor pechhulp, afslepen of transport.",
    local: [
      "In Voorburg, Leidschendam en Stompwijk: we kennen de omgeving en komen naar je toe met de oprijwagen.",
      "Ook op de N14 en op de A4 en A12 vlakbij kun je ons bellen. Op de snelweg ga je eerst veilig achter de vangrail staan."
    ],
    areas: ["Voorburg", "Voorburg-West", "Leidschendam", "Stompwijk", "Damsigt", "Prinsenhof"]
  },
  wassenaar: {
    photo: "golf-oprijwagen", focus: "center 58%",
    lead: "Sleepdienst, pechhulp en autotransport in Wassenaar. Ook voor oldtimers en bijzondere auto's.",
    local: [
      "In Wassenaar staan veel mooie en bijzondere auto's. Die vervoeren we op een oprijplateau en zetten we goed vast, zodat ze zonder schade aankomen.",
      "Pech op de N44 richting Leiden, bij de Wassenaarse Slag of in het dorp? Bel ons, dan komen we eraan."
    ],
    areas: ["Dorp", "Kerkehout", "Rijksdorp", "De Kieviet", "Oostdorp", "Wassenaarse Slag", "Maaldrift"]
  }
};

function placePage(place) {
  const d = DATA[place.slug];
  const crumbs = [{ name: "Werkgebied", href: "/werkgebied/" }, { name: place.name }];
  const faq = [
    [`Hoe snel zijn jullie in ${place.name}?`, `Dat hangt af van waar we op dat moment zijn. Als je belt, hoor je direct een eerlijke inschatting van hoe laat we er zijn.`],
    [`Zijn jullie in ${place.name} ook 's nachts bereikbaar?`, "Ja, we zijn 24 uur per dag en 7 dagen per week bereikbaar, ook in het weekend en op feestdagen."],
    ["Wat kost het?", "Onze prijzen zijn op aanvraag, omdat elke rit anders is. Je hoort de prijs altijd vooraf."]
  ];
  const others = PLACES.filter((p) => p.slug !== place.slug);
  const body = `
    ${pageHero({ crumbs, kicker: "24/7 bereikbaar", title: `Sleepdienst ${place.name}`, lead: d.lead, photo: d.photo, focus: d.focus })}

    <section class="section">
      <div class="wrap split">
        <div class="prose">
          <p class="kicker" data-reveal>${place.name}</p>
          <h2 data-reveal>Pech, afslepen of transport in ${place.name}</h2>
          ${d.local.map((p) => `<p data-reveal>${p}</p>`).join("\n          ")}
          <h3 class="small-title" data-reveal>Wijken en kernen</h3>
          <ul class="tags" data-stagger>${d.areas.map((a) => `<li>${a}</li>`).join("")}</ul>
        </div>
        <div class="map-card" data-reveal>
          ${regioMap(place.slug)}
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="wrap">
        <p class="kicker" data-reveal>Diensten in ${place.name}</p>
        <h2 data-reveal>Waarmee we je helpen</h2>
        <div class="cards cards-dark" data-stagger>
          ${SERVICES.map((s) => `<a class="card card-link-block" href="/${s.slug}/">
            <span class="card-icon">${icon(s.icon)}</span>
            <h3>${s.name}</h3>
            <p>${s.short}</p>
            <span class="card-more">Meer informatie ${icon("arrow-right")}</span>
          </a>`).join("\n          ")}
        </div>
      </div>
    </section>

    ${aanvraagSection({ type: "pech", title: `Hulp nodig in ${place.name}?`, lead: "Vul je kenteken en locatie in. Alles gaat in één bericht via WhatsApp naar ons, dan bellen we je terug." })}

    <section class="section section-alt">
      <div class="wrap narrow">
        <p class="kicker" data-reveal>Veelgestelde vragen</p>
        <h2 data-reveal>Sleepdienst in ${place.name}</h2>
        <div class="faq" data-stagger>
          ${faqList(faq)}
        </div>
        <h3 class="small-title" data-reveal>Ook actief in</h3>
        <ul class="tags tags-links" data-stagger>${others.map((p) => `<li><a href="/sleepdienst-${p.slug}/">${p.name}</a></li>`).join("")}<li><a href="/werkgebied/">Heel Nederland en Europa</a></li></ul>
      </div>
    </section>

    ${ctaBand("nl", `Pech in ${place.name}?`)}`;

  return {
    path: `/sleepdienst-${place.slug}/`,
    lang: "nl",
    title: place.name.length > 12 ? `Sleepdienst ${place.name} | 24/7 | De Tak` : `Sleepdienst ${place.name} | 24/7 pechhulp en afslepen | De Tak`,
    description: `Sleepdienst in ${place.name}: 24/7 pechhulp, auto afslepen en autotransport. De Tak komt vanuit Den Haag snel naar je toe. Bel ${SITE.phoneDisplay}.`,
    hasForm: true,
    body,
    schema: [businessSchema(), breadcrumbSchema(crumbs), faqSchema(faq)]
  };
}

export default PLACES.map(placePage);
