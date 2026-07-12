import { LOGOS } from "../src/Quiz/logosData.js";
import { writeFileSync } from "node:fs";
const by = { easy: [], medium: [], hard: [], impossible: [] };
LOGOS.forEach((l) => by[l.level].push(l.name));
let o = "GUESS THE LOGO — 100 Brands (Episode 01)\nGuessSync · 4 levels x 25\n\n";
for (const lv of ["easy", "medium", "hard", "impossible"]) {
  o += "== " + lv.toUpperCase() + " (" + by[lv].length + ") ==\n" +
    by[lv].map((n, i) => (i + 1) + ". " + n).join("\n") + "\n\n";
}
writeFileSync("out/E01-logos-list.txt", o);
console.log("wrote", LOGOS.length, "logos");
