import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/fruits";
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

const ITEMS = [
  { slug: "avocado", title: "Avocado" },
  { slug: "coconut", title: "Coconut" },
  { slug: "papaya", title: "Papaya" },
  { slug: "soursop", title: "Soursop" },
  { slug: "peach", title: "Peach" },
  { slug: "nectarine", title: "Nectarine" },
  { slug: "tamarind", title: "Tamarind" },
  { slug: "jackfruit", title: "Jackfruit" },
  { slug: "grapefruit", title: "Grapefruit" },
  { slug: "honeydew-melon", title: "Honeydew (melon)" },
  { slug: "cantaloupe", title: "Cantaloupe" },
  { slug: "lime", title: "Lime (fruit)" },
  { slug: "raspberry", title: "Raspberry" },
  { slug: "watermelon", title: "Watermelon" },
];

const report = [];
for (const item of ITEMS) {
  console.log(item.slug);
  let url = await pageImage(item.title);
  let source = "pageimages:" + item.title;
  if (url) url = toThumbUrl(url);
  if (!url) {
    console.log("  STILL MISSING");
    report.push({ slug: item.slug, status: "missing" });
    await new Promise((r) => setTimeout(r, 500));
    continue;
  }
  const r = await downloadImage(url);
  if (!r || !r.ok) {
    console.log("  download failed:", url);
    report.push({ slug: item.slug, url, status: "download-fail" });
    await new Promise((res) => setTimeout(res, 600));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1500) {
    console.log("  file too small, skip");
    report.push({ slug: item.slug, status: "too-small" });
    continue;
  }
  writeFileSync(`${DEST}/${item.slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug: item.slug, url, source, status: "ok", size: buf.length });
  await new Promise((res) => setTimeout(res, 700));
}

writeFileSync("out/e43-fruits-refetch2-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
