// Generates hand-drawn SVG pictograms for the Guess the Religion/Mythology
// Symbol episode. Abstract iconography only — no depiction of any deity,
// prophet, or person, per the standing episode-design rule. A single neutral
// ink color is used for every symbol (no religion is given a "nicer" color
// than another), except for the 2 items where color is factually part of the
// symbol itself (Yin-Yang's black/white contrast, the Druze star's five
// official colors).
//
// Two rendering techniques are used, per item:
//  - Most symbols are simple enough to hand-draw as SVG shape primitives
//    (crosses, stars, wheels, animals in profile, etc.) — same style as
//    gen-roadsigns.mjs / gen-weather85.mjs.
//  - A few (Om, the Arabic calligraphy for "Allah", Ik Onkar) are
//    fundamentally calligraphic characters in a specific script, not simple
//    geometric shapes — these reuse the puppeteer/Chromium technique from
//    gen-languages90.mjs (see quiz-e90-complex-script-technique memory)
//    instead of trying to approximate them with hand-drawn primitives.
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import puppeteer from "puppeteer";
import { RELIGION_SYMBOLS_E91 } from "../src/Quiz/religionSymbolsE91Data.js";

const DEST = "public/religionsymbols91";
const CACHE = "out/_fonts-cache";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
if (!existsSync(CACHE)) mkdirSync(CACHE, { recursive: true });

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
const C = (cx, cy, r, fill = "none", stroke = INK, w = 18) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke === "none" ? "none" : stroke}" stroke-width="${stroke === "none" ? 0 : w}"/>`;
const P = (points, fill = INK, stroke = "none", w = 0) => `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
const PATH = (d, fill = "none", stroke = INK, w = 18, cap = "round", join = "round") => `<path d="${d}" fill="${fill}" stroke="${stroke === "none" ? "none" : stroke}" stroke-width="${stroke === "none" ? 0 : w}" stroke-linecap="${cap}" stroke-linejoin="${join}"/>`;

function starPoints(cx, cy, spikes, outerR, innerR, rot = -90) {
  const pts = [];
  const step = Math.PI / spikes;
  let ang = (rot * Math.PI) / 180;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push(`${(cx + Math.cos(ang) * r).toFixed(1)},${(cy + Math.sin(ang) * r).toFixed(1)}`);
    ang += step;
  }
  return pts.join(" ");
}
function polygonPoints(cx, cy, n, r, rot = -90) {
  const pts = [];
  const step = (2 * Math.PI) / n;
  let ang = (rot * Math.PI) / 180;
  for (let i = 0; i < n; i++) {
    pts.push(`${(cx + Math.cos(ang) * r).toFixed(1)},${(cy + Math.sin(ang) * r).toFixed(1)}`);
    ang += step;
  }
  return pts.join(" ");
}
function spokedWheel(spokes, r = 220, hubR = 34, rimW = 24, spokeW = 20) {
  let s = C(0, 0, r, "none", INK, rimW);
  s += C(0, 0, hubR, INK);
  for (let i = 0; i < spokes; i++) {
    const ang = (i / spokes) * 2 * Math.PI;
    s += L(0, 0, Math.cos(ang) * r, Math.sin(ang) * r, spokeW);
  }
  return s;
}
function crescentMask(cx, cy, r, bite = 0.85, biteOffset = 0.75, color = INK) {
  // A solid ink circle with a background-colored circle punched out over
  // part of it (simple, robust "mask" trick — far less error-prone than
  // hand-deriving the two-arc boolean-subtraction path directly). Opens
  // toward +x (right) since the erasing circle sits to the right.
  return C(cx, cy, r, color) + C(cx + r * biteOffset, cy, r * bite, BG);
}
function zigzagBolt(len = 300, w = 60, thick = 26) {
  const pts = [
    [0, -len / 2], [w * 0.3, -len / 6], [-w * 0.15, -len / 6],
    [w * 0.5, len / 6], [-w * 0.1, len / 6], [0, len / 2],
  ];
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) d += ` L ${pts[i][0]} ${pts[i][1]}`;
  return PATH(d, "none", INK, thick);
}
function spiral(startR, endR, turns, cx = 0, cy = 0, w = 18) {
  let d = "";
  const steps = 60 * turns;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ang = t * turns * 2 * Math.PI;
    const r = startR + (endR - startR) * t;
    const x = cx + Math.cos(ang) * r;
    const y = cy + Math.sin(ang) * r;
    d += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
  }
  return PATH(d, "none", INK, w);
}
function leafShape(w = 140, h = 220, tailLen = 90) {
  // heart-shaped bodhi leaf with a tapering tail point at bottom
  return PATH(
    `M 0 ${-h / 2} C ${w / 2} ${-h / 2 + 20} ${w / 2} ${h / 4} 0 ${h / 4 + tailLen * 0.3}
     C ${-w / 2} ${h / 4} ${-w / 2} ${-h / 2 + 20} 0 ${-h / 2} Z
     M 0 ${h / 4 + tailLen * 0.3} L 0 ${h / 2 + tailLen}`,
    INK, "none"
  );
}
function fishShape(w = 300, h = 140) {
  return `<path d="M ${-w / 2} 0 Q 0 ${-h / 2} ${w / 2} 0 M ${-w / 2} 0 Q 0 ${h / 2} ${w / 2} 0" fill="none" stroke="${INK}" stroke-width="20" stroke-linecap="round"/>
    <path d="M ${w / 2} 0 L ${w / 2 - 30} ${-30} M ${w / 2} 0 L ${w / 2 - 30} 30" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>`;
}
function handShape(w = 260, h = 320) {
  // simple symmetrical open palm, fingers together pointing up
  const fw = w / 5;
  let s = `<rect x="${-w / 2}" y="${-h * 0.05}" width="${w}" height="${h * 0.5}" rx="${w * 0.25}" fill="${INK}"/>`; // palm
  for (let i = -2; i <= 2; i++) {
    const fh = i === 0 ? h * 0.55 : h * 0.48 - Math.abs(i) * 20;
    s += `<rect x="${i * fw - fw * 0.32}" y="${-h * 0.05 - fh}" width="${fw * 0.64}" height="${fh + 40}" rx="${fw * 0.32}" fill="${INK}"/>`;
  }
  return s;
}
function treeShape(trunkH = 180, crownR = 200, rootSpread = 160) {
  let s = L(0, -trunkH * 0.1, 0, trunkH * 0.5, 26);
  // crown branches
  for (const [dx, dy] of [[-1, -1], [0, -1.3], [1, -1], [-0.6, -0.7], [0.6, -0.7]]) {
    s += L(0, -trunkH * 0.1, dx * crownR, dy * crownR * 0.6 - trunkH * 0.1, 16);
  }
  // roots
  for (const [dx, dy] of [[-1, 1], [1, 1], [0, 1.2]]) {
    s += L(0, trunkH * 0.5, dx * rootSpread * 0.6, trunkH * 0.5 + dy * rootSpread * 0.6, 14);
  }
  return s;
}

// ---------- per-slug drawing functions ----------
const draw = {
  "christian-cross": () => L(0, -220, 0, 220, 44) + L(-130, -80, 130, -80, 44),
  "islamic-star-and-crescent": () => {
    const cres = crescentMask(-70, 0, 190, 0.82, 0.68);
    const star = P(starPoints(160, 0, 5, 68, 27), INK);
    return cres + star;
  },
  "star-of-david": () => P(polygonPoints(0, -10, 3, 200, -90), "none") + `<polygon points="${polygonPoints(0, -10, 3, 200, -90)}" fill="none" stroke="${INK}" stroke-width="22"/><polygon points="${polygonPoints(0, 10, 3, 200, 90)}" fill="none" stroke="${INK}" stroke-width="22"/>`,
  "om-symbol": "FONT:Noto Sans Devanagari:ॐ",
  "dharma-wheel": () => spokedWheel(8),
  khanda: () => {
    // two curved kirpans crossed in a wide X behind a central ring (chakkar),
    // with a pointed double-edged sword blade through the middle. Diagonal
    // corner-to-corner placement (rather than a symmetric bow from a shared
    // top/bottom point) reads unambiguously as two crossed swords.
    let s = PATH(`M -230 -250 Q -60 0 100 250`, "none", INK, 24);
    s += PATH(`M 230 -250 Q 60 0 -100 250`, "none", INK, 24);
    s += C(0, 0, 165, "none", INK, 26);
    s += P("0,-260 -30,-130 -16,130 0,260 16,130 30,-130", INK);
    return s;
  },
  "yin-yang": () => {
    const R = 220;
    let s = `<path d="M 0 ${-R} A ${R} ${R} 0 0 1 0 ${R} A ${R / 2} ${R / 2} 0 0 1 0 0 A ${R / 2} ${R / 2} 0 0 0 0 ${-R} Z" fill="#141414"/>`;
    s += `<path d="M 0 ${-R} A ${R} ${R} 0 0 0 0 ${R} A ${R / 2} ${R / 2} 0 0 0 0 0 A ${R / 2} ${R / 2} 0 0 1 0 ${-R} Z" fill="#FAF7F0" stroke="#141414" stroke-width="8"/>`;
    s += C(0, -R / 2, 30, "#FAF7F0");
    s += C(0, R / 2, 30, "#141414");
    s += C(0, 0, R, "none", "#141414", 10);
    return s;
  },
  ankh: () => {
    let s = `<ellipse cx="0" cy="-140" rx="95" ry="120" fill="none" stroke="${INK}" stroke-width="42"/>`;
    s += L(0, -10, 0, 260, 42);
    s += L(-150, 70, 150, 70, 42);
    return s;
  },
  mjolnir: () => {
    let s = L(0, -30, 0, 200, 34);
    s += C(0, 190, 22, "none", INK, 16);
    s += P("-150,-260 150,-260 195,-115 -195,-115", INK);
    return s;
  },
  ichthys: () => fishShape(340, 160),
  menorah: () => {
    // central stem + 3 pairs of branches, all curving up to the SAME height
    // as the center (the defining "seven equal-height branches" trait)
    let s = L(0, -220, 0, 100, 26);
    s += `<rect x="-170" y="90" width="340" height="30" rx="10" fill="${INK}"/>`;
    const branches = [{ x: 60, y0: -120 }, { x: 120, y0: -80 }, { x: 180, y0: -40 }];
    for (const { x, y0 } of branches) {
      s += PATH(`M 0 ${y0} Q ${x * 0.5} ${y0 - 60} ${x} -220`, "none", INK, 22);
      s += PATH(`M 0 ${y0} Q ${-x * 0.5} ${y0 - 60} ${-x} -220`, "none", INK, 22);
    }
    return s;
  },
  "lotus-flower": () => {
    // fanned petals, each a simple ellipse rotated around a shared base
    // point — reliable and avoids the earlier rotated-bezier self-intersection
    let s = "";
    const n = 7;
    for (let i = 0; i < n; i++) {
      const ang = ((i - (n - 1) / 2) / (n - 1)) * 150;
      s += `<g transform="rotate(${ang})"><ellipse cx="0" cy="-140" rx="42" ry="140" fill="${INK}"/></g>`;
    }
    return s;
  },
  "torii-gate": () => {
    let s = L(-160, -80, -160, 260, 34) + L(160, -80, 160, 260, 34);
    s += PATH(`M -220 -100 Q 0 -160 220 -100 L 220 -60 Q 0 -110 -220 -60 Z`, INK);
    s += `<rect x="-190" y="-30" width="380" height="34" rx="10" fill="${INK}"/>`;
    return s;
  },
  dreamcatcher: () => {
    let s = C(0, 0, 200, "none", INK, 26);
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * 2 * Math.PI;
      s += L(Math.cos(ang) * 200, Math.sin(ang) * 200, Math.cos(ang + 0.35) * 60, Math.sin(ang + 0.35) * 60, 8);
    }
    s += C(0, 0, 60, "none", INK, 8);
    for (let i = -1; i <= 1; i++) s += L(i * 60, 200, i * 60, 300, 10);
    return s;
  },
  "dove-holy-spirit": () => {
    let s = PATH(`M -220 20 Q -80 -120 0 -20 Q 80 -120 220 20 Q 100 0 0 40 Q -100 0 -220 20 Z`, INK);
    s += C(40, 10, 10, INK);
    return s;
  },
  "the-kaaba": () => {
    // add a simple isometric side face so it reads as a cube, not a flat square
    let s = `<rect x="-190" y="-160" width="260" height="320" fill="${INK}"/>`;
    s += P("70,-160 190,-220 190,80 70,140", INK);
    s += `<rect x="-190" y="-30" width="260" height="55" fill="#D4AF37"/>`;
    s += P("70,-30 190,-70 190,-15 70,25", "#D4AF37");
    return s;
  },
  "tablets-of-the-law": () => {
    const tablet = (x) => `<path d="M ${x - 80} 200 L ${x - 80} -60 Q ${x - 80} -180 ${x} -180 Q ${x + 80} -180 ${x + 80} -60 L ${x + 80} 200 Z" fill="none" stroke="${INK}" stroke-width="26"/>`;
    let s = tablet(-90) + tablet(90);
    for (let i = 0; i < 3; i++) { s += L(-160, -30 + i * 50, -20, -30 + i * 50, 12); s += L(20, -30 + i * 50, 160, -30 + i * 50, 12); }
    return s;
  },
  "trident-of-poseidon": () => {
    let s = L(0, -260, 0, 240, 30);
    for (const dx of [-70, 0, 70]) s += L(dx, -260, dx, -60, 26);
    s += L(-70, -260, -110, -180, 22) + L(70, -260, 110, -180, 22);
    return s;
  },
  faravahar: () => {
    let s = C(0, 60, 40, "none", INK, 20);
    s += PATH(`M -220 -20 Q -100 -120 0 -60 Q 100 -120 220 -20 Q 100 -60 0 -10 Q -100 -60 -220 -20 Z`, INK);
    s += C(0, -140, 40, INK);
    s += L(0, -100, -40, -20, 20);
    return s;
  },
  "bahai-nine-pointed-star": () => `<polygon points="${starPoints(0, 0, 9, 220, 130)}" fill="none" stroke="${INK}" stroke-width="20" stroke-linejoin="round"/>`,
  "jain-ahimsa-hand": () => handShape() + spokedWheel(24, 90, 14, 8, 6),
  "orthodox-cross": () => L(0, -230, 0, 230, 34) + L(-100, -140, 100, -140, 34) + L(-70, 160, 130, 190, 30),
  "endless-knot": () => {
    let d = "M -150 -150 ";
    d += "C 50 -150 -150 -50 50 -50 C 250 -50 50 50 -50 50 C -150 50 50 150 150 150 ";
    d += "M 150 -150 C -50 -150 150 -50 -50 -50 C -250 -50 -50 50 50 50 C 150 50 -50 150 -150 150";
    return PATH(d, "none", INK, 18);
  },
  "lion-of-judah": () => {
    // an actual lion silhouette in profile (an animal, not a deity/person —
    // fine per the abstract-iconography rule) so it reads unambiguously
    let s = "";
    for (let i = 0; i < 12; i++) { const ang = (i / 12) * 2 * Math.PI; s += L(-90 + Math.cos(ang) * 95, -70 + Math.sin(ang) * 95, -90 + Math.cos(ang) * 155, -70 + Math.sin(ang) * 155, 20); }
    s += C(-90, -70, 95, INK); // maned head
    s += PATH(`M 10 -30 Q 210 -50 240 60 Q 220 130 90 110 Q 10 100 10 -30 Z`, INK); // body
    s += L(170, 105, 205, 220, 22); // front leg
    s += L(70, 105, 55, 220, 22); // back leg
    s += PATH(`M 240 60 Q 300 30 290 -30`, "none", INK, 16); // tail
    return s;
  },
  "triple-moon": () => {
    // left crescent opens right (toward center), full moon, right crescent
    // mirrored so it opens left (toward center) — the classic Maiden/Mother/Crone
    // row. Reuses the exact bite/offset ratios that worked for the Islamic
    // star-and-crescent (0.82/0.68), scaled to a smaller radius that leaves
    // room for 3 side-by-side shapes without overlapping or running off-card.
    let s = crescentMask(-220, 0, 70, 0.82, 0.68);
    s += `<g transform="translate(220,0) scale(-1,1)">${crescentMask(0, 0, 70, 0.82, 0.68)}</g>`;
    s += C(0, 0, 70, INK);
    return s;
  },
  "allah-calligraphy": "FONT:Noto Naskh Arabic:الله",
  trishula: () => {
    // three equal-length prongs curving outward from a common base, bolder
    // and more sharply pointed than the plain-line first attempt
    let s = L(0, -140, 0, 260, 32);
    s += L(0, -140, 0, -280, 30);
    s += PATH(`M 0 -140 Q -90 -190 -110 -280`, "none", INK, 26);
    s += PATH(`M 0 -140 Q 90 -190 110 -280`, "none", INK, 26);
    return s;
  },
  "celtic-cross": () => L(0, -220, 0, 220, 40) + L(-160, 0, 160, 0, 40) + C(0, 0, 150, "none", INK, 36),
  shimenawa: () => {
    let s = PATH(`M -260 0 Q -130 -60 0 0 Q 130 -60 260 0`, "none", INK, 36);
    for (let i = -3; i <= 3; i++) s += PATH(`M ${i * 70} 10 L ${i * 70 - 20} 90 L ${i * 70 + 5} 60 L ${i * 70 - 15} 150`, "none", INK, 10);
    return s;
  },
  "ik-onkar": "FONT:Noto Sans Gurmukhi:ੴ",
  "chi-rho": () => {
    let s = L(-140, -160, 140, 160, 30) + L(140, -160, -140, 160, 30);
    s += PATH(`M 0 0 L 0 -200 Q 120 -200 120 -110 Q 120 -20 0 -20`, "none", INK, 28);
    return s;
  },
  "bodhi-leaf": () => {
    let s = PATH(`M 0 -180 C 140 -180 150 20 60 80 Q 30 110 0 210 Q -30 110 -60 80 C -150 20 -140 -180 0 -180 Z`, INK, "none");
    s += PATH(`M 0 -140 L 0 60 M 0 -60 L -70 -110 M 0 -60 L 70 -110 M 0 -10 L -60 -40 M 0 -10 L 60 -40`, "none", BG, 6);
    return s;
  },
  valknut: () => {
    const tri = (rot) => `<g transform="rotate(${rot})"><polygon points="${polygonPoints(0, -20, 3, 190, -90)}" fill="none" stroke="${INK}" stroke-width="20" stroke-linejoin="round"/></g>`;
    return tri(0) + tri(40) + tri(-40);
  },
  caduceus: () => {
    let s = L(0, -240, 0, 240, 24);
    for (const flip of [1, -1]) {
      let d = `M 0 200 `;
      for (let y = 200; y > -200; y -= 80) d += `Q ${flip * 90} ${y - 40} 0 ${y - 80} `;
      s += PATH(d, "none", INK, 16);
    }
    s += `<path d="M -20 -240 Q -140 -280 -160 -200 Q -100 -220 -20 -200 Z" fill="${INK}"/>`;
    s += `<path d="M 20 -240 Q 140 -280 160 -200 Q 100 -220 20 -200 Z" fill="${INK}"/>`;
    return s;
  },
  bagua: () => {
    let s = C(0, 0, 70, "none", INK, 10);
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * 2 * Math.PI;
      const cx = Math.cos(ang) * 190, cy = Math.sin(ang) * 190;
      const perp = ang + Math.PI / 2;
      let g = `<g transform="translate(${cx},${cy}) rotate(${(ang * 180) / Math.PI + 90})">`;
      const broken = (i % 3 === 1);
      for (let b = -1; b <= 1; b++) {
        if (broken && b === 0) { g += L(-60, b * 26, -10, b * 26, 12) + L(10, b * 26, 60, b * 26, 12); }
        else g += L(-60, b * 26, 60, b * 26, 12);
      }
      g += "</g>";
      s += g;
    }
    return s;
  },
  "eye-of-horus": () => {
    let s = PATH(`M -220 0 Q -100 -100 100 -20 Q 180 0 220 -10`, "none", INK, 26);
    s += PATH(`M 220 -10 Q 260 40 220 90 Q 180 60 150 40 Q 190 10 220 -10 Z`, INK);
    s += C(30, -10, 45, INK);
    s += spiral(10, 60, 1, -190, 30, 14);
    return s;
  },
  yggdrasil: () => treeShape(160, 220, 200),
  "owl-of-athena": () => {
    let s = C(0, -20, 130, INK);
    s += C(-45, -40, 30, "#FAF7F0") + C(45, -40, 30, "#FAF7F0");
    s += C(-45, -40, 12, INK) + C(45, -40, 12, INK);
    s += P("0,-140 -30,-190 10,-160", INK) + P("0,-140 30,-190 -10,-160", INK);
    s += `<path d="M -130 -20 A 130 130 0 0 0 0 110 A 130 130 0 0 0 130 -20 Z" fill="${INK}"/>`;
    return s;
  },
  triskelion: () => {
    const one = (rot) => `<g transform="rotate(${rot})">${spiral(10, 130, 1, 0, -100, 18)}</g>`;
    return one(0) + one(120) + one(240);
  },
  triquetra: () => {
    const lobe = (rot) => `<g transform="rotate(${rot})"><path d="M 0 0 A 120 120 0 0 1 -180 60 A 120 120 0 0 1 0 0" fill="none" stroke="${INK}" stroke-width="20"/></g>`;
    return lobe(0) + lobe(120) + lobe(240);
  },
  ollin: () => {
    const petal = (rot) => `<g transform="rotate(${rot})">${PATH("M 0 0 Q 60 -80 20 -200 Q -20 -140 0 0 Z", INK)}</g>`;
    return petal(0) + petal(90) + petal(180) + petal(270) + C(0, 0, 30, INK);
  },
  "zoroastrian-fire-altar": () => {
    let s = `<path d="M -70 220 L -100 0 L 100 0 L 70 220 Z" fill="none" stroke="${INK}" stroke-width="26"/>`;
    s += `<path d="M -100 0 Q 0 -60 100 0" fill="none" stroke="${INK}" stroke-width="26"/>`;
    for (const dx of [-40, 0, 40]) s += PATH(`M ${dx} -60 Q ${dx - 20} -140 ${dx} -220 Q ${dx + 20} -140 ${dx} -60 Z`, INK);
    return s;
  },
  zulfiqar: () => {
    let s = L(0, 220, 0, -40, 30);
    s += PATH(`M 0 -40 Q -60 -160 -30 -260 M 0 -40 Q 60 -160 30 -260`, "none", INK, 24);
    s += `<rect x="-70" y="180" width="140" height="34" rx="10" fill="${INK}"/>`;
    return s;
  },
  "gye-nyame": () => spiral(20, 160, 1.3, -80, 0, 24) + `<g transform="scale(-1,1)">${spiral(20, 160, 1.3, -80, 0, 24)}</g>`,
  "sami-sun-symbol": () => {
    let s = `<ellipse cx="0" cy="0" rx="260" ry="200" fill="none" stroke="${INK}" stroke-width="18"/>`;
    s += P(polygonPoints(0, 0, 4, 50, 45), INK);
    for (let i = 0; i < 8; i++) { const ang = (i / 8) * 2 * Math.PI; s += L(Math.cos(ang) * 60, Math.sin(ang) * 60, Math.cos(ang) * 150, Math.sin(ang) * 150, 12); }
    return s;
  },
  "shri-yantra": () => {
    let s = "";
    const tris = [[190, 0], [-150, 30], [170, 90], [-190, -60], [130, -110], [-110, 120], [150, 150], [-160, -140], [110, -170]];
    tris.forEach(([r, rot], i) => { s += `<polygon points="${polygonPoints(0, 0, 3, r, rot)}" fill="none" stroke="${INK}" stroke-width="8"/>`; });
    s += C(0, 0, 260, "none", INK, 10);
    s += `<rect x="-280" y="-280" width="560" height="560" fill="none" stroke="${INK}" stroke-width="14"/>`;
    return s;
  },
  "hamsa-hand": () => {
    // one hand drawn directly (not composited from mirrored pieces): a palm
    // with 3 upright middle fingers plus a symmetric "thumb" on BOTH outer
    // sides — that left/right symmetry is the hamsa's defining trait
    let s = `<rect x="-120" y="-40" width="240" height="220" rx="95" fill="${INK}"/>`;
    for (let i = -1; i <= 1; i++) s += `<rect x="${i * 58 - 24}" y="-210" width="48" height="200" rx="24" fill="${INK}"/>`;
    s += `<rect x="-235" y="-55" width="130" height="56" rx="28" fill="${INK}"/>`;
    s += `<rect x="105" y="-55" width="130" height="56" rx="28" fill="${INK}"/>`;
    s += C(0, 60, 22, "none", BG, 8);
    return s;
  },
  labrys: () => {
    let s = L(0, -200, 0, 200, 24);
    s += PATH(`M 0 -40 Q -180 -100 -220 -20 Q -180 40 0 20 Z`, INK);
    s += PATH(`M 0 -40 Q 180 -100 220 -20 Q 180 40 0 20 Z`, INK);
    return s;
  },
  "medicine-wheel": () => C(0, 0, 220, "none", INK, 26) + L(-220, 0, 220, 0, 20) + L(0, -220, 0, 220, 20) + C(0, 0, 40, "none", INK, 16),
  vajra: () => {
    let s = C(0, 0, 30, INK) + L(-30, 0, 30, 0, 20);
    for (const flip of [1, -1]) {
      s += `<g transform="scale(${flip},1)">`;
      s += L(30, 0, 130, 0, 20);
      for (const dy of [-40, 0, 40]) s += PATH(`M 130 0 Q 200 ${dy} 230 ${dy * 1.6}`, "none", INK, 16);
      s += "</g>";
    }
    return s;
  },
  "alpha-omega": () => {
    let s = `<g transform="translate(-140,0)">${L(-60, 100, 0, -100, 24)}${L(0, -100, 60, 100, 24)}${L(-35, 30, 35, 30, 20)}</g>`;
    s += `<g transform="translate(140,0)"><path d="M -70 100 L -70 40 Q -70 -100 0 -100 Q 70 -100 70 40 L 70 100" fill="none" stroke="${INK}" stroke-width="26" stroke-linecap="round"/></g>`;
    return s;
  },
  "scarab-beetle": () => {
    let s = `<ellipse cx="0" cy="0" rx="150" ry="190" fill="${INK}"/>`;
    s += `<ellipse cx="0" cy="-160" rx="70" ry="50" fill="${INK}"/>`;
    s += L(0, -190, 0, 170, 8, "#FAF7F0");
    for (const dy of [-60, 0, 60]) { s += L(-150, dy, -210, dy + 30, 14); s += L(150, dy, 210, dy + 30, 14); }
    return s;
  },
  "star-of-ishtar": () => `<polygon points="${starPoints(0, 0, 8, 230, 90)}" fill="none" stroke="${INK}" stroke-width="18" stroke-linejoin="round"/>`,
  "symbol-of-marduk": () => {
    let s = PATH(`M -220 60 Q -100 -80 20 -20 Q 100 20 180 -40`, "none", INK, 26);
    s += P("180,-40 240,-60 210,10", INK);
    s += L(-180, 100, -220, 60, 20) + L(-160, 140, -220, 60, 20);
    s += L(60, 0, 60, -80, 14) + L(90, 0, 90, -80, 14);
    return s;
  },
  "mithraic-bull": () => {
    let s = C(0, 0, 220, "none", INK, 16);
    s += `<ellipse cx="-20" cy="20" rx="150" ry="90" fill="${INK}"/>`;
    s += C(-150, -30, 50, INK);
    s += `<path d="M -180 -70 Q -200 -110 -170 -120 Q -160 -90 -180 -70 Z" fill="${INK}"/><path d="M -120 -70 Q -100 -110 -130 -120 Q -140 -90 -120 -70 Z" fill="${INK}"/>`;
    s += PATH(`M 20 -80 L 60 60`, "none", INK, 16);
    return s;
  },
  "manichaean-cross-of-light": () => {
    let s = L(0, -160, 0, 160, 30) + L(-160, 0, 160, 0, 30);
    for (let i = 0; i < 8; i++) { const ang = (i / 8) * 2 * Math.PI + Math.PI / 8; s += L(Math.cos(ang) * 40, Math.sin(ang) * 40, Math.cos(ang) * 100, Math.sin(ang) * 100, 10); }
    return s;
  },
  "veve-papa-legba": () => {
    let s = L(-160, -160, 160, 160, 22) + L(160, -160, -160, 160, 22);
    s += PATH(`M -40 0 Q -100 -30 -90 -90`, "none", INK, 14);
    s += `<circle cx="90" cy="-90" r="16" fill="${INK}"/>`;
    return s;
  },
  "melek-taus-peacock": () => {
    let s = C(-120, -60, 50, INK);
    s += PATH(`M -80 -30 Q -20 20 60 0`, "none", INK, 24);
    for (let i = -3; i <= 3; i++) {
      const ang = (i / 3) * 0.9;
      s += `<g transform="rotate(${(ang * 180) / Math.PI}) translate(80,0)">${PATH("M 0 0 Q 100 -30 160 0 Q 100 30 0 0", INK)}${C(150, 0, 14, "#FAF7F0")}</g>`;
    }
    return s;
  },
  "druze-star": () => {
    const colors = ["#2E7D32", "#C62828", "#F9A825", "#1565C0", "#FAF7F0"];
    const pts = [];
    const outerR = 220, innerR = 90;
    let s = "";
    for (let i = 0; i < 5; i++) {
      const a1 = (-90 + i * 72 - 36) * Math.PI / 180;
      const a2 = (-90 + i * 72) * Math.PI / 180;
      const a3 = (-90 + i * 72 + 36) * Math.PI / 180;
      const tip = `${Math.cos(a2) * outerR},${Math.sin(a2) * outerR}`;
      const l = `${Math.cos(a1) * innerR},${Math.sin(a1) * innerR}`;
      const r = `${Math.cos(a3) * innerR},${Math.sin(a3) * innerR}`;
      s += `<polygon points="0,0 ${l} ${tip} ${r}" fill="${colors[i]}" stroke="#2B2E4A" stroke-width="4"/>`;
    }
    return s;
  },
  "rainbow-serpent": () => PATH(`M -260 60 Q -160 -100 -60 60 Q 40 220 140 60 Q 220 -60 260 20`, "none", INK, 30),
  "baal-lightning-bolt": () => zigzagBolt(400, 90, 30),
  "etruscan-lituus": () => PATH(`M 0 220 L 0 -60 ${spiralPathD(60, 10, 1.4, 60, -140)}`, "none", INK, 26),
  ouroboros: () => C(0, 0, 190, "none", INK, 30) + P("190,-10 240,20 200,50", INK),
  "wacah-chan": () => treeShape(140, 200, 140),
  "sheaf-of-wheat": () => {
    let s = "";
    for (let i = -3; i <= 3; i++) {
      const x = i * 26;
      s += L(x, 220, x * 1.6, -180, 10);
      for (let g = -3; g <= 2; g++) s += `<ellipse cx="${x * 1.6 + (i > 0 ? 14 : -14)}" cy="${-180 + g * 26}" rx="16" ry="10" fill="${INK}"/>`;
    }
    s += `<rect x="-90" y="20" width="180" height="26" rx="6" fill="${INK}"/>`;
    return s;
  },
  chakana: () => {
    // grid-of-cells approach — far more reliable than deriving the stepped
    // outline from a single boolean path. 1 = filled cell, laid out as the
    // standard 3-step Andean cross silhouette.
    const grid = [
      "0001000",
      "0011100",
      "0111110",
      "1111111",
      "0111110",
      "0011100",
      "0001000",
    ];
    const cell = 46;
    const n = grid.length;
    let s = "";
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (grid[r][c] !== "1") continue;
        const x = (c - (n - 1) / 2) * cell;
        const y = (r - (n - 1) / 2) * cell;
        s += `<rect x="${x - cell / 2 - 1}" y="${y - cell / 2 - 1}" width="${cell + 2}" height="${cell + 2}" fill="${INK}"/>`;
      }
    }
    s += C(0, 0, cell * 0.55, BG);
    return s;
  },
  omphalos: () => {
    let s = `<path d="M -180 100 Q -180 -140 0 -160 Q 180 -140 180 100 Q 0 160 -180 100 Z" fill="${INK}"/>`;
    for (let i = 0; i < 6; i++) s += PATH(`M ${-150 + i * 55} -100 Q 0 ${-140 + i * 10} ${150 - i * 30} 90`, "none", "#FAF7F0", 6);
    return s;
  },
  "yowa-cross": () => {
    let s = C(0, 0, 220, "none", INK, 16);
    s += L(0, -180, 0, 180, 28) + L(-180, 0, 180, 0, 28);
    for (const [x, y] of [[0, -180], [0, 180], [-180, 0], [180, 0]]) s += C(x, y, 30, INK);
    return s;
  },
  fulmen: () => zigzagBolt(340, 110, 28),
  "sign-of-tanit": () => {
    let s = P("0,-220 -110,20 110,20", "none");
    s = `<polygon points="0,-220 -110,20 110,20" fill="none" stroke="${INK}" stroke-width="26" stroke-linejoin="round"/>`;
    s += L(-150, 20, 150, 20, 26);
    s += C(0, 100, 60, "none", INK, 26);
    return s;
  },
};

function spiralPathD(startR, endR, turns, cx, cy) {
  let d = "";
  const steps = 40 * turns;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ang = t * turns * 2 * Math.PI;
    const r = startR + (endR - startR) * t;
    const x = cx + Math.cos(ang) * r;
    const y = cy + Math.sin(ang) * r;
    d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d;
}

// ---------- font-based items (calligraphic scripts) ----------
async function fetchFontUrl(family, weight) {
  const q = family.replace(/ /g, "+");
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${q}:wght@${weight}&display=swap`).then((r) => r.text());
  const m = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/);
  if (!m) throw new Error(`no ttf URL found for ${family} (${weight})`);
  return m[1];
}
async function downloadFont(family, weight) {
  const cacheName = family.toLowerCase().replace(/[^a-z0-9]+/g, "-") + `-${weight}`;
  const cachePath = path.join(CACHE, `${cacheName}.ttf`);
  if (existsSync(cachePath)) return cachePath;
  let url;
  try { url = await fetchFontUrl(family, weight); } catch (e) { if (weight !== "400") url = await fetchFontUrl(family, "400"); else throw e; }
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  writeFileSync(cachePath, buf);
  return cachePath;
}
function fontCardHtml(text, fontBase64, fontSize) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: "SymbolFont"; src: url(data:font/ttf;base64,${fontBase64}) format("truetype"); }
    html, body { margin: 0; padding: 0; background: ${BG}; }
    .card { width: ${S}px; height: ${S}px; background: ${BG}; border-radius: 40px; box-sizing: border-box; position: relative; }
    .inner { position: absolute; top: 20px; left: 20px; right: 20px; bottom: 20px; border: 2px solid ${CARD_BORDER}; border-radius: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .txt { font-family: "SymbolFont", sans-serif; font-size: ${fontSize}px; color: ${INK}; text-align: center; }
  </style></head>
  <body><div class="card"><div class="inner"><div class="txt" id="txt">${text}</div></div></div></body></html>`;
}
async function fitFontSize(page, maxWidth, maxHeight, startSize, minSize) {
  for (let size = startSize; size >= minSize; size -= 4) {
    await page.evaluate((s) => { document.getElementById("txt").style.fontSize = s + "px"; }, size);
    const box = await page.evaluate(() => { const r = document.getElementById("txt").getBoundingClientRect(); return { w: r.width, h: r.height }; });
    if (box.w <= maxWidth && box.h <= maxHeight) return size;
  }
  return minSize;
}

let browser = null;
async function renderFontItem(slug, family, text) {
  if (!browser) { browser = await puppeteer.launch(); }
  const page = await browser.newPage();
  await page.setViewport({ width: S, height: S });
  const fontPath = await downloadFont(family, "700");
  const fontBase64 = readFileSync(fontPath).toString("base64");
  const html = fontCardHtml(text, fontBase64, 300);
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await fitFontSize(page, 420, 420, 300, 60);
  const cardEl = await page.$(".card");
  await cardEl.screenshot({ path: path.join(DEST, `${slug}.png`) });
  await page.close();
}

const only = process.argv[2] ? process.argv.slice(2) : null;
let ok = 0, fail = [];
for (const item of RELIGION_SYMBOLS_E91) {
  if (only && !only.includes(item.slug)) continue;
  try {
    const fn = draw[item.slug];
    if (!fn) throw new Error("no drawing function defined");
    if (typeof fn === "string" && fn.startsWith("FONT:")) {
      const [, family, text] = fn.split(":");
      await renderFontItem(item.slug, family, text);
    } else {
      const svg = card(fn());
      await sharp(Buffer.from(svg)).png().toFile(path.join(DEST, `${item.slug}.png`));
    }
    console.log("ok", item.slug);
    ok++;
  } catch (e) {
    console.error("FAIL", item.slug, e.message);
    fail.push(item.slug);
  }
}
if (browser) await browser.close();
console.log(`\n${ok}/${(only || RELIGION_SYMBOLS_E91).length} generated.` + (fail.length ? ` FAIL: ${fail.join(", ")}` : ""));
