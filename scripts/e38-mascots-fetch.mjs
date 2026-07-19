import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/mascots";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
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
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&iiurlwidth=1280`;
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

// mode "wiki" = try pageimages title first; "commons" = go straight to Commons search query
const TARGETS = {
  "phillie-phanatic": { mode: "wiki", title: "Phillie Phanatic" },
  "gritty": { mode: "wiki", title: "Gritty (mascot)" },
  "san-diego-chicken": { mode: "commons", query: "San Diego Chicken mascot" },
  "mr-met": { mode: "wiki", title: "Mr. Met" },
  "benny-the-bull": { mode: "wiki", title: "Benny the Bull" },
  "suns-gorilla": { mode: "commons", query: "Phoenix Suns Gorilla mascot" },
  "gunnersaurus": { mode: "wiki", title: "Gunnersaurus" },
  "rocky-nuggets": { mode: "commons", query: "Denver Nuggets Rocky mascot" },
  "youppi": { mode: "wiki", title: "Youppi!" },
  "uga": { mode: "wiki", title: "Uga (mascot)" },
  "bevo": { mode: "wiki", title: "Bevo (mascot)" },
  "ralphie": { mode: "wiki", title: "Ralphie (mascot)" },
  "chief-osceola": { mode: "wiki", title: "Osceola and Renegade" },
  "misha-bear": { mode: "wiki", title: "Misha (mascot)" },
  "sluggerrr": { mode: "commons", query: "Sluggerrr Kansas City Royals mascot" },
  "wally-green-monster": { mode: "commons", query: "Wally the Green Monster mascot Red Sox" },
  "fredbird": { mode: "commons", query: "Fredbird mascot St Louis Cardinals" },
  "zakumi": { mode: "wiki", title: "Zakumi" },

  "blue-colts": { mode: "commons", query: "Blue mascot Indianapolis Colts" },
  "kc-wolf": { mode: "commons", query: "K.C. Wolf mascot Kansas City Chiefs" },
  "burnie": { mode: "commons", query: "Burnie mascot Miami Heat" },
  "bernie-brewer": { mode: "commons", query: "Bernie Brewer mascot Milwaukee Brewers" },
  "clutch-the-bear": { mode: "commons", query: "Clutch the Bear mascot Houston Rockets" },
  "stuff-magic-dragon": { mode: "commons", query: "Stuff the Magic Dragon mascot Orlando" },
  "jaxson-de-ville": { mode: "commons", query: "Jaxson de Ville mascot Jacksonville Jaguars" },
  "lou-seal": { mode: "commons", query: "Lou Seal mascot San Francisco Giants" },
  "orbit": { mode: "commons", query: "Orbit mascot Houston Astros" },
  "brutus-buckeye": { mode: "wiki", title: "Brutus Buckeye" },
  "bucky-badger": { mode: "wiki", title: "Bucky Badger" },
  "big-al": { mode: "commons", query: "Big Al mascot Alabama elephant" },
  "mike-the-tiger": { mode: "commons", query: "Mike the Tiger costume mascot LSU" },
  "oregon-duck": { mode: "wiki", title: "The Oregon Duck" },
  "world-cup-willie": { mode: "wiki", title: "World Cup Willie" },
  "footix": { mode: "wiki", title: "Footix" },
  "zabivaka": { mode: "wiki", title: "Zabivaka" },
  "bing-dwen-dwen": { mode: "wiki", title: "Bing Dwen Dwen" },

  "fred-the-red": { mode: "commons", query: "Fred the Red mascot Manchester United" },
  "hugo-the-hornet": { mode: "commons", query: "Hugo the Hornet mascot Charlotte Hornets" },
  "slider": { mode: "commons", query: "Slider mascot Cleveland Guardians" },
  "dinger": { mode: "commons", query: "Dinger mascot Colorado Rockies" },
  "screech": { mode: "commons", query: "Screech mascot Washington Nationals" },
  "pirate-parrot": { mode: "wiki", title: "Pirate Parrot" },
  "billy-the-marlin": { mode: "commons", query: "Billy the Marlin mascot" },
  "handsome-dan": { mode: "wiki", title: "Handsome Dan" },
  "testudo": { mode: "wiki", title: "Testudo (mascot)" },
  "reveille": { mode: "wiki", title: "Reveille (dog)" },
  "traveler": { mode: "commons", query: "Traveler mascot USC Trojan horse" },
  "sparky-sun-devil": { mode: "wiki", title: "Sparky the Sun Devil" },
  "cosmo-cougar": { mode: "wiki", title: "Cosmo the Cougar" },
  "otto-the-orange": { mode: "wiki", title: "Otto the Orange" },
  "stanford-tree": { mode: "wiki", title: "Stanford Tree" },
  "smokey": { mode: "wiki", title: "Smokey (mascot)" },
  "wild-wing": { mode: "commons", query: "Wild Wing mascot Anaheim Ducks" },
  "harvey-the-hound": { mode: "wiki", title: "Harvey the Hound" },

  "alfred-the-gorilla": { mode: "commons", query: "Alfred Gorilla mascot cricket Gloucestershire" },
  "moochu-singh": { mode: "commons", query: "Moochu Singh mascot Rajasthan Royals" },
  "hoog-lee": { mode: "commons", query: "Hoogly Kolkata Knight Riders mascot tiger" },
  "stumpy": { mode: "commons", query: "Stumpy mascot Cricket World Cup 2011 elephant" },
  "amik": { mode: "wiki", title: "Amik (mascot)" },
  "hodori": { mode: "wiki", title: "Hodori" },
  "sam-the-eagle": { mode: "wiki", title: "Sam the Olympic Eagle" },
  "quatchi": { mode: "wiki", title: "Quatchi" },
  "zampa-the-lion": { mode: "commons", query: "Zampa mascot Millwall lion" },
  "cyril-the-swan": { mode: "wiki", title: "Cyril the Swan" },
  "emma-dortmund": { mode: "commons", query: "Emma mascot Borussia Dortmund bee" },
  "moonchester": { mode: "commons", query: "Moonchester mascot Manchester City" },
  "skillzy": { mode: "commons", query: "Skillzy mascot UEFA Euro 2020" },
  "billy-the-badger": { mode: "commons", query: "Billy the Badger mascot Fulham" },
  "berni": { mode: "commons", query: "Berni mascot Bayern Munich bear" },
  "gully-the-seagull": { mode: "commons", query: "Gully mascot Brighton Hove Albion seagull" },
  "chirpy-cockerel": { mode: "commons", query: "Chirpy mascot Tottenham Hotspur cockerel" },
  "naranjito": { mode: "wiki", title: "Naranjito (mascot)" },
};

const report = [];
for (const [slug, cfg] of Object.entries(TARGETS)) {
  const dest = `${DEST}/${slug}.jpg`;
  console.log(`${slug} (${cfg.mode}: ${cfg.title || cfg.query})`);
  let url = null;
  let source = null;
  if (cfg.mode === "wiki") {
    url = await pageImage(cfg.title);
    if (url) { url = toThumbUrl(url); source = "pageimages"; }
    else {
      console.log("  pageimages failed, trying Commons search");
      const found = await commonsSearch(`${cfg.title} mascot`);
      if (found) { url = found.url; source = found.title; }
    }
  } else {
    const found = await commonsSearch(cfg.query);
    if (found) { url = found.url; source = found.title; }
  }
  if (!url) { console.log("  STILL MISSING"); report.push({ slug, cfg, status: "missing" }); await new Promise((r) => setTimeout(r, 600)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, cfg, url, status: "download-fail" }); await new Promise((r) => setTimeout(r, 600)); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 2000) { console.log("  file too small, skip"); report.push({ slug, cfg, url, status: "too-small" }); continue; }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug, cfg, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 600));
}

writeFileSync("out/e38-mascots-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
