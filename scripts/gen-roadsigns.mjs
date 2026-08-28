// Generates clean vector road-sign PNGs locally (no network) -> public/roadsigns82/<slug>.png
// Road signs are standardized geometric pictograms (Vienna Convention style: red triangle=warning,
// red circle+slash=prohibition, blue circle=mandatory, rectangle=informational) — drawn directly.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const DEST = "public/roadsigns82";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const S = 700; // canvas
const RED = "#D32122";
const BLUE = "#0057A6";
const BLACK = "#1a1a1a";
const WHITE = "#ffffff";
const YELLOW = "#F2C230";
const GREEN = "#0B7A3B";

const wrap = (inner) => `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// ---- shells ----
const triangleWarning = (pictogram, big = false) => {
  const scale = big ? 1.15 : 1;
  return wrap(`
    <polygon points="350,40 660,610 40,610" fill="${WHITE}" stroke="${RED}" stroke-width="34"/>
    <g transform="translate(350,410) scale(${scale})">${pictogram}</g>
  `);
};

const circleProhibition = (pictogram) => wrap(`
  <circle cx="350" cy="350" r="300" fill="${WHITE}" stroke="${RED}" stroke-width="40"/>
  <g transform="translate(350,350)">${pictogram}</g>
`);

const circleProhibitionSlash = (pictogram) => wrap(`
  <circle cx="350" cy="350" r="300" fill="${WHITE}" stroke="${RED}" stroke-width="40"/>
  <g transform="translate(350,350)">${pictogram}</g>
  <line x1="130" y1="570" x2="570" y2="130" stroke="${RED}" stroke-width="38" stroke-linecap="round"/>
`);

const circleMandatory = (pictogram) => wrap(`
  <circle cx="350" cy="350" r="300" fill="${BLUE}"/>
  <g transform="translate(350,350)">${pictogram}</g>
`);

const rectInfo = (pictogram, bg = BLUE) => wrap(`
  <rect x="60" y="140" width="580" height="420" rx="24" fill="${bg}"/>
  <g transform="translate(350,350)">${pictogram}</g>
`);

const octagonText = (text, size = 150) => wrap(`
  <polygon points="230,50 470,50 630,210 630,490 470,650 230,650 70,490 70,210" fill="${RED}" stroke="${WHITE}" stroke-width="14"/>
  <text x="350" y="380" font-family="Arial, sans-serif" font-weight="900" font-size="${size}" fill="${WHITE}" text-anchor="middle">${text}</text>
`);

const invertedTriangleText = (text) => wrap(`
  <polygon points="60,90 640,90 350,610" fill="${RED}"/>
  <polygon points="140,150 560,150 350,510" fill="${WHITE}"/>
  <text x="350" y="245" font-family="Arial, sans-serif" font-weight="900" font-size="80" fill="${RED}" text-anchor="middle">${text}</text>
`);

const circleSpeed = (num) => wrap(`
  <circle cx="350" cy="350" r="300" fill="${WHITE}" stroke="${RED}" stroke-width="42"/>
  <text x="350" y="410" font-family="Arial, sans-serif" font-weight="900" font-size="260" fill="${BLACK}" text-anchor="middle">${num}</text>
`);

// ---- shared "standing quadruped in profile" builder, facing right ----
function quadruped(opts) {
  const {
    torsoW = 240, torsoH = 90, torsoCx = -20, torsoCy = 20,
    neckLen = 90, neckAngle = -55, headR = 40, muzzleLen = 46, muzzleDrop = false,
    legLen = 140, legW = 26, earShape = "round", hump = false, humpTall = false,
    tail = "short",
  } = opts;
  const nx = torsoCx + torsoW / 2 - 16;
  const ny = torsoCy - torsoH / 2 + 6;
  const rad = (neckAngle * Math.PI) / 180;
  const hx = nx + neckLen * Math.cos(rad);
  const hy = ny + neckLen * Math.sin(rad);
  let s = "";
  // legs (drawn first, behind torso)
  const legXs = [torsoCx - torsoW * 0.3, torsoCx - torsoW * 0.08, torsoCx + torsoW * 0.15, torsoCx + torsoW * 0.34];
  for (const lx of legXs) {
    s += `<rect x="${lx - legW / 2}" y="${torsoCy + torsoH / 2 - 14}" width="${legW}" height="${legLen}" rx="${legW / 2}"/>`;
  }
  // tail
  if (tail === "short") s += `<polygon points="${torsoCx - torsoW / 2},${torsoCy - 10} ${torsoCx - torsoW / 2 - 34},${torsoCy + 10} ${torsoCx - torsoW / 2},${torsoCy + 30}"/>`;
  if (tail === "tuft") s += `<path d="M${torsoCx - torsoW / 2},${torsoCy - 6} Q${torsoCx - torsoW / 2 - 46},${torsoCy + 20} ${torsoCx - torsoW / 2 - 30},${torsoCy + 70} Q${torsoCx - torsoW / 2 - 4},${torsoCy + 70} ${torsoCx - torsoW / 2 - 14},${torsoCy + 30} Z"/>`;
  if (tail === "thin") s += `<path d="M${torsoCx - torsoW / 2},${torsoCy - 10} Q${torsoCx - torsoW / 2 - 40},${torsoCy + 30} ${torsoCx - torsoW / 2 - 20},${torsoCy + 90}" stroke="${BLACK}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  // torso
  s += `<rect x="${torsoCx - torsoW / 2}" y="${torsoCy - torsoH / 2}" width="${torsoW}" height="${torsoH}" rx="${torsoH / 2}"/>`;
  // hump
  if (hump) s += `<ellipse cx="${torsoCx + torsoW * 0.08}" cy="${torsoCy - torsoH / 2 - (humpTall ? 55 : 30)}" rx="${torsoW * 0.22}" ry="${humpTall ? 65 : 40}"/>`;
  // neck
  s += `<rect x="${nx - 14}" y="${ny - neckLen}" width="28" height="${neckLen}" rx="13" transform="rotate(${neckAngle + 90} ${nx} ${ny})"/>`;
  // head
  s += `<circle cx="${hx}" cy="${hy}" r="${headR}"/>`;
  // muzzle (points further along the neck direction, slightly forward/down)
  const muzzleAngle = muzzleDrop ? rad + 0.9 : rad;
  s += `<ellipse cx="${hx + muzzleLen * 0.6 * Math.cos(muzzleAngle)}" cy="${hy + muzzleLen * 0.6 * Math.sin(muzzleAngle)}" rx="${muzzleLen * 0.5}" ry="${headR * 0.5}" transform="rotate(${(muzzleAngle * 180) / Math.PI} ${hx + muzzleLen * 0.6 * Math.cos(muzzleAngle)} ${hy + muzzleLen * 0.6 * Math.sin(muzzleAngle)})"/>`;
  // ears/horns/antlers
  if (earShape === "antler") {
    s += `<path d="M${hx - 10},${hy - headR} Q${hx - 50},${hy - headR - 60} ${hx - 80},${hy - headR - 40} M${hx - 30},${hy - headR - 25} L${hx - 60},${hy - headR - 15}" stroke="${BLACK}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M${hx + 15},${hy - headR} Q${hx + 55},${hy - headR - 65} ${hx + 85},${hy - headR - 45} M${hx + 35},${hy - headR - 28} L${hx + 68},${hy - headR - 20}" stroke="${BLACK}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  } else if (earShape === "paddle") {
    s += `<rect x="${hx - 30}" y="${hy - headR - 20}" width="14" height="24" transform="rotate(-15 ${hx - 30} ${hy - headR - 20})"/>`;
    s += `<rect x="${hx + 16}" y="${hy - headR - 22}" width="14" height="26" transform="rotate(15 ${hx + 16} ${hy - headR - 22})"/>`;
    s += `<ellipse cx="${hx - 34}" cy="${hy - headR - 22}" rx="42" ry="20" transform="rotate(-25 ${hx - 34} ${hy - headR - 22})"/>`;
    s += `<ellipse cx="${hx + 40}" cy="${hy - headR - 25}" rx="46" ry="22" transform="rotate(20 ${hx + 40} ${hy - headR - 25})"/>`;
  } else if (earShape === "horns") {
    s += `<path d="M${hx - 15},${hy - headR + 5} Q${hx - 60},${hy - headR - 20} ${hx - 55},${hy - headR - 55}" stroke="${BLACK}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M${hx + 15},${hy - headR + 5} Q${hx + 60},${hy - headR - 20} ${hx + 55},${hy - headR - 55}" stroke="${BLACK}" stroke-width="14" fill="none" stroke-linecap="round"/>`;
    s += `<ellipse cx="${hx - 45}" cy="${hy - 5}" rx="16" ry="22"/><ellipse cx="${hx + 45}" cy="${hy - 5}" rx="16" ry="22"/>`;
  } else if (earShape === "small") {
    s += `<ellipse cx="${hx - 10}" cy="${hy - headR - 8}" rx="14" ry="18" transform="rotate(-20 ${hx - 10} ${hy - headR - 8})"/>`;
  } else {
    s += `<ellipse cx="${hx - 20}" cy="${hy - headR - 5}" rx="18" ry="24" transform="rotate(-15 ${hx - 20} ${hy - headR - 5})"/>`;
  }
  return `<g fill="${BLACK}">${s}</g>`;
}

// ---- sitting frog: leaner body, long ready-to-leap hind leg ----
function frogShape() {
  return `<g fill="${BLACK}">
    <path d="M-120,40 Q-145,-35 -55,-78 Q15,-112 78,-68 Q128,-30 108,30 Q95,75 40,82 L-90,82 Q-112,72 -120,40 Z"/>
    <circle cx="-48" cy="-75" r="30"/>
    <circle cx="-48" cy="-80" r="12" fill="${WHITE}"/>
    <circle cx="-48" cy="-80" r="5"/>
    <path d="M50,45 Q120,20 160,55 Q180,80 150,100 L95,100 Q100,70 50,72 Z"/>
    <path d="M-90,82 L-115,112 L-72,112 Z"/>
  </g>`;
}

// ---- squat toad: rounder/wider body, low stubby legs, visible pale warts ----
function toadShape() {
  return `<g fill="${BLACK}">
    <ellipse cx="0" cy="35" rx="155" ry="88"/>
    <rect x="-125" y="95" width="34" height="42" rx="14"/>
    <rect x="-40" y="105" width="34" height="42" rx="14"/>
    <rect x="45" y="105" width="34" height="42" rx="14"/>
    <rect x="105" y="90" width="34" height="42" rx="14"/>
    <circle cx="-60" cy="-45" r="34"/>
    <circle cx="-88" cy="-58" r="15"/>
    <circle cx="-60" cy="-50" r="12" fill="${WHITE}"/>
    <circle cx="-60" cy="-50" r="5"/>
    <ellipse cx="10" cy="0" rx="12" ry="9" fill="${WHITE}"/>
    <ellipse cx="60" cy="30" rx="13" ry="10" fill="${WHITE}"/>
    <ellipse cx="-30" cy="55" rx="11" ry="8" fill="${WHITE}"/>
    <ellipse cx="90" cy="-10" rx="10" ry="8" fill="${WHITE}"/>
  </g>`;
}

// ---- pictograms (centered on 0,0) ----
const P = {
  arrowUp: (w = 60) => `<polygon points="0,-180 130,-30 60,-30 60,180 -60,180 -60,-30 -130,-30" fill="${BLACK}"/>`,
  arrowUpTilted: (deg) => `<g transform="rotate(${deg})">${P.arrowUp()}</g>`,
  car: `<g fill="${BLACK}"><rect x="-140" y="-20" width="280" height="90" rx="20"/><rect x="-90" y="-70" width="180" height="70" rx="18"/><circle cx="-90" cy="80" r="34"/><circle cx="90" cy="80" r="34"/></g>`,
  truck: `<g fill="${BLACK}"><rect x="-160" y="-40" width="200" height="140" rx="10"/><rect x="40" y="0" width="120" height="100" rx="10"/><circle cx="-100" cy="110" r="32"/><circle cx="20" cy="110" r="32"/><circle cx="120" cy="110" r="32"/></g>`,
  bike: `<g fill="none" stroke="${BLACK}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"><circle cx="-110" cy="90" r="80" fill="none"/><circle cx="110" cy="90" r="80" fill="none"/><path d="M-110,90 L-20,-60 L110,90 M-20,-60 L40,-60 M-60,10 L110,10"/></g>`,
  pedestrian: `<g fill="${BLACK}"><circle cx="0" cy="-140" r="45"/><path d="M-55,-70 Q0,-95 55,-70 L75,60 L30,60 L20,180 L-20,180 L-35,40 L-60,180 L-95,180 L-75,20 Z"/></g>`,
  pedestrians: `<g fill="${BLACK}"><circle cx="-70" cy="-140" r="42"/><path d="M-118,-72 Q-70,-95 -22,-72 L-8,50 L-45,50 L-52,170 L-88,170 L-98,40 L-118,170 L-150,170 L-132,20 Z"/><circle cx="80" cy="-110" r="42"/><path d="M32,-42 Q80,-65 128,-42 L142,80 L105,80 L98,200 L62,200 L52,70 L32,200 L0,200 L18,50 Z"/></g>`,
  children: `<g fill="${BLACK}"><circle cx="-55" cy="-40" r="34"/><path d="M-95,10 Q-55,-8 -15,10 L-5,150 L-35,150 L-40,240 L-70,240 L-78,140 L-88,240 L-118,240 L-108,120 Z"/><circle cx="60" cy="-100" r="40"/><path d="M15,-40 Q60,-60 105,-40 L118,110 L86,110 L80,220 L48,220 L38,100 L20,220 L-8,220 L5,90 Z"/></g>`,
  train: `<g fill="${BLACK}"><rect x="-90" y="-160" width="180" height="220" rx="30"/><circle cx="-40" cy="10" r="18" fill="${WHITE}"/><circle cx="40" cy="10" r="18" fill="${WHITE}"/><rect x="-70" y="-120" width="140" height="70" fill="${WHITE}"/></g><line x1="-160" y1="90" x2="160" y2="90" stroke="${BLACK}" stroke-width="20"/><line x1="-140" y1="150" x2="-70" y2="90" stroke="${BLACK}" stroke-width="18"/><line x1="140" y1="150" x2="70" y2="90" stroke="${BLACK}" stroke-width="18"/>`,
  trafficLight: `<g><rect x="-60" y="-180" width="120" height="330" rx="24" fill="${BLACK}"/><circle cx="0" cy="-120" r="38" fill="${RED}"/><circle cx="0" cy="-10" r="38" fill="${YELLOW}"/><circle cx="0" cy="100" r="38" fill="${GREEN}"/></g>`,
  hospitalPlus: `<g fill="${WHITE}"><rect x="-140" y="-40" width="280" height="80"/><rect x="-40" y="-140" width="80" height="280"/></g>`,
  hLetter: `<text x="0" y="110" font-family="Arial, sans-serif" font-weight="900" font-size="380" fill="${WHITE}" text-anchor="middle">H</text>`,
  gasPump: `<g fill="${WHITE}"><rect x="-90" y="-160" width="150" height="320" rx="14"/><rect x="-60" y="-120" width="90" height="90" fill="${BLUE}"/><path d="M60,-100 L120,-100 L120,120 Q120,150 90,150 L60,150" fill="none" stroke="${WHITE}" stroke-width="20"/><circle cx="90" cy="-140" r="16" fill="${WHITE}"/></g>`,
  bed: `<g fill="${WHITE}"><rect x="-150" y="20" width="300" height="70" rx="14"/><rect x="-150" y="-70" width="90" height="90" rx="14"/><rect x="-150" y="90" width="300" height="26"/></g>`,
  parkingP: `<text x="0" y="90" font-family="Arial, sans-serif" font-weight="900" font-size="320" fill="${WHITE}" text-anchor="middle">P</text>`,
  parkingPBlack: `<text x="0" y="90" font-family="Arial, sans-serif" font-weight="900" font-size="320" fill="${BLACK}" text-anchor="middle">P</text>`,
  tent: `<g fill="${WHITE}"><polygon points="0,-160 150,140 90,140 0,-30 -90,140 -150,140"/></g>`,
  picnicTable: `<g fill="${WHITE}"><rect x="-160" y="-70" width="320" height="34"/><polygon points="-140,-36 -95,90 -55,90 -95,-36"/><polygon points="140,-36 95,90 55,90 95,-36"/><rect x="-170" y="30" width="340" height="26"/></g>`,
  wheelchair: `<g fill="${WHITE}"><circle cx="-55" cy="-150" r="34"/><path d="M-95,-95 L-35,-95 L-15,-10 L75,-10 L75,45 L-45,45 L-70,-45 L-95,-45 Z"/><circle cx="10" cy="115" r="100" fill="none" stroke="${WHITE}" stroke-width="30"/><rect x="-15" y="35" width="30" height="70" rx="12"/></g>`,
  plane: `<g fill="${WHITE}"><path d="M0,-170 L40,-40 L180,40 L180,90 L40,50 L20,150 L80,190 L80,220 L0,200 L-80,220 L-80,190 L-20,150 L-40,50 L-180,90 L-180,40 L-40,-40 Z"/></g>`,
  deer: quadruped({ earShape: "antler", torsoW: 230, torsoH: 80, headR: 34, muzzleLen: 34, legLen: 150, legW: 20, tail: "short" }),
  moose: quadruped({ earShape: "paddle", torsoW: 240, torsoH: 95, torsoCx: -50, headR: 44, muzzleLen: 42, muzzleDrop: true, legLen: 120, legW: 24, neckLen: 95, neckAngle: -70, hump: true, tail: "short" }),
  cattle: quadruped({ earShape: "horns", torsoW: 260, torsoH: 100, headR: 38, muzzleLen: 38, legLen: 120, legW: 26, tail: "tuft" }),
  camel: `<g fill="${BLACK}">
    <rect x="-120" y="70" width="22" height="120" rx="10"/>
    <rect x="-60" y="70" width="22" height="120" rx="10"/>
    <rect x="50" y="70" width="22" height="120" rx="10"/>
    <rect x="100" y="70" width="22" height="120" rx="10"/>
    <rect x="-130" y="30" width="270" height="65" rx="30"/>
    <path d="M-80,42 Q-45,-75 -5,42 Z"/>
    <path d="M100,60 Q100,-60 140,-110 Q152,-124 148,-98 Q140,-60 138,-10 L115,40 Z"/>
    <circle cx="158" cy="-140" r="28"/>
    <ellipse cx="184" cy="-130" rx="15" ry="9"/>
    <rect x="150" y="-178" width="12" height="24" rx="6" transform="rotate(-10 150 -178)"/>
    <path d="M-130,60 Q-160,75 -155,105 Q-152,118 -135,110 Z"/>
  </g>`,
  kangaroo: `<g fill="${BLACK}">
    <polygon points="-15,25 -55,45 -170,180 -148,198 -60,95 -20,55"/>
    <ellipse cx="20" cy="-15" rx="80" ry="110"/>
    <ellipse cx="-40" cy="-55" rx="24" ry="34"/>
    <circle cx="62" cy="-142" r="36"/>
    <ellipse cx="95" cy="-122" rx="16" ry="10"/>
    <ellipse cx="46" cy="-195" rx="15" ry="42" transform="rotate(-12 46 -195)"/>
    <ellipse cx="78" cy="-198" rx="15" ry="42" transform="rotate(10 78 -198)"/>
    <rect x="8" y="55" width="66" height="105" rx="30" transform="rotate(12 8 55)"/>
    <ellipse cx="108" cy="228" rx="78" ry="26" transform="rotate(-8 108 228)"/>
  </g>`,
  wombat: `<g fill="${BLACK}">
    <ellipse cx="0" cy="0" rx="170" ry="95"/>
    <rect x="-120" y="70" width="34" height="60" rx="14"/>
    <rect x="90" y="70" width="34" height="60" rx="14"/>
    <ellipse cx="-160" cy="-30" rx="34" ry="30"/>
    <ellipse cx="150" cy="-50" rx="46" ry="42"/>
    <ellipse cx="140" cy="-90" rx="16" ry="14"/>
    <circle cx="180" cy="-58" r="9" fill="${WHITE}"/>
  </g>`,
  frog: frogShape(),
  toad: toadShape(),
  exclaim: `<g fill="${BLACK}"><rect x="-24" y="-190" width="48" height="240" rx="20"/><circle cx="0" cy="150" r="30"/></g>`,
  slipperyCar: `<g fill="${BLACK}"><rect x="-140" y="-20" width="280" height="90" rx="20" transform="skewX(-12)"/><path d="M-160,120 Q-80,80 0,120 Q80,160 160,120" fill="none" stroke="${BLACK}" stroke-width="16"/></g>`,
  bump: `<path d="M-180,60 Q-90,-100 0,60 Q90,220 180,60" fill="none" stroke="${BLACK}" stroke-width="30"/>`,
  curve: `<path d="M-140,150 Q160,150 160,-60 Q160,-170 40,-170" fill="none" stroke="${BLACK}" stroke-width="34"/><polygon points="40,-210 40,-130 100,-170" fill="${BLACK}"/>`,
  windingRoad: `<path d="M-160,-140 Q-40,-140 -40,0 Q-40,140 80,140 Q180,140 180,20" fill="none" stroke="${BLACK}" stroke-width="30"/>`,
  narrowBridge: `<g fill="none" stroke="${BLACK}" stroke-width="26"><rect x="-180" y="-40" width="120" height="80"/><rect x="60" y="-40" width="120" height="80"/><line x1="-60" y1="0" x2="60" y2="0" stroke-dasharray="10 14"/></g>`,
  rocks: `<g fill="${BLACK}"><polygon points="-30,-190 40,-190 90,-140 60,-90 -60,-90 -90,-140"/><polygon points="-100,-80 -40,-80 -20,-30 -60,20 -140,20 -160,-30"/></g>`,
  iceCrystal: `<g stroke="${BLACK}" stroke-width="18" stroke-linecap="round"><line x1="0" y1="-160" x2="0" y2="160"/><line x1="-140" y1="-80" x2="140" y2="80"/><line x1="-140" y1="80" x2="140" y2="-80"/></g>`,
  avalanche: `<g fill="${BLACK}"><polygon points="-180,120 -60,-160 60,-40 120,-160 200,120"/></g>`,
  icicle: `<g fill="${BLACK}"><polygon points="-160,-140 -160,-40 -130,60"/><polygon points="-80,-140 -80,-20 -50,90"/><polygon points="0,-140 0,-60 30,50"/><polygon points="80,-140 80,-10 110,80"/></g>`,
  water: `<path d="M-160,60 Q-100,-20 -40,60 Q20,140 80,60 Q140,-20 200,60" fill="none" stroke="${BLACK}" stroke-width="26"/><rect x="-160" y="60" width="360" height="20" fill="${BLACK}"/>`,
  gravel: `<g fill="${BLACK}"><ellipse cx="-90" cy="60" rx="34" ry="24"/><ellipse cx="20" cy="20" rx="40" ry="28"/><ellipse cx="110" cy="80" rx="30" ry="22"/><ellipse cx="-30" cy="-60" rx="26" ry="20"/></g>`,
  plane2: `<g fill="${BLACK}"><path d="M0,-170 L30,-40 L170,20 L170,60 L30,40 L15,140 L60,175 L60,200 L0,185 L-60,200 L-60,175 L-15,140 L-30,40 L-170,60 L-170,20 L-30,-40 Z"/></g>`,
  wind: `<g fill="none" stroke="${BLACK}" stroke-width="24" stroke-linecap="round"><path d="M-170,-60 L120,-60 Q170,-60 170,-110 Q170,-150 130,-150"/><path d="M-170,20 L150,20 Q200,20 200,70 Q200,120 150,120"/><path d="M-170,100 L60,100"/></g>`,
  quicksandIcon: `<g fill="${BLACK}"><ellipse cx="0" cy="60" rx="170" ry="50"/></g><text x="0" y="-40" font-family="Arial" font-weight="900" font-size="60" fill="${BLACK}" text-anchor="middle">~~~</text>`,
  crossroads: `<g stroke="${BLACK}" stroke-width="26"><line x1="-190" y1="0" x2="190" y2="0"/><line x1="0" y1="-190" x2="0" y2="190"/></g>`,
  merge: `<g fill="none" stroke="${BLACK}" stroke-width="26"><path d="M-100,190 L-40,-40 Q-20,-160 60,-190"/><path d="M110,190 Q30,60 60,-190"/></g>`,
  divided: `<g fill="none" stroke="${BLACK}" stroke-width="24"><line x1="-70" y1="-190" x2="-70" y2="190"/><line x1="70" y1="-190" x2="70" y2="190"/></g>`,
  dip: `<path d="M-180,-60 L-60,-60 Q0,140 60,-60 L180,-60" fill="none" stroke="${BLACK}" stroke-width="26"/>`,
  telephone: `<path d="M-100,-140 Q-140,-40 -20,80 Q60,160 140,140 L160,60 L90,20 L60,80 Q0,50 -30,-20 L30,-50 L0,-130 Z" fill="${WHITE}"/>`,
  tollBooth: `<g fill="${WHITE}"><rect x="-120" y="-140" width="240" height="200" rx="10"/><rect x="-80" y="-90" width="60" height="60" fill="${BLUE}"/><rect x="20" y="-90" width="60" height="60" fill="${BLUE}"/></g><line x1="-160" y1="70" x2="160" y2="70" stroke="${WHITE}" stroke-width="20"/>`,
  horn: `<g fill="${BLACK}"><path d="M-140,-40 L-60,-40 L60,-140 L60,140 L-60,40 L-140,40 Z"/></g>`,
  chevron: `<polygon points="-100,-160 40,0 -100,160 -20,160 120,0 -20,-160" fill="${BLACK}"/>`,
};

const items = [
  ["stop", octagonText("STOP", 165)],
  ["yield", invertedTriangleText("YIELD")],
  ["no-entry", wrap(`<circle cx="350" cy="350" r="300" fill="${RED}" stroke="${WHITE}" stroke-width="8"/><rect x="140" y="310" width="420" height="80" rx="10" fill="${WHITE}"/>`)],
  ["pedestrian-crossing", triangleWarning(P.pedestrian)],
  ["speed-limit", circleSpeed("50")],
  ["one-way", wrap(`<rect x="30" y="230" width="640" height="240" rx="14" fill="${BLACK}"/><g transform="translate(350,350) rotate(90) scale(1.3)">${P.arrowUp().replace(new RegExp(BLACK, "g"), WHITE)}</g>`)],
  ["no-parking", circleProhibitionSlash(P.parkingPBlack)],
  ["railroad-crossing", wrap(`<line x1="80" y1="80" x2="620" y2="620" stroke="${WHITE}" stroke-width="60"/><line x1="620" y1="80" x2="80" y2="620" stroke="${WHITE}" stroke-width="60"/><line x1="80" y1="80" x2="620" y2="620" stroke="${BLACK}" stroke-width="70" stroke-dasharray="1 999"/><circle cx="350" cy="350" r="330" fill="none" stroke="${BLACK}" stroke-width="0"/><g stroke="${BLACK}" stroke-width="20" fill="none"><line x1="80" y1="80" x2="620" y2="620"/><line x1="620" y1="80" x2="80" y2="620"/></g>`)],
  ["traffic-signal-ahead", triangleWarning(P.trafficLight)],
  ["school-crossing", triangleWarning(P.children)],
  ["no-u-turn", circleProhibitionSlash(`<path d="M60,140 Q60,-40 -60,-40 Q-160,-40 -160,60" fill="none" stroke="${BLACK}" stroke-width="34"/><polygon points="-160,10 -220,80 -100,80" fill="${BLACK}"/>`)],
  ["hospital", rectInfo(P.hLetter, BLUE)],
  ["roundabout", (() => {
    const arrow = `<path d="M0,-140 A140,140 0 0,1 121,-70" fill="none" stroke="${WHITE}" stroke-width="28" stroke-linecap="round"/><polygon points="121,-70 100,-22 148,-42" fill="${WHITE}"/>`;
    return circleMandatory(`<g>${arrow}</g><g transform="rotate(120)">${arrow}</g><g transform="rotate(240)">${arrow}</g>`);
  })()],
  ["no-overtaking", circleProhibition(`<g transform="translate(-55,15)"><rect x="-18" y="-68" width="36" height="136" rx="14" fill="${BLACK}"/><rect x="-24" y="-12" width="48" height="42" rx="8" fill="${BLACK}"/></g><g transform="translate(65,-15)"><rect x="-18" y="-68" width="36" height="136" rx="14" fill="${RED}"/><rect x="-24" y="-12" width="48" height="42" rx="8" fill="${RED}"/></g>`)],
  ["speed-bump", triangleWarning(P.bump)],
  ["handicap-parking", rectInfo(P.wheelchair, BLUE)],
  ["gas-station", rectInfo(P.gasPump)],
  ["dead-end", wrap(`<rect x="20" y="230" width="660" height="240" rx="10" fill="${WHITE}" stroke="${BLACK}" stroke-width="10"/><text x="350" y="400" font-family="Arial" font-weight="900" font-size="130" fill="${BLACK}" text-anchor="middle">DEAD END</text>`)],
  ["merge", triangleWarning(P.merge)],
  ["slippery-road", triangleWarning(P.slipperyCar)],
  ["two-way-traffic", wrap(`<rect x="20" y="230" width="660" height="240" rx="10" fill="${BLACK}"/><g transform="translate(230,350) scale(0.75) rotate(-90)">${P.arrowUp().replace(new RegExp(BLACK,'g'), WHITE)}</g><g transform="translate(470,350) scale(0.75) rotate(90)">${P.arrowUp().replace(new RegExp(BLACK,'g'), WHITE)}</g>`)],
  ["wrong-way", wrap(`<rect x="20" y="180" width="660" height="340" rx="16" fill="${RED}"/><text x="350" y="380" font-family="Arial" font-weight="900" font-size="115" fill="${WHITE}" text-anchor="middle">WRONG</text><text x="350" y="470" font-family="Arial" font-weight="900" font-size="115" fill="${WHITE}" text-anchor="middle">WAY</text>`)],
  ["no-trucks", circleProhibitionSlash(P.truck)],
  ["bike-lane", circleMandatory(P.bike.replace(new RegExp(BLACK,'g'), WHITE))],
  ["height-restriction", wrap(`<rect x="30" y="150" width="640" height="400" rx="10" fill="${WHITE}" stroke="${RED}" stroke-width="34"/><text x="350" y="330" font-family="Arial" font-weight="900" font-size="150" fill="${BLACK}" text-anchor="middle">13'6"</text><g transform="translate(350,440)">${P.arrowUpTilted(0)}</g>`)],
  ["deer-crossing", triangleWarning(P.deer)],
  ["curve-ahead", triangleWarning(P.curve)],
  ["divided-highway", triangleWarning(P.divided)],
  ["no-bicycles", circleProhibitionSlash(P.bike)],
  ["steep-hill", triangleWarning(`<path d="M-160,120 L160,120 L160,-60 Z" fill="${BLACK}"/><text x="0" y="95" font-family="Arial" font-weight="900" font-size="52" fill="${WHITE}">10%</text>`)],
  ["winding-road", triangleWarning(P.windingRoad)],
  ["no-left-turn", circleProhibitionSlash(`<path d="M40,140 L40,-20 Q40,-60 0,-60 L-100,-60" fill="none" stroke="${BLACK}" stroke-width="34"/><polygon points="-100,-95 -165,-60 -100,-25" fill="${BLACK}"/>`)],
  ["keep-right", circleMandatory(`<g transform="rotate(135) scale(1.1)">${P.arrowUp().replace(new RegExp(BLACK,'g'), WHITE)}</g>`)],
  ["parking", rectInfo(P.parkingP)],
  ["construction-zone", triangleWarning(`<g fill="${BLACK}">
    <circle cx="30" cy="-150" r="28"/>
    <path d="M-15,-105 Q30,-125 65,-105 L72,-10 L38,-10 L30,-70 L15,-10 L-25,-10 Z"/>
    <rect x="-110" y="30" width="20" height="115" rx="9" transform="rotate(-35 -110 30)"/>
    <polygon points="-165,140 -120,110 -100,140 -140,170"/>
  </g>`)],
  ["rest-area", rectInfo(P.picnicTable, GREEN)],
  ["falling-rocks", triangleWarning(P.rocks)],
  ["minimum-speed", wrap(`<circle cx="350" cy="350" r="300" fill="${BLUE}"/><text x="350" y="330" font-family="Arial" font-weight="900" font-size="90" fill="${WHITE}" text-anchor="middle">MIN</text><text x="350" y="440" font-family="Arial" font-weight="900" font-size="150" fill="${WHITE}" text-anchor="middle">40</text>`)],
  ["weight-limit", wrap(`<circle cx="350" cy="350" r="300" fill="${WHITE}" stroke="${RED}" stroke-width="40"/><text x="350" y="330" font-family="Arial" font-weight="900" font-size="120" fill="${BLACK}" text-anchor="middle">7.5t</text><text x="350" y="450" font-family="Arial" font-weight="700" font-size="60" fill="${BLACK}" text-anchor="middle">MAX WEIGHT</text>`)],
  ["airport", rectInfo(P.plane2)],
  ["toll-road", wrap(`<rect x="30" y="230" width="640" height="240" rx="14" fill="${BLACK}"/><text x="350" y="400" font-family="Arial" font-weight="900" font-size="150" fill="${WHITE}" text-anchor="middle">TOLL</text>`)],
  ["icy-road", triangleWarning(P.iceCrystal)],
  ["cattle-crossing", triangleWarning(P.cattle)],
  ["no-horn", circleProhibitionSlash(P.horn)],
  ["narrow-bridge", triangleWarning(P.narrowBridge)],
  ["camping-area", rectInfo(P.tent, GREEN)],
  ["emergency-stopping-only", wrap(`<rect x="20" y="230" width="660" height="240" rx="10" fill="${BLUE}"/><text x="350" y="330" font-family="Arial" font-weight="900" font-size="70" fill="${WHITE}" text-anchor="middle">EMERGENCY</text><text x="350" y="410" font-family="Arial" font-weight="900" font-size="70" fill="${WHITE}" text-anchor="middle">STOPPING ONLY</text>`)],
  ["no-stopping", wrap(`<circle cx="350" cy="350" r="300" fill="${BLUE}" stroke="${RED}" stroke-width="40"/><line x1="140" y1="140" x2="560" y2="560" stroke="${RED}" stroke-width="36"/><line x1="560" y1="140" x2="140" y2="560" stroke="${RED}" stroke-width="36"/>`)],
  ["no-pedestrians", circleProhibitionSlash(P.pedestrian)],
  ["steep-descent", triangleWarning(`<path d="M-160,-40 L160,-40 L160,140 Z" fill="${BLACK}"/><text x="0" y="15" font-family="Arial" font-weight="900" font-size="52" fill="${WHITE}">10%</text>`)],
  ["road-narrows", triangleWarning(`<g fill="none" stroke="${BLACK}" stroke-width="26"><path d="M-180,-160 L-40,-20 L-40,20 L-180,160"/><path d="M180,-160 L40,-20 L40,20 L180,160"/></g>`)],
  ["give-way-to-oncoming-traffic", circleMandatory(`<g fill="${WHITE}"><rect x="-160" y="-30" width="130" height="60"/></g><g fill="${RED}"><rect x="30" y="-30" width="130" height="60"/></g>`)],
  ["kangaroo-crossing", triangleWarning(P.kangaroo)],
  ["moose-crossing", triangleWarning(P.moose)],
  ["avalanche-zone", triangleWarning(P.avalanche)],
  ["falling-ice", triangleWarning(P.icicle)],
  ["ford", triangleWarning(P.water)],
  ["loose-gravel", triangleWarning(P.gravel)],
  ["low-flying-aircraft", triangleWarning(P.plane2)],
  ["zebra-crossing", wrap(`<rect x="60" y="140" width="580" height="420" rx="24" fill="${WHITE}" stroke="${BLACK}" stroke-width="6"/>
    <rect x="110" y="360" width="60" height="160" fill="${BLACK}"/>
    <rect x="210" y="360" width="60" height="160" fill="${BLACK}"/>
    <rect x="310" y="360" width="60" height="160" fill="${BLACK}"/>
    <rect x="410" y="360" width="60" height="160" fill="${BLACK}"/>
    <rect x="510" y="360" width="60" height="160" fill="${BLACK}"/>
    <g fill="${BLACK}" transform="translate(390,255) scale(0.5)"><circle cx="0" cy="-140" r="45"/><path d="M-55,-70 Q0,-95 55,-70 L75,60 L30,60 L20,180 L-20,180 L-35,40 L-60,180 L-95,180 L-75,20 Z"/></g>`)],
  ["toad-crossing", triangleWarning(P.toad)],
  ["concealed-entrance", triangleWarning(P.exclaim)],
  ["adverse-camber", triangleWarning(`<g fill="none" stroke="${BLACK}" stroke-width="24"><path d="M-170,90 Q-60,90 -60,-10 L170,-90"/></g>`)],
  ["wombat-crossing", triangleWarning(P.wombat)],
  ["cyclone-shelter", rectInfo(`<g fill="${WHITE}"><path d="M0,-170 Q80,-100 60,-20 Q120,20 60,90 Q100,150 20,170 Q-40,190 -80,130 Q-140,110 -110,40 Q-160,-10 -90,-40 Q-100,-120 0,-170 Z"/></g>`, BLUE)],
  ["quicksand", triangleWarning(P.quicksandIcon)],
  ["unmarked-crossroads", triangleWarning(P.crossroads)],
  ["crosswind", triangleWarning(P.wind)],
  ["camel-crossing", triangleWarning(P.camel)],
  ["beware-of-frogs", triangleWarning(P.frog)],
];

let ok = 0;
for (const [slug, svg] of items) {
  const out = `${DEST}/${slug}.png`;
  try {
    await sharp(Buffer.from(svg)).resize(700, 700).png().toFile(out);
    ok++;
  } catch (e) {
    console.log(`FAIL ${slug}: ${e.message}`);
  }
}
console.log(`Generated ${ok}/${items.length} road signs.`);
