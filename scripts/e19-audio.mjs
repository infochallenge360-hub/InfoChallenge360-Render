import { readFileSync, writeFileSync } from "node:fs";
import { BIRDS } from "../src/Quiz/birdsData.js";
const F = "C:\\Users\\User\\.claude\\projects\\C--Users-User-Desktop-MnBety------------------------------------------\\c0e38fb5-0bc4-44c0-869f-abfb33248485\\tool-results\\mcp-4db3d7f8-cc7c-49f8-badf-9588c9c1836a-show_generations-1783175585674.txt";
const data = JSON.parse(readFileSync(F, "utf8"));
const gens = [];
for (const it of data.items || []) {
  if (it.type && it.type !== "audio") continue;
  const prompt = (it.params && it.params.prompt) || "";
  let url = null, dur = null;
  const r = it.results; const arr = Array.isArray(r) ? r : [r];
  for (const x of arr) { if (x && (x.rawUrl || x.url)) { url = x.rawUrl || x.url; dur = x.durationSec; break; } }
  if (prompt && url) gens.push({ prompt, url, dur, used: false });
}
const birds = [...BIRDS].sort((a, b) => b.name.length - a.name.length);
const lines = [], trunc = [], miss = [];
for (const b of birds) {
  const needle = `It's the ${b.name}!`;
  const g = gens.find((x) => !x.used && x.prompt === needle);
  if (g) { g.used = true; lines.push(`bd-${b.slug}\t${g.url}`); const len = b.name.length, floor = 0.55 * (0.45 + 0.06 * len); if (g.dur != null && g.dur < floor) trunc.push(`${b.slug} dur=${g.dur} floor=${floor.toFixed(2)}`); }
  else { lines.push(`bd-${b.slug}\tMISSING`); miss.push(`${b.slug} | ${b.name}`); }
}
const order = BIRDS.map((b) => "bd-" + b.slug);
lines.sort((a, b) => order.indexOf(a.split("\t")[0]) - order.indexOf(b.split("\t")[0]));
writeFileSync("scripts/e19-audio-urls.tsv", lines.join("\n") + "\n", "utf8");
console.log(`matched ${birds.length - miss.length}/100, unused ${gens.filter((g) => !g.used).length}`);
if (miss.length) console.log("MISSING:\n" + miss.join("\n"));
if (trunc.length) console.log("TRUNCATED:\n" + trunc.join("\n"));
