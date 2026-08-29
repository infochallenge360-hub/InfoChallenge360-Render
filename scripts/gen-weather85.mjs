// Generates clean vector weather-symbol PNGs locally (no network) -> public/weather85/<slug>.png
// Mix of everyday forecast-app icons (easy/medium) and real WMO/synoptic meteorological
// chart symbols (hard/impossible), all in one consistent flat-icon visual style.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const DEST = "public/weather85";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const S = 700;
const SKY = "#4FA8E0";
const YELLOW = "#F5B900";
const GRAY = "#8B95A1";
const DGRAY = "#5B6570";
const BLUE = "#2D7DD2";
const DBLUE = "#1B4F8C";
const WHITE = "#ffffff";
const RED = "#D9333F";
const PURPLE = "#7E4F9E";
const ORANGE = "#E8742C";
const BLACK = "#232323";
const GREEN = "#3F9142";

const wrap = (inner) => `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const card = (inner, bg = "#EAF4FC") => wrap(`<rect width="${S}" height="${S}" rx="48" fill="${bg}"/><g transform="translate(350,350)">${inner}</g>`);

// ---- reusable pictogram fragments (centered on 0,0) ----
const sunRays = (cx = 0, cy = 0, r = 90, rays = 8) => {
  let s = "";
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * (r + 20), y1 = cy + Math.sin(a) * (r + 20);
    const x2 = cx + Math.cos(a) * (r + 70), y2 = cy + Math.sin(a) * (r + 70);
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${YELLOW}" stroke-width="22" stroke-linecap="round"/>`;
  }
  return s + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${YELLOW}"/>`;
};
const sun = () => sunRays();
const cloud = (fill = WHITE, stroke = GRAY, x = 0, y = 0, scale = 1) => `<g transform="translate(${x},${y}) scale(${scale})">
  <path d="M-160,40 Q-190,40 -190,0 Q-190,-40 -150,-45 Q-140,-90 -90,-90 Q-60,-120 -10,-100 Q30,-115 65,-85 Q110,-90 125,-50 Q170,-45 170,0 Q170,40 130,40 Z" fill="${fill}" stroke="${stroke}" stroke-width="12"/>
</g>`;
const raindrop = (x, y, s = 1, color = BLUE) => `<path transform="translate(${x},${y}) scale(${s})" d="M0,-40 Q28,5 28,28 Q28,52 0,52 Q-28,52 -28,28 Q-28,5 0,-40 Z" fill="${color}"/>`;
const snowflakeShape = (x, y, s = 1, color = WHITE) => `<g transform="translate(${x},${y}) scale(${s})" stroke="${color}" stroke-width="9" stroke-linecap="round">
  <line x1="0" y1="-34" x2="0" y2="34"/><line x1="-30" y1="-17" x2="30" y2="17"/><line x1="-30" y1="17" x2="30" y2="-17"/>
</g>`;
const lightningBolt = (x = 0, y = 0, s = 1, color = YELLOW) => `<polygon transform="translate(${x},${y}) scale(${s})" points="10,-70 -50,20 -5,20 -15,80 55,-15 5,-15" fill="${color}"/>`;
const windLine = (x, y, w, color = DGRAY, sw = 16) => `<path d="M${x},${y} Q${x + w * 0.6},${y - 22} ${x + w},${y}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/>`;
const funnel = (x = 0, y = -140, color = GRAY) => `<path transform="translate(${x},${y})" d="M-120,0 L120,0 L40,260 Q0,300 -40,260 Z" fill="${color}"/>`;
const thermo = (x = 0, y = 0, color = RED) => `<g transform="translate(${x},${y})"><rect x="-22" y="-160" width="44" height="220" rx="22" fill="${WHITE}" stroke="${DGRAY}" stroke-width="10"/><circle cx="0" cy="90" r="42" fill="${color}"/><rect x="-10" y="-120" width="20" height="200" rx="10" fill="${color}"/></g>`;
// front line with triangle spikes (cold front)
const frontLine = (spikes, colorA, colorB, alternate = false) => {
  let s = `<line x1="-220" y1="0" x2="220" y2="0" stroke="${colorA}" stroke-width="12"/>`;
  for (let i = 0; i < spikes; i++) {
    const x = -180 + i * (360 / (spikes - 1));
    if (alternate && i % 2 === 1) {
      s += `<circle cx="${x}" cy="-38" r="26" fill="${colorB}"/>`;
    } else {
      s += `<polygon points="${x - 26},0 ${x + 26},0 ${x},-52" fill="${colorA}"/>`;
    }
  }
  return s;
};
const semicircleFront = (n, color) => {
  let s = `<line x1="-220" y1="0" x2="220" y2="0" stroke="${color}" stroke-width="12"/>`;
  for (let i = 0; i < n; i++) {
    const x = -180 + i * (360 / (n - 1));
    s += `<path d="M${x - 30},0 A30,30 0 0,1 ${x + 30},0 Z" fill="${color}"/>`;
  }
  return s;
};
const letterBadge = (letter, color) => `<circle r="140" fill="${color}"/><text x="0" y="55" font-family="Arial,sans-serif" font-weight="900" font-size="180" fill="${WHITE}" text-anchor="middle">${letter}</text>`;
const spiral = (color) => {
  let d = "M0,0";
  let a = 0, r = 10;
  for (let i = 0; i < 60; i++) { a += 0.5; r += 3.2; d += ` L${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`; }
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="20" stroke-linecap="round"/>`;
};

const items = [
  ["sun", card(sun())],
  ["rain", card(`${cloud(WHITE, GRAY, 0, -80)}${raindrop(-70, 100)}${raindrop(0, 130)}${raindrop(70, 100)}`)],
  ["snow", card(`${cloud(WHITE, GRAY, 0, -90)}${snowflakeShape(-70, 110, 1.3, DGRAY)}${snowflakeShape(0, 150, 1.3, DGRAY)}${snowflakeShape(70, 110, 1.3, DGRAY)}`)],
  ["cloud", card(cloud(WHITE, GRAY, 0, -10, 1.3))],
  ["thunderstorm", card(`${cloud(DGRAY, DGRAY, 0, -90)}${lightningBolt(0, 100, 1.5)}`)],
  ["rainbow", card(`<path d="M-220,80 A220,220 0 0,1 220,80" fill="none" stroke="${RED}" stroke-width="26"/><path d="M-220,80 A220,220 0 0,1 220,80" fill="none" stroke="${ORANGE}" stroke-width="26" transform="translate(0,26)"/><path d="M-220,80 A220,220 0 0,1 220,80" fill="none" stroke="${YELLOW}" stroke-width="26" transform="translate(0,52)"/><path d="M-220,80 A220,220 0 0,1 220,80" fill="none" stroke="${GREEN}" stroke-width="26" transform="translate(0,78)"/><path d="M-220,80 A220,220 0 0,1 220,80" fill="none" stroke="${BLUE}" stroke-width="26" transform="translate(0,104)"/>`)],
  ["fog", card(`${[...Array(5)].map((_, i) => `<line x1="-190" y1="${-90 + i * 45}" x2="190" y2="${-90 + i * 45}" stroke="${GRAY}" stroke-width="24" stroke-linecap="round" stroke-dasharray="90 40"/>`).join("")}`)],
  ["windy", card(`${windLine(-190, -60, 320)}${windLine(-190, 20, 380)}${windLine(-190, 100, 260)}`)],
  ["partly-cloudy", card(`${sunRays(-60, -80, 70, 8)}${cloud(WHITE, GRAY, 40, 40, 1.1)}`)],
  ["hurricane", card(spiral(BLUE) + `<circle r="18" fill="${WHITE}" stroke="${BLUE}" stroke-width="8"/>`)],
  ["tornado", card(funnel() + `${cloud(DGRAY, DGRAY, 0, -190, 0.8)}`)],
  ["hail", card(`${cloud(DGRAY, DGRAY, 0, -100)}${[[-80, 90], [0, 120], [80, 90], [-40, 160], [40, 160]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="22" fill="${SKY}" stroke="${DBLUE}" stroke-width="6"/>`).join("")}`)],
  ["blizzard", card(`${windLine(-190, -100, 260)}${snowflakeShape(-60, 20, 1.4)}${snowflakeShape(60, 80, 1.4)}${snowflakeShape(-20, 150, 1.4)}${windLine(-190, 190, 220)}`)],
  ["lightning", card(lightningBolt(0, 0, 2.4))],
  ["drizzle", card(`${cloud(WHITE, GRAY, 0, -90)}${[...Array(6)].map((_, i) => `<line x1="${-120 + i * 48}" y1="${70 + (i % 2) * 30}" x2="${-135 + i * 48}" y2="${110 + (i % 2) * 30}" stroke="${BLUE}" stroke-width="10" stroke-linecap="round"/>`).join("")}`)],
  ["frost", card(`${snowflakeShape(0, 0, 2.6, DBLUE)}`)],
  ["heatwave", card(thermo(0, -10) + sunRays(140, -160, 46, 6))],
  ["overcast", card(`${cloud(GRAY, DGRAY, -60, -20, 1.05)}${cloud(DGRAY, DGRAY, 70, 30, 1.05)}`)],

  ["sleet", card(`${cloud(WHITE, GRAY, 0, -90)}${raindrop(-70, 110)}${snowflakeShape(0, 150, 1.1)}${raindrop(70, 110)}`)],
  ["sandstorm", card(`${[...Array(6)].map((_, i) => `<path d="M-200,${-100 + i * 40} Q-50,${-140 + i * 40} 200,${-100 + i * 40}" fill="none" stroke="${ORANGE}" stroke-width="18" stroke-linecap="round" opacity="${0.5 + i * 0.08}"/>`).join("")}`, "#F3E0C4")],
  ["aurora", card(`${[...Array(4)].map((_, i) => `<path d="M${-220 + i * 20},180 Q${-100 + i * 40},${-180 - i * 20} ${140 + i * 30},150" fill="none" stroke="${["#3FCB8E", "#2FA9CB", "#9B6FD6", "#3FCB8E"][i]}" stroke-width="26" stroke-linecap="round" opacity="0.85"/>`).join("")}`, "#0E1B33")],
  ["waterspout", card(funnel(0, -150, SKY) + `<path d="M-200,220 L200,220" stroke="${DBLUE}" stroke-width="20"/>` + cloud(DGRAY, DGRAY, 0, -190, 0.8))],
  ["dust-devil", card(`<path d="M-30,220 Q-70,140 -20,90 Q20,40 -10,-20 Q-30,-70 10,-140" fill="none" stroke="${ORANGE}" stroke-width="34" stroke-linecap="round"/>`, "#F3E0C4")],
  ["monsoon", card(`${cloud(DGRAY, DGRAY, 0, -100, 1.2)}${[...Array(8)].map((_, i) => raindrop(-160 + i * 46, 100 + (i % 2) * 40, 0.8)).join("")}`)],
  ["freezing-rain", card(`${cloud(WHITE, GRAY, 0, -90)}${raindrop(-60, 100)}${snowflakeShape(-60, 170, 0.8, DBLUE)}${raindrop(60, 100)}${snowflakeShape(60, 170, 0.8, DBLUE)}`)],
  ["whiteout", card(`${snowflakeShape(-90, -90, 1.1)}${snowflakeShape(90, -40, 1.1)}${snowflakeShape(-40, 60, 1.1)}${snowflakeShape(100, 130, 1.1)}${snowflakeShape(-120, 150, 1.1)}${snowflakeShape(20, -140, 1.1)}`, "#D7E4EE")],
  ["squall", card(`${windLine(-190, -80, 300, DGRAY, 20)}${cloud(DGRAY, DGRAY, 60, -20, 1.1)}${windLine(-190, 140, 260, DGRAY, 20)}`)],
  ["cold-front", card(frontLine(5, BLUE, BLUE))],
  ["warm-front", card(semicircleFront(5, RED))],
  ["high-pressure", card(letterBadge("H", BLUE))],
  ["low-pressure", card(letterBadge("L", RED))],
  ["smog", card(`${[...Array(5)].map((_, i) => `<rect x="-200" y="${-100 + i * 45}" width="${340 - (i % 2) * 60}" height="26" rx="13" fill="${DGRAY}" opacity="0.7"/>`).join("")}`, "#DDD9C8")],
  ["heat-lightning", card(lightningBolt(0, 0, 2.2, ORANGE) + `<circle r="230" fill="none" stroke="${ORANGE}" stroke-width="10" opacity="0.35"/>`)],
  ["ice-storm", card(`${[...Array(5)].map((_, i) => `<line x1="${-160 + i * 80}" y1="-140" x2="${-160 + i * 80}" y2="140" stroke="${SKY}" stroke-width="18" stroke-linecap="round"/>`).join("")}${cloud(WHITE, GRAY, 0, -180, 0.9)}`)],
  ["wind-chill", card(`${windLine(-190, -30, 300, SKY)}${snowflakeShape(120, 60, 1.2, DBLUE)}`)],
  ["humidity", card(`${raindrop(0, -20, 1.8, SKY)}<text x="0" y="180" font-family="Arial" font-weight="900" font-size="70" fill="${DBLUE}" text-anchor="middle">%</text>`)],

  ["occluded-front", card(frontLine(5, PURPLE, PURPLE, true))],
  ["stationary-front", card(`<line x1="-220" y1="0" x2="220" y2="0" stroke="${RED}" stroke-width="12"/>${[0, 1].map(i => `<polygon points="${-140 + i * 280 - 26},0 ${-140 + i * 280 + 26},0 ${-140 + i * 280},-52" fill="${BLUE}"/>`).join("")}${[0, 1].map(i => `<path d="M${20 + i * 200 - 30},0 A30,30 0 0,1 ${20 + i * 200 + 30},0 Z" fill="${RED}"/>`).join("")}`)],
  ["wind-barb", card(`<line x1="0" y1="-200" x2="0" y2="200" stroke="${DGRAY}" stroke-width="14"/><line x1="0" y1="-200" x2="120" y2="-160" stroke="${DGRAY}" stroke-width="14"/><line x1="0" y1="-140" x2="120" y2="-100" stroke="${DGRAY}" stroke-width="14"/><line x1="0" y1="-80" x2="80" y2="-60" stroke="${DGRAY}" stroke-width="14"/>`)],
  ["isobar", card(`${[0, 1, 2, 3].map(i => `<ellipse cx="0" cy="0" rx="${100 + i * 55}" ry="${70 + i * 40}" fill="none" stroke="${DBLUE}" stroke-width="8"/>`).join("")}`)],
  ["trough", card(`<path d="M-220,-100 Q0,150 220,-100" fill="none" stroke="${BLUE}" stroke-width="16" stroke-dasharray="4 22" stroke-linecap="round"/>`)],
  ["ridge", card(`<path d="M-220,100 Q0,-150 220,100" fill="none" stroke="${RED}" stroke-width="16"/>`)],
  ["anticyclone", card(`${spiral(RED)}<text x="0" y="-190" font-family="Arial" font-weight="900" font-size="90" fill="${RED}" text-anchor="middle">H</text>`)],
  ["cyclone-spiral", card(spiral(BLUE) + `<text x="0" y="-190" font-family="Arial" font-weight="900" font-size="90" fill="${BLUE}" text-anchor="middle">L</text>`)],
  ["barometric-pressure", card(`<circle r="180" fill="${WHITE}" stroke="${DGRAY}" stroke-width="16"/><line x1="0" y1="0" x2="90" y2="-100" stroke="${RED}" stroke-width="12" stroke-linecap="round"/><circle r="16" fill="${DGRAY}"/>${[0, 60, 120, 180, 240, 300].map(a => `<line x1="${Math.cos(a * Math.PI / 180) * 150}" y1="${Math.sin(a * Math.PI / 180) * 150}" x2="${Math.cos(a * Math.PI / 180) * 170}" y2="${Math.sin(a * Math.PI / 180) * 170}" stroke="${DGRAY}" stroke-width="8"/>`).join("")}`)],
  ["dew-point", card(raindrop(0, -20, 2.2, SKY) + `<text x="0" y="190" font-family="Arial" font-weight="900" font-size="70" fill="${DBLUE}" text-anchor="middle">°</text>`)],
  ["beaufort-scale", card(`${[0, 1, 2, 3, 4].map(i => `<line x1="${-200 + i * 100}" y1="140" x2="${-200 + i * 100}" y2="${140 - (i + 1) * 55}" stroke="${DGRAY}" stroke-width="30" stroke-linecap="round"/>`).join("")}`)],
  ["katabatic-wind", card(`<path d="M-150,-150 L150,150" stroke="${DGRAY}" stroke-width="10"/><polygon points="150,150 100,140 140,100" fill="${DGRAY}"/><path d="M-180,120 L120,-180" stroke="${GRAY}" stroke-width="10" opacity="0.5"/>` + `<polygon points="-160,120 -180,80 -140,90" fill="${GRAY}" opacity="0.5"/>`)],
  ["chinook-wind", card(`<polygon points="-40,140 60,-140 160,140" fill="${GRAY}"/>${windLine(60, -160, 260, ORANGE, 20)}${windLine(90, -90, 220, ORANGE, 20)}${windLine(120, -20, 180, ORANGE, 20)}`)],
  ["derecho", card(`${windLine(-190, -80, 380, DGRAY, 24)}${windLine(-190, 40, 380, DGRAY, 24)}${windLine(-190, 160, 380, DGRAY, 24)}${lightningBolt(120, -20, 1.1)}`)],
  ["haboob", card(`<path d="M-220,180 Q-100,-180 220,180 Z" fill="${ORANGE}" opacity="0.85"/>`, "#F3E0C4")],
  ["polar-vortex", card(spiral(SKY) + snowflakeShape(0, -200, 1, DBLUE))],

  ["metar-thunderstorm", card(`<circle r="200" fill="none" stroke="${BLACK}" stroke-width="14"/><text x="-30" y="55" font-family="Arial,sans-serif" font-weight="900" font-size="150" fill="${BLACK}" text-anchor="middle">TS</text>${lightningBolt(85, -60, 0.9, YELLOW)}`)],
  ["sky-cover-okta", card(`<circle r="150" fill="none" stroke="${DGRAY}" stroke-width="14"/><path d="M0,-150 A150,150 0 0,1 0,150 Z" fill="${DGRAY}"/>`)],
  ["sun-dog", card(`${sunRays(0, 0, 70, 8)}<circle cx="-180" cy="0" r="30" fill="${YELLOW}" opacity="0.8"/><circle cx="180" cy="0" r="30" fill="${YELLOW}" opacity="0.8"/><circle r="200" fill="none" stroke="${YELLOW}" stroke-width="8" opacity="0.5"/>`)],
  ["mammatus", card(`<path d="M-220,-60 L220,-60 Z" stroke="none"/><path d="M-220,-40 Q-180,60 -140,-40 Q-100,70 -60,-40 Q-20,80 20,-40 Q60,70 100,-40 Q140,60 180,-40 Q210,-45 220,-60 L-220,-60 Z" fill="${DGRAY}"/>`)],
  ["anvil-cloud", card(`<path d="M-40,80 Q-140,80 -140,10 Q-140,-40 -70,-45 Q-60,-100 30,-90 Q60,-130 120,-100 L240,-130 Q260,-95 220,-80 L130,-55 Q150,20 60,50 Q40,85 -40,80 Z" fill="${DGRAY}"/>`)],
  ["virga", card(`${cloud(DGRAY, DGRAY, 0, -120, 1.1)}${[...Array(5)].map((_, i) => `<path d="M${-140 + i * 70},20 Q${-150 + i * 70},80 ${-135 + i * 70},130" fill="none" stroke="${BLUE}" stroke-width="10" stroke-linecap="round" opacity="0.7"/>`).join("")}`)],
  ["graupel", card(`${cloud(DGRAY, DGRAY, 0, -110)}${[[-80, 90], [0, 120], [80, 90], [-40, 160], [40, 160]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="${WHITE}" stroke="${GRAY}" stroke-width="6"/>`).join("")}`)],
  ["rime-ice", card(`<line x1="0" y1="-180" x2="0" y2="180" stroke="${DGRAY}" stroke-width="20"/>${[...Array(8)].map((_, i) => `<line x1="0" y1="${-160 + i * 45}" x2="${i % 2 === 0 ? 80 : -80}" y2="${-160 + i * 45 - 10}" stroke="${WHITE}" stroke-width="14" stroke-linecap="round"/>`).join("")}`, "#B9C7D2")],
  ["diamond-dust", card(`${[...Array(9)].map((_, i) => { const x = (i % 3 - 1) * 140, y = (Math.floor(i / 3) - 1) * 140; return `<polygon points="${x},${y - 18} ${x + 18},${y} ${x},${y + 18} ${x - 18},${y}" fill="${WHITE}" stroke="${SKY}" stroke-width="4"/>`; }).join("")}`, "#CFE4F2")],
  ["fire-whirl", card(`<path d="M-30,220 Q-80,140 -20,90 Q30,40 -10,-20 Q-40,-80 20,-140" fill="none" stroke="${ORANGE}" stroke-width="36" stroke-linecap="round"/><path d="M0,-160 Q30,-200 10,-240" fill="none" stroke="${RED}" stroke-width="24" stroke-linecap="round"/>`, "#3A1A10")],
  ["ball-lightning", card(`<circle r="90" fill="${YELLOW}"/><circle r="140" fill="none" stroke="${YELLOW}" stroke-width="10" opacity="0.5"/><circle r="190" fill="none" stroke="${YELLOW}" stroke-width="6" opacity="0.3"/>`, "#161A26")],
  ["sprite", card(`<path d="M0,-200 Q-30,-100 0,-40 Q30,20 -10,90 Q20,150 0,220" fill="none" stroke="${RED}" stroke-width="14" stroke-linecap="round"/><path d="M-40,-140 Q-60,-90 -30,-50" fill="none" stroke="${RED}" stroke-width="10" opacity="0.7"/><path d="M40,-100 Q60,-60 30,-10" fill="none" stroke="${RED}" stroke-width="10" opacity="0.7"/>`, "#0B0E1C")],
  ["noctilucent-clouds", card(`${[...Array(4)].map((_, i) => `<path d="M-220,${-60 + i * 30} Q-50,${-100 + i * 30} 220,${-60 + i * 30}" fill="none" stroke="${["#7EC8E3", "#A0D8EF", "#C6E9F5", "#7EC8E3"][i]}" stroke-width="14" stroke-linecap="round"/>`).join("")}`, "#0E1B33")],
  ["sea-smoke", card(`<line x1="-220" y1="120" x2="220" y2="120" stroke="${DBLUE}" stroke-width="16"/>${[...Array(5)].map((_, i) => `<path d="M${-160 + i * 80},110 Q${-180 + i * 80},20 ${-140 + i * 80},-60" fill="none" stroke="${WHITE}" stroke-width="18" stroke-linecap="round" opacity="0.8"/>`).join("")}`, "#B9D3E0")],
  ["thundersnow", card(`${cloud(DGRAY, DGRAY, 0, -100)}${lightningBolt(-50, 100, 1.1)}${snowflakeShape(70, 120, 1.1)}`)],
  ["st-elmos-fire", card(`<polygon points="-14,180 14,180 30,-160 -30,-160" fill="${DGRAY}"/><path d="M0,-160 Q-40,-220 0,-280 Q40,-220 0,-160" fill="${SKY}" opacity="0.9"/><path d="M0,-180 Q-70,-230 -30,-290" fill="none" stroke="${SKY}" stroke-width="10" opacity="0.7"/><path d="M0,-180 Q70,-230 30,-290" fill="none" stroke="${SKY}" stroke-width="10" opacity="0.7"/>`, "#0B0E1C")],
  ["snow-roller", card(`<ellipse cx="0" cy="80" rx="150" ry="60" fill="${WHITE}" stroke="${GRAY}" stroke-width="10"/><path d="M-150,80 A150,60 0 0,1 150,80" fill="none" stroke="${GRAY}" stroke-width="6" stroke-dasharray="16 14"/><path d="M-100,80 A100,40 0 0,1 100,80" fill="none" stroke="${GRAY}" stroke-width="6" stroke-dasharray="12 10"/>`, "#D7E4EE")],
  ["fallstreak-hole", card(`<ellipse cx="0" cy="0" rx="230" ry="140" fill="${DGRAY}"/><ellipse cx="0" cy="10" rx="90" ry="60" fill="#EAF4FC"/>${[...Array(4)].map((_, i) => `<line x1="${-40 + i * 26}" y1="50" x2="${-50 + i * 26}" y2="110" stroke="${WHITE}" stroke-width="8" opacity="0.7"/>`).join("")}`)],
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
console.log(`Generated ${ok}/${items.length} weather symbols.`);
