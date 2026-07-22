import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { BUTTERFLIES_E45 } from "../src/Quiz/butterfliesE45Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/butterflies";
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

const report = [];
for (const item of BUTTERFLIES_E45) {
  if (item.slug === "xerces-blue" || item.slug === "san-bruno-elfin") {
    console.log(`${item.slug} [skip - already handled specially]`);
    continue;
  }
  console.log(item.slug);
  // Try common name first, then scientific name, favoring "(butterfly)" disambiguation.
  let url = await pageImage(item.name);
  let source = "pageimages:" + item.name;
  if (!url) {
    url = await pageImage(item.sci);
    source = "pageimages:" + item.sci;
  }
  if (!url) {
    console.log("  no Wikipedia pageimage found — leaving existing iNat image, needs manual check");
    report.push({ slug: item.slug, status: "no-wiki-image" });
    continue;
  }
  const r = await downloadImage(url);
  if (!r || !r.ok) {
    console.log("  download failed — leaving existing image");
    report.push({ slug: item.slug, url, status: "download-fail" });
    await new Promise((res) => setTimeout(res, 400));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1500) {
    console.log("  too small — leaving existing image");
    report.push({ slug: item.slug, url, status: "too-small" });
    continue;
  }
  writeFileSync(`${DEST}/${item.slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug: item.slug, url, source, status: "ok", size: buf.length });
  await new Promise((res) => setTimeout(res, 400));
}

writeFileSync("out/e45-butterflies-rebuild-report.json", JSON.stringify(report, null, 2));
const ok = report.filter((r) => r.status === "ok").length;
const bad = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${ok}/${report.length} rebuilt via Wikipedia. Needs manual check: ${bad.map((m) => m.slug).join(", ") || "none"}`);
