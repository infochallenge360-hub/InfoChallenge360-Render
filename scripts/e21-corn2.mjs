import { writeFileSync } from "node:fs";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
async function fp(file){const u=`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1200`;const r=await fetch(u,{headers:{"User-Agent":UA}});const b=Buffer.from(await r.arrayBuffer());
  // validate real JPEG (FFD8) or PNG (89504E47)
  const isJpg=b[0]===0xFF&&b[1]===0xD8; const isPng=b[0]===0x89&&b[1]===0x50;
  return (b.length>=15000&&(isJpg||isPng))?b:null;}
for(const f of ["Sweet_corn_close_up.jpg","Corn_on_the_cob.jpg","Cob_of_corn.jpg","Zuckermais.jpg","Sweetcorn.jpg","Corncobs.jpg"]){
  const b=await fp(f); if(b){writeFileSync("public/fruits/corn.jpg",b);console.log("corn OK",b.length,f);break;} else console.log("skip(invalid)",f);
  await new Promise(r=>setTimeout(r,1000));
}
