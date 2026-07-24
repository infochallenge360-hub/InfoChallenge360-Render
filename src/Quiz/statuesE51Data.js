// E51 "Guess the Statue/Monument" — answer = statue/monument name, image = real photo of the statue itself.
// Item count: 72 (18/18/18/18) — chosen to rotate the roster away from the "71" used on E09/E32/E35/E46
// (per feedback_vary_item_count_per_episode) while still splitting cleanly into four even tiers.
// Sourcing strategy: Wikipedia pageimages API (piprop=thumbnail&pithumbsize=1200, real User-Agent,
// sequential requests) as primary source; Wikimedia Commons generator=search as fallback whenever the
// article lead image was a map/plaque/temple-building shot instead of the statue itself. Every non-PD
// image's extmetadata (LicenseShortName + Artist) was captured into e51-statues-fetch-report.json for
// attribution; CC-NC/CC-ND sources were never used.
// Distinction rule applied: this episode is STATUES/SCULPTURAL MONUMENTS ONLY — freestanding figurative
// or commemorative sculptures (bronze/stone figures, giant Buddha statues, war-memorial statues,
// equestrian statues, museum sculptures). Buildings, temples, castles, and ancient ruin SITES already
// covered by E09 (World Landmarks), E32 (Famous Castles), and E35 (Ancient Ruins) were excluded, even
// when a similar place name might appear (e.g. Abu Simbel the site is E35; the Colossi of Memnon, a
// distinct pair of statues at a different site, is used here instead). Exact-item overlap with E09 is
// limited to three statues E09 itself classifies as landmarks but which ARE first-and-foremost statues
// (Statue of Liberty, Christ the Redeemer, Mount Rushmore) — explicitly allowed since the identifying
// image in both cases is the statue, not surrounding architecture. Moai (Easter Island) and the
// Terracotta Army were deliberately left out since E09/E35 already use those exact subjects.
// No Israel-related monuments anywhere in this list (hard rule).
// Absolute difficulty (quiz-difficulty-calibration): easy = globally iconic statues virtually everyone
// has seen a photo of; medium = famous within their country/region and recognizable worldwide via travel
// media; hard = known mainly to enthusiasts/well-traveled viewers; impossible = genuinely obscure even to
// most travelers, verified real and currently documented on Wikipedia/Commons. Last item (Colossus of
// Barletta, an ancient Roman/Byzantine bronze giant in a small Italian city) is the intended "coldSlug".
export const STATUES_E51 = [
  // EASY (18)
  { slug: "statue-of-liberty", name: "Statue of Liberty", country: "United States", level: "easy" },
  { slug: "christ-the-redeemer", name: "Christ the Redeemer", country: "Brazil", level: "easy" },
  { slug: "mount-rushmore", name: "Mount Rushmore", country: "United States", level: "easy" },
  { slug: "great-sphinx-of-giza", name: "Great Sphinx of Giza", country: "Egypt", level: "easy" },
  { slug: "venus-de-milo", name: "Venus de Milo", country: "France", level: "easy" },
  { slug: "lincoln-memorial-statue", name: "Lincoln Memorial Statue", country: "United States", level: "easy" },
  { slug: "winged-victory-of-samothrace", name: "Winged Victory of Samothrace", country: "France", level: "easy" },
  { slug: "charging-bull", name: "Charging Bull", country: "United States", level: "easy" },
  { slug: "nelsons-column", name: "Nelson's Column", country: "United Kingdom", level: "easy" },
  { slug: "merlion", name: "Merlion", country: "Singapore", level: "easy" },
  { slug: "angel-of-independence", name: "Angel of Independence", country: "Mexico", level: "easy" },
  { slug: "statue-of-unity", name: "Statue of Unity", country: "India", level: "easy" },
  { slug: "iwo-jima-memorial", name: "Marine Corps War Memorial (Iwo Jima)", country: "United States", level: "easy" },
  { slug: "tian-tan-buddha", name: "Tian Tan Buddha", country: "Hong Kong", level: "easy" },
  { slug: "great-buddha-of-kamakura", name: "Great Buddha of Kamakura", country: "Japan", level: "easy" },
  { slug: "angel-of-the-north", name: "Angel of the North", country: "United Kingdom", level: "easy" },
  { slug: "queen-victoria-memorial", name: "Victoria Memorial", country: "United Kingdom", level: "easy" },
  { slug: "fearless-girl", name: "Fearless Girl", country: "United States", level: "easy" },

  // MEDIUM (18)
  { slug: "motherland-calls", name: "The Motherland Calls", country: "Russia", level: "medium" },
  { slug: "the-thinker-rodin", name: "The Thinker", country: "France", level: "medium" },
  { slug: "david-michelangelo", name: "David (Michelangelo)", country: "Italy", level: "medium" },
  { slug: "manneken-pis", name: "Manneken Pis", country: "Belgium", level: "medium" },
  { slug: "little-mermaid-copenhagen", name: "The Little Mermaid", country: "Denmark", level: "medium" },
  { slug: "nefertiti-bust", name: "Bust of Nefertiti", country: "Germany", level: "medium" },
  { slug: "pieta-michelangelo", name: "Pietà (Michelangelo)", country: "Vatican City", level: "medium" },
  { slug: "martin-luther-king-memorial", name: "Martin Luther King Jr. Memorial", country: "United States", level: "medium" },
  { slug: "great-buddha-of-nara", name: "Great Buddha of Nara", country: "Japan", level: "medium" },
  { slug: "wat-pho-reclining-buddha", name: "Reclining Buddha of Wat Pho", country: "Thailand", level: "medium" },
  { slug: "golden-buddha-wat-traimit", name: "Golden Buddha of Wat Traimit", country: "Thailand", level: "medium" },
  { slug: "bronze-horseman", name: "The Bronze Horseman", country: "Russia", level: "medium" },
  { slug: "discobolus", name: "Discobolus", country: "Italy", level: "medium" },
  { slug: "christopher-columbus-monument-barcelona", name: "Columbus Monument", country: "Spain", level: "medium" },
  { slug: "motherland-monument-kyiv", name: "Motherland Monument", country: "Ukraine", level: "medium" },
  { slug: "san-martin-equestrian-statue", name: "Equestrian Statue of José de San Martín", country: "Argentina", level: "medium" },
  { slug: "laocoon-and-his-sons", name: "Laocoön and His Sons", country: "Vatican City", level: "medium" },
  { slug: "cristo-rei-almada", name: "Cristo Rei", country: "Portugal", level: "medium" },

  // HARD (18)
  { slug: "perseus-with-the-head-of-medusa", name: "Perseus with the Head of Medusa", country: "Italy", level: "hard" },
  { slug: "leshan-giant-buddha", name: "Leshan Giant Buddha", country: "China", level: "hard" },
  { slug: "colossi-of-memnon", name: "Colossi of Memnon", country: "Egypt", level: "hard" },
  { slug: "heroes-square-millennium-monument", name: "Millennium Monument, Heroes' Square", country: "Hungary", level: "hard" },
  { slug: "the-kelpies", name: "The Kelpies", country: "United Kingdom", level: "hard" },
  { slug: "peter-pan-statue-kensington", name: "Peter Pan Statue", country: "United Kingdom", level: "hard" },
  { slug: "alice-in-wonderland-statue", name: "Alice in Wonderland Statue", country: "United States", level: "hard" },
  { slug: "cristo-de-la-concordia", name: "Cristo de la Concordia", country: "Bolivia", level: "hard" },
  { slug: "christ-the-king-swiebodzin", name: "Christ the King Statue", country: "Poland", level: "hard" },
  { slug: "apollo-belvedere", name: "Apollo Belvedere", country: "Vatican City", level: "hard" },
  { slug: "bamiyan-buddhas", name: "Buddhas of Bamiyan", country: "Afghanistan", level: "hard" },
  { slug: "alexander-the-great-skopje", name: "Warrior on a Horse (Alexander the Great)", country: "North Macedonia", level: "hard" },
  { slug: "vulcan-statue-birmingham", name: "Vulcan Statue", country: "United States", level: "hard" },
  { slug: "cristo-blanco-cusco", name: "Cristo Blanco", country: "Peru", level: "hard" },
  { slug: "boudicca-statue-london", name: "Statue of Boudica", country: "United Kingdom", level: "hard" },
  { slug: "richard-the-lionheart-statue", name: "Statue of Richard the Lionheart", country: "United Kingdom", level: "hard" },
  { slug: "spring-temple-buddha", name: "Spring Temple Buddha", country: "China", level: "hard" },
  { slug: "african-renaissance-monument", name: "African Renaissance Monument", country: "Senegal", level: "hard" },

  // IMPOSSIBLE (18)
  { slug: "monument-to-the-battle-of-the-nations", name: "Monument to the Battle of the Nations", country: "Germany", level: "impossible" },
  { slug: "genghis-khan-equestrian-statue", name: "Genghis Khan Equestrian Statue", country: "Mongolia", level: "impossible" },
  { slug: "ushiku-daibutsu", name: "Ushiku Daibutsu", country: "Japan", level: "impossible" },
  { slug: "awakening-sculpture", name: "The Awakening", country: "United States", level: "impossible" },
  { slug: "virgin-of-el-panecillo", name: "Virgin of El Panecillo", country: "Ecuador", level: "impossible" },
  { slug: "skanderbeg-statue-tirana", name: "Skanderbeg Statue", country: "Albania", level: "impossible" },
  { slug: "guanyin-of-nanshan", name: "Guanyin of Nanshan", country: "China", level: "impossible" },
  { slug: "diana-princess-of-wales-statue", name: "Diana, Princess of Wales Memorial Statue", country: "United Kingdom", level: "impossible" },
  { slug: "bahubali-statue-shravanabelagola", name: "Statue of Gommateshwara (Bahubali)", country: "India", level: "impossible" },
  { slug: "lamassu-winged-bull", name: "Lamassu (Winged Bull of Nineveh)", country: "Iraq", level: "impossible" },
  { slug: "hermannsdenkmal", name: "Hermannsdenkmal", country: "Germany", level: "impossible" },
  { slug: "alyosha-monument-plovdiv", name: "Alyosha Monument", country: "Bulgaria", level: "impossible" },
  { slug: "vercingetorix-statue", name: "Statue of Vercingetorix", country: "France", level: "impossible" },
  { slug: "bolivar-equestrian-statue-caracas", name: "Equestrian Statue of Simón Bolívar", country: "Venezuela", level: "impossible" },
  { slug: "cerro-de-los-angeles-christ", name: "Sacred Heart Monument (Cerro de los Ángeles)", country: "Spain", level: "impossible" },
  { slug: "robin-hood-statue-nottingham", name: "Robin Hood Statue", country: "United Kingdom", level: "impossible" },
  { slug: "ofuna-kannon", name: "Ofuna Kannon", country: "Japan", level: "impossible" },
  { slug: "colossus-of-barletta", name: "Colossus of Barletta", country: "Italy", level: "impossible" },
];
export default STATUES_E51;
