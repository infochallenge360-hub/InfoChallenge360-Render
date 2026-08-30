// Generates "script sample" card PNGs for the Guess the Language episode.
// Unlike E87/E88/E89's opentype.js glyph-extraction technique (which only
// safely handles simple, non-joining scripts — Latin/Cyrillic/Greek/Hebrew/
// Hangul/Han/etc.), this episode needs CORRECT complex-script shaping
// (Arabic contextual letter-joining, Devanagari conjunct/vowel-sign
// reordering, and similar). opentype.js's built-in shaper throws on real
// fonts using GSUB lookup types it doesn't support (confirmed on both a
// Latin ligature feature in E87 and directly on Arabic here) — so instead
// this script drives a real headless Chromium (via puppeteer), which shapes
// text correctly using its native HarfBuzz engine, and screenshots the
// rendered card directly. No file-based HTML round-trip (avoids an early
// UTF-8-as-Latin-1 mojibake bug found during testing) — page.setContent()
// is fed the HTML string directly in memory.
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";
import { LANGUAGES_E90 } from "../src/Quiz/languagesE90Data.js";

const DEST = "public/languages90";
const CACHE = "out/_fonts-cache";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
if (!existsSync(CACHE)) mkdirSync(CACHE, { recursive: true });

const S = 700;
const BG = "#FAF7F0";
const FG = "#141414";
const ACCENT = "#2E6E8B";

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
  try {
    url = await fetchFontUrl(family, weight);
  } catch (e) {
    // many rare/historical Noto script fonts only ship a Regular (400) weight
    if (weight !== "400") url = await fetchFontUrl(family, "400");
    else throw e;
  }
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  writeFileSync(cachePath, buf);
  return cachePath;
}

function cardHtml(text, fontBase64, fontSize) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: "ScriptFont"; src: url(data:font/ttf;base64,${fontBase64}) format("truetype"); }
    html, body { margin: 0; padding: 0; background: ${BG}; }
    .card { width: ${S}px; height: ${S}px; background: ${BG}; border-radius: 40px; box-sizing: border-box; position: relative; }
    .inner { position: absolute; top: 20px; left: 20px; right: 20px; bottom: 20px; border: 2px solid rgba(0,0,0,0.09); border-radius: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .bar { position: absolute; top: 56px; left: 50px; width: 64px; height: 8px; background: ${ACCENT}; border-radius: 4px; }
    .txt { font-family: "ScriptFont", sans-serif; font-size: ${fontSize}px; color: ${FG}; text-align: center; padding: 0 40px; line-height: 1.35; white-space: nowrap; }
  </style></head>
  <body><div class="card"><div class="bar"></div><div class="inner"><div class="txt" id="txt">${text}</div></div></div></body></html>`;
}

// Auto-fit: start large and shrink (measured live in the browser) until the
// text element fits within the card's usable box — different scripts vary
// wildly in average glyph width (a 24-letter Elder Futhark abecedarium vs.
// a 2-character Chinese greeting), so a per-item guessed font-size is far
// less reliable than actually measuring the rendered box.
async function fitFontSize(page, maxWidth, maxHeight, startSize, minSize) {
  for (let size = startSize; size >= minSize; size -= 4) {
    await page.evaluate((s) => { document.getElementById("txt").style.fontSize = s + "px"; }, size);
    const box = await page.evaluate(() => {
      const el = document.getElementById("txt");
      const r = el.getBoundingClientRect();
      return { w: r.width, h: r.height };
    });
    if (box.w <= maxWidth && box.h <= maxHeight) return size;
  }
  return minSize;
}

const only = process.argv[2] ? process.argv.slice(2) : null;
const fontCache = new Map(); // googleFontFamily -> base64

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: S, height: S });

let ok = 0, fail = [];
for (const item of LANGUAGES_E90) {
  if (only && !only.includes(item.slug)) continue;
  try {
    if (!fontCache.has(item.googleFontFamily)) {
      const fontPath = await downloadFont(item.googleFontFamily, item.weight || "700");
      fontCache.set(item.googleFontFamily, readFileSync(fontPath).toString("base64"));
    }
    const fontBase64 = fontCache.get(item.googleFontFamily);
    const html = cardHtml(item.text, fontBase64, 140);
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready); // wait for the embedded @font-face to actually load
    await fitFontSize(page, 600, 260, 140, 24);
    const cardEl = await page.$(".card");
    await cardEl.screenshot({ path: path.join(DEST, `${item.slug}.png`) });
    console.log("ok", item.slug);
    ok++;
  } catch (e) {
    console.error("FAIL", item.slug, e.message);
    fail.push(item.slug);
  }
}
await browser.close();
console.log(`\n${ok}/${(only || LANGUAGES_E90).length} generated.` + (fail.length ? ` FAIL: ${fail.join(", ")}` : ""));
