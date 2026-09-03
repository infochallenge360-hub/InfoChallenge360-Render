// Generates "highlighted territory on a blank world map" cards for the
// Guess the Historical Empire by Map episode. Uses a real, label-free
// equirectangular basemap (Wikimedia's BlankMap-World-Equirectangular —
// zero text/city/country names anywhere, confirmed by direct pixel
// inspection) so there is no risk of the answer being baked into the map
// itself (the exact failure mode flagged as a standing risk after E86's
// star-chart lesson: a real reference map/chart can leak the answer via
// its own printed labels — solved here by using a genuinely blank one and
// drawing the empire's territory ourselves).
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { EMPIRES_E96 } from "../src/Quiz/empiresE96Data.js";

const DEST = "public/empiremaps96";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const BASEMAP_PATH = "scripts/assets/blankmap-world-v2.png";
const MAP_W = 1920, MAP_H = 960;
// v2 basemap is rendered ourselves via d3-geo's geoEquirectangular() (see
// scratch_build_basemap.mjs) which is a GENUINELY linear Plate Carree
// projection (x=lon*k, y=-lat*k) — so LON/LAT bounds are exact, not
// approximated. The original blankmap-world.png (a downloaded Wikimedia
// file) turned out NOT to be truly equirectangular despite its filename —
// it matched a naive linear formula only near the central meridian
// (Europe/Africa/Middle East/India), and was silently wrong by 100s of km
// for anything far from it (confirmed Seoul/Tokyo/Sydney/Mexico
// City/Sao Paulo all landed in open ocean under the old constants) — a
// serious bug that would have mispositioned roughly a third of E96's 70
// empires. Verified this new basemap against 12 known cities spanning the
// whole globe before switching — all 12 land correctly. Do not go back to
// a downloaded "blank map" image without doing the same 12-city check.
const LON_MIN = -180, LON_MAX = 180, LAT_MAX = 90, LAT_MIN = -90;
const S = 700;
const ACCENT = "#C0392B";
const ACCENT_BORDER = "#7B1E14";

const basemapB64 = readFileSync(BASEMAP_PATH).toString("base64");

function project([lon, lat]) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * MAP_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * MAP_H;
  return [x, y];
}

// Computes a square, padded, map-clamped viewBox around a polygon so the
// highlighted territory sits in context (neighboring coastlines visible)
// without being either a speck or a full-world zoom-out.
function viewBoxFor(polygon) {
  const pts = polygon.map(project);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  let minX = Math.min(...xs), maxX = Math.max(...xs);
  let minY = Math.min(...ys), maxY = Math.max(...ys);
  const w0 = maxX - minX, h0 = maxY - minY;
  const padX = w0 * 0.4 + 60, padY = h0 * 0.4 + 60;
  minX -= padX; maxX += padX; minY -= padY; maxY += padY;
  const MIN_SIZE = 260;
  if (maxX - minX < MIN_SIZE) { const d = (MIN_SIZE - (maxX - minX)) / 2; minX -= d; maxX += d; }
  if (maxY - minY < MIN_SIZE) { const d = (MIN_SIZE - (maxY - minY)) / 2; minY -= d; maxY += d; }
  // square it up (crop to the larger of the two dimensions)
  let w = maxX - minX, h = maxY - minY;
  if (w > h) { const d = (w - h) / 2; minY -= d; maxY += d; h = w; }
  else { const d = (h - w) / 2; minX -= d; maxX += d; w = h; }
  // clamp to the basemap's own bounds, sliding the window rather than shrinking it
  if (minX < 0) { maxX -= minX; minX = 0; }
  if (minY < 0) { maxY -= minY; minY = 0; }
  if (maxX > MAP_W) { minX -= maxX - MAP_W; maxX = MAP_W; }
  if (maxY > MAP_H) { minY -= maxY - MAP_H; maxY = MAP_H; }
  minX = Math.max(0, minX); minY = Math.max(0, minY);
  return { minX, minY, w: maxX - minX, h: maxY - minY };
}

function cardSVG(item) {
  const pts = item.polygon.map(project);
  const box = viewBoxFor(item.polygon);
  const ptsStr = pts.map((p) => p.join(",")).join(" ");
  const strokeW = Math.max(3, box.w / 180);
  return `<svg width="${S}" height="${S}" viewBox="${box.minX} ${box.minY} ${box.w} ${box.h}" xmlns="http://www.w3.org/2000/svg">
    <image href="data:image/png;base64,${basemapB64}" x="0" y="0" width="${MAP_W}" height="${MAP_H}" preserveAspectRatio="none"/>
    <polygon points="${ptsStr}" fill="${ACCENT}" fill-opacity="0.72" stroke="${ACCENT_BORDER}" stroke-width="${strokeW}" stroke-linejoin="round"/>
  </svg>`;
}

const only = process.argv[2] ? process.argv.slice(2) : null;
let ok = 0, fail = [];
for (const item of EMPIRES_E96) {
  if (only && !only.includes(item.slug)) continue;
  try {
    const svg = cardSVG(item);
    await sharp(Buffer.from(svg)).png().toFile(path.join(DEST, `${item.slug}.png`));
    console.log("ok", item.slug);
    ok++;
  } catch (e) {
    console.error("FAIL", item.slug, e.message);
    fail.push(item.slug);
  }
}
console.log(`\n${ok}/${only ? only.length : EMPIRES_E96.length} generated.`);
if (fail.length) console.log("failed:", fail.join(", "));
