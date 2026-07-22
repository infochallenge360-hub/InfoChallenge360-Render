import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { PLANETS_SPACE_E40 } from "../src/Quiz/planetsSpaceE40Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/space";
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

// Route final image downloads through wsrv.nl (fetches from its own IP) — avoids the
// per-client rate limit on upload.wikimedia.org's raw file CDN hit during this batch.
// wsrv.nl's parser chokes on Wikimedia's /thumb/.../NNNpx-filename pattern, so convert
// back to the raw file URL and let wsrv.nl do its own resizing via &w=.
function toProxyUrl(url) {
  let target = url;
  const m = target.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/thumb\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)\/\d+px-[^/]+$/);
  if (m) target = `${m[1]}/${m[2]}/${m[3]}/${m[4]}`;
  const noProto = target.replace(/^https?:\/\//, "");
  return `https://wsrv.nl/?url=${noProto}&output=jpg&w=1400`;
}

async function downloadImage(url) {
  const r = await fetchWithRetry(toProxyUrl(url), 4);
  if (r && r.ok) return r;
  return fetchWithRetry(url); // fallback to direct if proxy fails
}

function toThumbUrl(url, width = 1400) {
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
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&iiurlwidth=1400`;
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

// Wikipedia article titles differing from item name (disambiguation, precision).
const WIKI_TITLE = {
  "space-shuttle": "Space Shuttle",
  iss: "International Space Station",
  hubble: "Hubble Space Telescope",
  "apollo-lm": "Apollo Lunar Module",
  "saturn-v": "Saturn V",
  jwst: "James Webb Space Telescope",
  "curiosity-rover": "Curiosity (rover)",
  "voyager-probe": "Voyager program",
  "eagle-nebula": "Eagle Nebula",
  "perseverance-rover": "Perseverance (rover)",
  "sputnik-1": "Sputnik 1",
  "cassini-probe": "Cassini–Huygens",
  "new-horizons-probe": "New Horizons",
  "philae-lander": "Philae (spacecraft)",
  "kepler-telescope": "Kepler space telescope",
  "parker-solar-probe": "Parker Solar Probe",
  "juno-probe": "Juno (spacecraft)",
  "chandra-observatory": "Chandra X-ray Observatory",
  "comet-67p": "67P/Churyumov–Gerasimenko",
  moon: "Moon",
  sun: "Sun",
  "milky-way": "Milky Way",
};

const report = [];
for (const item of PLANETS_SPACE_E40) {
  const dest = `${DEST}/${item.slug}.jpg`;
  console.log(`${item.slug}`);
  const title = WIKI_TITLE[item.slug] || item.name;
  let url = await pageImage(title);
  let source = "pageimages";
  if (!url) {
    console.log("  pageimages miss, trying Commons search");
    const found = await commonsSearch(`${item.name} ${item.category}`);
    if (found) { url = found.url; source = found.title; }
  } else {
    url = toThumbUrl(url);
  }
  if (!url) {
    console.log("  STILL MISSING");
    report.push({ slug: item.slug, name: item.name, status: "missing" });
    await new Promise((r) => setTimeout(r, 600));
    continue;
  }
  const r = await downloadImage(url);
  if (!r || !r.ok) {
    console.log("  download failed");
    report.push({ slug: item.slug, name: item.name, url, status: "download-fail" });
    await new Promise((res) => setTimeout(res, 600));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 2000) {
    console.log("  file too small, skip");
    report.push({ slug: item.slug, name: item.name, url, status: "too-small" });
    continue;
  }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug: item.slug, name: item.name, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 600));
}

writeFileSync("out/e40-space-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
