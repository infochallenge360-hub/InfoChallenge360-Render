import { writeFileSync, existsSync, mkdirSync, statSync } from "node:fs";

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

async function infoboxImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=wikitext&section=0&page=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const wt = j.parse?.wikitext?.["*"] || "";
  const m = wt.match(/\|\s*(?:image|logo|badge)\s*=\s*([^\n|]+)/i);
  return m ? m[1].trim().replace(/^File:/i, "") : null;
}

async function localFileUrl(filename) {
  // try local (non-free) English Wikipedia file first, then fall back to Commons
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent("File:" + filename)}&prop=imageinfo&iiprop=url&iiurlwidth=800`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  const info = page.imageinfo?.[0];
  return info ? (info.thumburl || info.url) : null;
}

const TARGETS = {
  "real-madrid": "Real Madrid CF",
  "fc-barcelona": "FC Barcelona",
  "manchester-united": "Manchester United F.C.",
  "liverpool": "Liverpool F.C.",
  "manchester-city": "Manchester City F.C.",
  "chelsea": "Chelsea F.C.",
  "arsenal": "Arsenal F.C.",
  "bayern-munich": "FC Bayern Munich",
  "juventus": "Juventus FC",
  "paris-saint-germain": "Paris Saint-Germain F.C.",
  "ac-milan": "AC Milan",
  "inter-milan": "Inter Milan",
  "tottenham-hotspur": "Tottenham Hotspur F.C.",
  "borussia-dortmund": "Borussia Dortmund",
  "atletico-madrid": "Atletico Madrid",
  "as-roma": "AS Roma",
  "ajax": "AFC Ajax",
  "boca-juniors": "Boca Juniors",
  "river-plate": "Club Atletico River Plate",
  "napoli": "SSC Napoli",
  "newcastle-united": "Newcastle United F.C.",
  "west-ham-united": "West Ham United F.C.",
  "everton": "Everton F.C.",
  "leicester-city": "Leicester City F.C.",
  "sevilla": "Sevilla FC",
  "valencia": "Valencia CF",
  "porto": "FC Porto",
  "benfica": "S.L. Benfica",
  "marseille": "Olympique de Marseille",
  "lyon": "Olympique Lyonnais",
  "bayer-leverkusen": "Bayer 04 Leverkusen",
  "flamengo": "Clube de Regatas do Flamengo",
  "fenerbahce": "Fenerbahce SK",
  "galatasaray": "Galatasaray SK",
  "celtic": "Celtic F.C.",
  "schalke-04": "FC Schalke 04",
  "sporting-cp": "Sporting CP",
  "rb-leipzig": "RB Leipzig",
  "villarreal": "Villarreal CF",
  "athletic-bilbao": "Athletic Bilbao",
  "real-sociedad": "Real Sociedad",
  "monaco": "AS Monaco FC",
  "lille": "Lille OSC",
  "wolfsburg": "VfL Wolfsburg",
  "werder-bremen": "SV Werder Bremen",
  "feyenoord": "Feyenoord",
  "psv-eindhoven": "PSV Eindhoven",
  "rangers": "Rangers F.C.",
  "palmeiras": "Sociedade Esportiva Palmeiras",
  "corinthians": "Sport Club Corinthians Paulista",
  "santos": "Santos FC",
  "al-ahly": "Al Ahly SC",
  "club-america": "Club America",
  "al-hilal": "Al Hilal SFC",
  "anderlecht": "R.S.C. Anderlecht",
  "club-brugge": "Club Brugge KV",
  "red-bull-salzburg": "FC Red Bull Salzburg",
  "dynamo-kyiv": "FC Dynamo Kyiv",
  "shakhtar-donetsk": "FC Shakhtar Donetsk",
  "olympiacos": "Olympiacos FC",
  "panathinaikos": "Panathinaikos FC",
  "aik": "AIK Fotboll",
  "malmo-ff": "Malmo FF",
  "rosenborg": "Rosenborg BK",
  "legia-warsaw": "Legia Warsaw",
  "slavia-prague": "SK Slavia Prague",
  "sparta-prague": "AC Sparta Prague",
  "ferencvaros": "Ferencvarosi TC",
  "dinamo-zagreb": "GNK Dinamo Zagreb",
  "universidad-de-chile": "Universidad de Chile (football club)",
  "fc-copenhagen": "F.C. Copenhagen",
};

const report = [];
for (const [slug, title] of Object.entries(TARGETS)) {
  const dest = `${DEST}/${slug}.png`;
  if (existsSync(dest) && statSync(dest).size > 4000) { console.log(`${slug}: already have a good file, skip`); report.push({ slug, status: "kept-existing" }); continue; }
  console.log(`${slug} (${title})`);
  const filename = await infoboxImage(title);
  if (!filename) { console.log("  no infobox image found"); report.push({ slug, title, status: "no-infobox-image" }); await new Promise((r) => setTimeout(r, 400)); continue; }
  let url = await localFileUrl(filename);
  if (!url) { console.log(`  file "${filename}" not resolvable`); report.push({ slug, title, filename, status: "unresolvable" }); await new Promise((r) => setTimeout(r, 400)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, title, filename, url, status: "download-fail" }); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 500) { console.log("  file too small, skip"); report.push({ slug, title, filename, url, status: "too-small" }); continue; }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) ${filename}`);
  report.push({ slug, title, filename, url, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 500));
}

writeFileSync("out/e25-clubs-fetch3-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok" && r.status !== "kept-existing");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok/kept. Still missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
