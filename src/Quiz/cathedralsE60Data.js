// E60 "Guess the Cathedral" — 74 items, absolute global recognizability.
// easy = globally iconic cathedrals/basilicas (Notre-Dame, St. Peter's, Sagrada Família...);
// impossible = genuinely obscure regional cathedrals most of the world has never heard of.
// Scope: genuine cathedrals (seat of a bishop) plus a handful of world-famous basilicas/great
// churches colloquially called "cathedral" by the general public (St. Peter's Basilica,
// Sagrada Família, Hagia Sophia) — same allowance used for direct-equivalent terms in prior
// episodes (Alcázar/Kraton in the palaces episode).
// fit=cover, dir="cathedrals", ext="jpg", coldSlug="tbd" (set after image sourcing).

export const CATHEDRALS_E60 = [
  // EASY (19)
  { slug: "notre-dame-paris", name: "Notre-Dame de Paris", country: "France", level: "easy" },
  { slug: "st-peters-basilica", name: "St. Peter's Basilica", country: "Vatican City", level: "easy" },
  { slug: "sagrada-familia", name: "Sagrada Família", country: "Spain", level: "easy" },
  { slug: "st-basils-cathedral", name: "St. Basil's Cathedral", country: "Russia", level: "easy" },
  { slug: "hagia-sophia", name: "Hagia Sophia", country: "Turkey", level: "easy" },
  { slug: "st-pauls-cathedral", name: "St. Paul's Cathedral", country: "United Kingdom", level: "easy" },
  { slug: "cologne-cathedral", name: "Cologne Cathedral", country: "Germany", level: "easy" },
  { slug: "milan-cathedral", name: "Milan Cathedral", country: "Italy", level: "easy" },
  { slug: "florence-cathedral", name: "Florence Cathedral", country: "Italy", level: "easy" },
  { slug: "seville-cathedral", name: "Seville Cathedral", country: "Spain", level: "easy" },
  { slug: "st-stephens-cathedral-vienna", name: "St. Stephen's Cathedral", country: "Austria", level: "easy" },
  { slug: "st-vitus-cathedral", name: "St. Vitus Cathedral", country: "Czech Republic", level: "easy" },
  { slug: "chartres-cathedral", name: "Chartres Cathedral", country: "France", level: "easy" },
  { slug: "reims-cathedral", name: "Notre-Dame de Reims", country: "France", level: "easy" },
  { slug: "canterbury-cathedral", name: "Canterbury Cathedral", country: "United Kingdom", level: "easy" },
  { slug: "washington-national-cathedral", name: "Washington National Cathedral", country: "USA", level: "easy" },
  { slug: "st-patricks-cathedral-nyc", name: "St. Patrick's Cathedral", country: "USA", level: "easy" },
  { slug: "brasilia-cathedral", name: "Cathedral of Brasília", country: "Brazil", level: "easy" },
  { slug: "mexico-city-cathedral", name: "Mexico City Metropolitan Cathedral", country: "Mexico", level: "easy" },

  // MEDIUM (19)
  { slug: "york-minster", name: "York Minster", country: "United Kingdom", level: "medium" },
  { slug: "salisbury-cathedral", name: "Salisbury Cathedral", country: "United Kingdom", level: "medium" },
  { slug: "strasbourg-cathedral", name: "Strasbourg Cathedral", country: "France", level: "medium" },
  { slug: "burgos-cathedral", name: "Burgos Cathedral", country: "Spain", level: "medium" },
  { slug: "toledo-cathedral", name: "Toledo Cathedral", country: "Spain", level: "medium" },
  { slug: "santiago-de-compostela-cathedral", name: "Santiago de Compostela Cathedral", country: "Spain", level: "medium" },
  { slug: "aachen-cathedral", name: "Aachen Cathedral", country: "Germany", level: "medium" },
  { slug: "speyer-cathedral", name: "Speyer Cathedral", country: "Germany", level: "medium" },
  { slug: "ulm-minster", name: "Ulm Minster", country: "Germany", level: "medium" },
  { slug: "siena-cathedral", name: "Siena Cathedral", country: "Italy", level: "medium" },
  { slug: "orvieto-cathedral", name: "Orvieto Cathedral", country: "Italy", level: "medium" },
  { slug: "palermo-cathedral", name: "Palermo Cathedral", country: "Italy", level: "medium" },
  { slug: "matthias-church", name: "Matthias Church", country: "Hungary", level: "medium" },
  { slug: "wawel-cathedral", name: "Wawel Cathedral", country: "Poland", level: "medium" },
  { slug: "st-sophia-cathedral-kyiv", name: "St. Sophia Cathedral", country: "Ukraine", level: "medium" },
  { slug: "cathedral-of-christ-the-saviour", name: "Cathedral of Christ the Saviour", country: "Russia", level: "medium" },
  { slug: "uppsala-cathedral", name: "Uppsala Cathedral", country: "Sweden", level: "medium" },
  { slug: "nidaros-cathedral", name: "Nidaros Cathedral", country: "Norway", level: "medium" },
  { slug: "helsinki-cathedral", name: "Helsinki Cathedral", country: "Finland", level: "medium" },

  // HARD (18)
  { slug: "liverpool-cathedral", name: "Liverpool Cathedral", country: "United Kingdom", level: "hard" },
  { slug: "wells-cathedral", name: "Wells Cathedral", country: "United Kingdom", level: "hard" },
  { slug: "trier-cathedral", name: "Trier Cathedral", country: "Germany", level: "hard" },
  { slug: "naples-cathedral", name: "Naples Cathedral", country: "Italy", level: "hard" },
  { slug: "monreale-cathedral", name: "Monreale Cathedral", country: "Italy", level: "hard" },
  { slug: "riga-cathedral", name: "Riga Cathedral", country: "Latvia", level: "hard" },
  { slug: "vilnius-cathedral", name: "Vilnius Cathedral", country: "Lithuania", level: "hard" },
  { slug: "zagreb-cathedral", name: "Zagreb Cathedral", country: "Croatia", level: "hard" },
  { slug: "alexander-nevsky-cathedral", name: "Alexander Nevsky Cathedral", country: "Bulgaria", level: "hard" },
  { slug: "bucharest-patriarchal-cathedral", name: "Patriarchal Cathedral", country: "Romania", level: "hard" },
  { slug: "etchmiadzin-cathedral", name: "Etchmiadzin Cathedral", country: "Armenia", level: "hard" },
  { slug: "sameba-cathedral", name: "Holy Trinity Cathedral (Sameba)", country: "Georgia", level: "hard" },
  { slug: "manila-cathedral", name: "Manila Cathedral", country: "Philippines", level: "hard" },
  { slug: "lima-cathedral", name: "Lima Cathedral", country: "Peru", level: "hard" },
  { slug: "buenos-aires-cathedral", name: "Buenos Aires Metropolitan Cathedral", country: "Argentina", level: "hard" },
  { slug: "havana-cathedral", name: "Havana Cathedral", country: "Cuba", level: "hard" },
  { slug: "quebec-cathedral", name: "Notre-Dame de Québec", country: "Canada", level: "hard" },
  { slug: "sydney-st-marys-cathedral", name: "St. Mary's Cathedral, Sydney", country: "Australia", level: "hard" },

  // IMPOSSIBLE (18)
  { slug: "holy-trinity-cathedral-addis-ababa", name: "Holy Trinity Cathedral", country: "Ethiopia", level: "impossible" },
  { slug: "coptic-cathedral-cairo", name: "St. Mark's Coptic Cathedral", country: "Egypt", level: "impossible" },
  { slug: "santo-domingo-cathedral", name: "Santo Domingo Cathedral", country: "Dominican Republic", level: "impossible" },
  { slug: "quito-cathedral", name: "Quito Metropolitan Cathedral", country: "Ecuador", level: "impossible" },
  { slug: "bogota-cathedral", name: "Primatial Cathedral of Bogotá", country: "Colombia", level: "impossible" },
  { slug: "guatemala-cathedral", name: "Guatemala City Cathedral", country: "Guatemala", level: "impossible" },
  { slug: "san-salvador-cathedral", name: "San Salvador Cathedral", country: "El Salvador", level: "impossible" },
  { slug: "new-orleans-st-louis-cathedral", name: "St. Louis Cathedral", country: "USA", level: "impossible" },
  { slug: "toronto-st-michaels-cathedral", name: "St. Michael's Cathedral", country: "Canada", level: "impossible" },
  { slug: "christchurch-cathedral", name: "ChristChurch Cathedral", country: "New Zealand", level: "impossible" },
  { slug: "myeongdong-cathedral", name: "Myeongdong Cathedral", country: "South Korea", level: "impossible" },
  { slug: "se-cathedral-goa", name: "Sé Cathedral", country: "India", level: "impossible" },
  { slug: "jakarta-cathedral", name: "Jakarta Cathedral", country: "Indonesia", level: "impossible" },
  { slug: "colombo-cathedral", name: "St. Lucia's Cathedral", country: "Sri Lanka", level: "impossible" },
  { slug: "yangon-cathedral", name: "St. Mary's Cathedral, Yangon", country: "Myanmar", level: "impossible" },
  { slug: "asuncion-cathedral", name: "Asunción Metropolitan Cathedral", country: "Paraguay", level: "impossible" },
  { slug: "la-paz-cathedral", name: "La Paz Metropolitan Cathedral", country: "Bolivia", level: "impossible" },
  { slug: "montevideo-cathedral", name: "Montevideo Metropolitan Cathedral", country: "Uruguay", level: "impossible" },
];

export default CATHEDRALS_E60;
