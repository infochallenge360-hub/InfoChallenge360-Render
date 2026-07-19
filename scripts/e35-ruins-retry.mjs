import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/ruins";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 8000 * (i + 1))); continue; }
      return r;
    } catch (e) { await new Promise((res) => setTimeout(res, 4000)); }
  }
  return null;
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

// re-fetch the 11 "download failed" items (transient) + fix the mismatched agrigento image
const TARGETS = {
  "mahabalipuram": "Group of Monuments at Mahabalipuram",
  "sabratha": "Sabratha",
  "volubilis": "Volubilis",
  "cyrene": "Cyrene, Libya",
  "delos": "Delos",
  "chan-chan": "Chan Chan",
  "chaco-canyon": "Pueblo Bonito",
  "great-serpent-mound": "Serpent Mound",
  "loulan-ruins": "Loulan",
  "jiaohe-ruins": "Yarkhoto",
  "byblos": "Byblos",
  "agrigento-valley-of-temples": "Valley of the Temples", // re-fetch: prior run wrongly matched an unrelated India temple via Commons fallback
};

const report = [];
for (const [slug, title] of Object.entries(TARGETS)) {
  const dest = `${DEST}/${slug}.jpg`;
  console.log(`${slug} (${title})`);
  let url = await pageImage(title);
  let source = "pageimages";
  if (!url) {
    console.log("  pageimages failed, trying Commons search");
    const found = await commonsSearch(`${title} archaeological site`);
    if (found) { url = found.url; source = found.title; }
  }
  if (!url) { console.log("  STILL MISSING"); report.push({ slug, title, status: "missing" }); await new Promise((r) => setTimeout(r, 800)); continue; }
  const r = await fetchWithRetry(url);
  if (!r || !r.ok) { console.log("  download failed"); report.push({ slug, title, url, status: "download-fail" }); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 2000) { console.log("  file too small, skip"); report.push({ slug, title, url, status: "too-small" }); continue; }
  writeFileSync(dest, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug, title, url, source, status: "ok", size: buf.length });
  await new Promise((r) => setTimeout(r, 800));
}

writeFileSync("out/e35-ruins-retry-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
