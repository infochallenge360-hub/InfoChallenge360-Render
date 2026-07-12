// Episode 16 "Guess the Volcano" — 71 items, absolute-difficulty calibrated.
// Answer = country (not volcano name) — engine nameField is "country", matching the
// established Country-by-Food (E08) / Capital Cities (E10) / Tourist Spots (E13) /
// Mountains (E14) / Islands (E15) pattern.
// Deliberately distinct from E14 "Mountains" — does not reuse any of: Mount Vesuvius,
// Mount Kilimanjaro, Popocatepetl, Mount Bromo, Mount Nyiragongo, Cotopaxi, Mount
// Damavand, Mayon Volcano, Mount Aso, Mount Cameroon, Mount Apo, Pico de Orizaba,
// Mount Etna, Mount Elbrus, Chimborazo, Mount Rainier, Mount Karisimbi, Volcan Baru,
// Mount Nemrut, Mount Tahat, Emi Koussi, Brandberg Mountain (all already featured there).
// No Israel/Jerusalem/West Bank/Gaza. No disputed-territory ambiguity — Mount Ararat
// (Turkey/Armenian symbolism) and Mount Paektu/Baekdu (China/North Korea border)
// excluded per the standing caution on nationalist/sovereignty-symbol peaks.
// No country repeats within any single tier (MC distractors are drawn from the same
// tier) — verified programmatically. Same country CAN recur across different tiers
// (e.g. France: Mont Pelee-easy / Piton de la Fournaise-medium / Puy de Dome-hard,
// all unambiguous French sovereign territory).
export const VOLCANOES_E16 = [
  // EASY (18)
  { slug: "mount-fuji", name: "Mount Fuji", country: "Japan", level: "easy" },
  { slug: "santorini-volcano", name: "Santorini", country: "Greece", level: "easy" },
  { slug: "mount-st-helens", name: "Mount St. Helens", country: "United States", level: "easy" },
  { slug: "krakatoa", name: "Krakatoa", country: "Indonesia", level: "easy" },
  { slug: "eyjafjallajokull", name: "Eyjafjallajökull", country: "Iceland", level: "easy" },
  { slug: "mount-pinatubo", name: "Mount Pinatubo", country: "Philippines", level: "easy" },
  { slug: "whakaari-white-island", name: "Whakaari / White Island", country: "New Zealand", level: "easy" },
  { slug: "stromboli", name: "Stromboli", country: "Italy", level: "easy" },
  { slug: "mount-teide", name: "Mount Teide", country: "Spain", level: "easy" },
  { slug: "villarrica-volcano", name: "Villarrica", country: "Chile", level: "easy" },
  { slug: "nevado-del-ruiz", name: "Nevado del Ruiz", country: "Colombia", level: "easy" },
  { slug: "arenal-volcano", name: "Arenal Volcano", country: "Costa Rica", level: "easy" },
  { slug: "klyuchevskaya-sopka", name: "Klyuchevskaya Sopka", country: "Russia", level: "easy" },
  { slug: "hunga-tonga", name: "Hunga Tonga", country: "Tonga", level: "easy" },
  { slug: "volcan-de-fuego", name: "Volcán de Fuego", country: "Guatemala", level: "easy" },
  { slug: "mont-pelee", name: "Mont Pelée", country: "France", level: "easy" },
  { slug: "erta-ale", name: "Erta Ale", country: "Ethiopia", level: "easy" },
  { slug: "la-soufriere-st-vincent", name: "La Soufrière", country: "Saint Vincent and the Grenadines", level: "easy" },

  // MEDIUM (18)
  { slug: "kilauea", name: "Kilauea", country: "United States", level: "medium" },
  { slug: "taal-volcano", name: "Taal Volcano", country: "Philippines", level: "medium" },
  { slug: "mount-tambora", name: "Mount Tambora", country: "Indonesia", level: "medium" },
  { slug: "sakurajima", name: "Sakurajima", country: "Japan", level: "medium" },
  { slug: "fagradalsfjall", name: "Fagradalsfjall", country: "Iceland", level: "medium" },
  { slug: "osorno-volcano", name: "Osorno", country: "Chile", level: "medium" },
  { slug: "poas-volcano", name: "Poás Volcano", country: "Costa Rica", level: "medium" },
  { slug: "ol-doinyo-lengai", name: "Ol Doinyo Lengai", country: "Tanzania", level: "medium" },
  { slug: "galeras", name: "Galeras", country: "Colombia", level: "medium" },
  { slug: "cerro-negro", name: "Cerro Negro", country: "Nicaragua", level: "medium" },
  { slug: "colima-volcano", name: "Colima Volcano", country: "Mexico", level: "medium" },
  { slug: "el-misti", name: "El Misti", country: "Peru", level: "medium" },
  { slug: "sangay", name: "Sangay", country: "Ecuador", level: "medium" },
  { slug: "piton-de-la-fournaise", name: "Piton de la Fournaise", country: "France", level: "medium" },
  { slug: "izalco", name: "Izalco", country: "El Salvador", level: "medium" },
  { slug: "karthala", name: "Karthala", country: "Comoros", level: "medium" },
  { slug: "pico-do-fogo", name: "Pico do Fogo", country: "Cape Verde", level: "medium" },
  { slug: "tavurvur", name: "Tavurvur", country: "Papua New Guinea", level: "medium" },

  // HARD (18)
  { slug: "mauna-loa", name: "Mauna Loa", country: "United States", level: "hard" },
  { slug: "mount-unzen", name: "Mount Unzen", country: "Japan", level: "hard" },
  { slug: "masaya-volcano", name: "Masaya Volcano", country: "Nicaragua", level: "hard" },
  { slug: "paricutin", name: "Paricutín", country: "Mexico", level: "hard" },
  { slug: "kawah-ijen", name: "Kawah Ijen", country: "Indonesia", level: "hard" },
  { slug: "tungurahua", name: "Tungurahua", country: "Ecuador", level: "hard" },
  { slug: "yasur", name: "Yasur", country: "Vanuatu", level: "hard" },
  { slug: "mount-longonot", name: "Mount Longonot", country: "Kenya", level: "hard" },
  { slug: "nyamuragira", name: "Nyamuragira", country: "DR Congo", level: "hard" },
  { slug: "manam", name: "Manam", country: "Papua New Guinea", level: "hard" },
  { slug: "cumbre-vieja", name: "Cumbre Vieja", country: "Spain", level: "hard" },
  { slug: "mount-erciyes", name: "Mount Erciyes", country: "Turkey", level: "hard" },
  { slug: "vulcano-island", name: "Vulcano", country: "Italy", level: "hard" },
  { slug: "chaiten-volcano", name: "Chaitén", country: "Chile", level: "hard" },
  { slug: "sulphur-springs-st-lucia", name: "Sulphur Springs", country: "Saint Lucia", level: "hard" },
  { slug: "kanlaon", name: "Kanlaon", country: "Philippines", level: "hard" },
  { slug: "katla", name: "Katla", country: "Iceland", level: "hard" },
  { slug: "puy-de-dome", name: "Puy de Dôme", country: "France", level: "hard" },

  // IMPOSSIBLE (17)
  { slug: "ambrym", name: "Ambrym", country: "Vanuatu", level: "impossible" },
  { slug: "ulawun", name: "Ulawun", country: "Papua New Guinea", level: "impossible" },
  { slug: "sierra-negra-galapagos", name: "Sierra Negra", country: "Ecuador", level: "impossible" },
  { slug: "laacher-see", name: "Laacher See", country: "Germany", level: "impossible" },
  { slug: "furnas-volcano", name: "Furnas Volcano", country: "Portugal", level: "impossible" },
  { slug: "uturuncu", name: "Uturuncu", country: "Bolivia", level: "impossible" },
  { slug: "domuyo", name: "Domuyo", country: "Argentina", level: "impossible" },
  { slug: "menengai", name: "Menengai", country: "Kenya", level: "impossible" },
  { slug: "tolbachik", name: "Tolbachik", country: "Russia", level: "impossible" },
  { slug: "beerenberg", name: "Beerenberg", country: "Norway", level: "impossible" },
  { slug: "nevis-peak", name: "Nevis Peak", country: "Saint Kitts and Nevis", level: "impossible" },
  { slug: "morne-trois-pitons", name: "Morne Trois Pitons", country: "Dominica", level: "impossible" },
  { slug: "mount-aragats", name: "Mount Aragats", country: "Armenia", level: "impossible" },
  { slug: "big-ben-heard-island", name: "Big Ben", country: "Australia", level: "impossible" },
  { slug: "ceboruco", name: "Ceboruco", country: "Mexico", level: "impossible" },
  { slug: "barren-island", name: "Barren Island", country: "India", level: "impossible" },
  { slug: "wudalianchi", name: "Wudalianchi", country: "China", level: "impossible" },
];
