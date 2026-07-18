import { writeFileSync, existsSync, statSync, mkdirSync } from "node:fs";
import { CITY_SKYLINE_E21 } from "../src/Quiz/cityskylineE21Data.js";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/skylines";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

// E20 lesson: Wikipedia pageimages (exact-article-title match) is far more reliable than
// generic Commons search. Still filter satellite/space photos, maps/diagrams, paintings.
const BAD_TITLE = /satellite|nasa\b|iss\d|iss-\d|sentinel|landsat|modis|aster\b|orbit|space station|envisat|stamp|map of|banner|specimen|djvu|tropenmuseum|\bmap\b|painting|paint by|oil on canvas|engraving|lithograph|watercolour|watercolor|anonymous-|logo|flag of|coat of arms|seal of/i;

async function fetchWithRetry(url, opts = {}, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, ...opts });
      if (r.status === 429) {
        const wait = 8000 * (i + 1);
        console.log(`  429, waiting ${wait}ms...`);
        await new Promise((res) => setTimeout(res, wait));
        continue;
      }
      return r;
    } catch (e) {
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  return null;
}

async function pageImage(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail|name&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const pages = j.query && j.query.pages;
  if (!pages) return null;
  const p = Object.values(pages)[0];
  if (!p || !p.thumbnail) return null;
  if (BAD_TITLE.test(p.pageimage || "")) return null;
  return { url: p.thumbnail.source, filename: p.pageimage };
}

const results = [];
for (const item of CITY_SKYLINE_E21) {
  const dest = `${DEST}/${item.slug}.jpg`;
  if (existsSync(dest) && statSync(dest).size > 15000) {
    console.log(`${item.slug}: already have it`);
    results.push({ slug: item.slug, status: "already-had" });
    continue;
  }
  console.log(`fetching ${item.slug} (${item.city})...`);
  try {
    const pic = await pageImage(item.city);
    if (!pic) {
      console.log(`  no clean pageimage, missing`);
      results.push({ slug: item.slug, name: item.city, status: "missing" });
      await new Promise((res) => setTimeout(res, 1500));
      continue;
    }
    const r = await fetchWithRetry(pic.url);
    if (!r || !r.ok) {
      console.log(`  download failed`);
      results.push({ slug: item.slug, name: item.city, status: "missing" });
      await new Promise((res) => setTimeout(res, 1500));
      continue;
    }
    const buf = Buffer.from(await r.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`  OK (${buf.length} bytes) -- ${pic.filename}`);
    results.push({ slug: item.slug, name: item.city, status: "ok", size: buf.length, filename: pic.filename });
  } catch (e) {
    console.log(`  error: ${e.message}`);
    results.push({ slug: item.slug, name: item.city, status: "error", error: e.message });
  }
  await new Promise((res) => setTimeout(res, 1500));
}

writeFileSync("out/e21-fetch-report.json", JSON.stringify(results, null, 2));
const missing = results.filter((r) => r.status === "missing" || r.status === "error");
console.log(`\nDone. ${results.length - missing.length}/${results.length} ok. Missing: ${missing.map((m) => m.slug).join(", ")}`);
