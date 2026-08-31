// Generates hand-drawn SVG anatomical-diagram-style icons for the Guess the
// Human Body Part/Organ episode. Clean single-color clinical silhouettes —
// never photographic/gory — same pictogram house style as
// gen-dinosaurs92.mjs / gen-religionsymbols91.mjs.
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { BODY_PARTS_E94 } from "../src/Quiz/bodyPartsE94Data.js";

const DEST = "public/bodyparts94";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const S = 700;
const BG = "#FAF7F0";
const INK = "#B23A48"; // a muted clinical red-maroon reads more "anatomy diagram" than navy
const CARD_BORDER = "rgba(0,0,0,0.09)";

const card = (inner) => `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${S}" height="${S}" rx="40" fill="${BG}"/>
  <rect x="20" y="20" width="${S - 40}" height="${S - 40}" rx="28" fill="none" stroke="${CARD_BORDER}" stroke-width="2"/>
  <g transform="translate(350,350)">${inner}</g>
</svg>`;

// ---------- shared primitives (all centered on 0,0) ----------
const L = (x1, y1, x2, y2, w = 22, color = INK, cap = "round") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="${cap}"/>`;
// stroke defaults to match fill (E91/E92 lesson) — pass stroke explicitly for a ring/border.
const C = (cx, cy, r, fill = INK, stroke, w = 18) => {
  const s = stroke === undefined ? fill : stroke;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${s === "none" ? "none" : s}" stroke-width="${s === "none" ? 0 : w}"/>`;
};
const E = (cx, cy, rx, ry, fill = INK, rot = 0) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" transform="rotate(${rot} ${cx} ${cy})"/>`;
const P = (points, fill = INK, stroke = "none", w = 0) => `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
const PATH = (d, fill = "none", stroke = INK, w = 18, cap = "round", join = "round") => `<path d="${d}" fill="${fill}" stroke="${stroke === "none" ? "none" : stroke}" stroke-width="${stroke === "none" ? 0 : w}" stroke-linecap="${cap}" stroke-linejoin="${join}"/>`;

// A closed "ribbon" silhouette from parallel top/bottom point arrays (E92 technique).
function ribbon(topPts, botPts, fill = INK) {
  const top = topPts.map(([x, y], i) => (i === 0 ? `M ${x},${y}` : `Q ${topPts[i - 1][0] + (x - topPts[i - 1][0]) * 0.5},${topPts[i - 1][1]} ${x},${y}`)).join(" ");
  const botRev = [...botPts].reverse();
  const bot = botRev.map(([x, y], i) => (i === 0 ? `L ${x},${y}` : `Q ${botRev[i - 1][0] + (x - botRev[i - 1][0]) * 0.5},${botRev[i - 1][1]} ${x},${y}`)).join(" ");
  return PATH(`${top} ${bot} Z`, fill);
}
// A thick tube following a curved path, built as a stroked line (simplest
// way to render "a tube" at a consistent width along a bend).
const tube = (d, w = 40, fill = "none", stroke = INK) => PATH(d, fill, stroke, w, "round", "round");
// Small scattered dots (used for texture: taste buds, gland clusters, bumps).
// Defaults to BG so dots read as light punches on an ink-filled shape — an
// INK-on-INK default (like E91's original C() stroke gotcha) would render
// completely invisible; pass fill explicitly when dotting a lighter shape.
function dots(points, r = 8, fill = BG) {
  let s = "";
  for (const [x, y] of points) s += C(x, y, r, fill, "none");
  return s;
}

const draw = {
  // ---------------- EASY ----------------
  heart: () => {
    let s = PATH(`M 0,90 C -110,10 -100,-90 -30,-95 C 0,-98 0,-60 0,-40 C 0,-60 0,-98 30,-95 C 100,-90 110,10 0,90 Z`, INK);
    s += tube(`M -20,-95 Q -15,-140 10,-150`, 22); // vessel stub
    s += tube(`M 15,-92 Q 30,-135 55,-145`, 20);
    return s;
  },
  brain: () => {
    let s = E(0, -10, 150, 120, INK);
    s += PATH(`M -110,-40 Q -90,-70 -60,-45 Q -30,-75 0,-45 Q 30,-75 60,-45 Q 90,-70 110,-40`, "none", BG, 10); // fold lines
    s += PATH(`M -100,10 Q -70,-15 -40,10 Q -10,-15 20,10 Q 50,-15 80,10 Q 100,-5 105,10`, "none", BG, 10);
    s += PATH(`M -90,55 Q -60,30 -30,55 Q 0,30 30,55 Q 60,30 90,55`, "none", BG, 9);
    s += C(75, 75, 45, INK); // cerebellum bump
    s += PATH(`M 45,60 Q 75,70 105,60`, "none", BG, 6);
    return s;
  },
  eye: () => {
    let s = PATH(`M -140,0 Q -60,-90 0,-90 Q 60,-90 140,0 Q 60,90 0,90 Q -60,90 -140,0 Z`, INK, BG, 14);
    s += C(0, 0, 70, "#FAF7F0", "none");
    s += C(0, 0, 55, INK, "none");
    s += C(0, 0, 26, "#1A1A1A", "none");
    s += C(-15, -18, 10, "#FAF7F0", "none");
    return s;
  },
  ear: () => {
    // v2: the first attempt read as a plain comma — added a distinct lobe
    // bump and a second inner ridge so the characteristic S-curve texture
    // of a real outer ear actually shows
    let s = PATH(`M 20,-140 Q 120,-135 120,-30 Q 122,60 50,105 Q 10,128 -15,105 Q -35,85 -15,65 Q 5,45 -10,15 Q -30,-20 -70,-25 Q -110,-30 -100,-80 Q -90,-135 20,-140 Z`, INK);
    s += C(-5, 95, 38, INK); // earlobe
    s += PATH(`M 15,-100 Q 85,-95 88,-20 Q 90,45 40,75`, "none", BG, 16); // outer ridge (helix)
    s += PATH(`M -55,-40 Q -10,-35 5,10`, "none", BG, 12); // inner ridge (antihelix)
    return s;
  },
  nose: () => {
    let s = P("-20,-140 20,-140 70,110 -70,110", INK);
    s += E(-32, 100, 26, 20, BG);
    s += E(32, 100, 26, 20, BG);
    return s;
  },
  hand: () => {
    let s = E(0, 60, 95, 110, INK);
    const fingers = [[-70, -10, -8], [-25, -40, -3], [20, -40, 3], [65, -15, 8]];
    for (const [x, y, tilt] of fingers) s += `<g transform="rotate(${tilt} ${x} ${y})">${P(`${x - 22},${y} ${x + 22},${y} ${x + 18},${y - 150} ${x - 18},${y - 150}`, INK)}</g>`;
    s += `<g transform="rotate(-45 -95 40)">${P("-95,10 -55,10 -50,90 -100,90", INK)}</g>`; // thumb
    return s;
  },
  foot: () => {
    // v2: toes were too small/tucked inside the main blob to read at
    // thumbnail scale — enlarged and pushed them to protrude past the edge
    let s = PATH(`M -120,80 Q -145,10 -110,-50 Q -80,-100 0,-105 Q 85,-108 115,-55 Q 128,-25 122,10 Q 118,50 85,80 Q 30,105 -60,102 Q -100,100 -120,80 Z`, INK);
    const toes = [[135, -75], [150, -40], [155, -5], [150, 30], [132, 60]];
    for (const [x, y] of toes) s += C(x, y, 26, INK);
    return s;
  },
  lung: () => {
    let s = PATH(`M -20,-120 Q -100,-110 -110,0 Q -115,90 -60,120 Q -20,135 -15,90 L -15,-100 Z`, INK); // left
    s += PATH(`M 20,-120 Q 100,-110 110,0 Q 118,100 55,125 Q 20,138 15,90 L 15,-100 Z`, INK); // right (slightly bigger)
    s += tube(`M 0,-140 L 0,-100`, 26);
    s += tube(`M 0,-100 Q -15,-95 -15,-100`, 20);
    s += tube(`M 0,-100 Q 15,-95 15,-100`, 20);
    return s;
  },
  stomach: () => {
    let s = PATH(`M -70,-130 Q 40,-140 60,-60 Q 90,20 40,90 Q -10,150 -70,110 Q -120,80 -100,10 Q -90,-40 -100,-80 Q -105,-115 -70,-130 Z`, INK);
    s += tube(`M -30,-125 L -30,-150`, 22);
    return s;
  },
  skin: () => {
    let s = P("-140,-90 140,-90 140,90 -140,90", INK);
    s += dots([[-90, -30], [-40, 20], [20, -40], [80, 10], [-100, 60], [60, 60]], 10);
    s += PATH(`M -60,-60 q 8,10 0,20 q -8,10 0,20`, "none", BG, 6);
    s += PATH(`M 30,-10 q 8,10 0,20 q -8,10 0,20`, "none", BG, 6);
    return s;
  },
  tooth: () => {
    let s = PATH(`M -60,-100 Q -70,-140 -20,-140 Q 0,-150 20,-140 Q 70,-140 60,-100 Q 55,-60 30,-50 Q 20,20 5,60 Q 0,80 -10,55 Q -25,15 -35,-50 Q -55,-60 -60,-100 Z`, INK);
    return s;
  },
  tongue: () => {
    let s = PATH(`M -100,40 Q -110,-60 -40,-100 Q 0,-120 40,-100 Q 110,-60 100,40 Q 90,110 0,130 Q -90,110 -100,40 Z`, INK);
    s += PATH(`M 0,-90 L 0,100`, "none", BG, 6); // center groove
    s += dots([[-45, -30], [0, -55], [45, -30], [-25, 20], [25, 20], [0, 55]], 9); // taste buds
    return s;
  },
  mouth: () => {
    let s = PATH(`M -140,0 Q -80,-70 0,-75 Q 80,-70 140,0 Q 80,75 0,80 Q -80,75 -140,0 Z`, INK);
    s += P("-90,-5 90,-5 90,15 -90,15", BG);
    for (let i = -3; i <= 3; i++) s += P(`${i * 24 - 10},-4 ${i * 24 + 10},-4 ${i * 24 + 10},16 ${i * 24 - 10},16`, "#FAF7F0", INK, 3);
    return s;
  },
  knee: () => {
    // v2: the bones and kneecap were nearly the same width, so it read as
    // one smooth blob instead of a joint — narrowed the bone segments and
    // widened the kneecap bulge for a clear narrow-wide-narrow profile
    let s = P("-25,-160 25,-160 30,-40 -30,-40", INK); // thigh
    s += P("-30,40 30,40 25,160 -25,160", INK); // shin
    s += E(0, 0, 65, 75, INK); // kneecap
    return s;
  },
  elbow: () => {
    // v2: two thin bone tubes meeting at a clear angled joint, instead of
    // overlapping polygons that read as a lightning bolt
    let s = tube(`M -20,-150 L 5,-15`, 70);
    s += tube(`M 5,-15 L 95,130`, 62);
    s += C(10, -10, 48, INK);
    s += P("45,15 82,26 55,52", INK); // olecranon point at the back of the joint
    return s;
  },
  skull: () => {
    let s = PATH(`M -130,-20 Q -140,-140 0,-150 Q 140,-140 130,-20 Q 128,40 90,55 L 95,110 Q 60,140 0,140 Q -60,140 -95,110 L -90,55 Q -128,40 -130,-20 Z`, INK);
    s += E(-55, -30, 32, 38, BG);
    s += E(55, -30, 32, 38, BG);
    s += P("-15,20 15,20 0,55", BG);
    s += P("-70,105 70,105 70,120 -70,120", BG);
    return s;
  },
  "rib-cage": () => {
    let s = L(0, -140, 0, 140, 26); // sternum
    for (let i = 0; i < 5; i++) {
      const y = -90 + i * 55;
      s += tube(`M 15,${y} Q 140,${y - 10} 150,${y + 60}`, 18);
      s += tube(`M -15,${y} Q -140,${y - 10} -150,${y + 60}`, 18);
    }
    return s;
  },
  bicep: () => {
    // v2: a spindle-shaped muscle belly (pinched at both tendon ends,
    // bulging in the middle) reads as a muscle; the old flat ribbon read
    // as a generic blob
    let s = PATH(`M 0,-150 Q -18,-140 -18,-95 Q -62,-55 -62,0 Q -62,55 -18,95 Q -18,140 0,150 Q 18,140 18,95 Q 62,55 62,0 Q 62,-55 18,-95 Q 18,-140 0,-150 Z`, INK);
    return s;
  },

  // ---------------- MEDIUM ----------------
  liver: () => {
    let s = PATH(`M -150,-30 Q -140,-100 -40,-110 Q 90,-120 150,-40 Q 170,10 120,50 Q 40,100 -40,80 Q -130,60 -150,-30 Z`, INK);
    s += PATH(`M -30,-95 Q -50,-20 -100,60`, "none", BG, 8); // lobe division groove
    return s;
  },
  kidney: () => {
    // v2: a hand-derived bean outline kept reading as a paisley/comma —
    // switched to the more robust "mask a notch out of an oval" technique
    // (same trick as E91's crescentMask): one BG-colored ellipse punched
    // into the side of the main ellipse makes a clean concave hilum notch
    let s = E(0, 0, 110, 140, INK, -8);
    s += E(75, 0, 58, 68, BG, -8);
    return s;
  },
  spine: () => {
    let s = "";
    const xs = [0, -8, -12, -10, -2, 8, 14, 12, 4, -6];
    for (let i = 0; i < xs.length; i++) s += P(`${xs[i] - 28},${-160 + i * 36} ${xs[i] + 28},${-160 + i * 36} ${xs[i] + 24},${-160 + i * 36 + 26} ${xs[i] - 24},${-160 + i * 36 + 26}`, INK);
    return s;
  },
  bladder: () => {
    let s = C(0, 20, 100, INK);
    s += tube(`M -50,-70 Q -55,-110 -50,-140`, 18);
    s += tube(`M 50,-70 Q 55,-110 50,-140`, 18);
    s += tube(`M 0,110 L 0,150`, 20);
    return s;
  },
  spleen: () => {
    let s = PATH(`M -120,-40 Q -110,-100 0,-100 Q 120,-100 120,-10 Q 120,60 20,70 Q -60,78 -100,30 Q -125,0 -120,-40 Z`, INK);
    return s;
  },
  pancreas: () => {
    let s = ribbon([[-140, -10], [-60, -50], [40, -30], [110, -5]], [[-140, 30], [-60, 50], [40, 25], [110, 15]]);
    return s;
  },
  gallbladder: () => {
    let s = PATH(`M -10,-120 Q 60,-115 65,-40 Q 70,50 10,90 Q -50,120 -70,60 Q -85,15 -60,-20 Q -70,-70 -10,-120 Z`, INK);
    return s;
  },
  femur: () => {
    let s = P("-30,-150 30,-150 22,120 -22,120", INK);
    s += C(-50, -155, 45, INK);
    s += C(-40, 135, 38, INK) + C(40, 135, 38, INK);
    return s;
  },
  tonsils: () => {
    let s = E(-55, 0, 45, 60, INK) + E(55, 0, 45, 60, INK);
    s += dots([[-55, -10], [-55, 20], [55, -10], [55, 20]], 6);
    return s;
  },
  cartilage: () => {
    let s = P("-100,20 100,20 100,60 -100,60", INK);
    s += PATH(`M -100,20 Q 0,-40 100,20`, INK);
    return s;
  },
  ligament: () => {
    let s = P("-140,-100 -60,-100 -60,-60 -140,-60", INK) + P("60,60 140,60 140,100 60,100", INK);
    s += tube(`M -90,-80 L 90,80`, 24);
    s += tube(`M -90,80 L 90,-80`, 24);
    return s;
  },
  "achilles-tendon": () => {
    let s = ribbon([[-60, -140], [-40, -60], [-15, 40]], [[60, -140], [40, -60], [15, 40]]);
    s += E(0, 90, 55, 40, INK);
    return s;
  },
  coccyx: () => {
    let s = P("-30,-60 30,-60 20,-10 -20,-10", INK) + P("-20,-10 20,-10 12,30 -12,30", INK) + P("-12,30 12,30 0,70", INK);
    return s;
  },
  patella: () => {
    let s = P("-70,-50 70,-50 40,90 -40,90", INK);
    return s;
  },
  clavicle: () => {
    let s = tube(`M -140,20 Q -70,-40 0,0 Q 70,40 140,-20`, 34);
    return s;
  },
  trachea: () => {
    let s = tube(`M 0,-140 L 0,40`, 60);
    for (let y = -120; y < 20; y += 24) s += PATH(`M -30,${y} Q 0,${y + 14} 30,${y}`, "none", BG, 6);
    s += tube(`M 0,40 Q -50,70 -80,130`, 40);
    s += tube(`M 0,40 Q 50,70 80,130`, 40);
    return s;
  },
  "vocal-cords": () => {
    let s = P("-120,-100 120,-100 120,100 -120,100", "none", INK, 14);
    s += PATH(`M -90,-10 Q -20,-30 -10,-10`, "none", INK, 20);
    s += PATH(`M 90,-10 Q 20,-30 10,-10`, "none", INK, 20);
    return s;
  },
  "small-intestine": () => {
    let s = "";
    let y = -130;
    for (let i = 0; i < 6; i++) {
      const dir = i % 2 === 0 ? 1 : -1;
      s += tube(`M ${-120 * dir},${y} Q ${120 * dir},${y} ${120 * dir},${y + 40} Q ${120 * dir},${y + 45} ${-120 * dir},${y + 45}`, 26);
      y += 45;
    }
    return s;
  },

  // ---------------- HARD ----------------
  appendix: () => {
    let s = E(-40, -20, 60, 45, INK);
    s += tube(`M 10,10 Q 60,60 50,140`, 24);
    return s;
  },
  thyroid: () => {
    let s = tube(`M 0,-90 L 0,60`, 34);
    s += E(-70, 20, 55, 45, INK) + E(70, 20, 55, 45, INK);
    s += P("-30,10 30,10 30,35 -30,35", INK);
    return s;
  },
  cornea: () => {
    let s = C(0, 20, 130, "none", INK, 16);
    s += PATH(`M -110,-60 Q 0,-160 110,-60`, "none", INK, 22);
    return s;
  },
  esophagus: () => {
    let s = tube(`M 0,-150 L 0,150`, 56);
    s += PATH(`M -28,-150 L -28,150`, "none", BG, 5);
    s += PATH(`M 28,-150 L 28,150`, "none", BG, 5);
    return s;
  },
  diaphragm: () => {
    let s = PATH(`M -150,40 Q -80,-70 0,-60 Q 80,-70 150,40 Q 80,20 0,25 Q -80,20 -150,40 Z`, INK);
    return s;
  },
  sternum: () => {
    let s = P("-35,-150 35,-150 35,60 15,60 15,110 -15,110 -15,60 -35,60", INK);
    return s;
  },
  larynx: () => {
    let s = P("-80,-120 80,-120 90,60 -90,60", INK);
    s += P("-15,-140 15,-140 25,-110 -25,-110", INK); // adam's apple ridge
    s += PATH(`M -50,-10 Q 0,-30 -10,-10`, "none", BG, 14);
    s += PATH(`M 50,-10 Q 0,-30 10,-10`, "none", BG, 14);
    return s;
  },
  retina: () => {
    let s = C(0, 20, 140, "none", INK, 10);
    s += PATH(`M -130,-70 Q 20,-170 130,-90 Q 130,-30 100,10`, "none", INK, 26);
    s += C(60, -40, 14, INK, "none");
    return s;
  },
  "adrenal-gland": () => {
    let s = PATH(`M -90,40 Q -100,90 -80,120 Q -50,150 0,140 Q 60,140 80,110 Q 100,70 60,20 Q 0,-30 -90,40 Z`, INK); // kidney
    s += P("-50,10 40,0 30,-40 -60,-30", INK); // adrenal cap
    return s;
  },
  "sciatic-nerve": () => {
    let s = tube(`M -20,-150 Q -30,-80 -10,-20 Q 10,60 40,150`, 26);
    s += tube(`M 10,80 Q 40,90 60,130`, 16);
    return s;
  },
  amygdala: () => {
    let s = E(0, -10, 150, 120, "#E7C9A9");
    s += E(-40, 20, 45, 30, INK, -20);
    return s;
  },
  hippocampus: () => {
    let s = E(0, -10, 150, 120, "#E7C9A9");
    s += PATH(`M -60,-40 Q -20,-60 0,-20 Q 20,20 60,20 Q 90,20 85,-10`, "none", INK, 26);
    return s;
  },
  cerebellum: () => {
    let s = E(0, -60, 140, 90, "#E7C9A9");
    s += C(20, 60, 85, INK);
    for (let i = -3; i <= 3; i++) s += PATH(`M ${-60 + i * 20},${20} Q ${-55 + i * 20},${90} ${-60 + i * 20},${110}`, "none", BG, 5);
    return s;
  },
  epiglottis: () => {
    let s = P("-70,60 70,60 70,-20 0,-140 -70,-20", INK);
    return s;
  },
  uvula: () => {
    let s = PATH(`M -120,-40 Q 0,40 120,-40`, "none", INK, 24);
    s += PATH(`M -20,0 Q 0,60 20,0 Q 15,80 0,90 Q -15,80 -20,0 Z`, INK);
    return s;
  },
  deltoid: () => {
    let s = P("-90,-100 90,-100 25,140 -25,140", INK);
    return s;
  },

  // ---------------- IMPOSSIBLE ----------------
  "pineal-gland": () => {
    let s = E(0, -10, 150, 120, "#E7C9A9");
    s += P("-15,-15 15,-15 12,25 -12,25", INK) + P("-12,25 12,25 0,45", INK);
    return s;
  },
  "semicircular-canals": () => {
    let s = PATH(`M -60,-20 Q -60,-90 10,-90 Q 70,-90 70,-30`, "none", INK, 22);
    s += PATH(`M -40,10 Q 10,-50 60,-10 Q 90,20 60,50`, "none", INK, 22);
    s += PATH(`M -70,-40 Q -20,20 -60,60 Q -90,80 -100,50`, "none", INK, 22);
    return s;
  },
  "corpus-callosum": () => {
    let s = E(0, -10, 150, 120, "#E7C9A9");
    s += PATH(`M -110,-30 Q 0,-100 110,-30`, "none", INK, 30);
    return s;
  },
  "islets-of-langerhans": () => {
    let s = ribbon([[-140, -10], [-60, -50], [40, -30], [110, -5]], [[-140, 30], [-60, 50], [40, 25], [110, 15]], "#E7C9A9");
    s += dots([[-100, 0], [-60, -10], [-20, 5], [20, -5], [60, 5], [90, 5], [-30, 20], [40, 15]], 9, INK);
    return s;
  },
  stapes: () => {
    let s = scaleWrap(
      P("-50,60 50,60 50,90 -50,90", INK) +
        L(-40, 60, -40, -30, 14) +
        L(40, 60, 40, -30, 14) +
        C(0, -40, 45, INK)
    , 1.6);
    return s;
  },
  duodenum: () => {
    let s = tube(`M -80,-100 Q 80,-100 90,0 Q 80,100 -60,90`, 44);
    s += C(20, -10, 70, "#E7C9A9");
    return s;
  },
  "xiphoid-process": () => {
    let s = scaleWrap(P("-40,-60 40,-60 0,80", INK), 1.7);
    return s;
  },
  "vomer-bone": () => {
    let s = P("-8,-120 8,-120 40,100 -40,100", INK);
    s += PATH(`M -70,100 Q 0,140 70,100`, "none", INK, 8);
    return s;
  },
  cochlea: () => {
    let s = spiral(2.3, 150, 0.12, 0, 0, 18);
    return s;
  },
  glottis: () => {
    let s = P("-130,-40 130,-40 130,-10 -130,-10", INK);
    s += P("-130,40 130,40 130,10 -130,10", INK);
    s += P("-20,-10 20,-10 0,10", "#FAF7F0");
    return s;
  },
  meninges: () => {
    let s = E(0, -10, 150, 120, "none", 0);
    s = `<ellipse cx="0" cy="-10" rx="155" ry="125" fill="none" stroke="${INK}" stroke-width="10"/>`;
    s += `<ellipse cx="0" cy="-10" rx="140" ry="112" fill="none" stroke="${INK}" stroke-width="8"/>`;
    s += `<ellipse cx="0" cy="-10" rx="128" ry="100" fill="#E7C9A9" stroke="${INK}" stroke-width="4"/>`;
    return s;
  },
  peritoneum: () => {
    let s = `<rect x="-150" y="-120" width="300" height="240" rx="60" fill="none" stroke="${INK}" stroke-width="10"/>`;
    s += E(-60, 0, 55, 60, "#E7C9A9") + E(60, -20, 50, 45, "#E7C9A9") + E(30, 60, 45, 40, "#E7C9A9");
    return s;
  },
  trapezius: () => {
    let s = P("0,-140 90,-40 40,140 -40,140 -90,-40", INK);
    return s;
  },
  "sphenoid-bone": () => {
    let s = C(0, 0, 45, INK);
    s += P("-40,-10 -140,-70 -150,-30 -60,20", INK) + P("40,-10 140,-70 150,-30 60,20", INK);
    s += P("-30,25 -100,90 -70,110 -10,50", INK) + P("30,25 100,90 70,110 10,50", INK);
    return s;
  },
  "pia-mater": () => {
    let s = `<ellipse cx="0" cy="-10" rx="150" ry="120" fill="none" stroke="${INK}" stroke-width="6"/>`;
    s += PATH(`M -110,-40 Q -90,-70 -60,-45 Q -30,-75 0,-45 Q 30,-75 60,-45 Q 90,-70 110,-40`, "none", INK, 4);
    return s;
  },
  cecum: () => {
    let s = C(-20, 0, 90, INK);
    s += tube(`M 30,40 Q 80,90 70,150`, 22);
    return s;
  },
  ileum: () => {
    let s = "";
    let y = -120;
    for (let i = 0; i < 4; i++) {
      const dir = i % 2 === 0 ? 1 : -1;
      s += tube(`M ${-100 * dir},${y} Q ${100 * dir},${y} ${100 * dir},${y + 35} Q ${100 * dir},${y + 40} ${-100 * dir},${y + 40}`, 22);
      y += 40;
    }
    s += C(-100, 40, 55, INK);
    return s;
  },
  hypothalamus: () => {
    let s = E(0, -60, 60, 45, INK);
    s += tube(`M 0,-15 L 0,20`, 14);
    s += C(0, 45, 35, INK);
    return s;
  },
};

// A single large raised/swept-back shape scaled up around the origin (E92's
// scaleWrap technique) — needed for the tiniest impossible-tier structures
// (stapes, xiphoid process) whose literal small coordinates would otherwise
// leave most of the card empty.
function scaleWrap(inner, factor = 1.6) {
  return `<g transform="scale(${factor})">${inner}</g>`;
}
// A tight coiled spiral (used for the cochlea) — same technique family as
// E91's spiral()/triskelion primitives.
// endRatio = final radius as a fraction of the start radius, reached after
// exactly `turns` full rotations — this replaces a fixed 0.82-per-step decay
// that (at cochlea's 6 turns) packed windings so tightly the stroke width
// swallowed the gaps and it rendered as one solid disc instead of a coil.
function spiral(turns, r, endRatio = 0.15, cx = 0, cy = 0, w = 20) {
  let d = `M ${cx + r},${cy}`;
  const steps = 80;
  const totalSteps = steps * turns;
  for (let i = 1; i <= totalSteps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const rad = r * Math.pow(endRatio, i / totalSteps);
    d += ` L ${cx + Math.cos(t) * rad},${cy + Math.sin(t) * rad}`;
  }
  return PATH(d, "none", INK, w);
}

const only = process.argv[2] ? process.argv.slice(2) : null;
let ok = 0, fail = [];
for (const item of BODY_PARTS_E94) {
  if (only && !only.includes(item.slug)) continue;
  try {
    const fn = draw[item.slug];
    if (!fn) throw new Error("no drawing function defined");
    const svg = card(fn());
    await sharp(Buffer.from(svg)).png().toFile(path.join(DEST, `${item.slug}.png`));
    console.log("ok", item.slug);
    ok++;
  } catch (e) {
    console.error("FAIL", item.slug, e.message);
    fail.push(item.slug);
  }
}
console.log(`\n${ok}/${only ? only.length : BODY_PARTS_E94.length} generated.`);
if (fail.length) console.log("failed:", fail.join(", "));
