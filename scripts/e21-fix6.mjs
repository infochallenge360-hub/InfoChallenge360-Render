import { writeFileSync } from "node:fs";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
const ITEMS = [["longan","Longan"],["feijoa","Feijoa"],["loquat","Loquat"],["salsify","Salsify"],["chayote","Chayote"],["sunchoke","Jerusalem artichoke"]];
async function pageimage(wiki){const api=`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=1200&redirects=1&titles=${encodeURIComponent(wiki)}`;const r=await fetch(api,{headers:{"User-Agent":UA}});const t=await r.text();if(t[0]!=="{")return "RATE";const j=JSON.parse(t);const p=Object.values(j.query.pages)[0];return p&&p.thumbnail?p.thumbnail.source:null;}
for(const [slug,wiki] of ITEMS){
  try{const url=await pageimage(wiki);
    if(url==="RATE"){console.log(`${slug}: RATE`);await new Promise(r=>setTimeout(r,8000));continue;}
    if(!url){console.log(`${slug}: NO_PAGEIMAGE`);continue;}
    const r=await fetch(url,{headers:{"User-Agent":UA}});const buf=Buffer.from(await r.arrayBuffer());
    if(buf.length<15000){console.log(`${slug}: TINY ${buf.length}`);continue;}
    writeFileSync(`public/fruits/${slug}.jpg`,buf);console.log(`${slug}: OK ${buf.length}`);
  }catch(e){console.log(`${slug}: ERR ${e}`);}
  await new Promise(r=>setTimeout(r,4000));
}
