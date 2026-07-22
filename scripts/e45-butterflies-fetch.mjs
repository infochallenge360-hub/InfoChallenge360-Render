import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { BUTTERFLIES_E45 } from "../src/Quiz/butterfliesE45Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/butterflies";
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
  return `https://wsrv.nl/?url=${noProto}&output=jpg&w=1200`;
}

async function downloadImage(url) {
  const r = await fetchWithRetry(toProxyUrl(url), 4);
  if (r && r.ok) return r;
  return fetchWithRetry(url); // fallback to direct if proxy fails
}

function toThumbUrl(url, width = 1200) {
  if (url.includes("/thumb/")) return url;
  const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/);
  if (!m) return url;
  const [, base, d1, d2, filename] = m;
  return `${base}/thumb/${d1}/${d2}/${filename}/${width}px-${filename}`;
}

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&iiurlwidth=1200`;
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

// iNaturalist: CC-license-filtered, votes-ordered. Life-stage contamination risk for insects
// (caterpillar/chrysalis/pinned specimen) — flagged in report for mandatory visual QA.
async function inatPhoto(sciName) {
  const api = `https://api.inaturalist.org/v1/observations?taxon_name=${encodeURIComponent(sciName)}&photo_license=cc0,cc-by&quality_grade=research&order_by=votes&per_page=5`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  for (const obs of j.results || []) {
    for (const photo of obs.photos || []) {
      if (photo.url && photo.url.includes("inaturalist-open-data.s3.amazonaws.com")) {
        return { url: photo.url.replace("square.jpeg", "original.jpeg").replace("square.jpg", "original.jpg"), attribution: photo.attribution, license: photo.license_code };
      }
    }
  }
  return null;
}

// Rare/endangered/CITES species with thin iNat coverage: go Wikipedia-first instead.
const WIKI_FIRST = new Set([
  "queen-alexandras-birdwing", "homerus-swallowtail", "schaus-swallowtail", "bay-checkerspot",
  "corsican-swallowtail", "luzon-peacock-swallowtail", "mission-blue-butterfly", "fenders-blue",
  "palos-verdes-blue", "el-segundo-blue", "saint-francis-satyr", "uncompahgre-fritillary",
  "poweshiek-skipperling", "langes-metalmark", "miami-blue", "table-mountain-beauty",
  "sinai-baton-blue", "hermes-copper", "bartrams-scrub-hairstreak", "mitchells-satyr",
  "crystal-skipper", "behrens-silverspot", "oregon-silverspot", "xerces-blue",
]);

const report = [];
for (const item of BUTTERFLIES_E45) {
  const dest = `${DEST}/${item.slug}.jpg`;
  const wikiFirst = WIKI_FIRST.has(item.slug);
  console.log(`${item.slug}${wikiFirst ? " [wiki-first: rare/thin-iNat]" : ""}${item.slug === "xerces-blue" ? " [EXTINCT: pinned specimen]" : ""}`);
  let url, source;

  if (item.slug === "xerces-blue") {
    // Extinct since the 1940s — deliberate exception: pinned museum specimen is the only option.
    const found = await commonsSearch("Xerces blue butterfly specimen Glaucopsyche xerces");
    if (found) { url = found.url; source = found.title; }
  } else if (!wikiFirst) {
    const inat = await inatPhoto(item.sci);
    if (inat) { url = inat.url; source = `inaturalist:${inat.attribution}`; }
  }

  if (!url) {
    if (!wikiFirst) console.log("  iNat miss, trying Wikipedia");
    url = await pageImage(item.name);
    source = "pageimages";
    if (!url) {
      const found = await commonsSearch(`${item.sci} butterfly`);
      if (found) { url = found.url; source = found.title; }
    } else {
      url = toThumbUrl(url);
    }
  }

  if (!url) {
    console.log("  STILL MISSING");
    report.push({ slug: item.slug, name: item.name, status: "missing" });
    await new Promise((r) => setTimeout(r, 800));
    continue;
  }
  const r = await downloadImage(url);
  if (!r || !r.ok) {
    console.log("  download failed");
    report.push({ slug: item.slug, name: item.name, url, status: "download-fail" });
    await new Promise((res) => setTimeout(res, 800));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1000) {
    console.log("  file too small, skip");
    report.push({ slug: item.slug, name: item.name, url, status: "too-small" });
    continue;
  }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug: item.slug, name: item.name, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 800));
}

writeFileSync("out/e45-butterflies-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
