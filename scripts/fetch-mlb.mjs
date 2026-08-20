// Fetches MLB team badges from TheSportsDB -> public/mlb80/<slug>.png
// Usage: node scripts/fetch-mlb.mjs
import { writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { pathToFileURL } from "node:url";

const KEY = "123";
const DEST = "public/mlb80";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
const mod = await import(pathToFileURL("src/Quiz/mlbE80Data.js").href);
const teams = Object.values(mod).filter(Array.isArray)[0];

// الأتلتكس تخلت عن اسم المدينة رسميًا بعد الانتقال من أوكلاند (2025) — جرّب أسماء بديلة لقاعدة بيانات TheSportsDB
const NAME_ALTS = {
  athletics: ["Athletics", "Oakland Athletics", "Athletics Baseball Club"],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ambiguous = [], missing = [], ok = [];

for (const t of teams) {
  const out = `${DEST}/${t.slug}.png`;
  if (existsSync(out) && statSync(out).size > 2000) { ok.push(t.slug); continue; }
  const namesToTry = NAME_ALTS[t.slug] || [t.name];
  let found = false;
  for (const nameTry of namesToTry) {
    try {
      const url = `https://www.thesportsdb.com/api/v1/json/${KEY}/searchteams.php?t=${encodeURIComponent(nameTry)}`;
      const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 InfoChallenge360Bot" } });
      const j = await r.json();
      let matches = (j.teams || []).filter((x) => x.strLeague === "MLB" && x.strBadge);
      if (!matches.length) { await sleep(2200); continue; }
      if (matches.length > 1) ambiguous.push(`${t.slug} -> picked "${matches[0].strTeam}"; ${matches.length} MLB matches`);
      const badge = matches[0].strBadge;
      const img = await fetch(badge, { headers: { "User-Agent": "Mozilla/5.0 InfoChallenge360Bot" } });
      const buf = Buffer.from(await img.arrayBuffer());
      if (buf.length < 2000) { await sleep(2200); continue; }
      writeFileSync(out, buf);
      ok.push(t.slug);
      found = true;
      break;
    } catch (e) { /* try next name alt */ }
    await sleep(2200);
  }
  if (!found) missing.push(t.slug + " (no MLB result for any name variant)");
}

console.log(`\nMLB badges: ${ok.length}/${teams.length} fetched.`);
if (ambiguous.length) console.log(`\nAMBIGUOUS (verify in GATE1):\n  ` + ambiguous.join("\n  "));
if (missing.length) console.log(`\nMISSING (need fallback source):\n  ` + missing.join("\n  "));
