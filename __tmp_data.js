// Episode 10 "Guess the Capital City" — 71 items, absolute-difficulty calibrated.
// 18/18/18/17 split. Answer = country (not the city name) — engine nameField is "country".
// Every capital WebSearch-verified as the current, correct capital (catching recent changes:
// Equatorial Guinea's Jan 2026 move to Ciudad de la Paz, Kazakhstan's Nur-Sultan->Astana
// reversion, Indonesia's Jakarta still legally current pending Nusantara, Myanmar's
// Naypyidaw not Yangon, etc.). No Israel/Jerusalem; other disputed capitals screened out
// (Taipei, Laayoune, Pristina, Sana'a, Nicosia). South Africa skipped entirely (3-capital
// ambiguity). Ciudad de la Paz swapped for Vientiane (Laos) — Equatorial Guinea's brand-new
// capital is under a month old at build time with no usable photo yet; Malabo would be
// factually wrong as "the capital" now, so the country was dropped rather than misattributed.
// No country repeats within any single tier (MC distractors are drawn from the same tier).
const CAPITAL_CITIES_E10 = [
  // EASY (18)
  { slug: "paris", city: "Paris", country: "France", level: "easy" },
  { slug: "london", city: "London", country: "United Kingdom", level: "easy" },
  { slug: "tokyo", city: "Tokyo", country: "Japan", level: "easy" },
  { slug: "washington-dc", city: "Washington, D.C.", country: "United States", level: "easy" },
  { slug: "rome", city: "Rome", country: "Italy", level: "easy" },
  { slug: "berlin", city: "Berlin", country: "Germany", level: "easy" },
  { slug: "moscow", city: "Moscow", country: "Russia", level: "easy" },
  { slug: "beijing", city: "Beijing", country: "China", level: "easy" },
  { slug: "cairo", city: "Cairo", country: "Egypt", level: "easy" },
  { slug: "seoul", city: "Seoul", country: "South Korea", level: "easy" },
  { slug: "bangkok", city: "Bangkok", country: "Thailand", level: "easy" },
  { slug: "new-delhi", city: "New Delhi", country: "India", level: "easy" },
  { slug: "mexico-city", city: "Mexico City", country: "Mexico", level: "easy" },
  { slug: "buenos-aires", city: "Buenos Aires", country: "Argentina", level: "easy" },
  { slug: "madrid", city: "Madrid", country: "Spain", level: "easy" },
  { slug: "amsterdam", city: "Amsterdam", country: "Netherlands", level: "easy" },
  { slug: "brasilia", city: "Brasília", country: "Brazil", level: "easy" },
  { slug: "athens", city: "Athens", country: "Greece", level: "easy" },
  // MEDIUM (18)
  { slug: "vienna", city: "Vienna", country: "Austria", level: "medium" },
  { slug: "brussels", city: "Brussels", country: "Belgium", level: "medium" },
  { slug: "dublin", city: "Dublin", country: "Ireland", level: "medium" },
  { slug: "stockholm", city: "Stockholm", country: "Sweden", level: "medium" },
  { slug: "warsaw", city: "Warsaw", country: "Poland", level: "medium" },
  { slug: "budapest", city: "Budapest", country: "Hungary", level: "medium" },
  { slug: "jakarta", city: "Jakarta", country: "Indonesia", level: "medium" },
  { slug: "manila", city: "Manila", country: "Philippines", level: "medium" },
  { slug: "kuala-lumpur", city: "Kuala Lumpur", country: "Malaysia", level: "medium" },
  { slug: "riyadh", city: "Riyadh", country: "Saudi Arabia", level: "medium" },
  { slug: "hanoi", city: "Hanoi", country: "Vietnam", level: "medium" },
  { slug: "ottawa", city: "Ottawa", country: "Canada", level: "medium" },
  { slug: "havana", city: "Havana", country: "Cuba", level: "medium" },
  { slug: "lima", city: "Lima", country: "Peru", level: "medium" },
  { slug: "bogota", city: "Bogotá", country: "Colombia", level: "medium" },
  { slug: "nairobi", city: "Nairobi", country: "Kenya", level: "medium" },
  { slug: "addis-ababa", city: "Addis Ababa", country: "Ethiopia", level: "medium" },
  { slug: "canberra", city: "Canberra", country: "Australia", level: "medium" },
  // HARD (18)
  { slug: "bern", city: "Bern", country: "Switzerland", level: "hard" },
  { slug: "reykjavik", city: "Reykjavik", country: "Iceland", level: "hard" },
  { slug: "helsinki", city: "Helsinki", country: "Finland", level: "hard" },
  { slug: "bratislava", city: "Bratislava", country: "Slovakia", level: "hard" },
  { slug: "zagreb", city: "Zagreb", country: "Croatia", level: "hard" },
  { slug: "sofia", city: "Sofia", country: "Bulgaria", level: "hard" },
  { slug: "bucharest", city: "Bucharest", country: "Romania", level: "hard" },
  { slug: "ankara", city: "Ankara", country: "Turkey", level: "hard" },
  { slug: "kathmandu", city: "Kathmandu", country: "Nepal", level: "hard" },
  { slug: "islamabad", city: "Islamabad", country: "Pakistan", level: "hard" },
  { slug: "kabul", city: "Kabul", country: "Afghanistan", level: "hard" },
  { slug: "phnom-penh", city: "Phnom Penh", country: "Cambodia", level: "hard" },
  { slug: "ulaanbaatar", city: "Ulaanbaatar", country: "Mongolia", level: "hard" },
  { slug: "wellington", city: "Wellington", country: "New Zealand", level: "hard" },
  { slug: "quito", city: "Quito", country: "Ecuador", level: "hard" },
  { slug: "panama-city", city: "Panama City", country: "Panama", level: "hard" },
  { slug: "kigali", city: "Kigali", country: "Rwanda", level: "hard" },
  { slug: "astana", city: "Astana", country: "Kazakhstan", level: "hard" },
  // IMPOSSIBLE (17)
  { slug: "naypyidaw", city: "Naypyidaw", country: "Myanmar", level: "impossible" },
  { slug: "ouagadougou", city: "Ouagadougou", country: "Burkina Faso", level: "impossible" },
  { slug: "vaduz", city: "Vaduz", country: "Liechtenstein", level: "impossible" },
  { slug: "bissau", city: "Bissau", country: "Guinea-Bissau", level: "impossible" },
  { slug: "vientiane", city: "Vientiane", country: "Laos", level: "impossible" },
  { slug: "thimphu", city: "Thimphu", country: "Bhutan", level: "impossible" },
  { slug: "bandar-seri-begawan", city: "Bandar Seri Begawan", country: "Brunei", level: "impossible" },
  { slug: "male", city: "Malé", country: "Maldives", level: "impossible" },
  { slug: "suva", city: "Suva", country: "Fiji", level: "impossible" },
  { slug: "nukualofa", city: "Nuku'alofa", country: "Tonga", level: "impossible" },
  { slug: "apia", city: "Apia", country: "Samoa", level: "impossible" },
  { slug: "majuro", city: "Majuro", country: "Marshall Islands", level: "impossible" },
  { slug: "praia", city: "Praia", country: "Cape Verde", level: "impossible" },
  { slug: "moroni", city: "Moroni", country: "Comoros", level: "impossible" },
  { slug: "yamoussoukro", city: "Yamoussoukro", country: "Ivory Coast", level: "impossible" },
  { slug: "juba", city: "Juba", country: "South Sudan", level: "impossible" },
  { slug: "mogadishu", city: "Mogadishu", country: "Somalia", level: "impossible" },
];
module.exports = CAPITAL_CITIES_E10;
