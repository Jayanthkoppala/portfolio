#!/usr/bin/env python3
"""Build public/og.png from the generated rooftop plate.

The plate (scripts/assets/og-plate.png) is an illustrated night rooftop
rendered in the site palette. This script crops it to the Open Graph
aspect ratio, pushes the site's own Bayer 8x8 ordered dither over it so
the card grains the same way the hero does, and composites the name.

The dither is a direct port of the shader in src/components/Dither.tsx
(ditherFragmentShader). The hero runs it at colorNum=4 / bias=0.2 over a
smooth noise field; those values obliterate a detailed illustration, so
the defaults here keep the Bayer texture and drop the crush.

    python3 scripts/build-og.py                 # name on the card
    python3 scripts/build-og.py --no-type       # art only
"""

import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PLATE = ROOT / "scripts" / "assets" / "og-plate.png"
FONT = ROOT / "scripts" / "assets" / "Anton-Regular.ttf"
OUT = ROOT / "public" / "og.png"

OG_W, OG_H = 1200, 630
INK = (244, 244, 242)  # --bg from globals.css, the site's off-white

# src/components/Dither.tsx:117-126
BAYER8 = np.array(
    [
        [0, 48, 12, 60, 3, 51, 15, 63],
        [32, 16, 44, 28, 35, 19, 47, 31],
        [8, 56, 4, 52, 11, 59, 7, 55],
        [40, 24, 36, 20, 43, 27, 39, 23],
        [2, 50, 14, 62, 1, 49, 13, 61],
        [34, 18, 46, 30, 33, 17, 45, 29],
        [10, 58, 6, 54, 9, 57, 5, 53],
        [42, 26, 38, 22, 41, 25, 37, 21],
    ],
    dtype=np.float64,
) / 64.0


def crop_to_og(img):
    """Crop to the OG ratio, taking the loss off the top.

    The plate is 1344x768 (1.75:1); OG wants 1.905:1, i.e. 1344x705. The
    63 surplus rows are empty sky, and the composition's weight (desk,
    chair, reflection) sits low, so trimming from the top is free.
    """
    w, h = img.size
    target_h = round(w / (OG_W / OG_H))
    if target_h <= h:
        img = img.crop((0, h - target_h, w, h))
    else:
        target_w = round(h * (OG_W / OG_H))
        left = (w - target_w) // 2
        img = img.crop((left, 0, left + target_w, h))
    return img.resize((OG_W, OG_H), Image.LANCZOS)


def dither(img, color_num, pixel_size, bias, strength):
    """Port of ditherFragmentShader in src/components/Dither.tsx."""
    base = img
    if pixel_size > 1:
        small = img.resize(
            (OG_W // pixel_size, OG_H // pixel_size), Image.BILINEAR
        )
        base = small.resize((OG_W, OG_H), Image.NEAREST)

    arr = np.asarray(base, dtype=np.float64) / 255.0
    h, w, _ = arr.shape

    # The shader indexes the matrix by pixelated coordinate, not raw uv.
    ys, xs = np.mgrid[0:h, 0:w]
    if pixel_size > 1:
        ys, xs = ys // pixel_size, xs // pixel_size
    threshold = BAYER8[ys % 8, xs % 8] - 0.25

    step = 1.0 / (color_num - 1.0)
    out = arr + threshold[..., None] * step
    out = np.clip(out - bias, 0.0, 1.0)
    out = np.floor(out * (color_num - 1.0) + 0.5) / (color_num - 1.0)

    # Full strength quantises the illustration into poster bands. Blending
    # back toward the plate keeps the grain and returns the detail.
    src = np.asarray(img, dtype=np.float64) / 255.0
    out = src * (1.0 - strength) + out * strength
    return Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))


def grain(img, amount, seed=7):
    if amount <= 0:
        return img
    rng = np.random.default_rng(seed)
    arr = np.asarray(img, dtype=np.float64)
    noise = rng.normal(0.0, amount * 255.0, (OG_H, OG_W, 1))
    return Image.fromarray(
        np.clip(arr + noise, 0, 255).astype(np.uint8)
    )


def draw_type(img, size, left, top, leading, opacity):
    """Name only, stacked, in the empty dark sky on the left."""
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    font = ImageFont.truetype(str(FONT), size)
    fill = (*INK, round(255 * opacity))
    for i, line in enumerate(("JAYANTH", "KOPPALA")):
        draw.text((left, top + i * round(size * leading)), line, font=font, fill=fill)
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--plate", type=Path, default=PLATE)
    p.add_argument("--out", type=Path, default=OUT)
    p.add_argument("--no-type", action="store_true")
    p.add_argument("--color-num", type=int, default=8)
    p.add_argument("--pixel-size", type=int, default=2)
    p.add_argument("--bias", type=float, default=0.0)
    p.add_argument("--strength", type=float, default=0.55)
    p.add_argument("--grain", type=float, default=0.012)
    p.add_argument("--type-size", type=int, default=96)
    p.add_argument("--type-left", type=int, default=76)
    p.add_argument("--type-top", type=int, default=96)
    p.add_argument("--type-leading", type=float, default=0.88)
    p.add_argument("--type-opacity", type=float, default=0.94)
    p.add_argument("--colors", type=int, default=256, help="0 disables quantising")
    a = p.parse_args()

    img = Image.open(a.plate).convert("RGB")
    img = crop_to_og(img)
    img = dither(img, a.color_num, a.pixel_size, a.bias, a.strength)
    img = grain(img, a.grain)
    if not a.no_type:
        img = draw_type(
            img, a.type_size, a.type_left, a.type_top, a.type_leading, a.type_opacity
        )

    a.out.parent.mkdir(parents=True, exist_ok=True)
    if a.colors:
        # Dither noise defeats PNG's row filters, so the truecolour file runs
        # over a megabyte. The art is three colours in practice, so an
        # adaptive palette costs nothing visible and saves ~90% of the bytes.
        img = img.quantize(colors=a.colors, method=Image.MEDIANCUT, dither=Image.NONE)
    img.save(a.out, "PNG", optimize=True)
    print(f"{a.out}  {img.size[0]}x{img.size[1]}  {a.out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
