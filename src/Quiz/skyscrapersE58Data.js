// E58 "Guess the Skyscraper" — 68 items, absolute global recognizability.
// easy = globally iconic silhouettes (Burj Khalifa, Empire State Building, Petronas Towers...);
// impossible = genuinely obscure regional supertalls, mostly recent Chinese/Gulf builds most of the
// world has never heard of, regardless of height. Real habitable skyscrapers only — no pure
// observation towers (CN Tower, Tokyo Skytree, Eiffel Tower) to keep the "skyscraper" premise honest.
// fit=cover, dir="skyscrapers", ext="jpg", coldSlug="tbd" (set after image sourcing).
//
// NOTE: Tower Palace Three (South Korea) and Suzhou Zhongnan Center (China) were cut — Tower
// Palace Three has no image identifying which specific tower in the multi-block complex is "Three",
// and Suzhou Zhongnan Center has no real photograph anywhere (only a CGI rendering; construction
// reportedly stalled). Final list is 68 items instead of 70.

export const SKYSCRAPERS_E58 = [
  // EASY (18)
  { slug: "burj-khalifa", name: "Burj Khalifa", country: "UAE", level: "easy" },
  { slug: "empire-state-building", name: "Empire State Building", country: "USA", level: "easy" },
  { slug: "one-world-trade-center", name: "One World Trade Center", country: "USA", level: "easy" },
  { slug: "shanghai-tower", name: "Shanghai Tower", country: "China", level: "easy" },
  { slug: "petronas-towers", name: "Petronas Towers", country: "Malaysia", level: "easy" },
  { slug: "taipei-101", name: "Taipei 101", country: "Taiwan", level: "easy" },
  { slug: "willis-tower", name: "Willis Tower", country: "USA", level: "easy" },
  { slug: "chrysler-building", name: "Chrysler Building", country: "USA", level: "easy" },
  { slug: "the-shard", name: "The Shard", country: "United Kingdom", level: "easy" },
  { slug: "marina-bay-sands", name: "Marina Bay Sands", country: "Singapore", level: "easy" },
  { slug: "the-gherkin", name: "30 St Mary Axe (The Gherkin)", country: "United Kingdom", level: "easy" },
  { slug: "shanghai-world-financial-center", name: "Shanghai World Financial Center", country: "China", level: "easy" },
  { slug: "international-commerce-centre", name: "International Commerce Centre", country: "Hong Kong", level: "easy" },
  { slug: "lotte-world-tower", name: "Lotte World Tower", country: "South Korea", level: "easy" },
  { slug: "john-hancock-center", name: "875 North Michigan Avenue", country: "USA", level: "easy" },
  { slug: "jin-mao-tower", name: "Jin Mao Tower", country: "China", level: "easy" },
  { slug: "flatiron-building", name: "Flatiron Building", country: "USA", level: "easy" },
  { slug: "bank-of-china-tower", name: "Bank of China Tower", country: "Hong Kong", level: "easy" },

  // MEDIUM (18)
  { slug: "landmark-81", name: "Landmark 81", country: "Vietnam", level: "medium" },
  { slug: "central-park-tower", name: "Central Park Tower", country: "USA", level: "medium" },
  { slug: "one-vanderbilt", name: "One Vanderbilt", country: "USA", level: "medium" },
  { slug: "thirty-hudson-yards", name: "30 Hudson Yards", country: "USA", level: "medium" },
  { slug: "ping-an-finance-centre", name: "Ping An Finance Centre", country: "China", level: "medium" },
  { slug: "citic-tower", name: "CITIC Tower", country: "China", level: "medium" },
  { slug: "guangzhou-ctf-finance-centre", name: "Guangzhou CTF Finance Centre", country: "China", level: "medium" },
  { slug: "tianjin-ctf-finance-centre", name: "Tianjin CTF Finance Centre", country: "China", level: "medium" },
  { slug: "emirates-towers", name: "Emirates Towers", country: "UAE", level: "medium" },
  { slug: "princess-tower", name: "Princess Tower", country: "UAE", level: "medium" },
  { slug: "eureka-tower", name: "Eureka Tower", country: "Australia", level: "medium" },
  { slug: "q1-tower", name: "Q1 Tower", country: "Australia", level: "medium" },
  { slug: "federation-tower", name: "Federation Tower", country: "Russia", level: "medium" },
  { slug: "mercury-city-tower", name: "Mercury City Tower", country: "Russia", level: "medium" },
  { slug: "aon-center-chicago", name: "Aon Center", country: "USA", level: "medium" },
  { slug: "trump-tower-chicago", name: "Trump International Hotel and Tower", country: "USA", level: "medium" },
  { slug: "turning-torso", name: "Turning Torso", country: "Sweden", level: "medium" },

  // HARD (18)
  { slug: "suzhou-ifs", name: "Suzhou IFS", country: "China", level: "hard" },
  { slug: "wuhan-center-tower", name: "Wuhan Center Tower", country: "China", level: "hard" },
  { slug: "nanjing-greenland-financial-center", name: "Nanjing Greenland Financial Center", country: "China", level: "hard" },
  { slug: "kk100", name: "KK100", country: "China", level: "hard" },
  { slug: "the-torch-dubai", name: "The Torch", country: "UAE", level: "hard" },
  { slug: "almas-tower", name: "Almas Tower", country: "UAE", level: "hard" },
  { slug: "gate-of-the-orient", name: "Gate of the Orient", country: "China", level: "hard" },
  { slug: "absolute-world", name: "Absolute World", country: "Canada", level: "hard" },
  { slug: "cayan-tower", name: "Cayan Tower", country: "UAE", level: "hard" },
  { slug: "thirty-park-place", name: "30 Park Place", country: "USA", level: "hard" },
  { slug: "thirty-five-hudson-yards", name: "35 Hudson Yards", country: "USA", level: "hard" },
  { slug: "salesforce-tower", name: "Salesforce Tower", country: "USA", level: "hard" },
  { slug: "wilshire-grand-center", name: "Wilshire Grand Center", country: "USA", level: "hard" },
  { slug: "comcast-technology-center", name: "Comcast Technology Center", country: "USA", level: "hard" },
  { slug: "hearst-tower", name: "Hearst Tower", country: "USA", level: "hard" },
  { slug: "torre-reforma", name: "Torre Reforma", country: "Mexico", level: "hard" },
  { slug: "gran-torre-santiago", name: "Gran Torre Santiago", country: "Chile", level: "hard" },
  { slug: "merdeka-118", name: "Merdeka 118", country: "Malaysia", level: "hard" },

  // IMPOSSIBLE (16)
  { slug: "leadenhall-building", name: "Leadenhall Building", country: "United Kingdom", level: "impossible" },
  { slug: "kingdom-centre", name: "Kingdom Centre", country: "Saudi Arabia", level: "impossible" },
  { slug: "burj-rafal", name: "Burj Rafal", country: "Saudi Arabia", level: "impossible" },
  { slug: "diamond-tower", name: "Diamond Tower", country: "Saudi Arabia", level: "impossible" },
  { slug: "baiyoke-tower-ii", name: "Baiyoke Tower II", country: "Thailand", level: "impossible" },
  { slug: "one-shenzhen-bay", name: "One Shenzhen Bay Tower R1", country: "China", level: "impossible" },
  { slug: "wuxi-maoye-city", name: "Wuxi Maoye City Duke Tower", country: "China", level: "impossible" },
  { slug: "golden-eagle-tiandi", name: "Golden Eagle Tiandi Tower A", country: "China", level: "impossible" },
  { slug: "chongqing-wfc", name: "Chongqing World Financial Center", country: "China", level: "impossible" },
  { slug: "iconic-tower-egypt", name: "Iconic Tower", country: "Egypt", level: "impossible" },
  { slug: "landmark-72", name: "Landmark 72", country: "Vietnam", level: "impossible" },
  { slug: "china-resources-headquarters", name: "China Resources Headquarters", country: "China", level: "impossible" },
  { slug: "changsha-ifs-tower-t1", name: "Changsha IFS Tower T1", country: "China", level: "impossible" },
  { slug: "shimao-international-plaza", name: "Shimao International Plaza", country: "China", level: "impossible" },
  { slug: "poly-international-plaza", name: "Poly International Plaza", country: "China", level: "impossible" },
];

export default SKYSCRAPERS_E58;
