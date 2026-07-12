// Episode 13 "Guess the Tourist Destination" — 71 items, absolute-difficulty calibrated.
// Answer = country (not destination name) — engine nameField is "country", matching the
// established Country-by-Food (E08) / Capital Cities (E10) pattern. Deliberately distinct
// from E09 "World Landmarks" (built monuments) and E10 "Capital Cities" (capital cityscapes):
// this episode focuses on natural wonders, beaches, resort towns, and iconic streets/markets
// that tourists specifically travel to for leisure — zero exact-landmark overlap with E09
// (verified against the full E09 list during research).
// No Israel/Jerusalem/West Bank/Gaza; no disputed-territory ambiguity (Faroe Islands and
// French Polynesia are non-sovereign but undisputed territories, used as their own answer
// since that's what a viewer would actually say, not "Denmark"/"France").
// No country repeats within any single tier (MC distractors are drawn from the same tier) —
// verified programmatically. Same country CAN recur across different tiers via genuinely
// distinct destinations (e.g. France: French Riviera-easy vs Champs-Élysées-medium).
export const TOURIST_SPOTS_E13 = [
  // EASY (18)
  { slug: "maldives-overwater-villas", name: "The Maldives", country: "Maldives", level: "easy" },
  { slug: "santorini-oia", name: "Santorini", country: "Greece", level: "easy" },
  { slug: "bora-bora-lagoon", name: "Bora Bora", country: "French Polynesia", level: "easy" },
  { slug: "bali-rice-terraces", name: "Bali", country: "Indonesia", level: "easy" },
  { slug: "grand-canyon", name: "Grand Canyon", country: "United States", level: "easy" },
  { slug: "great-barrier-reef", name: "Great Barrier Reef", country: "Australia", level: "easy" },
  { slug: "copacabana-beach-rio", name: "Copacabana Beach", country: "Brazil", level: "easy" },
  { slug: "venice-canals", name: "Venice", country: "Italy", level: "easy" },
  { slug: "swiss-alps-matterhorn", name: "Swiss Alps", country: "Switzerland", level: "easy" },
  { slug: "palm-jumeirah-dubai", name: "Palm Jumeirah", country: "United Arab Emirates", level: "easy" },
  { slug: "cancun-riviera-maya", name: "Cancún", country: "Mexico", level: "easy" },
  { slug: "phi-phi-islands-thailand", name: "Phi Phi Islands", country: "Thailand", level: "easy" },
  { slug: "iguazu-falls-argentina", name: "Iguazu Falls", country: "Argentina", level: "easy" },
  { slug: "cappadocia-balloons", name: "Cappadocia", country: "Turkey", level: "easy" },
  { slug: "french-riviera-cote-dazur", name: "French Riviera", country: "France", level: "easy" },
  { slug: "blue-lagoon-iceland", name: "Blue Lagoon", country: "Iceland", level: "easy" },
  { slug: "serengeti-tanzania", name: "Serengeti", country: "Tanzania", level: "easy" },
  { slug: "ibiza-island", name: "Ibiza", country: "Spain", level: "easy" },
  // MEDIUM (18)
  { slug: "amalfi-coast-italy", name: "Amalfi Coast", country: "Italy", level: "medium" },
  { slug: "boracay-island", name: "Boracay", country: "Philippines", level: "medium" },
  { slug: "seychelles-anse-source-dargent", name: "Anse Source d'Argent", country: "Seychelles", level: "medium" },
  { slug: "fiji-islands", name: "Fiji", country: "Fiji", level: "medium" },
  { slug: "great-ocean-road-twelve-apostles", name: "Twelve Apostles", country: "Australia", level: "medium" },
  { slug: "yellowstone-national-park", name: "Yellowstone National Park", country: "United States", level: "medium" },
  { slug: "banff-lake-louise", name: "Lake Louise", country: "Canada", level: "medium" },
  { slug: "plitvice-lakes-croatia", name: "Plitvice Lakes", country: "Croatia", level: "medium" },
  { slug: "milford-sound-nz", name: "Milford Sound", country: "New Zealand", level: "medium" },
  { slug: "jeju-island-korea", name: "Jeju Island", country: "South Korea", level: "medium" },
  { slug: "zanzibar-beaches", name: "Zanzibar", country: "Tanzania", level: "medium" },
  { slug: "geirangerfjord-norway", name: "Geirangerfjord", country: "Norway", level: "medium" },
  { slug: "sahara-desert-merzouga-morocco", name: "Sahara Desert", country: "Morocco", level: "medium" },
  { slug: "champs-elysees-paris", name: "Champs-Élysées", country: "France", level: "medium" },
  { slug: "shibuya-crossing-tokyo", name: "Shibuya Crossing", country: "Japan", level: "medium" },
  { slug: "grand-bazaar-istanbul", name: "Grand Bazaar", country: "Turkey", level: "medium" },
  { slug: "monte-carlo-monaco", name: "Monte Carlo", country: "Monaco", level: "medium" },
  { slug: "kerala-backwaters-india", name: "Kerala Backwaters", country: "India", level: "medium" },
  // HARD (18)
  { slug: "torres-del-paine-chile", name: "Torres del Paine", country: "Chile", level: "hard" },
  { slug: "jiuzhaigou-valley-china", name: "Jiuzhaigou Valley", country: "China", level: "hard" },
  { slug: "lake-baikal-russia", name: "Lake Baikal", country: "Russia", level: "hard" },
  { slug: "sossusvlei-namibia", name: "Sossusvlei", country: "Namibia", level: "hard" },
  { slug: "ninh-binh-trang-an-vietnam", name: "Trang An", country: "Vietnam", level: "hard" },
  { slug: "komodo-island-indonesia", name: "Komodo Island", country: "Indonesia", level: "hard" },
  { slug: "whistler-canada", name: "Whistler", country: "Canada", level: "hard" },
  { slug: "queenstown-new-zealand", name: "Queenstown", country: "New Zealand", level: "hard" },
  { slug: "faroe-islands", name: "Faroe Islands", country: "Faroe Islands", level: "hard" },
  { slug: "camden-market-london", name: "Camden Market", country: "United Kingdom", level: "hard" },
  { slug: "costa-del-sol-spain", name: "Costa del Sol", country: "Spain", level: "hard" },
  { slug: "chatuchak-market-bangkok", name: "Chatuchak Market", country: "Thailand", level: "hard" },
  { slug: "fernando-de-noronha-brazil", name: "Fernando de Noronha", country: "Brazil", level: "hard" },
  { slug: "aspen-colorado", name: "Aspen", country: "United States", level: "hard" },
  { slug: "marrakech-medina-jemaa-el-fnaa", name: "Jemaa el-Fnaa", country: "Morocco", level: "hard" },
  { slug: "wadi-rum-jordan", name: "Wadi Rum", country: "Jordan", level: "hard" },
  { slug: "huacachina-oasis-peru", name: "Huacachina", country: "Peru", level: "hard" },
  { slug: "blyde-river-canyon-south-africa", name: "Blyde River Canyon", country: "South Africa", level: "hard" },
  // IMPOSSIBLE (17)
  { slug: "danakil-depression-ethiopia", name: "Danakil Depression", country: "Ethiopia", level: "impossible" },
  { slug: "lencois-maranhenses-brazil", name: "Lençóis Maranhenses", country: "Brazil", level: "impossible" },
  { slug: "lake-hillier-australia", name: "Lake Hillier", country: "Australia", level: "impossible" },
  { slug: "avenue-of-baobabs-madagascar", name: "Avenue of the Baobabs", country: "Madagascar", level: "impossible" },
  { slug: "raja-ampat-indonesia", name: "Raja Ampat", country: "Indonesia", level: "impossible" },
  { slug: "guatape-el-penol-colombia", name: "Guatapé", country: "Colombia", level: "impossible" },
  { slug: "fjadrargljufur-canyon-iceland", name: "Fjaðrárgljúfur Canyon", country: "Iceland", level: "impossible" },
  { slug: "harbour-island-pink-sand-bahamas", name: "Harbour Island", country: "Bahamas", level: "impossible" },
  { slug: "blue-eye-spring-albania", name: "Blue Eye Spring", country: "Albania", level: "impossible" },
  { slug: "tunnel-of-love-ukraine", name: "Tunnel of Love", country: "Ukraine", level: "impossible" },
  { slug: "lake-bled-slovenia", name: "Lake Bled", country: "Slovenia", level: "impossible" },
  { slug: "wahiba-sands-oman", name: "Wahiba Sands", country: "Oman", level: "impossible" },
  { slug: "great-blue-hole-belize", name: "Great Blue Hole", country: "Belize", level: "impossible" },
  { slug: "banaue-rice-terraces-philippines", name: "Banaue Rice Terraces", country: "Philippines", level: "impossible" },
  { slug: "lake-natron-tanzania", name: "Lake Natron", country: "Tanzania", level: "impossible" },
  { slug: "yungas-road-bolivia", name: "Yungas Road", country: "Bolivia", level: "impossible" },
  { slug: "lake-retba-senegal", name: "Lake Retba", country: "Senegal", level: "impossible" },
];
export default TOURIST_SPOTS_E13;
