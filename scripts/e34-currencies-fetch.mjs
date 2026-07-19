import { writeFileSync, existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";
const DEST = "public/currencies";
import { mkdirSync } from "node:fs";
if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

async function fetchWithRetry(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 15000);
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
      clearTimeout(timer);
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 10000 * (i + 1))); continue; }
      if (!r.ok) { await new Promise((res) => setTimeout(res, 4000)); continue; }
      return r;
    } catch (e) {
      clearTimeout(timer);
      await new Promise((res) => setTimeout(res, 4000));
    }
  }
  return null;
}

async function wikiLead(title) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1400&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r) return null;
  const j = await r.json();
  const p = Object.values(j.query?.pages || {})[0];
  return p?.thumbnail?.source || null;
}

async function commonsSearch(query, limit = 8) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime&iiurlwidth=1400`;
  const r = await fetchWithRetry(api);
  if (!r) return [];
  const j = await r.json();
  if (!j.query?.pages) return [];
  return Object.values(j.query.pages)
    .map((p) => ({ title: p.title, info: p.imageinfo?.[0] }))
    .filter((p) => p.info && (p.info.mime === "image/jpeg" || p.info.mime === "image/png"));
}

async function download(url) {
  const r = await fetchWithRetry(url);
  if (!r) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  const magic = buf.slice(0, 4).toString("hex");
  if (!magic.startsWith("ffd8") && !magic.startsWith("89504e47")) return null;
  return buf;
}

function looksLikeArtwork(title) {
  return /coat of arms|flag of|logo|map|banknote_history|specimen sheet/i.test(title) && false; // placeholder, keep permissive for banknotes
}

const mod = await import(pathToFileURL("src/Quiz/worldCurrenciesE34Data.js").href);
const items = mod.WORLD_CURRENCIES_E34;

const results = [];
for (const it of items) {
  const dest = `${DEST}/${it.slug}.jpg`;
  if (existsSync(dest)) { results.push({ slug: it.slug, status: "skipped" }); continue; }
  let saved = false;

  const wikiTitles = [it.currency, `${it.currency} banknotes`, `Banknotes of the ${it.currency}`];
  for (const t of wikiTitles) {
    const url = await wikiLead(t);
    if (url) {
      const buf = await download(url);
      if (buf && buf.length > 3000) {
        writeFileSync(dest, buf);
        console.log(`${it.slug} OK (${buf.length}) via wiki:${t}`);
        saved = true;
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 1500));
  }

  if (!saved) {
    const queries = [`${it.currency} banknote`, `${it.country} currency banknote`];
    for (const q of queries) {
      const found = await commonsSearch(q);
      for (const res of found) {
        const buf = await download(res.info.url);
        if (buf && buf.length > 3000) {
          writeFileSync(dest, buf);
          console.log(`${it.slug} OK (${buf.length}) via commons:${res.title}`);
          saved = true;
          break;
        }
        await new Promise((r) => setTimeout(r, 1500));
      }
      if (saved) break;
      await new Promise((r) => setTimeout(r, 2500));
    }
  }

  if (!saved) { console.log(`${it.slug} STILL MISSING`); results.push({ slug: it.slug, status: "missing" }); }
  else results.push({ slug: it.slug, status: "ok" });
  await new Promise((r) => setTimeout(r, 2000));
}

writeFileSync("out/e34-currencies-fetch-report.json", JSON.stringify(results, null, 2));
console.log("\nMissing:", JSON.stringify(results.filter(r => r.status === "missing").map(r => r.slug)));
