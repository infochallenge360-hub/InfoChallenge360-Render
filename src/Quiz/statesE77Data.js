// E77 "Guess the US State" — all 50 US states by outline shape alone, easy->impossible.
// Difficulty here is tiered by SHAPE distinctiveness (how recognizable the silhouette is
// on its own), not by general state fame — a famous state with a plain rectangle (Colorado,
// Wyoming) is genuinely harder to name from its outline than a less-famous state with a
// unique coastline (Idaho's panhandle, Maine's jagged coast).
export const STATES_E77 = [
  // EASY (13): Alaska, California, Florida, Hawaii, Idaho, Louisiana, Maine, Michigan,
  //   New York, Oklahoma, Texas, Utah, Virginia
  { slug: "ak", name: "Alaska", level: "easy" },
  { slug: "ca", name: "California", level: "easy" },
  { slug: "fl", name: "Florida", level: "easy" },
  { slug: "hi", name: "Hawaii", level: "easy" },
  { slug: "id", name: "Idaho", level: "easy" },
  { slug: "la", name: "Louisiana", level: "easy" },
  { slug: "me", name: "Maine", level: "easy" },
  { slug: "mi", name: "Michigan", level: "easy" },
  { slug: "ny", name: "New York", level: "easy" },
  { slug: "ok", name: "Oklahoma", level: "easy" },
  { slug: "tx", name: "Texas", level: "easy" },
  { slug: "ut", name: "Utah", level: "easy" },
  { slug: "va", name: "Virginia", level: "easy" },

  // MEDIUM (13): Arizona, Kentucky, Maryland, Minnesota, Missouri, Nevada, New Jersey,
  //   New Mexico, Oregon, Tennessee, Washington, West Virginia, Wisconsin
  { slug: "az", name: "Arizona", level: "medium" },
  { slug: "ky", name: "Kentucky", level: "medium" },
  { slug: "md", name: "Maryland", level: "medium" },
  { slug: "mn", name: "Minnesota", level: "medium" },
  { slug: "mo", name: "Missouri", level: "medium" },
  { slug: "nv", name: "Nevada", level: "medium" },
  { slug: "nj", name: "New Jersey", level: "medium" },
  { slug: "nm", name: "New Mexico", level: "medium" },
  { slug: "or", name: "Oregon", level: "medium" },
  { slug: "tn", name: "Tennessee", level: "medium" },
  { slug: "wa", name: "Washington", level: "medium" },
  { slug: "wv", name: "West Virginia", level: "medium" },
  { slug: "wi", name: "Wisconsin", level: "medium" },

  // HARD (12): Alabama, Arkansas, Connecticut, Georgia, Massachusetts, Mississippi,
  //   New Hampshire, North Carolina, Ohio, Pennsylvania, South Carolina, Vermont
  { slug: "al", name: "Alabama", level: "hard" },
  { slug: "ar", name: "Arkansas", level: "hard" },
  { slug: "ct", name: "Connecticut", level: "hard" },
  { slug: "ga", name: "Georgia", level: "hard" },
  { slug: "ma", name: "Massachusetts", level: "hard" },
  { slug: "ms", name: "Mississippi", level: "hard" },
  { slug: "nh", name: "New Hampshire", level: "hard" },
  { slug: "nc", name: "North Carolina", level: "hard" },
  { slug: "oh", name: "Ohio", level: "hard" },
  { slug: "pa", name: "Pennsylvania", level: "hard" },
  { slug: "sc", name: "South Carolina", level: "hard" },
  { slug: "vt", name: "Vermont", level: "hard" },

  // IMPOSSIBLE (12): Colorado, Delaware, Illinois, Indiana, Iowa, Kansas, Montana,
  //   Nebraska, North Dakota, Rhode Island, South Dakota, Wyoming
  { slug: "co", name: "Colorado", level: "impossible" },
  { slug: "de", name: "Delaware", level: "impossible" },
  { slug: "il", name: "Illinois", level: "impossible" },
  { slug: "in", name: "Indiana", level: "impossible" },
  { slug: "ia", name: "Iowa", level: "impossible" },
  { slug: "ks", name: "Kansas", level: "impossible" },
  { slug: "mt", name: "Montana", level: "impossible" },
  { slug: "ne", name: "Nebraska", level: "impossible" },
  { slug: "nd", name: "North Dakota", level: "impossible" },
  { slug: "ri", name: "Rhode Island", level: "impossible" },
  { slug: "sd", name: "South Dakota", level: "impossible" },
  { slug: "wy", name: "Wyoming", level: "impossible" },
];

export default STATES_E77;
