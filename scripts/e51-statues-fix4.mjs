import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const UA = "GuessSyncQuizBot/1.0 (educational quiz)";
const DEST = "public/statues/_candidates";
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
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  return { url: page?.thumbnail?.source || null, title: page?.title };
}
async function commonsSearch(query, limit = 8) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=900`;
  const r = await fetchWithRetry(api);
  if (!r || !r.ok) return [];
  const j = await r.json();
  if (!j.query?.pages) return [];
  return Object.values(j.query.pages);
}

async function tryPage(slug, title) {
  const res = await pageImage(title);
  if (res && res.url) {
    const r = await fetchWithRetry(res.url);
    if (r && r.ok) {
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length > 5000) {
        writeFileSync(`${DEST}/${slug}__page.jpg`, buf);
        console.log(`  [pageimages "${title}"] saved ${slug}__page.jpg (${buf.length}b) title=${res.title}`);
        return true;
      }
    }
  }
  return false;
}

const manifest = [];
async function trySearch(slug, queries, startIdx = 0) {
  let idx = startIdx;
  for (const q of queries) {
    const pages = await commonsSearch(q);
    for (const p of pages) {
      const info = p.imageinfo?.[0];
      if (!info || (info.mime !== "image/jpeg" && info.mime !== "image/png")) continue;
      const url = info.thumburl || info.url;
      const r = await fetchWithRetry(url);
      if (!r || !r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 5000) continue;
      const fname = `${slug}__${idx}.jpg`;
      writeFileSync(`${DEST}/${fname}`, buf);
      console.log(`  saved ${fname} <- ${p.title} (${buf.length}b)`);
      manifest.push({ slug, candidate: fname, title: p.title, url, extmetadata: info.extmetadata });
      idx++;
      if (idx >= startIdx + 5) break;
      await new Promise((r2) => setTimeout(r2, 400));
    }
    if (idx >= startIdx + 5) break;
    await new Promise((r2) => setTimeout(r2, 500));
  }
}

console.log("leonidas-monument-thermopylae");
await tryPage("leonidas-monument-thermopylae", "Leonidas Monument (Thermopylae)");
await trySearch("leonidas-monument-thermopylae", ["Leonidas monument Thermopylae 1955", "Molon labe monument Thermopylae statue"], 10);

console.log("\npeter-the-great-statue-moscow");
await tryPage("peter-the-great-statue-moscow", "Monument to Peter the Great, Moscow");
await trySearch("peter-the-great-statue-moscow", ["Monument to Peter the Great Moscow", "Peter the Great statue Moscow full view"], 10);

console.log("\ntear-of-grief");
await tryPage("tear-of-grief", "Tear of Grief");
await trySearch("tear-of-grief", ["Tear of Grief sculpture bronze teardrop", "9/11 memorial Bayonne New Jersey Tsereteli teardrop"], 10);

console.log("\nofuna-kannon");
await trySearch("ofuna-kannon", ["Ofuna Kannon statue category", "Kannon statue Ofuna large"], 10);

writeFileSync("out/e51-candidates-manifest3.json", JSON.stringify(manifest, null, 2));
console.log("\nDone.");
