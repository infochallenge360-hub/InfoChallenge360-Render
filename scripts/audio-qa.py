# Audio QA gate — transcribes VO clips with whisper and flags content mismatches.
# Loads WAV via numpy (no ffmpeg dependency). Usage:
#   python scripts/audio-qa.py <dataFile.js> <voPrefix> <introFile> [nameField]
#   e.g. python scripts/audio-qa.py src/Quiz/butterfliesData.js bt vo-intro-butterfly name
import sys, os, re, json, warnings, subprocess, wave
warnings.filterwarnings("ignore")
import numpy as np
import whisper

data_file  = sys.argv[1]
prefix     = sys.argv[2]
intro      = sys.argv[3] if len(sys.argv) > 3 else None
name_field = sys.argv[4] if len(sys.argv) > 4 else "name"

def load_wav_16k(path):
    """Load a WAV to mono float32 @16kHz without ffmpeg."""
    with wave.open(path, "rb") as w:
        sr = w.getframerate(); n = w.getnframes(); ch = w.getnchannels(); sw = w.getsampwidth()
        raw = w.readframes(n)
    dt = {1: np.uint8, 2: np.int16, 4: np.int32}[sw]
    a = np.frombuffer(raw, dtype=dt).astype(np.float32)
    if sw == 1: a = (a - 128) / 128.0
    elif sw == 2: a = a / 32768.0
    else: a = a / 2147483648.0
    if ch > 1: a = a.reshape(-1, ch).mean(axis=1)
    if sr != 16000:
        idx = np.linspace(0, len(a) - 1, int(len(a) * 16000 / sr))
        a = np.interp(idx, np.arange(len(a)), a).astype(np.float32)
    return a

node = subprocess.run(["node","-e",
    f'import("./{data_file}").then(m=>{{const k=Object.keys(m)[0];'
    f'console.log(JSON.stringify(m[k].map(x=>({{slug:(x.slug||x.iso),name:x.{name_field}||x.name}}))))}})'],
    capture_output=True, text=True, cwd=os.getcwd())
items = json.loads(node.stdout.strip().splitlines()[-1])

def norm(s): return re.sub(r"[^a-z0-9 ]","", s.lower()).strip()

m = whisper.load_model("tiny")
def tx(path):
    if not os.path.exists(path): return None
    return m.transcribe(load_wav_16k(path), fp16=False, language="en")["text"].strip()

print(f"=== AUDIO QA: {prefix} ({len(items)} items) ===", flush=True)
for f in ([intro] if intro else []) + ["vo-outro-guy","vo-easy-guy","vo-medium-guy","vo-hard-guy","vo-impossible-guy"]:
    try: print(f"[STRUCT] {f}: {tx(f'public/sfx/{f}.wav')!r}", flush=True)
    except Exception as e: print(f"[STRUCT] {f}: ERR {e}", flush=True)

bad = []
for it in items:
    p = f"public/sfx/{prefix}-{it['slug']}.wav"
    try: t = tx(p)
    except Exception as e: t = None
    if t is None:
        bad.append((it['slug'], it['name'], "MISSING/UNREADABLE")); continue
    tn, nm = norm(t), norm(it['name'])
    key = [w for w in nm.split() if len(w) > 3] or nm.split()
    if not any(w in tn for w in key):
        bad.append((it['slug'], it['name'], t))
print("\n=== NAME MISMATCHES ===", flush=True)
for slug, name, got in bad:
    print(f"BAD {slug} | expected '{name}' | heard: {got!r}", flush=True)
if not bad: print("ALL NAME CLIPS OK", flush=True)
print(f"\nTOTAL FLAGGED: {len(bad)}", flush=True)
