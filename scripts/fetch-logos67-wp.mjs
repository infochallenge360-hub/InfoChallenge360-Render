// يجلب شعارات (SVG/PNG) عبر Wikipedia article image list (يبحث عن ملفات فيها "logo") — تسلسلي.
import { writeFileSync } from "node:fs";

const UA = "InfoChallenge360QuizBot/1.0 (educational quiz; contact: shehaltoughtalat@gmail.com)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const JOBS = {
  philips: "Philips",
  "sony-ericsson": "Sony Ericsson",
  casio: "Casio",
  palm: "Palm, Inc.",
  alcatel: "Alcatel Mobile",
  realme: "Realme",
  zte: "ZTE",
  tcl: "TCL Technology",
  benq: "BenQ",
  sanyo: "Sanyo",
  micromax: "Micromax Informatics",
  poco: "Poco (brand)",
  redmi: "Redmi",
  nothing: "Nothing Technology",
  lava: "Lava International",
  coolpad: "Coolpad",
  gionee: "Gionee",
  infinix: "Infinix Mobile",
  tecno: "Tecno Mobile",
  vertu: "Vertu",
  karbonn: "Karbonn Mobiles",
  itel: "Itel Mobile",
  "blu-products": "BLU Products",
  wiko: "Wiko (company)",
  archos: "Archos",
  spice: "Spice Mobility",
  qmobile: "QMobile",
  energizer: "Energizer Holdings",
  crosscall: "Crosscall",
  doogee: "Doogee",
  ulefone: "Ulefone",
  blackview: "Blackview",
  umidigi: "Umidigi",
  jolla: "Jolla",
  bq: "BQ (company)",
  emporia: "Emporia (company)",
  sagem: "Sagem",
};

async function findLogoFile(title) {
  const url = "https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + encodeURIComponent(title) + "&prop=images";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const json = await res.json();
  if (json.error) return { ok: false, reason: `wp-error: ${json.error.info}` };
  const imgs = (json.parse?.images || []).filter((x) => /logo/i.test(x) && !/commons-logo|wiki.*logo/i.test(x));
  if (!imgs.length) return { ok: false, reason: "no-logo-file-in-article" };
  // فضّل الأحدث (يتجنب _old_)
  const preferred = imgs.find((x) => !/old/i.test(x)) || imgs[0];
  return { ok: true, file: `File:${preferred}` };
}

async function fetchFileBytes(file) {
  for (const host of ["commons.wikimedia.org", "en.wikipedia.org"]) {
    const url = `https://${host}/w/api.php?action=query&format=json&titles=${encodeURIComponent(file)}&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=800`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const json = await res.json();
    const page = Object.values(json.query?.pages || {})[0];
    if (page?.missing !== undefined) continue;
    const info = page?.imageinfo?.[0];
    if (!info) continue;
    return { ok: true, url: info.thumburl || info.url, mime: info.mime, license: info.extmetadata?.LicenseShortName?.value };
  }
  return { ok: false };
}

const results = [];
for (const [slug, title] of Object.entries(JOBS)) {
  try {
    const found = await findLogoFile(title);
    if (!found.ok) {
      results.push({ slug, status: "FAIL", reason: found.reason, title });
      console.log(`FAIL ${slug} (${title}): ${found.reason}`);
      await sleep(400);
      continue;
    }
    const fileInfo = await fetchFileBytes(found.file);
    if (!fileInfo.ok) {
      results.push({ slug, status: "FAIL", reason: "file-fetch-failed", title, file: found.file });
      console.log(`FAIL ${slug}: could not fetch ${found.file}`);
      await sleep(400);
      continue;
    }
    const imgRes = await fetch(fileInfo.url, { headers: { "User-Agent": UA } });
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const ext = fileInfo.mime?.includes("svg") ? "svg" : fileInfo.mime?.includes("png") ? "png" : "jpg";
    writeFileSync(`public/logos67/${slug}.${ext}`, buf);
    results.push({ slug, status: "ok", file: found.file, ext, size: buf.length, license: fileInfo.license });
    console.log(`ok   ${slug} <- ${found.file} (${buf.length}b, ${fileInfo.license || "?"})`);
  } catch (e) {
    results.push({ slug, status: "FAIL", reason: e.message, title });
    console.log(`FAIL ${slug}: ${e.message}`);
  }
  await sleep(700);
}

const ok = results.filter((r) => r.status === "ok").length;
console.log(`\n${ok}/${Object.keys(JOBS).length} logos ok.`);
const fails = results.filter((r) => r.status === "FAIL");
if (fails.length) {
  console.log(`${fails.length} FAILED:`);
  fails.forEach((f) => console.log(`  ${f.slug} (${f.title}) — ${f.reason}`));
}
writeFileSync("out/_logos67_wp_report.json", JSON.stringify(results, null, 2));
