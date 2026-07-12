// ينزّل كليبات نطق أسماء E05 من نتيجة show_generations المحفوظة → public/sfx/nm-<slug>.wav
import { LOGOS2 } from "../src/Quiz/logos2Data.js";
import { readFileSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";

const files = process.argv.slice(2); // يقبل عدة ملفات (صفحات show_generations)
const slugSet = new Set(LOGOS2.map((l) => l.slug));
const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
// أسماء منطوقة تختلف عن السلاق:
const ALIAS = {
  monsterenergy: "monster",
  kingston: "kingstontechnology",
  nodejs: "nodedotjs",
  vuejs: "vuedotjs",
  nextjs: "nextdotjs",
};

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
    let slug = norm(m[1]);
    if (ALIAS[slug]) slug = ALIAS[slug];
    if (!slugSet.has(slug)) { unmatched.push(`${p} → ${slug}`); continue; }
    if (got.has(slug)) continue;
    const url = it.results && it.results.rawUrl;
    if (!url) continue;
    const res = await fetch(url);
    await writeFile(`public/sfx/nm-${slug}.wav`, Buffer.from(await res.arrayBuffer()));
    got.add(slug); ok++;
  }
}
console.log(`✅ downloaded ${ok} name clips`);
const missing = LOGOS2.map((l) => l.slug).filter((x) => !got.has(x));
if (missing.length) console.log(`⏳ MISSING (${missing.length}): ${missing.join(", ")}`);
if (unmatched.length) console.log(`⚠️ unmatched: ${unmatched.join(" | ")}`);
