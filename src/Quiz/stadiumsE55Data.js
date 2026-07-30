// E55 "Guess the Stadium" — answer = the stadium/arena's common name, image = a real exterior or
// interior photo of the venue. Calibrated by absolute global recognizability of the venue AS SHOWN
// (quiz-difficulty-calibration): easy ~70-95% (globally iconic venues seen constantly on TV/media)
// down to impossible <10% (aimed <3% — genuinely obscure regional venues real fans of that specific
// club/sport would recognize, but almost nobody else).
//
// Item count: 70 (18/18/17/17) — inside the 65-78 target band, different from the last several
// episodes' counts (76, 74, 52), per the "vary item count" note.
//
// Sourcing strategy: Wikipedia pageimages API (piprop=thumbnail&pithumbsize=1200, real User-Agent,
// sequential requests). Stadiums/arenas are extremely well photographed on Wikipedia (heavy sports
// enthusiast contribution), mostly CC-BY-SA with some PD/CC0. See
// out/e55-stadiums-fetch-report.json for exact source/license/attribution per item.
//
// fit: cover is used on the render side — most stadium photos are wide aerial/exterior shots that
// crop cleanly, unlike e.g. paintings which need contain.
//
// Look-alike care: kept to one venue per club/city where multiple exist (e.g. only one Buenos Aires
// venue, one Manchester venue per club) rather than padding with near-identical regional stadiums.
//
// coldSlug (last item, most obscure): "estadio-defensores-del-chaco" — Paraguay's national stadium,
// well-documented and correctly identified but essentially unknown outside Paraguayan football.
export const STADIUMS_E55 = [
  // EASY (18) — ~70-95% globally recognizable on sight
  { slug: "wembley-stadium", name: "Wembley Stadium", country: "England", level: "easy" },
  { slug: "camp-nou", name: "Camp Nou", country: "Spain", level: "easy" },
  { slug: "maracana", name: "Maracanã Stadium", country: "Brazil", level: "easy" },
  { slug: "san-siro", name: "San Siro", country: "Italy", level: "easy" },
  { slug: "old-trafford", name: "Old Trafford", country: "England", level: "easy" },
  { slug: "allianz-arena", name: "Allianz Arena", country: "Germany", level: "easy" },
  { slug: "santiago-bernabeu", name: "Santiago Bernabéu Stadium", country: "Spain", level: "easy" },
  { slug: "yankee-stadium", name: "Yankee Stadium", country: "United States", level: "easy" },
  { slug: "madison-square-garden", name: "Madison Square Garden", country: "United States", level: "easy" },
  { slug: "metlife-stadium", name: "MetLife Stadium", country: "United States", level: "easy" },
  { slug: "rose-bowl", name: "Rose Bowl", country: "United States", level: "easy" },
  { slug: "beijing-national-stadium", name: "Beijing National Stadium (Bird's Nest)", country: "China", level: "easy" },
  { slug: "melbourne-cricket-ground", name: "Melbourne Cricket Ground", country: "Australia", level: "easy" },
  { slug: "michigan-stadium", name: "Michigan Stadium (The Big House)", country: "United States", level: "easy" },
  { slug: "att-stadium", name: "AT&T Stadium", country: "United States", level: "easy" },
  { slug: "fenway-park", name: "Fenway Park", country: "United States", level: "easy" },
  { slug: "lords-cricket-ground", name: "Lord's Cricket Ground", country: "England", level: "easy" },
  { slug: "signal-iduna-park", name: "Signal Iduna Park", country: "Germany", level: "easy" },

  // MEDIUM (18) — ~35-70%, most have seen it somewhere
  { slug: "emirates-stadium", name: "Emirates Stadium", country: "England", level: "medium" },
  { slug: "anfield", name: "Anfield", country: "England", level: "medium" },
  { slug: "stamford-bridge", name: "Stamford Bridge", country: "England", level: "medium" },
  { slug: "etihad-stadium", name: "Etihad Stadium", country: "England", level: "medium" },
  { slug: "parc-des-princes", name: "Parc des Princes", country: "France", level: "medium" },
  { slug: "estadio-azteca", name: "Estadio Azteca", country: "Mexico", level: "medium" },
  { slug: "la-bombonera", name: "La Bombonera", country: "Argentina", level: "medium" },
  { slug: "estadio-monumental-river", name: "Estadio Monumental (River Plate)", country: "Argentina", level: "medium" },
  { slug: "wrigley-field", name: "Wrigley Field", country: "United States", level: "medium" },
  { slug: "dodger-stadium", name: "Dodger Stadium", country: "United States", level: "medium" },
  { slug: "croke-park", name: "Croke Park", country: "Ireland", level: "medium" },
  { slug: "twickenham-stadium", name: "Twickenham Stadium", country: "England", level: "medium" },
  { slug: "eden-gardens", name: "Eden Gardens", country: "India", level: "medium" },
  { slug: "the-gabba", name: "The Gabba", country: "Australia", level: "medium" },
  { slug: "sofi-stadium", name: "SoFi Stadium", country: "United States", level: "medium" },
  { slug: "estadio-da-luz", name: "Estádio da Luz", country: "Portugal", level: "medium" },
  { slug: "johan-cruyff-arena", name: "Johan Cruyff Arena", country: "Netherlands", level: "medium" },
  { slug: "estadio-monumental-peru", name: "Estadio Monumental (Peru)", country: "Peru", level: "medium" },

  // HARD (17) — ~10-35%, enthusiasts/regional fans recognize it
  { slug: "celtic-park", name: "Celtic Park", country: "Scotland", level: "hard" },
  { slug: "ibrox-stadium", name: "Ibrox Stadium", country: "Scotland", level: "hard" },
  { slug: "craven-cottage", name: "Craven Cottage", country: "England", level: "hard" },
  { slug: "london-stadium", name: "London Stadium", country: "England", level: "hard" },
  { slug: "aviva-stadium", name: "Aviva Stadium", country: "Ireland", level: "hard" },
  { slug: "principality-stadium", name: "Principality Stadium", country: "Wales", level: "hard" },
  { slug: "stade-de-france", name: "Stade de France", country: "France", level: "hard" },
  { slug: "veltins-arena", name: "Veltins-Arena", country: "Germany", level: "hard" },
  { slug: "red-bull-arena-leipzig", name: "Red Bull Arena (Leipzig)", country: "Germany", level: "hard" },
  { slug: "estadio-do-dragao", name: "Estádio do Dragão", country: "Portugal", level: "hard" },
  { slug: "estadio-jose-alvalade", name: "Estádio José Alvalade", country: "Portugal", level: "hard" },
  { slug: "estadio-centenario", name: "Estadio Centenario", country: "Uruguay", level: "hard" },
  { slug: "estadio-mineirao", name: "Estádio Mineirão", country: "Brazil", level: "hard" },
  { slug: "soldier-field", name: "Soldier Field", country: "United States", level: "hard" },
  { slug: "lambeau-field", name: "Lambeau Field", country: "United States", level: "hard" },
  { slug: "tokyo-dome", name: "Tokyo Dome", country: "Japan", level: "hard" },
  { slug: "nissan-stadium-yokohama", name: "Nissan Stadium (Yokohama)", country: "Japan", level: "hard" },

  // IMPOSSIBLE (17) — <10%, aimed <3%; genuinely obscure but real, correctly-identified venues
  { slug: "estadio-malvinas-argentinas", name: "Estadio Malvinas Argentinas", country: "Argentina", level: "impossible" },
  { slug: "kingsmeadow", name: "Kingsmeadow", country: "England", level: "impossible" },
  { slug: "recreation-ground-bath", name: "The Recreation Ground", country: "England", level: "impossible" },
  { slug: "loftus-versfeld-stadium", name: "Loftus Versfeld Stadium", country: "South Africa", level: "impossible" },
  { slug: "independence-park-kingston", name: "Independence Park", country: "Jamaica", level: "impossible" },
  { slug: "ullevaal-stadion", name: "Ullevaal Stadion", country: "Norway", level: "impossible" },
  { slug: "parken-stadium", name: "Parken Stadium", country: "Denmark", level: "impossible" },
  { slug: "tele2-arena", name: "Tele2 Arena", country: "Sweden", level: "impossible" },
  { slug: "rheinenergiestadion", name: "RheinEnergieStadion", country: "Germany", level: "impossible" },
  { slug: "volksparkstadion", name: "Volksparkstadion", country: "Germany", level: "impossible" },
  { slug: "stadion-miejski-wroclaw", name: "Stadion Miejski Wrocław", country: "Poland", level: "impossible" },
  { slug: "pge-narodowy", name: "PGE Narodowy", country: "Poland", level: "impossible" },
  { slug: "puskas-arena", name: "Puskás Aréna", country: "Hungary", level: "impossible" },
  { slug: "arena-nationala", name: "Arena Națională", country: "Romania", level: "impossible" },
  { slug: "toumba-stadium", name: "Toumba Stadium", country: "Greece", level: "impossible" },
  { slug: "oaca-spyros-louis", name: "OACA Spyros Louis", country: "Greece", level: "impossible" },
  { slug: "estadio-defensores-del-chaco", name: "Estadio Defensores del Chaco", country: "Paraguay", level: "impossible" },
];
