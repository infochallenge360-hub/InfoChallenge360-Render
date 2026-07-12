import { readFileSync, writeFileSync } from "node:fs";
import { PAINTINGS } from "../src/Quiz/paintingsData.js";
const F = "C:\\Users\\User\\.claude\\projects\\C--Users-User-Desktop-MnBety------------------------------------------\\c0e38fb5-0bc4-44c0-869f-abfb33248485\\tool-results\\mcp-4db3d7f8-cc7c-49f8-badf-9588c9c1836a-show_generations-1783168426572.txt";
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

const data = JSON.parse(readFileSync(F, "utf8"));
const gens = [];
for (const it of data.items || []) {
  if (it.type && it.type !== "audio") continue;
  const prompt = (it.params && it.params.prompt) || "";
  let url = null, dur = null;
  const r = it.results;
  const arr = Array.isArray(r) ? r : [r];
  for (const x of arr) { if (x && (x.rawUrl || x.url)) { url = x.rawUrl || x.url; dur = x.durationSec; break; } }
  if (prompt && url) gens.push({ np: norm(prompt), url, dur, used: false });
}

const SUF = ["van gogh", "klimt", "monet", "bouguereau", "constable", "redon", "manet", "vermeer", "holbein", "fragonard", "giorgione", "millais", "rossetti", "kandinsky", "botticelli", "fuseli"];
function cands(item) {
  const t = item.title, a = item.artist, w = a.split(/\s+/);
  const base = new Set(), artistQ = new Set();
  base.add(norm(t));
  base.add(norm(t.replace(/\s+(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/i, "")));
  base.add(norm(t.replace(/\bVII\b/, "seven").replace(/\bVIII\b/, "eight")));
  const sufs = new Set([a, w[w.length - 1], w.slice(-2).join(" "), ...SUF]);
  const tvars = [t, t.replace(/\bVII\b/, "Seven").replace(/\bVIII\b/, "Eight")];
  for (const tv of tvars) for (const s of sufs) artistQ.add(norm(tv + " by " + s));
  return { base, artistQ };
}

const items = PAINTINGS.map((p) => ({ p, c: cands(p), done: false }));
// Pass 1: artist-qualified matches (resolves duplicate titles like The Birth of Venus)
for (const it of items) {
  const g = gens.find((x) => !x.used && it.c.artistQ.has(x.np));
  if (g) { g.used = true; it.done = true; it.g = g; }
}
// Pass 2: plain-title matches
for (const it of items) {
  if (it.done) continue;
  const g = gens.find((x) => !x.used && it.c.base.has(x.np));
  if (g) { g.used = true; it.done = true; it.g = g; }
}

const lines = [], trunc = [], miss = [];
for (const it of items) {
  if (it.g) {
    lines.push(`pt-${it.p.slug}\t${it.g.url}`);
    const len = it.p.title.length, floor = 0.55 * (0.45 + 0.06 * len);
    if (it.g.dur != null && it.g.dur < floor) trunc.push(`${it.p.slug} dur=${it.g.dur} floor=${floor.toFixed(2)}`);
  } else { lines.push(`pt-${it.p.slug}\tMISSING`); miss.push(`${it.p.slug} | ${it.p.title}`); }
}
writeFileSync("scripts/e18-audio-urls.tsv", lines.join("\n") + "\n", "utf8");
console.log(`matched ${items.filter((i) => i.g).length}/100, unused gens ${gens.filter((g) => !g.used).length}`);
if (miss.length) console.log("MISSING:\n" + miss.join("\n"));
if (trunc.length) console.log("TRUNCATED:\n" + trunc.join("\n"));
