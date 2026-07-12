// يجلب شعارات الأندية من TheSportsDB → public/clubs/<slug>.png
// آمن أثناء الرندر (شبكة فقط). يفلتر Soccer، يحترم حد المعدّل، ويبلّغ عن الغامض/المفقود للتحقّق الشامل.
// الاستخدام: node scripts/fetch-clubs.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { pathToFileURL } from "node:url";

const KEY = "123";
const DEST = "public/clubs";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
const mod = await import(pathToFileURL("src/Quiz/clubsData.js").href);
const clubs = Object.values(mod).filter(Array.isArray).sort((a, b) => b.length - a.length)[0];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ambiguous = [], missing = [], ok = [];

for (const c of clubs) {
  const out = `${DEST}/${c.slug}.png`;
  if (existsSync(out) && statSync(out).size > 2000) { ok.push(c.slug); continue; }
  try {
    const url = `https://www.thesportsdb.com/api/v1/json/${KEY}/searchteams.php?t=${encodeURIComponent(c.name)}`;
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 GuessSync" } });
    const j = await r.json();
    let teams = (j.teams || []).filter((t) => t.strSport === "Soccer" && t.strBadge);
    if (!teams.length) { missing.push(c.slug + " (no soccer result)"); await sleep(2200); continue; }
    if (teams.length > 1) ambiguous.push(`${c.slug} → picked "${teams[0].strTeam}" (${teams[0].strCountry}); ${teams.length} soccer matches`);
    const badge = teams[0].strBadge;
    const img = await fetch(badge + "/medium", { headers: { "User-Agent": "Mozilla/5.0 GuessSync" } });
    const buf = Buffer.from(await img.arrayBuffer());
    if (buf.length < 2000) { missing.push(c.slug + " (badge too small)"); await sleep(2200); continue; }
    writeFileSync(out, buf);
    ok.push(c.slug);
  } catch (e) { missing.push(c.slug + " (" + e.message.slice(0, 30) + ")"); }
  await sleep(2200); // ~27 req/min < 30 limit
}

console.log(`\nclubs badges: ${ok.length}/${clubs.length} fetched.`);
if (ambiguous.length) console.log(`\n⚠️ AMBIGUOUS (verify these images in GATE 1 — name collisions):\n  ` + ambiguous.join("\n  "));
if (missing.length) console.log(`\n❌ MISSING (need fallback source):\n  ` + missing.join("\n  "));
writeFileSync("out/clubs-fetch-report.txt", `ok ${ok.length}/${clubs.length}\n\nAMBIGUOUS:\n${ambiguous.join("\n")}\n\nMISSING:\n${missing.join("\n")}\n`, "utf8");
