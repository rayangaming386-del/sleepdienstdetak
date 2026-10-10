"""Maakt webp-versies in meerdere breedtes van de foto's in site/images/ (voor srcset)."""
import json, os
from PIL import Image

SRC = "src/foto-bron"
OUT = "site/images/foto"
photos = ["sleepwagens-nacht", "transport-nacht", "golf-oprijwagen", "sprinter-oprijplateau"]
widths = [480, 900, 1440]
os.makedirs(OUT, exist_ok=True)
manifest = {}
for name in photos:
    im = Image.open(f"{SRC}/{name}.jpg").convert("RGB")
    sizes = []
    for w in widths:
        if w > im.width:
            w = im.width
        if any(s["w"] == w for s in sizes):
            continue
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(f"{OUT}/{name}-{w}.webp", quality=78, method=6)
        sizes.append({"w": w, "h": h})
    manifest[name] = {"w": im.width, "h": im.height, "sizes": [s["w"] for s in sizes]}
json.dump(manifest, open("src/images.json", "w"), indent=1)
print(manifest)
