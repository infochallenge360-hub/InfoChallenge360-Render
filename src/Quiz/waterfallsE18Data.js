// Episode 18 "Guess the Waterfall" — 71 items, absolute-difficulty calibrated.
// Answer = country (not waterfall name) — engine nameField is "country", matching the
// established Country-by-Food (E08) / Capital Cities (E10) / Tourist Spots (E13) /
// Mountains (E14) / Islands (E15) / Volcanoes (E16) / Deserts (E17) pattern.
// Calibration note: waterfalls have a low global-recognition ceiling (even Instagram
// popularity data shows only Niagara/Iguazu/Victoria clear "most people worldwide have
// seen this"), so tiers are cut relative to the topic's own ceiling — same precedent as
// the flags episode. Easy here runs roughly ~90%->~12% recognition rather than a flat
// 70-95% band; still a genuine monotonic easy->impossible arc.
// Deliberately distinct from E13 "Tourist Destinations" (Iguazu Falls/Argentina
// excluded entirely, including as a Brazil-side reuse).
// No Israel/Jerusalem/West Bank/Gaza. No disputed-territory ambiguity: Ban Gioc-Detian
// (China/Vietnam border-marker dispute) excluded; Kosovo-area falls (Mirusha, White Drin)
// excluded for contested statehood; Taiwan (Shifen) excluded. Niagara/Victoria/Kalambo
// are border-spanning but between undisputed sovereign neighbors with settled borders.
// Every item confirmed to have its own dedicated English Wikipedia article (several
// candidates without one — Sekumpul, Ekom-Nkam, Trchkan, Skok, Grunas, Tavoro-Bouma,
// Concord Falls, Pulhapanzak, Yuntai — were swapped out for that reason).
// Kadamaian Falls (Malaysia) was swapped for Lata Iskandar Waterfall (Malaysia,
// same tier) after sourcing found no clean free photo of the actual falls (only
// river/bridge shots) — Lata Iskandar has good CC-licensed Commons coverage.
// Post-render visual-QA pass (GATE 1) also caught: Boyoma Falls (DR Congo) had
// no clean photo showing an actual drop (only hazy rapids/fishing-scaffold shots)
// — swapped for Zongo Falls (DR Congo, same tier, same country). Blanche Marie
// Falls (Suriname) had only blurry video-screenshot-quality Commons coverage
// with no clean alternative — swapped for Chamarel Falls (Mauritius, impossible
// tier) which has excellent modern CC-BY-SA coverage.
// No country repeats within any single tier (MC distractors are drawn from the same
// tier) — verified programmatically. Same country CAN recur across different tiers.
export const WATERFALLS_E18 = [
  // EASY (18)
  { slug: "niagara-falls", name: "Niagara Falls", country: "Canada", level: "easy" },
  { slug: "victoria-falls", name: "Victoria Falls", country: "Zimbabwe", level: "easy" },
  { slug: "angel-falls", name: "Angel Falls", country: "Venezuela", level: "easy" },
  { slug: "gullfoss", name: "Gullfoss", country: "Iceland", level: "easy" },
  { slug: "yosemite-falls", name: "Yosemite Falls", country: "United States", level: "easy" },
  { slug: "rhine-falls", name: "Rhine Falls", country: "Switzerland", level: "easy" },
  { slug: "plitvice-falls", name: "Plitvice Falls", country: "Croatia", level: "easy" },
  { slug: "jog-falls", name: "Jog Falls", country: "India", level: "easy" },
  { slug: "huangguoshu-falls", name: "Huangguoshu Falls", country: "China", level: "easy" },
  { slug: "kaieteur-falls", name: "Kaieteur Falls", country: "Guyana", level: "easy" },
  { slug: "sutherland-falls", name: "Sutherland Falls", country: "New Zealand", level: "easy" },
  { slug: "marmore-falls", name: "Cascata delle Marmore", country: "Italy", level: "easy" },
  { slug: "kegon-falls", name: "Kegon Falls", country: "Japan", level: "easy" },
  { slug: "voringsfossen", name: "Vøringsfossen", country: "Norway", level: "easy" },
  { slug: "gocta-falls", name: "Gocta Falls", country: "Peru", level: "easy" },
  { slug: "powerscourt-waterfall", name: "Powerscourt Waterfall", country: "Ireland", level: "easy" },
  { slug: "erawan-falls", name: "Erawan Falls", country: "Thailand", level: "easy" },
  { slug: "dunns-river-falls", name: "Dunn's River Falls", country: "Jamaica", level: "easy" },

  // MEDIUM (18)
  { slug: "havasu-falls", name: "Havasu Falls", country: "United States", level: "medium" },
  { slug: "skogafoss", name: "Skógafoss", country: "Iceland", level: "medium" },
  { slug: "krka-falls", name: "Krka Falls", country: "Croatia", level: "medium" },
  { slug: "kravica-falls", name: "Kravica Falls", country: "Bosnia and Herzegovina", level: "medium" },
  { slug: "tugela-falls", name: "Tugela Falls", country: "South Africa", level: "medium" },
  { slug: "blue-nile-falls", name: "Blue Nile Falls", country: "Ethiopia", level: "medium" },
  { slug: "murchison-falls", name: "Murchison Falls", country: "Uganda", level: "medium" },
  { slug: "diyaluma-falls", name: "Diyaluma Falls", country: "Sri Lanka", level: "medium" },
  { slug: "cheonjeyeon-falls", name: "Cheonjeyeon Waterfalls", country: "South Korea", level: "medium" },
  { slug: "tegenungan-waterfall", name: "Tegenungan Waterfall", country: "Indonesia", level: "medium" },
  { slug: "kawasan-falls", name: "Kawasan Falls", country: "Philippines", level: "medium" },
  { slug: "basaseachic-falls", name: "Basaseachic Falls", country: "Mexico", level: "medium" },
  { slug: "la-fortuna-waterfall", name: "La Fortuna Waterfall", country: "Costa Rica", level: "medium" },
  { slug: "tequendama-falls", name: "Tequendama Falls", country: "Colombia", level: "medium" },
  { slug: "pailon-del-diablo", name: "Pailón del Diablo", country: "Ecuador", level: "medium" },
  { slug: "duden-waterfalls", name: "Düden Waterfalls", country: "Turkey", level: "medium" },
  { slug: "thomsons-falls", name: "Thomson's Falls", country: "Kenya", level: "medium" },
  { slug: "zongo-falls", name: "Zongo Falls", country: "DR Congo", level: "medium" },

  // HARD (18)
  { slug: "multnomah-falls", name: "Multnomah Falls", country: "United States", level: "hard" },
  { slug: "seljalandsfoss", name: "Seljalandsfoss", country: "Iceland", level: "hard" },
  { slug: "dudhsagar-falls", name: "Dudhsagar Falls", country: "India", level: "hard" },
  { slug: "nachi-falls", name: "Nachi Falls", country: "Japan", level: "hard" },
  { slug: "hukou-waterfalls", name: "Hukou Waterfalls", country: "China", level: "hard" },
  { slug: "latefossen", name: "Låtefossen", country: "Norway", level: "hard" },
  { slug: "takakkaw-falls", name: "Takakkaw Falls", country: "Canada", level: "hard" },
  { slug: "kinchkha-waterfall", name: "Kinchkha Waterfall", country: "Georgia", level: "hard" },
  { slug: "baatara-gorge-waterfall", name: "Baatara Gorge Waterfall", country: "Lebanon", level: "hard" },
  { slug: "kalambo-falls", name: "Kalambo Falls", country: "Zambia", level: "hard" },
  { slug: "wli-waterfalls", name: "Wli Waterfalls", country: "Ghana", level: "hard" },
  { slug: "savica-falls", name: "Savica Falls", country: "Slovenia", level: "hard" },
  { slug: "khone-phapheng-falls", name: "Khone Phapheng Falls", country: "Laos", level: "hard" },
  { slug: "kalandula-falls", name: "Kalandula Falls", country: "Angola", level: "hard" },
  { slug: "davis-falls", name: "Davis Falls", country: "Nepal", level: "hard" },
  { slug: "elephant-waterfalls", name: "Elephant Waterfalls", country: "Vietnam", level: "hard" },
  { slug: "sipi-falls", name: "Sipi Falls", country: "Uganda", level: "hard" },
  { slug: "lata-iskandar-falls", name: "Lata Iskandar Waterfall", country: "Malaysia", level: "hard" },

  // IMPOSSIBLE (17)
  { slug: "svartifoss", name: "Svartifoss", country: "Iceland", level: "impossible" },
  { slug: "shoshone-falls", name: "Shoshone Falls", country: "United States", level: "impossible" },
  { slug: "helmcken-falls", name: "Helmcken Falls", country: "Canada", level: "impossible" },
  { slug: "nohkalikai-falls", name: "Nohkalikai Falls", country: "India", level: "impossible" },
  { slug: "fukuroda-falls", name: "Fukuroda Falls", country: "Japan", level: "impossible" },
  { slug: "diaoshuilou-falls", name: "Diaoshuilou Falls", country: "China", level: "impossible" },
  { slug: "steinsdalsfossen", name: "Steinsdalsfossen", country: "Norway", level: "impossible" },
  { slug: "henrhyd-falls", name: "Henrhyd Falls", country: "United Kingdom", level: "impossible" },
  { slug: "shaki-waterfall", name: "Shaki Waterfall", country: "Armenia", level: "impossible" },
  { slug: "bigar-waterfall", name: "Bigar Waterfall", country: "Romania", level: "impossible" },
  { slug: "venta-rapid", name: "Venta Rapid", country: "Latvia", level: "impossible" },
  { slug: "chamarel-falls", name: "Chamarel Falls", country: "Mauritius", level: "impossible" },
  { slug: "krimml-waterfalls", name: "Krimml Waterfalls", country: "Austria", level: "impossible" },
  { slug: "wentworth-falls", name: "Wentworth Falls", country: "Australia", level: "impossible" },
  { slug: "jagala-waterfall", name: "Jägala Waterfall", country: "Estonia", level: "impossible" },
  { slug: "materuni-waterfalls", name: "Materuni Waterfalls", country: "Tanzania", level: "impossible" },
  { slug: "haipa-waterfall", name: "Haipa Waterfall", country: "Myanmar", level: "impossible" },
];
