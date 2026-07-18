// Episode 20 "Guess the River" — 71 items, absolute-difficulty calibrated.
// Answer = country (not river name) — engine nameField is "country", matching the
// established Country-by-Food (E08) / Capital Cities (E10) / Tourist Spots (E13) /
// Mountains (E14) / Islands (E15) / Volcanoes (E16) / Deserts (E17) / Waterfalls (E18) /
// Lakes (E19) pattern.
// Calibration note: rivers have a low global-recognition ceiling like lakes/deserts/
// waterfalls (only a handful — Nile, Amazon, Mississippi, Yangtze — clear "most people
// worldwide have heard of this"), so tiers are cut relative to the topic's own ceiling,
// same precedent as those episodes. Still a genuine monotonic easy->impossible arc.
// No Israel/Jerusalem/West Bank/Gaza: the Jordan River is deliberately excluded entirely
// (forms part of the Israel/Jordan/West Bank border). No disputed-territory ambiguity:
// no Kashmir-area rivers framed around the dispute (Indus itself is included as a
// straightforward Pakistan river, not framed around the Kashmir border).
// Border-spanning rivers (Danube, Rhine, Nile, Congo, etc.) are between undisputed
// sovereign neighbors with settled borders — one representative country picked per item.
// Image sourcing lesson from E19: prefer ground-level/riverside photos over Wikipedia's
// often-satellite lead images for large rivers — verify each image is a genuine scenic
// photo, not a top-down orbital shot, before shipping.
// No country repeats within any single tier (MC distractors are drawn from the same
// tier) — verified programmatically. Same country CAN recur across different tiers.
// Post-write fact-verification (GATE 1) caught and fixed: two overstated superlative
// facts (Orinoco border claim, Senegal River border count), one disputed statistic
// (Mississippi drains 31 states per Britannica/EPA, not 32), and swapped Essequibo
// River (Guyana) for Berbice River (Guyana, entirely within its borders, no dispute)
// after flagging that the Essequibo is the epicenter of a live, high-profile
// Venezuela-Guyana territorial dispute — same class of risk the Jordan River exclusion
// guards against.
export const RIVERS_E20 = [
  // EASY (18)
  { slug: "nile-river", name: "Nile River", country: "Egypt", level: "easy" },
  { slug: "amazon-river", name: "Amazon River", country: "Brazil", level: "easy" },
  { slug: "mississippi-river", name: "Mississippi River", country: "United States", level: "easy" },
  { slug: "yangtze-river", name: "Yangtze River", country: "China", level: "easy" },
  { slug: "danube-river", name: "Danube River", country: "Austria", level: "easy" },
  { slug: "rhine-river", name: "Rhine River", country: "Germany", level: "easy" },
  { slug: "thames-river", name: "River Thames", country: "United Kingdom", level: "easy" },
  { slug: "seine-river", name: "Seine River", country: "France", level: "easy" },
  { slug: "ganges-river", name: "Ganges River", country: "India", level: "easy" },
  { slug: "volga-river", name: "Volga River", country: "Russia", level: "easy" },
  { slug: "congo-river", name: "Congo River", country: "DR Congo", level: "easy" },
  { slug: "niger-river", name: "Niger River", country: "Niger", level: "easy" },
  { slug: "mekong-river", name: "Mekong River", country: "Vietnam", level: "easy" },
  { slug: "euphrates-river", name: "Euphrates River", country: "Iraq", level: "easy" },
  { slug: "zambezi-river", name: "Zambezi River", country: "Zambia", level: "easy" },
  { slug: "indus-river", name: "Indus River", country: "Pakistan", level: "easy" },
  { slug: "tigris-river", name: "Tigris River", country: "Turkey", level: "easy" },
  { slug: "murray-river", name: "Murray River", country: "Australia", level: "easy" },

  // MEDIUM (18)
  { slug: "colorado-river", name: "Colorado River", country: "United States", level: "medium" },
  { slug: "yellow-river", name: "Yellow River", country: "China", level: "medium" },
  { slug: "orinoco-river", name: "Orinoco River", country: "Venezuela", level: "medium" },
  { slug: "parana-river", name: "Parana River", country: "Argentina", level: "medium" },
  { slug: "loire-river", name: "Loire River", country: "France", level: "medium" },
  { slug: "po-river", name: "Po River", country: "Italy", level: "medium" },
  { slug: "elbe-river", name: "Elbe River", country: "Germany", level: "medium" },
  { slug: "vistula-river", name: "Vistula River", country: "Poland", level: "medium" },
  { slug: "dnieper-river", name: "Dnieper River", country: "Ukraine", level: "medium" },
  { slug: "don-river", name: "Don River", country: "Russia", level: "medium" },
  { slug: "brahmaputra-river", name: "Brahmaputra River", country: "Bangladesh", level: "medium" },
  { slug: "irrawaddy-river", name: "Irrawaddy River", country: "Myanmar", level: "medium" },
  { slug: "chao-phraya-river", name: "Chao Phraya River", country: "Thailand", level: "medium" },
  { slug: "saint-lawrence-river", name: "Saint Lawrence River", country: "Canada", level: "medium" },
  { slug: "rio-grande-river", name: "Rio Grande", country: "Mexico", level: "medium" },
  { slug: "douro-river", name: "Douro River", country: "Portugal", level: "medium" },
  { slug: "tagus-river", name: "Tagus River", country: "Spain", level: "medium" },
  { slug: "limpopo-river", name: "Limpopo River", country: "Mozambique", level: "medium" },

  // HARD (18)
  { slug: "ob-river", name: "Ob River", country: "Russia", level: "hard" },
  { slug: "mackenzie-river", name: "Mackenzie River", country: "Canada", level: "hard" },
  { slug: "shannon-river", name: "River Shannon", country: "Ireland", level: "hard" },
  { slug: "severn-river", name: "River Severn", country: "United Kingdom", level: "hard" },
  { slug: "rhone-river", name: "Rhone River", country: "Switzerland", level: "hard" },
  { slug: "ebro-river", name: "Ebro River", country: "Spain", level: "hard" },
  { slug: "vltava-river", name: "Vltava River", country: "Czech Republic", level: "hard" },
  { slug: "tiber-river", name: "Tiber River", country: "Italy", level: "hard" },
  { slug: "sao-francisco-river", name: "Sao Francisco River", country: "Brazil", level: "hard" },
  { slug: "okavango-river", name: "Okavango River", country: "Botswana", level: "hard" },
  { slug: "senegal-river", name: "Senegal River", country: "Senegal", level: "hard" },
  { slug: "gambia-river", name: "Gambia River", country: "Gambia", level: "hard" },
  { slug: "volta-river", name: "Volta River", country: "Ghana", level: "hard" },
  { slug: "han-river", name: "Han River", country: "South Korea", level: "hard" },
  { slug: "red-river-vietnam", name: "Red River", country: "Vietnam", level: "hard" },
  { slug: "ural-river", name: "Ural River", country: "Kazakhstan", level: "hard" },
  { slug: "selenge-river", name: "Selenge River", country: "Mongolia", level: "hard" },
  { slug: "godavari-river", name: "Godavari River", country: "India", level: "hard" },

  // IMPOSSIBLE (17)
  { slug: "yenisei-river", name: "Yenisei River", country: "Russia", level: "impossible" },
  { slug: "guadalquivir-river", name: "Guadalquivir River", country: "Spain", level: "impossible" },
  { slug: "weser-river", name: "Weser River", country: "Germany", level: "impossible" },
  { slug: "meuse-river", name: "Meuse River", country: "Belgium", level: "impossible" },
  { slug: "drava-river", name: "Drava River", country: "Croatia", level: "impossible" },
  { slug: "sava-river", name: "Sava River", country: "Serbia", level: "impossible" },
  { slug: "tisza-river", name: "Tisza River", country: "Hungary", level: "impossible" },
  { slug: "marne-river", name: "Marne River", country: "France", level: "impossible" },
  { slug: "orange-river", name: "Orange River", country: "South Africa", level: "impossible" },
  { slug: "chindwin-river", name: "Chindwin River", country: "Myanmar", level: "impossible" },
  { slug: "magdalena-river", name: "Magdalena River", country: "Colombia", level: "impossible" },
  { slug: "berbice-river", name: "Berbice River", country: "Guyana", level: "impossible" },
  { slug: "kagera-river", name: "Kagera River", country: "Rwanda", level: "impossible" },
  { slug: "ottawa-river", name: "Ottawa River", country: "Canada", level: "impossible" },
  { slug: "narmada-river", name: "Narmada River", country: "India", level: "impossible" },
  { slug: "amur-river", name: "Amur River", country: "China", level: "impossible" },
  { slug: "trent-river", name: "River Trent", country: "United Kingdom", level: "impossible" },
];
