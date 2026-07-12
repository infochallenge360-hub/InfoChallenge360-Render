import { writeFileSync } from "node:fs";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
async function fp(file){const u=`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1200`;const r=await fetch(u,{headers:{"User-Agent":UA}});const b=Buffer.from(await r.arrayBuffer());return b.length>=15000?b:null;}
for(const f of ["Cornonthecob.jpg","Corn_on_the_cob,_unhusked.jpg","Sweet_corn_(maize).jpg","Zea_mays_-_Köhler–s_Medizinal-Pflanzen.jpg","Green_corn.jpg","Maize.jpg","Corn_cob.jpg"]){
  const b=await fp(f); if(b){writeFileSync("public/fruits/corn.jpg",b);console.log("corn OK",b.length,f);break;} else console.log("skip",f);
  await new Promise(r=>setTimeout(r,1000));
}
