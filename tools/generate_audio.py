"""Generate optional Filipino MP3 samples or the shared TALA audio library."""
import argparse
import asyncio
import html
import hashlib
import json
import re
from pathlib import Path
import shutil
from datetime import datetime, timezone
import sys

ROOT = Path(__file__).resolve().parents[1]
SAMPLES = {
    "Tala": ["magandang-umaga-po.mp3"],
    "Likha": ["bilog.mp3", "pula.mp3"],
    "Titik": ["A.mp3", "B.mp3", "araw.mp3"],
    "Bilang": ["1.mp3", "5.mp3"],
}

def synthesis(row, profiles, overrides, args):
    profile=dict(profiles[row["character"]])
    profile.update(row.get("previewProfile",{}))
    text=row["synthesisText"]
    # Single letters and letter pairs use English letter names. Full Filipino
    # words/sentences retain their character's Filipino narration voice.
    source=row.get("sourceText",row["text"])
    if row["character"]=="Titik" and not row.get("previewProfile") and re.fullmatch(r"[A-Za-z](?: [A-Za-z])?",source):
        profile["voice"]="en-US-GuyNeural"
        text=", ".join(source.upper().split())+"."
    override=overrides.get(row["file"],text)
    if isinstance(override,dict):
        text=override.get("text",text)
        profile.update({k:override[k] for k in ["voice","rate","pitch"] if k in override})
    else:text=override
    for key in ["voice","rate","pitch"]:
        if getattr(args,key,None):profile[key]=getattr(args,key)
    return text,profile

def load_entries(character=None):
    source = ROOT / "docs/voice-scripts/audio-manifest.json"
    if not source.exists():
        raise SystemExit("Run node tools/audio-catalog.cjs --write first.")
    rows = json.loads(source.read_text(encoding="utf-8"))["entries"]
    return [row for row in rows if not character or row["character"].lower() == character.lower()]

def sample_entries(rows):
    selected = []
    for character in ["Tala", "Likha", "Titik", "Bilang"]:
        group = [row for row in rows if row["character"] == character]
        for row in group:
            if Path(row["file"]).name in SAMPLES[character]:
                selected.append(row)
        sentence = next((row for row in group if any(s.endswith(":lesson") for s in row["sources"])), None)
        if sentence and sentence not in selected:
            selected.append(sentence)
    return selected

def experiment_entries():
    rows=[]
    for voice in ["fil-PH-AngeloNeural","fil-PH-BlessicaNeural"]:
        name="angelo" if "Angelo" in voice else "blessica"
        for key,text,label in [
            ("a-ah","Ah.","A phonics candidate: ah — listen and review"),
            ("b-literal","b","B trial: literal b — may still say the letter name"),
            ("b-buh","Buh.","B approximation only: buh has an extra vowel; NOT pure /b/")
        ]:
            rows.append({"character":"Titik","file":f"assets/audio/fil/shared/titik/{name}-{key}.mp3","text":label,"synthesisText":text,"requiresReview":True,"sources":[],"previewProfile":{"voice":voice,"rate":"-10%","pitch":"+0Hz"}})
    for pitch in ["+25Hz","+40Hz"]:
        rows.append({"character":"Tala","file":f"assets/audio/fil/shared/tala/blessica-pitch-{pitch[1:-2]}.mp3","text":f"Pitch comparison {pitch}: adjusted Blessica, not a verified child/teen voice.","synthesisText":"Kumusta, kaibigan! Tara, matuto at maglaro kasama si Tala.","requiresReview":False,"sources":[],"previewProfile":{"voice":"fil-PH-BlessicaNeural","rate":"-5%","pitch":pitch}})
    return rows

def safe_destination(base, row):
    relative = Path(row["file"])
    if relative.is_absolute() or ".." in relative.parts or relative.parts[:4] != ("assets", "audio", "fil", "shared") or relative.suffix != ".mp3":
        raise ValueError("Invalid audio path: " + row["file"])
    target = (base / relative).resolve()
    if not target.is_relative_to(base.resolve()):
        raise ValueError("Output must stay within its destination folder")
    return target

def gallery(base, rows, results, effective=None):
    effective=effective or {}
    cards = []
    for row in rows:
        relative = row["file"]
        if relative not in results:
            if relative.endswith('/titik/B.mp3'):
                cards.append('<article><h2>Titik — B</h2><p>Wala pang recording sa sample na ito. Suriin ang ulat ng generator.</p></article>')
            continue
        warning = " — Suriin ang bigkas ng titik." if row["requiresReview"] else ""
        item=effective.get(relative,{})
        version=hashlib.sha256((base / relative).read_bytes()).hexdigest()[:12]
        spoken=item.get("text",row["synthesisText"])
        profile=" · ".join(str(item.get(k,"")) for k in ["voice","rate","pitch"] if item.get(k))
        cards.append(f'<article><h2>{html.escape(row["character"])}</h2><p>{html.escape(row["text"] + warning)}</p><audio controls preload="none" src="{html.escape(relative, quote=True)}?v={version}"></audio><small>Text para sa TTS: {html.escape(spoken)}</small><small>{html.escape(profile)}</small><small>{html.escape(Path(relative).name)}</small></article>')
    body = '<!doctype html><html lang="fil"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TALA — subok na boses</title><style>body{font:17px system-ui;background:#f1edff;color:#26213f;max-width:900px;margin:30px auto;padding:20px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px}article{background:white;border-radius:20px;padding:20px;overflow-wrap:anywhere}audio{width:100%}small{display:block;margin-top:12px;color:#555}p{line-height:1.6}</style><h1>TALA — subok na boses</h1><p>Mga sample lamang. Suriin ang natural na bigkas, lalo na ang mga titik. Filipino ang mga salita at pangungusap. English na pangalan ng titik ang ginagamit sa A–Z at pares ng titik: A = ey, B = bee. Ang lumang phonics trials ay panghambing lamang.</p><p><a href="/audio-preview/index.html">Mga sample</a> · <a href="/audio-preview/experiments/index.html">Phonics at pitch comparisons</a></p><main>' + ''.join(cards) + '</main></html>'
    (base / "index.html").write_text(body, encoding="utf-8")

async def generate(args):
    try:
        import edge_tts
    except ImportError:
        raise SystemExit("Install edge-tts in your audio Python environment first.")
    if args.list_voices:
        voices = await asyncio.wait_for(edge_tts.list_voices(), timeout=20)
        for voice in voices:
            if voice["ShortName"]==args.voice or (not args.voice and voice["Locale"].lower().startswith(("fil", "tl"))):
                print(voice["ShortName"], voice["Gender"])
        return
    experiments=getattr(args,"experiments",False)
    refresh=getattr(args,"refresh_samples",False)
    if refresh and args.all:
        raise ValueError("Refresh is only allowed for preview samples, never app recordings")
    rows = experiment_entries() if experiments else load_entries(args.character)
    if experiments and args.character:
        rows=[row for row in rows if row["character"]==args.character]
    if args.samples:
        rows = sample_entries(rows)
    if args.limit:
        rows = rows[:args.limit]
    profiles = json.loads((ROOT / "tools/audio-voices.json").read_text(encoding="utf-8"))
    overrides = json.loads((ROOT / "tools/audio-pronunciation.json").read_text(encoding="utf-8"))
    base = ROOT if args.all else ROOT / "audio-preview" / ("experiments" if experiments else "")
    report = {"provider":"edge-tts (unofficial online client)", "mode":"library" if args.all else "samples", "files":[], "manual":[], "failures":[]}
    previous_report=base / "audio-generation-report.json"
    previous_files={item["file"]:item for item in json.loads(previous_report.read_text(encoding="utf-8")).get("files",[])} if previous_report.exists() else {}
    history=base / "history" / datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
    def backup(target,row):
        destination=safe_destination(history,row)
        destination.parent.mkdir(parents=True,exist_ok=True)
        shutil.copy2(target,destination)
    successes = set()
    voices = {v["ShortName"] for v in await asyncio.wait_for(edge_tts.list_voices(), timeout=20)}
    def checkpoint():
        base.mkdir(parents=True,exist_ok=True)
        temporary=base / "audio-generation-report.json.partial"
        temporary.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        temporary.replace(base / "audio-generation-report.json")
    async def process(index, row):
        text,profile=synthesis(row,profiles,overrides,args)
        target = safe_destination(base, row)
        target.parent.mkdir(parents=True, exist_ok=True)
        if text is None and not (args.all and target.exists()):
            if target.exists() and refresh:
                backup(target,row)
                target.unlink()
            report["manual"].append({"file":row["file"],"reason":"Human recording required for reviewed phonics."})
            print(f'[{index}/{len(rows)}] NEEDS HUMAN RECORDING {row["file"]}',flush=True)
            checkpoint()
            return
        if target.exists() and not refresh:
            if not target.stat().st_size:
                report["failures"].append({"file":row["file"], "error":"Existing file is empty; inspect or remove it manually."})
            else:
                successes.add(row["file"])
                previous=previous_files.get(row["file"],{})
                metadata=previous if previous.get("sha256")==hashlib.sha256(target.read_bytes()).hexdigest() else {}
                report["files"].append({**metadata,"file":row["file"], "status":"existing, preserved"})
            print(f'[{index}/{len(rows)}] PRESERVED {row["file"]}', flush=True)
            return
        if not isinstance(text, str) or not text.strip():
            raise ValueError("Invalid pronunciation override: " + row["file"])
        if profile["voice"] not in voices:
            raise ValueError("Voice is not currently available: " + profile["voice"])
        partial = target.with_suffix(".mp3.partial")
        error = None
        for attempt in range(3):
            try:
                await asyncio.wait_for(edge_tts.Communicate(text, **profile).save(str(partial)), timeout=60)
                if partial.stat().st_size < 256:
                    raise ValueError("Service returned no usable audio")
                if target.exists():backup(target,row)
                partial.replace(target)
                error = None
                break
            except Exception as exc:
                error = str(exc)
                if attempt < 2:
                    await asyncio.sleep(1 + attempt * 2)
        if error:
            report["failures"].append({"file":row["file"], "error":error})
            print(f'[{index}/{len(rows)}] FAILED {row["file"]}: {error}', flush=True)
        else:
            successes.add(row["file"])
            report["files"].append({"file":row["file"], "status":"generated", "text":text, "sha256":hashlib.sha256(target.read_bytes()).hexdigest(), **profile})
            print(f'[{index}/{len(rows)}] GENERATED {row["file"]}', flush=True)
        checkpoint()
        await asyncio.sleep(.3)
    semaphore=asyncio.Semaphore(getattr(args,"jobs",1))
    async def worker(index,row):
        async with semaphore:
            await process(index,row)
    await asyncio.gather(*(worker(index,row) for index,row in enumerate(rows,1)))
    base.mkdir(parents=True, exist_ok=True)
    (base / "audio-generation-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if args.samples or experiments:
        gallery(base, rows, successes,{item["file"]:item for item in report["files"]})
    print(f'Finished: {len(successes)} available; {len(report["manual"])} need human recording; {len(report["failures"])} failed.', flush=True)
    if report["failures"]:
        raise SystemExit(1)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--list-voices", action="store_true")
    mode.add_argument("--samples", action="store_true")
    mode.add_argument("--experiments", action="store_true",help="Generate phonics/pitch comparisons in a separate preview gallery.")
    mode.add_argument("--all", action="store_true", help="Generate directly into shared app audio folders; preserve existing files.")
    parser.add_argument("--character", choices=["Tala", "Likha", "Titik", "Bilang"])
    parser.add_argument("--voice")
    parser.add_argument("--rate")
    parser.add_argument("--pitch")
    parser.add_argument("--limit", type=int)
    parser.add_argument("--jobs",type=int,default=2,help="Concurrent requests, from 1 to 4 (default 2).")
    parser.add_argument("--refresh-samples",action="store_true",help="Back up and regenerate previews; cannot be used with --all.")
    args = parser.parse_args()
    if args.limit is not None and args.limit < 1:
        parser.error("--limit must be positive")
    if not 1<=args.jobs<=4:
        parser.error("--jobs must be from 1 to 4")
    if args.refresh_samples and args.all:
        parser.error("--refresh-samples cannot overwrite app recordings with --all")
    asyncio.run(generate(args))

if __name__ == "__main__":
    main()
