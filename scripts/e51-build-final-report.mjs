import { readFileSync, writeFileSync } from "node:fs";

const raw = JSON.parse(readFileSync("out/e51-statues-fetch-report-raw.json", "utf8"));
const bySlug = {};
for (const r of raw) bySlug[r.slug] = r;

// Overrides: images that were re-fetched/replaced after visual QA found the original
// download showed the wrong subject, a distant crowd shot, or failed entirely.
const overrides = {
  "charging-bull": {
    status: "ok", source: "commons-search", title: "File:Bowling Green td (2018-12-13) 06 - 26 Broadway, Charging Bull.jpg",
    license: "CC BY-SA 4.0", attribution: "Tdorante10 / CC BY-SA 4.0",
  },
  "alyosha-monument-plovdiv": {
    status: "ok", source: "commons-search", title: "File:AlyoshaPoldivMonument.jpg",
    license: "CC BY-SA 4.0", attribution: "Wingrime32 / CC BY-SA 4.0",
  },
  "golden-buddha-wat-traimit": {
    status: "ok", source: "commons-search", title: "File:Wat Traimitr Golden Buddha.png",
    license: "CC BY-SA 4.0", attribution: "Chainwit. / CC BY-SA 4.0",
  },
  "skanderbeg-statue-tirana": {
    status: "ok", source: "commons-search", title: "File:Skanderbeg.jpg",
    license: "CC BY-SA 4.0", attribution: "JetmiraAl / CC BY-SA 4.0",
  },
  "awakening-sculpture": {
    status: "ok", source: "commons-search", title: "File:The Awakening sculpture - 2.jpg",
    license: "CC BY-SA 4.0", attribution: "APK / CC BY-SA 4.0",
  },
  // item swaps: original target (leonidas monument / peter the great moscow / tear of grief) had
  // no usable free photo of the actual monument findable on Wikipedia/Commons after multiple search
  // attempts (Leonidas Monument's pageimage/searches only surface an unrelated ancient Sparta bust;
  // the Moscow Tsereteli monument and the Bayonne Tear of Grief sculpture have no clean close-up CC
  // photo indexed) -- swapped for equally-obscure, cleanly-sourced statues instead.
  "bolivar-equestrian-statue-caracas": {
    status: "ok", source: "commons-search", title: "File:Bolivar-plaza-caballo-caracas.JPG",
    license: "CC BY-SA 4.0", attribution: "Omerta-ve / CC BY-SA 4.0",
  },
  "san-martin-equestrian-statue": {
    status: "ok", source: "commons-search", title: "File:Equestrian statue of José de San Martín, Buenos Aires.jpg",
    license: "CC BY-SA 4.0", attribution: "Bernard Gagnon / CC BY-SA 4.0",
  },
  "virgin-of-el-panecillo": {
    status: "ok", source: "wikipedia-pageimages", title: "File:Virgen de Quito 02.jpg",
    license: "CC-BY-SA-3.0", attribution: "Cayambe / CC-BY-SA-3.0",
  },
};

// Read final item order from the data file to emit the report in the same order.
const dataSrc = readFileSync("src/Quiz/statuesE51Data.js", "utf8");
const slugs = [...dataSrc.matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => m[1]);

const finalReport = [];
for (const slug of slugs) {
  if (overrides[slug]) {
    finalReport.push({ slug, ...overrides[slug] });
    continue;
  }
  const r = bySlug[slug];
  if (!r || r.status !== "ok") {
    finalReport.push({ slug, status: r?.status || "missing", title: r?.title || slug });
    continue;
  }
  finalReport.push({
    slug,
    status: "ok",
    source: r.source,
    title: r.title,
    license: r.license,
    attribution: r.attribution,
  });
}

writeFileSync("out/e51-statues-fetch-report.json", JSON.stringify(finalReport, null, 2));
const bad = finalReport.filter((r) => r.status !== "ok");
console.log(`Final report: ${finalReport.length} items, ${finalReport.length - bad.length} ok, ${bad.length} not-ok.`);
if (bad.length) console.log("NOT OK:", bad.map((b) => b.slug));

// license breakdown
const pdCount = finalReport.filter((r) => /public domain|cc0/i.test(r.license || "")).length;
const ccCount = finalReport.filter((r) => /^cc[- ]by/i.test(r.license || "")).length;
console.log(`License breakdown: ${pdCount} public domain/CC0, ${ccCount} CC-BY/CC-BY-SA needing attribution.`);
