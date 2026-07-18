// Episode 19 "Guess the Lake" — 71 items, absolute-difficulty calibrated.
// Answer = country (not lake name) — engine nameField is "country", matching the
// established Country-by-Food (E08) / Capital Cities (E10) / Tourist Spots (E13) /
// Mountains (E14) / Islands (E15) / Volcanoes (E16) / Deserts (E17) / Waterfalls (E18)
// pattern.
// Calibration note: lakes have a low global-recognition ceiling like flags/deserts/
// waterfalls (only a handful — Superior, Victoria, Baikal, Titicaca, Loch Ness — clear
// "most people worldwide have heard of this"), so tiers are cut relative to the topic's
// own ceiling, same precedent as those episodes. Still a genuine monotonic easy->impossible
// arc within the topic.
// No Israel/Jerusalem/West Bank/Gaza: Dead Sea and Sea of Galilee (Lake Kinneret) are
// deliberately excluded entirely. No disputed-territory ambiguity: Kashmir-area lakes
// (Wular, Pangong Tso — India/Pakistan/China dispute) excluded; Crimea-area lakes
// excluded (none included; all Russian lakes chosen are deep in Russia proper).
// Border-spanning lakes (Superior, Victoria, Geneva, etc.) are between undisputed
// sovereign neighbors with settled borders — one representative country picked per item.
// No country repeats within any single tier (MC distractors are drawn from the same
// tier) — verified programmatically. Same country CAN recur across different tiers.
// Post-sourcing visual-QA pass (GATE 1) caught systemic satellite-photo issues (many
// Wikipedia lead images for large lakes are top-down NASA/ISS/ESA orbital shots, poor
// for a visual guessing quiz) plus wrong-subject errors. Four items were swapped for
// better-documented, ground-level-scenic alternatives in the same country/tier: Lake
// Albert (Uganda) -> Lake Bunyonyi (Uganda); Lake Balkhash (Kazakhstan) -> Kolsai Lake
// (Kazakhstan); Lake Qinghai (China) -> Tianchi Lake (China, the Tian Shan/Xinjiang one,
// not the China-North Korea border Baekdu-mountain Tianchi, to avoid any territorial
// ambiguity); Lake Urmia (Iran) -> Chitgar Lake (Iran) after every free Urmia photo
// found was either a satellite shot or an unrecognizable macro of salt crystals; Lake
// Poyang (China) -> Lugu Lake (China) after repeated re-sourcing only turned up a
// close-up boat/fisherman shot with the lake itself barely visible; Sambhar Lake
// (India) -> Chilika Lake (India) after every Sambhar photo found was either a
// satellite shot, a wrong-dominant-subject shot (a motorcycle, a bird), or lacked
// visible water entirely (Sambhar is a seasonal salt lake, often dry). A second GATE 2
// pass also caught and fixed lake-chad.jpg (had regressed to a cattle photo with no
// water), lake-kariba.jpg (regressed to a tree-silhouette photo with no lake), and
// lake-sevan.jpg (a Sentinel-2 satellite image that slipped through the first
// visual-QA pass undetected) — all three restored to genuine ground-level lake photos.
export const LAKES_E19 = [
  // EASY (18)
  { slug: "lake-superior", name: "Lake Superior", country: "Canada", level: "easy" },
  { slug: "lake-victoria", name: "Lake Victoria", country: "Tanzania", level: "easy" },
  { slug: "lake-baikal", name: "Lake Baikal", country: "Russia", level: "easy" },
  { slug: "lake-titicaca", name: "Lake Titicaca", country: "Peru", level: "easy" },
  { slug: "loch-ness", name: "Loch Ness", country: "United Kingdom", level: "easy" },
  { slug: "lake-como", name: "Lake Como", country: "Italy", level: "easy" },
  { slug: "lake-tahoe", name: "Lake Tahoe", country: "United States", level: "easy" },
  { slug: "caspian-sea", name: "Caspian Sea", country: "Kazakhstan", level: "easy" },
  { slug: "lake-geneva", name: "Lake Geneva", country: "Switzerland", level: "easy" },
  { slug: "lake-bled", name: "Lake Bled", country: "Slovenia", level: "easy" },
  { slug: "lake-malawi", name: "Lake Malawi", country: "Malawi", level: "easy" },
  { slug: "lake-toba", name: "Lake Toba", country: "Indonesia", level: "easy" },
  { slug: "lake-balaton", name: "Lake Balaton", country: "Hungary", level: "easy" },
  { slug: "lake-atitlan", name: "Lake Atitlan", country: "Guatemala", level: "easy" },
  { slug: "lake-maracaibo", name: "Lake Maracaibo", country: "Venezuela", level: "easy" },
  { slug: "lake-nasser", name: "Lake Nasser", country: "Egypt", level: "easy" },
  { slug: "lake-chad", name: "Lake Chad", country: "Chad", level: "easy" },
  { slug: "lake-turkana", name: "Lake Turkana", country: "Kenya", level: "easy" },

  // MEDIUM (18)
  { slug: "lake-louise", name: "Lake Louise", country: "Canada", level: "medium" },
  { slug: "lake-constance", name: "Lake Constance", country: "Germany", level: "medium" },
  { slug: "lake-garda", name: "Lake Garda", country: "Italy", level: "medium" },
  { slug: "great-salt-lake", name: "Great Salt Lake", country: "United States", level: "medium" },
  { slug: "lake-tanganyika", name: "Lake Tanganyika", country: "Tanzania", level: "medium" },
  { slug: "lake-kariba", name: "Lake Kariba", country: "Zimbabwe", level: "medium" },
  { slug: "lake-nicaragua", name: "Lake Nicaragua", country: "Nicaragua", level: "medium" },
  { slug: "lake-van", name: "Lake Van", country: "Turkey", level: "medium" },
  { slug: "chitgar-lake", name: "Chitgar Lake", country: "Iran", level: "medium" },
  { slug: "lake-biwa", name: "Lake Biwa", country: "Japan", level: "medium" },
  { slug: "lake-kivu", name: "Lake Kivu", country: "Rwanda", level: "medium" },
  { slug: "lake-nakuru", name: "Lake Nakuru", country: "Kenya", level: "medium" },
  { slug: "lake-ohrid", name: "Lake Ohrid", country: "North Macedonia", level: "medium" },
  { slug: "lake-skadar", name: "Lake Skadar", country: "Montenegro", level: "medium" },
  { slug: "lake-ladoga", name: "Lake Ladoga", country: "Russia", level: "medium" },
  { slug: "lake-sevan", name: "Lake Sevan", country: "Armenia", level: "medium" },
  { slug: "issyk-kul", name: "Issyk-Kul", country: "Kyrgyzstan", level: "medium" },
  { slug: "lake-vanern", name: "Lake Vanern", country: "Sweden", level: "medium" },

  // HARD (18)
  { slug: "lake-wanaka", name: "Lake Wanaka", country: "New Zealand", level: "hard" },
  { slug: "lake-powell", name: "Lake Powell", country: "United States", level: "hard" },
  { slug: "lake-bunyonyi", name: "Lake Bunyonyi", country: "Uganda", level: "hard" },
  { slug: "lake-peipus", name: "Lake Peipus", country: "Estonia", level: "hard" },
  { slug: "lake-saimaa", name: "Lake Saimaa", country: "Finland", level: "hard" },
  { slug: "kolsai-lake", name: "Kolsai Lake", country: "Kazakhstan", level: "hard" },
  { slug: "tianchi-lake", name: "Tianchi Lake", country: "China", level: "hard" },
  { slug: "lake-retba", name: "Lake Retba", country: "Senegal", level: "hard" },
  { slug: "lake-hillier", name: "Lake Hillier", country: "Australia", level: "hard" },
  { slug: "lake-myvatn", name: "Lake Myvatn", country: "Iceland", level: "hard" },
  { slug: "laguna-colorada", name: "Laguna Colorada", country: "Bolivia", level: "hard" },
  { slug: "lake-naivasha", name: "Lake Naivasha", country: "Kenya", level: "hard" },
  { slug: "chilika-lake", name: "Chilika Lake", country: "India", level: "hard" },
  { slug: "songkhla-lake", name: "Songkhla Lake", country: "Thailand", level: "hard" },
  { slug: "lake-general-carrera", name: "Lake General Carrera", country: "Chile", level: "hard" },
  { slug: "lake-kawaguchi", name: "Lake Kawaguchi", country: "Japan", level: "hard" },
  { slug: "lake-winnipeg", name: "Lake Winnipeg", country: "Canada", level: "hard" },
  { slug: "lake-onega", name: "Lake Onega", country: "Russia", level: "hard" },

  // IMPOSSIBLE (17)
  { slug: "lake-assal", name: "Lake Assal", country: "Djibouti", level: "impossible" },
  { slug: "lake-bogoria", name: "Lake Bogoria", country: "Kenya", level: "impossible" },
  { slug: "lake-manyara", name: "Lake Manyara", country: "Tanzania", level: "impossible" },
  { slug: "ranau-lake", name: "Ranau Lake", country: "Indonesia", level: "impossible" },
  { slug: "lake-nahuel-huapi", name: "Lake Nahuel Huapi", country: "Argentina", level: "impossible" },
  { slug: "lake-pehoe", name: "Lake Pehoe", country: "Chile", level: "impossible" },
  { slug: "lake-inari", name: "Lake Inari", country: "Finland", level: "impossible" },
  { slug: "lake-zurich", name: "Lake Zurich", country: "Switzerland", level: "impossible" },
  { slug: "lugu-lake", name: "Lugu Lake", country: "China", level: "impossible" },
  { slug: "lake-prespa", name: "Lake Prespa", country: "Albania", level: "impossible" },
  { slug: "lake-tota", name: "Lake Tota", country: "Colombia", level: "impossible" },
  { slug: "lake-enriquillo", name: "Lake Enriquillo", country: "Dominican Republic", level: "impossible" },
  { slug: "lake-peten-itza", name: "Lake Peten Itza", country: "Guatemala", level: "impossible" },
  { slug: "lake-rotorua", name: "Lake Rotorua", country: "New Zealand", level: "impossible" },
  { slug: "lake-toplitz", name: "Lake Toplitz", country: "Austria", level: "impossible" },
  { slug: "lake-karakul", name: "Lake Karakul", country: "Tajikistan", level: "impossible" },
  { slug: "lake-hovsgol", name: "Lake Hovsgol", country: "Mongolia", level: "impossible" },
];
