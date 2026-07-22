import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/zodiac";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      if (r.ok) return r;
      await new Promise((res) => setTimeout(res, 2000));
    } catch (e) { await new Promise((res) => setTimeout(res, 3000)); }
  }
  return null;
}

function toProxyUrl(url) {
  let target = url;
  const m = target.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/thumb\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)\/\d+px-[^/]+$/);
  if (m) target = `${m[1]}/${m[2]}/${m[3]}/${m[4]}`;
  const noProto = target.replace(/^https?:\/\//, "");
  return `https://wsrv.nl/?url=${noProto}&output=jpg&w=1200`;
}

async function downloadImage(url) {
  const r = await fetchWithRetry(toProxyUrl(url), 3);
  if (r && r.ok) return r;
  return fetchWithRetry(url);
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

const ITEMS = [
  { slug: "seth", title: "Seth (mythology)", query: "Seth Egyptian god art" },
  { slug: "hapi", title: "Hapi (Nile god)", query: "Hapi Egyptian god Nile art" },
];

for (const item of ITEMS) {
  console.log(item.slug);
  let url = await pageImage(item.title);
  let source = "pageimages:" + item.title;
  if (!url) {
    console.log("  pageimages miss, trying Commons search");
    const found = await commonsSearch(item.query);
    if (found) { url = found.url; source = found.title; }
  }
  if (!url) {
    console.log("  STILL MISSING");
    continue;
  }
  const r = await downloadImage(url);
  if (!r) {
    console.log("  download failed:", url);
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1000) {
    console.log("  file too small, skip");
    continue;
  }
  writeFileSync(`${DEST}/${item.slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) via ${source} — ${url}`);
  await new Promise((res) => setTimeout(res, 800));
}
