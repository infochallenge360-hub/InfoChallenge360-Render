// Fetches NBA team badges from TheSportsDB -> public/nba78/<slug>.png
// Usage: node scripts/fetch-nba.mjs
import { writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { pathToFileURL } from "node:url";

const KEY = "123";
const DEST = "public/nba78";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });
const mod = await import(pathToFileURL("src/Quiz/nbaE78Data.js").href);
const teams = Object.values(mod).filter(Array.isArray)[0];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ambiguous = [], missing = [], ok = [];

for (const t of teams) {
  const out = `${DEST}/${t.slug}.png`;
  if (existsSync(out) && statSync(out).size > 2000) { ok.push(t.slug); continue; }
  try {
    const url = `https://www.thesportsdb.com/api/v1/json/${KEY}/searchteams.php?t=${encodeURIComponent(t.name)}`;
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 InfoChallenge360Bot" } });
    const j = await r.json();
    let matches = (j.teams || []).filter((x) => x.strLeague === "NBA" && x.strBadge);
    if (!matches.length) { missing.push(t.slug + " (no NBA result)"); await sleep(2200); continue; }
    if (matches.length > 1) ambiguous.push(`${t.slug} -> picked "${matches[0].strTeam}"; ${matches.length} NBA matches`);
    const badge = matches[0].strBadge;
    const img = await fetch(badge, { headers: { "User-Agent": "Mozilla/5.0 InfoChallenge360Bot" } });
    const buf = Buffer.from(await img.arrayBuffer());
    if (buf.length < 2000) { missing.push(t.slug + " (badge too small)"); await sleep(2200); continue; }
    writeFileSync(out, buf);
    ok.push(t.slug);
  } catch (e) { missing.push(t.slug + " (" + e.message.slice(0, 30) + ")"); }
  await sleep(2200);
}

console.log(`\nNBA badges: ${ok.length}/${teams.length} fetched.`);
if (ambiguous.length) console.log(`\nAMBIGUOUS (verify in GATE1):\n  ` + ambiguous.join("\n  "));
if (missing.length) console.log(`\nMISSING (need fallback source):\n  ` + missing.join("\n  "));
