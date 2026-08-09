// يجلب صور من Wikipedia pageimages API لأي حلقة (يقرأ slug/wiki من ملف البيانات) — تسلسلي.
// الاستخدام: node scripts/fetch-generic-images.mjs <dataFile> <destDir>
import { writeFileSync, existsSync, statSync } from "node:fs";

const [dataFile, destDir] = process.argv.slice(2);
if (!dataFile || !destDir) { console.log("usage: node fetch-generic-images.mjs <dataFile> <destDir>"); process.exit(1); }

const mod = await import("../" + dataFile.replace(/^src\//, "src/").replace(/\\/g, "/"));
const items = Object.values(mod).find((v) => Array.isArray(v));

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchThumb(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(title)}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const json = await res.json();
  const pages = Object.values(json.query?.pages || {});
  const page = pages[0];
  if (!page || page.missing !== undefined) return { ok: false, reason: "missing-page" };
  if (!page.thumbnail) return { ok: false, reason: "no-thumbnail" };
  return { ok: true, url: page.thumbnail.source, title: page.title };
}

const results = [];
for (const item of items) {
  const out = `${destDir}/${item.slug}.jpg`;
  if (existsSync(out) && statSync(out).size > 8000) {
    results.push({ slug: item.slug, status: "cached" });
    continue;
  }
  try {
    const r = await fetchThumb(item.wiki);
    if (!r.ok) {
      results.push({ slug: item.slug, status: "FAIL", reason: r.reason, wiki: item.wiki });
      console.log(`FAIL ${item.slug} (${item.wiki}): ${r.reason}`);
      await sleep(500);
      continue;
    }
    const imgRes = await fetch(r.url, { headers: { "User-Agent": UA } });
    const buf = Buffer.from(await imgRes.arrayBuffer());
    if (buf.length < 8000) {
      results.push({ slug: item.slug, status: "FAIL", reason: "too-small", wiki: item.wiki });
      console.log(`FAIL ${item.slug}: downloaded file too small (${buf.length}b)`);
      await sleep(500);
      continue;
    }
    writeFileSync(out, buf);
    results.push({ slug: item.slug, status: "ok", size: buf.length, resolvedTitle: r.title });
    console.log(`ok   ${item.slug} <- "${r.title}" (${buf.length}b)`);
  } catch (e) {
    results.push({ slug: item.slug, status: "FAIL", reason: e.message, wiki: item.wiki });
    console.log(`FAIL ${item.slug}: ${e.message}`);
  }
  await sleep(1500);
}

const ok = results.filter((r) => r.status === "ok" || r.status === "cached").length;
const fails = results.filter((r) => r.status === "FAIL");
console.log(`\n${ok}/${items.length} images ok.`);
if (fails.length) {
  console.log(`\n${fails.length} FAILED:`);
  fails.forEach((f) => console.log(`  ${f.slug} (wiki: "${f.wiki}") — ${f.reason}`));
}
