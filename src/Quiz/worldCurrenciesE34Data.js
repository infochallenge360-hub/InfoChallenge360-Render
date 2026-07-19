// E34 "Guess the Country" — answer = country, image = photo of a banknote/coin from that country's currency.
// Calibrated by global recognizability (quiz-difficulty-calibration): easy ~90% down to impossible <3%.
export const WORLD_CURRENCIES_E34 = [
  // EASY (12) — globally iconic currencies
  { slug: "usa-dollar", country: "United States", currency: "US Dollar", level: "easy" },
  { slug: "eurozone-euro", country: "Eurozone", currency: "Euro", level: "easy" },
  { slug: "japan-yen", country: "Japan", currency: "Japanese Yen", level: "easy" },
  { slug: "china-yuan", country: "China", currency: "Chinese Yuan", level: "easy" },
  { slug: "india-rupee", country: "India", currency: "Indian Rupee", level: "easy" },
  { slug: "australia-dollar", country: "Australia", currency: "Australian Dollar", level: "easy" },
  { slug: "switzerland-franc", country: "Switzerland", currency: "Swiss Franc", level: "easy" },
  { slug: "brazil-real", country: "Brazil", currency: "Brazilian Real", level: "easy" },
  { slug: "russia-ruble", country: "Russia", currency: "Russian Ruble", level: "easy" },
  { slug: "south-korea-won", country: "South Korea", currency: "South Korean Won", level: "easy" },
  { slug: "saudi-arabia-riyal", country: "Saudi Arabia", currency: "Saudi Riyal", level: "easy" },
  { slug: "turkey-lira", country: "Turkey", currency: "Turkish Lira", level: "easy" },

  // MEDIUM (6) — well known, less universally recognized appearance
  { slug: "poland-zloty", country: "Poland", currency: "Polish Zloty", level: "medium" },
  { slug: "indonesia-rupiah", country: "Indonesia", currency: "Indonesian Rupiah", level: "medium" },
  { slug: "philippines-peso", country: "Philippines", currency: "Philippine Peso", level: "medium" },
  { slug: "vietnam-dong", country: "Vietnam", currency: "Vietnamese Dong", level: "medium" },
  { slug: "egypt-pound", country: "Egypt", currency: "Egyptian Pound", level: "medium" },
  { slug: "czech-koruna", country: "Czech Republic", currency: "Czech Koruna", level: "medium" },

  // HARD (10) — recognizable to travel/finance enthusiasts
  { slug: "hungary-forint", country: "Hungary", currency: "Hungarian Forint", level: "hard" },
  { slug: "romania-leu", country: "Romania", currency: "Romanian Leu", level: "hard" },
  { slug: "ukraine-hryvnia", country: "Ukraine", currency: "Ukrainian Hryvnia", level: "hard" },
  { slug: "ethiopia-birr", country: "Ethiopia", currency: "Ethiopian Birr", level: "hard" },
  { slug: "ghana-cedi", country: "Ghana", currency: "Ghanaian Cedi", level: "hard" },
  { slug: "sri-lanka-rupee", country: "Sri Lanka", currency: "Sri Lankan Rupee", level: "hard" },
  { slug: "myanmar-kyat", country: "Myanmar", currency: "Myanmar Kyat", level: "hard" },
  { slug: "jordan-dinar", country: "Jordan", currency: "Jordanian Dinar", level: "hard" },
  { slug: "kuwait-dinar", country: "Kuwait", currency: "Kuwaiti Dinar", level: "hard" },
  { slug: "mongolia-tugrik", country: "Mongolia", currency: "Mongolian Tugrik", level: "hard" },

  // IMPOSSIBLE (6) — genuinely obscure even to enthusiasts
  { slug: "samoa-tala", country: "Samoa", currency: "Samoan Tala", level: "impossible" },
  { slug: "bahrain-dinar", country: "Bahrain", currency: "Bahraini Dinar", level: "impossible" },
  { slug: "azerbaijan-manat", country: "Azerbaijan", currency: "Azerbaijani Manat", level: "impossible" },
  { slug: "armenia-dram", country: "Armenia", currency: "Armenian Dram", level: "impossible" },
  { slug: "georgia-lari", country: "Georgia", currency: "Georgian Lari", level: "impossible" },
  { slug: "moldova-leu", country: "Moldova", currency: "Moldovan Leu", level: "impossible" },
];
