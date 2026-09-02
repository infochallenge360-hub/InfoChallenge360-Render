// Generates hand-drawn SVG icons for the Guess the Sport by Equipment
// episode. Clean single-color iconic shapes — same pictogram house style as
// gen-bodyparts94.mjs / gen-dinosaurs92.mjs.
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { SPORT_EQUIPMENT_E95 } from "../src/Quiz/sportEquipmentE95Data.js";

const DEST = "public/sportequipment95";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const S = 700;
const BG = "#FAF7F0";
const INK = "#2B5D8B"; // a clean athletic navy-blue reads as "sports" iconography
const CARD_BORDER = "rgba(0,0,0,0.09)";

const card = (inner) => `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${S}" height="${S}" rx="40" fill="${BG}"/>
  <rect x="20" y="20" width="${S - 40}" height="${S - 40}" rx="28" fill="none" stroke="${CARD_BORDER}" stroke-width="2"/>
  <g transform="translate(350,350)">${inner}</g>
</svg>`;

// ---------- shared primitives (all centered on 0,0) ----------
const L = (x1, y1, x2, y2, w = 22, color = INK, cap = "round") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="${cap}"/>`;
// stroke defaults to match fill (E91/E92/E94 lesson) — pass stroke explicitly for a ring/border.
const C = (cx, cy, r, fill = INK, stroke, w = 18) => {
  const s = stroke === undefined ? fill : stroke;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${s === "none" ? "none" : s}" stroke-width="${s === "none" ? 0 : w}"/>`;
};
const E = (cx, cy, rx, ry, fill = INK, rot = 0, stroke, w = 18) => {
  const s = stroke === undefined ? fill : stroke;
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${s === "none" ? "none" : s}" stroke-width="${s === "none" ? 0 : w}" transform="rotate(${rot} ${cx} ${cy})"/>`;
};
const P = (points, fill = INK, stroke = "none", w = 0) => `<polygon points="${points}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
const PATH = (d, fill = "none", stroke = INK, w = 18, cap = "round", join = "round") => `<path d="${d}" fill="${fill}" stroke="${stroke === "none" ? "none" : stroke}" stroke-width="${stroke === "none" ? 0 : w}" stroke-linecap="${cap}" stroke-linejoin="${join}"/>`;

// A closed "ribbon" silhouette from parallel top/bottom point arrays (E92 technique).
function ribbon(topPts, botPts, fill = INK) {
  const top = topPts.map(([x, y], i) => (i === 0 ? `M ${x},${y}` : `Q ${topPts[i - 1][0] + (x - topPts[i - 1][0]) * 0.5},${topPts[i - 1][1]} ${x},${y}`)).join(" ");
  const botRev = [...botPts].reverse();
  const bot = botRev.map(([x, y], i) => (i === 0 ? `L ${x},${y}` : `Q ${botRev[i - 1][0] + (x - botRev[i - 1][0]) * 0.5},${botRev[i - 1][1]} ${x},${y}`)).join(" ");
  return PATH(`${top} ${bot} Z`, fill);
}
const tube = (d, w = 40, fill = "none", stroke = INK) => PATH(d, fill, stroke, w, "round", "round");
function dots(points, r = 8, fill = BG) {
  let s = "";
  for (const [x, y] of points) s += C(x, y, r, fill, "none");
  return s;
}

const draw = {
  // ---------------- EASY ----------------
  "soccer-ball": () => {
    let s = C(0, 0, 150, INK);
    s += P("-30,-140 15,-118 3,-70 -55,-72 -68,-120", BG);
    s += P("-140,20 -95,-10 -100,45 -140,70 -160,40", BG);
    s += P("140,10 95,-15 100,-55 145,-60 165,-5", BG);
    s += P("-20,130 30,110 55,150 15,175 -25,160", BG);
    s += C(0, 0, 34, BG);
    return s;
  },
  "basketball-hoop": () => {
    let s = P("-120,-150 120,-150 120,-90 -120,-90", "none", INK, 14); // backboard
    s += C(0, -20, 110, "none", "#D9622B", 20); // rim
    for (let i = -4; i <= 4; i++) s += L(i * 24, 0, i * 16, 130, 6, INK);
    return s;
  },
  "tennis-racket": () => {
    let s = E(0, -80, 110, 145, "none", 0, INK, 22);
    for (let i = -3; i <= 3; i++) s += L(i * 28, -210, i * 28, 50, 4);
    for (let i = -4; i <= 4; i++) s += L(-100, -80 + i * 28, 100, -80 + i * 28, 4);
    s += P("-22,50 22,50 16,190 -16,190", INK);
    return s;
  },
  "boxing-gloves": () => {
    // v2: two small mirrored blobs read as confusing/ambiguous shapes —
    // one large, unmistakable glove (mitt + thumb bump + wrist cuff) reads
    // far more clearly at icon scale than two competing small ones
    let s = PATH(`M -70,-190 Q -180,-175 -170,-50 Q -165,20 -90,45 L -90,150 Q -90,195 -30,195 L 80,195 Q 125,195 125,150 L 125,-20 Q 125,-165 -20,-190 Q -50,-195 -70,-190 Z`, INK);
    s += PATH(`M -170,-50 Q -205,-35 -198,25 Q -192,65 -145,58 Q -158,20 -165,-15 Z`, INK); // thumb bump
    s += P("-90,105 125,105 125,140 -90,140", "#C23B3B"); // wrist strap band
    return s;
  },
  "golf-club": () => {
    let s = tube(`M -30,-160 L 60,140`, 16);
    s += PATH(`M 45,110 Q 100,105 110,150 Q 115,180 70,185 Q 40,185 40,155 Z`, INK);
    return s;
  },
  "baseball-bat": () => {
    let s = P("-14,-170 14,-170 30,60 40,140 -40,140 -30,60", INK);
    return s;
  },
  "american-football-ball": () => {
    let s = E(0, 0, 90, 170, INK);
    s += L(0, -110, 0, 110, 6, BG);
    for (let y = -70; y <= 70; y += 35) s += L(-18, y, 18, y, 6, BG);
    return s;
  },
  volleyball: () => {
    let s = C(0, 0, 150, INK);
    s += PATH(`M -150,0 Q -75,-90 0,0 Q 75,90 150,0`, "none", BG, 12);
    s += PATH(`M -100,-105 Q -60,-20 -100,105`, "none", BG, 10);
    s += PATH(`M 100,-105 Q 60,-20 100,105`, "none", BG, 10);
    return s;
  },
  "swimming-goggles": () => {
    let s = E(-70, 0, 55, 45, "none", 0, INK, 20) + E(70, 0, 55, 45, "none", 0, INK, 20);
    s += tube(`M -20,0 L 20,0`, 14);
    s += tube(`M -120,-10 Q -220,-20 -230,60`, 10);
    s += tube(`M 120,-10 Q 220,-20 230,60`, 10);
    return s;
  },
  "table-tennis-paddle": () => {
    let s = C(0, -50, 110, INK);
    s += P("-25,50 25,50 20,160 -20,160", INK);
    return s;
  },
  dartboard: () => {
    let s = C(0, 0, 160, "none", INK, 16);
    s += C(0, 0, 100, "none", INK, 8);
    s += C(0, 0, 30, "none", INK, 8);
    s += C(0, 0, 12, INK);
    for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; s += L(Math.cos(a) * 30, Math.sin(a) * 30, Math.cos(a) * 160, Math.sin(a) * 160, 4); }
    return s;
  },
  skateboard: () => {
    let s = PATH(`M -170,20 Q -180,-30 -140,-40 L 140,-40 Q 180,-30 170,20 Q 180,60 140,60 L -140,60 Q -180,60 -170,20 Z`, INK);
    s += C(-90, 75, 26, INK) + C(90, 75, 26, INK);
    return s;
  },
  "bowling-pin": () => {
    let s = PATH(`M -20,-160 Q -35,-140 -22,-110 Q -45,-70 -40,-10 Q -55,60 -50,120 Q -48,150 0,150 Q 48,150 50,120 Q 55,60 40,-10 Q 45,-70 22,-110 Q 35,-140 20,-160 Q 0,-175 -20,-160 Z`, INK);
    s += P("-52,-5 52,-5 52,25 -52,25", "#C23B3B");
    return s;
  },
  "gymnastics-balance-beam": () => {
    let s = P("-220,-20 220,-20 220,20 -220,20", INK);
    s += P("-180,20 -150,20 -160,140 -190,140", INK);
    s += P("150,20 180,20 190,140 160,140", INK);
    return s;
  },
  "skis-and-poles": () => {
    let s = ribbon([[-30, -180], [-30, 100]], [[-70, -160], [-70, 120]]);
    s += ribbon([[30, -180], [30, 100]], [[70, -160], [70, 120]]);
    s += tube(`M -140,-150 L -100,150`, 10);
    s += tube(`M 140,-150 L 100,150`, 10);
    s += C(-102, 130, 14, "none", INK, 6) + C(102, 130, 14, "none", INK, 6);
    return s;
  },
  surfboard: () => {
    let s = PATH(`M 0,-200 Q 70,-120 60,20 Q 55,140 20,195 Q 0,215 -20,195 Q -55,140 -60,20 Q -70,-120 0,-200 Z`, INK);
    s += PATH(`M 0,120 L 0,190`, "none", BG, 6);
    return s;
  },
  "racing-bicycle": () => {
    let s = C(-110, 90, 90, "none", INK, 16) + C(110, 90, 90, "none", INK, 16);
    s += PATH(`M -110,90 L -20,-60 L 100,-60 L 110,90 M -20,-60 L 40,90 M 40,-90 Q 80,-95 90,-60`, "none", INK, 12);
    s += tube(`M 100,-60 Q 130,-75 150,-65`, 10);
    return s;
  },
  "diving-springboard": () => {
    let s = P("-220,20 200,-10 200,30 -220,60", INK);
    s += P("140,30 170,25 170,140 140,140", INK);
    return s;
  },

  // ---------------- MEDIUM ----------------
  shuttlecock: () => {
    let s = C(0, 100, 40, INK);
    s += P("-60,60 60,60 30,-160 -30,-160", INK);
    for (let i = -2; i <= 2; i++) s += L(i * 22, 55, i * 10, -155, 4);
    return s;
  },
  "hockey-puck": () => {
    let s = E(0, 0, 130, 45, INK);
    return s;
  },
  "rugby-ball": () => {
    let s = E(0, 0, 75, 190, INK);
    s += L(0, -140, 0, 140, 6, BG);
    for (let y = -80; y <= 80; y += 40) s += L(-14, y, 14, y, 5, BG);
    return s;
  },
  "archery-bow": () => {
    let s = PATH(`M 0,-200 Q -110,-100 0,0 Q -110,100 0,200`, "none", INK, 18);
    s += tube(`M 0,-200 L 0,200`, 4);
    return s;
  },
  "curling-stone": () => {
    let s = PATH(`M -140,40 Q -150,-40 0,-45 Q 150,-40 140,40 Q 150,90 0,95 Q -150,90 -140,40 Z`, INK);
    s += P("-40,-45 40,-45 30,-100 -30,-100", INK);
    s += C(0, -110, 28, "none", INK, 14);
    return s;
  },
  javelin: () => {
    let s = tube(`M -220,150 L 220,-150`, 14);
    s += P("195,-175 245,-125 220,-150", INK);
    for (let t = -0.15; t <= 0.15; t += 0.1) s += L(-20 + t * 400, 15 - t * 400, 30 + t * 400, -35 - t * 400, 4);
    return s;
  },
  "snooker-cue": () => {
    let s = P("-10,-200 10,-200 30,150 -30,150", INK);
    s += C(0, -195, 12, "#C9A063");
    return s;
  },
  "water-polo-cap": () => {
    let s = PATH(`M -120,20 Q -130,-100 0,-105 Q 130,-100 120,20 Q 120,60 0,60 Q -120,60 -120,20 Z`, INK);
    s += C(-115, 10, 32, INK) + C(115, 10, 32, INK);
    s += C(0, -20, 30, BG, "none");
    return s;
  },
  snowboard: () => {
    let s = PATH(`M 0,-190 Q 90,-140 85,0 Q 90,140 0,190 Q -90,140 -85,0 Q -90,-140 0,-190 Z`, INK);
    return s;
  },
  "field-hockey-stick": () => {
    let s = tube(`M -20,-190 L 40,100`, 22);
    s += PATH(`M 40,100 Q 100,140 90,180 Q 80,195 40,180 Q 10,165 20,120 Z`, INK);
    return s;
  },
  "sumo-mawashi": () => {
    // v2: a plain crescent read as a smile, not fabric — rebuilt as a thick
    // wrapped ring (a torus, viewed straight-on around an implied waist)
    // with a hanging front fold, the actual distinguishing silhouette
    let s = E(0, 0, 170, 110, INK);
    s += E(0, 0, 95, 52, BG, "none");
    s += P("-40,85 40,85 55,175 -55,175", INK); // hanging front fold
    return s;
  },
  "rowing-oar": () => {
    let s = tube(`M -20,-200 L 30,120`, 14);
    s += PATH(`M 30,120 Q 90,160 70,220 Q 55,250 0,230 Q -20,210 5,150 Z`, INK);
    return s;
  },
  "fencing-mask": () => {
    let s = C(0, -30, 130, "none", INK, 14);
    for (let i = -4; i <= 4; i++) s += L(i * 28, -155, i * 28, 95, 5);
    for (let y = -150; y <= 90; y += 30) s += L(-120, y, 120, y, 5);
    s += P("-90,100 90,100 70,220 -70,220", INK);
    return s;
  },
  "karate-belt": () => {
    // v3: v2's second tail angled back UP through the band, forming a
    // plus/cross shape instead of a belt — both tails now hang straight
    // down from the knot at slightly different angles, like a real tied belt
    let s = P("-220,-25 220,-25 220,25 -220,25", INK); // wrapped band
    s += C(0, 0, 48, INK, "none"); // knot
    s += P("-45,15 5,20 15,150 -55,145", INK); // tail 1
    s += P("5,15 55,10 75,140 15,145", INK); // tail 2
    return s;
  },
  "shot-put": () => C(0, 0, 150, INK),
  "weightlifting-barbell": () => {
    let s = tube(`M -180,0 L 180,0`, 20);
    for (const x of [-180, 180]) { s += E(x, 0, 30, 130, INK); s += E(x, 0, 30, 90, "none", 0, BG, 8); }
    return s;
  },
  "cricket-bat": () => {
    // v4: v3's smooth shoulder curve into the handle still read as a
    // bottle's neck — replaced with a hard angular step (a real bat's
    // shoulders ARE a sharp step, not a smooth taper) and dead-straight
    // vertical blade sides so nothing about it curves like glassware
    let s = P("-16,-220 16,-220 16,-130 -16,-130", INK); // handle
    s += P("-16,-130 16,-130 55,-95 55,110 30,160 -30,160 -55,110 -55,-95", INK); // angular shoulders + straight-sided blade + tapered toe
    s += PATH(`M 0,-90 L 0,100`, "none", "#1E3F5C", 12); // spine ridge
    return s;
  },
  "figure-skate": () => {
    // v3: v2's boot rendered as a rounded dome (read as a bowler hat) with
    // the blade barely distinguishable underneath — rebuilt as a boxy
    // ankle-boot silhouette (a smooth dome alone can't read as "boot," it
    // needs an angular heel/toe profile) plus a simple STROKED arc for the
    // blade (a filled shape kept blending into the boot's own silhouette)
    let s = PATH(`M -140,-160 L 40,-160 Q 90,-160 100,-110 L 130,10 Q 133,30 108,35 L -130,35 Q -155,30 -150,0 L -150,-120 Q -150,-160 -140,-160 Z`, INK); // boot
    s += PATH(`M -170,50 Q 0,85 190,50`, "none", INK, 24); // curved blade, drawn as a stroked arc so it can't fuse into the boot
    s += P("172,55 200,42 203,64 180,72", INK); // toe-pick teeth
    s += P("155,64 183,52 186,74 163,82", INK);
    return s;
  },

  // ---------------- HARD ----------------
  "lacrosse-stick": () => {
    let s = tube(`M -20,-200 L 30,90`, 18);
    s += PATH(`M 30,90 L 100,10 Q 120,-40 80,-70 Q 40,-95 0,-70 L 30,90 Z`, "none", INK, 14);
    for (let y = -50; y <= 60; y += 22) s += L(15 + y * 0.15, y, 75, y * 0.3 + 10, 4);
    return s;
  },
  "fencing-foil": () => {
    let s = tube(`M -220,180 L 150,-140`, 8);
    s += C(150, -140, 40, "none", INK, 16);
    s += P("170,-160 220,-190 205,-155 175,-125", INK);
    return s;
  },
  discus: () => {
    let s = E(0, 0, 160, 60, INK);
    s += E(0, 0, 160, 60, "none", 0, "#1E3F5C", 6);
    return s;
  },
  "biathlon-rifle": () => {
    // v2: 3 disconnected slabs read as an abstract "T", not a gun — rebuilt
    // as a recognizable side-profile rifle: long barrel with sight posts,
    // a receiver block, an angled buttstock, and a trigger guard loop
    let s = P("-250,-8 90,-8 90,10 -250,10", INK); // long thin barrel
    s += L(-230, -8, -230, -28, 7); // front sight post
    s += L(-140, -8, -140, -24, 7); // rear sight post
    s += P("65,-28 105,-28 105,20 65,20", INK); // receiver block
    s += PATH(`M 95,-10 Q 165,10 195,80 Q 200,102 172,106 Q 140,110 120,80 Q 95,40 90,10 Z`, INK); // angled buttstock
    s += PATH(`M -25,10 Q -30,55 -5,65 Q 15,68 18,42 L 18,10 Z`, "none", INK, 8); // trigger guard loop
    return s;
  },
  "vaulting-pole": () => {
    let s = PATH(`M -220,180 Q 0,60 220,-180`, "none", INK, 14);
    return s;
  },
  "throwing-hammer": () => {
    let s = C(-40, 60, 110, INK);
    s += tube(`M 40,-20 L 180,-160`, 6);
    s += E(190, -170, 30, 18, "none", -40, INK, 10);
    return s;
  },
  "luge-sled": () => {
    let s = P("-180,40 180,40 190,70 -190,70", INK);
    s += PATH(`M -180,70 Q -200,120 -170,140`, "none", INK, 14);
    s += PATH(`M 180,70 Q 200,120 170,140`, "none", INK, 14);
    return s;
  },
  bobsled: () => {
    let s = PATH(`M -200,60 Q -210,-60 -80,-90 Q 60,-110 150,-40 Q 200,0 190,60 Q 190,100 130,100 L -170,100 Q -200,100 -200,60 Z`, INK);
    s += PATH(`M -170,100 Q -180,150 -140,150`, "none", INK, 14);
    s += PATH(`M 130,100 Q 140,150 100,150`, "none", INK, 14);
    return s;
  },
  "squash-racket": () => {
    let s = PATH(`M 0,-190 Q 90,-190 90,-90 Q 90,10 0,10 Q -90,10 -90,-90 Q -90,-190 0,-190 Z`, "none", INK, 18);
    for (let i = -2; i <= 2; i++) s += L(i * 24, -180, i * 24, 0, 4);
    for (let y = -170; y <= -10; y += 26) s += L(-75, y, 75, y, 4);
    s += P("-16,10 16,10 12,150 -12,150", INK);
    return s;
  },
  "water-skis": () => {
    let s = ribbon([[-60, -160], [-60, 100]], [[-140, -140], [-140, 120]]);
    s += ribbon([[60, -160], [60, 100]], [[140, -140], [140, 120]]);
    return s;
  },
  "polo-mallet": () => {
    let s = tube(`M -20,-220 L 40,120`, 12);
    s += P("10,110 90,100 90,140 10,150", INK);
    return s;
  },
  "kendo-shinai": () => {
    let s = tube(`M 0,-210 L 0,140`, 22);
    s += P("-24,140 24,140 24,190 -24,190", "#C9A063");
    s += C(0, -210, 16, INK);
    return s;
  },
  "croquet-mallet": () => {
    let s = tube(`M 0,-200 L 0,90`, 16);
    s += P("-60,90 60,90 60,150 -60,150", INK);
    return s;
  },
  "taekwondo-hogu": () => {
    let s = PATH(`M -130,-140 Q -150,-40 -120,120 Q -60,160 0,160 Q 60,160 120,120 Q 150,-40 130,-140 Q 60,-170 0,-160 Q -60,-170 -130,-140 Z`, INK);
    return s;
  },
  "show-jumping-rail": () => {
    let s = P("-30,-190 30,-190 30,-90 -30,-90", INK) + P("170,-190 230,-190 230,-90 170,-90", INK);
    s += tube(`M -10,-150 L 210,-140`, 16);
    s += L(0, -90, 0, 150, 14) + L(200, -90, 200, 150, 14);
    return s;
  },
  handball: () => {
    let s = C(0, 0, 130, INK);
    s += dots([[-60, -50], [0, -70], [60, -50], [-70, 20], [0, 30], [70, 20], [-30, 90], [30, 90]], 10, "#1E3F5C");
    return s;
  },

  // ---------------- IMPOSSIBLE ----------------
  "hurling-hurley": () => {
    let s = tube(`M -10,-200 L 30,60`, 20);
    s += PATH(`M 30,60 Q 120,50 130,120 Q 135,170 60,175 Q 10,175 5,130 Z`, INK);
    return s;
  },
  "sepak-takraw-ball": () => {
    let s = C(0, 0, 150, INK);
    const holes = [[0, 0], [90, 0], [-90, 0], [0, 90], [0, -90], [64, 64], [-64, 64], [64, -64], [-64, -64], [130, 0], [-130, 0], [0, 130]];
    s += dots(holes, 22);
    return s;
  },
  "kabaddi-court-line": () => {
    let s = P("-220,-120 220,-120 220,120 -220,120", "none", INK, 12);
    s += L(0, -120, 0, 120, 10);
    s += L(-110, -120, -110, 120, 6) + L(110, -120, 110, 120, 6);
    return s;
  },
  "real-tennis-racket": () => {
    let s = PATH(`M -40,-220 Q 110,-210 100,-70 Q 90,40 -30,30 Q -120,20 -110,-100 Q -100,-210 -40,-220 Z`, "none", INK, 20);
    for (let i = -3; i <= 3; i++) s += L(i * 22 - 10, -195, i * 22 + 10, 15, 4);
    s += P("-45,25 -15,25 -25,160 -55,160", INK);
    return s;
  },
  "pelota-vasca-cesta": () => {
    let s = PATH(`M -60,-200 Q 60,-180 70,-40 Q 80,80 20,180 Q -10,220 -40,180 Q -70,120 -60,20 Q -50,-100 -60,-200 Z`, "none", INK, 20);
    return s;
  },
  "capoeira-berimbau": () => {
    let s = PATH(`M -30,-220 Q 120,0 -30,220`, "none", INK, 12);
    s += C(-60, 130, 55, INK);
    return s;
  },
  "shinty-caman": () => {
    let s = tube(`M -10,-200 L 20,80`, 18);
    s += PATH(`M 20,80 Q 100,70 110,140 Q 115,190 40,190 Q -10,185 -5,130 Z`, INK);
    return s;
  },
  "muay-thai-mongkol": () => {
    let s = C(0, -150, 55, "none", INK, 20);
    s += PATH(`M -40,-110 Q -60,20 -100,180`, "none", INK, 14);
    s += PATH(`M -20,-100 Q -30,30 -55,170`, "none", INK, 10);
    return s;
  },
  "underwater-hockey-pusher": () => {
    let s = PATH(`M -80,60 Q -90,-10 -20,-20 Q 60,-25 70,30 Q 75,60 20,65 Z`, INK);
    return s;
  },
  "jianzi-shuttlecock": () => {
    let s = E(0, 100, 60, 20, INK);
    for (let i = -3; i <= 3; i++) s += L(i * 16, 90, i * 8, -150, 5);
    return s;
  },
  "kubb-blocks": () => {
    let s = "";
    for (let i = -3; i <= 3; i++) { if (i === 0) continue; s += P(`${i * 55 - 18},60 ${i * 55 + 18},60 ${i * 55 + 18},-40 ${i * 55 - 18},-40`, INK); }
    s += P("-25,60 25,60 25,-140 -25,-140", INK);
    s += P("-30,-140 30,-140 20,-180 -20,-180", INK);
    return s;
  },
  "ringette-ring": () => {
    let s = C(0, 0, 130, INK, "none");
    s += C(0, 0, 55, BG, "none");
    return s;
  },
  footbag: () => {
    let s = C(0, 0, 110, INK);
    for (let i = -2; i <= 2; i++) s += L(-90, i * 35, 90, i * 35, 4, BG);
    for (let i = -2; i <= 2; i++) s += L(i * 35, -90, i * 35, 90, 4, BG);
    return s;
  },
  "sport-stacking-cups": () => {
    let s = "";
    const cupRow = (y, n, w) => { let r = ""; for (let i = 0; i < n; i++) { const x = (i - (n - 1) / 2) * (w + 14); r += P(`${x - w / 2},${y + 40} ${x + w / 2},${y + 40} ${x + w / 2 - 8},${y} ${x - w / 2 + 8},${y}`, INK); } return r; };
    s += cupRow(80, 4, 46) + cupRow(20, 3, 46) + cupRow(-40, 2, 46) + cupRow(-100, 1, 46);
    return s;
  },
  skimboard: () => {
    let s = E(0, 0, 130, 190, INK);
    return s;
  },
  "hornussen-schindel": () => {
    let s = tube(`M -30,-200 L 30,60`, 20);
    s += P("-100,60 100,60 100,180 -100,180", INK);
    return s;
  },
  "petanque-boules": () => {
    let s = C(0, 0, 140, INK);
    for (let i = -3; i <= 3; i++) s += L(-110, i * 30, 110, i * 30, 3, "#0F2A40");
    return s;
  },
  "floorball-stick": () => {
    let s = tube(`M -20,-200 L 20,100`, 14);
    s += PATH(`M 20,100 Q 80,110 85,150 Q 88,175 40,175 Q 0,172 5,135 Z`, "none", INK, 10);
    return s;
  },
};

const only = process.argv[2] ? process.argv.slice(2) : null;
let ok = 0, fail = [];
for (const item of SPORT_EQUIPMENT_E95) {
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
console.log(`\n${ok}/${only ? only.length : SPORT_EQUIPMENT_E95.length} generated.`);
if (fail.length) console.log("failed:", fail.join(", "));
