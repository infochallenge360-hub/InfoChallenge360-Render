// Generates "type specimen" card PNGs for the Guess the Font episode.
// Downloads each real Google Font (free, SIL OFL) TTF, then extracts glyph
// OUTLINES directly with opentype.js and draws them as SVG <path> data —
// this sidesteps OS/library font-name resolution entirely (sharp's librsvg
// and node-canvas both failed to load custom fonts by family name on this
// machine), so rendering is 100% self-contained and font-installation-free.
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import opentype from "opentype.js";
import { FONTS_E87 } from "../src/Quiz/fontsE87Data.js";

const DEST = "public/fonts87";
const CACHE = "out/_fonts-cache";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
if (!existsSync(CACHE)) mkdirSync(CACHE, { recursive: true });

const S = 700;
const BG = "#FAF7F0";
const FG = "#141414";

async function fetchFontUrl(name, weight) {
  const family = name.replace(/ /g, "+");
  // Deliberately no browser User-Agent: Google Fonts serves plain .ttf to
  // unrecognized clients (spoofing a modern Chrome UA gets woff2 instead,
  // which opentype.js can't decompress without an external lib).
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`).then((r) => r.text());
  const m = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.ttf)\)/);
  if (!m) throw new Error(`no ttf URL found for ${name} (${weight})`);
  return m[1];
}

async function downloadFont(slug, name, weight) {
  const cachePath = path.join(CACHE, `${slug}.ttf`);
  if (existsSync(cachePath)) return cachePath;
  const url = await fetchFontUrl(name, weight);
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  writeFileSync(cachePath, buf);
  return cachePath;
}

// Per-character glyph lookup (font.charToGlyph), NOT font.getPath/stringToGlyphs —
// the latter run opentype.js's Bidi/ccmp shaping pipeline, which throws on some
// real-world fonts (e.g. Space Mono) using GSUB lookup types it doesn't support.
// Plain Latin type-specimen text needs no ligature shaping, so skip it entirely.
function glyphsOf(font, text) {
  return [...text].map((ch) => font.charToGlyph(ch));
}

// Build the SVG path string by hand from the raw command list — opentype.js's
// own Path.toPathData() has a bug where its shorthand/reflection optimization
// emits a literal "NaN" for certain glyph+position combos (confirmed on
// Playfair Display's "x" at specific x-offsets), which silently truncates
// the whole <path> in any SVG renderer. Manual join avoids that path entirely.
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
function pathStr(path) {
  return path.commands.map(cmdToStr).join(" ");
}

function glyphWidth(font, text, size) {
  const scale = size / font.unitsPerEm;
  return glyphsOf(font, text).reduce((w, g) => w + g.advanceWidth * scale, 0);
}

function fitSize(font, text, targetWidth, startSize) {
  const width = glyphWidth(font, text, startSize);
  if (width <= 0) return startSize;
  return startSize * (targetWidth / width);
}

function pathFor(font, text, x, y, size) {
  const scale = size / font.unitsPerEm;
  let cx = x;
  let d = "";
  for (const glyph of glyphsOf(font, text)) {
    d += pathStr(glyph.getPath(cx, y, size)) + " ";
    cx += glyph.advanceWidth * scale;
  }
  return d;
}

async function renderCard(slug, font) {
  const big = "Aa";
  const small = "The Quick Fox";

  let bigSize = fitSize(font, big, 380, 300);
  let smallSize = fitSize(font, small, 580, 90);
  // cap the big sample so tall/overshoot fonts (script, display) don't blow past the card
  bigSize = Math.min(bigSize, 340);
  smallSize = Math.min(smallSize, 100);

  const bigWidth = glyphWidth(font, big, bigSize);
  const smallWidth = glyphWidth(font, small, smallSize);
  const bigX = (S - bigWidth) / 2;
  const smallX = (S - smallWidth) / 2;

  const bigBaselineY = 340;
  const smallBaselineY = 500;

  const bigPath = pathFor(font, big, bigX, bigBaselineY, bigSize);
  const smallPath = pathFor(font, small, smallX, smallBaselineY, smallSize);

  const svg = `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${S}" height="${S}" rx="40" fill="${BG}"/>
    <rect x="20" y="20" width="${S - 40}" height="${S - 40}" rx="28" fill="none" stroke="#00000018" stroke-width="2"/>
    <path d="${bigPath}" fill="${FG}"/>
    <path d="${smallPath}" fill="${FG}" opacity="0.78"/>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(path.join(DEST, `${slug}.png`));
}

const only = process.argv[2] ? process.argv.slice(2) : null;

for (const item of FONTS_E87) {
  if (only && !only.includes(item.slug)) continue;
  try {
    const fontPath = await downloadFont(item.slug, item.name, item.weight);
    const buf = readFileSync(fontPath);
    const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
    await renderCard(item.slug, font);
    console.log("ok", item.slug);
  } catch (e) {
    console.error("FAIL", item.slug, e.message);
  }
}
