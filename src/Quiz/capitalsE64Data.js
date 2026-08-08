// E64 "Guess the Capital" (reverse of E63) — 70 real country→capital pairs,
// a FRESH set of countries not used in E63 (no repeat content).
// Image = country map-shape silhouette. On-screen clue text = the COUNTRY's name;
// player guesses the CAPITAL (nameField = capital here, reversed from E63).
// Absolute difficulty: calibrated for country->capital recall specifically
// (a different memory direction than E63's capital->country, so tiers are
// re-derived independently, not copied from any prior episode).
// Zero Israel content (standing hard rule, all episodes).
export const CAPITALS_E64 = [
  // EASY (18)
  { iso: "sg", name: "Singapore", capital: "Singapore", level: "easy" },
  { iso: "kp", name: "North Korea", capital: "Pyongyang", level: "easy" },
  { iso: "tw", name: "Taiwan", capital: "Taipei", level: "easy" },
  { iso: "is", name: "Iceland", capital: "Reykjavik", level: "easy" },
  { iso: "ir", name: "Iran", capital: "Tehran", level: "easy" },
  { iso: "iq", name: "Iraq", capital: "Baghdad", level: "easy" },
  { iso: "co", name: "Colombia", capital: "Bogotá", level: "easy" },
  { iso: "ve", name: "Venezuela", capital: "Caracas", level: "easy" },
  { iso: "gh", name: "Ghana", capital: "Accra", level: "easy" },
  { iso: "kh", name: "Cambodia", capital: "Phnom Penh", level: "easy" },
  { iso: "mt", name: "Malta", capital: "Valletta", level: "easy" },
  { iso: "lu", name: "Luxembourg", capital: "Luxembourg City", level: "easy" },
  { iso: "qa", name: "Qatar", capital: "Doha", level: "easy" },
  { iso: "kw", name: "Kuwait", capital: "Kuwait City", level: "easy" },
  { iso: "pa", name: "Panama", capital: "Panama City", level: "easy" },
  { iso: "cr", name: "Costa Rica", capital: "San José", level: "easy" },
  { iso: "jm", name: "Jamaica", capital: "Kingston", level: "easy" },
  { iso: "gt", name: "Guatemala", capital: "Guatemala City", level: "easy" },

  // MEDIUM (18)
  { iso: "et", name: "Ethiopia", capital: "Addis Ababa", level: "medium" },
  { iso: "cd", name: "DR Congo", capital: "Kinshasa", level: "medium" },
  { iso: "np", name: "Nepal", capital: "Kathmandu", level: "medium" },
  { iso: "ge", name: "Georgia", capital: "Tbilisi", level: "medium" },
  { iso: "am", name: "Armenia", capital: "Yerevan", level: "medium" },
  { iso: "az", name: "Azerbaijan", capital: "Baku", level: "medium" },
  { iso: "lt", name: "Lithuania", capital: "Vilnius", level: "medium" },
  { iso: "lv", name: "Latvia", capital: "Riga", level: "medium" },
  { iso: "ee", name: "Estonia", capital: "Tallinn", level: "medium" },
  { iso: "ec", name: "Ecuador", capital: "Quito", level: "medium" },
  { iso: "do", name: "Dominican Republic", capital: "Santo Domingo", level: "medium" },
  { iso: "fj", name: "Fiji", capital: "Suva", level: "medium" },
  { iso: "om", name: "Oman", capital: "Muscat", level: "medium" },
  { iso: "ye", name: "Yemen", capital: "Sana'a", level: "medium" },
  { iso: "bd", name: "Bangladesh", capital: "Dhaka", level: "medium" },
  { iso: "mg", name: "Madagascar", capital: "Antananarivo", level: "medium" },
  { iso: "uz", name: "Uzbekistan", capital: "Tashkent", level: "medium" },
  { iso: "tj", name: "Tajikistan", capital: "Dushanbe", level: "medium" },

  // HARD (18)
  { iso: "al", name: "Albania", capital: "Tirana", level: "hard" },
  { iso: "ao", name: "Angola", capital: "Luanda", level: "hard" },
  { iso: "ba", name: "Bosnia and Herzegovina", capital: "Sarajevo", level: "hard" },
  { iso: "mn", name: "Mongolia", capital: "Ulaanbaatar", level: "hard" },
  { iso: "bw", name: "Botswana", capital: "Gaborone", level: "hard" },
  { iso: "bz", name: "Belize", capital: "Belmopan", level: "hard" },
  { iso: "cm", name: "Cameroon", capital: "Yaoundé", level: "hard" },
  { iso: "cv", name: "Cabo Verde", capital: "Praia", level: "hard" },
  { iso: "gm", name: "The Gambia", capital: "Banjul", level: "hard" },
  { iso: "gy", name: "Guyana", capital: "Georgetown", level: "hard" },
  { iso: "ls", name: "Lesotho", capital: "Maseru", level: "hard" },
  { iso: "ly", name: "Libya", capital: "Tripoli", level: "hard" },
  { iso: "ml", name: "Mali", capital: "Bamako", level: "hard" },
  { iso: "mw", name: "Malawi", capital: "Lilongwe", level: "hard" },
  { iso: "mz", name: "Mozambique", capital: "Maputo", level: "hard" },
  { iso: "na", name: "Namibia", capital: "Windhoek", level: "hard" },
  { iso: "ne", name: "Niger", capital: "Niamey", level: "hard" },
  { iso: "md", name: "Moldova", capital: "Chișinău", level: "hard" },

  // IMPOSSIBLE (16)
  { iso: "dj", name: "Djibouti", capital: "Djibouti City", level: "impossible" },
  { iso: "er", name: "Eritrea", capital: "Asmara", level: "impossible" },
  { iso: "kg", name: "Kyrgyzstan", capital: "Bishkek", level: "impossible" },
  { iso: "py", name: "Paraguay", capital: "Asunción", level: "impossible" },
  { iso: "rw", name: "Rwanda", capital: "Kigali", level: "impossible" },
  { iso: "sb", name: "Solomon Islands", capital: "Honiara", level: "impossible" },
  { iso: "sd", name: "Sudan", capital: "Khartoum", level: "impossible" },
  { iso: "si", name: "Slovenia", capital: "Ljubljana", level: "impossible" },
  { iso: "sk", name: "Slovakia", capital: "Bratislava", level: "impossible" },
  { iso: "sn", name: "Senegal", capital: "Dakar", level: "impossible" },
  { iso: "so", name: "Somalia", capital: "Mogadishu", level: "impossible" },
  { iso: "ss", name: "South Sudan", capital: "Juba", level: "impossible" },
  { iso: "td", name: "Chad", capital: "N'Djamena", level: "impossible" },
  { iso: "tl", name: "Timor-Leste", capital: "Dili", level: "impossible" },
  { iso: "ug", name: "Uganda", capital: "Kampala", level: "impossible" },
  { iso: "vu", name: "Vanuatu", capital: "Port Vila", level: "impossible" },
];

export default CAPITALS_E64;
