// يرندر ثامبنيل v2 لكل حلقة (E01-E20) من thumb-cfg.json ثم ينسخه لمجلد Drive (يستبدل القديم).
import { readFileSync, writeFileSync, existsSync, statSync, copyFileSync } from "node:fs";
import { execSync } from "node:child_process";

const CFG = JSON.parse(readFileSync("scripts/thumb-cfg.json", "utf8"));
const DRIVE = "G:/My Drive/GuessSync/02_Episodes";
const validImg = (p) => { if (!existsSync(p)) return false; const b = readFileSync(p); return (b[0] === 0xFF && b[1] === 0xD8) || (b[0] === 0x89 && b[1] === 0x50); };

let ok = 0, bad = [];
for (const c of CFG) {
  const props = { mode: c.mode, word: c.word, grid: c.grid, line1: "CAN YOU NAME ALL", number: "100", year: "2026", badge: "Only 1% get 100%" };
  const pf = `out/props-${c.ep}.json`;
  const out = `out/thumb-${c.ep}.png`;
  writeFileSync(pf, JSON.stringify(props));
  try {
    execSync(`npx remotion still ThumbFruitsV2 ${out} --frame=0 --props=${pf}`, { stdio: ["ignore", "ignore", "ignore"] });
    if (!validImg(out)) { bad.push(`${c.ep} (invalid img)`); console.log(`BAD ${c.ep}`); continue; }
    const dest = `${DRIVE}/${c.folder}/thumbnail/GuessSync-${c.ep}-thumb.png`;
    copyFileSync(out, dest);
    ok++;
    console.log(`OK ${c.ep} -> ${c.folder} (${Math.round(statSync(out).size / 1024)}KB)`);
  } catch (e) { bad.push(`${c.ep} (${String(e).slice(0, 60)})`); console.log(`ERR ${c.ep}`); }
}
console.log(`\nDONE ${ok}/${CFG.length} thumbnails` + (bad.length ? `  BAD: ${bad.join(", ")}` : "  (all good)"));
