// ينزّل كليبات نطق عواصم E07 من ملف show_generations المحفوظ → public/sfx/cp-<iso>.wav
import { CAPITALS2 } from "../src/Quiz/capitals2Data.js";
import { readFileSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";

const files = process.argv.slice(2);
const norm = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const byCap = new Map(CAPITALS2.map((c) => [norm(c.capital), c.iso]));

await mkdir("public/sfx", { recursive: true });
let ok = 0;
const got = new Set();
const unmatched = [];
for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const data = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
  for (const it of data.items || []) {
    if (it.type !== "audio" || it.status !== "completed") continue;
    const p = (it.params && it.params.prompt) || "";
    const m = p.match(/^It's (.+)!$/);
    if (!m) continue;
    const iso = byCap.get(norm(m[1]));
    if (!iso) { unmatched.push(p); continue; }
    if (got.has(iso)) continue;
    const url = it.results && it.results.rawUrl;
    if (!url) continue;
    const res = await fetch(url);
    await writeFile(`public/sfx/cp-${iso}.wav`, Buffer.from(await res.arrayBuffer()));
    got.add(iso); ok++;
  }
}
console.log(`✅ downloaded ${ok} capital clips`);
const missing = CAPITALS2.filter((c) => !got.has(c.iso)).map((c) => `${c.iso}(${c.capital})`);
if (missing.length) console.log(`⏳ MISSING (${missing.length}): ${missing.join(", ")}`);
if (unmatched.length) console.log(`⚠️ unmatched: ${unmatched.join(" | ")}`);
