// Guess the Sport by Equipment — 70 items, 18/18/16/18 across
// easy/medium/hard/impossible. The `slug` names the EQUIPMENT shown; the
// `name` field is the SPORT it belongs to (the graded answer) — several
// sports appear more than once via genuinely different equipment, which
// the engine's buildOptions() already dedupes correctly by displayed name
// (see the E91 permanent lesson).
//
// IMPORTANT (permanent lesson from E90's GATE2 fix): items MUST stay grouped
// contiguously by level in this array. The engine inserts a level-transition
// splash screen whenever array-adjacent items' levels differ, so a single
// item stranded out of its tier block creates a spurious extra splash.
export const SPORT_EQUIPMENT_E95 = [
  // EASY (18) — near-universal, ~70-95% global recognition
  { slug: "soccer-ball", name: "Soccer", level: "easy" },
  { slug: "basketball-hoop", name: "Basketball", level: "easy" },
  { slug: "tennis-racket", name: "Tennis", level: "easy" },
  { slug: "boxing-gloves", name: "Boxing", level: "easy" },
  { slug: "golf-club", name: "Golf", level: "easy" },
  { slug: "baseball-bat", name: "Baseball", level: "easy" },
  { slug: "american-football-ball", name: "American Football", level: "easy" },
  { slug: "volleyball", name: "Volleyball", level: "easy" },
  { slug: "swimming-goggles", name: "Swimming", level: "easy" },
  { slug: "table-tennis-paddle", name: "Table Tennis", level: "easy" },
  { slug: "dartboard", name: "Darts", level: "easy" },
  { slug: "skateboard", name: "Skateboarding", level: "easy" },
  { slug: "bowling-pin", name: "Bowling", level: "easy" },
  { slug: "gymnastics-balance-beam", name: "Gymnastics", level: "easy" },
  { slug: "skis-and-poles", name: "Skiing", level: "easy" },
  { slug: "surfboard", name: "Surfing", level: "easy" },
  { slug: "racing-bicycle", name: "Cycling", level: "easy" },
  { slug: "diving-springboard", name: "Diving", level: "easy" },

  // MEDIUM (18) — most have seen it, ~35-70%
  { slug: "shuttlecock", name: "Badminton", level: "medium" },
  { slug: "hockey-puck", name: "Ice Hockey", level: "medium" },
  { slug: "rugby-ball", name: "Rugby", level: "medium" },
  { slug: "archery-bow", name: "Archery", level: "medium" },
  { slug: "curling-stone", name: "Curling", level: "medium" },
  { slug: "javelin", name: "Javelin", level: "medium" },
  { slug: "snooker-cue", name: "Snooker", level: "medium" },
  { slug: "water-polo-cap", name: "Water Polo", level: "medium" },
  { slug: "snowboard", name: "Snowboarding", level: "medium" },
  { slug: "field-hockey-stick", name: "Field Hockey", level: "medium" },
  { slug: "sumo-mawashi", name: "Sumo Wrestling", level: "medium" },
  { slug: "rowing-oar", name: "Rowing", level: "medium" },
  { slug: "fencing-mask", name: "Fencing", level: "medium" },
  { slug: "karate-belt", name: "Karate", level: "medium" },
  { slug: "shot-put", name: "Shot Put", level: "medium" },
  { slug: "weightlifting-barbell", name: "Weightlifting", level: "medium" },
  { slug: "cricket-bat", name: "Cricket", level: "medium" },
  { slug: "figure-skate", name: "Figure Skating", level: "medium" },

  // HARD (16) — enthusiasts know it, ~10-35%
  { slug: "lacrosse-stick", name: "Lacrosse", level: "hard" },
  { slug: "fencing-foil", name: "Fencing", level: "hard" },
  { slug: "discus", name: "Discus", level: "hard" },
  { slug: "biathlon-rifle", name: "Biathlon", level: "hard" },
  { slug: "vaulting-pole", name: "Pole Vault", level: "hard" },
  { slug: "throwing-hammer", name: "Hammer Throw", level: "hard" },
  { slug: "luge-sled", name: "Luge", level: "hard" },
  { slug: "bobsled", name: "Bobsleigh", level: "hard" },
  { slug: "squash-racket", name: "Squash", level: "hard" },
  { slug: "water-skis", name: "Water Skiing", level: "hard" },
  { slug: "polo-mallet", name: "Polo", level: "hard" },
  { slug: "kendo-shinai", name: "Kendo", level: "hard" },
  { slug: "croquet-mallet", name: "Croquet", level: "hard" },
  { slug: "taekwondo-hogu", name: "Taekwondo", level: "hard" },
  { slug: "show-jumping-rail", name: "Show Jumping", level: "hard" },
  { slug: "handball", name: "Team Handball", level: "hard" },

  // IMPOSSIBLE (18) — almost nobody, aim <3%
  { slug: "hurling-hurley", name: "Hurling", level: "impossible" },
  { slug: "sepak-takraw-ball", name: "Sepak Takraw", level: "impossible" },
  { slug: "kabaddi-court-line", name: "Kabaddi", level: "impossible" },
  { slug: "real-tennis-racket", name: "Real Tennis", level: "impossible" },
  { slug: "pelota-vasca-cesta", name: "Jai Alai", level: "impossible" },
  { slug: "capoeira-berimbau", name: "Capoeira", level: "impossible" },
  { slug: "shinty-caman", name: "Shinty", level: "impossible" },
  { slug: "muay-thai-mongkol", name: "Muay Thai", level: "impossible" },
  { slug: "underwater-hockey-pusher", name: "Underwater Hockey", level: "impossible" },
  { slug: "jianzi-shuttlecock", name: "Jianzi", level: "impossible" },
  { slug: "kubb-blocks", name: "Kubb", level: "impossible" },
  { slug: "ringette-ring", name: "Ringette", level: "impossible" },
  { slug: "footbag", name: "Footbag", level: "impossible" },
  { slug: "sport-stacking-cups", name: "Sport Stacking", level: "impossible" },
  { slug: "skimboard", name: "Skimboarding", level: "impossible" },
  { slug: "hornussen-schindel", name: "Hornussen", level: "impossible" },
  { slug: "petanque-boules", name: "Petanque", level: "impossible" },
  { slug: "floorball-stick", name: "Floorball", level: "impossible" },
];
