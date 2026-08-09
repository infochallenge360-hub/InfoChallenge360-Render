// Re-derive which Commons/Wikipedia file was used per E67 Wikipedia-sourced slug (same selection
// logic as fetch-logos67-wp.mjs) and report its license, so PHOTO-CREDITS.txt can be built.
const UA = "InfoChallenge360QuizBot/1.0 (educational quiz)";

const JOBS = {
  philips: "Philips", casio: "Casio", palm: "Palm, Inc.", alcatel: "Alcatel Mobile",
  realme: "Realme", zte: "ZTE", tcl: "TCL Technology", benq: "BenQ", sanyo: "Sanyo",
  micromax: "Micromax Informatics", redmi: "Redmi", coolpad: "Coolpad", gionee: "Gionee",
  infinix: "Infinix Mobile", tecno: "Tecno Mobile", vertu: "Vertu", karbonn: "Karbonn Mobiles",
  itel: "Itel Mobile", "blu-products": "BLU Products", archos: "Archos", qmobile: "QMobile",
  crosscall: "Crosscall", doogee: "Doogee", ulefone: "Ulefone", umidigi: "Umidigi",
  jolla: "Jolla", bq: "BQ (company)",
};

async function j(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    if (r.ok) return r.json();
    await new Promise((res) => setTimeout(res, 3000 * (i + 1)));
  }
  return null;
}

async function licenseFor(fileTitle) {
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=extmetadata`;
  const data = await j(api);
  const page = data && Object.values(data.query.pages)[0];
  const meta = page?.imageinfo?.[0]?.extmetadata;
  if (!meta) return null;
  return { license: meta.LicenseShortName?.value || null, artist: meta.Artist?.value?.replace(/<[^>]+>/g, "").trim() || null };
}

async function pickImage(title) {
  const data = await j(`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=images&format=json`);
  const images = data?.parse?.images || [];
  const candidates = images.filter((f) => /logo/i.test(f) && !/commons-logo|wiki.*logo/i.test(f));
  const nonOld = candidates.filter((f) => !/old/i.test(f));
  return (nonOld[0] || candidates[0] || null);
}

const results = [];
for (const [slug, title] of Object.entries(JOBS)) {
  const file = await pickImage(title);
  if (!file) { results.push({ slug, status: "NO FILE FOUND" }); continue; }
  const lic = await licenseFor(`File:${file}`);
  results.push({ slug, file, license: lic?.license || "UNKNOWN", artist: lic?.artist || "" });
  await new Promise((r) => setTimeout(r, 1200));
}
console.log(JSON.stringify(results, null, 2));
