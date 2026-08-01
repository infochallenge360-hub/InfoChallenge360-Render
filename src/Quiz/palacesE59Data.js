// E59 "Guess the Palace" — 70 items, absolute global recognizability.
// easy = globally iconic royal residences (Buckingham Palace, Versailles, Forbidden City...);
// impossible = genuinely obscure regional/national palaces most of the world has never heard of.
// Genuine palaces only (real royal/state residences officially named "Palace", or the
// direct-equivalent Alcázar/Kraton/Rova/Bogd Khan terms) — no castles or forts (covered in a
// separate castles episode) to keep the "palace" premise honest.
// fit=cover, dir="palaces", ext="jpg", coldSlug="tbd" (set after image sourcing).

export const PALACES_E59 = [
  // EASY (18)
  { slug: "buckingham-palace", name: "Buckingham Palace", country: "United Kingdom", level: "easy" },
  { slug: "palace-of-versailles", name: "Palace of Versailles", country: "France", level: "easy" },
  { slug: "forbidden-city", name: "Forbidden City", country: "China", level: "easy" },
  { slug: "potala-palace", name: "Potala Palace", country: "China", level: "easy" },
  { slug: "topkapi-palace", name: "Topkapi Palace", country: "Turkey", level: "easy" },
  { slug: "alhambra", name: "Alhambra", country: "Spain", level: "easy" },
  { slug: "schonbrunn-palace", name: "Schönbrunn Palace", country: "Austria", level: "easy" },
  { slug: "peterhof-palace", name: "Peterhof Palace", country: "Russia", level: "easy" },
  { slug: "winter-palace", name: "Winter Palace", country: "Russia", level: "easy" },
  { slug: "doges-palace", name: "Doge's Palace", country: "Italy", level: "easy" },
  { slug: "royal-palace-madrid", name: "Royal Palace of Madrid", country: "Spain", level: "easy" },
  { slug: "catherine-palace", name: "Catherine Palace", country: "Russia", level: "easy" },
  { slug: "hampton-court-palace", name: "Hampton Court Palace", country: "United Kingdom", level: "easy" },
  { slug: "elysee-palace", name: "Élysée Palace", country: "France", level: "easy" },
  { slug: "blenheim-palace", name: "Blenheim Palace", country: "United Kingdom", level: "easy" },
  { slug: "pena-palace", name: "Pena Palace", country: "Portugal", level: "easy" },
  { slug: "amalienborg-palace", name: "Amalienborg Palace", country: "Denmark", level: "easy" },
  { slug: "royal-palace-caserta", name: "Royal Palace of Caserta", country: "Italy", level: "easy" },

  // MEDIUM (18)
  { slug: "royal-palace-brussels", name: "Royal Palace of Brussels", country: "Belgium", level: "medium" },
  { slug: "royal-palace-oslo", name: "Royal Palace, Oslo", country: "Norway", level: "medium" },
  { slug: "royal-palace-stockholm", name: "Stockholm Palace", country: "Sweden", level: "medium" },
  { slug: "drottningholm-palace", name: "Drottningholm Palace", country: "Sweden", level: "medium" },
  { slug: "het-loo-palace", name: "Het Loo Palace", country: "Netherlands", level: "medium" },
  { slug: "sanssouci-palace", name: "Sanssouci", country: "Germany", level: "medium" },
  { slug: "nymphenburg-palace", name: "Nymphenburg Palace", country: "Germany", level: "medium" },
  { slug: "wurzburg-residence", name: "Würzburg Residence", country: "Germany", level: "medium" },
  { slug: "royal-palace-naples", name: "Royal Palace of Naples", country: "Italy", level: "medium" },
  { slug: "quirinal-palace", name: "Quirinal Palace", country: "Italy", level: "medium" },
  { slug: "gyeongbokgung", name: "Gyeongbokgung Palace", country: "South Korea", level: "medium" },
  { slug: "changdeokgung", name: "Changdeokgung Palace", country: "South Korea", level: "medium" },
  { slug: "imperial-palace-tokyo", name: "Tokyo Imperial Palace", country: "Japan", level: "medium" },
  { slug: "mysore-palace", name: "Mysore Palace", country: "India", level: "medium" },
  { slug: "city-palace-jaipur", name: "City Palace, Jaipur", country: "India", level: "medium" },
  { slug: "hue-imperial-city", name: "Imperial City of Huế", country: "Vietnam", level: "medium" },
  { slug: "grand-palace-bangkok", name: "Grand Palace", country: "Thailand", level: "medium" },
  { slug: "malacanang-palace", name: "Malacañang Palace", country: "Philippines", level: "medium" },

  // HARD (18)
  { slug: "queluz-palace", name: "Queluz National Palace", country: "Portugal", level: "hard" },
  { slug: "royal-palace-turin", name: "Royal Palace of Turin", country: "Italy", level: "hard" },
  { slug: "rundale-palace", name: "Rundāle Palace", country: "Latvia", level: "hard" },
  { slug: "christiansborg-palace", name: "Christiansborg Palace", country: "Denmark", level: "hard" },
  { slug: "royal-palace-phnom-penh", name: "Royal Palace, Phnom Penh", country: "Cambodia", level: "hard" },
  { slug: "royal-palace-luang-prabang", name: "Royal Palace, Luang Prabang", country: "Laos", level: "hard" },
  { slug: "iolani-palace", name: "ʻIolani Palace", country: "USA", level: "hard" },
  { slug: "dolmabahce-palace", name: "Dolmabahçe Palace", country: "Turkey", level: "hard" },
  { slug: "beylerbeyi-palace", name: "Beylerbeyi Palace", country: "Turkey", level: "hard" },
  { slug: "princes-palace-monaco", name: "Prince's Palace of Monaco", country: "Monaco", level: "hard" },
  { slug: "grand-ducal-palace-luxembourg", name: "Grand Ducal Palace", country: "Luxembourg", level: "hard" },
  { slug: "royal-alcazar-seville", name: "Royal Alcázar of Seville", country: "Spain", level: "hard" },
  { slug: "kadriorg-palace", name: "Kadriorg Palace", country: "Estonia", level: "hard" },
  { slug: "wilanow-palace", name: "Wilanów Palace", country: "Poland", level: "hard" },
  { slug: "esterhazy-palace", name: "Esterházy Palace", country: "Hungary", level: "hard" },
  { slug: "golestan-palace", name: "Golestan Palace", country: "Iran", level: "hard" },
  { slug: "palace-of-fontainebleau", name: "Palace of Fontainebleau", country: "France", level: "hard" },
  { slug: "royal-palace-milan", name: "Royal Palace of Milan", country: "Italy", level: "hard" },

  // IMPOSSIBLE (16)
  { slug: "jubilee-palace", name: "Jubilee Palace", country: "Ethiopia", level: "impossible" },
  { slug: "narayanhity-palace", name: "Narayanhity Palace", country: "Nepal", level: "impossible" },
  { slug: "royal-palaces-abomey", name: "Royal Palaces of Abomey", country: "Benin", level: "impossible" },
  { slug: "royal-palace-fez", name: "Royal Palace of Fez", country: "Morocco", level: "impossible" },
  { slug: "royal-palace-rabat", name: "Royal Palace of Rabat", country: "Morocco", level: "impossible" },
  { slug: "al-alam-palace", name: "Al Alam Palace", country: "Oman", level: "impossible" },
  { slug: "murabba-palace", name: "Murabba Palace", country: "Saudi Arabia", level: "impossible" },
  { slug: "rova-antananarivo", name: "Rova of Antananarivo", country: "Madagascar", level: "impossible" },
  { slug: "kraton-yogyakarta", name: "Kraton Yogyakarta", country: "Indonesia", level: "impossible" },
  { slug: "mandalay-palace", name: "Mandalay Palace", country: "Myanmar", level: "impossible" },
  { slug: "bogd-khan-palace", name: "Bogd Khan Palace", country: "Mongolia", level: "impossible" },
  { slug: "dadiani-palace", name: "Dadiani Palace", country: "Georgia", level: "impossible" },
  { slug: "presidential-palace-vientiane", name: "Presidential Palace, Vientiane", country: "Laos", level: "impossible" },
  { slug: "kings-palace-nyanza", name: "King's Palace Museum", country: "Rwanda", level: "impossible" },
  { slug: "tirana-presidential-palace", name: "Presidential Palace, Tirana", country: "Albania", level: "impossible" },
  { slug: "istana-negara", name: "Istana Negara", country: "Malaysia", level: "impossible" },
];

export default PALACES_E59;
