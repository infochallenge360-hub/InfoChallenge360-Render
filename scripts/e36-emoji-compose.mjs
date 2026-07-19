// Downloads Twemoji PNGs (CC-BY 4.0, via npm package assets served on jsdelivr — stable, unchanging URL)
// and composites each movie's emoji clue into one PNG at public/emoji/<slug>.png.
// This is how E36 avoids using any movie poster/still — the "image" is purely an emoji combo.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import sharp from "sharp";
import twemoji from "twemoji";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/emoji";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const TWEMOJI_BASE = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/72x72";

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 5000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 2000)); }
  }
  return null;
}

const emojiCache = new Map();
async function getEmojiPng(emoji) {
  const code = twemoji.convert.toCodePoint(emoji);
  if (emojiCache.has(code)) return emojiCache.get(code);
  let r = await fetchWithRetry(`${TWEMOJI_BASE}/${code}.png`);
  // Twemoji's asset filenames sometimes drop the -fe0f variation selector suffix.
  if (!r || !r.ok) {
    const stripped = code.replace(/-fe0f$/, "");
    if (stripped !== code) r = await fetchWithRetry(`${TWEMOJI_BASE}/${stripped}.png`);
  }
  if (!r || !r.ok) {
    console.log(`  MISSING codepoint ${code} for "${emoji}"`);
    emojiCache.set(code, null);
    return null;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  emojiCache.set(code, buf);
  return buf;
}

const mod = await import("../src/Quiz/emojiMoviesE36Data.js");
const items = mod.EMOJI_MOVIES_E36;

const CELL = 340; // px per emoji glyph on the canvas
const PAD = 40;
const report = [];
for (const it of items) {
  const dest = `${DEST}/${it.slug}.png`;
  const pngs = [];
  for (const e of it.emoji) {
    const buf = await getEmojiPng(e);
    if (buf) pngs.push(buf);
    await new Promise((r) => setTimeout(r, 150));
  }
  if (pngs.length === 0) { console.log(`${it.slug}: NO EMOJI RESOLVED`); report.push({ slug: it.slug, status: "fail" }); continue; }

  const n = pngs.length;
  const width = PAD * 2 + CELL * n;
  const height = PAD * 2 + CELL;
  const composites = [];
  for (let i = 0; i < n; i++) {
    composites.push({ input: await sharp(pngs[i]).resize(CELL, CELL).toBuffer(), left: PAD + i * CELL, top: PAD });
  }
  const canvas = sharp({ create: { width, height, channels: 4, background: { r: 15, g: 23, b: 42, alpha: 1 } } });
  const buf = await canvas.composite(composites).png().toBuffer();
  writeFileSync(dest, buf);
  console.log(`${it.slug}: OK (${n} emoji, ${buf.length} bytes)`);
  report.push({ slug: it.slug, status: "ok", count: n });
}

writeFileSync("out/e36-emoji-compose-report.json", JSON.stringify(report, null, 2));
const fails = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - fails.length}/${report.length} ok. Failed: ${fails.map((f) => f.slug).join(", ") || "none"}`);
