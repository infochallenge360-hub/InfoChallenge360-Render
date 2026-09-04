import { readFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import opentype from "opentype.js";
import { YEARS_E88 } from "../src/Quiz/yearsE88Data.js";

const CACHE = "out/_fonts-cache";
const fontPath = path.join(CACHE, "montserrat-bold.ttf");
const buf = readFileSync(fontPath);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

function glyphsOf(font, text) { return [...text].map((ch) => font.charToGlyph(ch)); }
function textWidth(font, text, size) {
  const scale = size / font.unitsPerEm;
  return glyphsOf(font, text).reduce((w, g) => w + g.advanceWidth * scale, 0);
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

const maxWidth = 560;
const S = 700;
let issues = [];
for (const item of YEARS_E88) {
  const { size, lines } = fitClue(font, item.clue, maxWidth, 5, 54, 34);
  const lineHeight = size * 1.42;
  const blockHeight = lines.length * lineHeight;
  const startY = (S - blockHeight) / 2 + size * 0.8;
  const topOfFirstLineCap = startY - size*0.8; // approx top edge of first line's ascender box
  const maxLineW = Math.max(...lines.map(l => textWidth(font, l, size)));
  const overflowH = maxLineW > maxWidth + 0.5;
  const overflowV = blockHeight > S - 40; // card has ~20px border inset each side visually, content area
  console.log(item.slug, "size="+size, "lines="+lines.length, "blockH="+blockHeight.toFixed(0), "startY="+startY.toFixed(0), overflowH?"WIDTH-OVERFLOW":"", overflowV?"HEIGHT-RISK":"");
  if (lines.length > 5) issues.push([item.slug, "MORE THAN 5 LINES", lines.length]);
  if (overflowH) issues.push([item.slug, "LINE WIDER THAN MAXWIDTH", maxLineW]);
  if (startY - size*1.0 < 90) issues.push([item.slug, "TOP MARGIN TIGHT/NEGATIVE", startY]);
  if (startY + (lines.length-1)*lineHeight + size*0.4 > S - 60) issues.push([item.slug, "BOTTOM MARGIN TIGHT", startY + (lines.length-1)*lineHeight]);
}
console.log("\n=== ISSUES ===");
issues.forEach(i => console.log(i));
console.log(issues.length ? `${issues.length} issues` : "no issues detected by wrap simulation");
