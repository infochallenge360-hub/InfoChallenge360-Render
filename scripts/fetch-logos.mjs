// يحمّل شعارات Simple Icons (بالألوان الرسمية) إلى public/logos/<slug>.svg
// يبلّغ عن أي سلاق غير موجود عشان نصلّحه. المصدر: cdn.simpleicons.org
import { LOGOS } from "../src/Quiz/logosData.js";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("public/logos", { recursive: true });

const ok = [];
const fail = [];

for (const { slug } of LOGOS) {
  try {
    const res = await fetch(`https://cdn.simpleicons.org/${slug}`);
    const text = await res.text();
    if (res.ok && text.trimStart().startsWith("<svg")) {
      await writeFile(`public/logos/${slug}.svg`, text, "utf8");
      ok.push(slug);
    } else {
      fail.push(slug);
    }
  } catch (e) {
    fail.push(slug);
  }
}

console.log(`OK ${ok.length}/${LOGOS.length}`);
if (fail.length) console.log("FAILED:", fail.join(", "));
