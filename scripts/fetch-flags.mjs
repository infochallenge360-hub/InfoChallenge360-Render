import { FLAGS } from "../src/Quiz/flagsData.js";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("public/flags", { recursive: true });
let ok = 0; const fail = [];
for (const { iso } of FLAGS) {
  try {
    const res = await fetch(`https://flagcdn.com/${iso}.svg`);
    const t = await res.text();
    if (res.ok && t.includes("<svg")) { await writeFile(`public/flags/${iso}.svg`, t, "utf8"); ok++; }
    else fail.push(iso);
  } catch { fail.push(iso); }
}
console.log(`✅ flags ${ok}/${FLAGS.length}` + (fail.length ? ` FAILED: ${fail.join(",")}` : ""));
