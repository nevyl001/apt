"""
Extrae el logotipo oficial APT de su fondo blanco para obtener una version
con canal alfa transparente. No redibuja, no recolorea, no deforma:
unicamente vuelve transparentes los pixeles de fondo (blanco/casi blanco)
conservando intactos los pixeles del logotipo original.
"""
from PIL import Image
import sys

SRC = "/Users/nevyldev/Documents/ATPADEL/brand/WhatsApp Image 2026-07-06 at 19.51.53.jpeg"
OUT_DIR = "/Users/nevyldev/Documents/ATPADEL/brand/processed"

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

# recorte al bounding box del contenido no transparente
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save(f"{OUT_DIR}/apt-logo.png")

# Favicon / touch icon (fondo transparente, cuadrado, con margen)
size = max(img.size)
square = Image.new("RGBA", (size, size), (0, 0, 0, 0))
square.paste(img, ((size - img.width) // 2, (size - img.height) // 2), img)

for px in (32, 180, 512):
    resized = square.resize((px, px), Image.LANCZOS)
    resized.save(f"{OUT_DIR}/apt-icon-{px}.png")

print("done", img.size)
