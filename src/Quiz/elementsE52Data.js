// E52 "Guess the Chemical Element" — answer = the element's common name, image = a real photo of
// a sample/specimen in its most recognizable elemental form (metal chunk/crystal, liquid metal,
// or for gases a discharge-tube/liquefied-gas photo, since a colorless gas cannot be photographed
// meaningfully on its own).
// Calibrated by global recognizability of the SPECIMEN AS PHOTOGRAPHED (quiz-difficulty-calibration):
// easy ~70-95% (household-name elements with a distinctive look: color, glow, or liquid state) down
// to impossible <10% (aimed <3% — synthetic/superheavy elements almost nobody has heard of, several
// of which have NO macroscopic sample that has ever existed at any scale).
//
// Item count: 76 (19 per tier) — deliberately not 71 (a count reused by many prior episodes) and not
// 68/72 (used by E50/E37 and E41/E47/E49/E40/E38/E51 respectively), per the "vary item count" note.
// 76 sits inside the 65-78 target band and splits evenly into four 19-item tiers.
//
// Sourcing strategy: Wikipedia pageimages API (piprop=thumbnail&pithumbsize=1200, real User-Agent)
// used as PRIMARY source for all 76 items — element sample photography is deeply covered on
// Wikipedia, mostly from Images-of-elements.com (the "electrolytic/sublimed + 1cm3 cube" series,
// CC-BY-SA/FAL) plus a handful of USGS/public-domain lab photos. No Commons-search fallback was
// needed for any real (non-synthetic) element — every pageimage lead was already a genuine specimen
// photo. Licenses recorded per item in out/e52-elements-fetch-report.json (mix of CC-BY-SA 3.0/4.0,
// CC-BY 3.0/4.0, FAL "Free Art License", GFDL 1.2, and outright Public Domain).
//
// PD-cutoff / "no physical sample exists" rationale (N/A note): the usual pre-1929 photograph
// public-domain cutoff used for historical-photo episodes does NOT apply here — these are all
// modern laboratory specimen photographs, licensed via Creative Commons/FAL/GFDL by their
// photographers (mostly user "Alchemist-hp" / Images-of-elements.com and USGS), not old photographs
// aging into the public domain. For six IMPOSSIBLE-tier items — francium, rutherfordium,
// darmstadtium, tennessine, oganesson, and livermorium (the coldSlug) — NO macroscopic sample photo
// exists anywhere (francium: under an ounce exists on Earth at any moment; the other five are
// synthetic superheavy elements produced only a few atoms at a time with sub-second to short
// half-lives). Per the brief, these six use the standard Wikipedia/Commons periodic-table-locator
// graphic (the small periodic-table-with-highlighted-cell image from each element's infobox,
// CC-BY-SA) instead of a specimen photo — documented per-item in the fetch report.
//
// fit: contain is required on the render side for this episode (not changed here, just documented) —
// raw metal chunks, discharge tubes (wide/short aspect), and periodic-table locator graphics have
// wildly varied shapes/aspect ratios.
//
// Look-alike care: many "generic gray metal" specimens (titanium/zirconium/niobium/tantalum/hafnium/
// vanadium/molybdenum/tungsten etc.) look near-identical in isolation — tier placement leans on name
// fame + distinguishing visual cues (color, glow, liquid state, crystal habit) rather than raw metal
// color alone, same approach E50 used for quartz-color and blue-mineral look-alikes.
//
// coldSlug (last item, most obscure): "livermorium" — one of the synthetic superheavy elements
// almost nobody outside nuclear physics has ever seen or heard of; only atom-by-atom quantities
// have ever been made, each decaying in a fraction of a second.
export const ELEMENTS_E52 = [
  // EASY (19) — ~70-95% globally recognizable on sight
  { slug: "gold", name: "Gold", symbol: "Au", level: "easy" },
  { slug: "silver", name: "Silver", symbol: "Ag", level: "easy" },
  { slug: "copper", name: "Copper", symbol: "Cu", level: "easy" },
  { slug: "iron", name: "Iron", symbol: "Fe", level: "easy" },
  { slug: "carbon", name: "Carbon", symbol: "C", level: "easy" },
  { slug: "oxygen", name: "Oxygen", symbol: "O", level: "easy" },
  { slug: "hydrogen", name: "Hydrogen", symbol: "H", level: "easy" },
  { slug: "helium", name: "Helium", symbol: "He", level: "easy" },
  { slug: "nitrogen", name: "Nitrogen", symbol: "N", level: "easy" },
  { slug: "aluminum", name: "Aluminum", symbol: "Al", level: "easy" },
  { slug: "sulfur", name: "Sulfur", symbol: "S", level: "easy" },
  { slug: "mercury", name: "Mercury", symbol: "Hg", level: "easy" },
  { slug: "neon", name: "Neon", symbol: "Ne", level: "easy" },
  { slug: "zinc", name: "Zinc", symbol: "Zn", level: "easy" },
  { slug: "lead", name: "Lead", symbol: "Pb", level: "easy" },
  { slug: "tin", name: "Tin", symbol: "Sn", level: "easy" },
  { slug: "platinum", name: "Platinum", symbol: "Pt", level: "easy" },
  { slug: "titanium", name: "Titanium", symbol: "Ti", level: "easy" },
  { slug: "sodium", name: "Sodium", symbol: "Na", level: "easy" },

  // MEDIUM (19) — ~35-70%, most people have seen it somewhere
  { slug: "chlorine", name: "Chlorine", symbol: "Cl", level: "medium" },
  { slug: "iodine", name: "Iodine", symbol: "I", level: "medium" },
  { slug: "bromine", name: "Bromine", symbol: "Br", level: "medium" },
  { slug: "nickel", name: "Nickel", symbol: "Ni", level: "medium" },
  { slug: "chromium", name: "Chromium", symbol: "Cr", level: "medium" },
  { slug: "cobalt", name: "Cobalt", symbol: "Co", level: "medium" },
  { slug: "tungsten", name: "Tungsten", symbol: "W", level: "medium" },
  { slug: "silicon", name: "Silicon", symbol: "Si", level: "medium" },
  { slug: "bismuth", name: "Bismuth", symbol: "Bi", level: "medium" },
  { slug: "gallium", name: "Gallium", symbol: "Ga", level: "medium" },
  { slug: "argon", name: "Argon", symbol: "Ar", level: "medium" },
  { slug: "phosphorus", name: "Phosphorus", symbol: "P", level: "medium" },
  { slug: "potassium", name: "Potassium", symbol: "K", level: "medium" },
  { slug: "calcium", name: "Calcium", symbol: "Ca", level: "medium" },
  { slug: "magnesium", name: "Magnesium", symbol: "Mg", level: "medium" },
  { slug: "manganese", name: "Manganese", symbol: "Mn", level: "medium" },
  { slug: "uranium", name: "Uranium", symbol: "U", level: "medium" },
  { slug: "neodymium", name: "Neodymium", symbol: "Nd", level: "medium" },
  { slug: "lithium", name: "Lithium", symbol: "Li", level: "medium" },

  // HARD (19) — ~10-35%, enthusiasts/chemistry-minded viewers recognize it
  { slug: "boron", name: "Boron", symbol: "B", level: "hard" },
  { slug: "germanium", name: "Germanium", symbol: "Ge", level: "hard" },
  { slug: "cadmium", name: "Cadmium", symbol: "Cd", level: "hard" },
  { slug: "antimony", name: "Antimony", symbol: "Sb", level: "hard" },
  { slug: "arsenic", name: "Arsenic", symbol: "As", level: "hard" },
  { slug: "cesium", name: "Cesium", symbol: "Cs", level: "hard" },
  { slug: "rubidium", name: "Rubidium", symbol: "Rb", level: "hard" },
  { slug: "strontium", name: "Strontium", symbol: "Sr", level: "hard" },
  { slug: "barium", name: "Barium", symbol: "Ba", level: "hard" },
  { slug: "vanadium", name: "Vanadium", symbol: "V", level: "hard" },
  { slug: "molybdenum", name: "Molybdenum", symbol: "Mo", level: "hard" },
  { slug: "zirconium", name: "Zirconium", symbol: "Zr", level: "hard" },
  { slug: "palladium", name: "Palladium", symbol: "Pd", level: "hard" },
  { slug: "rhodium", name: "Rhodium", symbol: "Rh", level: "hard" },
  { slug: "iridium", name: "Iridium", symbol: "Ir", level: "hard" },
  { slug: "osmium", name: "Osmium", symbol: "Os", level: "hard" },
  { slug: "ruthenium", name: "Ruthenium", symbol: "Ru", level: "hard" },
  { slug: "selenium", name: "Selenium", symbol: "Se", level: "hard" },
  { slug: "tellurium", name: "Tellurium", symbol: "Te", level: "hard" },

  // IMPOSSIBLE (19) — <10%, aimed <3%; genuinely obscure or literally never-seen-in-bulk elements
  { slug: "hafnium", name: "Hafnium", symbol: "Hf", level: "impossible" },
  { slug: "niobium", name: "Niobium", symbol: "Nb", level: "impossible" },
  { slug: "tantalum", name: "Tantalum", symbol: "Ta", level: "impossible" },
  { slug: "scandium", name: "Scandium", symbol: "Sc", level: "impossible" },
  { slug: "yttrium", name: "Yttrium", symbol: "Y", level: "impossible" },
  { slug: "thorium", name: "Thorium", symbol: "Th", level: "impossible" },
  { slug: "radium", name: "Radium", symbol: "Ra", level: "impossible" },
  { slug: "polonium", name: "Polonium", symbol: "Po", level: "impossible" },
  { slug: "actinium", name: "Actinium", symbol: "Ac", level: "impossible" },
  { slug: "protactinium", name: "Protactinium", symbol: "Pa", level: "impossible" },
  { slug: "francium", name: "Francium", symbol: "Fr", level: "impossible" },
  { slug: "astatine", name: "Astatine", symbol: "At", level: "impossible" },
  { slug: "technetium", name: "Technetium", symbol: "Tc", level: "impossible" },
  { slug: "promethium", name: "Promethium", symbol: "Pm", level: "impossible" },
  { slug: "rutherfordium", name: "Rutherfordium", symbol: "Rf", level: "impossible" },
  { slug: "darmstadtium", name: "Darmstadtium", symbol: "Ds", level: "impossible" },
  { slug: "tennessine", name: "Tennessine", symbol: "Ts", level: "impossible" },
  { slug: "oganesson", name: "Oganesson", symbol: "Og", level: "impossible" },
  { slug: "livermorium", name: "Livermorium", symbol: "Lv", level: "impossible" },
];
