// Data for E96 "Guess the Historical Empire by Map".
// Each item's polygon traces a SIMPLIFIED approximation of that empire's
// territorial extent at the peak/era noted in its comment. Items are
// grouped CONTIGUOUSLY by level: 18 easy, 18 medium, 16 hard, 18 impossible
// (70 total). Where two empires could look similar on a blank map (e.g.
// Rome vs Byzantium, Achaemenid Persia vs Alexander's empire, New Kingdom
// Egypt vs Ptolemaic Egypt, Umayyad vs Abbasid), a specific distinguishing
// snapshot in time was deliberately chosen for each — see per-item comments.

export const EMPIRES_E96 = [
  // ===================== EASY (18) =====================
  {
    slug: "roman-empire",
    name: "Roman Empire",
    level: "easy",
    // Peak under Trajan, 117 AD (Britain to Mesopotamia)
    polygon: [[-5,58],[-1,53],[-3,50],[2,51],[9,52],[13,48],[23,44],[29,45],[35,41],[44,37],[36,33],[34,29],[31,24],[25,31],[10,33],[2,36],[-6,35],[-9,37],[-9,43],[-2,44]],
  },
  {
    slug: "british-empire",
    name: "British Empire",
    level: "easy",
    // Peak ~1920; rough hull connecting major dominions/colonies (a globally
    // scattered empire can't be a single tidy shape — the sprawl is the point)
    polygon: [[-140,68],[18,-34],[174,-41],[97,20],[77,29],[3,58]],
  },
  {
    slug: "ottoman-empire",
    name: "Ottoman Empire",
    level: "easy",
    // Peak ~1683, Siege of Vienna
    polygon: [[16,48],[24,46],[29,45],[34,45],[41,42],[44,33],[48,30],[42,16],[35,21],[32,24],[25,31],[10,33],[0,36],[19,37],[20,45]],
  },
  {
    slug: "mongol-empire",
    name: "Mongol Empire",
    level: "easy",
    // Peak ~1279, Kublai Khan's unification (Korea to Eastern Europe)
    polygon: [[127,38],[122,40],[110,22],[100,25],[92,29],[70,30],[60,25],[44,33],[35,37],[30,48],[38,55],[60,58],[90,60],[110,55],[115,48]],
  },
  {
    slug: "ancient-egypt",
    name: "Ancient Egypt",
    level: "easy",
    // New Kingdom peak, ~1350-1250 BC — reaches deep into Nubia (distinct
    // from Ptolemaic Egypt's later, shallower southern border)
    polygon: [[31,31],[34,31],[36,34],[38,33],[35,31],[35,28],[33,24],[32,20],[31,18],[30,24],[29,31]],
  },
  {
    slug: "napoleonic-france",
    name: "Napoleonic French Empire",
    level: "easy",
    // Peak ~1811, directly annexed territory (satellite kingdoms not included)
    polygon: [[-1,49],[3,51],[7,53],[10,54],[14,54],[12,46],[14,45],[19,42],[15,41],[12,42],[10,44],[7,44],[2,42],[-2,43],[-4,48]],
  },
  {
    slug: "spanish-empire",
    name: "Spanish Empire",
    level: "easy",
    // Peak ~1790 (Iberia + the Americas; Philippines omitted — see fact)
    polygon: [[-117,34],[-71,-33],[-64,-38],[-4,40]],
  },
  {
    slug: "macedonian-empire",
    name: "Alexander the Great's Empire",
    level: "easy",
    // 323 BC, at Alexander's death — includes Greece/Macedon, conquered
    // Egypt (crowned there, founded Alexandria, 332 BC), and pushes further
    // into India (Beas river) than Achaemenid Persia ever did. A missing
    // Nubia/Egypt vertex left Egypt unshaded in the first render (GATE1) —
    // fixed by extending the polygon's reach to match Achaemenid's own Egypt
    // coverage.
    polygon: [[21,40],[25,32],[33,24],[68,25],[74,32],[67,40]],
  },
  {
    slug: "qing-dynasty",
    name: "Qing Dynasty",
    level: "easy",
    // Peak ~1790, Qianlong era
    polygon: [[135,48],[120,53],[87,49],[75,42],[78,35],[85,28],[98,22],[108,21],[121,25],[123,40],[130,43]],
  },
  {
    slug: "russian-empire",
    name: "Russian Empire",
    level: "easy",
    // 1895 (Alaska already sold to the US in 1867, so excluded)
    polygon: [[20,54],[30,60],[40,66],[60,68],[90,72],[140,72],[170,68],[178,64],[135,43],[110,50],[80,42],[60,38],[47,41],[38,47],[28,46],[23,50]],
  },
  {
    slug: "japanese-empire",
    name: "Empire of Japan",
    level: "easy",
    // Wartime peak, 1942
    polygon: [[95,15],[106,-6],[178,-8],[172,7],[145,45],[120,50]],
  },
  {
    slug: "portuguese-empire",
    name: "Portuguese Empire",
    level: "easy",
    // Peak ~1815 (Brazil elevated to a kingdom + African/Asian coastal posts)
    polygon: [[-51,-30],[35,-15],[113,22],[-9,39],[-43,-8]],
  },
  {
    slug: "french-colonial-empire",
    name: "French Colonial Empire",
    level: "easy",
    // Peak ~1929 (second colonial empire: West/Equatorial Africa,
    // Madagascar, Indochina — distinct era/footprint from Napoleonic France)
    polygon: [[-17,21],[9,-4],[49,-13],[105,10],[100,20],[10,37]],
  },
  {
    slug: "dutch-empire",
    name: "Dutch Empire",
    level: "easy",
    // 17th-century Golden Age peak (~1660)
    polygon: [[-74,41],[-56,5],[18,-34],[120,-8],[135,-3],[121,23]],
  },
  {
    slug: "german-empire",
    name: "German Empire",
    level: "easy",
    // 1914, Kaiserreich + African/Pacific colonies
    polygon: [[6,51],[16,-22],[147,-3],[120,36],[23,54],[13,54]],
  },
  {
    slug: "aztec-empire",
    name: "Aztec Empire",
    // Tier swapped up from medium per GATE1 (2026-09-03): Aztec/Inca are far
    // more globally recognizable than Assyria/Babylon for "guess the shape" —
    // moved with array position per the standing E90 contiguity rule.
    level: "easy",
    // 1519, Triple Alliance at Spanish contact
    polygon: [[-99,20],[-96,19],[-93,16],[-97,15],[-99,16],[-102,18],[-100,21],[-97,21]],
  },
  {
    slug: "inca-empire",
    name: "Inca Empire",
    level: "easy",
    // 1527, Huayna Capac's peak (Tawantinsuyu)
    polygon: [[-77,1],[-79,-2],[-81,-6],[-77,-12],[-72,-13],[-70,-16],[-68,-22],[-70,-33],[-65,-27],[-64,-18],[-75,-8]],
  },
  {
    slug: "mughal-empire",
    name: "Mughal Empire",
    level: "easy",
    // Peak ~1700 under Aurangzeb (nearly the whole subcontinent)
    polygon: [[70,34],[74,36],[88,26],[93,24],[85,20],[80,13],[76,11],[73,15],[70,22],[67,25],[69,30]],
  },

  // ===================== MEDIUM (18) =====================
  {
    slug: "byzantine-empire",
    name: "Byzantine Empire",
    level: "medium",
    // 555 AD, after Justinian I's reconquests — Italy/N.Africa/S.Spain
    // regained, but no Britain/Gaul/Mesopotamia (distinct from Rome's Trajan peak)
    polygon: [[-6,36],[33,24],[36,33],[35,37],[29,41],[10,45],[-6,37]],
  },
  {
    slug: "achaemenid-persian-empire",
    name: "Achaemenid Empire",
    level: "medium",
    // Darius I, ~500 BC — reaches Thrace/Egypt/Indus but NOT mainland Greece
    // (unlike Alexander's later empire, which conquered this same footprint)
    polygon: [[24,41],[27,40],[36,38],[44,37],[48,30],[60,30],[67,37],[70,33],[73,30],[68,24],[55,26],[48,28],[36,31],[31,30],[33,24],[25,31]],
  },
  {
    slug: "assyrian-empire",
    name: "Assyrian Empire",
    // Tier-swapped down from easy per GATE1 (2026-09-03) — see aztec-empire's
    // comment above.
    level: "medium",
    // Neo-Assyrian peak ~670 BC (Esarhaddon/Ashurbanipal), briefly held Egypt
    polygon: [[31,30],[34,31],[36,36],[38,37],[41,38],[44,37],[46,36],[48,33],[48,29],[44,30],[36,31]],
  },
  {
    slug: "babylonian-empire",
    name: "Babylonian Empire",
    level: "medium",
    // Neo-Babylonian peak ~562 BC, Nebuchadnezzar II (no Egypt, unlike Assyria)
    polygon: [[44,37],[48,33],[48,29],[44,29],[40,32],[36,31],[35,33],[36,36],[38,37],[41,37]],
  },
  {
    slug: "mali-empire",
    name: "Mali Empire",
    level: "medium",
    // Mansa Musa's peak, ~1337 — larger and further west/south than the
    // earlier Ghana Empire, smaller than the later Songhai Empire
    polygon: [[-17,15],[-16,12],[-8,10],[-4,13],[0,15],[3,16],[-2,20],[-8,22],[-15,20]],
  },
  {
    slug: "holy-roman-empire",
    name: "Holy Roman Empire",
    level: "medium",
    // ~1200 AD, Hohenstaufen era (Germany + Italian/Burgundian claims — pulled
    // back from Calabria to Rome/central Italy per GATE1: the far south was a
    // separate Kingdom of Sicily, only briefly in personal union). GATE2
    // pixel-verified the first fix's southern vertex (lat 42) sat just north
    // of Rome, excluding it — nudged to 41.5 so Rome itself is covered.
    polygon: [[6,51],[7,45],[13,41.5],[19,50],[15,54]],
  },
  {
    slug: "umayyad-caliphate",
    name: "Umayyad Caliphate",
    level: "medium",
    // Peak ~720 AD, Iberia to the Indus (750 AD is actually the year it was
    // overthrown by the Abbasid Revolution, not its territorial peak — fixed
    // per GATE1) — the larger of the two Caliphates (still holds Iberia and
    // the far Maghreb, unlike the later Abbasids)
    polygon: [[-9,37],[-9,43],[-1,43],[3,43],[10,36],[25,31],[31,30],[35,32],[41,37],[48,38],[52,36],[60,37],[67,40],[71,33],[73,30],[68,24],[55,26],[48,28],[44,29],[40,22],[40,15],[35,21],[10,30]],
  },
  {
    slug: "abbasid-caliphate",
    name: "Abbasid Caliphate",
    level: "medium",
    // Peak ~850 AD — lost Iberia and the far Maghreb to independent Muslim
    // states, distinguishing its shape from the earlier Umayyad Caliphate
    polygon: [[10,33],[25,31],[31,30],[35,32],[41,37],[48,38],[52,37],[60,37],[67,40],[71,33],[68,28],[55,26],[48,28],[44,29],[40,20],[40,15],[35,21]],
  },
  {
    slug: "han-dynasty",
    name: "Han Dynasty",
    level: "medium",
    // Peak under Emperor Wu, ~100 BC — smaller than the later Qing Dynasty
    // (no Mongolia, Tibet, or Xinjiang as core territory)
    polygon: [[124,42],[118,40],[108,21],[100,22],[95,38],[85,42],[100,42],[115,45]],
  },
  {
    slug: "gupta-empire",
    name: "Gupta Empire",
    level: "medium",
    // Chandragupta II peak, ~400 AD (northern India only)
    polygon: [[70,24],[74,32],[80,30],[88,24],[85,20],[80,21],[75,22],[72,26]],
  },
  {
    slug: "safavid-empire",
    name: "Safavid Empire",
    level: "medium",
    // Stable peak ~1650 (Iran, Caucasus, Afghanistan)
    polygon: [[44,33],[48,40],[54,37],[61,37],[63,31],[61,27],[57,26],[50,29],[48,30]],
  },
  {
    slug: "austro-hungarian-empire",
    name: "Austro-Hungarian Empire",
    level: "medium",
    // 1914, on the eve of World War One
    polygon: [[16,49],[21,50],[26,48],[23,46],[22,44],[19,43],[18,42],[13,45],[10,47],[13,48],[15,51]],
  },
  {
    slug: "zulu-kingdom",
    name: "Zulu Kingdom",
    level: "medium",
    // Shaka's peak, ~1824
    polygon: [[32,-27],[32,-29],[31,-31],[30,-29],[29,-27],[30,-27],[31,-26],[31.5,-28]],
  },
  {
    slug: "timurid-empire",
    name: "Timurid Empire",
    level: "medium",
    // Peak 1405, under Timur (Tamerlane)
    polygon: [[38,38],[44,38],[48,40],[52,37],[60,40],[68,42],[75,40],[70,34],[73,30],[68,24],[57,26],[48,30],[42,33]],
  },
  {
    slug: "sassanid-empire",
    name: "Sassanid Empire",
    level: "medium",
    // Stable core territory ~550 AD (Khosrow I) — deliberately NOT the brief
    // 620s conquest of Egypt/Anatolia, to stay visually distinct from Achaemenid Persia
    polygon: [[44,36],[48,40],[54,38],[61,37],[65,33],[63,28],[61,26],[57,27],[50,29],[48,30],[44,31]],
  },
  {
    slug: "ethiopian-empire",
    name: "Ethiopian Empire",
    level: "medium",
    // Menelik II's peak, ~1900 — modern Ethiopia's borders, no Red Sea crossing
    // into Yemen (distinct from ancient Aksum's footprint)
    polygon: [[36,15],[40,15],[43,11],[44,9],[42,4],[36,4],[34,8],[35,12]],
  },
  {
    slug: "kingdom-of-kush",
    name: "Kingdom of Kush",
    level: "medium",
    // Meroitic-era core, ~300 BC-100 AD — the Nubian heartland alone, not the
    // brief 25th-Dynasty conquest of Egypt itself (kept distinct from Ancient Egypt)
    polygon: [[33,24],[33,20],[32,17],[34,16],[35,13],[32,12],[30,15],[31,19]],
  },
  {
    slug: "carthaginian-empire",
    name: "Carthaginian Empire",
    level: "medium",
    // ~265 BC, on the eve of the First Punic War — western tip pulled back
    // from Gibraltar to the Morocco/Algeria border area (GATE2 pixel-checked
    // the exact vertex to Nador, Morocco — comment corrected) since Barcid
    // Iberia wasn't conquered until after 237 BC, later than this date; the
    // fix's real requirement (stop well short of Gibraltar) is satisfied
    polygon: [[-3,35],[10,33],[10,37],[9,42]],
  },

  // ===================== HARD (16) =====================
  {
    slug: "khmer-empire",
    name: "Khmer Empire",
    level: "hard",
    // Peak under Jayavarman VII, ~1200 AD
    polygon: [[98,16],[99,7],[105,10],[109,13],[106,17],[100,19]],
  },
  {
    slug: "songhai-empire",
    name: "Songhai Empire",
    level: "hard",
    // Peak 1528, Askia Muhammad — the largest of the three big Sahel empires
    polygon: [[-16,15],[-12,17],[-8,20],[0,17],[3,15],[5,13],[2,10],[-2,11],[-6,12]],
  },
  {
    slug: "maratha-empire",
    name: "Maratha Empire",
    level: "hard",
    // Peak 1760, just before the Third Battle of Panipat
    polygon: [[77,29],[74,31],[70,23],[73,16],[76,13],[79,17],[82,20],[86,25],[81,26]],
  },
  {
    slug: "seleucid-empire",
    name: "Seleucid Empire",
    level: "hard",
    // Peak under Seleucus I, ~301 BC — smaller than Alexander's empire
    // (no Egypt, no Greece, ceded the Indus lands to the Mauryas)
    polygon: [[33,37],[36,32],[48,28],[57,26],[68,28],[70,33],[67,37]],
  },
  {
    slug: "visigothic-kingdom",
    name: "Visigothic Kingdom",
    level: "hard",
    // Peak ~580 AD under Leovigild (most of Iberia + Septimania in S. France)
    polygon: [[3,43],[-1,43],[-9,43],[-9,37],[-6,36],[-2,37],[0,40],[2,41]],
  },
  {
    slug: "silla-korea",
    name: "Silla Kingdom",
    level: "hard",
    // Unified Silla, ~700 AD
    polygon: [[125,37],[126,35],[127,34],[129,35],[129,38],[126,38]],
  },
  {
    slug: "ptolemaic-egypt",
    name: "Ptolemaic Egypt",
    level: "hard",
    // Peak under Ptolemy II, ~250 BC — reaches Cyprus/Aegean but has a much
    // shallower southern (Nubian) border than New Kingdom Egypt
    polygon: [[24,35],[25,31],[31,24],[35,33],[33,35],[27,37]],
  },
  {
    slug: "ghana-empire",
    name: "Ghana Empire",
    level: "hard",
    // Peak ~1050 AD (Wagadou) — the oldest and smallest of the great Sahel
    // trading empires, centered well west of modern Ghana
    polygon: [[-13,17],[-10,16],[-8,15],[-9,13],[-11,14.5],[-13,14],[-14,15.5],[-16,16]],
  },
  {
    slug: "srivijaya-empire",
    name: "Srivijaya Empire",
    level: "hard",
    // Peak ~800 AD — Sumatra-centered, smaller/further west than Majapahit
    polygon: [[95,5],[106,-6],[104,1],[103,3],[101,6],[100,7]],
  },
  {
    slug: "majapahit-empire",
    name: "Majapahit Empire",
    level: "hard",
    // Peak under Hayam Wuruk, ~1365 AD — Java-centered but claims stretch
    // much further east than Srivijaya ever did
    polygon: [[95,5],[104,1],[106,-6],[114,-8],[119,-8],[123,-9],[131,-3],[119,0],[117,3],[110,1],[103,3]],
  },
  {
    slug: "bulgarian-empire",
    name: "First Bulgarian Empire",
    level: "hard",
    // Peak under Simeon I, ~915 AD
    polygon: [[23,44],[26,45],[28,44],[27,42],[24,41],[21,40],[19,42],[20,44]],
  },
  {
    slug: "seljuk-empire",
    name: "Seljuk Empire",
    level: "hard",
    // Peak under Malik Shah I, ~1092 AD
    polygon: [[30,40],[35,32],[48,30],[63,28],[73,35],[68,40]],
  },
  {
    slug: "kingdom-of-aksum",
    name: "Kingdom of Aksum",
    level: "hard",
    // Peak under King Ezana, ~350 AD — notable for crossing the Red Sea
    // into Yemen, unlike the later Ethiopian Empire
    polygon: [[36,10],[39,7],[42,9],[44,15],[43,17],[39,18]],
  },
  {
    slug: "toltec-empire",
    name: "Toltec Empire",
    level: "hard",
    // Peak ~1000 AD — a much smaller, compact core than the later Aztec Empire
    polygon: [[-99.5,20.5],[-98.5,20],[-98,21],[-99,19],[-99.5,19.5],[-100.5,19.5],[-100,20],[-99,21.5]],
  },
  {
    slug: "hittite-empire",
    name: "Hittite Empire",
    level: "hard",
    // Peak under Suppiluliuma I, ~1320 BC
    polygon: [[32,40],[36,41],[38,39],[40,37],[37,36],[35,35],[30,37],[28,39]],
  },
  {
    slug: "benin-empire",
    name: "Benin Empire",
    level: "hard",
    // Peak ~1550 AD — a compact coastal state, smaller than the neighboring
    // (and later) Oyo Empire
    polygon: [[5,6],[6,6.5],[6.3,5.8],[6.5,6],[7,5.5],[6,7],[5.5,6.5],[5.3,6.2]],
  },

  // ===================== IMPOSSIBLE (18) =====================
  {
    slug: "kanem-bornu-empire",
    name: "Kanem-Bornu Empire",
    level: "impossible",
    // Peak under Mai Idris Aluma, ~1580 AD
    polygon: [[13,14],[15,13],[14,10],[12,12],[10,14],[11,17],[13,18],[16,17]],
  },
  {
    slug: "ghaznavid-empire",
    name: "Ghaznavid Empire",
    level: "impossible",
    // Peak under Mahmud of Ghazni, ~1030 AD
    polygon: [[54,33],[62,29],[72,25],[76,29],[75,31],[71,34],[66,37],[61,36]],
  },
  {
    slug: "chola-empire",
    name: "Chola Empire",
    level: "impossible",
    // Peak under Rajendra I, ~1030 AD (south India + conquered Sri Lanka).
    // Explicit Sri Lanka-spanning vertices added after GATE1 found the
    // earlier convex-hull fix's thin southern edge left the island out of
    // the rendered fill entirely.
    polygon: [[76,10],[80,6],[80.2,5.9],[81.5,6.3],[80,16],[78,15]],
  },
  {
    slug: "vijayanagara-empire",
    name: "Vijayanagara Empire",
    level: "impossible",
    // Peak under Krishnadevaraya, ~1525 AD
    polygon: [[74,17],[76,20],[79,18],[80,15],[80,10],[79,8],[76,8],[75,12]],
  },
  {
    slug: "mutapa-empire",
    name: "Mutapa Empire",
    level: "impossible",
    // Peak ~1500 AD, successor to the Great Zimbabwe civilization
    polygon: [[31,-16],[33,-16],[34,-19],[32,-22],[29,-21],[28,-18],[29,-16],[30.5,-19]],
  },
  {
    slug: "wari-empire",
    name: "Wari Empire",
    level: "impossible",
    // Peak ~600-800 AD, pre-Inca Peru
    polygon: [[-79,-7],[-77,-11],[-71,-17],[-72,-14],[-79,-6]],
  },
  {
    slug: "tiwanaku-empire",
    name: "Tiwanaku Empire",
    level: "impossible",
    // Peak ~800 AD, Lake Titicaca basin and beyond
    polygon: [[-69,-15],[-68,-16],[-70,-17],[-70,-20],[-67,-19],[-66,-22],[-65,-17],[-68,-14]],
  },
  {
    slug: "funan-kingdom",
    name: "Funan Kingdom",
    level: "impossible",
    // Peak ~500 AD, Mekong Delta
    polygon: [[104.5,10.5],[105.5,11],[106,10],[104,9.5],[103,10.5],[102.5,11],[104,12],[105,13]],
  },
  {
    slug: "oyo-empire",
    name: "Oyo Empire",
    level: "impossible",
    // Peak ~1700 AD (Yoruba savanna empire, larger than neighboring Benin)
    polygon: [[2,7],[1.5,8],[3.5,9],[4,8],[5,7],[4.5,6],[3,6.5],[3,8]],
  },
  {
    slug: "ashanti-empire",
    name: "Ashanti Empire",
    level: "impossible",
    // Peak ~1800 AD
    polygon: [[-3,7],[-1,6],[0,7],[-1,9],[-2,10],[-5,9],[-4,7],[-4,5]],
  },
  {
    slug: "kingdom-of-kongo",
    name: "Kingdom of Kongo",
    level: "impossible",
    // Peak ~1500 AD
    polygon: [[12,-4],[13,-5],[14,-5],[16,-6],[15,-9],[13,-10],[12,-9],[12,-7]],
  },
  {
    slug: "rashtrakuta-empire",
    name: "Rashtrakuta Empire",
    level: "impossible",
    // Peak under Krishna III, ~960 AD — centered further north/west in the
    // Deccan than the later Vijayanagara Empire
    polygon: [[73,22],[76,24],[77,18],[80,17],[78,13],[75,13],[73,16],[74,19]],
  },
  {
    slug: "pala-empire",
    name: "Pala Empire",
    level: "impossible",
    // Peak under Dharmapala, ~800 AD (Bengal/Bihar, with a claim on Kannauj)
    polygon: [[80,27],[87,22],[89,25],[88,26],[83,29]],
  },
  {
    slug: "xiongnu-confederation",
    name: "Xiongnu Empire",
    level: "impossible",
    // Peak under Modu Chanyu, ~200 BC
    polygon: [[110,50],[95,52],[80,48],[70,44],[85,42],[100,40],[115,42],[125,45]],
  },
  {
    slug: "avar-khaganate",
    name: "Avar Khaganate",
    level: "impossible",
    // Peak ~600 AD, Carpathian Basin
    polygon: [[16,48],[18,47],[22,49],[26,47],[22,44],[19,43],[15,46],[20,46]],
  },
  {
    slug: "chimu-empire",
    name: "Chimu Empire",
    level: "impossible",
    // Peak ~1470 AD, under Minchancaman, just before the Inca conquest.
    // Replaces the originally-planned Tu'i Tonga Empire (2026-09-03, post-
    // GATE1): Tonga/Samoa's real landmasses are so tiny that no basemap
    // resolution reasonable for this pipeline renders them as more than a
    // few stray pixels, and the empire's remoteness meant no other land was
    // ever going to be in frame either — a genuine format mismatch, not a
    // fixable coordinate bug, so it was swapped for a comparably-obscure but
    // land-based empire instead (thin north-coast-Peru strip, easy to give
    // real geographic context).
    polygon: [[-80.5,-3.4],[-79.9,-5.0],[-78.9,-8.1],[-77.2,-11.4],[-76.9,-12.0],[-78.2,-10.5],[-79.8,-6.5]],
  },
  {
    slug: "gokturk-khaganate",
    name: "Gokturk Khaganate",
    level: "impossible",
    // Peak ~576 AD (First Turkic Khaganate)
    polygon: [[125,45],[110,50],[90,52],[70,45],[55,44],[48,42],[65,38],[85,40],[100,42]],
  },
  {
    slug: "sokoto-caliphate",
    name: "Sokoto Caliphate",
    level: "impossible",
    // Peak ~1850 AD
    polygon: [[3,14],[6,13],[8,12],[10,10],[13,10],[12,7],[6,9],[4,12]],
  },
];
