// ينزّل نطق العواصم + مقدمة → public/sfx/cp-<iso>.wav و vo-intro-capital.wav
import { CAPITALS } from "../src/Quiz/capitalsData.js";
import { readFileSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";

const norm = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const file = process.argv[2];
const raw = readFileSync(file, "utf8");
const data = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
const items = data.items || [];
const map = new Map(CAPITALS.map((c) => [norm(c.capital), c.iso]));

await mkdir("public/sfx", { recursive: true });
let ok = 0, intro = false;
const got = new Set();
for (const it of items) {
  if (it.type !== "audio" || it.status !== "completed") continue;
  const p = (it.params && it.params.prompt) || "";
  const url = it.results && it.results.rawUrl;
  if (!url) continue;
  if (/^Guess the capital/i.test(p)) {
    await writeFile("public/sfx/vo-intro-capital.wav", Buffer.from(await (await fetch(url)).arrayBuffer()));
    intro = true; continue;
  }
  const m = p.match(/^It's (.+)!$/);
  if (!m) continue;
  const iso = map.get(norm(m[1]));
  if (!iso || got.has(iso)) continue;
  await writeFile(`public/sfx/cp-${iso}.wav`, Buffer.from(await (await fetch(url)).arrayBuffer()));
  got.add(iso); ok++;
}
console.log(`✅ capital clips ${ok}/100, intro=${intro}`);
const missing = CAPITALS.map((c) => c.iso).filter((x) => !got.has(x));
if (missing.length) console.log(`⏳ MISSING (${missing.length}): ${missing.join(",")}`);
