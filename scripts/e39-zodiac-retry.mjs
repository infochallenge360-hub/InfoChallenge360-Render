import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/zodiac";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 10000 * (i + 1))); continue; }
      if (r.ok) return r;
      await new Promise((res) => setTimeout(res, 3000));
    } catch (e) { await new Promise((res) => setTimeout(res, 4000)); }
  }
  return null;
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
  if (!r) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return page?.thumbnail?.source || null;
}

async function commonsSearch(query, excludeRe) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&iiurlwidth=1200`;
  const r = await fetchWithRetry(api);
  if (!r) return null;
  const j = await r.json();
  if (!j.query?.pages) return null;
  const pages = Object.values(j.query.pages);
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (info && (info.mime === "image/jpeg" || info.mime === "image/png")) {
      if (excludeRe && excludeRe.test(p.title)) continue;
      return { url: info.thumburl || info.url, title: p.title };
    }
  }
  return null;
}

// Direct re-fetches for items whose URL was fine last time (transient download failure).
const DIRECT_RETRY = {
  oak: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Quercus_robur.jpg/1200px-Quercus_robur.jpg",
  willow: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Salix_alba_Morton.jpg/1200px-Salix_alba_Morton.jpg",
};

// Chinese zodiac animals: fetch the plain real-animal photo, not the "(zodiac)" article
// (which had no pageimage and fell back to unrelated French shadow-puppet illustrations).
const REAL_ANIMAL_TITLE = { horse: "Horse", pig: "Domestic pig", rooster: "Rooster" };

// Items needing a fresh, better-targeted Commons search this pass.
const RESEARCH = {
  "amun-ra": "Amun Ra Egyptian god relief",
  vine: "Vitis vinifera vine plant",
  ash: "Fraxinus excelsior tree",
  reed: "Phragmites australis reed plant",
  ocelotl: "Ocelotl Aztec codex day sign",
  ehecatl: "Ehecatl Aztec codex",
  ollin: "Ollin Aztec glyph codex",
  cipactli: "Cipactli Aztec codex",
  miquiztli: "Miquiztli Aztec codex",
  tochtli: "Tochtli Aztec codex",
  atl: "Atl Aztec glyph codex",
  itzcuintli: "Itzcuintli Aztec codex",
  ozomatli: "Ozomatli Aztec codex",
  mazatl: "Mazatl Aztec codex",
  tecpatl: "Tecpatl Aztec codex",
  quiahuitl: "Quiahuitl Aztec codex",
  calli: "Calli Aztec codex",
};

const report = [];

for (const [slug, url] of Object.entries(DIRECT_RETRY)) {
  console.log(`${slug} [direct-retry]`);
  const r = await fetchWithRetry(url);
  if (r) {
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 1000) {
      writeFileSync(`${DEST}/${slug}.jpg`, buf);
      console.log(`  OK (${buf.length} bytes)`);
      report.push({ slug, url, status: "ok", size: buf.length });
      await new Promise((r2) => setTimeout(r2, 1000));
      continue;
    }
  }
  console.log("  still failed");
  report.push({ slug, url, status: "fail" });
  await new Promise((r2) => setTimeout(r2, 1000));
}

for (const [slug, title] of Object.entries(REAL_ANIMAL_TITLE)) {
  console.log(`${slug} [real-animal: ${title}]`);
  let url = await pageImage(title);
  let source = "pageimages";
  if (url) url = toThumbUrl(url);
  if (!url) {
    const found = await commonsSearch(`${title} animal photo`);
    if (found) { url = found.url; source = found.title; }
  }
  if (!url) {
    console.log("  STILL MISSING");
    report.push({ slug, title, status: "missing" });
    await new Promise((r2) => setTimeout(r2, 1000));
    continue;
  }
  const r = await fetchWithRetry(url);
  if (!r) {
    console.log("  download failed");
    report.push({ slug, title, url, status: "download-fail" });
    await new Promise((r2) => setTimeout(r2, 1000));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1000) {
    console.log("  too small");
    report.push({ slug, title, url, status: "too-small" });
    continue;
  }
  writeFileSync(`${DEST}/${slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) via ${source}`);
  report.push({ slug, title, url, source, status: "ok", size: buf.length });
  await new Promise((r2) => setTimeout(r2, 1000));
}

for (const [slug, query] of Object.entries(RESEARCH)) {
  console.log(`${slug} [research: ${query}]`);
  const found = await commonsSearch(query);
  if (!found) {
    console.log("  STILL MISSING");
    report.push({ slug, query, status: "missing" });
    await new Promise((r2) => setTimeout(r2, 1200));
    continue;
  }
  const r = await fetchWithRetry(found.url);
  if (!r) {
    console.log("  download failed");
    report.push({ slug, query, url: found.url, title: found.title, status: "download-fail" });
    await new Promise((r2) => setTimeout(r2, 1200));
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1000) {
    console.log("  too small");
    report.push({ slug, query, url: found.url, status: "too-small" });
    continue;
  }
  writeFileSync(`${DEST}/${slug}.jpg`, buf);
  console.log(`  OK (${buf.length} bytes) via ${found.title}`);
  report.push({ slug, query, url: found.url, source: found.title, status: "ok", size: buf.length });
  await new Promise((r2) => setTimeout(r2, 1200));
}

writeFileSync("out/e39-zodiac-retry-report.json", JSON.stringify(report, null, 2));
const missing = report.filter((r) => r.status !== "ok");
console.log(`\nDone. ${report.length - missing.length}/${report.length} ok. Still missing: ${missing.map((m) => m.slug).join(", ") || "none"}`);
