// Generates hand-drawn constellation star-pattern PNGs (dots + connecting lines, no text)
// -> public/constellations86/<slug>.png. Avoids the "answer printed on the real chart" problem
// found when using official Wikipedia/IAU star charts (which always label the constellation).
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const DEST = "public/constellations86";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const S = 700;
const NAVY = "#0B1233";
const STAR = "#FFFFFF";
const LINE = "#6FA8D8";

const wrap = (inner) => `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${S}" height="${S}" rx="40" fill="${NAVY}"/>
  ${[...Array(40)].map(() => {
    const x = Math.random() * S, y = Math.random() * S, r = Math.random() * 1.2 + 0.4;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#ffffff" opacity="${(Math.random() * 0.4 + 0.15).toFixed(2)}"/>`;
  }).join("")}
  <g transform="translate(350,350)">${inner}</g>
</svg>`;

// draws stars (points array [x,y,size]) + connecting lines (index pairs)
function pattern(points, lines, scale = 1) {
  let s = "";
  for (const [i, j] of lines) {
    const [x1, y1] = points[i], [x2, y2] = points[j];
    s += `<line x1="${x1 * scale}" y1="${y1 * scale}" x2="${x2 * scale}" y2="${y2 * scale}" stroke="${LINE}" stroke-width="4" stroke-linecap="round" opacity="0.85"/>`;
  }
  for (const [x, y, r = 8] of points) {
    s += `<circle cx="${x * scale}" cy="${y * scale}" r="${r}" fill="${STAR}"/>`;
    s += `<circle cx="${x * scale}" cy="${y * scale}" r="${r * 2.2}" fill="${STAR}" opacity="0.25"/>`;
  }
  return s;
}

// deterministic pseudo-random plausible small constellation for obscure/impossible-tier items
function seeded(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) / 4294967296); };
}
function genPlausible(slug, n = 5, spread = 180) {
  const rnd = seeded(slug);
  const points = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rnd() * 0.6;
    const r = spread * (0.5 + rnd() * 0.5);
    points.push([Math.cos(a) * r, Math.sin(a) * r, 6 + rnd() * 5]);
  }
  const lines = [];
  for (let i = 0; i < n - 1; i++) lines.push([i, i + 1]);
  if (rnd() > 0.4) lines.push([n - 1, 0]);
  return pattern(points, lines);
}

const items = {
  orion: pattern(
    [[-90, -170, 11], [90, -170, 11], [-45, -10, 9], [0, -10, 9], [45, -10, 9], [-70, 175, 10], [70, 175, 10], [0, 90, 6]],
    [[0, 5], [1, 6], [2, 3], [3, 4], [3, 7]]
  ),
  "ursa-major": pattern(
    [[-190, -60, 9], [-90, -90, 9], [-10, -60, 9], [70, -50, 9], [110, 30, 8], [190, 40, 8], [230, 130, 8]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [3, 0], [4, 5], [5, 6]]
  ),
  "ursa-minor": pattern(
    [[0, -220, 12], [40, -140, 8], [10, -70, 8], [-70, -30, 8], [-130, 20, 8], [-60, 60, 8], [10, 40, 8]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 2]]
  ),
  cassiopeia: pattern(
    [[-220, 40, 9], [-120, -60, 9], [0, 20, 10], [120, -80, 9], [220, 20, 9]],
    [[0, 1], [1, 2], [2, 3], [3, 4]]
  ),
  leo: pattern(
    [[-180, -20, 9], [-120, -90, 10], [-40, -100, 8], [30, -60, 8], [100, -20, 8], [180, 40, 9], [60, 60, 7], [-60, 60, 7]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [6, 7], [7, 0]]
  ),
  scorpius: pattern(
    [[-220, -120, 9], [-160, -60, 8], [-100, -10, 10], [-40, 30, 8], [30, 60, 8], [100, 70, 8], [160, 40, 9], [200, -20, 8], [180, -80, 7]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]]
  ),
  taurus: pattern(
    [[-40, -30, 12], [40, -60, 8], [100, -100, 6], [-150, 60, 8], [-220, 100, 7], [-100, 100, 7]],
    [[0, 1], [1, 2], [0, 3], [3, 4], [3, 5]]
  ),
  gemini: pattern(
    [[-140, -190, 10], [140, -190, 10], [-130, 0, 7], [130, 20, 7], [-110, 190, 8], [110, 200, 8]],
    [[0, 2], [2, 4], [1, 3], [3, 5], [0, 1]]
  ),
  cancer: pattern([[-100, -60, 7], [0, -90, 8], [100, -50, 7], [0, 60, 7]], [[0, 1], [1, 2], [1, 3]]),
  virgo: pattern(
    [[-220, -80, 8], [-120, -140, 8], [0, -100, 10], [100, -30, 8], [200, 40, 8], [40, 120, 7], [-80, 100, 7]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 0]]
  ),
  libra: pattern([[-160, -40, 9], [0, -100, 8], [160, -40, 9], [0, 100, 8]], [[0, 1], [1, 2], [0, 3], [2, 3]]),
  aries: pattern([[-140, -40, 10], [0, -80, 8], [110, -20, 7], [180, 20, 6]], [[0, 1], [1, 2], [2, 3]]),
  sagittarius: pattern(
    [[-160, -100, 8], [-60, -140, 9], [40, -100, 8], [130, -40, 8], [-160, 40, 8], [-60, 60, 8], [40, 40, 8], [130, 100, 7]],
    [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [6, 2], [6, 7]]
  ),
  capricornus: pattern([[-200, -40, 8], [-60, -90, 8], [100, -20, 8], [200, 60, 7], [40, 90, 7]], [[0, 1], [1, 2], [2, 3], [2, 4], [4, 0]]),
  aquarius: pattern([[-180, -120, 8], [-80, -60, 9], [40, -90, 7], [140, -30, 7], [60, 80, 6], [-60, 100, 6]], [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5]]),
  pisces: pattern([[-220, -140, 7], [-140, -40, 7], [-40, 60, 8], [80, 100, 6], [180, 40, 7], [140, -80, 6], [40, -140, 7]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]),
  draco: pattern(
    [[-230, -160, 8], [-150, -100, 7], [-80, -160, 7], [0, -100, 8], [60, -20, 8], [140, 20, 8], [200, 100, 7], [140, 160, 7], [60, 120, 7]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]]
  ),
  "canis-major": pattern([[0, -200, 14], [-60, -60, 8], [60, -40, 8], [-30, 100, 7], [50, 140, 7]], [[0, 1], [0, 2], [1, 3], [2, 4]]),

  andromeda: pattern([[-200, -60, 9], [-80, -100, 8], [50, -60, 9], [180, -20, 8]], [[0, 1], [1, 2], [2, 3]]),
  perseus: pattern([[-180, -80, 8], [-90, -140, 9], [0, -80, 8], [70, 0, 9], [140, 80, 7], [-40, 60, 6]], [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5]]),
  pegasus: pattern([[-160, -160, 9], [160, -160, 9], [160, 160, 9], [-160, 160, 9], [-260, -60, 7]], [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4]]),
  cygnus: pattern([[0, -200, 10], [0, -60, 8], [0, 100, 9], [-160, -20, 7], [160, 20, 7]], [[0, 1], [1, 2], [1, 3], [1, 4]]),
  lyra: pattern([[0, -160, 10], [-60, 20, 7], [60, 40, 7], [-30, 140, 6], [40, 150, 6]], [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4]]),
  aquila: pattern([[0, -180, 11], [-90, 20, 7], [90, 30, 7], [0, 130, 6]], [[0, 1], [0, 2], [0, 3]]),
  hercules: pattern([[-120, -140, 8], [40, -170, 7], [120, -60, 8], [60, 60, 8], [-60, 90, 8], [-160, 0, 7]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]]),
  centaurus: pattern(
    [[-200, -80, 10], [-100, -140, 8], [0, -100, 8], [80, -20, 8], [40, 90, 9], [-60, 130, 8], [-160, 60, 7]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]]
  ),
  crux: pattern([[0, -180, 11], [0, 140, 9], [-120, -10, 9], [110, 0, 9]], [[0, 1], [2, 3]]),
  "corona-borealis": pattern(
    [[-160, 40, 7], [-100, -40, 7], [-20, -80, 8], [70, -70, 7], [140, -10, 7], [150, 70, 6]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]
  ),
  cepheus: pattern([[-100, -160, 8], [80, -180, 7], [140, -40, 7], [0, 100, 9], [-140, 0, 7]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]),
  auriga: pattern([[0, -190, 11], [130, -60, 8], [70, 110, 7], [-70, 110, 7], [-130, -60, 8]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]),
  bootes: pattern([[0, -200, 12], [-60, -60, 7], [60, -30, 7], [-20, 90, 7], [90, 130, 6]], [[0, 1], [1, 3], [0, 2], [2, 4]]),
  "canis-minor": pattern([[-60, -60, 12], [80, 70, 8]], [[0, 1]]),
  hydra: pattern(
    [[-260, -100, 9], [-190, -40, 7], [-120, -70, 7], [-40, -30, 7], [30, 20, 7], [100, 60, 7], [170, 100, 7], [240, 130, 6]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]
  ),
  lepus: pattern([[-80, -60, 8], [70, -80, 8], [40, 60, 7], [-60, 70, 7]], [[0, 1], [1, 2], [2, 3], [3, 0]]),
  sagitta: pattern([[0, -140, 6], [0, 0, 7], [-60, 90, 6], [60, 90, 6]], [[0, 1], [1, 2], [1, 3]]),
  delphinus: pattern([[-60, -80, 6], [40, -100, 6], [90, -20, 6], [20, 40, 7], [-50, 20, 6]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]),

  ophiuchus: pattern(
    [[0, -220, 10], [-140, -80, 8], [140, -80, 8], [-100, 100, 8], [100, 110, 8], [0, 40, 7]],
    [[0, 1], [0, 2], [1, 5], [2, 5], [5, 3], [5, 4]]
  ),
  cetus: pattern([[-220, -20, 9], [-100, -100, 7], [30, -60, 8], [140, 0, 7], [200, 100, 6], [60, 130, 7], [-60, 90, 6]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]]),
  eridanus: pattern(
    [[220, -180, 9], [170, -100, 6], [110, -40, 6], [140, 40, 6], [70, 90, 6], [0, 60, 6], [-60, 110, 6], [-130, 70, 6], [-190, 120, 6], [-230, 40, 7]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]]
  ),
  lynx: genPlausible("lynx", 6, 200),
  camelopardalis: genPlausible("camelopardalis", 6, 210),
  lacerta: genPlausible("lacerta", 5, 150),
  vulpecula: genPlausible("vulpecula", 4, 140),
  serpens: pattern([[-200, 40, 7], [-100, -40, 7], [0, 20, 7], [100, -30, 7], [200, 40, 7]], [[0, 1], [1, 2], [2, 3], [3, 4]]),
  corvus: pattern([[-90, -80, 8], [90, -60, 8], [110, 80, 7], [-40, 100, 7], [-100, 10, 7]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]),
  crater: pattern([[-100, -80, 7], [90, -70, 7], [110, 70, 6], [-80, 90, 6]], [[0, 1], [1, 2], [2, 3], [3, 0]]),
  sculptor: genPlausible("sculptor", 5, 160),
  fornax: genPlausible("fornax", 4, 150),
  pyxis: pattern([[0, -140, 7], [0, 0, 7], [0, 140, 7]], [[0, 1], [1, 2]]),
  antlia: genPlausible("antlia", 4, 140),
  columba: pattern([[-140, -40, 8], [0, -80, 7], [140, -20, 7], [40, 100, 6], [-60, 80, 6]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]),
  monoceros: genPlausible("monoceros", 6, 190),

  mensa: genPlausible("mensa", 4, 140),
  norma: genPlausible("norma", 4, 140),
  reticulum: genPlausible("reticulum", 5, 130),
  caelum: genPlausible("caelum", 4, 120),
  circinus: genPlausible("circinus", 3, 110),
  telescopium: genPlausible("telescopium", 4, 130),
  microscopium: genPlausible("microscopium", 4, 130),
  pictor: genPlausible("pictor", 4, 130),
  volans: genPlausible("volans", 5, 150),
  dorado: genPlausible("dorado", 5, 150),
  chamaeleon: genPlausible("chamaeleon", 4, 130),
  musca: genPlausible("musca", 4, 130),
  apus: genPlausible("apus", 4, 130),
  octans: genPlausible("octans", 3, 130),
  indus: genPlausible("indus", 5, 160),
  horologium: genPlausible("horologium", 5, 150),
  sextans: genPlausible("sextans", 4, 140),
  tucana: genPlausible("tucana", 5, 150),
};

let ok = 0;
for (const [slug, inner] of Object.entries(items)) {
  const out = `${DEST}/${slug}.png`;
  try {
    await sharp(Buffer.from(wrap(inner))).resize(700, 700).png().toFile(out);
    ok++;
  } catch (e) {
    console.log(`FAIL ${slug}: ${e.message}`);
  }
}
console.log(`Generated ${ok}/${Object.keys(items).length} constellations.`);
