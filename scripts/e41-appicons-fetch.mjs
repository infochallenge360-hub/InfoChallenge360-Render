import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { APP_ICONS_E41 } from "../src/Quiz/appIconsE41Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/app-icons";
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

function toThumbUrl(url, width = 1024) {
  if (url.includes("/thumb/")) return url;
  const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/);
  if (!m) return url;
  const [, base, d1, d2, filename] = m;
  return `${base}/thumb/${d1}/${d2}/${filename}/${width}px-${filename}`;
}

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1024&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
}

async function commonsSearch(query) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&iiurlwidth=1024`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  if (!j.query?.pages) return null;
  const pages = Object.values(j.query.pages);
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (info && (info.mime === "image/png" || info.mime === "image/svg+xml" || info.mime === "image/jpeg")) {
      return { url: info.thumburl || info.url, title: p.title };
    }
  }
  return null;
}

const WIKI_TITLE = {
  "candy-crush": "Candy Crush Saga",
  "booking-com": "Booking.com",
  bereal: "BeReal",
  headspace: "Headspace (company)",
  calm: "Calm (company)",
  myfitnesspal: "MyFitnessPal",
  feedly: "Feedly",
  overcast: "Overcast (podcasting)",
  "toggl-track": "Toggl",
  "x-twitter": "Twitter",
  "line-app": "LINE (software)",
  onepassword: "1Password",
  "vlc": "VLC media player",
};

const report = [];
for (const item of APP_ICONS_E41) {
  const dest = `${DEST}/${item.slug}.png`;
  console.log(`${item.slug}`);
  const title = WIKI_TITLE[item.slug] || item.name;
  let url = await pageImage(title);
  let source = "pageimages";
  if (!url) {
    console.log("  pageimages miss, trying Commons search");
    const found = await commonsSearch(`${item.name} app icon logo`);
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
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) {
    console.log("  download failed");
    report.push({ slug: item.slug, name: item.name, url, status: "download-fail" });
    await new Promise((res) => setTimeout(res, 600));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 500) {
    console.log("  file too small, skip");
    report.push({ slug: item.slug, name: item.name, url, status: "too-small" });
    continue;
  }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug: item.slug, name: item.name, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 600));
}

writeFileSync("out/e41-appicons-fetch-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
