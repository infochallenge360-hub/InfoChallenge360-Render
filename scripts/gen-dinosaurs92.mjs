// Generates hand-drawn SVG pictograms for the Guess the Dinosaur episode.
// Real Wikipedia/Commons photos are a poor fit for this topic (per
// quiz-free-images memory: the "lead image" for most dinosaur genera is a
// museum SKELETON, a fossil slab, or a labeled scientific diagram — not the
// fleshed silhouette a general audience would recognize) and AI-generated
// images are excluded by the channel's standing hard rule — so every item is
// a hand-drawn flat side-profile silhouette instead, same technique family as
// gen-roadsigns.mjs / gen-weather85.mjs / gen-religionsymbols91.mjs.
//
// Single neutral ink-on-cream silhouette style, no texture/color detail
// (matches every other pictogram episode's house style).
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { DINOSAURS_E92 } from "../src/Quiz/dinosaursE92Data.js";

const DEST = "public/dinosaurs92";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const S = 700;
const BG = "#FAF7F0";
const INK = "#2B2E4A";
const CARD_BORDER = "rgba(0,0,0,0.09)";

const card = (inner) => `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${S}" height="${S}" rx="40" fill="${BG}"/>
  <rect x="20" y="20" width="${S - 40}" height="${S - 40}" rx="28" fill="none" stroke="${CARD_BORDER}" stroke-width="2"/>
  <g transform="translate(350,350)">${inner}</g>
</svg>`;

// ---------- shared primitives (all centered on 0,0) ----------
const L = (x1, y1, x2, y2, w = 22, color = INK, cap = "round") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="${cap}"/>`;
// NOTE (lesson carried over from E91): stroke defaults to the FILL color, not
// a separate ink outline — E91's original C() defaulted stroke to INK even
// when only a light fill was passed, which drew a thick dark ring around
// light-colored circles (eyes, eye-spots) and nearly swallowed them. Pass an
// explicit stroke only when you actually want a two-tone ring/border.
const C = (cx, cy, r, fill = INK, stroke, w = 18) => {
  const s = stroke === undefined ? fill : stroke;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${s === "none" ? "none" : s}" stroke-width="${s === "none" ? 0 : w}"/>`;
};
const P = (points, fill = INK, stroke = "none", w = 0) => `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
const PATH = (d, fill = "none", stroke = INK, w = 18, cap = "round", join = "round") => `<path d="${d}" fill="${fill}" stroke="${stroke === "none" ? "none" : stroke}" stroke-width="${stroke === "none" ? 0 : w}" stroke-linecap="${cap}" stroke-linejoin="${join}"/>`;

// A row of alternating tall/short trapezoid plates along a back curve —
// reusable for stegosaur-style plates.
function platesAlong(points, sizes, baseW = 34) {
  let s = "";
  for (let i = 0; i < points.length; i++) {
    const [x, y, ang] = points[i];
    const h = sizes[i % sizes.length];
    s += `<g transform="translate(${x},${y}) rotate(${ang})"><polygon points="${-baseW / 2},0 ${baseW / 2},0 ${baseW / 4},${-h} ${-baseW / 4},${-h}" fill="${INK}"/></g>`;
  }
  return s;
}

// Overlapping filled circles along a path — reusable for scaly/bumpy armor
// texture or a feathered crest (same "scalloped mane" technique as E91's
// lion-of-judah).
function scallopRow(points, r) {
  let s = "";
  for (const [x, y] of points) s += C(x, y, r, INK, "none");
  return s;
}

// Generic body-plan builders shared across many items. Everything is built
// as solid overlapping filled shapes (never thin unfilled outlines) so
// joints always read as one connected creature instead of disjointed sticks
// — the lesson carried over from E91's lion-of-judah fix.
const GROUND = 190;

// A closed "ribbon" silhouette (used for torsos/necks/tails): give parallel
// top-edge and bottom-edge points sharing the same x per index; the two
// edges are auto-connected into one filled path. Keep top_y < bottom_y at
// every index (remember SVG y grows downward) so the ribbon never pinches
// to zero thickness except deliberately at a tapered tip.
function ribbon(topPts, botPts, fill = INK) {
  const top = topPts.map(([x, y], i) => (i === 0 ? `M ${x},${y}` : `Q ${topPts[i - 1][0] + (x - topPts[i - 1][0]) * 0.5},${topPts[i - 1][1]} ${x},${y}`)).join(" ");
  const botRev = [...botPts].reverse();
  const bot = botRev.map(([x, y], i) => (i === 0 ? `L ${x},${y}` : `Q ${botRev[i - 1][0] + (x - botRev[i - 1][0]) * 0.5},${botRev[i - 1][1]} ${x},${y}`)).join(" ");
  return PATH(`${top} ${bot} Z`, fill);
}
// A single thick tapered leg as a trapezoid, hip at (x,topY) down to the
// ground at (x+drift,GROUND).
function legPoly(x, topY, w, drift = 6, groundW, groundY = GROUND) {
  const gw = groundW ?? w * 0.8;
  return P(`${x - w / 2},${topY} ${x + w / 2},${topY} ${x + drift + gw / 2},${groundY} ${x + drift - gw / 2},${groundY}`, INK);
}
// Scales a whole sub-drawing up around the origin — the tiny 4-winged/
// membrane-winged dino-birds (yi-qi, microraptor, anchiornis, epidexipteryx)
// are genuinely small animals, but drawn at their literal small coordinates
// they left most of the 700x700 card empty, reading as a weak icon next to
// every other item's card-filling silhouette.
const scaleWrap = (inner, factor = 1.9) => `<g transform="scale(${factor})">${inner}</g>`;
function tinyArm(x, y, len = 30, ang = 30, w = 16) {
  return L(x, y, x + Math.cos((ang * Math.PI) / 180) * len, y + Math.sin((ang * Math.PI) / 180) * len, w);
}
// four thick legs for a standing quadruped: front pair near xFront, back pair near xBack
function fourLegs(xFront, xBack, topY = 30, w = 46, spread = 18) {
  return legPoly(xFront - spread, topY, w) + legPoly(xFront + spread, topY, w) + legPoly(xBack - spread, topY, w) + legPoly(xBack + spread, topY, w);
}
// A thick tapered horn as a clean triangle from a wide base to a point tip,
// perpendicular to its own direction — far more reliable than hand-picking
// 4 corner points (which kept producing horns that read as a spiky fringe
// merging into whatever else was nearby, on triceratops's first 3 attempts).
function horn(baseX, baseY, tipX, tipY, baseW = 24) {
  const dx = tipX - baseX, dy = tipY - baseY;
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * (baseW / 2), ny = (dx / len) * (baseW / 2);
  return P(`${baseX - nx},${baseY - ny} ${baseX + nx},${baseY + ny} ${tipX},${tipY}`, INK);
}
// A single large raised/swept-back membrane wing (one wing shown in profile
// reads far clearer at icon scale than two overlapping wings) — shoulder at
// (sx,sy), reaching bendX/bendY at the wrist bend, then out to the tip.
function wing(sx, sy, bendX, bendY, tipX, tipY, trailX, trailY) {
  return P(`${sx},${sy} ${bendX},${bendY} ${tipX},${tipY} ${trailX},${trailY} ${sx - 20},${sy + 30}`, INK);
}

const draw = {
  "tyrannosaurus-rex": () => {
    // hips are the thick mass around x=-180 (both legs planted there); tail
    // tapers left, neck/body tapers right up to the head
    let s = ribbon(
      [[-300, -10], [-225, -50], [-160, -85], [-50, -72], [55, -85], [130, -110]],
      [[-300, 6], [-225, 34], [-160, 42], [-50, 28], [55, -20], [130, -75]]
    );
    s += P("120,-115 205,-138 230,-105 212,-62 155,-52 118,-80", INK); // blocky jaw head
    s += legPoly(-145, 30, 60, 15) + legPoly(-82, 20, 50, 15);
    s += tinyArm(88, -35, 26, 55, 16);
    s += tinyArm(105, -22, 24, 75, 16);
    return s;
  },
  triceratops: () => {
    // v4: the first 3 attempts all fused frill+horns+head into one crown of
    // spikes because the frill's base attached right where the horns' bases
    // were, leaving no visual gap. Fixed by attaching the frill much lower
    // on the skull (rear/neck side) and using the new horn() helper for
    // clean wide-based horns, so the head circle's own bare curve shows
    // through as a gap between the horn cluster and the frill.
    let s = ribbon([[-190, -5], [-100, -45], [0, -55], [60, -55]], [[-190, 45], [-100, 55], [0, 55], [60, 40]]); // low sturdy torso
    s += ribbon([[-230, 15], [-190, 20]], [[-230, 35], [-190, 45]]); // short stub tail
    s += PATH(`M 122,-80 Q 140,-120 170,-110 Q 180,-88 160,-56 Q 142,-46 126,-58 Z`, INK); // small frill bump — kept deliberately small so the horns dominate
    s += C(96, -70, 32); // small distinct skull
    s += P("118,-46 156,-48 158,-18 126,-8", INK); // beaked snout, low & forward
    // horns made much longer/bolder than the frill so they're unmistakably
    // the dominant feature — thin horns lost every fight against a same-size
    // frill blob in every earlier attempt
    s += horn(72, -84, -35, -172, 32); // upper brow horn
    s += horn(88, -62, -12, -128, 26); // lower brow horn
    s += horn(118, -44, 86, -54, 15); // short nose horn
    s += fourLegs(58, -95, 45, 52, 20);
    return s;
  },
  stegosaurus: () => {
    let s = ribbon([[-210, -10], [-130, -70], [-30, -80], [70, -50], [130, -30]], [[-210, 30], [-130, 40], [-30, 42], [70, 35], [130, 15]]); // strongly arched back
    s += P("125,-40 185,-45 195,-15 150,0", INK); // small low head
    s += platesAlong(
      [[-160, -62, -70], [-115, -78, -75], [-70, -85, -80], [-25, -83, -85], [20, -72, -95], [65, -58, -105]],
      [55, 80, 95, 90, 70, 50]
    ); // two rows of plates along the arched spine
    // 4 tail spikes near the tail tip
    s += P("-195,10 -235,-15 -220,25", INK) + P("-205,25 -245,10 -220,40", INK);
    s += fourLegs(85, -140, 30, 46, 20);
    return s;
  },
  velociraptor: () => {
    // v2: simplified to two planted legs (the first attempt's bent-thigh +
    // raised-claw geometry didn't connect cleanly to the torso and read as
    // a chaotic zigzag) — one small forward claw hint is enough at this scale
    let s = ribbon([[-90, -10], [-30, -40], [25, -45]], [[-90, 25], [-30, 32], [25, 8]]); // small compact torso
    s += ribbon([[-85, -5], [-170, -30], [-230, -38]], [[-85, 20], [-170, 0], [-230, -15]]); // tail held up + back
    s += ribbon([[20, -42], [55, -65], [90, -75]], [[20, 0], [55, -30], [85, -42]]); // S-curve neck
    s += P("80, -80 118,-92 115,-62 85,-55", INK); // slender snout
    s += legPoly(-55, 15, 26, 8, 18) + legPoly(-15, 12, 24, 8, 16);
    s += P("-25,180 -8,168 -3,190", INK); // small raised sickle-claw hint on the front foot
    s += tinyArm(45, -40, 18, 150, 8);
    return s;
  },
  brachiosaurus: () => {
    // front legs longer than back legs = sloped giraffe-like posture
    let s = ribbon([[-160, 20], [-80, -20], [20, -35], [110, -35]], [[-160, 55], [-80, 60], [20, 50], [110, 55]]);
    s += ribbon([[100, -45], [150, -140], [190, -240], [210, -300]], [[100, 5], [140, -90], [175, -195], [205, -280]]); // long upright neck
    s += P("190,-320 235,-330 240,-295 205,-278", INK); // small head
    s += ribbon([[-160, 25], [-215, 15]], [[-160, 45], [-215, 30]]); // short tail taper start
    s += legPoly(-140, 45, 40, 10, 32, GROUND) + legPoly(-90, 50, 42, 10, 34, GROUND); // shorter back legs
    s += legPoly(60, 40, 46, 8, 36, GROUND + 10) + legPoly(105, 45, 48, 8, 38, GROUND + 10); // longer front legs
    return s;
  },
  brontosaurus: () => {
    let s = ribbon([[-260, 10], [-140, -20], [-20, -35], [90, -35]], [[-260, 30], [-140, 55], [-20, 55], [90, 50]]);
    s += ribbon([[80, -45], [130, -95], [175, -140]], [[80, 5], [125, -35], [165, -90]]); // thicker, more horizontal neck
    s += P("160,-155 205,-165 210,-125 175,-105", INK); // small head
    s += ribbon([[-260, 15], [-305, 40]], [[-260, 35], [-305, 55]]); // very long tapering whip tail
    s += fourLegs(50, -100, 45, 52, 22);
    return s;
  },
  pterodactylus: () => {
    // one large raised wing (not two soft drooping ribbons, which read as a
    // shapeless blob at icon scale) makes the "flying reptile" pose obvious
    let s = wing(-5, -25, -90, -140, -215, -145, -140, -50);
    s += C(50, -15, 26, INK); // small round body
    s += P("48,-40 135,-85 170,-50 125,-10 65,-10", INK); // long thin toothy beak
    s += L(35, 5, 15, 55, 10) + L(60, 5, 78, 55, 10); // short dangling legs
    return s;
  },
  ankylosaurus: () => {
    let s = ribbon([[-160, 10], [-80, -15], [20, -20], [110, -10]], [[-160, 45], [-80, 55], [20, 55], [110, 45]]); // wide flat low body
    s += P("105, -25 150,-30 155,-5 115,10", INK); // rounded snout
    s += scallopRow([[-120, -18], [-70, -28], [-20, -31], [30, -28], [75, -20]], 24); // bumpy armor texture along the back
    s += ribbon([[-160, 15], [-215, 12]], [[-160, 40], [-215, 35]]); // tail leading to the club
    s += C(-222, 24, 26); // bony tail club
    s += fourLegs(90, -110, 45, 50, 20);
    return s;
  },
  spinosaurus: () => {
    let s = ribbon([[-230, -5], [-150, -35], [-40, -55], [60, -45], [130, -60]], [[-230, 15], [-150, 30], [-40, 22], [60, -5], [130, -30]]);
    // jagged sawtooth top (not one smooth dome, which just read as a hunched
    // back) so the sail reads as spine-supported, not a hump
    s += P("-85,-53 -72,-160 -55,-95 -38,-185 -18,-100 0,-190 18,-95 28,-58", INK);
    s += P("115,-68 200,-88 218,-58 198,-32 145,-32 110,-50", INK); // long croc-like snout
    s += ribbon([[-230, 0], [-280, 12]], [[-230, 22], [-280, 32]]); // tail continues
    s += legPoly(-165, 22, 48, 12) + legPoly(-95, 18, 42, 12);
    return s;
  },
  diplodocus: () => {
    let s = ribbon([[-40, 10], [40, -12], [110, -12]], [[-40, 45], [40, 52], [110, 48]]); // small torso
    s += ribbon([[-40, 15], [-140, 8], [-260, 15], [-300, 20]], [[-40, 32], [-140, 22], [-260, 26], [-300, 30]]); // very long thin tail
    s += ribbon([[100, -18], [170, -32], [230, -38]], [[100, 8], [170, 0], [230, -12]]); // very long thin neck
    s += P("225,-40 258,-43 260,-24 230,-14", INK); // tiny head
    s += fourLegs(70, -12, 45, 44, 18);
    return s;
  },
  pteranodon: () => {
    let s = wing(-5, -25, -95, -145, -220, -150, -145, -55);
    s += C(50, -12, 24);
    s += P("46,-38 145,-70 178,-45 140,-14 62,-10", INK); // long toothless beak
    s += PATH(`M 140,-65 Q 195,-108 235,-90 Q 210,-55 152,-48 Z`, INK); // backward-sweeping head crest
    s += L(35, 8, 15, 55, 10) + L(58, 8, 76, 55, 10);
    return s;
  },
  iguanodon: () => {
    let s = ribbon([[-170, 0], [-90, -32], [10, -42], [90, -38]], [[-170, 35], [-90, 45], [10, 50], [90, 35]]);
    s += ribbon([[-170, 5], [-245, 20]], [[-170, 30], [-245, 42]]);
    s += ribbon([[80, -40], [120, -58], [150, -63]], [[80, -3], [120, -22], [145, -33]]);
    s += P("140,-66 180,-70 182,-44 148,-32", INK); // horse-like beak
    s += horn(98, -35, 122, -12, 10); // thumb spike
    s += fourLegs(50, -105, 40, 48, 20);
    return s;
  },
  allosaurus: () => {
    let s = ribbon(
      [[-270, -8], [-205, -42], [-145, -70], [-50, -62], [45, -72], [110, -92]],
      [[-270, 8], [-205, 28], [-145, 36], [-50, 24], [45, -14], [110, -60]]
    );
    s += P("100,-95 172,-112 188,-88 168,-52 125,-48 100,-68", INK); // ridged head
    s += legPoly(-155, 28, 48, 15) + legPoly(-95, 20, 42, 15);
    s += tinyArm(72, -48, 42, 45, 15);
    s += tinyArm(85, -35, 38, 65, 15);
    return s;
  },
  archaeopteryx: () => {
    let s = ribbon([[-50, -5], [-10, -25], [30, -25]], [[-50, 20], [-10, 25], [30, 8]]); // tiny torso
    s += ribbon([[-45, 0], [-100, 10], [-145, 15]], [[-45, 15], [-100, 30], [-145, 35]]); // long bony tail
    s += P("25,-30 56,-40 58,-20 30,-10", INK); // small toothy beak
    s += wing(-5, -18, -62, -88, -132, -95, -78, -22);
    s += L(-5, 15, -15, 55, 8) + L(10, 15, 20, 55, 8);
    return s;
  },
  mosasaurus: () => {
    let s = ribbon([[-220, 0], [-120, -20], [0, -25], [100, -15]], [[-220, 25], [-120, 35], [0, 40], [100, 25]]);
    s += P("90,-25 172,-40 188,-15 165,10 100,10", INK); // long croc-like jaws
    s += P("-220,10 -282,-32 -262,15 -282,55 -220,25", INK); // shark-like tail fluke
    s += P("-55,32 -25,32 -40,78 -72,68", INK); // rear flipper
    s += P("42,15 72,15 62,50 37,45", INK); // front flipper
    return s;
  },
  plesiosaurus: () => {
    let s = ribbon([[-120, -5], [-40, -25], [50, -25], [120, -10]], [[-120, 35], [-40, 50], [50, 50], [120, 30]]); // broad flat body
    s += ribbon([[110, -15], [165, -58], [200, -108], [222, -158]], [[110, 10], [155, -28], [188, -78], [212, -138]]); // very long neck
    s += P("208,-162 240,-168 242,-146 216,-134", INK); // tiny head
    s += P("-88, 32 -48,32 -62,80 -98,70", INK); // rear flipper
    s += P("-8,38 30,38 20,82 -18,76", INK); // front flipper
    s += ribbon([[-120, 0], [-165, 10]], [[-120, 25], [-165, 32]]); // short tail
    return s;
  },
  parasaurolophus: () => {
    let s = ribbon([[-190, 0], [-100, -32], [0, -38], [80, -32]], [[-190, 35], [-100, 45], [0, 48], [80, 35]]);
    s += ribbon([[-190, 5], [-260, 15]], [[-190, 30], [-260, 40]]);
    s += ribbon([[70, -35], [108, -52], [138, -58]], [[70, 2], [108, -18], [133, -28]]);
    s += P("128,-60 174,-66 177,-38 138,-28", INK); // duck-bill snout
    s += PATH(`M 133,-60 Q 98,-138 28,-148 Q 4,-133 18,-113 Q 78,-108 116,-63 Z`, INK); // long backswept tube crest
    s += fourLegs(50, -130, 40, 48, 20);
    return s;
  },
  dilophosaurus: () => {
    let s = ribbon([[-140, -10], [-60, -38], [10, -43]], [[-140, 25], [-60, 33], [10, 8]]);
    s += ribbon([[-135, -5], [-220, 5], [-270, 10]], [[-135, 20], [-220, 25], [-270, 30]]);
    s += ribbon([[5, -40], [45, -68], [80, -83]], [[5, 2], [45, -33], [75, -48]]);
    s += P("70,-88 122,-98 120,-68 92,-53 80,-68", INK); // notched jaw
    s += P("75,-86 55,-158 95,-93", INK) + P("90,-90 78,-163 108,-96", INK); // twin thin crests
    s += legPoly(-90, 20, 32, 10, 20) + legPoly(-40, 15, 28, 10, 18);
    s += tinyArm(45, -40, 22, 140, 10);
    return s;
  },
  pachycephalosaurus: () => {
    let s = ribbon([[-130, -5], [-60, -30], [10, -35]], [[-130, 25], [-60, 32], [10, 15]]);
    s += ribbon([[-125, 0], [-190, 10], [-230, 15]], [[-125, 20], [-190, 28], [-230, 32]]);
    s += ribbon([[5, -35], [40, -55], [65, -65]], [[5, 5], [40, -15], [60, -30]]);
    s += C(85, -80, 32); // thick domed skull
    s += scallopRow([[62, -102], [78, -112], [96, -113], [112, -105]], 8); // small bony knobs around the dome
    s += P("108, -75 138,-70 133,-45 102,-50", INK); // short snout
    s += legPoly(-70, 20, 28, 10, 18) + legPoly(-30, 15, 26, 10, 16);
    return s;
  },
  compsognathus: () => {
    let s = ribbon([[-70, -5], [-25, -22], [15, -25]], [[-70, 15], [-25, 20], [15, 5]]);
    s += ribbon([[-68, 0], [-130, 8], [-170, 10]], [[-68, 12], [-130, 20], [-170, 22]]);
    s += ribbon([[12, -24], [35, -38], [55, -45]], [[12, 0], [35, -15], [52, -25]]);
    s += P("48,-48 72,-55 70,-35 50,-30", INK);
    s += legPoly(-45, 10, 16, 6, 12) + legPoly(-20, 8, 14, 6, 10);
    s += tinyArm(40, -25, 12, 140, 6);
    return s;
  },
  megalosaurus: () => {
    let s = ribbon([[-220, -5], [-160, -35], [-100, -55], [-10, -50], [70, -65]], [[-220, 10], [-160, 25], [-100, 32], [-10, 20], [70, -35]]);
    s += P("60,-68 125,-82 138,-58 118,-28 78,-25 58,-45", INK);
    s += legPoly(-130, 22, 44, 15) + legPoly(-75, 15, 38, 15);
    s += tinyArm(38, -32, 20, 60, 12);
    return s;
  },
  carnotaurus: () => {
    let s = ribbon([[-220, -5], [-150, -35], [-70, -60], [20, -55], [90, -60]], [[-220, 12], [-150, 30], [-70, 35], [20, 22], [90, -25]]);
    s += P("80,-65 140,-75 155,-45 130,-15 90,-20", INK); // short bull-like skull
    s += horn(105, -70, 92, -105, 16); // short stub horn above the eye
    s += horn(120, -70, 114, -108, 16);
    s += legPoly(-130, 22, 44, 15) + legPoly(-75, 15, 38, 15);
    s += tinyArm(100, -30, 12, 60, 8) + tinyArm(108, -22, 10, 80, 8); // proportionally the tiniest arms of any theropod here
    return s;
  },
  therizinosaurus: () => {
    let s = ribbon([[-130, 10], [-60, -30], [30, -40], [90, -30]], [[-130, 60], [-60, 70], [30, 65], [90, 45]]); // pot belly
    s += ribbon([[80, -35], [130, -80], [165, -130]], [[80, 10], [125, -30], [155, -95]]); // long thin neck
    s += P("155,-135 185,-140 187,-115 160,-108", INK); // small head
    s += L(60, -25, 92, 20, 20) + horn(92, 20, 145, 8, 14); // scythe-clawed arm
    s += L(75, -30, 112, 12, 18) + horn(112, 12, 160, -5, 12);
    s += legPoly(-90, 62, 46, 15) + legPoly(-30, 58, 40, 15);
    return s;
  },
  gallimimus: () => {
    let s = ribbon([[-90, -5], [-30, -25], [30, -25]], [[-90, 20], [-30, 28], [30, 10]]);
    s += ribbon([[-85, 0], [-140, 5], [-175, 8]], [[-85, 15], [-140, 20], [-175, 22]]);
    s += ribbon([[25, -27], [65, -65], [95, -100]], [[25, 5], [65, -30], [90, -70]]); // long neck
    s += P("88,-105 118,-112 116,-90 92,-85", INK); // small beaked head
    s += legPoly(-55, 15, 20, 10, 14) + legPoly(-15, 10, 18, 10, 12); // long slender legs
    s += tinyArm(60, -30, 26, 50, 8);
    return s;
  },
  deinonychus: () => {
    let s = ribbon([[-100, -12], [-35, -45], [25, -50]], [[-100, 28], [-35, 36], [25, 10]]);
    s += ribbon([[-95, -5], [-190, -30], [-250, -40]], [[-95, 22], [-190, 5], [-250, -15]]); // tail held up
    s += ribbon([[20, -47], [60, -72], [100, -83]], [[20, 3], [60, -32], [95, -46]]);
    s += P("88,-88 130,-100 126,-68 92,-62", INK);
    s += legPoly(-60, 18, 30, 8, 20) + legPoly(-15, 14, 26, 8, 18);
    s += P("-28,180 -8,168 -3,190", INK); // sickle claw hint
    s += tinyArm(50, -45, 22, 150, 10);
    return s;
  },
  utahraptor: () => {
    // notably bulkier than deinonychus/velociraptor, with a much bigger claw
    let s = ribbon([[-130, -15], [-45, -50], [30, -55]], [[-130, 35], [-45, 45], [30, 15]]);
    s += ribbon([[-125, -8], [-230, -35], [-290, -45]], [[-125, 28], [-230, 5], [-290, -15]]);
    s += ribbon([[25, -52], [70, -78], [110, -90]], [[25, 8], [70, -35], [105, -50]]);
    s += P("98,-95 145,-108 140,-72 100,-65", INK);
    s += legPoly(-75, 22, 38, 10, 24) + legPoly(-20, 18, 34, 10, 22);
    s += P("-35,180 -5,155 5,190", INK); // oversized sickle claw
    s += tinyArm(58, -50, 26, 150, 12);
    return s;
  },
  styracosaurus: () => {
    let s = ribbon([[-190, -5], [-100, -45], [0, -55], [60, -55]], [[-190, 45], [-100, 55], [0, 55], [60, 40]]);
    s += ribbon([[-230, 15], [-190, 20]], [[-230, 35], [-190, 45]]);
    s += PATH(`M 90,-70 Q 115,-160 175,-160 Q 220,-140 205,-70 Q 180,-30 140,-40 Z`, INK); // large frill
    s += horn(100, -120, 62, -172, 16) + horn(120, -150, 96, -206, 16) + horn(150, -158, 141, -216, 16) + horn(180, -140, 191, -198, 16) + horn(200, -110, 226, -156, 14); // spikes ringing the frill
    s += C(96, -65, 30);
    s += P("115,-42 150,-45 152,-18 122,-8", INK);
    s += horn(118, -40, 92, -98, 22); // single long straight nose horn
    s += fourLegs(58, -95, 45, 52, 20);
    return s;
  },
  corythosaurus: () => {
    let s = ribbon([[-180, 0], [-95, -32], [0, -38], [75, -32]], [[-180, 35], [-95, 45], [0, 48], [75, 35]]);
    s += ribbon([[-180, 5], [-245, 15]], [[-180, 30], [-245, 38]]);
    s += ribbon([[65, -35], [100, -52], [125, -58]], [[65, 0], [100, -20], [120, -30]]);
    s += P("115,-60 155,-64 158,-38 122,-28", INK);
    s += C(108, -95, 38); // round dinner-plate crest
    s += fourLegs(45, -125, 40, 48, 20);
    return s;
  },
  quetzalcoatlus: () => {
    let s = wing(-15, -20, -130, -180, -280, -190, -190, -60); // huge wing
    s += C(40, -10, 22);
    s += ribbon([[35, -25], [75, -55], [110, -80]], [[35, 5], [75, -25], [105, -55]]);
    s += P("100,-85 140,-92 138,-65 105,-58", INK); // long toothless beak
    s += L(25, 10, 10, 55, 10) + L(48, 10, 62, 55, 10);
    return s;
  },
  ichthyosaurus: () => {
    let s = ribbon([[-140, 0], [-60, -25], [30, -25], [90, -10]], [[-140, 20], [-60, 32], [30, 35], [90, 15]]);
    s += P("80,-25 140,-38 155,-18 135,5 90,8", INK); // long toothy snout
    s += P("-30,-25 -15,-70 5,-25", INK); // dorsal fin
    s += P("-140,5 -195,-40 -180,10 -195,55 -140,25", INK); // shark-like tail fin
    s += P("30,20 60,20 50,55 22,50", INK);
    return s;
  },
  elasmosaurus: () => {
    let s = ribbon([[-100, -5], [-30, -25], [50, -25], [110, -10]], [[-100, 30], [-30, 45], [50, 45], [110, 25]]);
    s += ribbon([[100, -15], [160, -55], [210, -100], [250, -145], [280, -190]], [[100, 10], [155, -25], [200, -70], [240, -115], [272, -165]]); // extremely long neck
    s += P("268,-195 298,-200 300,-178 272,-168", INK);
    s += P("-70,32 -30,32 -45,80 -80,70", INK);
    s += P("10,38 50,38 40,82 5,76", INK);
    s += ribbon([[-100, 0], [-140, 10]], [[-100, 25], [-140, 32]]);
    return s;
  },
  baryonyx: () => {
    let s = ribbon([[-200, -5], [-130, -30], [-40, -45], [50, -35], [110, -45]], [[-200, 15], [-130, 28], [-40, 20], [50, -5], [110, -20]]);
    s += P("100,-48 175,-62 190,-38 172,-15 125,-12 100,-30", INK); // long croc-like snout
    s += legPoly(-140, 20, 44, 15) + legPoly(-80, 15, 38, 15);
    s += tinyArm(75, -25, 20, 40, 14);
    s += horn(95, -15, 128, 8, 14); // curved thumb claw
    return s;
  },
  giganotosaurus: () => {
    let s = ribbon(
      [[-290, -8], [-215, -42], [-150, -70], [-50, -62], [50, -75], [125, -98]],
      [[-290, 8], [-215, 26], [-150, 34], [-50, 22], [50, -15], [125, -65]]
    );
    s += P("115,-100 190,-118 205,-92 182,-55 135,-50 112,-72", INK);
    s += legPoly(-165, 28, 50, 15) + legPoly(-100, 20, 44, 15);
    s += tinyArm(78, -52, 24, 50, 14);
    return s;
  },
  kentrosaurus: () => {
    let s = ribbon([[-190, -5], [-120, -55], [-30, -65], [60, -45], [110, -30]], [[-190, 25], [-120, 35], [-30, 38], [60, 30], [110, 15]]);
    s += P("105,-38 155,-42 162,-18 128,-3", INK);
    s += platesAlong([[-140, -52, -70], [-95, -65, -78]], [50, 60], 22); // small plates up front
    s += horn(-30, -65, -42, -142, 20) + horn(0, -60, -6, -138, 18) + horn(35, -52, 33, -122, 16); // sharp spikes toward the rear
    s += horn(-175, 15, -218, -28, 18) + horn(-185, 25, -228, -12, 16); // tail spikes
    s += fourLegs(75, -130, 30, 46, 20);
    return s;
  },
  maiasaura: () => {
    let s = ribbon([[-190, 0], [-100, -30], [0, -35], [80, -28]], [[-190, 40], [-100, 52], [0, 55], [80, 42]]); // bulky sturdy body
    s += ribbon([[-190, 5], [-250, 15]], [[-190, 35], [-250, 42]]);
    s += ribbon([[70, -30], [105, -45], [130, -50]], [[70, 5], [105, -12], [125, -22]]);
    s += P("120,-52 162,-56 165,-30 130,-18", INK);
    s += C(122, -58, 10); // low bony ridge, no tall crest
    s += fourLegs(50, -130, 42, 50, 20);
    return s;
  },
  oviraptor: () => {
    let s = ribbon([[-80, -8], [-25, -32], [25, -35]], [[-80, 20], [-25, 28], [25, 5]]);
    s += ribbon([[-75, -3], [-130, 8], [-165, 12]], [[-75, 15], [-130, 25], [-165, 30]]);
    s += ribbon([[20, -37], [50, -58], [75, -68]], [[20, 3], [50, -22], [70, -38]]);
    s += P("65,-72 90,-80 88,-55 66,-48", INK); // short curved parrot-like beak
    s += C(78, -95, 26); // tall rounded crest
    s += legPoly(-50, 15, 26, 8, 18) + legPoly(-15, 10, 24, 8, 16);
    s += tinyArm(48, -40, 24, 50, 10);
    return s;
  },
  coelophysis: () => {
    let s = ribbon([[-90, -8], [-30, -28], [20, -32]], [[-90, 15], [-30, 22], [20, 5]]);
    s += ribbon([[-85, -3], [-160, 5], [-210, 10]], [[-85, 15], [-160, 22], [-210, 28]]);
    s += ribbon([[15, -30], [50, -52], [80, -65]], [[15, 2], [50, -22], [75, -38]]); // long thin neck
    s += P("70,-68 100,-78 96,-52 72,-45", INK);
    s += legPoly(-55, 12, 22, 8, 16) + legPoly(-15, 8, 20, 8, 14);
    s += tinyArm(55, -35, 16, 140, 8);
    return s;
  },
  herrerasaurus: () => {
    let s = ribbon([[-160, -8], [-90, -35], [-20, -48], [50, -42]], [[-160, 15], [-90, 30], [-20, 32], [50, 10]]);
    s += P("42,-46 90,-58 100,-35 80,-10 48,-15", INK);
    s += legPoly(-100, 20, 36, 12) + legPoly(-55, 15, 32, 12);
    s += tinyArm(30, -25, 22, 50, 12);
    return s;
  },
  plateosaurus: () => {
    let s = ribbon([[-150, 5], [-70, -25], [20, -30], [80, -15]], [[-150, 40], [-70, 50], [20, 50], [80, 35]]);
    s += ribbon([[-150, 10], [-220, 20]], [[-150, 32], [-220, 42]]);
    s += ribbon([[70, -20], [110, -55], [140, -90]], [[70, 15], [105, -15], [130, -60]]);
    s += P("130,-95 158,-100 158,-75 133,-68", INK);
    s += horn(75, -18, 95, 5, 10); // thumb spike
    s += fourLegs(45, -110, 42, 46, 20);
    return s;
  },
  edmontosaurus: () => {
    let s = ribbon([[-200, 0], [-105, -35], [0, -42], [85, -32]], [[-200, 42], [-105, 55], [0, 58], [85, 45]]); // bulky, no crest at all
    s += ribbon([[-200, 5], [-265, 18]], [[-200, 38], [-265, 45]]);
    s += ribbon([[75, -35], [110, -48], [135, -52]], [[75, 8], [110, -8], [130, -18]]);
    s += P("125,-55 172,-58 175,-30 138,-18", INK); // plain flat-topped head
    s += fourLegs(50, -135, 42, 50, 20);
    return s;
  },
  lambeosaurus: () => {
    let s = ribbon([[-180, 0], [-95, -32], [0, -38], [75, -32]], [[-180, 35], [-95, 45], [0, 48], [75, 35]]);
    s += ribbon([[-180, 5], [-245, 15]], [[-180, 30], [-245, 38]]);
    s += ribbon([[65, -35], [100, -52], [125, -58]], [[65, 0], [100, -20], [120, -30]]);
    s += P("115,-60 155,-64 158,-38 122,-28", INK);
    s += P("95,-95 130,-165 148,-100 118,-75", INK); // hatchet-shaped crest, up and forward
    s += fourLegs(45, -125, 40, 48, 20);
    return s;
  },
  pentaceratops: () => {
    let s = ribbon([[-190, -5], [-100, -45], [0, -55], [60, -55]], [[-190, 45], [-100, 55], [0, 55], [60, 40]]);
    s += ribbon([[-230, 15], [-190, 20]], [[-230, 35], [-190, 45]]);
    s += PATH(`M 80,-75 Q 110,-190 190,-195 Q 250,-180 230,-90 Q 210,-20 150,-5 Q 100,-15 70,-50 Z`, INK); // one of the largest known frills
    s += scallopRow([[112, -178], [142, -190], [172, -186], [200, -160], [220, -122]], 14); // extra hornlets along the rim
    s += C(96, -70, 32);
    s += P("118,-46 156,-48 158,-18 126,-8", INK);
    s += horn(72, -84, -40, -175, 32); // brow horn
    s += horn(88, -62, -15, -130, 26); // second brow horn
    s += horn(118, -44, 86, -54, 15); // short nose horn
    s += fourLegs(58, -95, 45, 52, 20);
    return s;
  },
  protoceratops: () => {
    let s = ribbon([[-120, 0], [-60, -25], [10, -30], [60, -22]], [[-120, 30], [-60, 40], [10, 42], [60, 30]]); // small, sheep-sized
    s += ribbon([[-120, 5], [-160, 15]], [[-120, 25], [-160, 32]]);
    s += PATH(`M 55,-40 Q 75,-90 115,-88 Q 140,-70 128,-30 Q 110,-10 82,-18 Z`, INK); // modest frill, no true brow horns
    s += C(65, -32, 22);
    s += P("78,-15 105,-16 106,2 82,10", INK); // short beak
    s += fourLegs(35, -70, 32, 38, 16);
    return s;
  },
  dimorphodon: () => {
    let s = C(30, -10, 20);
    s += P("28,-30 100,-55 115,-25 90,5 40,8", INK); // oversized puffin-like beak
    s += wing(-10, -15, -70, -90, -140, -95, -95, -35);
    s += L(20, 15, -20, 55, 8) + P("-30,50 -10,45 -20,75 -40,68", INK); // diamond tail vane
    s += L(15, 10, 0, 45, 8) + L(35, 10, 48, 45, 8);
    return s;
  },
  rhamphorhynchus: () => {
    let s = C(35, -10, 16);
    s += P("33,-25 110,-40 118,-22 100,-5 45,0", INK); // long thin needle-toothed beak
    s += wing(-10, -15, -90, -110, -180, -115, -115, -40);
    s += L(25, 10, -60, 40, 6) + P("-70,35 -50,28 -62,58 -82,52", INK); // diamond tail vane
    return s;
  },
  liopleurodon: () => {
    let s = ribbon([[-160, 0], [-70, -20], [30, -20], [100, -10]], [[-160, 25], [-70, 35], [30, 38], [100, 20]]);
    s += P("90,-25 190,-40 210,-10 185,20 115,20 90,0", INK); // massive elongated head, short neck
    s += P("-110,28 -70,28 -85,75 -120,65", INK);
    s += P("-20,32 20,32 10,75 -25,70", INK);
    s += ribbon([[-160, 5], [-210, 15]], [[-160, 25], [-210, 32]]);
    return s;
  },
  amargasaurus: () => {
    let s = ribbon([[-150, 10], [-70, -15], [20, -25], [80, -15]], [[-150, 45], [-70, 55], [20, 55], [80, 40]]);
    s += ribbon([[70, -20], [110, -50], [145, -85]], [[70, 15], [105, -15], [135, -55]]); // moderate neck
    s += horn(85, -30, 80, -92, 8) + horn(95, -35, 106, -102, 8) + horn(105, -45, 96, -112, 8) + horn(115, -55, 132, -122, 8) + horn(125, -65, 112, -132, 8); // double row of tall spines
    s += P("135,-90 165,-95 163,-72 138,-65", INK);
    s += ribbon([[-150, 15], [-210, 25]], [[-150, 38], [-210, 45]]);
    s += fourLegs(45, -105, 42, 46, 20);
    return s;
  },
  suchomimus: () => {
    let s = ribbon([[-210, -5], [-140, -32], [-50, -48], [40, -38], [100, -48]], [[-210, 15], [-140, 30], [-50, 22], [40, -5], [100, -22]]);
    s += P("90,-50 165,-64 180,-40 162,-18 115,-15 90,-32", INK); // long croc snout
    s += platesAlong([[-90, -42, -75], [-45, -50, -80], [0, -52, -85]], [30, 35, 32], 18); // low ridge along the back
    s += legPoly(-150, 20, 44, 15) + legPoly(-90, 15, 38, 15);
    s += tinyArm(65, -25, 20, 40, 14) + horn(85, -15, 118, 5, 12);
    return s;
  },
  dreadnoughtus: () => {
    let s = ribbon([[-200, 10], [-100, -25], [0, -35], [100, -30]], [[-200, 55], [-100, 65], [0, 65], [100, 55]]); // massive barrel body
    s += ribbon([[90, -32], [140, -70], [180, -115]], [[90, 20], [135, -20], [170, -75]]);
    s += P("170,-120 200,-125 202,-100 175,-92", INK);
    s += ribbon([[-200, 15], [-260, 30]], [[-200, 45], [-260, 55]]);
    s += fourLegs(55, -140, 55, 62, 24); // extra-thick pillar legs
    return s;
  },
  yutyrannus: () => {
    let s = ribbon(
      [[-280, -8], [-210, -45], [-150, -75], [-50, -65], [50, -75], [120, -100]],
      [[-280, 8], [-210, 28], [-150, 36], [-50, 22], [50, -15], [120, -68]]
    );
    s += scallopRow([[-230, -48], [-190, -58], [-150, -72], [-110, -68], [-70, -62], [-30, -60], [10, -68], [50, -78]], 16); // shaggy feather texture along the back
    s += P("110,-102 185,-118 200,-92 178,-55 132,-52 108,-72", INK);
    s += legPoly(-160, 28, 50, 15) + legPoly(-95, 20, 44, 15);
    s += tinyArm(72, -52, 22, 50, 14);
    return s;
  },
  sinosauropteryx: () => {
    let s = ribbon([[-70, -5], [-25, -25], [20, -28]], [[-70, 15], [-25, 22], [20, 6]]);
    s += ribbon([[-68, 0], [-140, 10], [-200, 15]], [[-68, 12], [-140, 25], [-200, 30]]); // long ringed tail
    s += L(-90, 8, -88, 25, 6, BG) + L(-120, 15, -118, 30, 6, BG) + L(-150, 18, -148, 32, 6, BG) + L(-180, 20, -178, 33, 6, BG); // alternating light/dark bands
    s += P("15,-30 45,-38 42,-15 18,-10", INK);
    s += legPoly(-45, 10, 16, 6, 12) + legPoly(-15, 8, 14, 6, 10);
    s += tinyArm(38, -25, 12, 140, 6);
    s += scallopRow([[-50, -22], [-20, -28], [10, -30]], 10); // downy fuzz along the back
    return s;
  },
  microraptor: () => {
    let s = C(10, -15, 18);
    s += P("8,-32 35,-38 32,-18 12,-12", INK);
    s += wing(-5, -20, -55, -70, -110, -72, -65, -25); // front (arm) wing
    s += wing(-10, 10, -50, 45, -100, 55, -60, 15); // rear (leg) wing, giving the 4-winged glider silhouette
    s += P("15,0 45,15 20,25 0,10", INK); // feathered tail fan
    return scaleWrap(s);
  },
  epidexipteryx: () => {
    let s = ribbon([[-40, -5], [-10, -18], [15, -18]], [[-40, 15], [-10, 20], [15, 8]]);
    s += C(30, -30, 20); // big head for its tiny body
    s += P("28,-45 45,-50 42,-32 30,-28", INK);
    s += L(-15, 10, -22, 45, 6) + L(0, 10, 8, 45, 6);
    s += L(-38, 0, -110, -20, 4) + L(-38, 3, -115, 10, 4) + L(-38, 6, -108, 25, 4) + L(-38, 9, -100, 35, 4); // 4 ribbon-like tail streamers
    return scaleWrap(s);
  },
  "yi-qi": () => {
    let s = C(10, -15, 16);
    s += P("8,-30 30,-35 28,-18 10,-12", INK);
    s += P("-5,-20 -90,-60 -140,-30 -70,10 -20,5", INK); // angular bat-like membrane, not a feathered wing
    s += L(-5, 10, -15, 45, 8) + L(10, 10, 20, 45, 8);
    return scaleWrap(s);
  },
  masiakasaurus: () => {
    let s = ribbon([[-90, -5], [-30, -25], [20, -28]], [[-90, 15], [-30, 22], [20, 6]]);
    s += ribbon([[-85, 0], [-150, 8], [-190, 10]], [[-85, 12], [-150, 20], [-190, 25]]);
    s += ribbon([[15, -30], [45, -45], [70, -55]], [[15, 2], [45, -18], [65, -30]]);
    s += P("60,-58 95,-62 90,-40 62,-38", INK);
    s += horn(88, -50, 106, -44, 5) + horn(85, -44, 103, -39, 5); // forward-jutting rake teeth
    s += legPoly(-55, 10, 20, 8, 14) + legPoly(-15, 8, 18, 8, 12);
    return s;
  },
  nigersaurus: () => {
    let s = ribbon([[-140, 10], [-70, -15], [10, -20], [60, -10]], [[-140, 45], [-70, 55], [10, 52], [60, 38]]); // short-necked sauropod
    s += ribbon([[50, -15], [80, -30], [105, -38]], [[50, 10], [80, -2], [100, -12]]);
    s += P("95,-42 155,-45 158,-25 98,-15", INK); // wide flat straight-edged mouth
    s += ribbon([[-140, 15], [-190, 25]], [[-140, 38], [-190, 45]]);
    s += fourLegs(35, -100, 42, 46, 20);
    return s;
  },
  concavenator: () => {
    let s = ribbon([[-220, -5], [-155, -30], [-90, -45], [-10, -40], [70, -55]], [[-220, 10], [-155, 25], [-90, 32], [-10, 20], [70, -25]]);
    s += P("-104,-42 -95,-142 -78,-45", INK); // tall narrow hump just before the hips
    s += P("60,-58 130,-72 145,-48 125,-18 82,-15 60,-35", INK);
    s += legPoly(-135, 20, 42, 15) + legPoly(-80, 15, 36, 15);
    s += tinyArm(35, -28, 18, 55, 12);
    return s;
  },
  guanlong: () => {
    let s = ribbon([[-140, -5], [-70, -30], [0, -38]], [[-140, 20], [-70, 30], [0, 10]]);
    s += ribbon([[-135, 0], [-210, 10], [-250, 15]], [[-135, 18], [-210, 25], [-250, 30]]);
    s += ribbon([[-5, -36], [30, -55], [60, -68]], [[-5, 5], [30, -20], [55, -35]]);
    s += P("50,-72 90,-82 88,-58 58,-48", INK);
    s += P("55,-75 65,-108 78,-78 70,-70", INK); // thin blade crest along the snout
    s += legPoly(-90, 15, 30, 10, 18) + legPoly(-40, 10, 26, 10, 16);
    s += tinyArm(25, -30, 16, 60, 8);
    return s;
  },
  segisaurus: () => {
    let s = ribbon([[-70, -5], [-25, -22], [15, -25]], [[-70, 12], [-25, 18], [15, 4]]);
    s += ribbon([[-68, 0], [-125, 8], [-160, 10]], [[-68, 10], [-125, 18], [-160, 22]]);
    s += ribbon([[12, -24], [38, -40], [60, -50]], [[12, 0], [38, -16], [55, -28]]);
    s += P("52,-52 78,-58 75,-38 55,-32", INK);
    s += legPoly(-42, 8, 16, 6, 12) + legPoly(-15, 6, 14, 6, 10);
    s += tinyArm(45, -30, 22, 140, 7); // long grasping hand
    return s;
  },
  buitreraptor: () => {
    let s = ribbon([[-90, -10], [-30, -35], [20, -38]], [[-90, 20], [-30, 28], [20, 8]]);
    s += ribbon([[-85, -5], [-160, -15], [-210, -20]], [[-85, 15], [-160, 0], [-210, -8]]);
    s += ribbon([[15, -36], [50, -52], [85, -58]], [[15, 2], [50, -22], [80, -30]]);
    s += P("75,-60 148,-68 150,-48 100,-38 75,-42", INK); // unusually long, thin, low snout
    s += legPoly(-55, 15, 26, 8, 18) + legPoly(-15, 12, 22, 8, 16);
    s += tinyArm(45, -38, 18, 150, 8);
    return s;
  },
  shuvuuia: () => {
    let s = ribbon([[-70, -10], [-15, -35], [35, -38]], [[-70, 18], [-15, 28], [35, 6]]);
    s += ribbon([[-65, -5], [-110, 0], [-140, 5]], [[-65, 15], [-110, 20], [-140, 25]]);
    s += ribbon([[30, -36], [60, -58], [85, -72]], [[30, 0], [60, -25], [80, -42]]);
    s += P("75,-75 100,-82 98,-58 78,-50", INK);
    s += legPoly(-40, 10, 16, 10, 10) + legPoly(-5, 6, 14, 10, 9); // long, thin, roadrunner-like legs
    s += tinyArm(65, -42, 14, 130, 8); // single-clawed stub arm
    return s;
  },
  tsintaosaurus: () => {
    let s = ribbon([[-180, 0], [-95, -32], [0, -38], [75, -32]], [[-180, 35], [-95, 45], [0, 48], [75, 35]]);
    s += ribbon([[-180, 5], [-245, 15]], [[-180, 30], [-245, 38]]);
    s += ribbon([[65, -35], [100, -52], [125, -58]], [[65, 0], [100, -20], [120, -30]]);
    s += P("115,-60 155,-64 158,-38 122,-28", INK);
    s += horn(100, -90, 62, -168, 18); // single narrow forward-leaning spike crest
    s += fourLegs(45, -125, 40, 48, 20);
    return s;
  },
  muttaburrasaurus: () => {
    let s = ribbon([[-180, 0], [-95, -30], [0, -38], [75, -30]], [[-180, 38], [-95, 48], [0, 52], [75, 40]]);
    s += ribbon([[-180, 5], [-240, 15]], [[-180, 32], [-240, 40]]);
    s += ribbon([[65, -32], [100, -48], [125, -52]], [[65, 3], [100, -15], [120, -25]]);
    s += P("115,-55 158,-58 160,-32 125,-20", INK);
    s += C(129, -58, 15); // raised bulging bump on the snout
    s += fourLegs(45, -125, 40, 48, 20);
    return s;
  },
  leaellynasaura: () => {
    let s = ribbon([[-40, -5], [0, -25], [35, -28]], [[-40, 15], [0, 20], [35, 5]]);
    s += ribbon([[-38, 0], [-110, 8], [-190, 12], [-250, 15]], [[-38, 12], [-110, 20], [-190, 25], [-250, 28]]); // extremely long tail
    s += C(48, -32, 16);
    s += C(53, -34, 6, BG, "none"); // unusually large eye
    s += legPoly(-15, 8, 16, 8, 12) + legPoly(15, 6, 14, 8, 10);
    return s;
  },
  minmi: () => {
    let s = ribbon([[-100, 10], [-50, -10], [10, -12], [60, -5]], [[-100, 35], [-50, 42], [10, 42], [60, 32]]);
    s += P("55,-15 90,-18 92,0 60,8", INK);
    s += scallopRow([[-70, -14], [-35, -20], [0, -20], [30, -15]], 14);
    s += fourLegs(40, -75, 32, 36, 16);
    s += ribbon([[-100, 15], [-140, 20]], [[-100, 32], [-140, 38]]);
    return s;
  },
  yinlong: () => {
    let s = ribbon([[-90, -5], [-30, -25], [20, -28]], [[-90, 15], [-30, 22], [20, 6]]);
    s += ribbon([[-85, 0], [-140, 8], [-175, 10]], [[-85, 12], [-140, 20], [-175, 25]]);
    s += ribbon([[15, -30], [45, -45], [65, -52]], [[15, 2], [45, -18], [62, -28]]);
    s += P("55,-55 80,-60 78,-38 58,-32", INK); // parrot-like beak
    s += C(70, -58, 12); // just the beginnings of a bony frill bump
    s += legPoly(-42, 10, 18, 8, 14) + legPoly(-10, 8, 16, 8, 12);
    return s;
  },
  psittacosaurus: () => {
    let s = ribbon([[-90, -5], [-30, -25], [20, -28]], [[-90, 15], [-30, 22], [20, 6]]);
    s += ribbon([[-85, 0], [-140, 8], [-175, 10]], [[-85, 12], [-140, 20], [-175, 25]]);
    s += horn(-100, 4, -106, -26, 5) + horn(-120, 8, -126, -21, 5) + horn(-140, 10, -146, -19, 5) + horn(-160, 12, -166, -16, 5); // bristle-like tail quills
    s += P("15,-30 52,-40 56,-14 20,-4", INK); // deep parrot-like beak, no frill at all
    s += legPoly(-42, 10, 18, 8, 14) + legPoly(-10, 8, 16, 8, 12);
    return s;
  },
  anchiornis: () => {
    let s = C(10, -15, 14);
    s += P("8,-28 28,-38 32,-20 12,-12", INK);
    s += horn(20, -32, 15, -50, 6); // small head crest
    s += wing(-5, -18, -50, -62, -95, -65, -58, -22);
    s += wing(-8, 8, -45, 38, -85, 46, -52, 12);
    return scaleWrap(s);
  },
  eoraptor: () => {
    let s = ribbon([[-70, -5], [-20, -25], [25, -28]], [[-70, 15], [-20, 22], [25, 6]]);
    s += ribbon([[-65, 0], [-115, 8], [-150, 10]], [[-65, 12], [-115, 20], [-150, 25]]);
    s += ribbon([[20, -30], [45, -42], [65, -48]], [[20, 2], [45, -15], [62, -25]]);
    s += P("55,-50 78,-55 76,-35 58,-30", INK);
    s += legPoly(-40, 10, 18, 8, 14) + legPoly(-10, 8, 16, 8, 12);
    s += tinyArm(45, -32, 14, 60, 7);
    return s;
  },
  scutellosaurus: () => {
    let s = ribbon([[-60, -5], [-15, -25], [25, -28]], [[-60, 15], [-15, 22], [25, 6]]);
    s += ribbon([[-58, 0], [-130, 8], [-200, 12]], [[-58, 12], [-130, 20], [-200, 25]]); // very long tail
    s += P("18,-30 42,-35 40,-15 20,-10", INK);
    s += scallopRow([[-35, -22], [-5, -26], [15, -26]], 9); // small bony studs
    s += legPoly(-30, 8, 16, 8, 12) + legPoly(-5, 6, 14, 8, 10);
    return s;
  },
};

const only = process.argv[2] ? process.argv.slice(2) : null;
let ok = 0, fail = [];
for (const item of DINOSAURS_E92) {
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
console.log(`\n${ok}/${only ? only.length : DINOSAURS_E92.length} generated.`);
if (fail.length) console.log("failed:", fail.join(", "));
