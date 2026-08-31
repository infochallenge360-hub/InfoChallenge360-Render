// Guess the Human Body Part/Organ — 70 items, 18/18/16/18 across
// easy/medium/hard/impossible. Difficulty = general global public
// recognizability, not medical-student familiarity.
//
// Family-friendly / advertiser-safe content-scope rule: zero reproductive
// or genital organs, zero graphic/gory content — every item is a standard
// external body part, internal organ, or skeletal/muscular/nervous
// structure, drawn as a clean flat anatomical-diagram-style icon (never
// photographic).
//
// IMPORTANT (permanent lesson from E90's GATE2 fix): items MUST stay grouped
// contiguously by level in this array. The engine inserts a level-transition
// splash screen whenever array-adjacent items' levels differ, so a single
// item stranded out of its tier block creates a spurious extra splash.
export const BODY_PARTS_E94 = [
  // EASY (18) — near-universal, ~70-95% global recognition
  { slug: "heart", name: "Heart", level: "easy" },
  { slug: "brain", name: "Brain", level: "easy" },
  { slug: "eye", name: "Eye", level: "easy" },
  { slug: "ear", name: "Ear", level: "easy" },
  { slug: "nose", name: "Nose", level: "easy" },
  { slug: "hand", name: "Hand", level: "easy" },
  { slug: "foot", name: "Foot", level: "easy" },
  { slug: "lung", name: "Lung", level: "easy" },
  { slug: "stomach", name: "Stomach", level: "easy" },
  { slug: "skin", name: "Skin", level: "easy" },
  { slug: "tooth", name: "Tooth", level: "easy" },
  { slug: "tongue", name: "Tongue", level: "easy" },
  { slug: "mouth", name: "Mouth", level: "easy" },
  { slug: "knee", name: "Knee", level: "easy" },
  { slug: "elbow", name: "Elbow", level: "easy" },
  { slug: "skull", name: "Skull", level: "easy" },
  { slug: "rib-cage", name: "Rib Cage", level: "easy" },
  { slug: "bicep", name: "Bicep", level: "easy" },

  // MEDIUM (18) — most have seen it, ~35-70%
  { slug: "liver", name: "Liver", level: "medium" },
  { slug: "kidney", name: "Kidney", level: "medium" },
  { slug: "spine", name: "Spine (Spinal Column)", level: "medium" },
  { slug: "bladder", name: "Bladder", level: "medium" },
  { slug: "spleen", name: "Spleen", level: "medium" },
  { slug: "pancreas", name: "Pancreas", level: "medium" },
  { slug: "gallbladder", name: "Gallbladder", level: "medium" },
  { slug: "femur", name: "Femur", level: "medium" },
  { slug: "tonsils", name: "Tonsils", level: "medium" },
  { slug: "cartilage", name: "Cartilage", level: "medium" },
  { slug: "ligament", name: "Ligament", level: "medium" },
  { slug: "achilles-tendon", name: "Achilles Tendon", level: "medium" },
  { slug: "coccyx", name: "Coccyx (Tailbone)", level: "medium" },
  { slug: "patella", name: "Kneecap (Patella)", level: "medium" },
  { slug: "clavicle", name: "Collarbone (Clavicle)", level: "medium" },
  { slug: "trachea", name: "Windpipe (Trachea)", level: "medium" },
  { slug: "vocal-cords", name: "Vocal Cords", level: "medium" },
  { slug: "small-intestine", name: "Small Intestine", level: "medium" },

  // HARD (16) — enthusiasts know it, ~10-35%
  { slug: "appendix", name: "Appendix", level: "hard" },
  { slug: "thyroid", name: "Thyroid", level: "hard" },
  { slug: "cornea", name: "Cornea", level: "hard" },
  { slug: "esophagus", name: "Esophagus", level: "hard" },
  { slug: "diaphragm", name: "Diaphragm", level: "hard" },
  { slug: "sternum", name: "Sternum", level: "hard" },
  { slug: "larynx", name: "Larynx (Voice Box)", level: "hard" },
  { slug: "retina", name: "Retina", level: "hard" },
  { slug: "adrenal-gland", name: "Adrenal Gland", level: "hard" },
  { slug: "sciatic-nerve", name: "Sciatic Nerve", level: "hard" },
  { slug: "amygdala", name: "Amygdala", level: "hard" },
  { slug: "hippocampus", name: "Hippocampus", level: "hard" },
  { slug: "cerebellum", name: "Cerebellum", level: "hard" },
  { slug: "epiglottis", name: "Epiglottis", level: "hard" },
  { slug: "uvula", name: "Uvula", level: "hard" },
  { slug: "deltoid", name: "Deltoid Muscle", level: "hard" },

  // IMPOSSIBLE (18) — almost nobody, aim <3%
  { slug: "pineal-gland", name: "Pineal Gland", level: "impossible" },
  { slug: "semicircular-canals", name: "Semicircular Canals", level: "impossible" },
  { slug: "corpus-callosum", name: "Corpus Callosum", level: "impossible" },
  { slug: "islets-of-langerhans", name: "Islets of Langerhans", level: "impossible" },
  { slug: "stapes", name: "Stapes (Stirrup Bone)", level: "impossible" },
  { slug: "duodenum", name: "Duodenum", level: "impossible" },
  { slug: "xiphoid-process", name: "Xiphoid Process", level: "impossible" },
  { slug: "vomer-bone", name: "Vomer Bone", level: "impossible" },
  { slug: "cochlea", name: "Cochlea", level: "impossible" },
  { slug: "glottis", name: "Glottis", level: "impossible" },
  { slug: "meninges", name: "Meninges", level: "impossible" },
  { slug: "peritoneum", name: "Peritoneum", level: "impossible" },
  { slug: "trapezius", name: "Trapezius Muscle", level: "impossible" },
  { slug: "sphenoid-bone", name: "Sphenoid Bone", level: "impossible" },
  { slug: "pia-mater", name: "Pia Mater", level: "impossible" },
  { slug: "cecum", name: "Cecum", level: "impossible" },
  { slug: "ileum", name: "Ileum", level: "impossible" },
  { slug: "hypothalamus", name: "Hypothalamus", level: "impossible" },
];
