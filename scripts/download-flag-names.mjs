// ينزّل نطق أسماء الدول + مقدمة الأعلام → public/sfx/fl-<iso>.wav و vo-intro-flag.wav
import { FLAGS } from "../src/Quiz/flagsData.js";
import { readFileSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";

const file = process.argv[2];
const raw = readFileSync(file, "utf8");
const data = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
const items = data.items || [];
const map = new Map(FLAGS.map((f) => [f.name.toLowerCase().replace(/[^a-z0-9]/g, ""), f.iso]));

await mkdir("public/sfx", { recursive: true });
let ok = 0, intro = false;
const got = new Set();
for (const it of items) {
  if (it.type !== "audio" || it.status !== "completed") continue;
  const p = (it.params && it.params.prompt) || "";
  const url = it.results && it.results.rawUrl;
  if (!url) continue;
  if (/^Guess the flag/i.test(p)) {
    await writeFile("public/sfx/vo-intro-flag.wav", Buffer.from(await (await fetch(url)).arrayBuffer()));
    intro = true; continue;
  }
  const m = p.match(/^It's (.+)!$/);
  if (!m) continue;
  const key = m[1].toLowerCase().replace(/^the /, "").replace(/[^a-z0-9]/g, "");
  const iso = map.get(key);
  if (!iso || got.has(iso)) continue;
  await writeFile(`public/sfx/fl-${iso}.wav`, Buffer.from(await (await fetch(url)).arrayBuffer()));
  got.add(iso); ok++;
}
console.log(`✅ flag name clips ${ok}/100, intro=${intro}`);
const missing = FLAGS.map((f) => f.iso).filter((x) => !got.has(x));
if (missing.length) console.log(`⏳ MISSING (${missing.length}): ${missing.join(",")}`);
