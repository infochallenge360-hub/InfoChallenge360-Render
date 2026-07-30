// E54 "Guess the Sports Trophy" — answer = the trophy's common name, image = a real photo of the
// physical trophy itself (studio/display-case shots preferred; no player faces that would need
// blurring). Calibrated by global recognizability of the TROPHY'S SHAPE (quiz-difficulty-calibration):
// easy ~70-95% ("everyone's seen this on TV") down to impossible <10% (aimed <3% — trophies only
// serious fans of that specific sport/competition would recognize on sight).
//
// Item count: 52 — deliberately SHORT of the 65-78 target band. This is an honest shortfall, not a
// rounding choice: the brief explicitly allows stopping at a smaller count "if you genuinely cannot
// find enough distinct, recognizable trophies... without padding with near-identical regional
// trophies." That happened here. Twelve originally-planned items were dropped after an image search
// turned up NOTHING usable (see fetch report for exact attempts made per item):
//   - masters-green-jacket, melbourne-cup, breeders-cup-trophy — these three sports (Masters golf,
//     Melbourne Cup, Breeders' Cup horse racing) have their ceremony/trophy photography locked up by
//     Getty/AP press agencies; every free-licensed Commons/Wikipedia result was either a crowd/parade
//     scene, a race-action shot, or an unrelated image — never a clean shot of the object itself.
//   - cfp-national-championship-trophy, pdc-world-darts-trophy, nrl-premiership-trophy,
//     spengler-cup, icc-champions-trophy, ncaa-basketball-trophy, iihf-world-championship-trophy,
//     us-open-golf-trophy, wanamaker-trophy, euroleague-trophy — same pattern: only stadium/crowd
//     photos, wordmark logos, or flatly wrong subjects (a player's portrait, a department store)
//     turned up under every query tried; no genuine free photo of the trophy exists at a usable
//     license.
// Rather than ship a wrong photo or a look-alike substitute to hit a round number, those items were
// cut. 52 genuine, correctly-identified, cleanly-licensed trophies is the honest ceiling this pass
// reached.
//
// Sourcing strategy: Wikipedia pageimages API (piprop=thumbnail) tried first per item; where the
// lead image was wrong (very common — search relevance often surfaced a player, sponsor, stadium, or
// unrelated page), fell back to Wikimedia Commons generator=search (gsrnamespace=6) filtered to
// PD/CC0/CC-BY/CC-BY-SA licenses only. A informational minority of items (noted in the fetch report)
// ended up sourced as clean vector/icon renderings of the real trophy (SVG or PD schematic) rather
// than a photograph, used ONLY where every real photo candidate found showed a player's face, a
// sponsor-branded stage, or the wrong trophy entirely — the icon still depicts the correct, real
// trophy shape accurately. See out/e54-trophies-fetch-report.json for the exact source/license/
// attribution/title recorded per item, including every rejected candidate reasoning is summarized in
// this file's history.
//
// fit: contain is recommended on the render side — trophies have wildly varied aspect ratios (tall
// urns, wide bowls, vertical belts) unlike e.g. animal photos which tolerate `cover`.
//
// Look-alike care: domestic football cup trophies (FA Cup, Copa del Rey, DFB-Pokal) were kept to one
// each from their respective countries rather than piling in near-identical regional cups, per the
// "don't pad with near-identical regional trophies" guidance. Grand Slam tennis trophies (Wimbledon,
// US Open, French Open/Coupe des Mousquetaires, Australian Open/Norman Brookes) were all included
// since each has a genuinely distinct silhouette, not a repeat of the same object.
//
// coldSlug (last item, most obscure): "sam-maguire-cup" — Ireland's Gaelic football trophy. Gaelic
// football has essentially zero recognition outside Ireland, making this the most obscure real,
// well-documented, cleanly-sourced trophy on the list.
export const TROPHIES_E54 = [
  // EASY (14) — ~70-95% globally recognizable on sight
  { slug: "fifa-world-cup-trophy", name: "FIFA World Cup Trophy", sport: "Football/Soccer", level: "easy" },
  { slug: "stanley-cup", name: "Stanley Cup", sport: "Ice Hockey", level: "easy" },
  { slug: "wimbledon-trophy", name: "Wimbledon Trophy", sport: "Tennis", level: "easy" },
  { slug: "uefa-champions-league-trophy", name: "UEFA Champions League Trophy", sport: "Football/Soccer", level: "easy" },
  { slug: "vince-lombardi-trophy", name: "Vince Lombardi Trophy", sport: "American Football", level: "easy" },
  { slug: "ballon-dor-trophy", name: "Ballon d'Or Trophy", sport: "Football/Soccer", level: "easy" },
  { slug: "claret-jug", name: "Claret Jug", sport: "Golf", level: "easy" },
  { slug: "larry-obrien-trophy", name: "Larry O'Brien Trophy", sport: "Basketball", level: "easy" },
  { slug: "fa-cup-trophy", name: "FA Cup Trophy", sport: "Football/Soccer", level: "easy" },
  { slug: "copa-america-trophy", name: "Copa América Trophy", sport: "Football/Soccer", level: "easy" },
  { slug: "ryder-cup", name: "Ryder Cup", sport: "Golf", level: "easy" },
  { slug: "uefa-euro-trophy", name: "UEFA European Championship Trophy", sport: "Football/Soccer", level: "easy" },
  { slug: "world-series-trophy", name: "World Series Trophy", sport: "Baseball", level: "easy" },
  { slug: "ashes-urn", name: "The Ashes Urn", sport: "Cricket", level: "easy" },

  // MEDIUM (15) — ~35-70%, most people have seen it somewhere
  { slug: "webb-ellis-cup", name: "Webb Ellis Cup", sport: "Rugby Union", level: "medium" },
  { slug: "wbc-championship-belt", name: "WBC Championship Belt", sport: "Boxing", level: "medium" },
  { slug: "americas-cup", name: "America's Cup", sport: "Sailing", level: "medium" },
  { slug: "davis-cup", name: "Davis Cup", sport: "Tennis", level: "medium" },
  { slug: "us-open-tennis-trophy", name: "US Open Tennis Trophy", sport: "Tennis", level: "medium" },
  { slug: "coupe-des-mousquetaires", name: "French Open Trophy (Coupe des Mousquetaires)", sport: "Tennis", level: "medium" },
  { slug: "copa-libertadores-trophy", name: "Copa Libertadores Trophy", sport: "Football/Soccer", level: "medium" },
  { slug: "europa-league-trophy", name: "UEFA Europa League Trophy", sport: "Football/Soccer", level: "medium" },
  { slug: "womens-world-cup-trophy", name: "FIFA Women's World Cup Trophy", sport: "Football/Soccer", level: "medium" },
  { slug: "cricket-world-cup-trophy", name: "Cricket World Cup Trophy", sport: "Cricket", level: "medium" },
  { slug: "borg-warner-trophy", name: "Borg-Warner Trophy", sport: "Motorsport (IndyCar)", level: "medium" },
  { slug: "heisman-trophy", name: "Heisman Trophy", sport: "American Football", level: "medium" },
  { slug: "icc-t20-world-cup-trophy", name: "ICC Men's T20 World Cup Trophy", sport: "Cricket", level: "medium" },
  { slug: "afcon-trophy", name: "Africa Cup of Nations Trophy", sport: "Football/Soccer", level: "medium" },
  { slug: "premier-league-trophy", name: "Premier League Trophy", sport: "Football/Soccer", level: "medium" },

  // HARD (11) — ~10-35%, enthusiasts/regional fans recognize it
  { slug: "kentucky-derby-trophy", name: "Kentucky Derby Trophy", sport: "Horse Racing", level: "hard" },
  { slug: "concacaf-gold-cup-trophy", name: "CONCACAF Gold Cup Trophy", sport: "Football/Soccer", level: "hard" },
  { slug: "f1-constructors-trophy", name: "Formula One Constructors' Championship Trophy", sport: "Motorsport", level: "hard" },
  { slug: "norman-brookes-challenge-cup", name: "Australian Open Trophy (Norman Brookes Challenge Cup)", sport: "Tennis", level: "hard" },
  { slug: "copa-del-rey-trophy", name: "Copa del Rey Trophy", sport: "Football/Soccer", level: "hard" },
  { slug: "dfb-pokal", name: "DFB-Pokal", sport: "Football/Soccer", level: "hard" },
  { slug: "world-snooker-trophy", name: "World Snooker Championship Trophy", sport: "Snooker", level: "hard" },
  { slug: "fifa-club-world-cup-trophy", name: "FIFA Club World Cup Trophy", sport: "Football/Soccer", level: "hard" },
  { slug: "six-nations-trophy", name: "Six Nations Championship Trophy", sport: "Rugby Union", level: "hard" },
  { slug: "nascar-cup-trophy", name: "NASCAR Cup Series Trophy", sport: "Motorsport", level: "hard" },
  { slug: "bundesliga-meisterschale", name: "Bundesliga Meisterschale", sport: "Football/Soccer", level: "hard" },

  // IMPOSSIBLE (12) — <10%, aimed <3%; genuinely obscure but real, correctly-identified trophies
  { slug: "afc-asian-cup-trophy", name: "AFC Asian Cup Trophy", sport: "Football/Soccer", level: "impossible" },
  { slug: "grey-cup", name: "Grey Cup", sport: "Canadian Football", level: "impossible" },
  { slug: "bledisloe-cup", name: "Bledisloe Cup", sport: "Rugby Union", level: "impossible" },
  { slug: "le-mans-trophy", name: "24 Hours of Le Mans Trophy", sport: "Motorsport", level: "impossible" },
  { slug: "naismith-trophy", name: "Naismith Trophy", sport: "Basketball", level: "impossible" },
  { slug: "afl-premiership-cup", name: "AFL Premiership Cup", sport: "Australian Rules Football", level: "impossible" },
  { slug: "heineken-champions-cup", name: "Heineken Champions Cup", sport: "Rugby Union", level: "impossible" },
  { slug: "fedex-cup-trophy", name: "FedEx Cup Trophy", sport: "Golf", level: "impossible" },
  { slug: "billie-jean-king-cup", name: "Billie Jean King Cup", sport: "Tennis", level: "impossible" },
  { slug: "atp-finals-trophy", name: "ATP Finals Trophy", sport: "Tennis", level: "impossible" },
  { slug: "mls-cup-trophy", name: "MLS Cup Trophy", sport: "Football/Soccer", level: "impossible" },
  { slug: "sam-maguire-cup", name: "Sam Maguire Cup", sport: "Gaelic Football", level: "impossible" },
];
