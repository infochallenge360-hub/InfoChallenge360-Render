// E56 "Guess the Cat Breed" — 72 items, 18/tier, absolute global recognizability.
// easy = instantly-recognizable "internet famous" breeds (Persian, Sphynx, Scottish Fold...)
// impossible = genuinely obscure breeds only serious cat-fanciers would know.
// fit=cover, dir="catbreeds", ext="jpg", coldSlug="german-rex" (rare, near-zero public recognition).
// NOTE: Tennessee Rex, Owyhee Bobtail, Skookum, York Chocolate, and Aegean were all cut — each
// is so new/rare (or, for York Chocolate/Aegean, has a coat pattern too ambiguous in every
// sourced photo to confirm the breed-defining trait) that no correct licensed photo exists
// anywhere on Wikimedia Commons/Openverse. British Semi-longhair was also cut — it and
// British Longhair are the same breed under two different registry names (WCF vs TICA), not
// two distinct breeds, so quizzing both would repeat the same answer. Final list is 66 items
// (18/18/16/14) instead of 72.

export const CAT_BREEDS_E56 = [
  // EASY (18)
  { slug: "persian", name: "Persian", level: "easy" },
  { slug: "siamese", name: "Siamese", level: "easy" },
  { slug: "maine-coon", name: "Maine Coon", level: "easy" },
  { slug: "sphynx", name: "Sphynx", level: "easy" },
  { slug: "british-shorthair", name: "British Shorthair", level: "easy" },
  { slug: "scottish-fold", name: "Scottish Fold", level: "easy" },
  { slug: "ragdoll", name: "Ragdoll", level: "easy" },
  { slug: "bengal", name: "Bengal", level: "easy" },
  { slug: "munchkin", name: "Munchkin", level: "easy" },
  { slug: "russian-blue", name: "Russian Blue", level: "easy" },
  { slug: "abyssinian", name: "Abyssinian", level: "easy" },
  { slug: "himalayan", name: "Himalayan", level: "easy" },
  { slug: "norwegian-forest-cat", name: "Norwegian Forest Cat", level: "easy" },
  { slug: "turkish-van", name: "Turkish Van", level: "easy" },
  { slug: "manx", name: "Manx", level: "easy" },
  { slug: "american-shorthair", name: "American Shorthair", level: "easy" },
  { slug: "devon-rex", name: "Devon Rex", level: "easy" },
  { slug: "cornish-rex", name: "Cornish Rex", level: "easy" },

  // MEDIUM (18)
  { slug: "burmese", name: "Burmese", level: "medium" },
  { slug: "tonkinese", name: "Tonkinese", level: "medium" },
  { slug: "egyptian-mau", name: "Egyptian Mau", level: "medium" },
  { slug: "birman", name: "Birman", level: "medium" },
  { slug: "ocicat", name: "Ocicat", level: "medium" },
  { slug: "somali", name: "Somali", level: "medium" },
  { slug: "balinese", name: "Balinese", level: "medium" },
  { slug: "selkirk-rex", name: "Selkirk Rex", level: "medium" },
  { slug: "american-curl", name: "American Curl", level: "medium" },
  { slug: "exotic-shorthair", name: "Exotic Shorthair", level: "medium" },
  { slug: "british-longhair", name: "British Longhair", level: "medium" },
  { slug: "chartreux", name: "Chartreux", level: "medium" },
  { slug: "turkish-angora", name: "Turkish Angora", level: "medium" },
  { slug: "japanese-bobtail", name: "Japanese Bobtail", level: "medium" },
  { slug: "siberian", name: "Siberian", level: "medium" },
  { slug: "nebelung", name: "Nebelung", level: "medium" },
  { slug: "laperm", name: "LaPerm", level: "medium" },
  { slug: "singapura", name: "Singapura", level: "medium" },

  // HARD (16)
  { slug: "korat", name: "Korat", level: "hard" },
  { slug: "havana-brown", name: "Havana Brown", level: "hard" },
  { slug: "bombay", name: "Bombay", level: "hard" },
  { slug: "snowshoe", name: "Snowshoe", level: "hard" },
  { slug: "ragamuffin", name: "Ragamuffin", level: "hard" },
  { slug: "american-bobtail", name: "American Bobtail", level: "hard" },
  { slug: "pixie-bob", name: "Pixie-bob", level: "hard" },
  { slug: "chausie", name: "Chausie", level: "hard" },
  { slug: "colorpoint-shorthair", name: "Colorpoint Shorthair", level: "hard" },
  { slug: "oriental-shorthair", name: "Oriental Shorthair", level: "hard" },
  { slug: "cymric", name: "Cymric", level: "hard" },
  { slug: "american-wirehair", name: "American Wirehair", level: "hard" },
  { slug: "kurilian-bobtail", name: "Kurilian Bobtail", level: "hard" },
  { slug: "sokoke", name: "Sokoke", level: "hard" },
  { slug: "australian-mist", name: "Australian Mist", level: "hard" },
  { slug: "lykoi", name: "Lykoi", level: "hard" },

  // IMPOSSIBLE (14)
  { slug: "minskin", name: "Minskin", level: "impossible" },
  { slug: "toybob", name: "Toybob", level: "impossible" },
  { slug: "ukrainian-levkoy", name: "Ukrainian Levkoy", level: "impossible" },
  { slug: "peterbald", name: "Peterbald", level: "impossible" },
  { slug: "highlander-cat", name: "Highlander", level: "impossible" },
  { slug: "napoleon-minuet", name: "Napoleon (Minuet)", level: "impossible" },
  { slug: "serengeti-cat", name: "Serengeti", level: "impossible" },
  { slug: "chantilly-tiffany", name: "Chantilly-Tiffany", level: "impossible" },
  { slug: "foldex", name: "Foldex", level: "impossible" },
  { slug: "donskoy", name: "Donskoy", level: "impossible" },
  { slug: "khao-manee", name: "Khao Manee", level: "impossible" },
  { slug: "dragon-li", name: "Dragon Li", level: "impossible" },
  { slug: "arabian-mau", name: "Arabian Mau", level: "impossible" },
  { slug: "german-rex", name: "German Rex", level: "impossible" },
];

export default CAT_BREEDS_E56;
