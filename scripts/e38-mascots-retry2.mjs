import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/mascots";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 8) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 9000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 5000)); }
  }
  return null;
}

async function categoryFiles(category) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=${encodeURIComponent("Category:" + category)}&cmtype=file&cmlimit=15`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  return (j.query?.categorymembers || []).map((m) => m.title);
}

async function fileInfo(title) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|mime&iiurlwidth=1280`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  if (info && (info.mime === "image/jpeg" || info.mime === "image/png")) return info.thumburl || info.url;
  return null;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|mime&iiurlwidth=1280`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  if (!j.query?.pages) return [];
  return Object.values(j.query.pages)
    .map((p) => ({ title: p.title, info: p.imageinfo?.[0] }))
    .filter((p) => p.info && (p.info.mime === "image/jpeg" || p.info.mime === "image/png"))
    .map((p) => ({ title: p.title, url: p.info.thumburl || p.info.url }));
}

// try commons category first, then broader full-text search terms
const PLAN = {
  "burnie": { categories: ["Burnie (mascot)", "Miami Heat"], searches: ["Miami Heat mascot"] },
  "footix": { categories: ["Footix"], searches: ["Footix rooster 1998"] },
  "harvey-the-hound": { categories: ["Calgary Flames"], searches: ["Calgary Flames mascot dog"] },
  "alfred-the-gorilla": { categories: ["Gloucestershire County Cricket Club"], searches: ["cricket mascot gorilla costume"] },
  "moochu-singh": { categories: ["Rajasthan Royals"], searches: ["Indian Premier League mascot lion"] },
  "hoog-lee": { categories: ["Kolkata Knight Riders"], searches: ["Indian Premier League mascot tiger"] },
  "hodori": { categories: ["1988 Summer Olympics", "Hodori"], searches: ["Hodori tiger mascot Seoul"] },
  "quatchi": { categories: ["2010 Winter Olympics", "Quatchi"], searches: ["Quatchi sasquatch mascot Vancouver"] },
  "emma-dortmund": { categories: ["Borussia Dortmund"], searches: ["Bundesliga mascot bee"] },
  "skillzy": { categories: ["UEFA Euro 2020"], searches: ["Skillzy freestyle mascot"] },
  "gully-the-seagull": { categories: ["Brighton & Hove Albion F.C."], searches: ["Premier League mascot seagull costume"] },
  "naranjito": { categories: ["1982 FIFA World Cup", "Naranjito"], searches: ["Naranjito orange mascot Spain 1982"] },
};

const report = [];
for (const [slug, plan] of Object.entries(PLAN)) {
  console.log(slug);
  let url = null, source = null;
  for (const cat of plan.categories) {
    const files = await categoryFiles(cat);
    for (const f of files) {
      const u = await fileInfo(f);
      if (u) { url = u; source = "category:" + cat + " " + f; break; }
      await new Promise((r) => setTimeout(r, 300));
    }
    if (url) break;
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!url) {
    for (const q of plan.searches) {
      const results = await commonsSearch(q);
      if (results.length) { url = results[0].url; source = "search:" + q + " " + results[0].title; break; }
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  if (!url) { console.log("  STILL MISSING"); report.push({ slug, status: "missing" }); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, url, status: "download-fail" }); await new Promise((rr) => setTimeout(rr, 800)); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 2000) { console.log("  too small"); report.push({ slug, url, status: "too-small" }); continue; }
  writeFileSync(`${DEST}/${slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 800));
}

writeFileSync("out/e38-mascots-retry2-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nRetry2 done. ${report.length - missing.length}/${report.length} recovered. Still missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
