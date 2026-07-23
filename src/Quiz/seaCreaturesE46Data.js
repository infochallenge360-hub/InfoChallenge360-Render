// E46 "Guess the Sea Creature" — answer = species name, image = real photo of the animal.
// Calibrated by global recognizability (quiz-difficulty-calibration): easy ~75%+ down to impossible <3%.
// Sourcing note (image step): iNaturalist-first (photo_license=cc0,cc-by) for coastal/charismatic
// species; Wikipedia-lead fallback REQUIRED for deep-sea/rarely-photographed species (most of
// hard+impossible tiers) since iNaturalist has near-zero citizen-science coverage of ROV/research-
// vessel subjects. See per-item note where fallback is expected.
export const SEA_CREATURES_E46 = [
  // EASY (18)
  { slug: "great-white-shark", name: "Great White Shark", sci: "Carcharodon carcharias", level: "easy" },
  { slug: "bottlenose-dolphin", name: "Bottlenose Dolphin", sci: "Tursiops truncatus", level: "easy" },
  { slug: "blue-whale", name: "Blue Whale", sci: "Balaenoptera musculus", level: "easy" },
  { slug: "clownfish", name: "Clownfish", sci: "Amphiprion ocellaris", level: "easy" },
  { slug: "orca", name: "Orca (Killer Whale)", sci: "Orcinus orca", level: "easy" },
  { slug: "green-sea-turtle", name: "Green Sea Turtle", sci: "Chelonia mydas", level: "easy" },
  { slug: "common-octopus", name: "Common Octopus", sci: "Octopus vulgaris", level: "easy" },
  { slug: "starfish", name: "Starfish", sci: "Asterias rubens", level: "easy" },
  { slug: "seahorse", name: "Seahorse", sci: "Hippocampus hippocampus", level: "easy" },
  { slug: "moon-jellyfish", name: "Moon Jellyfish", sci: "Aurelia aurita", level: "easy" },
  { slug: "great-hammerhead-shark", name: "Great Hammerhead Shark", sci: "Sphyrna mokarran", level: "easy" },
  { slug: "california-sea-lion", name: "California Sea Lion", sci: "Zalophus californianus", level: "easy" },
  { slug: "walrus", name: "Walrus", sci: "Odobenus rosmarus", level: "easy" },
  { slug: "humpback-whale", name: "Humpback Whale", sci: "Megaptera novaeangliae", level: "easy" },
  { slug: "american-lobster", name: "American Lobster", sci: "Homarus americanus", level: "easy" },
  { slug: "blue-crab", name: "Blue Crab", sci: "Callinectes sapidus", level: "easy" },
  { slug: "porcupinefish", name: "Porcupinefish", sci: "Diodon holocanthus", level: "easy" },
  { slug: "sea-otter", name: "Sea Otter", sci: "Enhydra lutris", level: "easy" },

  // MEDIUM (18)
  { slug: "giant-manta-ray", name: "Giant Manta Ray", sci: "Mobula birostris", level: "medium" },
  { slug: "southern-stingray", name: "Southern Stingray", sci: "Hypanus americanus", level: "medium" },
  { slug: "beluga-whale", name: "Beluga Whale", sci: "Delphinapterus leucas", level: "medium" },
  { slug: "narwhal", name: "Narwhal", sci: "Monodon monoceros", level: "medium" },
  { slug: "west-indian-manatee", name: "West Indian Manatee", sci: "Trichechus manatus", level: "medium" },
  { slug: "green-moray-eel", name: "Green Moray Eel", sci: "Gymnothorax funebris", level: "medium" },
  { slug: "giant-pacific-octopus", name: "Giant Pacific Octopus", sci: "Enteroctopus dofleini", level: "medium" },
  { slug: "leatherback-sea-turtle", name: "Leatherback Sea Turtle", sci: "Dermochelys coriacea", level: "medium" },
  { slug: "whale-shark", name: "Whale Shark", sci: "Rhincodon typus", level: "medium" },
  { slug: "tiger-shark", name: "Tiger Shark", sci: "Galeocerdo cuvier", level: "medium" },
  { slug: "great-barracuda", name: "Great Barracuda", sci: "Sphyraena barracuda", level: "medium" },
  { slug: "chambered-nautilus", name: "Chambered Nautilus", sci: "Nautilus pompilius", level: "medium" },
  { slug: "red-lionfish", name: "Red Lionfish", sci: "Pterois volitans", level: "medium" },
  { slug: "purple-sea-urchin", name: "Purple Sea Urchin", sci: "Strongylocentrotus purpuratus", level: "medium" },
  { slug: "common-cuttlefish", name: "Common Cuttlefish", sci: "Sepia officinalis", level: "medium" },
  { slug: "leafy-seadragon", name: "Leafy Seadragon", sci: "Phycodurus eques", level: "medium" },
  { slug: "humpback-anglerfish", name: "Humpback Anglerfish", sci: "Melanocetus johnsonii", level: "medium" }, // Wikipedia fallback
  { slug: "giant-sea-cucumber", name: "Giant California Sea Cucumber", sci: "Apostichopus californicus", level: "medium" },

  // HARD (18)
  { slug: "smalltooth-sawfish", name: "Smalltooth Sawfish", sci: "Pristis pectinata", level: "hard" },
  { slug: "atlantic-flying-fish", name: "Atlantic Flying Fish", sci: "Cheilopogon melanurus", level: "hard" },
  { slug: "queen-angelfish", name: "Queen Angelfish", sci: "Holacanthus ciliaris", level: "hard" },
  { slug: "vaquita", name: "Vaquita", sci: "Phocoena sinus", level: "hard" }, // Wikipedia fallback
  { slug: "ghost-shark-chimaera", name: "Ghost Shark (Chimaera)", sci: "Chimaera monstrosa", level: "hard" }, // Wikipedia fallback
  { slug: "mantis-shrimp", name: "Mantis Shrimp", sci: "Odontodactylus scyllarus", level: "hard" },
  { slug: "goblin-shark", name: "Goblin Shark", sci: "Mitsukurina owstoni", level: "hard" }, // likely Wikipedia fallback
  { slug: "frilled-shark", name: "Frilled Shark", sci: "Chlamydoselachus anguineus", level: "hard" }, // likely Wikipedia fallback
  { slug: "blobfish", name: "Blobfish", sci: "Psychrolutes marcidus", level: "hard" }, // Wikipedia fallback
  { slug: "giant-squid", name: "Giant Squid", sci: "Architeuthis dux", level: "hard" }, // Wikipedia fallback
  { slug: "colossal-squid", name: "Colossal Squid", sci: "Mesonychoteuthis hamiltoni", level: "hard" }, // likely Wikipedia fallback
  { slug: "yeti-crab", name: "Yeti Crab", sci: "Kiwa hirsuta", level: "hard" }, // likely Wikipedia fallback
  { slug: "vampire-squid", name: "Vampire Squid", sci: "Vampyroteuthis infernalis", level: "hard" }, // likely Wikipedia fallback
  { slug: "japanese-spider-crab", name: "Japanese Spider Crab", sci: "Macrocheira kaempferi", level: "hard" },
  { slug: "coelacanth", name: "Coelacanth", sci: "Latimeria chalumnae", level: "hard" }, // likely Wikipedia fallback
  { slug: "giant-oarfish", name: "Giant Oarfish", sci: "Regalecus glesne", level: "hard" }, // likely Wikipedia fallback
  { slug: "dumbo-octopus", name: "Dumbo Octopus", sci: "Grimpoteuthis sp.", level: "hard" }, // Wikipedia fallback
  { slug: "fangtooth-fish", name: "Fangtooth Fish", sci: "Anoplogaster cornuta", level: "hard" }, // likely Wikipedia fallback

  // IMPOSSIBLE (17)
  { slug: "sea-pig", name: "Sea Pig", sci: "Scotoplanes globosa", level: "impossible" }, // Wikipedia fallback
  { slug: "pacific-barreleye-fish", name: "Pacific Barreleye Fish", sci: "Macropinna microstoma", level: "impossible" }, // Wikipedia fallback
  { slug: "sarcastic-fringehead", name: "Sarcastic Fringehead", sci: "Neoclinus blanchardi", level: "impossible" }, // try iNat first, shallow CA species
  { slug: "giant-isopod", name: "Giant Isopod", sci: "Bathynomus giganteus", level: "impossible" }, // Wikipedia fallback
  { slug: "hoff-crab", name: "Hoff Crab", sci: "Kiwa tyleri", level: "impossible" }, // Wikipedia fallback
  { slug: "bloody-belly-comb-jelly", name: "Bloody-Belly Comb Jelly", sci: "Lampocteis cruentiventer", level: "impossible" }, // Wikipedia/MBARI fallback
  { slug: "faceless-cusk", name: "Faceless Cusk", sci: "Typhlonus nasus", level: "impossible" }, // Wikipedia fallback
  { slug: "zombie-worm", name: "Zombie Worm (Bone-Eating Worm)", sci: "Osedax mucofloris", level: "impossible" }, // Wikipedia fallback
  { slug: "squidworm", name: "Squidworm", sci: "Teuthidodrilus samae", level: "impossible" }, // Wikipedia fallback
  { slug: "silver-hatchetfish", name: "Silver Hatchetfish", sci: "Argyropelecus aculeatus", level: "impossible" }, // Wikipedia fallback
  { slug: "stoplight-loosejaw", name: "Stoplight Loosejaw", sci: "Malacosteus niger", level: "impossible" }, // Wikipedia fallback
  { slug: "pink-see-through-fantasia", name: "Pink See-Through Fantasia", sci: "Enypniastes eximia", level: "impossible" }, // Wikipedia/MBARI fallback
  { slug: "blackfin-icefish", name: "Blackfin Icefish", sci: "Chaenocephalus aceratus", level: "impossible" }, // Wikipedia fallback
  { slug: "mariana-snailfish", name: "Mariana Snailfish", sci: "Pseudoliparis swirei", level: "impossible" }, // Wikipedia fallback
  { slug: "giant-tube-worm", name: "Giant Tube Worm", sci: "Riftia pachyptila", level: "impossible" }, // Wikipedia fallback
  { slug: "antarctic-sea-spider", name: "Antarctic Giant Sea Spider", sci: "Colossendeis megalonyx", level: "impossible" }, // Wikipedia fallback
  { slug: "glass-squid", name: "Glass Squid (Cockatoo Squid)", sci: "Teuthowenia pellucida", level: "impossible" }, // Wikipedia fallback
];
