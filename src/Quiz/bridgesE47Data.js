// E47 "Guess the Bridge" — answer = bridge name, image = real photo of the bridge.
// Calibrated by global recognizability (quiz-difficulty-calibration). Honest topic ceiling:
// bridges have only a handful of truly ~90%+ global icons (Golden Gate, Tower Bridge, Brooklyn,
// Sydney Harbour) — "easy" here is the topic's own honest top band, same as the flags episode.
// wiki: exact Wikipedia article title for image sourcing (several don't match a naive slug->title
// conversion — diacritics, en-dashes, or a different English name than the slug implies).
export const BRIDGES_E47 = [
  // EASY (18)
  { slug: "golden-gate-bridge", name: "Golden Gate Bridge", country: "USA", wiki: "Golden Gate Bridge", level: "easy" },
  { slug: "tower-bridge", name: "Tower Bridge", country: "United Kingdom", wiki: "Tower Bridge", level: "easy" },
  { slug: "brooklyn-bridge", name: "Brooklyn Bridge", country: "USA", wiki: "Brooklyn Bridge", level: "easy" },
  { slug: "sydney-harbour-bridge", name: "Sydney Harbour Bridge", country: "Australia", wiki: "Sydney Harbour Bridge", level: "easy" },
  { slug: "rialto-bridge", name: "Rialto Bridge", country: "Italy", wiki: "Rialto Bridge", level: "easy" },
  { slug: "ponte-vecchio", name: "Ponte Vecchio", country: "Italy", wiki: "Ponte Vecchio", level: "easy" },
  { slug: "charles-bridge", name: "Charles Bridge", country: "Czech Republic", wiki: "Charles Bridge", level: "easy" },
  { slug: "chain-bridge-budapest", name: "Széchenyi Chain Bridge", country: "Hungary", wiki: "Széchenyi Chain Bridge", level: "easy" },
  { slug: "millau-viaduct", name: "Millau Viaduct", country: "France", wiki: "Millau Viaduct", level: "easy" },
  { slug: "pont-alexandre-iii", name: "Pont Alexandre III", country: "France", wiki: "Pont Alexandre III", level: "easy" },
  { slug: "bridge-of-sighs", name: "Bridge of Sighs", country: "Italy", wiki: "Bridge of Sighs", level: "easy" },
  { slug: "stari-most", name: "Stari Most", country: "Bosnia and Herzegovina", wiki: "Stari Most", level: "easy" },
  { slug: "forth-bridge", name: "Forth Bridge", country: "Scotland", wiki: "Forth Bridge", level: "easy" },
  { slug: "golden-bridge-da-nang", name: "Golden Bridge", country: "Vietnam", wiki: "Golden Bridge (Vietnam)", level: "easy" },
  { slug: "ponte-25-de-abril", name: "Ponte 25 de Abril", country: "Portugal", wiki: "Ponte 25 de Abril", level: "easy" },
  { slug: "kapellbrucke", name: "Chapel Bridge", country: "Switzerland", wiki: "Chapel Bridge", level: "easy" },
  { slug: "pont-du-gard", name: "Pont du Gard", country: "France", wiki: "Pont du Gard", level: "easy" },
  { slug: "akashi-kaikyo-bridge", name: "Akashi Kaikyō Bridge", country: "Japan", wiki: "Akashi Kaikyo Bridge", level: "easy" },

  // MEDIUM (18)
  { slug: "rainbow-bridge-tokyo", name: "Rainbow Bridge", country: "Japan", wiki: "Rainbow Bridge (Tokyo)", level: "medium" },
  { slug: "george-washington-bridge", name: "George Washington Bridge", country: "USA", wiki: "George Washington Bridge", level: "medium" },
  { slug: "clifton-suspension-bridge", name: "Clifton Suspension Bridge", country: "United Kingdom", wiki: "Clifton Suspension Bridge", level: "medium" },
  { slug: "galata-bridge", name: "Galata Bridge", country: "Turkey", wiki: "Galata Bridge", level: "medium" },
  { slug: "bosphorus-bridge", name: "Bosphorus Bridge", country: "Turkey", wiki: "Bosphorus Bridge", level: "medium" },
  { slug: "pont-neuf", name: "Pont Neuf", country: "France", wiki: "Pont Neuf", level: "medium" },
  { slug: "howrah-bridge", name: "Howrah Bridge", country: "India", wiki: "Howrah Bridge", level: "medium" },
  { slug: "puente-nuevo-ronda", name: "Puente Nuevo", country: "Spain", wiki: "Puente Nuevo", level: "medium" },
  { slug: "zhangjiajie-glass-bridge", name: "Zhangjiajie Grand Canyon Glass Bridge", country: "China", wiki: "Zhangjiajie Glass Bridge", level: "medium" }, // wiki title corrected: article is "Zhangjiajie Glass Bridge"
  { slug: "hapenny-bridge", name: "Ha'penny Bridge", country: "Ireland", wiki: "Ha'penny Bridge", level: "medium" },
  { slug: "palace-bridge", name: "Palace Bridge", country: "Russia", wiki: "Palace Bridge", level: "medium" },
  { slug: "victoria-falls-bridge", name: "Victoria Falls Bridge", country: "Zambia/Zimbabwe", wiki: "Victoria Falls Bridge", level: "medium" },
  { slug: "storseisundet-bridge", name: "Storseisundet Bridge", country: "Norway", wiki: "Storseisundet Bridge", level: "medium" },
  { slug: "hong-kong-zhuhai-macau-bridge", name: "Hong Kong–Zhuhai–Macau Bridge", country: "China", wiki: "Hong Kong–Zhuhai–Macau Bridge", level: "medium" }, // verify image is a photo, not a route map
  { slug: "capilano-suspension-bridge", name: "Capilano Suspension Bridge", country: "Canada", wiki: "Capilano Suspension Bridge", level: "medium" },
  { slug: "bandra-worli-sea-link", name: "Bandra–Worli Sea Link", country: "India", wiki: "Bandra–Worli Sea Link", level: "medium" },
  { slug: "rakotzbrucke", name: "Rakotzbrücke", country: "Germany", wiki: "Rakotzbrücke", level: "medium" },
  { slug: "banpo-bridge", name: "Banpo Bridge", country: "South Korea", wiki: "Banpo Bridge", level: "medium" },

  // HARD (18)
  { slug: "erasmusbrug", name: "Erasmusbrug", country: "Netherlands", wiki: "Erasmusbrug", level: "hard" },
  { slug: "dragon-bridge-ljubljana", name: "Dragon Bridge", country: "Slovenia", wiki: "Dragon Bridge (Ljubljana)", level: "hard" },
  { slug: "puente-de-la-mujer", name: "Puente de la Mujer", country: "Argentina", wiki: "Puente de la Mujer", level: "hard" },
  { slug: "juscelino-kubitschek-bridge", name: "Juscelino Kubitschek Bridge", country: "Brazil", wiki: "Juscelino Kubitschek Bridge", level: "hard" },
  { slug: "royal-gorge-bridge", name: "Royal Gorge Bridge", country: "USA", wiki: "Royal Gorge Bridge", level: "hard" },
  { slug: "ponte-sant-angelo", name: "Ponte Sant'Angelo", country: "Italy", wiki: "Ponte Sant'Angelo", level: "hard" },
  { slug: "oresund-bridge", name: "Øresund Bridge", country: "Sweden/Denmark", wiki: "Øresund Bridge", level: "hard" },
  { slug: "pulteney-bridge", name: "Pulteney Bridge", country: "United Kingdom", wiki: "Pulteney Bridge", level: "hard" },
  { slug: "iron-bridge-shropshire", name: "The Iron Bridge", country: "United Kingdom", wiki: "The Iron Bridge", level: "hard" },
  { slug: "mackinac-bridge", name: "Mackinac Bridge", country: "USA", wiki: "Mackinac Bridge", level: "hard" },
  { slug: "lions-gate-bridge", name: "Lions Gate Bridge", country: "Canada", wiki: "Lions Gate Bridge", level: "hard" },
  { slug: "auckland-harbour-bridge", name: "Auckland Harbour Bridge", country: "New Zealand", wiki: "Auckland Harbour Bridge", level: "hard" },
  { slug: "si-o-se-pol", name: "Si-o-se-pol", country: "Iran", wiki: "Si-o-se-pol", level: "hard" },
  { slug: "khaju-bridge", name: "Khaju Bridge", country: "Iran", wiki: "Khaju Bridge", level: "hard" },
  { slug: "nelson-mandela-bridge", name: "Nelson Mandela Bridge", country: "South Africa", wiki: "Nelson Mandela Bridge", level: "hard" },
  { slug: "sunshine-skyway-bridge", name: "Sunshine Skyway Bridge", country: "USA", wiki: "Sunshine Skyway Bridge", level: "hard" },
  { slug: "vasco-da-gama-bridge", name: "Vasco da Gama Bridge", country: "Portugal", wiki: "Vasco da Gama Bridge", level: "hard" },
  { slug: "humber-bridge", name: "Humber Bridge", country: "United Kingdom", wiki: "Humber Bridge", level: "hard" },

  // IMPOSSIBLE (18)
  { slug: "ponte-milvio", name: "Ponte Milvio", country: "Italy", wiki: "Ponte Milvio", level: "impossible" },
  { slug: "pons-fabricius", name: "Pons Fabricius", country: "Italy", wiki: "Pons Fabricius", level: "impossible" },
  { slug: "legion-bridge-prague", name: "Legion Bridge", country: "Czech Republic", wiki: "Legion Bridge", level: "impossible" }, // verified: title correct as-is
  { slug: "kramerbrucke", name: "Krämerbrücke", country: "Germany", wiki: "Krämerbrücke", level: "impossible" },
  { slug: "stone-bridge-regensburg", name: "Stone Bridge", country: "Germany", wiki: "Stone Bridge (Regensburg)", level: "impossible" }, // verified: article title uses parentheses, not comma
  { slug: "triple-bridge-ljubljana", name: "Triple Bridge", country: "Slovenia", wiki: "Tromostovje", level: "impossible" },
  { slug: "confederation-bridge", name: "Confederation Bridge", country: "Canada", wiki: "Confederation Bridge", level: "impossible" },
  { slug: "nanjing-yangtze-river-bridge", name: "Nanjing Yangtze River Bridge", country: "China", wiki: "Nanjing Yangtze River Bridge", level: "impossible" },
  { slug: "hangzhou-bay-bridge", name: "Hangzhou Bay Bridge", country: "China", wiki: "Hangzhou Bay Bridge", level: "impossible" },
  { slug: "danyang-kunshan-grand-bridge", name: "Danyang–Kunshan Grand Bridge", country: "China", wiki: "Danyang–Kunshan Grand Bridge", level: "impossible" }, // verify image is a photo, not a diagram
  { slug: "trajans-bridge", name: "Trajan's Bridge", country: "Romania/Serbia", wiki: "Trajan's Bridge", level: "impossible" }, // image may be a historical relief/painting
  { slug: "alcantara-bridge", name: "Alcántara Bridge", country: "Spain", wiki: "Alcántara Bridge", level: "impossible" },
  { slug: "6-october-bridge", name: "6th of October Bridge", country: "Egypt", wiki: "6th October Bridge", level: "impossible" }, // wiki title corrected: article is "6th October Bridge" (no "of")
  { slug: "rio-niteroi-bridge", name: "Rio–Niterói Bridge", country: "Brazil", wiki: "Rio–Niterói Bridge", level: "impossible" },
  { slug: "king-fahd-causeway", name: "King Fahd Causeway", country: "Saudi Arabia/Bahrain", wiki: "King Fahd Causeway", level: "impossible" }, // verify image is a photo, not a route map
  { slug: "padma-bridge", name: "Padma Bridge", country: "Bangladesh", wiki: "Padma Bridge", level: "impossible" },
  { slug: "vidyasagar-setu", name: "Vidyasagar Setu", country: "India", wiki: "Vidyasagar Setu", level: "impossible" },
  { slug: "chesapeake-bay-bridge-tunnel", name: "Chesapeake Bay Bridge–Tunnel", country: "USA", wiki: "Chesapeake Bay Bridge–Tunnel", level: "impossible" },
];
