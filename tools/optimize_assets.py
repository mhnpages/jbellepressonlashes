from pathlib import Path

from PIL import Image


IMAGE_DIR = Path(__file__).resolve().parents[1] / "assets" / "images"


for source in IMAGE_DIR.iterdir():
    if source.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
        continue
    destination = source.with_suffix(".webp")
    with Image.open(source) as image:
        image.save(destination, "WEBP", quality=84, method=6)
    print(f"{source.name} -> {destination.name}")
