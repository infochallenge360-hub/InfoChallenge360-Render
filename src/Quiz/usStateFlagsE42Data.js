// E42 "Guess the US State Flag" — 50 states + DC + 5 territories (honest ceiling, not padded to 65+).
// Current flags only: Georgia (2003+), Mississippi (2020+ "In God We Trust"), Minnesota (2024+ North Star)
// — no pre-redesign/Confederate-emblem flags anywhere in this dataset.
// code: postal/territory code. States use flagcdn.com/w1280/us-<code>.png (lowercase);
// DC + territories (dc/pr/gu/as/vi/mp) need the Wikimedia Special:FilePath fallback.
export const US_STATE_FLAGS_E42 = [
  // EASY (10)
  { slug: "texas", name: "Texas", code: "TX", level: "easy" },
  { slug: "california", name: "California", code: "CA", level: "easy" },
  { slug: "hawaii", name: "Hawaii", code: "HI", level: "easy" },
  { slug: "arizona", name: "Arizona", code: "AZ", level: "easy" },
  { slug: "new-mexico", name: "New Mexico", code: "NM", level: "easy" },
  { slug: "ohio", name: "Ohio", code: "OH", level: "easy" },
  { slug: "maryland", name: "Maryland", code: "MD", level: "easy" },
  { slug: "south-carolina", name: "South Carolina", code: "SC", level: "easy" },
  { slug: "alaska", name: "Alaska", code: "AK", level: "easy" },
  { slug: "colorado", name: "Colorado", code: "CO", level: "easy" },

  // MEDIUM (16)
  { slug: "tennessee", name: "Tennessee", code: "TN", level: "medium" },
  { slug: "florida", name: "Florida", code: "FL", level: "medium" },
  { slug: "alabama", name: "Alabama", code: "AL", level: "medium" },
  { slug: "louisiana", name: "Louisiana", code: "LA", level: "medium" },
  { slug: "utah", name: "Utah", code: "UT", level: "medium" },
  { slug: "nevada", name: "Nevada", code: "NV", level: "medium" },
  { slug: "oklahoma", name: "Oklahoma", code: "OK", level: "medium" },
  { slug: "oregon", name: "Oregon", code: "OR", level: "medium" },
  { slug: "washington", name: "Washington", code: "WA", level: "medium" },
  { slug: "kansas", name: "Kansas", code: "KS", level: "medium" },
  { slug: "wyoming", name: "Wyoming", code: "WY", level: "medium" },
  { slug: "georgia", name: "Georgia", code: "GA", level: "medium" },
  { slug: "mississippi", name: "Mississippi", code: "MS", level: "medium" },
  { slug: "puerto-rico", name: "Puerto Rico", code: "PR", level: "medium" },
  { slug: "indiana", name: "Indiana", code: "IN", level: "medium" },
  { slug: "virginia", name: "Virginia", code: "VA", level: "medium" },

  // HARD (20)
  { slug: "illinois", name: "Illinois", code: "IL", level: "hard" },
  { slug: "michigan", name: "Michigan", code: "MI", level: "hard" },
  { slug: "minnesota", name: "Minnesota", code: "MN", level: "hard" },
  { slug: "wisconsin", name: "Wisconsin", code: "WI", level: "hard" },
  { slug: "iowa", name: "Iowa", code: "IA", level: "hard" },
  { slug: "nebraska", name: "Nebraska", code: "NE", level: "hard" },
  { slug: "north-dakota", name: "North Dakota", code: "ND", level: "hard" },
  { slug: "south-dakota", name: "South Dakota", code: "SD", level: "hard" },
  { slug: "missouri", name: "Missouri", code: "MO", level: "hard" },
  { slug: "kentucky", name: "Kentucky", code: "KY", level: "hard" },
  { slug: "arkansas", name: "Arkansas", code: "AR", level: "hard" },
  { slug: "pennsylvania", name: "Pennsylvania", code: "PA", level: "hard" },
  { slug: "new-jersey", name: "New Jersey", code: "NJ", level: "hard" },
  { slug: "delaware", name: "Delaware", code: "DE", level: "hard" },
  { slug: "connecticut", name: "Connecticut", code: "CT", level: "hard" },
  { slug: "rhode-island", name: "Rhode Island", code: "RI", level: "hard" },
  { slug: "vermont", name: "Vermont", code: "VT", level: "hard" },
  { slug: "west-virginia", name: "West Virginia", code: "WV", level: "hard" },
  { slug: "north-carolina", name: "North Carolina", code: "NC", level: "hard" },
  { slug: "district-of-columbia", name: "District of Columbia", code: "DC", level: "hard" },

  // IMPOSSIBLE (10)
  { slug: "new-hampshire", name: "New Hampshire", code: "NH", level: "impossible" },
  { slug: "maine", name: "Maine", code: "ME", level: "impossible" },
  { slug: "massachusetts", name: "Massachusetts", code: "MA", level: "impossible" },
  { slug: "idaho", name: "Idaho", code: "ID", level: "impossible" },
  { slug: "montana", name: "Montana", code: "MT", level: "impossible" },
  { slug: "new-york", name: "New York", code: "NY", level: "impossible" },
  { slug: "guam", name: "Guam", code: "GU", level: "impossible" },
  { slug: "american-samoa", name: "American Samoa", code: "AS", level: "impossible" },
  { slug: "us-virgin-islands", name: "U.S. Virgin Islands", code: "VI", level: "impossible" },
  { slug: "northern-mariana-islands", name: "Northern Mariana Islands", code: "MP", level: "impossible" },
];
