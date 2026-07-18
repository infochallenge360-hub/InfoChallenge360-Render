import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/clubs";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

async function wikidataSearch(name) {
  const api = `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&type=item&search=${encodeURIComponent(name)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  return j.search?.[0]?.id || null;
}

async function wikidataLogo(qid) {
  const api = `https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&entity=${qid}&property=P154`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const claim = j.claims?.P154?.[0];
  const filename = claim?.mainsnak?.datavalue?.value;
  if (!filename) return null;
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=800`;
}

// slug -> [search name, wikidata QID override if known]
const TARGETS = {
  "real-madrid": "Real Madrid CF",
  "manchester-united": "Manchester United F.C.",
  "liverpool": "Liverpool F.C.",
  "manchester-city": "Manchester City F.C.",
  "chelsea": "Chelsea F.C.",
  "arsenal": "Arsenal F.C.",
  "tottenham-hotspur": "Tottenham Hotspur F.C.",
  "atletico-madrid": "Atletico Madrid",
  "as-roma": "AS Roma",
  "newcastle-united": "Newcastle United F.C.",
  "west-ham-united": "West Ham United F.C.",
  "everton": "Everton F.C.",
  "leicester-city": "Leicester City F.C.",
  "sevilla": "Sevilla FC",
  "valencia": "Valencia CF",
  "porto": "FC Porto",
  "benfica": "S.L. Benfica",
  "lyon": "Olympique Lyonnais",
  "bayer-leverkusen": "Bayer 04 Leverkusen",
  "fenerbahce": "Fenerbahce SK",
  "celtic": "Celtic F.C.",
  "rb-leipzig": "RB Leipzig",
  "villarreal": "Villarreal CF",
  "athletic-bilbao": "Athletic Bilbao",
  "real-sociedad": "Real Sociedad",
  "monaco": "AS Monaco FC",
  "lille": "Lille OSC",
  "psv-eindhoven": "PSV Eindhoven",
  "rangers": "Rangers F.C.",
  "corinthians": "Sport Club Corinthians Paulista",
  "al-ahly": "Al Ahly SC",
  "club-america": "Club America",
  "anderlecht": "R.S.C. Anderlecht",
  "club-brugge": "Club Brugge KV",
  "red-bull-salzburg": "FC Red Bull Salzburg",
  "shakhtar-donetsk": "FC Shakhtar Donetsk",
  "olympiacos": "Olympiacos FC",
  "panathinaikos": "Panathinaikos FC",
  "aik": "AIK Fotboll",
  "fc-copenhagen": "F.C. Copenhagen",
};

const report = [];
for (const [slug, name] of Object.entries(TARGETS)) {
  console.log(`\n${slug} (${name})`);
  const qid = await wikidataSearch(name);
  if (!qid) { console.log("  no wikidata entity"); report.push({ slug, status: "no-qid" }); continue; }
  const url = await wikidataLogo(qid);
  if (!url) { console.log(`  no P154 logo on ${qid}`); report.push({ slug, qid, status: "no-logo" }); await new Promise((r) => setTimeout(r, 400)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, qid, url, status: "download-fail" }); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  const dest = `${DEST}/${slug}.png`;
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) ${qid}`);
  report.push({ slug, qid, url, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 500));
}

writeFileSync("out/e25-clubs-fetch2-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Still missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
