import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { CAPITAL_CITIES_E10 } from "../src/Quiz/capitalCitiesE10Data.js";

const UA = "InfoChallenge360Bot/1.0 (educational quiz)";
const DEST = "public/capitals";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJsonWithRetry(url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    const text = await r.text();
    if (r.ok && text.trim().startsWith("{")) return JSON.parse(text);
    await sleep(2000 * (attempt + 1));
  }
  return null;
}

async function imageUrl(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const j = await fetchJsonWithRetry(api);
  if (!j) return null;
  const pages = j.query && j.query.pages;
  if (!pages) return null;
  const p = Object.values(pages)[0];
  if (p.missing !== undefined) return null;
  return p && p.thumbnail ? { url: p.thumbnail.source, title: p.title } : null;
}

function isRealImage(buf) {
  if (buf.length < 3000) return false;
  const jpeg = buf[0] === 0xff && buf[1] === 0xd8;
  const png = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  return jpeg || png;
}

async function download(url, path) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) return { ok: false, reason: `http-${r.status}` };
  const buf = Buffer.from(await r.arrayBuffer());
  if (!isRealImage(buf)) return { ok: false, reason: "not-real-image" };
  writeFileSync(path, buf);
  return { ok: true, size: buf.length };
}

const results = [];
let n = 0;
for (const it of CAPITAL_CITIES_E10) {
  n++;
  const outPath = `${DEST}/${it.slug}.jpg`;
  if (existsSync(outPath)) { results.push({ slug: it.slug, city: it.city, status: "SKIP_EXISTS" }); console.error(`${n}/71 ${it.slug}: SKIP`); continue; }
  try {
    const found = await imageUrl(it.city);
    await sleep(1800);
    if (!found) { results.push({ slug: it.slug, city: it.city, status: "NO_IMAGE" }); console.error(`${n}/71 ${it.slug}: NO_IMAGE`); continue; }
    const dl = await download(found.url, outPath);
    await sleep(1800);
    if (!dl.ok) { results.push({ slug: it.slug, city: it.city, status: "DL_FAIL", reason: dl.reason, wikiTitle: found.title, url: found.url }); console.error(`${n}/71 ${it.slug}: DL_FAIL ${dl.reason}`); continue; }
    results.push({ slug: it.slug, city: it.city, status: "OK", size: dl.size, wikiTitle: found.title, url: found.url });
    console.error(`${n}/71 ${it.slug}: OK (${dl.size}b, via "${found.title}")`);
  } catch (e) {
    results.push({ slug: it.slug, city: it.city, status: "ERR", err: String(e) });
    console.error(`${n}/71 ${it.slug}: ERR ${e.message}`);
  }
}

const ok = results.filter((r) => r.status === "OK" || r.status === "SKIP_EXISTS");
const bad = results.filter((r) => r.status !== "OK" && r.status !== "SKIP_EXISTS");
console.log(`\nOK ${ok.length} / ${CAPITAL_CITIES_E10.length}`);
if (bad.length) { console.log("NEED FALLBACK:"); for (const b of bad) console.log(` - ${b.slug} (${b.city}): ${b.status} ${b.reason || ""}`); }
writeFileSync("scripts/e10-fetch-report.json", JSON.stringify(results, null, 2), "utf8");
