import { readFileSync, writeFileSync } from "node:fs";
import { CARS } from "../src/Quiz/carsData.js";
const F = "C:\\Users\\User\\.claude\\projects\\C--Users-User-Desktop-MnBety------------------------------------------\\c0e38fb5-0bc4-44c0-869f-abfb33248485\\tool-results\\mcp-4db3d7f8-cc7c-49f8-badf-9588c9c1836a-show_generations-1783165568549.txt";
const data = JSON.parse(readFileSync(F, "utf8"));

const gens = [];
for (const it of data.items || []) {
  if (it.type && it.type !== "audio") continue;
  const prompt = (it.params && it.params.prompt) || "";
  let url = null, dur = null;
  const r = it.results || [];
  const arr = Array.isArray(r) ? r : [r];
  for (const x of arr) { if (x && (x.rawUrl || x.url)) { url = x.rawUrl || x.url; dur = x.durationSec; break; } }
  if (!url && it.results && it.results.rawUrl) { url = it.results.rawUrl; dur = it.results.durationSec; }
  if (prompt && url) gens.push({ prompt, url, dur, used: false });
}

// cars: match "It's the <name>!" longest-name first (Golf vs Golf GTI)
const cars = [...CARS].sort((a, b) => b.name.length - a.name.length);
const lines = [];
const trunc = [];
let ok = 0, miss = 0;
for (const c of cars) {
  const needle = `It's the ${c.name}!`;
  const g = gens.find((x) => !x.used && x.prompt === needle);
  if (g) {
    g.used = true;
    lines.push(`cm-${c.slug}\t${g.url}`);
    ok++;
    const len = c.name.length;
    const floor = 0.55 * (0.45 + 0.06 * len);
    if (g.dur != null && g.dur < floor) trunc.push(`${c.slug} dur=${g.dur} floor=${floor.toFixed(2)}`);
  } else { lines.push(`cm-${c.slug}\tMISSING`); miss++; console.log("NO MATCH:", c.slug, "|", c.name); }
}
// intro
const intro = gens.find((x) => !x.used && /guess the car/i.test(x.prompt));
if (intro) { intro.used = true; lines.push(`vo-intro-car\t${intro.url}`); }
else { lines.push(`vo-intro-car\tMISSING`); console.log("INTRO NOT IN PAGE (fetch by id)"); }

const order = CARS.map((c) => "cm-" + c.slug).concat(["vo-intro-car"]);
lines.sort((a, b) => order.indexOf(a.split("\t")[0]) - order.indexOf(b.split("\t")[0]));
writeFileSync("scripts/e17-audio-urls.tsv", lines.join("\n") + "\n", "utf8");
console.log(`\nmatched cars ${ok}, missing ${miss}, audio gens in file ${gens.length}`);
console.log("TRUNCATED (regenerate):", trunc.length ? trunc.join(" | ") : "none");
