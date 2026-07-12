// ينزّل كليبات نطق الأسماء من نتيجة show_generations المحفوظة → public/sfx/nm-<slug>.wav
import { LOGOS } from "../src/Quiz/logosData.js";
import { readFileSync } from "node:fs";
import { writeFile, mkdir } from "node:fs/promises";

const file = process.argv[2];
const raw = readFileSync(file, "utf8");
const data = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
const items = data.items || [];
const slugSet = new Set(LOGOS.map((l) => l.slug));
const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, "");

await mkdir("public/sfx", { recursive: true });
let ok = 0;
const got = new Set();
const unmatched = [];
for (const it of items) {
  if (it.type !== "audio" || it.status !== "completed") continue;
  const p = (it.params && it.params.prompt) || "";
  const m = p.match(/^It's (.+)!$/);
  if (!m) continue;
  const slug = norm(m[1]);
  if (!slugSet.has(slug)) { unmatched.push(`${p} → ${slug}`); continue; }
  if (got.has(slug)) continue;
  const url = it.results && it.results.rawUrl;
  if (!url) continue;
  const res = await fetch(url);
  await writeFile(`public/sfx/nm-${slug}.wav`, Buffer.from(await res.arrayBuffer()));
  got.add(slug); ok++;
}
console.log(`✅ downloaded ${ok} name clips`);
const missing = LOGOS.map((l) => l.slug).filter((x) => !got.has(x));
if (missing.length) console.log(`⏳ MISSING (${missing.length}): ${missing.join(", ")}`);
if (unmatched.length) console.log(`⚠️ unmatched: ${unmatched.join(" | ")}`);
