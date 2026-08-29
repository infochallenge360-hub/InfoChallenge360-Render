// Fetches OpenMoji color SVGs for E84 "Guess the Emoji" and rasterizes to PNG cards.
// OpenMoji (CC-BY-SA 4.0) -- https://openmoji.org -- zero cost, no rate limiting, license-clean.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const DEST = "public/emoji84";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const mod = await import("../src/Quiz/emojiE84Data.js");
const items = mod.default;

function codepoints(str) {
  return [...str]
    .map((c) => c.codePointAt(0))
    .filter((c) => c !== 0xfe0f)
    .map((c) => c.toString(16).toUpperCase().padStart(4, "0"))
    .join("-");
}

const S = 700;
const WHITE = "#ffffff";

let ok = 0;
const missing = [];
for (const it of items) {
  const out = `${DEST}/${it.slug}.png`;
  const hex = codepoints(it.emoji);
  const url = `https://openmoji.org/data/color/svg/${hex}.svg`;
  try {
    const res = await fetch(url);
    if (!res.ok) { missing.push(`${it.slug} (${hex}): HTTP ${res.status}`); continue; }
    const svgText = await res.text();
    if (svgText.length < 200) { missing.push(`${it.slug} (${hex}): too small`); continue; }
    // Card: white rounded rect background + emoji centered, generous padding
    const card = `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${S}" height="${S}" rx="40" fill="${WHITE}"/>
      <g transform="translate(90,90) scale(7.2)">${svgText.replace(/<\?xml[^>]*\?>/, "").replace(/<svg[^>]*>/, "").replace(/<\/svg>/, "")}</g>
    </svg>`;
    await sharp(Buffer.from(card)).resize(S, S).png().toFile(out);
    ok++;
  } catch (e) {
    missing.push(`${it.slug}: ${e.message}`);
  }
}

console.log(`Generated ${ok}/${items.length} emoji cards.`);
if (missing.length) {
  console.log("MISSING:");
  missing.forEach((m) => console.log(" ", m));
}
