"""
Extrae el logotipo oficial APT de su fondo blanco para obtener una version
con canal alfa transparente. No redibuja, no recolorea, no deforma:
unicamente vuelve transparentes los pixeles de fondo (blanco/casi blanco)
conservando intactos los pixeles del logotipo original.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "brand" / "apt-logo-original.jpg"
OUT_DIR = ROOT / "public" / "brand"
APP_DIR = ROOT / "app"

img = Image.open(SRC).convert("RGBA")
datas = img.getdata()

new_data = []
threshold = 235  # solo blanco/casi blanco puro se vuelve transparente
for r, g, b, a in datas:
    if r >= threshold and g >= threshold and b >= threshold:
        new_data.append((r, g, b, 0))
    else:
        new_data.append((r, g, b, a))

img.putdata(new_data)

bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save(OUT_DIR / "apt-logo.png")

size = max(img.size)
square = Image.new("RGBA", (size, size), (0, 0, 0, 0))
square.paste(img, ((size - img.width) // 2, (size - img.height) // 2), img)

for px in (32, 180, 512):
    resized = square.resize((px, px), Image.LANCZOS)
    resized.save(OUT_DIR / f"apt-icon-{px}.png")

square.resize((512, 512), Image.LANCZOS).save(APP_DIR / "icon.png")
square.resize((180, 180), Image.LANCZOS).save(APP_DIR / "apple-icon.png")

print("done", img.size, "ratio", round(img.width / img.height, 4))
