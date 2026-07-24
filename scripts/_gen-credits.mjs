// Merge all fetch-report JSONs for an episode (later files override earlier for same slug),
// resolve each source to a Commons file title, query license+artist, and print a credits block.
import { readFileSync, existsSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";

async function fetchWithRetry(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15000) });
      if (r.status === 429) { await new Promise((res) => setTimeout(res, 6000 * (i + 1))); continue; }
      if (r.ok) return r;
      await new Promise((res) => setTimeout(res, 1500));
    } catch (e) { await new Promise((res) => setTimeout(res, 2000)); }
  }
  return null;
}

// Given a raw upload.wikimedia.org URL, extract the Commons "File:<name>" title.
function urlToFileTitle(url) {
  if (!url) return null;
  const m = url.match(/\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/]+?)(?:\/\d+px-[^/]+)?$/);
  if (!m) return null;
  let name = decodeURIComponent(m[1]);
  // strip a "NNNpx-" thumbnail prefix if present on the filename itself
  name = name.replace(/^\d+px-/, "");
  return "File:" + name;
}

async function licenseFor(fileTitle) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=extmetadata`;
  const r = await fetchWithRetry(api);
  if (!r) return null;
  const j = await r.json();
  const page = Object.values(j.query.pages)[0];
  const meta = page?.imageinfo?.[0]?.extmetadata;
  if (!meta) return null;
  const license = meta.LicenseShortName?.value || null;
  const artist = meta.Artist?.value?.replace(/<[^>]+>/g, "").trim() || null;
  return { license, artist };
}

const [, , reportsArg, dataFileArg, nameFieldArg] = process.argv;
const reportFiles = reportsArg.split(",");
const dataMod = await import(new URL(dataFileArg, `file://${process.cwd()}/`).href);
const items = Object.values(dataMod).filter(Array.isArray)[0];
const nameField = nameFieldArg || "name";

const bySlug = {};
for (const rf of reportFiles) {
  if (!existsSync(rf)) continue;
  const arr = JSON.parse(readFileSync(rf, "utf8"));
  for (const r of arr) {
    if (r.status && r.status.toLowerCase() === "ok" && r.slug) bySlug[r.slug] = r; // later files overwrite earlier (later = more recent fix)
  }
}

const results = [];
for (const item of items) {
  const slug = item.slug;
  const rep = bySlug[slug];
  let credit = "license verification pending";
  if (rep) {
    if (rep.attribution) {
      // Sourcing agent already recorded attribution directly (e.g. iNaturalist) — trust it, skip Commons lookup.
      credit = rep.attribution;
    }
    let fileTitle = rep.title && rep.title.startsWith("File:") ? rep.title : null;
    if (!fileTitle) fileTitle = rep.source && rep.source.startsWith("File:") ? rep.source : null;
    if (!fileTitle) fileTitle = urlToFileTitle(rep.url);
    if (!fileTitle) fileTitle = urlToFileTitle(rep.download_url);
    if (!rep.attribution && fileTitle) {
      const lic = await licenseFor(fileTitle);
      if (lic && lic.license) {
        if (/public domain|pd|cc0/i.test(lic.license)) {
          credit = `Public domain${lic.artist ? " — " + lic.artist : ""}`;
        } else {
          credit = `(c) ${lic.artist || "unknown"}, some rights reserved (${lic.license})`;
        }
      }
      await new Promise((res) => setTimeout(res, 500));
    }
  }
  results.push(`${item[nameField]} (${slug}): ${credit}`);
}
console.log(results.join("\n"));
