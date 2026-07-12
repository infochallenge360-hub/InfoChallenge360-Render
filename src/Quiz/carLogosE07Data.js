// Episode 7 "Guess the Car Logo" — 71 items, absolute-difficulty calibrated.
// 21/21/18/11 split (trimmed from a 95-brand candidate list to fit the 75-item /
// 6-second-timer / <12min standing format; landed at 71 after removing bad sources).
// Hard/impossible capped because no clean logo image could be sourced for the rest
// after 3+ attempts each (Simple Icons, Wikimedia Commons search, Wikidata P154 logo
// property, Wikipedia article images) — dropped: Pontiac, Plymouth, Holden, Isuzu,
// Pagani, Great Wall Motors, Geely, JAC Motors, Haval, Geo, Packard, BYD, NIO, Fisker,
// Datsun, Willys, DeLorean, FAW, Rover, Saab (recovered file was a wrong/generic Wiktionary
// logo, caught by the duplicate-hash gate), Lincoln (same bad file), AMC (same bad file).
// A few extra easy/medium items were trimmed for redundancy/regional-only recognition
// (Opel/Vauxhall are the same brand under two names — kept Opel only).
// Images: Simple Icons (simpleicons.org, free brand SVGs) primary; Wikimedia Commons /
// Wikidata / Wikipedia article images as fallback for brands not on Simple Icons.
export const CAR_LOGOS_E07 = [
  // EASY (21)
  { slug: "toyota", name: "Toyota", level: "easy" },
  { slug: "ford", name: "Ford", level: "easy" },
  { slug: "bmw", name: "BMW", level: "easy" },
  { slug: "mercedes-benz", name: "Mercedes-Benz", level: "easy" },
  { slug: "ferrari", name: "Ferrari", level: "easy" },
  { slug: "lamborghini", name: "Lamborghini", level: "easy" },
  { slug: "porsche", name: "Porsche", level: "easy" },
  { slug: "honda", name: "Honda", level: "easy" },
  { slug: "tesla", name: "Tesla", level: "easy" },
  { slug: "volkswagen", name: "Volkswagen", level: "easy" },
  { slug: "audi", name: "Audi", level: "easy" },
  { slug: "chevrolet", name: "Chevrolet", level: "easy" },
  { slug: "nissan", name: "Nissan", level: "easy" },
  { slug: "hyundai", name: "Hyundai", level: "easy" },
  { slug: "kia", name: "Kia", level: "easy" },
  { slug: "mazda", name: "Mazda", level: "easy" },
  { slug: "jeep", name: "Jeep", level: "easy" },
  { slug: "volvo", name: "Volvo", level: "easy" },
  { slug: "land-rover", name: "Land Rover", level: "easy" },
  { slug: "jaguar", name: "Jaguar", level: "easy" },
  { slug: "mini", name: "Mini", level: "easy" },
  // MEDIUM (21)
  { slug: "bentley", name: "Bentley", level: "medium" },
  { slug: "rolls-royce", name: "Rolls-Royce", level: "medium" },
  { slug: "aston-martin", name: "Aston Martin", level: "medium" },
  { slug: "bugatti", name: "Bugatti", level: "medium" },
  { slug: "maserati", name: "Maserati", level: "medium" },
  { slug: "alfa-romeo", name: "Alfa Romeo", level: "medium" },
  { slug: "citroen", name: "Citroen", level: "medium" },
  { slug: "skoda", name: "Skoda", level: "medium" },
  { slug: "mitsubishi", name: "Mitsubishi", level: "medium" },
  { slug: "suzuki", name: "Suzuki", level: "medium" },
  { slug: "lexus", name: "Lexus", level: "medium" },
  { slug: "infiniti", name: "Infiniti", level: "medium" },
  { slug: "acura", name: "Acura", level: "medium" },
  { slug: "cadillac", name: "Cadillac", level: "medium" },
  { slug: "buick", name: "Buick", level: "medium" },
  { slug: "gmc", name: "GMC", level: "medium" },
  { slug: "chrysler", name: "Chrysler", level: "medium" },
  { slug: "dodge", name: "Dodge", level: "medium" },
  { slug: "opel", name: "Opel", level: "medium" },
  { slug: "mclaren", name: "McLaren", level: "medium" },
  { slug: "genesis", name: "Genesis", level: "medium" },
  // HARD (18)
  { slug: "oldsmobile", name: "Oldsmobile", level: "hard" },
  { slug: "hummer", name: "Hummer", level: "hard" },
  { slug: "scion", name: "Scion", level: "hard" },
  { slug: "daewoo", name: "Daewoo", level: "hard" },
  { slug: "ssangyong", name: "SsangYong", level: "hard" },
  { slug: "proton", name: "Proton", level: "hard" },
  { slug: "perodua", name: "Perodua", level: "hard" },
  { slug: "daihatsu", name: "Daihatsu", level: "hard" },
  { slug: "saturn", name: "Saturn", level: "hard" },
  { slug: "lada", name: "Lada", level: "hard" },
  { slug: "rivian", name: "Rivian", level: "hard" },
  { slug: "lucid-motors", name: "Lucid Motors", level: "hard" },
  { slug: "polestar", name: "Polestar", level: "hard" },
  { slug: "ds-automobiles", name: "DS Automobiles", level: "hard" },
  { slug: "abarth", name: "Abarth", level: "hard" },
  { slug: "lancia", name: "Lancia", level: "hard" },
  { slug: "koenigsegg", name: "Koenigsegg", level: "hard" },
  { slug: "triumph", name: "Triumph", level: "hard" },
  // IMPOSSIBLE (11)
  { slug: "tata-motors", name: "Tata Motors", level: "impossible" },
  { slug: "mahindra", name: "Mahindra", level: "impossible" },
  { slug: "mg", name: "MG", level: "impossible" },
  { slug: "chery", name: "Chery", level: "impossible" },
  { slug: "dacia", name: "Dacia", level: "impossible" },
  { slug: "wuling", name: "Wuling", level: "impossible" },
  { slug: "changan", name: "Changan", level: "impossible" },
  { slug: "baic", name: "BAIC", level: "impossible" },
  { slug: "eagle", name: "Eagle", level: "impossible" },
  { slug: "studebaker", name: "Studebaker", level: "impossible" },
  { slug: "xpeng", name: "XPeng", level: "impossible" },
];
export default CAR_LOGOS_E07;
