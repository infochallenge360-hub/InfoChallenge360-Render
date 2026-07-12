import { writeFileSync } from "node:fs";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
async function filepath(file, slug){ // direct Commons file, no rate-limit
  const u=`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1200`;
  const r=await fetch(u,{headers:{"User-Agent":UA}});const buf=Buffer.from(await r.arrayBuffer());
  if(buf.length<15000){console.log(`${slug}: TINY ${buf.length} (${file})`);return false;}
  writeFileSync(`public/fruits/${slug}.jpg`,buf);console.log(`${slug}: OK ${buf.length} | ${file}`);return true;
}
// try a few known-good filenames each; stop at first success
const A=["Asparagus_officinalis_bundle.jpg","Green_asparagus.jpg","Asparagus_(2).jpg","Grüner_Spargel.jpg","Asparagus-Bundle.jpg"];
for(const f of A){ if(await filepath(f,"asparagus")) break; await new Promise(r=>setTimeout(r,1500)); }
const S=["Salsifis.jpg","Tragopogon_porrifolius_roots.jpg","Salsify_roots.jpg","Oyster_plant_roots.jpg","Schwarzwurzel.jpg"];
for(const f of S){ if(await filepath(f,"salsify")) break; await new Promise(r=>setTimeout(r,1500)); }
