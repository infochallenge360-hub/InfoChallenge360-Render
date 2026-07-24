// E50 "Guess the Gemstone/Mineral" — answer = the mineral/gem's common name, image = a real
// photo of a raw specimen or a cut gem (whichever the best-licensed photo showed).
// Calibrated by global recognizability of the SPECIMEN AS PHOTOGRAPHED (quiz-difficulty-calibration):
// easy ~70-95% ("everyone's seen this stone") down to impossible <10% (aimed <3% — collector-only
// minerals almost nobody outside mineralogy has ever heard of).
//
// Item count: 68 (17 per tier) — deliberately not 71 (the E46 count) or another round number that
// repeats a prior episode's split, per the "vary item count" note. 68 sits inside the 65-78 target band.
//
// Sourcing strategy: Smithsonian Open Access SKIPPED (needs an api.data.gov key we don't have).
// Wikipedia/Wikimedia Commons used as PRIMARY source instead — mineral/gem specimen photography is
// deeply covered there by geology-enthusiast contributors. Per-item fetch used the Commons
// generator=search API (gsrnamespace=6) filtered to PD/CC0/CC-BY/CC-BY-SA licenses ONLY (CC-NC and
// CC-ND rejected outright — not usable in a monetized video), with a Wikipedia pageimages fallback
// when Commons search didn't surface a clean specimen/gem photo. See out/e50-gemstones-fetch-report.json
// for the exact source/license/attribution recorded per item.
//
// fit: contain is required on the render side for this episode (not changed here, just documented) —
// raw mineral specimens and cut gems have wildly varied shapes/aspect ratios, unlike e.g. animal photos
// which tolerate `cover`.
//
// Species-confusion care: quartz color varieties (quartz/amethyst/citrine/rose quartz) and blue stones
// (turquoise/lapis lazuli/sodalite/azurite/larimar/kyanite/iolite/tanzanite) were sourced and visually
// checked individually to avoid a look-alike swap (e.g. citrine photo mislabeled as topaz).
//
// coldSlug (last item, most obscure): "ekanite" — a genuinely rare, real, metamict radioactive
// mineral that almost nobody outside mineral collecting has ever heard of or seen.
export const GEMSTONES_E50 = [
  // EASY (17) — ~70-95% globally recognizable on sight
  { slug: "diamond", name: "Diamond", level: "easy" },
  { slug: "ruby", name: "Ruby", level: "easy" },
  { slug: "emerald", name: "Emerald", level: "easy" },
  { slug: "sapphire", name: "Sapphire", level: "easy" },
  { slug: "amethyst", name: "Amethyst", level: "easy" },
  { slug: "opal", name: "Opal", level: "easy" },
  { slug: "pearl", name: "Pearl", level: "easy" },
  { slug: "gold", name: "Gold (Native)", level: "easy" },
  { slug: "quartz", name: "Quartz (Rock Crystal)", level: "easy" },
  { slug: "turquoise", name: "Turquoise", level: "easy" },
  { slug: "jade", name: "Jade", level: "easy" },
  { slug: "garnet", name: "Garnet", level: "easy" },
  { slug: "citrine", name: "Citrine", level: "easy" },
  { slug: "rose-quartz", name: "Rose Quartz", level: "easy" },
  { slug: "pyrite", name: "Pyrite (Fool's Gold)", level: "easy" },
  { slug: "malachite", name: "Malachite", level: "easy" },
  { slug: "onyx", name: "Onyx", level: "easy" },

  // MEDIUM (17) — ~35-70%, most people have seen it somewhere
  { slug: "aquamarine", name: "Aquamarine", level: "medium" },
  { slug: "peridot", name: "Peridot", level: "medium" },
  { slug: "topaz", name: "Topaz", level: "medium" },
  { slug: "lapis-lazuli", name: "Lapis Lazuli", level: "medium" },
  { slug: "moonstone", name: "Moonstone", level: "medium" },
  { slug: "tourmaline", name: "Tourmaline", level: "medium" },
  { slug: "obsidian", name: "Obsidian", level: "medium" },
  { slug: "agate", name: "Agate", level: "medium" },
  { slug: "tigers-eye", name: "Tiger's Eye", level: "medium" },
  { slug: "amber", name: "Amber", level: "medium" },
  { slug: "fluorite", name: "Fluorite", level: "medium" },
  { slug: "selenite", name: "Selenite", level: "medium" },
  { slug: "calcite", name: "Calcite", level: "medium" },
  { slug: "jasper", name: "Jasper", level: "medium" },
  { slug: "aventurine", name: "Aventurine", level: "medium" },
  { slug: "rhodochrosite", name: "Rhodochrosite", level: "medium" },
  { slug: "alexandrite", name: "Alexandrite", level: "medium" },

  // HARD (17) — ~10-35%, enthusiasts/collectors recognize it
  { slug: "tanzanite", name: "Tanzanite", level: "hard" },
  { slug: "kunzite", name: "Kunzite", level: "hard" },
  { slug: "zircon", name: "Zircon", level: "hard" },
  { slug: "spinel", name: "Spinel", level: "hard" },
  { slug: "iolite", name: "Iolite", level: "hard" },
  { slug: "labradorite", name: "Labradorite", level: "hard" },
  { slug: "sunstone", name: "Sunstone", level: "hard" },
  { slug: "chrysoprase", name: "Chrysoprase", level: "hard" },
  { slug: "azurite", name: "Azurite", level: "hard" },
  { slug: "rhodonite", name: "Rhodonite", level: "hard" },
  { slug: "sodalite", name: "Sodalite", level: "hard" },
  { slug: "larimar", name: "Larimar", level: "hard" },
  { slug: "kyanite", name: "Kyanite", level: "hard" },
  { slug: "chalcopyrite", name: "Chalcopyrite", level: "hard" },
  { slug: "galena", name: "Galena", level: "hard" },
  { slug: "cinnabar", name: "Cinnabar", level: "hard" },
  { slug: "halite", name: "Halite (Rock Salt)", level: "hard" },

  // IMPOSSIBLE (17) — <10%, aimed <3%; genuinely obscure but real minerals
  { slug: "painite", name: "Painite", level: "impossible" },
  { slug: "grandidierite", name: "Grandidierite", level: "impossible" },
  { slug: "jeremejevite", name: "Jeremejevite", level: "impossible" },
  { slug: "taaffeite", name: "Taaffeite", level: "impossible" },
  { slug: "benitoite", name: "Benitoite", level: "impossible" },
  { slug: "poudretteite", name: "Poudretteite", level: "impossible" },
  { slug: "musgravite", name: "Musgravite", level: "impossible" },
  { slug: "serendibite", name: "Serendibite", level: "impossible" },
  { slug: "red-beryl", name: "Red Beryl (Bixbite)", level: "impossible" },
  { slug: "ammolite", name: "Ammolite", level: "impossible" },
  { slug: "charoite", name: "Charoite", level: "impossible" },
  { slug: "sugilite", name: "Sugilite", level: "impossible" },
  { slug: "papagoite", name: "Papagoite", level: "impossible" },
  { slug: "hackmanite", name: "Hackmanite", level: "impossible" },
  { slug: "tugtupite", name: "Tugtupite", level: "impossible" },
  { slug: "stichtite", name: "Stichtite", level: "impossible" },
  { slug: "ekanite", name: "Ekanite", level: "impossible" },
];
