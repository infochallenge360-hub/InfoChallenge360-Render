// Episode 14 "Guess the Mountain" — 71 items, absolute-difficulty calibrated.
// Answer = country (not mountain name) — engine nameField is "country", matching the
// established Country-by-Food (E08) / Capital Cities (E10) / Tourist Spots (E13) pattern.
// Deliberately distinct from E09 "World Landmarks" (Mount Fuji used there, excluded here)
// and E13 "Tourist Destinations" (Matterhorn/Swiss Alps generic, Torres del Paine used
// there — excluded here; other named Swiss peaks like Jungfrau/Eiger are genuinely distinct).
// No Israel/Jerusalem/West Bank/Gaza. No disputed-territory ambiguity — K2, Kangchenjunga,
// Nanga Parbat, and Trango Towers excluded (Gilgit-Baltistan/Kashmir dispute); Mount Ararat,
// Mount Sinai, Mount Hermon, and Baekdu Mountain excluded (symbolic/nationalist sovereignty
// disputes). Everest kept as Nepal (standard primary attribution, not a live dispute like
// Kashmir). Margherita Peak (Uganda/DR Congo shared massif, undisputed border) attributed to
// Uganda as the primary access/tourism country, WebSearch-verified.
// No country repeats within any single tier (MC distractors are drawn from the same tier) —
// verified programmatically. Same country CAN recur across different tiers.
export const MOUNTAINS_E14 = [
  // EASY (18)
  { slug: "mount-everest", name: "Mount Everest", country: "Nepal", level: "easy" },
  { slug: "kilimanjaro", name: "Mount Kilimanjaro", country: "Tanzania", level: "easy" },
  { slug: "mount-vesuvius", name: "Mount Vesuvius", country: "Italy", level: "easy" },
  { slug: "table-mountain", name: "Table Mountain", country: "South Africa", level: "easy" },
  { slug: "sugarloaf-mountain", name: "Sugarloaf Mountain", country: "Brazil", level: "easy" },
  { slug: "mont-blanc", name: "Mont Blanc", country: "France", level: "easy" },
  { slug: "denali", name: "Denali", country: "United States", level: "easy" },
  { slug: "mount-olympus", name: "Mount Olympus", country: "Greece", level: "easy" },
  { slug: "ben-nevis", name: "Ben Nevis", country: "United Kingdom", level: "easy" },
  { slug: "aoraki-mount-cook", name: "Aoraki / Mount Cook", country: "New Zealand", level: "easy" },
  { slug: "mount-elbrus", name: "Mount Elbrus", country: "Russia", level: "easy" },
  { slug: "cotopaxi", name: "Cotopaxi", country: "Ecuador", level: "easy" },
  { slug: "huangshan", name: "Huangshan", country: "China", level: "easy" },
  { slug: "fitz-roy", name: "Mount Fitz Roy", country: "Argentina", level: "easy" },
  { slug: "mount-kinabalu", name: "Mount Kinabalu", country: "Malaysia", level: "easy" },
  { slug: "zugspitze", name: "Zugspitze", country: "Germany", level: "easy" },
  { slug: "mount-bromo", name: "Mount Bromo", country: "Indonesia", level: "easy" },
  { slug: "mount-kenya", name: "Mount Kenya", country: "Kenya", level: "easy" },

  // MEDIUM (18)
  { slug: "popocatepetl", name: "Popocatépetl", country: "Mexico", level: "medium" },
  { slug: "jungfrau", name: "Jungfrau", country: "Switzerland", level: "medium" },
  { slug: "mount-roraima", name: "Mount Roraima", country: "Venezuela", level: "medium" },
  { slug: "mount-kosciuszko", name: "Mount Kosciuszko", country: "Australia", level: "medium" },
  { slug: "mayon-volcano", name: "Mayon Volcano", country: "Philippines", level: "medium" },
  { slug: "mount-logan", name: "Mount Logan", country: "Canada", level: "medium" },
  { slug: "grossglockner", name: "Grossglockner", country: "Austria", level: "medium" },
  { slug: "mount-damavand", name: "Mount Damavand", country: "Iran", level: "medium" },
  { slug: "huascaran", name: "Huascarán", country: "Peru", level: "medium" },
  { slug: "adams-peak", name: "Adam's Peak", country: "Sri Lanka", level: "medium" },
  { slug: "drakensberg", name: "Drakensberg", country: "South Africa", level: "medium" },
  { slug: "mount-rainier", name: "Mount Rainier", country: "United States", level: "medium" },
  { slug: "aconcagua", name: "Aconcagua", country: "Argentina", level: "medium" },
  { slug: "annapurna", name: "Annapurna", country: "Nepal", level: "medium" },
  { slug: "mount-etna", name: "Mount Etna", country: "Italy", level: "medium" },
  { slug: "mount-nemrut", name: "Mount Nemrut", country: "Turkey", level: "medium" },
  { slug: "nanda-devi", name: "Nanda Devi", country: "India", level: "medium" },
  { slug: "mount-aso", name: "Mount Aso", country: "Japan", level: "medium" },

  // HARD (18)
  { slug: "mount-kailash", name: "Mount Kailash", country: "China", level: "hard" },
  { slug: "toubkal", name: "Mount Toubkal", country: "Morocco", level: "hard" },
  { slug: "fansipan", name: "Fansipan", country: "Vietnam", level: "hard" },
  { slug: "mount-nyiragongo", name: "Mount Nyiragongo", country: "DR Congo", level: "hard" },
  { slug: "triglav", name: "Triglav", country: "Slovenia", level: "hard" },
  { slug: "margherita-peak", name: "Margherita Peak", country: "Uganda", level: "hard" },
  { slug: "illimani", name: "Illimani", country: "Bolivia", level: "hard" },
  { slug: "carrauntoohil", name: "Carrauntoohil", country: "Ireland", level: "hard" },
  { slug: "blue-mountain-peak", name: "Blue Mountain Peak", country: "Jamaica", level: "hard" },
  { slug: "ras-dashen", name: "Ras Dashen", country: "Ethiopia", level: "hard" },
  { slug: "mount-cameroon", name: "Mount Cameroon", country: "Cameroon", level: "hard" },
  { slug: "hallasan", name: "Hallasan", country: "South Korea", level: "hard" },
  { slug: "puncak-jaya", name: "Puncak Jaya", country: "Indonesia", level: "hard" },
  { slug: "pico-de-orizaba", name: "Pico de Orizaba", country: "Mexico", level: "hard" },
  { slug: "chimborazo", name: "Chimborazo", country: "Ecuador", level: "hard" },
  { slug: "eiger", name: "Eiger", country: "Switzerland", level: "hard" },
  { slug: "mount-robson", name: "Mount Robson", country: "Canada", level: "hard" },
  { slug: "mount-apo", name: "Mount Apo", country: "Philippines", level: "hard" },

  // IMPOSSIBLE (17)
  { slug: "dhaulagiri", name: "Dhaulagiri", country: "Nepal", level: "impossible" },
  { slug: "galdhopiggen", name: "Galdhøpiggen", country: "Norway", level: "impossible" },
  { slug: "kebnekaise", name: "Kebnekaise", country: "Sweden", level: "impossible" },
  { slug: "mulhacen", name: "Mulhacén", country: "Spain", level: "impossible" },
  { slug: "musala", name: "Musala", country: "Bulgaria", level: "impossible" },
  { slug: "pico-ruivo", name: "Pico Ruivo", country: "Portugal", level: "impossible" },
  { slug: "cerro-chirripo", name: "Cerro Chirripó", country: "Costa Rica", level: "impossible" },
  { slug: "mount-karisimbi", name: "Mount Karisimbi", country: "Rwanda", level: "impossible" },
  { slug: "brandberg", name: "Brandberg Mountain", country: "Namibia", level: "impossible" },
  { slug: "moldoveanu-peak", name: "Moldoveanu Peak", country: "Romania", level: "impossible" },
  { slug: "volcan-baru", name: "Volcán Barú", country: "Panama", level: "impossible" },
  { slug: "mount-mulanje", name: "Mount Mulanje", country: "Malawi", level: "impossible" },
  { slug: "emi-koussi", name: "Emi Koussi", country: "Chad", level: "impossible" },
  { slug: "mount-tahat", name: "Mount Tahat", country: "Algeria", level: "impossible" },
  { slug: "gerlachovsky-stit", name: "Gerlachovský štít", country: "Slovakia", level: "impossible" },
  { slug: "halti", name: "Halti", country: "Finland", level: "impossible" },
  { slug: "thabana-ntlenyana", name: "Thabana Ntlenyana", country: "Lesotho", level: "impossible" },
];
