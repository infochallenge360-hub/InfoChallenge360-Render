// E65 "Guess the Phone" — 70 real phone models spanning all major brands and eras
// (1984 Motorola DynaTAC through 2019 Samsung Galaxy Fold). Photo = product image.
// Absolute difficulty: independently calibrated on global visual recognizability of
// the phone itself (not brand fame) — a famous brand can still have an obscure model.
// Zero Israel content (standing hard rule, all episodes).
export const PHONES_E65 = [
  // EASY (18)
  { slug: "apple-iphone-2007", name: "iPhone (2007)", brand: "Apple", year: 2007, wiki: "IPhone (1st generation)", level: "easy" },
  { slug: "nokia-3310", name: "Nokia 3310", brand: "Nokia", year: 2000, wiki: "Nokia 3310", level: "easy" },
  { slug: "motorola-razr-v3", name: "Motorola Razr V3", brand: "Motorola", year: 2004, wiki: "Motorola Razr V3", level: "easy" },
  { slug: "motorola-dynatac-8000x", name: "Motorola DynaTAC 8000X", brand: "Motorola", year: 1984, wiki: "Motorola DynaTAC", level: "easy" },
  { slug: "apple-iphone-4", name: "Apple iPhone 4", brand: "Apple", year: 2010, wiki: "IPhone 4", level: "easy" },
  { slug: "samsung-galaxy-fold", name: "Samsung Galaxy Fold", brand: "Samsung", year: 2019, wiki: "Samsung Galaxy Fold", level: "easy" },
  { slug: "motorola-startac", name: "Motorola StarTAC", brand: "Motorola", year: 1996, wiki: "Motorola StarTAC", level: "easy" },
  { slug: "nokia-8110", name: "Nokia 8110", brand: "Nokia", year: 1996, wiki: "Nokia 8110", level: "easy" },
  { slug: "samsung-galaxy-s-iii", name: "Samsung Galaxy S III", brand: "Samsung", year: 2012, wiki: "Samsung Galaxy S III", level: "easy" },
  { slug: "danger-t-mobile-sidekick", name: "T-Mobile Sidekick", brand: "Danger/T-Mobile", year: 2002, wiki: "T-Mobile Sidekick", level: "easy" },
  { slug: "nokia-n95", name: "Nokia N95", brand: "Nokia", year: 2007, wiki: "Nokia N95", level: "easy" },
  { slug: "samsung-galaxy-note-2011", name: "Samsung Galaxy Note", brand: "Samsung", year: 2011, wiki: "Samsung Galaxy Note (1st generation)", level: "easy" },
  { slug: "lg-chocolate-kg800", name: "LG Chocolate", brand: "LG", year: 2006, wiki: "LG Chocolate", level: "easy" },
  { slug: "nokia-3210", name: "Nokia 3210", brand: "Nokia", year: 1999, wiki: "Nokia 3210", level: "easy" },
  { slug: "htc-dream-t-mobile-g1", name: "HTC Dream", brand: "HTC", year: 2008, wiki: "HTC Dream", level: "easy" },
  { slug: "nokia-n-gage", name: "Nokia N-Gage", brand: "Nokia", year: 2003, wiki: "N-Gage", level: "easy" },
  { slug: "nokia-5110", name: "Nokia 5110", brand: "Nokia", year: 1998, wiki: "Nokia 5110", level: "easy" },
  { slug: "blackberry-bold-9000", name: "BlackBerry Bold", brand: "BlackBerry", year: 2008, wiki: "BlackBerry Bold", level: "easy" },

  // MEDIUM (18)
  { slug: "samsung-galaxy-s-2010", name: "Samsung Galaxy S", brand: "Samsung", year: 2010, wiki: "Samsung Galaxy S (2010 smartphone)", level: "medium" },
  { slug: "nokia-6110", name: "Nokia 6110", brand: "Nokia", year: 1997, wiki: "Nokia 6110", level: "medium" },
  { slug: "blackberry-pearl-8100", name: "BlackBerry Pearl", brand: "BlackBerry", year: 2006, wiki: "BlackBerry Pearl", level: "medium" },
  { slug: "nokia-1100", name: "Nokia 1100", brand: "Nokia", year: 2003, wiki: "Nokia 1100", level: "medium" },
  { slug: "sony-ericsson-t610", name: "Sony Ericsson T610", brand: "Sony Ericsson", year: 2003, wiki: "Sony Ericsson T610", level: "medium" },
  { slug: "sony-ericsson-w800", name: "Sony Ericsson W800", brand: "Sony Ericsson", year: 2005, wiki: "Sony Ericsson W800", level: "medium" },
  { slug: "google-pixel-2016", name: "Google Pixel", brand: "Google", year: 2016, wiki: "Pixel (1st generation)", level: "medium" },
  { slug: "nokia-e71", name: "Nokia E71", brand: "Nokia", year: 2008, wiki: "Nokia E71", level: "medium" },
  { slug: "ericsson-t28s", name: "Ericsson T28s", brand: "Ericsson", year: 1999, wiki: "Ericsson T28s", level: "medium" },
  { slug: "htc-one-m7", name: "HTC One", brand: "HTC", year: 2013, wiki: "HTC One (M7)", level: "medium" },
  { slug: "huawei-p20-pro", name: "Huawei P20 Pro", brand: "Huawei", year: 2018, wiki: "Huawei P20 Pro", level: "medium" },
  { slug: "google-nexus-one", name: "Google Nexus One", brand: "Google", year: 2010, wiki: "Nexus One", level: "medium" },
  { slug: "palm-treo-650", name: "Palm Treo 650", brand: "Palm", year: 2004, wiki: "Treo 650", level: "medium" },
  { slug: "blackberry-storm", name: "BlackBerry Storm", brand: "BlackBerry", year: 2008, wiki: "BlackBerry Storm", level: "medium" },
  { slug: "palm-pre", name: "Palm Pre", brand: "Palm", year: 2009, wiki: "Palm Pre", level: "medium" },
  { slug: "sony-xperia-z", name: "Sony Xperia Z", brand: "Sony", year: 2013, wiki: "Sony Xperia Z", level: "medium" },
  { slug: "oneplus-one", name: "OnePlus One", brand: "OnePlus", year: 2014, wiki: "OnePlus One", level: "medium" },
  { slug: "nokia-2110", name: "Nokia 2110", brand: "Nokia", year: 1992, wiki: "Nokia 2110", level: "medium" },

  // HARD (18)
  { slug: "oneplus-7-pro", name: "OnePlus 7 Pro", brand: "OnePlus", year: 2019, wiki: "OnePlus 7 Pro", level: "hard" },
  { slug: "lg-prada-ke850", name: "LG Prada", brand: "LG", year: 2007, wiki: "LG Prada", level: "hard" },
  { slug: "sony-ericsson-p900", name: "Sony Ericsson P900", brand: "Sony Ericsson", year: 2003, wiki: "Sony Ericsson P900", level: "hard" },
  { slug: "blackberry-passport", name: "BlackBerry Passport", brand: "BlackBerry", year: 2014, wiki: "BlackBerry Passport", level: "hard" },
  { slug: "nokia-3650", name: "Nokia 3650", brand: "Nokia", year: 2002, wiki: "Nokia 3650", level: "hard" },
  { slug: "htc-touch-diamond", name: "HTC Touch Diamond", brand: "HTC", year: 2008, wiki: "HTC Touch Diamond", level: "hard" },
  { slug: "sony-ericsson-xperia-x1", name: "Sony Ericsson Xperia X1", brand: "Sony Ericsson", year: 2008, wiki: "Sony Ericsson Xperia X1", level: "hard" },
  { slug: "ericsson-r380s", name: "Ericsson R380s", brand: "Ericsson", year: 2000, wiki: "Ericsson R380", level: "hard" },
  { slug: "xiaomi-mi-1", name: "Xiaomi Mi 1", brand: "Xiaomi", year: 2011, wiki: "Xiaomi Mi 1", level: "hard" },
  { slug: "sony-ericsson-xperia-play", name: "Sony Ericsson Xperia Play", brand: "Sony Ericsson", year: 2011, wiki: "Xperia Play", level: "hard" },
  { slug: "nokia-n9", name: "Nokia N9", brand: "Nokia", year: 2011, wiki: "Nokia N9", level: "hard" },
  { slug: "amazon-fire-phone", name: "Amazon Fire Phone", brand: "Amazon", year: 2014, wiki: "Fire Phone", level: "hard" },
  { slug: "lg-g-flex", name: "LG G Flex", brand: "LG", year: 2013, wiki: "LG G Flex", level: "hard" },
  { slug: "motorola-rokr-e1", name: "Motorola ROKR E1", brand: "Motorola", year: 2005, wiki: "Motorola Rokr E1", level: "hard" },
  { slug: "lg-env-vx9900", name: "LG enV", brand: "LG", year: 2006, wiki: "LG enV (VX9900)", level: "hard" },
  { slug: "htc-touch", name: "HTC Touch", brand: "HTC", year: 2007, wiki: "HTC Touch", level: "hard" },
  { slug: "huawei-ascend-mate", name: "Huawei Ascend Mate", brand: "Huawei", year: 2013, wiki: "Huawei Ascend Mate", level: "hard" },
  { slug: "zte-blade-v880", name: "ZTE Blade V880", brand: "ZTE", year: 2010, wiki: "ZTE Blade V880", level: "hard" },

  // IMPOSSIBLE (16)
  { slug: "motorola-v70", name: "Motorola V70", brand: "Motorola", year: 2002, wiki: "Motorola V70", level: "impossible" },
  { slug: "palm-centro", name: "Palm Centro", brand: "Palm", year: 2007, wiki: "Palm Centro", level: "impossible" },
  { slug: "nokia-asha-501", name: "Nokia Asha 501", brand: "Nokia", year: 2013, wiki: "Nokia Asha 501", level: "impossible" },
  { slug: "siemens-s55", name: "Siemens S55", brand: "Siemens", year: 2002, wiki: "Siemens S55", level: "impossible" },
  { slug: "motorola-i860", name: "Motorola i860", brand: "Motorola", year: 2004, wiki: "Motorola i860", level: "impossible" },
  { slug: "motorola-aura", name: "Motorola Aura", brand: "Motorola", year: 2008, wiki: "Motorola Aura", level: "impossible" },
  { slug: "essential-phone-ph-1", name: "Essential Phone", brand: "Essential", year: 2017, wiki: "Essential Phone", level: "impossible" },
  { slug: "nokia-7280", name: "Nokia 7280", brand: "Nokia", year: 2004, wiki: "Nokia 7280", level: "impossible" },
  { slug: "siemens-sx1", name: "Siemens SX1", brand: "Siemens", year: 2003, wiki: "Siemens SX1", level: "impossible" },
  { slug: "motorola-cliq", name: "Motorola Cliq", brand: "Motorola", year: 2009, wiki: "Motorola Cliq", level: "impossible" },
  { slug: "alcatel-one-touch-300", name: "Alcatel One Touch 300", brand: "Alcatel", year: 2000, wiki: "Alcatel One Touch 300", level: "impossible" },
  { slug: "sagem-myx-7", name: "Sagem myX-7", brand: "Sagem", year: 2003, wiki: "Sagem myX-7", level: "impossible" },
  { slug: "ericsson-r310s", name: "Ericsson R310s", brand: "Ericsson", year: 2001, wiki: "Ericsson R310s", level: "impossible" },
  { slug: "kyocera-6035", name: "Kyocera 6035", brand: "Kyocera", year: 2000, wiki: "Kyocera 6035", level: "impossible" },
  { slug: "sharp-j-sh04", name: "Sharp J-SH04", brand: "Sharp", year: 2000, wiki: "J-SH04", level: "impossible" },
  { slug: "samsung-sgh-t100", name: "Samsung SGH-T100", brand: "Samsung", year: 2002, wiki: "Samsung SGH-T100", level: "impossible" },

];

export default PHONES_E65;