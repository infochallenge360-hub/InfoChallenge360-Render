// E45 "Guess the Butterfly" — real photos, adult wings-open form preferred.
// Sourcing note (image step): iNat-first (photo_license=cc0,cc-by) then Wikipedia-lead fallback;
// Wikipedia-FIRST for rare/endangered/CITES species with thin iNat coverage.
// Xerces Blue is EXTINCT (1940s) — deliberate exception: use pinned museum specimen photo
// with an on-screen "extinct — museum specimen shown" disclosure.
// Queen Alexandra's Birdwing, Luzon Peacock Swallowtail, and Homerus Swallowtail: exhaustively
// searched Wikipedia/Commons/iNaturalist — no freely-licensed LIVE photo exists for any of the
// three (all are critically rare/protected with essentially zero free-license field photography).
// Deliberate exception, same class as Xerces Blue: pinned museum specimen photo used instead.
export const BUTTERFLIES_E45 = [
  // EASY (18)
  { slug: "monarch-butterfly", name: "Monarch Butterfly", sci: "Danaus plexippus", level: "easy" },
  { slug: "blue-morpho", name: "Blue Morpho", sci: "Morpho peleides", level: "easy" },
  { slug: "painted-lady", name: "Painted Lady", sci: "Vanessa cardui", level: "easy" },
  { slug: "swallowtail-butterfly", name: "Swallowtail Butterfly", sci: "Papilio machaon", level: "easy" },
  { slug: "eastern-tiger-swallowtail", name: "Eastern Tiger Swallowtail", sci: "Papilio glaucus", level: "easy" },
  { slug: "cabbage-white", name: "Cabbage White", sci: "Pieris rapae", level: "easy" },
  { slug: "peacock-butterfly", name: "Peacock Butterfly", sci: "Aglais io", level: "easy" },
  { slug: "red-admiral", name: "Red Admiral", sci: "Vanessa atalanta", level: "easy" },
  { slug: "common-buckeye", name: "Common Buckeye", sci: "Junonia coenia", level: "easy" },
  { slug: "small-tortoiseshell", name: "Small Tortoiseshell", sci: "Aglais urticae", level: "easy" },
  { slug: "zebra-longwing", name: "Zebra Longwing", sci: "Heliconius charithonia", level: "easy" },
  { slug: "giant-swallowtail", name: "Giant Swallowtail", sci: "Papilio cresphontes", level: "easy" },
  { slug: "owl-butterfly", name: "Owl Butterfly", sci: "Caligo memnon", level: "easy" },
  { slug: "viceroy-butterfly", name: "Viceroy", sci: "Limenitis archippus", level: "easy" },
  { slug: "glasswing-butterfly", name: "Glasswing Butterfly", sci: "Greta oto", level: "easy" },
  { slug: "postman-butterfly", name: "Postman Butterfly", sci: "Heliconius melpomene", level: "easy" },
  { slug: "mourning-cloak", name: "Mourning Cloak", sci: "Nymphalis antiopa", level: "easy" },
  { slug: "cloudless-sulphur", name: "Cloudless Sulphur", sci: "Phoebis sennae", level: "easy" },

  // MEDIUM (18)
  { slug: "ulysses-butterfly", name: "Ulysses Butterfly", sci: "Papilio ulysses", level: "medium" },
  { slug: "julia-butterfly", name: "Julia Butterfly", sci: "Dryas iulia", level: "medium" },
  { slug: "gulf-fritillary", name: "Gulf Fritillary", sci: "Agraulis vanillae", level: "medium" },
  { slug: "malachite-butterfly", name: "Malachite Butterfly", sci: "Siproeta stelenes", level: "medium" },
  { slug: "comma-butterfly", name: "Comma Butterfly", sci: "Polygonia c-album", level: "medium" },
  { slug: "purple-emperor", name: "Purple Emperor", sci: "Apatura iris", level: "medium" },
  { slug: "apollo-butterfly", name: "Apollo Butterfly", sci: "Parnassius apollo", level: "medium" },
  { slug: "common-mormon", name: "Common Mormon", sci: "Papilio polytes", level: "medium" },
  { slug: "plain-tiger", name: "Plain Tiger (African Monarch)", sci: "Danaus chrysippus", level: "medium" },
  { slug: "paper-kite-butterfly", name: "Paper Kite Butterfly", sci: "Idea leuconoe", level: "medium" },
  { slug: "eighty-eight-butterfly", name: "88 Butterfly", sci: "Diaethria clymena", level: "medium" },
  { slug: "great-spangled-fritillary", name: "Great Spangled Fritillary", sci: "Speyeria cybele", level: "medium" },
  { slug: "question-mark-butterfly", name: "Question Mark", sci: "Polygonia interrogationis", level: "medium" },
  { slug: "white-admiral", name: "White Admiral", sci: "Limenitis camilla", level: "medium" },
  { slug: "adonis-blue", name: "Adonis Blue", sci: "Polyommatus bellargus", level: "medium" },
  { slug: "common-rose", name: "Common Rose", sci: "Pachliopta aristolochiae", level: "medium" },
  { slug: "kaiser-i-hind", name: "Kaiser-i-Hind", sci: "Teinopalpus imperialis", level: "medium" },
  { slug: "chalkhill-blue", name: "Chalkhill Blue", sci: "Polyommatus coridon", level: "medium" },

  // HARD (18)
  { slug: "queen-alexandras-birdwing", name: "Queen Alexandra's Birdwing", sci: "Ornithoptera alexandrae", level: "hard" },
  { slug: "homerus-swallowtail", name: "Homerus Swallowtail", sci: "Papilio homerus", level: "hard" },
  { slug: "large-blue-butterfly", name: "Large Blue", sci: "Phengaris arion", level: "hard" },
  { slug: "karner-blue", name: "Karner Blue", sci: "Plebejus melissa samuelis", level: "hard" },
  { slug: "duke-of-burgundy", name: "Duke of Burgundy", sci: "Hamearis lucina", level: "hard" },
  { slug: "marsh-fritillary", name: "Marsh Fritillary", sci: "Euphydryas aurinia", level: "hard" },
  { slug: "bhutan-glory", name: "Bhutan Glory", sci: "Bhutanitis lidderdalii", level: "hard" },
  { slug: "golden-birdwing", name: "Golden Birdwing", sci: "Troides aeacus", level: "hard" },
  { slug: "corsican-swallowtail", name: "Corsican Swallowtail", sci: "Papilio hospiton", level: "hard" },
  { slug: "regal-fritillary", name: "Regal Fritillary", sci: "Argynnis idalia", level: "hard" },
  { slug: "schaus-swallowtail", name: "Schaus' Swallowtail", sci: "Heraclides aristodemus ponceanus", level: "hard" },
  { slug: "bay-checkerspot", name: "Bay Checkerspot", sci: "Euphydryas editha bayensis", level: "hard" },
  { slug: "large-copper", name: "Large Copper", sci: "Lycaena dispar", level: "hard" },
  { slug: "cracker-butterfly", name: "Cracker Butterfly", sci: "Hamadryas feronia", level: "hard" },
  { slug: "silver-spotted-skipper", name: "Silver-Spotted Skipper", sci: "Epargyreus clarus", level: "hard" },
  { slug: "regent-skipper", name: "Regent Skipper", sci: "Euschemon rafflesia", level: "hard" },
  { slug: "luzon-peacock-swallowtail", name: "Luzon Peacock Swallowtail", sci: "Papilio chikae", level: "hard" },
  { slug: "mission-blue-butterfly", name: "Mission Blue", sci: "Icaricia icarioides missionensis", level: "hard" },

  // IMPOSSIBLE (17)
  { slug: "fenders-blue", name: "Fender's Blue", sci: "Icaricia icarioides fenderi", level: "impossible" },
  { slug: "palos-verdes-blue", name: "Palos Verdes Blue", sci: "Glaucopsyche lygdamus palosverdesensis", level: "impossible" },
  { slug: "el-segundo-blue", name: "El Segundo Blue", sci: "Euphilotes battoides allyni", level: "impossible" },
  { slug: "saint-francis-satyr", name: "Saint Francis' Satyr", sci: "Neonympha mitchellii francisci", level: "impossible" },
  { slug: "uncompahgre-fritillary", name: "Uncompahgre Fritillary", sci: "Boloria acrocnema", level: "impossible" },
  { slug: "poweshiek-skipperling", name: "Poweshiek Skipperling", sci: "Oarisma poweshiek", level: "impossible" },
  { slug: "langes-metalmark", name: "Lange's Metalmark", sci: "Apodemia mormo langei", level: "impossible" },
  { slug: "miami-blue", name: "Miami Blue", sci: "Cyclargus thomasi bethunebakeri", level: "impossible" },
  { slug: "table-mountain-beauty", name: "Table Mountain Beauty", sci: "Aeropetes tulbaghia", level: "impossible" },
  { slug: "san-bruno-elfin", name: "San Bruno Elfin", sci: "Callophrys mossii bayensis", level: "impossible" },
  { slug: "hermes-copper", name: "Hermes Copper", sci: "Lycaena hermes", level: "impossible" },
  { slug: "bartrams-scrub-hairstreak", name: "Bartram's Scrub-Hairstreak", sci: "Strymon acis bartrami", level: "impossible" },
  { slug: "mitchells-satyr", name: "Mitchell's Satyr", sci: "Neonympha mitchellii mitchellii", level: "impossible" },
  { slug: "crystal-skipper", name: "Crystal Skipper", sci: "Atrytonopsis quinteri", level: "impossible" },
  { slug: "behrens-silverspot", name: "Behren's Silverspot", sci: "Speyeria zerene behrensii", level: "impossible" },
  { slug: "oregon-silverspot", name: "Oregon Silverspot", sci: "Speyeria zerene hippolyta", level: "impossible" },
  { slug: "xerces-blue", name: "Xerces Blue", sci: "Glaucopsyche xerces", level: "impossible" },
];
