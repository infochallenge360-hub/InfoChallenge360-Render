import { readFileSync, writeFileSync } from "node:fs";
import { CARS } from "../src/Quiz/carsData.js";
const F = "C:\\Users\\User\\.claude\\projects\\C--Users-User-Desktop-MnBety------------------------------------------\\c0e38fb5-0bc4-44c0-869f-abfb33248485\\tool-results\\mcp-4db3d7f8-cc7c-49f8-badf-9588c9c1836a-show_generations-1783165053232.txt";
const data = JSON.parse(readFileSync(F, "utf8"));

// build list of {prompt, url}
const gens = [];
for (const it of data.items || []) {
  if (it.type && it.type !== "image") continue;
  const prompt = (it.params && it.params.prompt) || "";
  let url = null;
  const r = it.results || [];
  const arr = Array.isArray(r) ? r : [r];
  for (const x of arr) { if (x && (x.rawUrl || x.url)) { url = x.rawUrl || x.url; break; } }
  if (prompt && url) gens.push({ prompt: prompt.toLowerCase(), url, used: false });
}

// alias: prompt keyword when the display name isn't a substring of the prompt
const ALIAS = { "vw-camper-van": "type 2 camper" };

// match longest name first to avoid "Volkswagen Golf" stealing the GTI generation
const cars = [...CARS].sort((a, b) => b.name.length - a.name.length);
const lines = [];
let ok = 0, miss = 0;
for (const c of cars) {
  const key = (ALIAS[c.slug] || c.name).toLowerCase();
  const g = gens.find((x) => !x.used && x.prompt.includes(key));
  if (g) { g.used = true; lines.push(`${c.slug}\t${g.url}`); ok++; }
  else { lines.push(`${c.slug}\tMISSING`); miss++; console.log("NO MATCH:", c.slug, "|", c.name); }
}
// keep original data order in the tsv
const order = CARS.map((c) => c.slug);
lines.sort((a, b) => order.indexOf(a.split("\t")[0]) - order.indexOf(b.split("\t")[0]));
writeFileSync("scripts/e17-urls.tsv", lines.join("\n") + "\n", "utf8");
console.log(`\nmatched ${ok}, missing ${miss}, generations in file ${gens.length}`);
console.log("SAMPLE:", lines.find((l) => !l.includes("MISSING")));
