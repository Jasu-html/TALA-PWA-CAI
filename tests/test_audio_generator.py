import argparse
import importlib.util
import json
from pathlib import Path
import tempfile
import types
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("tala_audio", Path(__file__).resolve().parents[1] / "tools/generate_audio.py")
audio = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audio)

class AudioTests(unittest.IsolatedAsyncioTestCase):
    def test_english_letter_names_are_separate_from_filipino_narration(self):
        profiles={"Titik":{"voice":"fil-PH-AngeloNeural","rate":"-10%","pitch":"+0Hz"}}
        args=argparse.Namespace(voice=None,rate=None,pitch=None)
        for source,expected in [("A","A."),("B","B."),("a","A."),("A f","A, F.")]:
            row={"character":"Titik","file":"assets/audio/fil/shared/titik/test.mp3","sourceText":source,"text":source,"synthesisText":source}
            text,profile=audio.synthesis(row,profiles,{},args)
            self.assertEqual(text,expected);self.assertEqual(profile["voice"],"en-US-GuyNeural")
        sentence={"character":"Titik","file":"assets/audio/fil/shared/titik/araw.mp3","text":"araw","synthesisText":"araw"}
        text,profile=audio.synthesis(sentence,profiles,{},args)
        self.assertEqual(text,"araw");self.assertEqual(profile["voice"],"fil-PH-AngeloNeural")
        text,profile=audio.synthesis(sentence,profiles,{sentence["file"]:{"text":"A.","voice":"en-US-GuyNeural"}},args)
        self.assertEqual(text,"A.");self.assertEqual(profile["voice"],"en-US-GuyNeural")

    def test_current_library_configuration_has_no_missing_or_manual_clips(self):
        profiles=json.loads((audio.ROOT / "tools/audio-voices.json").read_text(encoding="utf-8"))
        overrides=json.loads((audio.ROOT / "tools/audio-pronunciation.json").read_text(encoding="utf-8"))
        args=argparse.Namespace(voice=None,rate=None,pitch=None)
        for row in audio.load_entries():
            text,profile=audio.synthesis(row,profiles,overrides,args)
            self.assertIsInstance(text,str);self.assertTrue(text.strip(),row["file"])
            if row["file"].endswith('/titik/A.mp3'):
                self.assertEqual(text,'A.');self.assertEqual(profile['voice'],'en-US-GuyNeural')

    async def test_preserves_existing_recordings_and_uses_overrides(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            for name in ["tools", "docs/voice-scripts"]:
                (root / name).mkdir(parents=True)
            names = ["bilog", "pula"]
            rows = [{"character":"Likha", "file":f"assets/audio/fil/shared/likha/{name}.mp3", "text":name, "synthesisText":name, "requiresReview":False, "sources":[]} for name in names]
            (root / "docs/voice-scripts/audio-manifest.json").write_text(json.dumps({"entries":rows}))
            profile = {"Likha":{"voice":"fil-PH-BlessicaNeural", "rate":"-5%", "pitch":"+8Hz"}}
            (root / "tools/audio-voices.json").write_text(json.dumps(profile))
            (root / "tools/audio-pronunciation.json").write_text(json.dumps({rows[1]["file"]:"Pula."}))
            existing = audio.safe_destination(root, rows[0]);existing.parent.mkdir(parents=True);existing.write_bytes(b"original human recording")
            calls = []
            async def voices():return [{"ShortName":"fil-PH-BlessicaNeural"}]
            class Communicate:
                def __init__(self, text, **kwargs):calls.append((text,kwargs))
                async def save(self, file):Path(file).write_bytes(b"ID3" + b"x" * 300)
            async def sleep(*args):pass
            args = argparse.Namespace(list_voices=False, all=True, samples=False, character=None, limit=None, voice=None, rate=None, pitch=None)
            fake = types.SimpleNamespace(list_voices=voices, Communicate=Communicate)
            with patch.object(audio, "ROOT", root),patch.dict("sys.modules", {"edge_tts":fake}),patch.object(audio.asyncio,"sleep",sleep):
                await audio.generate(args)
                await audio.generate(args)
            self.assertEqual(existing.read_bytes(), b"original human recording")
            self.assertEqual(len(calls),1)
            self.assertEqual(calls[0][0],"Pula.")
            self.assertEqual(calls[0][1]["voice"],"fil-PH-BlessicaNeural")
            self.assertTrue(audio.safe_destination(root,rows[1]).read_bytes().startswith(b"ID3"))

    async def test_phonics_refresh_backs_up_preview_and_preserves_real_human_recordings(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder)
            for directory in ["tools","docs/voice-scripts"]:(root / directory).mkdir(parents=True)
            rows=[{"character":"Titik","file":f"assets/audio/fil/shared/titik/{letter}.mp3","text":letter,"synthesisText":letter,"requiresReview":True,"sources":[]} for letter in ["A","B"]]
            (root / "docs/voice-scripts/audio-manifest.json").write_text(json.dumps({"entries":rows}))
            (root / "tools/audio-voices.json").write_text(json.dumps({"Titik":{"voice":"fil-PH-AngeloNeural","rate":"-10%","pitch":"+0Hz"}}))
            (root / "tools/audio-pronunciation.json").write_text(json.dumps({rows[0]["file"]:{"text":"Ah.","voice":"fil-PH-AngeloNeural"},rows[1]["file"]:None}))
            for row in rows:
                preview=audio.safe_destination(root / "audio-preview",row);preview.parent.mkdir(parents=True,exist_ok=True);preview.write_bytes(b"old generated preview")
            human=audio.safe_destination(root,rows[1]);human.parent.mkdir(parents=True,exist_ok=True);human.write_bytes(b"human consonant recording")
            calls=[]
            async def voices():return [{"ShortName":"fil-PH-AngeloNeural"}]
            class Communicate:
                def __init__(self,text,**kwargs):calls.append(text)
                async def save(self,file):Path(file).write_bytes(b"ID3"+b"x"*300)
            async def sleep(*args):pass
            args=argparse.Namespace(list_voices=False,all=False,samples=True,experiments=False,refresh_samples=True,character=None,limit=None,voice=None,rate=None,pitch=None)
            fake=types.SimpleNamespace(list_voices=voices,Communicate=Communicate)
            with patch.object(audio,"ROOT",root),patch.dict("sys.modules",{"edge_tts":fake}),patch.object(audio.asyncio,"sleep",sleep):
                await audio.generate(args)
                self.assertEqual(calls,["Ah."])
                self.assertFalse(audio.safe_destination(root / "audio-preview",rows[1]).exists())
                backups=list((root / "audio-preview/history").rglob("*.mp3"))
                self.assertEqual(len(backups),2);self.assertTrue(all(p.read_bytes()==b"old generated preview" for p in backups))
                gallery=(root / "audio-preview/index.html").read_text(encoding="utf-8")
                self.assertIn("?v=",gallery);self.assertIn("Wala pang recording",gallery)
                self.assertEqual(human.read_bytes(),b"human consonant recording")
                args.all=True;args.samples=False
                with self.assertRaises(ValueError):await audio.generate(args)
                args.refresh_samples=False
                await audio.generate(args)
            self.assertEqual(human.read_bytes(),b"human consonant recording")

    def test_rejects_paths_outside_shared_audio(self):
        with tempfile.TemporaryDirectory() as folder:
            for file in ["../outside.mp3", "assets/audio/fil/shared/../../outside.mp3", "elsewhere/a.mp3", "assets/audio/fil/shared/tala/a.js"]:
                with self.assertRaises(ValueError):audio.safe_destination(Path(folder),{"file":file})

if __name__ == "__main__":unittest.main()
