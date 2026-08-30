// Generates "opening line" clue card PNGs for the Guess the Book episode.
// Same technique as gen-years88.mjs (itself reusing the E87 opentype.js
// glyph-extraction approach): word-wrapped text drawn directly from a
// downloaded Google Font's glyph outlines, zero OS font install needed.
// See quiz-e87-fonts-technique memory for why this approach is the reliable
// one on this machine (sharp's native @font-face and node-canvas registerFont
// both failed).
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import opentype from "opentype.js";
import { BOOKS_E89 } from "../src/Quiz/booksE89Data.js";

const DEST = "public/books89";
const CACHE = "out/_fonts-cache";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
if (!existsSync(CACHE)) mkdirSync(CACHE, { recursive: true });

const S = 700;
const BG = "#FAF7F0";
const FG = "#141414";
const ACCENT = "#8B2E2E";

async function fetchFontUrl(name, weight) {
  const family = name.replace(/ /g, "+");
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`).then((r) => r.text());
  const m = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/);
  if (!m) throw new Error(`no ttf URL found for ${name} (${weight})`);
  return m[1];
}
async function downloadFont(cacheName, name, weight) {
  const cachePath = path.join(CACHE, `${cacheName}.ttf`);
  if (existsSync(cachePath)) return cachePath;
  const url = await fetchFontUrl(name, weight);
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  writeFileSync(cachePath, buf);
  return cachePath;
}

function glyphsOf(font, text) {
  return [...text].map((ch) => font.charToGlyph(ch));
}
function textWidth(font, text, size) {
  const scale = size / font.unitsPerEm;
  return glyphsOf(font, text).reduce((w, g) => w + g.advanceWidth * scale, 0);
}
function cmdToStr(c) {
  const r = (n) => Number(n.toFixed(2));
  switch (c.type) {
    case "M": return `M${r(c.x)} ${r(c.y)}`;
    case "L": return `L${r(c.x)} ${r(c.y)}`;
    case "C": return `C${r(c.x1)} ${r(c.y1)} ${r(c.x2)} ${r(c.y2)} ${r(c.x)} ${r(c.y)}`;
    case "Q": return `Q${r(c.x1)} ${r(c.y1)} ${r(c.x)} ${r(c.y)}`;
    case "Z": return "Z";
    default: return "";
  }
}
function pathFor(font, text, x, y, size) {
  const scale = size / font.unitsPerEm;
  let cx = x;
  let d = "";
  for (const glyph of glyphsOf(font, text)) {
    const p = glyph.getPath(cx, y, size);
    d += p.commands.map(cmdToStr).join(" ") + " ";
    cx += glyph.advanceWidth * scale;
  }
  return d;
}

function wrapAtSize(font, text, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (textWidth(font, test, size) > maxWidth && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}
function fitClue(font, text, maxWidth, maxLines, maxSize, minSize) {
  for (let size = maxSize; size >= minSize; size -= 2) {
    const lines = wrapAtSize(font, text, size, maxWidth);
    if (lines.length <= maxLines) return { size, lines };
  }
  return { size: minSize, lines: wrapAtSize(font, text, minSize, maxWidth) };
}

async function renderCard(slug, openingLine, font, quoteFont) {
  // Avoid a doubled-up "" look when the real opening line already starts
  // with quoted dialogue (e.g. Charlotte's Web) — don't add our own wrapper.
  const text = openingLine.startsWith('"') ? openingLine : `"${openingLine}"`;
  const maxWidth = 560;
  // opening lines run longer than year-clues, so allow up to 7 lines / smaller floor
  const { size, lines } = fitClue(font, text, maxWidth, 7, 46, 26);
  const lineHeight = size * 1.44;
  const blockHeight = lines.length * lineHeight;
  const startY = (S - blockHeight) / 2 + size * 0.8;

  let body = "";
  lines.forEach((line, i) => {
    const w = textWidth(font, line, size);
    const x = (S - w) / 2;
    const y = startY + i * lineHeight;
    body += pathFor(font, line, x, y, size);
  });

  const svg = `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${S}" height="${S}" rx="40" fill="${BG}"/>
    <rect x="20" y="20" width="${S - 40}" height="${S - 40}" rx="28" fill="none" stroke="#00000018" stroke-width="2"/>
    <rect x="70" y="76" width="64" height="8" rx="4" fill="${ACCENT}"/>
    <path d="${body}" fill="${FG}"/>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(path.join(DEST, `${slug}.png`));
}

const only = process.argv[2] ? process.argv.slice(2) : null;

const fontPath = await downloadFont("lora-semibold", "Lora", "600");
const buf = readFileSync(fontPath);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

for (const item of BOOKS_E89) {
  if (only && !only.includes(item.slug)) continue;
  try {
    await renderCard(item.slug, item.openingLine, font);
    console.log("ok", item.slug);
  } catch (e) {
    console.error("FAIL", item.slug, e.message);
  }
}
