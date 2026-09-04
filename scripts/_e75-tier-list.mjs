const mod = await import("file://" + process.cwd().replace(/\\/g, "/") + "/src/Quiz/motorcyclesE75Data.js");
const items = mod.MOTORCYCLES_E75;
const tiers = { easy: [], medium: [], hard: [], impossible: [] };
for (const it of items) tiers[it.level].push(it.name);
for (const t of ["easy", "medium", "hard", "impossible"]) console.log(t.toUpperCase() + ":", tiers[t].join(", "));
console.log("counts", Object.fromEntries(Object.entries(tiers).map(([k, v]) => [k, v.length])));
