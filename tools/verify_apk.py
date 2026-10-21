"""Check APK archive integrity and compare bundled web/audio bytes to source."""
import hashlib
import json
from pathlib import Path
import sys
import zipfile

root = Path(__file__).resolve().parents[1]
apk = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "builds/TALA-debug.apk"
expected = [root / name for name in ["index.html", "manifest.webmanifest", "sw.js"]]
for folder in ["js", "css", "assets"]:
    expected.extend(p for p in (root / folder).rglob("*") if p.is_file() and p.suffix.lower() not in [".md", ".partial"])
manifest = json.loads((root / "docs/voice-scripts/audio-manifest.json").read_text(encoding="utf-8"))
with zipfile.ZipFile(apk) as archive:
    assert archive.testzip() is None, "Corrupt APK ZIP entry"
    names = set(archive.namelist())
    assert "AndroidManifest.xml" in names and "classes.dex" in names
    for source in expected:
        entry = "assets/public/" + source.relative_to(root).as_posix()
        assert entry in names, "Missing bundled file: " + entry
        assert archive.read(entry) == source.read_bytes(), "Outdated bundled file: " + entry
    for row in manifest["entries"]:
        assert "assets/public/" + row["file"] in names, "Missing recording: " + row["file"]
    for entry in names:
        if entry.startswith("assets/public/"):
            assert not any(part in entry.split("/") for part in [".git", ".tools", ".venv-audio", "node_modules", "tests", "docs"]), "Development content leaked: " + entry
print(json.dumps({"apk":str(apk), "verifiedSourceFiles":len(expected), "recordings":len(manifest["entries"]), "megabytes":round(apk.stat().st_size / 1048576, 2), "sha256":hashlib.sha256(apk.read_bytes()).hexdigest()}, indent=2))
