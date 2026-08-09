// E66 "Guess the Apple Device" — 70 real Apple products spanning all product lines
// (1976 Apple I through 2024 Vision Pro). Photo = product image.
// Excludes iPhone (2007) and iPhone 4 — both already used in E65 Guess the Phone.
// Absolute difficulty: independently calibrated on global visual recognizability of
// the specific product (not brand fame) — a famous line can still have an obscure model.
// Zero Israel content (standing hard rule, all episodes).
export const APPLE_E66 = [
  // EASY (18)
  { slug: "airpods-1st-generation", name: "AirPods (1st generation)", line: "AirPods", year: 2016, wiki: "AirPods (1st generation)", level: "easy" },
  { slug: "iphone-x", name: "iPhone X", line: "iPhone", year: 2017, wiki: "IPhone X", level: "easy" },
  { slug: "apple-watch-1st-generation", name: "Apple Watch (1st generation)", line: "Apple Watch", year: 2015, wiki: "Apple Watch (1st generation)", level: "easy" },
  { slug: "iphone-6", name: "iPhone 6", line: "iPhone", year: 2014, wiki: "IPhone 6", level: "easy" },
  { slug: "iphone-11", name: "iPhone 11", line: "iPhone", year: 2019, wiki: "IPhone 11", level: "easy" },
  { slug: "airpods-pro", name: "AirPods Pro", line: "AirPods", year: 2019, wiki: "AirPods Pro", level: "easy" },
  { slug: "ipad-1st-generation", name: "iPad (1st generation)", line: "iPad", year: 2010, wiki: "IPad (1st generation)", level: "easy" },
  { slug: "iphone-12", name: "iPhone 12", line: "iPhone", year: 2020, wiki: "IPhone 12", level: "easy" },
  { slug: "imac-g3", name: "iMac G3", line: "Mac", year: 1998, wiki: "IMac G3", level: "easy" },
  { slug: "macbook-air-2008", name: "MacBook Air (2008)", line: "Mac laptop", year: 2008, wiki: "MacBook Air (Intel-based)", level: "easy" },
  { slug: "iphone-14-pro", name: "iPhone 14 Pro", line: "iPhone", year: 2022, wiki: "IPhone 14 Pro", level: "easy" },
  { slug: "macintosh-128k", name: "Macintosh 128K", line: "Mac", year: 1984, wiki: "Macintosh 128K", level: "easy" },
  { slug: "macbook-pro-2021-m1-pro", name: "MacBook Pro (2021, M1 Pro)", line: "Mac laptop", year: 2021, wiki: "MacBook Pro (Apple silicon)", level: "easy" },
  { slug: "ipad-10th-generation", name: "iPad (10th generation)", line: "iPad", year: 2022, wiki: "IPad (10th generation)", level: "easy" },
  { slug: "imac-2021-m1", name: "iMac (2021, M1)", line: "Mac", year: 2021, wiki: "IMac (Apple silicon)", level: "easy" },
  { slug: "ipod-1st-generation", name: "iPod (1st generation)", line: "iPod", year: 2001, wiki: "IPod (1st generation)", level: "easy" },
  { slug: "apple-watch-ultra", name: "Apple Watch Ultra", line: "Apple Watch", year: 2022, wiki: "Apple Watch Ultra", level: "easy" },
  { slug: "macbook-pro-2016-touch-bar", name: "MacBook Pro (2016, Touch Bar)", line: "Mac laptop", year: 2016, wiki: "MacBook Pro (Intel-based)", level: "easy" },

  // MEDIUM (18)
  { slug: "ipad-pro-3rd-generation", name: "iPad Pro (3rd generation)", line: "iPad", year: 2018, wiki: "IPad Pro (3rd generation)", level: "medium" },
  { slug: "macbook-2006-white", name: "MacBook (2006, white)", line: "Mac laptop", year: 2006, wiki: "MacBook (2006–2012)", level: "medium" },
  { slug: "macbook-air-2020-m1", name: "MacBook Air (2020, M1)", line: "Mac laptop", year: 2020, wiki: "MacBook Air (Apple silicon)", level: "medium" },
  { slug: "ipod-classic", name: "iPod Classic", line: "iPod", year: 2007, wiki: "IPod Classic", level: "medium" },
  { slug: "ipod-touch-1st-generation", name: "iPod touch (1st generation)", line: "iPod", year: 2007, wiki: "IPod Touch (1st generation)", level: "medium" },
  { slug: "ipod-nano-1st-generation", name: "iPod nano (1st generation)", line: "iPod", year: 2005, wiki: "IPod Nano (1st generation)", level: "medium" },
  { slug: "airpods-max", name: "AirPods Max", line: "AirPods", year: 2020, wiki: "AirPods Max", level: "medium" },
  { slug: "iphone-3g", name: "iPhone 3G", line: "iPhone", year: 2008, wiki: "IPhone 3G", level: "medium" },
  { slug: "imac-g4", name: "iMac G4", line: "Mac", year: 2002, wiki: "IMac G4", level: "medium" },
  { slug: "ipod-mini", name: "iPod Mini", line: "iPod", year: 2004, wiki: "IPod Mini", level: "medium" },
  { slug: "apple-watch-series-4", name: "Apple Watch Series 4", line: "Apple Watch", year: 2018, wiki: "Apple Watch Series 4", level: "medium" },
  { slug: "iphone-5", name: "iPhone 5", line: "iPhone", year: 2012, wiki: "IPhone 5", level: "medium" },
  { slug: "ipad-mini-1st-generation", name: "iPad mini (1st generation)", line: "iPad", year: 2012, wiki: "IPad Mini (1st generation)", level: "medium" },
  { slug: "mac-mini-2020-m1", name: "Mac mini (2020, M1)", line: "Mac", year: 2020, wiki: "Mac Mini", level: "medium" },
  { slug: "apple-tv-4k", name: "Apple TV 4K", line: "Apple TV", year: 2021, wiki: "Apple TV 4K", level: "medium" },
  { slug: "ipad-air-1st-generation", name: "iPad Air (1st generation)", line: "iPad", year: 2013, wiki: "IPad Air (1st generation)", level: "medium" },
  { slug: "macbook-pro-2008-unibody", name: "MacBook Pro (2008, unibody)", line: "Mac laptop", year: 2008, wiki: "MacBook Pro (Intel-based)", level: "medium" },
  { slug: "ipod-shuffle-1st-generation", name: "iPod shuffle (1st generation)", line: "iPod", year: 2005, wiki: "IPod Shuffle (1st generation)", level: "medium" },

  // HARD (18)
  { slug: "ibook-clamshell", name: "iBook (Clamshell)", line: "Mac laptop", year: 1999, wiki: "IBook", level: "hard" },
  { slug: "apple-vision-pro", name: "Apple Vision Pro", line: "Other", year: 2024, wiki: "Apple Vision Pro", level: "hard" },
  { slug: "ipad-mini-6th-generation", name: "iPad mini (6th generation)", line: "iPad", year: 2021, wiki: "IPad Mini (6th generation)", level: "hard" },
  { slug: "mac-pro-2006", name: "Mac Pro (2006)", line: "Mac", year: 2006, wiki: "Mac Pro (2006–2012)", level: "hard" },
  { slug: "powerbook-g4-titanium", name: "PowerBook G4 (Titanium)", line: "Mac laptop", year: 2001, wiki: "PowerBook G4", level: "hard" },
  { slug: "homepod", name: "HomePod", line: "Other", year: 2018, wiki: "HomePod", level: "hard" },
  { slug: "ipod-nano-6th-generation", name: "iPod nano (6th generation)", line: "iPod", year: 2010, wiki: "IPod Nano (6th generation)", level: "hard" },
  { slug: "apple-tv-1st-generation", name: "Apple TV (1st generation)", line: "Apple TV", year: 2007, wiki: "Apple TV (1st generation)", level: "hard" },
  { slug: "power-mac-g4-cube", name: "Power Mac G4 Cube", line: "Mac", year: 2000, wiki: "Power Mac G4 Cube", level: "hard" },
  { slug: "mac-pro-2019", name: "Mac Pro (2019)", line: "Mac", year: 2019, wiki: "Mac Pro (2019)", level: "hard" },
  { slug: "apple-pencil-1st-generation", name: "Apple Pencil (1st generation)", line: "Other", year: 2015, wiki: "Apple Pencil", level: "hard" },
  { slug: "imac-pro", name: "iMac Pro", line: "Mac", year: 2017, wiki: "IMac Pro", level: "hard" },
  { slug: "mac-studio", name: "Mac Studio", line: "Mac", year: 2022, wiki: "Mac Studio", level: "hard" },
  { slug: "macintosh-se", name: "Macintosh SE", line: "Mac", year: 1987, wiki: "Macintosh SE", level: "hard" },
  { slug: "emac", name: "eMac", line: "Mac", year: 2002, wiki: "EMac", level: "hard" },
  { slug: "powerbook-100", name: "PowerBook 100", line: "Mac laptop", year: 1991, wiki: "PowerBook 100", level: "hard" },
  { slug: "powerbook-g3", name: "PowerBook G3", line: "Mac laptop", year: 1997, wiki: "PowerBook G3", level: "hard" },
  { slug: "ipod-shuffle-3rd-generation", name: "iPod shuffle (3rd generation)", line: "iPod", year: 2009, wiki: "IPod Shuffle (3rd generation)", level: "hard" },

  // IMPOSSIBLE (16)
  { slug: "airport-extreme-base-station", name: "AirPort Extreme Base Station", line: "Other", year: 2003, wiki: "AirPort Extreme", level: "impossible" },
  { slug: "powerbook-duo", name: "PowerBook Duo", line: "Mac laptop", year: 1992, wiki: "PowerBook Duo", level: "impossible" },
  { slug: "ipod-hi-fi", name: "iPod Hi-Fi", line: "Other", year: 2006, wiki: "IPod Hi-Fi", level: "impossible" },
  { slug: "apple-ii", name: "Apple II", line: "Other", year: 1977, wiki: "Apple II", level: "impossible" },
  { slug: "macintosh-color-classic", name: "Macintosh Color Classic", line: "Mac", year: 1993, wiki: "Macintosh Color Classic", level: "impossible" },
  { slug: "apple-i", name: "Apple I", line: "Other", year: 1976, wiki: "Apple I", level: "impossible" },
  { slug: "apple-newton-messagepad", name: "Apple Newton MessagePad", line: "Newton", year: 1993, wiki: "Apple Newton", level: "impossible" },
  { slug: "apple-lisa", name: "Apple Lisa", line: "Other", year: 1983, wiki: "Apple Lisa", level: "impossible" },
  { slug: "apple-iigs", name: "Apple IIGS", line: "Other", year: 1986, wiki: "Apple IIGS", level: "impossible" },
  { slug: "apple-studio-display-crt", name: "Apple Studio Display (CRT)", line: "Other", year: 1998, wiki: "Apple Studio Display (1998–2004)", level: "impossible" },
  { slug: "apple-iii", name: "Apple III", line: "Other", year: 1980, wiki: "Apple III", level: "impossible" },
  { slug: "twentieth-anniversary-macintosh", name: "Twentieth Anniversary Macintosh", line: "Other", year: 1997, wiki: "Twentieth Anniversary Macintosh", level: "impossible" },
  { slug: "apple-quicktake-100", name: "Apple QuickTake 100", line: "Other", year: 1994, wiki: "Apple QuickTake", level: "impossible" },
  { slug: "macintosh-tv", name: "Macintosh TV", line: "Mac", year: 1993, wiki: "Macintosh TV", level: "impossible" },
  { slug: "apple-emate-300", name: "Apple eMate 300", line: "Newton", year: 1997, wiki: "EMate 300", level: "impossible" },
  { slug: "apple-pippin", name: "Apple Pippin", line: "Other", year: 1996, wiki: "Apple Pippin", level: "impossible" },

];

export default APPLE_E66;