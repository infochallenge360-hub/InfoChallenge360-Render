// Episode 17 "Guess the Desert" — 71 items, absolute-difficulty calibrated.
// Answer = country (not desert name) — engine nameField is "country", matching the
// established Country-by-Food (E08) / Capital Cities (E10) / Tourist Spots (E13) /
// Mountains (E14) / Islands (E15) / Volcanoes (E16) pattern. For multi-country
// deserts the answer is the country most strongly tourism/culturally associated
// (e.g. Sahara -> Algeria here, distinct from E13's Sahara-Morocco tourist-spot entry).
// Deliberately distinct from E13 "Tourist Destinations" (Sahara Desert/Morocco, Wahiba
// Sands/Oman, Wadi Rum/Jordan, Huacachina/Peru, Lencois Maranhenses/Brazil, Danakil
// Depression/Ethiopia all excluded) and E14 "Mountains" (Mount Tahat/Hoggar-Algeria,
// Emi Koussi/Tibesti-Chad excluded; Chad instead represented via the separate Ennedi
// Plateau massif). Note: the generic "Sahara Desert" name itself is intentionally NOT
// reused even with a different country attribution (Algeria) — swapped for the Grand
// Erg Oriental, a distinctly-named Algerian dune sea, to avoid a literal item-name
// repeat so soon after E13's Sahara/Morocco entry. No Israel/Jerusalem/West Bank/Gaza — the Negev Desert (Israel) is
// deliberately excluded entirely. No disputed-territory ambiguity: Great Rann of Kutch
// (India) and La Guajira (Colombia) sit near historical borders but both were settled
// by binding arbitration decades ago, not currently disputed.
// No country repeats within any single tier (MC distractors are drawn from the same
// tier) — verified programmatically. Same country CAN recur across different tiers
// (e.g. Iran: Dasht-e Lut-easy / Dasht-e Kavir-medium / Varzaneh Desert-hard, all
// genuinely distinct named deserts).
export const DESERTS_E17 = [
  // EASY (18)
  { slug: "grand-erg-oriental-algeria", name: "Grand Erg Oriental", country: "Algeria", level: "easy" },
  { slug: "death-valley-usa", name: "Death Valley", country: "United States", level: "easy" },
  { slug: "namib-desert-namibia", name: "Namib Desert", country: "Namibia", level: "easy" },
  { slug: "atacama-desert-chile", name: "Atacama Desert", country: "Chile", level: "easy" },
  { slug: "gobi-desert-mongolia", name: "Gobi Desert", country: "Mongolia", level: "easy" },
  { slug: "salar-de-uyuni-bolivia", name: "Salar de Uyuni", country: "Bolivia", level: "easy" },
  { slug: "arabian-desert-saudi-arabia", name: "Arabian Desert", country: "Saudi Arabia", level: "easy" },
  { slug: "thar-desert-india", name: "Thar Desert", country: "India", level: "easy" },
  { slug: "kalahari-desert-botswana", name: "Kalahari Desert", country: "Botswana", level: "easy" },
  { slug: "taklamakan-desert-china", name: "Taklamakan Desert", country: "China", level: "easy" },
  { slug: "karakum-desert-turkmenistan", name: "Karakum Desert", country: "Turkmenistan", level: "easy" },
  { slug: "chihuahuan-desert-mexico", name: "Chihuahuan Desert", country: "Mexico", level: "easy" },
  { slug: "patagonian-desert-argentina", name: "Patagonian Desert", country: "Argentina", level: "easy" },
  { slug: "richat-structure-mauritania", name: "Richat Structure", country: "Mauritania", level: "easy" },
  { slug: "great-victoria-desert-australia", name: "Great Victoria Desert", country: "Australia", level: "easy" },
  { slug: "white-desert-egypt", name: "White Desert", country: "Egypt", level: "easy" },
  { slug: "dasht-e-lut-iran", name: "Dasht-e Lut", country: "Iran", level: "easy" },
  { slug: "karoo-south-africa", name: "Karoo", country: "South Africa", level: "easy" },

  // MEDIUM (18)
  { slug: "mojave-desert-usa", name: "Mojave Desert", country: "United States", level: "medium" },
  { slug: "great-rann-of-kutch-india", name: "Great Rann of Kutch", country: "India", level: "medium" },
  { slug: "sinai-desert-egypt", name: "Sinai Desert", country: "Egypt", level: "medium" },
  { slug: "simpson-desert-australia", name: "Simpson Desert", country: "Australia", level: "medium" },
  { slug: "badain-jaran-desert-china", name: "Badain Jaran Desert", country: "China", level: "medium" },
  { slug: "syrian-desert-syria", name: "Syrian Desert", country: "Syria", level: "medium" },
  { slug: "kyzylkum-desert-uzbekistan", name: "Kyzylkum Desert", country: "Uzbekistan", level: "medium" },
  { slug: "makgadikgadi-pan-botswana", name: "Makgadikgadi Pan", country: "Botswana", level: "medium" },
  { slug: "rub-al-khali-saudi-arabia", name: "Rub' al Khali", country: "Saudi Arabia", level: "medium" },
  { slug: "nubian-desert-sudan", name: "Nubian Desert", country: "Sudan", level: "medium" },
  { slug: "nazca-desert-peru", name: "Nazca Desert", country: "Peru", level: "medium" },
  { slug: "valle-de-la-luna-chile", name: "Valle de la Luna", country: "Chile", level: "medium" },
  { slug: "great-sand-sea-libya", name: "Great Sand Sea", country: "Libya", level: "medium" },
  { slug: "liwa-desert-uae", name: "Liwa Desert", country: "United Arab Emirates", level: "medium" },
  { slug: "tabernas-desert-spain", name: "Tabernas Desert", country: "Spain", level: "medium" },
  { slug: "tenere-desert-niger", name: "Ténéré Desert", country: "Niger", level: "medium" },
  { slug: "dasht-e-kavir-iran", name: "Dasht-e Kavir", country: "Iran", level: "medium" },
  { slug: "khongoryn-els-mongolia", name: "Khongoryn Els", country: "Mongolia", level: "medium" },

  // HARD (18)
  { slug: "white-sands-usa", name: "White Sands", country: "United States", level: "hard" },
  { slug: "pinnacles-desert-australia", name: "Pinnacles Desert", country: "Australia", level: "hard" },
  { slug: "chott-el-djerid-tunisia", name: "Chott el Djerid", country: "Tunisia", level: "hard" },
  { slug: "black-desert-egypt", name: "Black Desert", country: "Egypt", level: "hard" },
  { slug: "registan-desert-afghanistan", name: "Registan Desert", country: "Afghanistan", level: "hard" },
  { slug: "salvador-dali-desert-bolivia", name: "Salvador Dalí Desert", country: "Bolivia", level: "hard" },
  { slug: "monte-desert-argentina", name: "Monte Desert", country: "Argentina", level: "hard" },
  { slug: "carcross-desert-canada", name: "Carcross Desert", country: "Canada", level: "hard" },
  { slug: "sechura-desert-peru", name: "Sechura Desert", country: "Peru", level: "hard" },
  { slug: "la-guajira-desert-colombia", name: "La Guajira Desert", country: "Colombia", level: "hard" },
  { slug: "bardenas-reales-spain", name: "Bardenas Reales", country: "Spain", level: "hard" },
  { slug: "gran-desierto-de-altar-mexico", name: "Gran Desierto de Altar", country: "Mexico", level: "hard" },
  { slug: "khor-al-adaid-qatar", name: "Khor Al Adaid", country: "Qatar", level: "hard" },
  { slug: "cholistan-desert-pakistan", name: "Cholistan Desert", country: "Pakistan", level: "hard" },
  { slug: "chalbi-desert-kenya", name: "Chalbi Desert", country: "Kenya", level: "hard" },
  { slug: "skeleton-coast-namibia", name: "Skeleton Coast", country: "Namibia", level: "hard" },
  { slug: "ubari-sand-sea-libya", name: "Ubari Sand Sea", country: "Libya", level: "hard" },
  { slug: "varzaneh-desert-iran", name: "Varzaneh Desert", country: "Iran", level: "hard" },

  // IMPOSSIBLE (17)
  { slug: "sonoran-desert-usa", name: "Sonoran Desert", country: "United States", level: "impossible" },
  { slug: "great-sandy-desert-australia", name: "Great Sandy Desert", country: "Australia", level: "impossible" },
  { slug: "betpak-dala-kazakhstan", name: "Betpak-Dala", country: "Kazakhstan", level: "impossible" },
  { slug: "ennedi-plateau-chad", name: "Ennedi Plateau", country: "Chad", level: "impossible" },
  { slug: "bayuda-desert-sudan", name: "Bayuda Desert", country: "Sudan", level: "impossible" },
  { slug: "kumtag-desert-china", name: "Kumtag Desert", country: "China", level: "impossible" },
  { slug: "kharan-desert-pakistan", name: "Kharan Desert", country: "Pakistan", level: "impossible" },
  { slug: "ad-dahna-desert-saudi-arabia", name: "Ad-Dahna Desert", country: "Saudi Arabia", level: "impossible" },
  { slug: "medanos-de-coro-venezuela", name: "Médanos de Coro", country: "Venezuela", level: "impossible" },
  { slug: "chara-sands-russia", name: "Chara Sands", country: "Russia", level: "impossible" },
  { slug: "grand-bara-desert-djibouti", name: "Grand Bara Desert", country: "Djibouti", level: "impossible" },
  { slug: "guban-somalia", name: "Guban", country: "Somalia", level: "impossible" },
  { slug: "erg-chech-mali", name: "Erg Chech", country: "Mali", level: "impossible" },
  { slug: "issaouane-erg-algeria", name: "Issaouane Erg", country: "Algeria", level: "impossible" },
  { slug: "vizcaino-desert-mexico", name: "Vizcaíno Desert", country: "Mexico", level: "impossible" },
  { slug: "maranjab-desert-iran", name: "Maranjab Desert", country: "Iran", level: "impossible" },
  { slug: "gilf-kebir-egypt", name: "Gilf Kebir", country: "Egypt", level: "impossible" },
];
