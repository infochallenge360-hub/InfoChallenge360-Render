// Episode 15 "Guess the Island" — 71 items, absolute-difficulty calibrated.
// Answer = country (not island name) — engine nameField is "country", matching the
// established Country-by-Food (E08) / Capital Cities (E10) / Tourist Spots (E13) /
// Mountains (E14) pattern. For sovereign island-nations the answer IS the island's own
// name (Iceland, Madagascar, Sri Lanka, Jamaica, Cuba, Singapore, Malta, Barbados,
// Mauritius, Saint Lucia, Trinidad and Tobago, Nauru, Tuvalu, Marshall Islands,
// Equatorial Guinea, Sao Tome and Principe, Vanuatu). For AUTONOMOUS territories/
// constituent countries with globally-recognized identities distinct from their
// sovereign state, the territory's own name is used as the answer — matching the E13
// precedent (French Polynesia, Faroe Islands used as their own answer, not
// France/Denmark): Greenland, Bermuda, Isle of Man, Curacao, Aruba, New Caledonia.
// Fully-integrated regions/departments of a country keep the parent country as the
// answer (Sicily/Sardinia/Elba->Italy, Corsica/Reunion->France, Christmas Island->
// Australia as an external territory, etc.) — matching how French Riviera/Corsica-style
// regions were handled in E13.
// Deliberately distinct from E13 "Tourist Destinations" — does not reuse Bora Bora
// (French Polynesia), Jeju Island (South Korea), Phi Phi Islands (Thailand), Komodo
// Island (Indonesia), Faroe Islands, Fernando de Noronha (Brazil), Harbour Island
// (Bahamas), Maldives, Santorini (Greece), Bali (Indonesia), Boracay (Philippines),
// Zanzibar (Tanzania), Fiji, Seychelles, Raja Ampat (Indonesia).
// No Israel/Jerusalem/West Bank/Gaza. No disputed-territory ambiguity — Taiwan,
// Falklands, Kuril Islands, South China Sea islands, Northern Cyprus, Western Sahara
// coast, and Chagos/Diego Garcia all excluded after a dispute-status WebSearch check.
// No country repeats within any single tier (MC distractors are drawn from the same
// tier) — verified programmatically. Same country CAN recur across different tiers.
export const ISLANDS_E15 = [
  // EASY (18)
  { slug: "sicily", name: "Sicily", country: "Italy", level: "easy" },
  { slug: "oahu-hawaii", name: "Oʻahu", country: "United States", level: "easy" },
  { slug: "greenland", name: "Greenland", country: "Greenland", level: "easy" },
  { slug: "iceland", name: "Iceland", country: "Iceland", level: "easy" },
  { slug: "madagascar", name: "Madagascar", country: "Madagascar", level: "easy" },
  { slug: "sri-lanka", name: "Sri Lanka", country: "Sri Lanka", level: "easy" },
  { slug: "easter-island", name: "Easter Island", country: "Chile", level: "easy" },
  { slug: "mont-saint-michel", name: "Mont-Saint-Michel", country: "France", level: "easy" },
  { slug: "ibiza", name: "Ibiza", country: "Spain", level: "easy" },
  { slug: "galapagos", name: "Galápagos Islands", country: "Ecuador", level: "easy" },
  { slug: "jamaica", name: "Jamaica", country: "Jamaica", level: "easy" },
  { slug: "cuba", name: "Cuba", country: "Cuba", level: "easy" },
  { slug: "singapore", name: "Singapore", country: "Singapore", level: "easy" },
  { slug: "phuket", name: "Phuket", country: "Thailand", level: "easy" },
  { slug: "bermuda", name: "Bermuda", country: "Bermuda", level: "easy" },
  { slug: "robben-island", name: "Robben Island", country: "South Africa", level: "easy" },
  { slug: "crete", name: "Crete", country: "Greece", level: "easy" },
  { slug: "tasmania", name: "Tasmania", country: "Australia", level: "easy" },

  // MEDIUM (18)
  { slug: "sardinia", name: "Sardinia", country: "Italy", level: "medium" },
  { slug: "alcatraz", name: "Alcatraz Island", country: "United States", level: "medium" },
  { slug: "corsica", name: "Corsica", country: "France", level: "medium" },
  { slug: "tenerife", name: "Tenerife", country: "Spain", level: "medium" },
  { slug: "mykonos", name: "Mykonos", country: "Greece", level: "medium" },
  { slug: "malta", name: "Malta", country: "Malta", level: "medium" },
  { slug: "barbados", name: "Barbados", country: "Barbados", level: "medium" },
  { slug: "mauritius", name: "Mauritius", country: "Mauritius", level: "medium" },
  { slug: "saint-lucia", name: "Saint Lucia", country: "Saint Lucia", level: "medium" },
  { slug: "curacao", name: "Curaçao", country: "Curaçao", level: "medium" },
  { slug: "java", name: "Java", country: "Indonesia", level: "medium" },
  { slug: "palawan", name: "Palawan", country: "Philippines", level: "medium" },
  { slug: "koh-samui", name: "Koh Samui", country: "Thailand", level: "medium" },
  { slug: "langkawi", name: "Langkawi", country: "Malaysia", level: "medium" },
  { slug: "okinawa", name: "Okinawa Island", country: "Japan", level: "medium" },
  { slug: "isle-of-skye", name: "Isle of Skye", country: "United Kingdom", level: "medium" },
  { slug: "vancouver-island", name: "Vancouver Island", country: "Canada", level: "medium" },
  { slug: "cozumel", name: "Cozumel", country: "Mexico", level: "medium" },

  // HARD (18)
  { slug: "capri", name: "Capri", country: "Italy", level: "hard" },
  { slug: "key-west", name: "Key West", country: "United States", level: "hard" },
  { slug: "reunion", name: "Réunion", country: "France", level: "hard" },
  { slug: "menorca", name: "Menorca", country: "Spain", level: "hard" },
  { slug: "rhodes", name: "Rhodes", country: "Greece", level: "hard" },
  { slug: "cebu", name: "Cebu", country: "Philippines", level: "hard" },
  { slug: "aruba", name: "Aruba", country: "Aruba", level: "hard" },
  { slug: "lombok", name: "Lombok", country: "Indonesia", level: "hard" },
  { slug: "penang", name: "Penang Island", country: "Malaysia", level: "hard" },
  { slug: "hokkaido", name: "Hokkaido", country: "Japan", level: "hard" },
  { slug: "isle-of-man", name: "Isle of Man", country: "Isle of Man", level: "hard" },
  { slug: "prince-edward-island", name: "Prince Edward Island", country: "Canada", level: "hard" },
  { slug: "havelock-island", name: "Havelock Island", country: "India", level: "hard" },
  { slug: "lofoten", name: "Lofoten", country: "Norway", level: "hard" },
  { slug: "gotland", name: "Gotland", country: "Sweden", level: "hard" },
  { slug: "goree-island", name: "Gorée Island", country: "Senegal", level: "hard" },
  { slug: "whitsunday-islands", name: "Whitsunday Islands", country: "Australia", level: "hard" },
  { slug: "trinidad", name: "Trinidad", country: "Trinidad and Tobago", level: "hard" },

  // IMPOSSIBLE (17)
  { slug: "elba", name: "Elba", country: "Italy", level: "impossible" },
  { slug: "marthas-vineyard", name: "Martha's Vineyard", country: "United States", level: "impossible" },
  { slug: "new-caledonia", name: "New Caledonia", country: "New Caledonia", level: "impossible" },
  { slug: "lanzarote", name: "Lanzarote", country: "Spain", level: "impossible" },
  { slug: "svalbard", name: "Svalbard", country: "Norway", level: "impossible" },
  { slug: "bornholm", name: "Bornholm", country: "Denmark", level: "impossible" },
  { slug: "saaremaa", name: "Saaremaa", country: "Estonia", level: "impossible" },
  { slug: "aland-islands", name: "Åland Islands", country: "Finland", level: "impossible" },
  { slug: "sakhalin", name: "Sakhalin", country: "Russia", level: "impossible" },
  { slug: "christmas-island", name: "Christmas Island", country: "Australia", level: "impossible" },
  { slug: "chiloe", name: "Chiloé Island", country: "Chile", level: "impossible" },
  { slug: "bioko", name: "Bioko", country: "Equatorial Guinea", level: "impossible" },
  { slug: "principe", name: "Príncipe", country: "São Tomé and Príncipe", level: "impossible" },
  { slug: "nauru", name: "Nauru", country: "Nauru", level: "impossible" },
  { slug: "funafuti", name: "Funafuti", country: "Tuvalu", level: "impossible" },
  { slug: "efate", name: "Efate", country: "Vanuatu", level: "impossible" },
  { slug: "bikini-atoll", name: "Bikini Atoll", country: "Marshall Islands", level: "impossible" },
];
