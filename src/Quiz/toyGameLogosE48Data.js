// E48 "Guess the Toy/Board Game Brand Logo" — answer = brand name, image = official logo mark.
// Calibrated by global recognizability (quiz-difficulty-calibration): judge the MARK as shown, not
// overall brand fame — Hasbro/Mattel are huge companies but their corporate wordmarks are much less
// recognized than their own product logos (Monopoly, Barbie), hence corporate marks sit in hard/impossible.
// Sourcing note: Simple Icons has ~no coverage of this niche (checked ~25 slugs, all 404 except
// Konami/Sega which aren't used here) — Wikimedia Commons logo files are the PRIMARY source, not a
// backup, for this episode. A handful of modern hobby-game titles have no dedicated logo file and
// need box-art/cover-image sourcing instead (flagged below). No Israeli-origin brand included
// (Rummikub and Taki were deliberately excluded as genuinely Israeli-invented games).
export const TOY_GAME_LOGOS_E48 = [
  // EASY (18)
  { slug: "lego", name: "LEGO", level: "easy" },
  { slug: "barbie", name: "Barbie", level: "easy" },
  { slug: "monopoly", name: "Monopoly", level: "easy" },
  { slug: "hot-wheels", name: "Hot Wheels", level: "easy" },
  { slug: "play-doh", name: "Play-Doh", level: "easy" },
  { slug: "uno", name: "UNO", level: "easy" },
  { slug: "rubiks-cube", name: "Rubik's Cube", level: "easy" },
  { slug: "crayola", name: "Crayola", level: "easy" },
  { slug: "pokemon-tcg", name: "Pokémon Trading Card Game", level: "easy" },
  { slug: "jenga", name: "Jenga", level: "easy" },
  { slug: "scrabble", name: "Scrabble", level: "easy" },
  { slug: "transformers", name: "Transformers", level: "easy" },
  { slug: "my-little-pony", name: "My Little Pony", level: "easy" },
  { slug: "nerf", name: "Nerf", level: "easy" },
  { slug: "risk", name: "Risk", level: "easy" },
  { slug: "cluedo", name: "Cluedo", level: "easy" },
  { slug: "trivial-pursuit", name: "Trivial Pursuit", level: "easy" },
  { slug: "twister", name: "Twister", level: "easy" },

  // MEDIUM (18)
  { slug: "fisher-price", name: "Fisher-Price", level: "medium" },
  { slug: "connect-four", name: "Connect Four", level: "medium" },
  { slug: "battleship", name: "Battleship", level: "medium" },
  { slug: "the-game-of-life", name: "The Game of Life", level: "medium" },
  { slug: "hungry-hungry-hippos", name: "Hungry Hungry Hippos", level: "medium" },
  { slug: "operation", name: "Operation", level: "medium" },
  { slug: "dungeons-and-dragons", name: "Dungeons & Dragons", level: "medium" },
  { slug: "matchbox", name: "Matchbox", level: "medium" },
  { slug: "bicycle", name: "Bicycle Playing Cards", level: "medium" },
  { slug: "care-bears", name: "Care Bears", level: "medium" },
  { slug: "gi-joe", name: "G.I. Joe", level: "medium" },
  { slug: "thomas-and-friends", name: "Thomas & Friends", level: "medium" },
  { slug: "bratz", name: "Bratz", level: "medium" },
  { slug: "lol-surprise", name: "L.O.L. Surprise!", level: "medium" },
  { slug: "paw-patrol", name: "PAW Patrol", level: "medium" },
  { slug: "funko", name: "Funko", level: "medium" },
  { slug: "playmobil", name: "Playmobil", level: "medium" },
  { slug: "yu-gi-oh", name: "Yu-Gi-Oh!", level: "medium" },

  // HARD (18)
  { slug: "hasbro", name: "Hasbro", level: "hard" },
  { slug: "mattel", name: "Mattel", level: "hard" },
  { slug: "magic-the-gathering", name: "Magic: The Gathering", level: "hard" },
  { slug: "catan", name: "Catan", level: "hard" },
  { slug: "guess-who", name: "Guess Who?", level: "hard" },
  { slug: "sorry", name: "Sorry!", level: "hard" },
  { slug: "candy-land", name: "Candy Land", level: "hard" },
  { slug: "mouse-trap", name: "Mouse Trap", level: "hard" },
  { slug: "simon", name: "Simon", level: "hard" },
  { slug: "boggle", name: "Boggle", level: "hard" },
  { slug: "taboo", name: "Taboo", level: "hard" },
  { slug: "ravensburger", name: "Ravensburger", level: "hard" },
  { slug: "little-tikes", name: "Little Tikes", level: "hard" },
  { slug: "ty-beanie-babies", name: "Ty (Beanie Babies)", level: "hard" },
  { slug: "leapfrog", name: "LeapFrog", level: "hard" },
  { slug: "radio-flyer", name: "Radio Flyer", level: "hard" },
  { slug: "tonka", name: "Tonka", level: "hard" },
  { slug: "etch-a-sketch", name: "Etch A Sketch", level: "hard" },

  // IMPOSSIBLE (17)
  { slug: "spin-master", name: "Spin Master", level: "impossible" },
  { slug: "mga-entertainment", name: "MGA Entertainment", level: "impossible" },
  { slug: "wizards-of-the-coast", name: "Wizards of the Coast", level: "impossible" },
  { slug: "warhammer", name: "Warhammer", level: "impossible" },
  { slug: "carcassonne", name: "Carcassonne", level: "impossible" }, // box-art fallback, no dedicated logo file found
  { slug: "ticket-to-ride", name: "Ticket to Ride", level: "impossible" }, // box-art fallback
  { slug: "pandemic", name: "Pandemic", level: "impossible" }, // box-art fallback
  { slug: "codenames", name: "Codenames", level: "impossible" }, // box-art fallback
  { slug: "dixit", name: "Dixit", level: "impossible" },
  { slug: "bananagrams", name: "Bananagrams", level: "impossible" },
  { slug: "exploding-kittens", name: "Exploding Kittens", level: "impossible" }, // box-art fallback
  { slug: "schleich", name: "Schleich", level: "impossible" },
  { slug: "meccano", name: "Meccano", level: "impossible" },
  { slug: "lincoln-logs", name: "Lincoln Logs", level: "impossible" },
  { slug: "waddingtons", name: "Waddingtons", level: "impossible" },
  { slug: "weebles", name: "Weebles", level: "impossible" },
  { slug: "corgi-toys", name: "Corgi Toys", level: "impossible" },
];
