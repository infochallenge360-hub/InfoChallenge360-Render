// Episode 12 "Guess the Movie Character" — 71 items, absolute-difficulty calibrated.
// ANIMATED CHARACTERS ONLY (no live-action) — a live-action character's image is a real
// photo of the actor who played them, which violates this channel's hard "no copyrighted
// face photos" rule. Animated character art is original drawn/CG design, not a real
// person's likeness — same risk tier already accepted for the video-game-character
// episode (E11), which used official character art under nominative/fair-use for
// identification. Content screen: no Israel/Jerusalem content; Waltz with Bashir excluded
// (confirmed Israeli studio, Bridgit Folman Film Gang). Persepolis, Akira, Ghost in the
// Shell (1995), Grave of the Fireflies excluded for mature-content risk on a general-
// audience thumbnail. Franchise-mate pairs (Shrek x4, Frozen x3, Ice Age/Cars/HTTYD/
// Zootopia/Incredibles x2 each) are each justified by genuinely different recognizability,
// same precedent as Toy Story's Woody+Buzz.
export const MOVIE_CHARACTERS_E12 = [
  // EASY (18)
  { slug: "mickey-mouse", name: "Mickey Mouse", movie: "Steamboat Willie", level: "easy" },
  { slug: "elsa-frozen", name: "Elsa", movie: "Frozen", level: "easy" },
  { slug: "shrek", name: "Shrek", movie: "Shrek", level: "easy" },
  { slug: "minions", name: "Minions", movie: "Despicable Me", level: "easy" },
  { slug: "woody-toy-story", name: "Woody", movie: "Toy Story", level: "easy" },
  { slug: "buzz-lightyear", name: "Buzz Lightyear", movie: "Toy Story", level: "easy" },
  { slug: "simba", name: "Simba", movie: "The Lion King", level: "easy" },
  { slug: "ariel-little-mermaid", name: "Ariel", movie: "The Little Mermaid", level: "easy" },
  { slug: "dory", name: "Dory", movie: "Finding Nemo", level: "easy" },
  { slug: "genie-aladdin", name: "Genie", movie: "Aladdin", level: "easy" },
  { slug: "stitch", name: "Stitch", movie: "Lilo & Stitch", level: "easy" },
  { slug: "snow-white", name: "Snow White", movie: "Snow White and the Seven Dwarfs", level: "easy" },
  { slug: "nemo", name: "Nemo", movie: "Finding Nemo", level: "easy" },
  { slug: "gru", name: "Gru", movie: "Despicable Me", level: "easy" },
  { slug: "winnie-the-pooh", name: "Winnie the Pooh", movie: "The Many Adventures of Winnie the Pooh", level: "easy" },
  { slug: "olaf", name: "Olaf", movie: "Frozen", level: "easy" },
  { slug: "mike-wazowski", name: "Mike Wazowski", movie: "Monsters, Inc.", level: "easy" },
  { slug: "sulley", name: "Sulley", movie: "Monsters, Inc.", level: "easy" },
  // MEDIUM (18)
  { slug: "anna-frozen", name: "Anna", movie: "Frozen", level: "medium" },
  { slug: "belle", name: "Belle", movie: "Beauty and the Beast", level: "medium" },
  { slug: "donkey-shrek", name: "Donkey", movie: "Shrek", level: "medium" },
  { slug: "lightning-mcqueen", name: "Lightning McQueen", movie: "Cars", level: "medium" },
  { slug: "wall-e", name: "WALL-E", movie: "WALL-E", level: "medium" },
  { slug: "toothless", name: "Toothless", movie: "How to Train Your Dragon", level: "medium" },
  { slug: "po-kung-fu-panda", name: "Po", movie: "Kung Fu Panda", level: "medium" },
  { slug: "judy-hopps", name: "Judy Hopps", movie: "Zootopia", level: "medium" },
  { slug: "baymax", name: "Baymax", movie: "Big Hero 6", level: "medium" },
  { slug: "totoro", name: "Totoro", movie: "My Neighbor Totoro", level: "medium" },
  { slug: "mater", name: "Mater", movie: "Cars", level: "medium" },
  { slug: "puss-in-boots", name: "Puss in Boots", movie: "Shrek 2", level: "medium" },
  { slug: "fiona-shrek", name: "Fiona", movie: "Shrek", level: "medium" },
  { slug: "remy-ratatouille", name: "Remy", movie: "Ratatouille", level: "medium" },
  { slug: "hiccup", name: "Hiccup", movie: "How to Train Your Dragon", level: "medium" },
  { slug: "carl-fredricksen", name: "Carl Fredricksen", movie: "Up", level: "medium" },
  { slug: "rapunzel-tangled", name: "Rapunzel", movie: "Tangled", level: "medium" },
  { slug: "moana", name: "Moana", movie: "Moana", level: "medium" },
  // HARD (18)
  { slug: "mr-incredible", name: "Mr. Incredible", movie: "The Incredibles", level: "hard" },
  { slug: "joy-inside-out", name: "Joy", movie: "Inside Out", level: "hard" },
  { slug: "mulan-character", name: "Mulan", movie: "Mulan", level: "hard" },
  { slug: "scar-lion-king", name: "Scar", movie: "The Lion King", level: "hard" },
  { slug: "ursula", name: "Ursula", movie: "The Little Mermaid", level: "hard" },
  { slug: "maleficent-animated", name: "Maleficent", movie: "Sleeping Beauty", level: "hard" },
  { slug: "merida", name: "Merida", movie: "Brave", level: "hard" },
  { slug: "scrat", name: "Scrat", movie: "Ice Age", level: "hard" },
  { slug: "sid-sloth", name: "Sid", movie: "Ice Age", level: "hard" },
  { slug: "anastasia-1997", name: "Anastasia", movie: "Anastasia", level: "hard" },
  { slug: "jafar", name: "Jafar", movie: "Aladdin", level: "hard" },
  { slug: "miles-morales-animated", name: "Miles Morales", movie: "Spider-Man: Into the Spider-Verse", level: "hard" },
  { slug: "nick-wilde", name: "Nick Wilde", movie: "Zootopia", level: "hard" },
  { slug: "alex-the-lion", name: "Alex the Lion", movie: "Madagascar", level: "hard" },
  { slug: "grinch-animated", name: "The Grinch", movie: "How the Grinch Stole Christmas!", level: "hard" },
  { slug: "edna-mode", name: "Edna Mode", movie: "The Incredibles", level: "hard" },
  { slug: "coraline-jones", name: "Coraline Jones", movie: "Coraline", level: "hard" },
  { slug: "gromit", name: "Gromit", movie: "A Grand Day Out", level: "hard" },
  // IMPOSSIBLE (17)
  { slug: "milo-thatch", name: "Milo Thatch", movie: "Atlantis: The Lost Empire", level: "impossible" },
  { slug: "iron-giant", name: "The Iron Giant", movie: "The Iron Giant", level: "impossible" },
  { slug: "balto", name: "Balto", movie: "Balto", level: "impossible" },
  { slug: "littlefoot", name: "Littlefoot", movie: "The Land Before Time", level: "impossible" },
  { slug: "kubo", name: "Kubo", movie: "Kubo and the Two Strings", level: "impossible" },
  { slug: "robyn-goodfellowe", name: "Robyn Goodfellowe", movie: "Wolfwalkers", level: "impossible" },
  { slug: "saoirse-song-of-the-sea", name: "Saoirse", movie: "Song of the Sea", level: "impossible" },
  { slug: "brendan-secret-of-kells", name: "Brendan", movie: "The Secret of Kells", level: "impossible" },
  { slug: "max-mary-and-max", name: "Max", movie: "Mary and Max", level: "impossible" },
  { slug: "klaus-2019", name: "Klaus", movie: "Klaus", level: "impossible" },
  { slug: "cale-tucker", name: "Cale Tucker", movie: "Titan A.E.", level: "impossible" },
  { slug: "kayley-quest-for-camelot", name: "Kayley", movie: "Quest for Camelot", level: "impossible" },
  { slug: "fievel-mousekewitz", name: "Fievel Mousekewitz", movie: "An American Tail", level: "impossible" },
  { slug: "sinbad-legend-seven-seas", name: "Sinbad", movie: "Sinbad: Legend of the Seven Seas", level: "impossible" },
  { slug: "chanticleer-rock-a-doodle", name: "Chanticleer", movie: "Rock-A-Doodle", level: "impossible" },
  { slug: "odette-swan-princess", name: "Odette", movie: "The Swan Princess", level: "impossible" },
  { slug: "oliver", name: "Oliver", movie: "Oliver & Company", level: "impossible" },
];
export default MOVIE_CHARACTERS_E12;
