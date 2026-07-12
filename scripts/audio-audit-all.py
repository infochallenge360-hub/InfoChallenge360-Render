# Full audio audit across ALL episodes. Transcribes every name VO with whisper,
# flags: (1) MISSING, (2) SHIFT = clip speaks a DIFFERENT item's name (the concurrency bug),
# (3) WEAK = expected name tokens absent but no clear other-item match (often whisper mishearing).
import os, re, json, warnings, subprocess, wave, sys
warnings.filterwarnings("ignore")
try: sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception: pass
import numpy as np, whisper

import sys as _sys
MODEL = _sys.argv[1] if len(_sys.argv) > 1 else "base"
JOBS = [
    ("src/Quiz/snakesData.js",  "sn", "name"),
    ("src/Quiz/foodsData.js",   "fd", "name"),
    ("src/Quiz/animalsData.js", "an", "name"),
    ("src/Quiz/carsData.js",    "cm", "name"),
    ("src/Quiz/birdsData.js",   "bd", "name"),
    ("src/Quiz/seaData.js",     "sc", "name"),
    ("src/Quiz/fruitsData.js",  "fr", "name"),
    ("src/Quiz/dogsData.js",    "dg", "name"),
    ("src/Quiz/butterfliesData.js", "bt", "name"),
    ("src/Quiz/paintingsData.js","pt", "title"),
]

def load_wav_16k(path):
    with wave.open(path,"rb") as w:
        sr=w.getframerate(); a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768.0
    if sr!=16000:
        idx=np.linspace(0,len(a)-1,int(len(a)*16000/sr)); a=np.interp(idx,np.arange(len(a)),a).astype(np.float32)
    return a

def norm(s): return re.sub(r"[^a-z0-9 ]"," ", s.lower()).strip()
def toks(s): return [w for w in norm(s).split() if len(w)>2]

def items_of(df, nf):
    # pick the LONGEST array export (the 100-item dataset, not a small LEVELS metadata array)
    r=subprocess.run(["node","-e",
      f'import("./{df}").then(m=>{{const a=Object.values(m).filter(Array.isArray).sort((x,y)=>y.length-x.length)[0];'
      f'console.log(JSON.stringify(a.map(x=>({{slug:x.slug,name:(x.{nf}||x.name||"")}}))))}})'],
      capture_output=True,text=True,cwd=os.getcwd())
    return [it for it in json.loads(r.stdout.strip().splitlines()[-1]) if it.get("slug")]

m=whisper.load_model(MODEL)
def tx(p):
    if not os.path.exists(p): return None
    return m.transcribe(load_wav_16k(p),fp16=False,language="en")["text"].strip()

grand=0
for df, prefix, nf in JOBS:
    try: items=items_of(df,nf)
    except Exception as e:
        print(f"### {df} [{prefix}] — DATA ERROR {e}", flush=True); continue
    names=[norm(it["name"]) for it in items]
    shifts=[]; missing=[]; weak=[]
    for i,it in enumerate(items):
        p=f"public/sfx/{prefix}-{it['slug']}.wav"
        t=tx(p)
        if t is None: missing.append(it["slug"]); continue
        tn=norm(t); exp=toks(it["name"])
        if exp and any(w in tn for w in exp): continue   # matched self -> OK
        # does it match a DIFFERENT item's full name?
        hit=None
        for j,nm2 in enumerate(names):
            if j==i: continue
            jt=[w for w in nm2.split() if len(w)>2]
            if jt and all(w in tn for w in jt) and len(nm2)>=4:
                hit=items[j]["name"]; break
        if hit: shifts.append((it["slug"], it["name"], hit, t))
        else:   weak.append((it["slug"], it["name"], t))
    ep=os.path.basename(df).replace("Data.js","")
    n=len(shifts)+len(missing)
    grand+=n
    print(f"\n### {ep} [{prefix}] — {len(items)} clips | SHIFT={len(shifts)} MISSING={len(missing)} weak={len(weak)}", flush=True)
    for s,exp,got_name,got in shifts: print(f"  SHIFT {s}: expected '{exp}' but SPEAKS '{got_name}'  ({got!r})", flush=True)
    for s in missing: print(f"  MISSING {s}", flush=True)
print(f"\n===== GRAND TOTAL SHIFT+MISSING = {grand} =====", flush=True)
