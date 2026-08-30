// Guess the Dinosaur — 70 items, 18/18/16/18 across easy/medium/hard/impossible.
// Difficulty = general global public name/silhouette recognizability, not
// scientific/paleontological importance (per quiz-difficulty-calibration).
//
// A handful of items are pterosaurs or marine reptiles, not technically
// members of Dinosauria — kept in for content diversity and because they're
// what a general "dinosaur quiz" audience expects/searches for (same as most
// kids' dinosaur books/museum "dinosaur wings"), but each one's own fact
// explicitly says so, so nothing is stated as false.
//
// IMPORTANT (permanent lesson from E90's GATE2 fix): items MUST stay grouped
// contiguously by level in this array. The engine inserts a level-transition
// splash screen whenever array-adjacent items' levels differ, so a single
// item stranded out of its tier block creates a spurious extra splash.
export const DINOSAURS_E92 = [
  // EASY (18) — near-universal, ~70-95% global recognition
  { slug: "tyrannosaurus-rex", name: "Tyrannosaurus Rex", level: "easy" },
  { slug: "triceratops", name: "Triceratops", level: "easy" },
  { slug: "stegosaurus", name: "Stegosaurus", level: "easy" },
  { slug: "velociraptor", name: "Velociraptor", level: "easy" },
  { slug: "brachiosaurus", name: "Brachiosaurus", level: "easy" },
  { slug: "brontosaurus", name: "Brontosaurus", level: "easy" },
  { slug: "pterodactylus", name: "Pterodactylus", level: "easy" },
  { slug: "ankylosaurus", name: "Ankylosaurus", level: "easy" },
  { slug: "spinosaurus", name: "Spinosaurus", level: "easy" },
  { slug: "diplodocus", name: "Diplodocus", level: "easy" },
  { slug: "pteranodon", name: "Pteranodon", level: "easy" },
  { slug: "iguanodon", name: "Iguanodon", level: "easy" },
  { slug: "allosaurus", name: "Allosaurus", level: "easy" },
  { slug: "archaeopteryx", name: "Archaeopteryx", level: "easy" },
  { slug: "mosasaurus", name: "Mosasaurus", level: "easy" },
  { slug: "plesiosaurus", name: "Plesiosaurus", level: "easy" },
  { slug: "parasaurolophus", name: "Parasaurolophus", level: "easy" },
  { slug: "dilophosaurus", name: "Dilophosaurus", level: "easy" },

  // MEDIUM (18) — most have seen it, ~35-70%
  { slug: "pachycephalosaurus", name: "Pachycephalosaurus", level: "medium" },
  { slug: "compsognathus", name: "Compsognathus", level: "medium" },
  { slug: "megalosaurus", name: "Megalosaurus", level: "medium" },
  { slug: "carnotaurus", name: "Carnotaurus", level: "medium" },
  { slug: "therizinosaurus", name: "Therizinosaurus", level: "medium" },
  { slug: "gallimimus", name: "Gallimimus", level: "medium" },
  { slug: "deinonychus", name: "Deinonychus", level: "medium" },
  { slug: "utahraptor", name: "Utahraptor", level: "medium" },
  { slug: "styracosaurus", name: "Styracosaurus", level: "medium" },
  { slug: "corythosaurus", name: "Corythosaurus", level: "medium" },
  { slug: "quetzalcoatlus", name: "Quetzalcoatlus", level: "medium" },
  { slug: "ichthyosaurus", name: "Ichthyosaurus", level: "medium" },
  { slug: "elasmosaurus", name: "Elasmosaurus", level: "medium" },
  { slug: "baryonyx", name: "Baryonyx", level: "medium" },
  { slug: "giganotosaurus", name: "Giganotosaurus", level: "medium" },
  { slug: "kentrosaurus", name: "Kentrosaurus", level: "medium" },
  { slug: "maiasaura", name: "Maiasaura", level: "medium" },
  { slug: "oviraptor", name: "Oviraptor", level: "medium" },

  // HARD (16) — enthusiasts know it, ~10-35%
  { slug: "coelophysis", name: "Coelophysis", level: "hard" },
  { slug: "herrerasaurus", name: "Herrerasaurus", level: "hard" },
  { slug: "plateosaurus", name: "Plateosaurus", level: "hard" },
  { slug: "edmontosaurus", name: "Edmontosaurus", level: "hard" },
  { slug: "lambeosaurus", name: "Lambeosaurus", level: "hard" },
  { slug: "pentaceratops", name: "Pentaceratops", level: "hard" },
  { slug: "protoceratops", name: "Protoceratops", level: "hard" },
  { slug: "dimorphodon", name: "Dimorphodon", level: "hard" },
  { slug: "rhamphorhynchus", name: "Rhamphorhynchus", level: "hard" },
  { slug: "liopleurodon", name: "Liopleurodon", level: "hard" },
  { slug: "amargasaurus", name: "Amargasaurus", level: "hard" },
  { slug: "suchomimus", name: "Suchomimus", level: "hard" },
  { slug: "dreadnoughtus", name: "Dreadnoughtus", level: "hard" },
  { slug: "yutyrannus", name: "Yutyrannus", level: "hard" },
  { slug: "sinosauropteryx", name: "Sinosauropteryx", level: "hard" },
  { slug: "microraptor", name: "Microraptor", level: "hard" },

  // IMPOSSIBLE (18) — almost nobody, aim <3%
  { slug: "epidexipteryx", name: "Epidexipteryx", level: "impossible" },
  { slug: "yi-qi", name: "Yi Qi", level: "impossible" },
  { slug: "masiakasaurus", name: "Masiakasaurus", level: "impossible" },
  { slug: "nigersaurus", name: "Nigersaurus", level: "impossible" },
  { slug: "concavenator", name: "Concavenator", level: "impossible" },
  { slug: "guanlong", name: "Guanlong", level: "impossible" },
  { slug: "segisaurus", name: "Segisaurus", level: "impossible" },
  { slug: "buitreraptor", name: "Buitreraptor", level: "impossible" },
  { slug: "shuvuuia", name: "Shuvuuia", level: "impossible" },
  { slug: "tsintaosaurus", name: "Tsintaosaurus", level: "impossible" },
  { slug: "muttaburrasaurus", name: "Muttaburrasaurus", level: "impossible" },
  { slug: "leaellynasaura", name: "Leaellynasaura", level: "impossible" },
  { slug: "minmi", name: "Minmi", level: "impossible" },
  { slug: "yinlong", name: "Yinlong", level: "impossible" },
  { slug: "psittacosaurus", name: "Psittacosaurus", level: "impossible" },
  { slug: "anchiornis", name: "Anchiornis", level: "impossible" },
  { slug: "eoraptor", name: "Eoraptor", level: "impossible" },
  { slug: "scutellosaurus", name: "Scutellosaurus", level: "impossible" },
];
