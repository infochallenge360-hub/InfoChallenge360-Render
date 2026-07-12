import { FLAGS } from "../src/Quiz/flagsData.js";
const issues = [];
const counts = {};
for (const f of FLAGS) counts[f.level] = (counts[f.level]||0)+1;
for (const lv of ["easy","medium","hard","impossible"]) if (counts[lv]!==25) issues.push(`level ${lv}=${counts[lv]||0} (need 25)`);
if (FLAGS.length!==100) issues.push(`total=${FLAGS.length}`);
const iso=new Set(), nm=new Set();
for (const f of FLAGS){ if(iso.has(f.iso)) issues.push(`dup iso ${f.iso}`); if(nm.has(f.name)) issues.push(`dup name ${f.name}`); iso.add(f.iso); nm.add(f.name); }
for (const f of FLAGS){ if(/isra/i.test(f.iso+f.name)) issues.push(`ISRAEL: ${f.name}`); if(!/^[a-z]{2}$/.test(f.iso)) issues.push(`bad iso ${f.iso} (${f.name})`); }
const arabic=/[؀-ۿ]/; for (const f of FLAGS) if(arabic.test(f.name)) issues.push(`Arabic: ${f.name}`);
console.log(`QA flags: ${FLAGS.length} items, levels ${JSON.stringify(counts)}`);
console.log(issues.length? "❌ "+issues.join(" | ") : "✅ structural PASS (counts, no dup, no Israel, valid iso, no Arabic)");
