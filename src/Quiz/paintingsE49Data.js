// E49 "Guess the Painting" — answer = painting title, image = the actual artwork.
// Calibrated by global recognizability (quiz-difficulty-calibration): easy ~70-95% down to
// impossible <10% (aiming <3% for the tail). Judged on the SPECIFIC painting shown, not just
// the artist's fame (e.g. Vermeer is a household name, but only Girl with a Pearl Earring is
// easy — his other ~30 surviving works are genuinely obscure to the general public, which is
// exactly why several fill the impossible tier here).
//
// ITEM COUNT: 72 (18 per tier) — inside the 65-78 target band, deliberately not the default 71.
//
// SOURCING STRATEGY: Met Museum Open Access (CC0, keyless) tried first for anything likely to
// be in a US museum collection (5 items landed there: Great Wave, Death of Socrates, The Oxbow,
// Washington Crossing the Delaware, The Third-Class Carriage). Art Institute of Chicago (CC0)
// was attempted for American Gothic and A Sunday on La Grande Jatte — both AIC lookups failed
// to return a usable file in practice, so those two fell back automatically to Wikipedia, which
// is where the remaining 67 images ultimately came from (Wikipedia `pageimages` lead thumbnail,
// 1200px, with two items resolved via direct Wikimedia Commons file search when the Wikipedia
// article's lead image was the wrong panel/version — see fetch report for details). No AI
// fallback was needed anywhere; paintings are the ideal free-image case.
//
// PD-CUTOFF RULE APPLIED: every artist below died well before the 1955 safe-cutoff (most died
// before 1930; the latest deaths in this list are Munch 1944, Klimt 1918, Kandinsky 1944,
// Mondrian 1944, and Grant Wood 1942 — all explicitly confirmed safe). No 20th-century artist
// whose death year is after ~1955 appears anywhere in this file (Picasso, Dali, Hopper, Matisse,
// Kahlo, Warhol, Rockwell, Wyeth, Duchamp, Chagall were all considered and excluded).
//
// Component note: paintings have wildly varied aspect ratios — use objectFit: "contain" (show
// the whole canvas on a card), never "cover", which would crop the subject.
//
// Last item (woman-holding-a-balance) is the deliberately obscure-but-real coldSlug for the
// cold-open: even a Vermeer painting can be nearly unrecognizable to a general audience.
export const PAINTINGS_E49 = [
  // EASY (18)
  { slug: "mona-lisa", name: "Mona Lisa", artist: "Leonardo da Vinci", level: "easy" },
  { slug: "the-starry-night", name: "The Starry Night", artist: "Vincent van Gogh", level: "easy" },
  { slug: "the-last-supper", name: "The Last Supper", artist: "Leonardo da Vinci", level: "easy" },
  { slug: "the-scream", name: "The Scream", artist: "Edvard Munch", level: "easy" },
  { slug: "girl-with-a-pearl-earring", name: "Girl with a Pearl Earring", artist: "Johannes Vermeer", level: "easy" },
  { slug: "the-birth-of-venus", name: "The Birth of Venus", artist: "Sandro Botticelli", level: "easy" },
  { slug: "american-gothic", name: "American Gothic", artist: "Grant Wood", level: "easy" },
  { slug: "sunflowers", name: "Sunflowers", artist: "Vincent van Gogh", level: "easy" },
  { slug: "the-great-wave-off-kanagawa", name: "The Great Wave off Kanagawa", artist: "Katsushika Hokusai", level: "easy" },
  { slug: "whistlers-mother", name: "Whistler's Mother", artist: "James Abbott McNeill Whistler", level: "easy" },
  { slug: "las-meninas", name: "Las Meninas", artist: "Diego Velazquez", level: "easy" },
  { slug: "liberty-leading-the-people", name: "Liberty Leading the People", artist: "Eugene Delacroix", level: "easy" },
  { slug: "the-creation-of-adam", name: "The Creation of Adam", artist: "Michelangelo", level: "easy" },
  { slug: "water-lilies", name: "Water Lilies", artist: "Claude Monet", level: "easy" },
  { slug: "the-kiss", name: "The Kiss", artist: "Gustav Klimt", level: "easy" },
  { slug: "impression-sunrise", name: "Impression, Sunrise", artist: "Claude Monet", level: "easy" },
  { slug: "a-sunday-on-la-grande-jatte", name: "A Sunday Afternoon on the Island of La Grande Jatte", artist: "Georges Seurat", level: "easy" },
  { slug: "the-night-watch", name: "The Night Watch", artist: "Rembrandt", level: "easy" },

  // MEDIUM (18)
  { slug: "the-garden-of-earthly-delights", name: "The Garden of Earthly Delights", artist: "Hieronymus Bosch", level: "medium" },
  { slug: "ophelia", name: "Ophelia", artist: "John Everett Millais", level: "medium" },
  { slug: "the-arnolfini-portrait", name: "The Arnolfini Portrait", artist: "Jan van Eyck", level: "medium" },
  { slug: "luncheon-of-the-boating-party", name: "Luncheon of the Boating Party", artist: "Pierre-Auguste Renoir", level: "medium" },
  { slug: "the-third-of-may-1808", name: "The Third of May 1808", artist: "Francisco Goya", level: "medium" },
  { slug: "saturn-devouring-his-son", name: "Saturn Devouring His Son", artist: "Francisco Goya", level: "medium" },
  { slug: "the-hay-wain", name: "The Hay Wain", artist: "John Constable", level: "medium" },
  { slug: "wanderer-above-the-sea-of-fog", name: "Wanderer above the Sea of Fog", artist: "Caspar David Friedrich", level: "medium" },
  { slug: "the-death-of-marat", name: "The Death of Marat", artist: "Jacques-Louis David", level: "medium" },
  { slug: "napoleon-crossing-the-alps", name: "Napoleon Crossing the Alps", artist: "Jacques-Louis David", level: "medium" },
  { slug: "the-blue-boy", name: "The Blue Boy", artist: "Thomas Gainsborough", level: "medium" },
  { slug: "lady-with-an-ermine", name: "Lady with an Ermine", artist: "Leonardo da Vinci", level: "medium" },
  { slug: "hunters-in-the-snow", name: "Hunters in the Snow", artist: "Pieter Bruegel the Elder", level: "medium" },
  { slug: "a-bar-at-the-folies-bergere", name: "A Bar at the Folies-Bergere", artist: "Edouard Manet", level: "medium" },
  { slug: "olympia", name: "Olympia", artist: "Edouard Manet", level: "medium" },
  { slug: "the-sleeping-gypsy", name: "The Sleeping Gypsy", artist: "Henri Rousseau", level: "medium" },
  { slug: "where-do-we-come-from", name: "Where Do We Come From? What Are We? Where Are We Going?", artist: "Paul Gauguin", level: "medium" },
  { slug: "cafe-terrace-at-night", name: "Cafe Terrace at Night", artist: "Vincent van Gogh", level: "medium" },

  // HARD (18)
  { slug: "the-school-of-athens", name: "The School of Athens", artist: "Raphael", level: "hard" },
  { slug: "judith-slaying-holofernes", name: "Judith Slaying Holofernes", artist: "Artemisia Gentileschi", level: "hard" },
  { slug: "the-tower-of-babel", name: "The Tower of Babel", artist: "Pieter Bruegel the Elder", level: "hard" },
  { slug: "the-anatomy-lesson-of-dr-tulp", name: "The Anatomy Lesson of Dr. Nicolaes Tulp", artist: "Rembrandt", level: "hard" },
  { slug: "venus-of-urbino", name: "Venus of Urbino", artist: "Titian", level: "hard" },
  { slug: "the-ambassadors", name: "The Ambassadors", artist: "Hans Holbein the Younger", level: "hard" },
  { slug: "massacre-of-the-innocents", name: "Massacre of the Innocents", artist: "Peter Paul Rubens", level: "hard" },
  { slug: "the-death-of-socrates", name: "The Death of Socrates", artist: "Jacques-Louis David", level: "hard" },
  { slug: "the-raft-of-the-medusa", name: "The Raft of the Medusa", artist: "Theodore Gericault", level: "hard" },
  { slug: "the-oxbow", name: "The Oxbow", artist: "Thomas Cole", level: "hard" },
  { slug: "washington-crossing-the-delaware", name: "Washington Crossing the Delaware", artist: "Emanuel Leutze", level: "hard" },
  { slug: "portrait-of-dr-gachet", name: "Portrait of Dr. Gachet", artist: "Vincent van Gogh", level: "hard" },
  { slug: "the-third-class-carriage", name: "The Third-Class Carriage", artist: "Honore Daumier", level: "hard" }, // Wikipedia note: matching Met object confirmed correct title/artist
  { slug: "broadway-boogie-woogie", name: "Broadway Boogie Woogie", artist: "Piet Mondrian", level: "hard" },
  { slug: "composition-vii", name: "Composition VII", artist: "Wassily Kandinsky", level: "hard" },
  { slug: "the-isle-of-the-dead", name: "Isle of the Dead", artist: "Arnold Bocklin", level: "hard" },
  { slug: "the-jewish-bride", name: "The Jewish Bride", artist: "Rembrandt", level: "hard" },
  { slug: "bacchus-and-ariadne", name: "Bacchus and Ariadne", artist: "Titian", level: "hard" },

  // IMPOSSIBLE (18)
  { slug: "the-death-of-general-wolfe", name: "The Death of General Wolfe", artist: "Benjamin West", level: "impossible" },
  { slug: "watson-and-the-shark", name: "Watson and the Shark", artist: "John Singleton Copley", level: "impossible" },
  { slug: "a-philosopher-lecturing-on-the-orrery", name: "A Philosopher Lecturing on the Orrery", artist: "Joseph Wright of Derby", level: "impossible" },
  { slug: "an-experiment-on-a-bird-in-the-air-pump", name: "An Experiment on a Bird in the Air Pump", artist: "Joseph Wright of Derby", level: "impossible" },
  { slug: "marriage-a-la-mode-the-settlement", name: "Marriage A-la-Mode: The Marriage Settlement", artist: "William Hogarth", level: "impossible" },
  { slug: "the-tribute-money", name: "The Tribute Money", artist: "Masaccio", level: "impossible" },
  { slug: "the-effects-of-good-government-in-the-city", name: "The Effects of Good Government in the City", artist: "Ambrogio Lorenzetti", level: "impossible" },
  { slug: "the-money-changer-and-his-wife", name: "The Money Changer and His Wife", artist: "Quentin Matsys", level: "impossible" },
  { slug: "the-straw-manikin", name: "The Straw Manikin", artist: "Francisco Goya", level: "impossible" },
  { slug: "boy-bitten-by-a-lizard", name: "Boy Bitten by a Lizard", artist: "Caravaggio", level: "impossible" },
  { slug: "a-woman-bathing-in-a-stream", name: "A Woman Bathing in a Stream", artist: "Rembrandt", level: "impossible" },
  { slug: "portrait-of-a-man-in-a-turban", name: "Portrait of a Man in a Red Turban", artist: "Jan van Eyck", level: "impossible" },
  { slug: "the-blue-rigi", name: "The Blue Rigi", artist: "J. M. W. Turner", level: "impossible" },
  { slug: "the-death-of-actaeon", name: "The Death of Actaeon", artist: "Titian", level: "impossible" },
  { slug: "mrs-siddons-as-the-tragic-muse", name: "Mrs. Siddons as the Tragic Muse", artist: "Joshua Reynolds", level: "impossible" },
  { slug: "the-geographer", name: "The Geographer", artist: "Johannes Vermeer", level: "impossible" },
  { slug: "officer-and-laughing-girl", name: "Officer and a Laughing Girl", artist: "Johannes Vermeer", level: "impossible" },
  { slug: "woman-holding-a-balance", name: "Woman Holding a Balance", artist: "Johannes Vermeer", level: "impossible" }, // coldSlug — genuinely obscure but real, used for the cold-open
];
