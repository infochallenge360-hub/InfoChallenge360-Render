import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";

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

function toThumbUrl(url, width = 1280) {
  if (url.includes("/thumb/")) return url;
  const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/);
  if (!m) return url;
  const [, base, d1, d2, filename] = m;
  return `${base}/thumb/${d1}/${d2}/${filename}/${width}px-${filename}`;
}

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1400&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&iiurlwidth=1280`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  if (!j.query?.pages) return null;
  const pages = Object.values(j.query.pages);
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (info && (info.mime === "image/jpeg" || info.mime === "image/png")) {
      return { url: info.thumburl || info.url, title: p.title };
    }
  }
  return null;
}

// slug -> array of retry attempts, tried in order until one succeeds
const RETRY = {
  "burnie": [{ mode: "wiki", title: "Burnie (mascot)" }, { mode: "commons", query: "Burnie mascot Miami Heat" }],
  "clutch-the-bear": [{ mode: "wiki", title: "Clutch (mascot)" }, { mode: "commons", query: "Clutch mascot Houston Rockets bear" }],
  "lou-seal": [{ mode: "wiki", title: "Lou Seal" }, { mode: "commons", query: "Lou Seal Giants mascot seal" }],
  "big-al": [{ mode: "wiki", title: "Big Al (mascot)" }, { mode: "commons", query: "Big Al Alabama Crimson Tide elephant mascot" }, { mode: "commons", query: "Alabama football mascot elephant costume" }],
  "mike-the-tiger": [{ mode: "commons", query: "Mike VII LSU mascot" }, { mode: "commons", query: "LSU tiger mascot costume Mike" }],
  "footix": [{ mode: "wiki", title: "Footix" }, { mode: "commons", query: "Footix 1998 World Cup mascot rooster" }],
  "screech": [{ mode: "wiki", title: "Screech (mascot)" }, { mode: "commons", query: "Screech Washington Nationals mascot eagle" }],
  "traveler": [{ mode: "wiki", title: "Traveler (mascot)" }, { mode: "commons", query: "USC Trojan mascot horse Traveler" }, { mode: "commons", query: "USC Song Girls Trojan horse mascot" }],
  "otto-the-orange": [{ mode: "wiki", title: "Otto the Orange" }, { mode: "commons", query: "Otto the Orange Syracuse mascot" }],
  "harvey-the-hound": [{ mode: "wiki", title: "Harvey the Hound" }, { mode: "commons", query: "Harvey the Hound Calgary Flames mascot" }],
  "alfred-the-gorilla": [{ mode: "commons", query: "Alfred Gorilla mascot" }, { mode: "commons", query: "Gloucestershire cricket mascot gorilla" }],
  "moochu-singh": [{ mode: "commons", query: "Rajasthan Royals mascot lion" }, { mode: "commons", query: "IPL mascot Moochu" }],
  "hoog-lee": [{ mode: "commons", query: "Kolkata Knight Riders mascot" }, { mode: "commons", query: "KKR tiger mascot IPL" }],
  "stumpy": [{ mode: "commons", query: "Stumpy elephant Cricket World Cup" }, { mode: "commons", query: "2011 Cricket World Cup mascot" }],
  "hodori": [{ mode: "wiki", title: "Hodori" }, { mode: "commons", query: "Hodori 1988 Seoul Olympics mascot tiger" }],
  "quatchi": [{ mode: "wiki", title: "Quatchi" }, { mode: "commons", query: "Quatchi Vancouver 2010 Olympics mascot" }],
  "zampa-the-lion": [{ mode: "commons", query: "Zampa Millwall mascot lion" }, { mode: "commons", query: "Millwall FC mascot" }],
  "emma-dortmund": [{ mode: "commons", query: "Emma Borussia Dortmund mascot" }, { mode: "commons", query: "BVB mascot bee Emma" }],
  "skillzy": [{ mode: "commons", query: "Skillzy UEFA mascot" }, { mode: "commons", query: "Euro 2020 mascot Skillzy" }],
  "berni": [{ mode: "commons", query: "Berni FC Bayern mascot bear" }, { mode: "commons", query: "Bayern Munich mascot" }],
  "gully-the-seagull": [{ mode: "commons", query: "Brighton Hove Albion mascot Gully" }, { mode: "commons", query: "Brighton mascot seagull" }],
  "chirpy-cockerel": [{ mode: "commons", query: "Tottenham Hotspur mascot Chirpy" }, { mode: "commons", query: "Spurs mascot cockerel" }],
  "naranjito": [{ mode: "wiki", title: "Naranjito (mascot)" }, { mode: "commons", query: "Naranjito 1982 World Cup mascot orange" }],
};

const report = [];
for (const [slug, attempts] of Object.entries(RETRY)) {
  const dest = `${DEST}/${slug}.jpg`;
  console.log(slug);
  let url = null, source = null;
  for (const cfg of attempts) {
    if (cfg.mode === "wiki") {
      url = await pageImage(cfg.title);
      if (url) { url = toThumbUrl(url); source = "pageimages:" + cfg.title; break; }
    } else {
      const found = await commonsSearch(cfg.query);
      if (found) { url = found.url; source = found.title; break; }
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!url) { console.log("  STILL MISSING"); report.push({ slug, status: "missing" }); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, url, status: "download-fail" }); await new Promise((rr) => setTimeout(rr, 800)); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 2000) { console.log("  too small"); report.push({ slug, url, status: "too-small" }); continue; }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 800));
}

writeFileSync("out/e38-mascots-retry-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nRetry done. ${report.length - missing.length}/${report.length} recovered. Still missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
