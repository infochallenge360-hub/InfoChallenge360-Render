// Guess the Historical Figure — 70 items, 18/18/16/18 across easy/medium/hard/impossible.
// Difficulty = general global public name/portrait recognizability, not
// scholarly/historical importance (per quiz-difficulty-calibration).
//
// Owner-approved content-scope exclusions (2026-08-30): NO religious
// founders/prophets/central religious figures of any faith, and NO
// 20th-century dictators / genocidal or mass-atrocity authoritarian rulers,
// regardless of historical significance. Secular historical figures only.
//
// Images are real public-domain portraits/photographs sourced from
// Wikipedia (see quiz-free-images memory) — the `wiki` field is the exact
// English Wikipedia article title used to fetch each portrait.
//
// IMPORTANT (permanent lesson from E90's GATE2 fix): items MUST stay grouped
// contiguously by level in this array. The engine inserts a level-transition
// splash screen whenever array-adjacent items' levels differ, so a single
// item stranded out of its tier block creates a spurious extra splash.
export const HISTORICAL_FIGURES_E93 = [
  // EASY (18) — near-universal, ~70-95% global recognition
  { slug: "albert-einstein", name: "Albert Einstein", wiki: "Albert Einstein", level: "easy" },
  { slug: "leonardo-da-vinci", name: "Leonardo da Vinci", wiki: "Leonardo da Vinci", level: "easy" },
  { slug: "cleopatra-vii", name: "Cleopatra", wiki: "Cleopatra", level: "easy" },
  { slug: "abraham-lincoln", name: "Abraham Lincoln", wiki: "Abraham Lincoln", level: "easy" },
  { slug: "napoleon-bonaparte", name: "Napoleon Bonaparte", wiki: "Napoleon", level: "easy" },
  { slug: "william-shakespeare", name: "William Shakespeare", wiki: "William Shakespeare", level: "easy" },
  { slug: "julius-caesar", name: "Julius Caesar", wiki: "Julius Caesar", level: "easy" },
  { slug: "christopher-columbus", name: "Christopher Columbus", wiki: "Christopher Columbus", level: "easy" },
  { slug: "isaac-newton", name: "Isaac Newton", wiki: "Isaac Newton", level: "easy" },
  { slug: "genghis-khan", name: "Genghis Khan", wiki: "Genghis Khan", level: "easy" },
  { slug: "alexander-the-great", name: "Alexander the Great", wiki: "Alexander the Great", level: "easy" },
  { slug: "mahatma-gandhi", name: "Mahatma Gandhi", wiki: "Mahatma Gandhi", level: "easy" },
  { slug: "marie-curie", name: "Marie Curie", wiki: "Marie Curie", level: "easy" },
  { slug: "charles-darwin", name: "Charles Darwin", wiki: "Charles Darwin", level: "easy" },
  { slug: "vincent-van-gogh", name: "Vincent van Gogh", wiki: "Vincent van Gogh", level: "easy" },
  { slug: "wolfgang-amadeus-mozart", name: "Wolfgang Amadeus Mozart", wiki: "Wolfgang Amadeus Mozart", level: "easy" },
  { slug: "queen-victoria", name: "Queen Victoria", wiki: "Queen Victoria", level: "easy" },
  { slug: "george-washington", name: "George Washington", wiki: "George Washington", level: "easy" },

  // MEDIUM (18) — most have seen it, ~35-70%
  { slug: "elizabeth-i", name: "Elizabeth I", wiki: "Elizabeth I", level: "medium" },
  { slug: "saladin", name: "Saladin", wiki: "Saladin", level: "medium" },
  { slug: "joan-of-arc", name: "Joan of Arc", wiki: "Joan of Arc", level: "medium" },
  { slug: "michelangelo", name: "Michelangelo", wiki: "Michelangelo", level: "medium" },
  { slug: "marco-polo", name: "Marco Polo", wiki: "Marco Polo", level: "medium" },
  { slug: "nikola-tesla", name: "Nikola Tesla", wiki: "Nikola Tesla", level: "medium" },
  { slug: "thomas-edison", name: "Thomas Edison", wiki: "Thomas Edison", level: "medium" },
  { slug: "benjamin-franklin", name: "Benjamin Franklin", wiki: "Benjamin Franklin", level: "medium" },
  { slug: "catherine-the-great", name: "Catherine the Great", wiki: "Catherine the Great", level: "medium" },
  { slug: "frederick-douglass", name: "Frederick Douglass", wiki: "Frederick Douglass", level: "medium" },
  { slug: "florence-nightingale", name: "Florence Nightingale", wiki: "Florence Nightingale", level: "medium" },
  { slug: "louis-pasteur", name: "Louis Pasteur", wiki: "Louis Pasteur", level: "medium" },
  { slug: "ludwig-van-beethoven", name: "Ludwig van Beethoven", wiki: "Ludwig van Beethoven", level: "medium" },
  { slug: "simon-bolivar", name: "Simon Bolivar", wiki: "Simon Bolivar", level: "medium" },
  { slug: "nelson-mandela", name: "Nelson Mandela", wiki: "Nelson Mandela", level: "medium" },
  { slug: "sitting-bull", name: "Sitting Bull", wiki: "Sitting Bull", level: "medium" },
  { slug: "amelia-earhart", name: "Amelia Earhart", wiki: "Amelia Earhart", level: "medium" },
  { slug: "galileo-galilei", name: "Galileo Galilei", wiki: "Galileo Galilei", level: "medium" },

  // HARD (16) — enthusiasts know it, ~10-35%
  { slug: "attila-the-hun", name: "Attila the Hun", wiki: "Attila", level: "hard" },
  { slug: "suleiman-the-magnificent", name: "Suleiman the Magnificent", wiki: "Suleiman the Magnificent", level: "hard" },
  { slug: "akbar", name: "Akbar the Great", wiki: "Akbar", level: "hard" },
  { slug: "sun-yat-sen", name: "Sun Yat-sen", wiki: "Sun Yat-sen", level: "hard" },
  { slug: "ashoka", name: "Ashoka the Great", wiki: "Ashoka", level: "hard" },
  { slug: "hannibal-barca", name: "Hannibal", wiki: "Hannibal", level: "hard" },
  { slug: "boudica", name: "Boudica", wiki: "Boudica", level: "hard" },
  { slug: "toussaint-louverture", name: "Toussaint Louverture", wiki: "Toussaint Louverture", level: "hard" },
  { slug: "mansa-musa", name: "Mansa Musa", wiki: "Mansa Musa", level: "hard" },
  { slug: "cyrus-the-great", name: "Cyrus the Great", wiki: "Cyrus the Great", level: "hard" },
  { slug: "emiliano-zapata", name: "Emiliano Zapata", wiki: "Emiliano Zapata", level: "hard" },
  { slug: "zheng-he", name: "Zheng He", wiki: "Zheng He", level: "hard" },
  { slug: "vlad-the-impaler", name: "Vlad the Impaler", wiki: "Vlad the Impaler", level: "hard" },
  { slug: "empress-dowager-cixi", name: "Empress Dowager Cixi", wiki: "Empress Dowager Cixi", level: "hard" },
  { slug: "queen-nzinga", name: "Queen Nzinga", wiki: "Nzinga of Ndongo and Matamba", level: "hard" },
  { slug: "avicenna", name: "Avicenna", wiki: "Avicenna", level: "hard" },

  // IMPOSSIBLE (18) — almost nobody, aim <3%
  { slug: "behanzin", name: "Behanzin", wiki: "Béhanzin", level: "impossible" },
  { slug: "zenobia", name: "Zenobia", wiki: "Zenobia", level: "impossible" },
  { slug: "wu-zetian", name: "Wu Zetian", wiki: "Wu Zetian", level: "impossible" },
  { slug: "aethelflaed", name: "Aethelflaed", wiki: "Æthelflæd", level: "impossible" },
  { slug: "cetshwayo", name: "Cetshwayo", wiki: "Cetshwayo", level: "impossible" },
  { slug: "empress-suiko", name: "Empress Suiko", wiki: "Empress Suiko", level: "impossible" },
  { slug: "taharqa", name: "Taharqa", wiki: "Taharqa", level: "impossible" },
  { slug: "ibn-khaldun", name: "Ibn Khaldun", wiki: "Ibn Khaldun", level: "impossible" },
  { slug: "grace-omalley", name: "Grace O'Malley", wiki: "Grace O'Malley", level: "impossible" },
  { slug: "bartolome-de-las-casas", name: "Bartolome de las Casas", wiki: "Bartolomé de las Casas", level: "impossible" },
  { slug: "olaudah-equiano", name: "Olaudah Equiano", wiki: "Olaudah Equiano", level: "impossible" },
  { slug: "ida-b-wells", name: "Ida B. Wells", wiki: "Ida B. Wells", level: "impossible" },
  { slug: "mary-seacole", name: "Mary Seacole", wiki: "Mary Seacole", level: "impossible" },
  { slug: "phillis-wheatley", name: "Phillis Wheatley", wiki: "Phillis Wheatley", level: "impossible" },
  { slug: "rani-of-jhansi", name: "Rani of Jhansi", wiki: "Rani of Jhansi", level: "impossible" },
  { slug: "menelik-ii", name: "Menelik II", wiki: "Menelik II", level: "impossible" },
  { slug: "al-khwarizmi", name: "Al-Khwarizmi", wiki: "Al-Khwarizmi", level: "impossible" },
  { slug: "ada-lovelace", name: "Ada Lovelace", wiki: "Ada Lovelace", level: "impossible" },
];
