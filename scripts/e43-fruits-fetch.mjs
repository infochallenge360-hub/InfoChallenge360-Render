import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { FRUITS_E43 } from "../src/Quiz/fruitsE43Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/fruits";
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

// Returns up to N candidate PNG/JPG results (used for cross-section-risk fruits to pick "whole" one).
async function commonsSearchMulti(query, limit = 10) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  if (!j.query?.pages) return [];
  return Object.values(j.query.pages)
    .filter((p) => { const m = p.imageinfo?.[0]?.mime; return m === "image/jpeg" || m === "image/png"; })
    .map((p) => ({ url: p.imageinfo[0].thumburl || p.imageinfo[0].url, title: p.title }));
}

// Cross-section-risk fruits (per research): default lead image often shows the fruit halved.
// Force a Commons-search-first strategy with "whole" in the query, filtering out cut/sliced/halved titles.
const CROSS_SECTION_RISK = new Set([
  "watermelon", "kiwifruit", "coconut", "papaya", "pomegranate", "avocado", "dragon-fruit",
  "passion-fruit", "guava", "fig", "tamarind", "custard-apple", "jackfruit", "grapefruit",
  "mangosteen", "soursop", "prickly-pear", "cherimoya", "cupuacu", "star-fruit", "salak", "horned-melon",
]);
const BAD_TITLE_RE = /cut|sliced|halved|half|cross.?section|interior|inside|peeled|seeds?\b/i;

async function wholeFirst(item) {
  const results = await commonsSearchMulti(`${item.name} whole fruit`, 12);
  const clean = results.filter((r) => !BAD_TITLE_RE.test(r.title));
  if (clean.length) return { url: clean[0].url, title: clean[0].title };
  if (results.length) return { url: results[0].url, title: results[0].title }; // fallback, flagged in report
  return null;
}

const WIKI_TITLE = {
  cupuacu: "Cupuaçu", "buddhas-hand": "Buddha's hand",
};

const report = [];
for (const item of FRUITS_E43) {
  const dest = `${DEST}/${item.slug}.jpg`;
  console.log(`${item.slug}${CROSS_SECTION_RISK.has(item.slug) ? " [cross-section-risk]" : ""}`);
  let url, source;

  if (CROSS_SECTION_RISK.has(item.slug)) {
    const found = await wholeFirst(item);
    if (found) { url = found.url; source = found.title; }
  } else {
    const title = WIKI_TITLE[item.slug] || item.name;
    url = await pageImage(title);
    source = "pageimages";
    if (url) url = toThumbUrl(url);
  }

  if (!url) {
    console.log("  trying plain Commons search fallback");
    const results = await commonsSearchMulti(`${item.name} fruit`, 8);
    if (results.length) { url = results[0].url; source = results[0].title; }
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
  if (buf.length < 1500) {
    console.log("  file too small, skip");
    report.push({ slug: item.slug, name: item.name, url, status: "too-small" });
    continue;
  }
  writeFileSync(dest, buf);
  const flag = CROSS_SECTION_RISK.has(item.slug) ? " (cross-section-risk, VERIFY VISUALLY)" : "";
  console.log(`  OK (${buf.length} bytes) via ${source}${flag}`);
  report.push({ slug: item.slug, name: item.name, url, source, status: "ok", size: buf.length, crossSectionRisk: CROSS_SECTION_RISK.has(item.slug) });
  await new Promise((r) => setTimeout(r, 600));
}

writeFileSync("out/e43-fruits-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
