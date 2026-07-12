// E09 «Guess the Country by Shape» — خرائط mapsicon (مجاني) · يعيد استخدام أصوات fl-<iso>.wav
// مصنّف بتميّز الشكل (إيطاليا/أستراليا سهل ← دول غامضة الشكل مستحيل). كل الدول عندها صوت جاهز.
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { FLAGS } from "../src/Quiz/flagsData.js";
import { FLAGS2 } from "../src/Quiz/flags2Data.js";
const NAME = new Map([...FLAGS, ...FLAGS2].map((f) => [f.iso, f.name]));

const POOL = {
  easy: ["us","it","jp","au","gb","in","br","fr","eg","ca","ru","cn","cl","es","mx","de","tr","se","no","kr","id","za","sa","gr","nz","pt","vn","th"],
  medium: ["ar","ir","iq","pl","ua","ph","my","cu","ng","ke","ma","pk","af","np","lk","ie","is","fi","nl","ve","co","pe","et","kz","mn","om","uy","ec"],
  hard: ["sd","ly","uz","tm","la","kh","bd","mm","bo","py","sn","ml","ne","td","ao","mz","zw","zm","bw","na","ug","tz","mg","gh","ci","cm","mr","gn"],
  impossible: ["cf","cg","cd","ga","bf","bj","tg","rw","mw","ls","gm","gw","dj","er","gq","tl","sr","gy","bz","tj","kg","sb","vu","cv","ss","so","pg","mv"],
};

await mkdir("public/maps", { recursive: true });
async function works(iso) {
  try {
    const r = await fetch(`https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${iso}/vector.svg`);
    const t = await r.text();
    if (r.ok && t.includes("<svg") && existsSync(`public/sfx/fl-${iso}.wav`)) {
      await writeFile(`public/maps/${iso}.svg`, t, "utf8"); return true;
    }
  } catch {}
  return false;
}
const final = [];
for (const level of ["easy", "medium", "hard", "impossible"]) {
  let kept = 0; const misses = [];
  for (const iso of POOL[level]) {
    if (kept >= 25) break;
    if (await works(iso)) { final.push({ iso, name: NAME.get(iso) || iso, level }); kept++; }
    else misses.push(iso);
  }
  console.log(`${level}: kept ${kept}/25` + (kept < 25 ? "  ⚠️ SHORT by " + (25 - kept) : "") + (misses.length ? `  (skip: ${misses.join(",")})` : ""));
}
console.log(`\nTOTAL ${final.length}/100`);
if (final.length === 100) {
  const body = final.map((c) => `  { iso: ${JSON.stringify(c.iso)}, name: ${JSON.stringify(c.name)}, level: ${JSON.stringify(c.level)} },`).join("\n");
  await writeFile("src/Quiz/shapes1Data.js", `// «Guess the Country by Shape» — GuessSync · E09 · 100 دولة · خرائط mapsicon · صوت fl-<iso>.wav جاهز\nexport const SHAPES1 = [\n${body}\n];\n`, "utf8");
  console.log("→ wrote src/Quiz/shapes1Data.js");
} else console.log("لم يكتمل 100 — نوسّع الحوض");
