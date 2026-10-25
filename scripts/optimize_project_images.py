from pathlib import Path

from PIL import Image


root = Path(__file__).resolve().parents[1] / "public" / "assets" / "projects"
sources = {
    "cowork.png": ("cowork.webp", 1600, 82),
    "tesla.png": ("tesla.webp", 1600, 82),
    "astro.png": ("astro.webp", 1600, 82),
    "espresso.jpg": ("espresso.webp", 1600, 80),
}

for source_name, (output_name, max_width, quality) in sources.items():
    with Image.open(root / source_name) as source:
        image = source.convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        image.save(root / output_name, "WEBP", quality=quality, method=6)
