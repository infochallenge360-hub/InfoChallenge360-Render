import { writeFileSync } from "node:fs";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
async function filepath(file, slug){
  const u=`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1200`;
  const r=await fetch(u,{headers:{"User-Agent":UA}});const buf=Buffer.from(await r.arrayBuffer());
  if(buf.length<15000){console.log(`${slug}: TINY ${buf.length} (${file})`);return false;}
  writeFileSync(`public/fruits/${slug}.jpg`,buf);console.log(`${slug}: OK ${buf.length} | ${file}`);return true;
}
const C=["Corncobs.jpg","Corn_on_the_cob.jpg","Sweetcorn.jpg","Maize_cob.jpg","Corn_cob.jpg"];
for(const f of C){ if(await filepath(f,"corn")) break; await new Promise(r=>setTimeout(r,1200)); }
const Y=["Yardlong_beans.jpg","Vigna_unguiculata_subsp._sesquipedalis.jpg","Long_bean.jpg","Snake_beans.jpg","Asparagus_bean.jpg"];
for(const f of Y){ if(await filepath(f,"yardlong-bean")) break; await new Promise(r=>setTimeout(r,1200)); }
