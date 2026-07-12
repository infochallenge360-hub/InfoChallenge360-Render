// ينزّل نطق أسماء E08 من ملف show_generations المحفوظ → public/sfx/nm-<slug>.wav (مطابقة بالاسم)
import { LOGOS4 } from "../src/Quiz/logos4Data.js";
import { readFileSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";

const files = process.argv.slice(2);
const norm = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const byName = new Map(LOGOS4.map((l) => [norm(l.name), l.slug]));

await mkdir("public/sfx", { recursive: true });
let ok = 0; const got = new Set(); const unmatched = [];
for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const data = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
  for (const it of data.items || []) {
    if (it.type !== "audio" || it.status !== "completed") continue;
    const m = ((it.params && it.params.prompt) || "").match(/^It's (.+)!$/);
    if (!m) continue;
    const slug = byName.get(norm(m[1]));
    if (!slug) { unmatched.push(m[1]); continue; }
    if (got.has(slug)) continue;
    const url = it.results && it.results.rawUrl;
    if (!url) continue;
    const res = await fetch(url);
    await writeFile(`public/sfx/nm-${slug}.wav`, Buffer.from(await res.arrayBuffer()));
    got.add(slug); ok++;
  }
}
console.log(`✅ downloaded ${ok} name clips`);
const missing = LOGOS4.filter((l) => !got.has(l.slug)).map((l) => `${l.slug}(${l.name})`);
if (missing.length) console.log(`⏳ MISSING (${missing.length}): ${missing.join(", ")}`);
if (unmatched.length) console.log(`⚠️ unmatched: ${unmatched.join(" | ")}`);
