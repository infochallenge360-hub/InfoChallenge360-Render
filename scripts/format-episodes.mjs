import { readFileSync, writeFileSync } from "node:fs";

const SRC = process.argv[2];
const OUT = process.argv[3];
let raw = readFileSync(SRC, "utf8");

// extract JSON object
const s = raw.indexOf("{");
const e = raw.lastIndexOf("}");
let parsed;
try { parsed = JSON.parse(raw.slice(s, e + 1)); }
catch (err) { console.error("parse fail:", err.message); process.exit(1); }
const data = parsed.result || parsed;

const dec = (t) => String(t == null ? "" : t)
  .replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

const eps = data.episodes || [];
let o = "";
o += "════════════════════════════════════════════════════\n";
o += "     GUESSSYNC — بنك محتوى 50 حلقة (خطة نشر)\n";
o += "════════════════════════════════════════════════════\n\n";
o += `الإجمالي: ${data.total || eps.length} حلقة · مرتّبة بتنويع الفئات\n\n`;
o += "التوزيع حسب الفئة:\n";
for (const [k, v] of Object.entries(data.byCategory || {})) o += `  • ${dec(k)}: ${v}\n`;
o += "\n────────────────────────────────────────────────────\n\n";

for (const ep of eps) {
  o += `#${ep.epNum}  ${dec(ep.title)}\n`;
  o += `    الفئة: ${dec(ep.category)} · ${ep.itemCount} عنصر · عدّاد ${ep.timerSeconds}ث · ${dec(ep.rightsRisk)}\n`;
  o += `    المصدر: ${dec(ep.assetSource)}\n`;
  o += `    الخطّاف: ${dec(ep.hook)}\n`;
  if (ep.sampleItems && ep.sampleItems.length) o += `    أمثلة: ${ep.sampleItems.map(dec).join(", ")}\n`;
  if (ep.notes) o += `    ملاحظات: ${dec(ep.notes)}\n`;
  o += "\n";
}
writeFileSync(OUT, o);
console.log("wrote", eps.length, "episodes");

// quick summary to stdout
const cats = {};
for (const ep of eps) cats[dec(ep.category)] = (cats[dec(ep.category)] || 0) + 1;
console.log(JSON.stringify(cats));
