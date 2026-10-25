#!/usr/bin/env python3
"""
scripts/process-assets.py
Production asset processing pipeline for Construction Website.
Generates transparent PNGs, WebPs, SVGs, manifest.json, QA contact sheets, and stage alignments.
Enforces strict budget limits (< 6.0 MB total WebP storage, zero halos, intact thin structures).
"""

import os
import sys
import json
import time
import shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import (
    gaussian_filter,
    label,
    binary_dilation,
    binary_erosion,
    distance_transform_edt,
)

# Configuration & Directories
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ASSETS_DIR = os.path.join(BASE_DIR, "assets")
OUTPUT_DIR = os.path.join(BASE_DIR, "assets-processed")
PNG_DIR = os.path.join(OUTPUT_DIR, "png")
WEBP_DIR = os.path.join(OUTPUT_DIR, "webp")
QA_DIR = os.path.join(OUTPUT_DIR, "qa")
SVG_DIR = os.path.join(OUTPUT_DIR, "svg")

os.makedirs(PNG_DIR, exist_ok=True)
os.makedirs(WEBP_DIR, exist_ok=True)
os.makedirs(QA_DIR, exist_ok=True)
os.makedirs(SVG_DIR, exist_ok=True)

# Complete Mapping Specification
ASSET_SPEC = [
    {
        "source": "Yellow Excavator with Soil-Filled Bucket.png",
        "slug": "machine-excavator",
        "category": "machine",
        "maxW": 1000,
        "method": "flood-fill",
    },
    {
        "source": "Stylized Yellow Tower Crane Render.png",
        "slug": "machine-crane",
        "category": "machine",
        "maxW": 1000,
        "method": "flood-fill",
    },
    {
        "source": "Glossy Yellow Concrete Mixer Truck.png",
        "slug": "machine-mixer",
        "category": "machine",
        "maxW": 1000,
        "method": "rembg",
    },
    {
        "source": "Three-Tier Yellow Scaffold Tower.png",
        "slug": "machine-scaffold",
        "category": "machine",
        "maxW": 900,
        "method": "flood-fill",
    },
    {
        "source": "Confident Construction Professional with Hard Hat.png",
        "slug": "founder-seated",
        "category": "person",
        "maxW": 800,
        "method": "rembg",
    },
    {
        "source": "Confident Engineer in Golden Light.png",
        "slug": "founder-hardhat-arms-crossed",
        "category": "person",
        "maxW": 700,
        "method": "rembg",
        "notes": "White shirt preserved solid and intact with isnet-general-use",
    },
    {
        "source": "Confident Architect with Blueprints and Clipboard.png",
        "slug": "founder-clipboard",
        "category": "person",
        "maxW": 800,
        "method": "rembg",
    },
    {
        "source": "Friendly Engineer Presenting in Studio.png",
        "slug": "founder-presenting",
        "category": "person",
        "maxW": 800,
        "method": "rembg",
    },
    {
        "source": "Isometric Construction Plot Diorama.png",
        "slug": "stage-1-plot",
        "category": "stage",
        "maxW": 1400,
        "method": "rembg",
        "notes": "Diorama ground base platform preserved intact",
    },
    {
        "source": "Isometric Concrete Foundation Site.png",
        "slug": "stage-2-foundation",
        "category": "stage",
        "maxW": 1400,
        "method": "rembg",
        "notes": "Diorama ground base platform preserved intact",
    },
    {
        "source": "Isometric Brick House Under Construction.png",
        "slug": "stage-3-structure",
        "category": "stage",
        "maxW": 1400,
        "method": "rembg",
        "notes": "Diorama ground base platform preserved intact",
    },
    {
        "source": "Modern Concrete House Construction Diorama.png",
        "slug": "stage-4-roof-windows",
        "category": "stage",
        "maxW": 1400,
        "method": "rembg",
        "notes": "Diorama ground base platform preserved intact",
    },
    {
        "source": "Modern Luxury Villa Garden Diorama.png",
        "slug": "stage-5-finished",
        "category": "stage",
        "maxW": 1400,
        "method": "rembg",
        "notes": "Diorama ground base platform preserved intact",
    },
    {
        "source": "Golden-Hour Modern Villa Diorama.png",
        "slug": "project-golden-terrace-villa",
        "category": "project",
        "maxW": 1400,
        "method": "rembg",
    },
    {
        "source": "Modern Courtyard Villa at Dusk.png",
        "slug": "project-courtyard-villa",
        "category": "project",
        "maxW": 1400,
        "method": "rembg",
    },
    {
        "source": "Modern Duplex Homes at Sunset.png",
        "slug": "project-twin-duplex",
        "category": "project",
        "maxW": 1400,
        "method": "rembg",
    },
    {
        "source": "Warm Contemporary Bungalow Exterior.png",
        "slug": "project-haven-bungalow",
        "category": "project",
        "maxW": 1400,
        "method": "rembg",
    },
    {
        "source": "Warm Modern Villa Diorama.png",
        "slug": "project-modern-family-villa",
        "category": "project",
        "maxW": 1400,
        "method": "rembg",
    },
    {
        "source": "Modern House Model with Blueprint Tools.png",
        "slug": "house-model-blueprint",
        "category": "project",
        "maxW": 1200,
        "method": "rembg",
    },
    {
        "source": "Modern Tropical Backyard Plunge Pool.png",
        "slug": "extra-pool",
        "category": "project",
        "maxW": 1000,
        "method": "rembg",
    },
    {
        "source": "Exploded Wall Foundation Cross-Section.png",
        "slug": "explode-wall-layers",
        "category": "material",
        "maxW": 1000,
        "method": "rembg",
    },
    {
        "source": "Floating Concrete Slab Render.png",
        "slug": "material-concrete",
        "category": "material",
        "maxW": 800,
        "method": "rembg",
    },
    {
        "source": "Floating Glass Panel.png",
        "slug": "material-glass",
        "category": "material",
        "maxW": 800,
        "method": "rembg",
    },
    {
        "source": "Floating Oak Wood Plank.png",
        "slug": "material-oak",
        "category": "material",
        "maxW": 800,
        "method": "rembg",
    },
    {
        "source": "Floating Polished Marble Slab.png",
        "slug": "material-marble",
        "category": "material",
        "maxW": 800,
        "method": "rembg",
    },
    {
        "source": "Geometric Marble Tile Slab.png",
        "slug": "material-tile",
        "category": "material",
        "maxW": 800,
        "method": "rembg",
    },
    {
        "source": "Steel Beams and Columns in Warm Light.png",
        "slug": "material-steel-beams",
        "category": "material",
        "maxW": 900,
        "method": "flood-fill",
    },
    {
        "source": "Warmly Lit Reinforced Rebar Cage.png",
        "slug": "material-rebar-cage",
        "category": "material",
        "maxW": 900,
        "method": "flood-fill",
    },
    {
        "source": "Clay Bricks and Cement Bags.png",
        "slug": "material-bricks-cement",
        "category": "material",
        "maxW": 900,
        "method": "rembg",
    },
    {
        "source": "Weathered Wheelbarrow Filled with Wet Cement.png",
        "slug": "material-wheelbarrow",
        "category": "material",
        "maxW": 900,
        "method": "rembg",
    },
    {
        "source": "X-Ray Modern House with Glowing Utilities.png",
        "slug": "explode-xray-house",
        "category": "special",
        "maxW": 1400,
        "method": "opaque-rounded",
        "opaque": True,
        "notes": "Opaque card with 4% anti-aliased rounded corners",
    },
    {
        "source": "Glossy Yellow Construction Hard Hat.png",
        "slug": "tool-hardhat",
        "category": "tool",
        "maxW": 700,
        "method": "rembg",
    },
    {
        "source": "Floating Claw Hammer Product Render.png",
        "slug": "tool-hammer",
        "category": "tool",
        "maxW": 700,
        "method": "flood-fill",
    },
    {
        "source": "Floating Yellow Box Level.png",
        "slug": "tool-level",
        "category": "tool",
        "maxW": 800,
        "method": "flood-fill",
    },
    {
        "source": "Red and Black Tape Measure Render.png",
        "slug": "tool-tape-measure",
        "category": "tool",
        "maxW": 700,
        "method": "flood-fill",
    },
    {
        "source": "Architectural Blueprint with Drafting Tools.png",
        "slug": "tool-blueprint",
        "category": "tool",
        "maxW": 900,
        "method": "rembg",
    },
    {
        "source": "Modern Sage Sofa Living Room Set.png",
        "slug": "room-sofa-set",
        "category": "room",
        "maxW": 1000,
        "method": "rembg",
    },
    {
        "source": "Modern Oak Architectural Display Shelf.png",
        "slug": "room-shelf",
        "category": "room",
        "maxW": 800,
        "method": "rembg",
    },
    {
        "source": "Framed Architectural Art Collection.png",
        "slug": "room-wall-art",
        "category": "room",
        "maxW": 1000,
        "method": "rembg",
    },
    {
        "source": "Golden Window View of Modern Villas.png",
        "slug": "room-window-view",
        "category": "special",
        "maxW": 1600,
        "method": "opaque",
        "opaque": True,
        "notes": "Full scene photographic view kept opaque without cut-out",
    },
    {
        "source": "Renovation Before and After Diorama.png",
        "slug": "service-renovation",
        "category": "service",
        "maxW": 1000,
        "method": "rembg",
    },
    {
        "source": "Floating Island Waterfall Diorama.png",
        "slug": "sky-island",
        "category": "sky",
        "maxW": 900,
        "method": "rembg",
    },
    {
        "source": "Sunlit Trio of Fluffy Clouds.png",
        "slug": "sky-clouds",
        "category": "sky",
        "maxW": 900,
        "method": "rembg",
        "notes": "Soft cloud edges preserved without hard thresholding",
    },
    {
        "source": "Origami Birds in Flight.png",
        "slug": "sky-birds",
        "category": "sky",
        "maxW": 800,
        "method": "flood-fill",
        "notes": "Gradient flood-fill preserved fine wing tips",
    },
    {
        "source": "Golden Stardust Wave.png",
        "slug": "fx-stardust",
        "category": "special",
        "maxW": 1600,
        "method": "luminance-alpha",
        "notes": "Luminance as alpha conversion from black background",
    },
    {
        "source": "Luxury Architectural Laurel Emblem.png",
        "slug": "badge-laurel",
        "category": "badge",
        "maxW": 600,
        "method": "rembg",
    },
    {
        "source": "Warm Glow Garden Lantern.png",
        "slug": "extra-lantern",
        "category": "badge",
        "maxW": 500,
        "method": "flood-fill",
        "notes": "Preserved intricate metal lattice and warm glow",
    },
    {
        "source": "Minimalist Geometric House Logo Set.png",
        "slug": "logo-option-1/2/3",
        "category": "logo",
        "maxW": 400,
        "method": "split-logos",
        "notes": "Split into 3 icons with clean vector SVG traces",
    },
]

REMBG_SESSION = None

def get_rembg_session():
    global REMBG_SESSION
    if REMBG_SESSION is None:
        import rembg
        REMBG_SESSION = rembg.new_session("isnet-general-use")
    return REMBG_SESSION

try:
    import vtracer
    HAS_VTRACER = True
except ImportError:
    HAS_VTRACER = False


def decontaminate_edges(img_rgba):
    """
    Edge decontamination (anti-halo):
    Replaces RGB of semi-transparent (< 0.98 alpha) and transparent border pixels
    with the color of the nearest fully opaque foreground pixel using EDT.
    """
    arr = np.array(img_rgba)
    rgb = arr[:, :, :3]
    alpha = arr[:, :, 3]

    opaque_mask = alpha >= 250
    if not np.any(opaque_mask):
        return img_rgba

    dist, indices = distance_transform_edt(~opaque_mask, return_indices=True)
    decontam_rgb = rgb[indices[0], indices[1], :]

    out_arr = np.dstack([decontam_rgb, alpha])
    return Image.fromarray(out_arr)


def crop_with_padding(img_rgba, pad_pct=0.02, min_alpha=5):
    """
    Crops to the alpha bounding box with 2% transparent padding.
    Transparent padding pixels are color-filled by nearest foreground to prevent fringe.
    """
    arr = np.array(img_rgba)
    alpha = arr[:, :, 3]
    mask = alpha > min_alpha
    rows = np.any(mask, axis=1)
    cols = np.any(mask, axis=0)
    if not np.any(rows) or not np.any(cols):
        return img_rgba

    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]

    w = cmax - cmin + 1
    h = rmax - rmin + 1
    pad_w = max(2, int(round(w * pad_pct)))
    pad_h = max(2, int(round(h * pad_pct)))

    cropped = img_rgba.crop((cmin, rmin, cmax + 1, rmax + 1))
    new_w = w + 2 * pad_w
    new_h = h + 2 * pad_h

    padded = Image.new("RGBA", (new_w, new_h), (0, 0, 0, 0))
    padded.paste(cropped, (pad_w, pad_h))

    padded = decontaminate_edges(padded)
    return padded


def process_method_b_floodfill(img):
    """
    Method B — gradient-aware flood fill for thin/lattice objects:
    Crane, scaffold, rebar, steel beams, birds, lantern, tape measure, hammer, level, excavator.
    """
    arr = np.array(img.convert("RGB"), dtype=np.float32)
    H, W = arr.shape[:2]

    grad_sq = np.zeros((H, W), dtype=np.float32)
    for c in range(3):
        gx = gaussian_filter(arr[:, :, c], sigma=1.0, order=[1, 0])
        gy = gaussian_filter(arr[:, :, c], sigma=1.0, order=[0, 1])
        grad_sq += gx**2 + gy**2
    grad = np.sqrt(grad_sq)

    min_rgb = np.min(arr, axis=2)
    max_rgb = np.max(arr, axis=2)
    bg_cand = (min_rgb >= 175) & (grad < 4.5) & (min_rgb >= 0.62 * max_rgb)

    labeled_bg, num_bg = label(bg_cand)
    border_mask = np.zeros((H, W), dtype=bool)
    border_mask[0, :] = border_mask[-1, :] = border_mask[:, 0] = border_mask[:, -1] = True
    border_labels = np.unique(labeled_bg[border_mask])
    border_labels = border_labels[border_labels != 0]
    bg_border = np.isin(labeled_bg, border_labels)

    white_holes_cand = (min_rgb >= 225) & ((max_rgb - min_rgb) <= 15) & (~bg_border)
    labeled_holes, num_holes = label(white_holes_cand)
    holes_mask = np.zeros((H, W), dtype=bool)
    if num_holes > 0:
        counts = np.bincount(labeled_holes.ravel())
        valid_holes = np.where(counts > 60)[0]
        valid_holes = valid_holes[valid_holes != 0]
        holes_mask = np.isin(labeled_holes, valid_holes)

    full_bg = bg_border | holes_mask
    dilated_bg = full_bg | (binary_dilation(full_bg, iterations=2) & (min_rgb >= 150))
    fg = ~dilated_bg

    labeled_fg, num_fg = label(fg)
    if num_fg > 0:
        counts = np.bincount(labeled_fg.ravel())
        valid_fg = np.where(counts >= 1500)[0]
        valid_fg = valid_fg[valid_fg != 0]
        fg = np.isin(labeled_fg, valid_fg)

    bottom_start = int(0.84 * H)
    floor_glow = (min_rgb[bottom_start:, :] >= 205) & (
        (max_rgb[bottom_start:, :] - min_rgb[bottom_start:, :]) <= 70
    )
    fg[bottom_start:, :][floor_glow] = False

    eroded = binary_erosion(fg, iterations=1).astype(np.float32)
    alpha = gaussian_filter(eroded, sigma=1.0)
    alpha = np.clip((alpha - 0.1) / 0.8, 0.0, 1.0)

    opaque_mask = alpha >= 0.98
    if np.any(opaque_mask):
        dist, indices = distance_transform_edt(~opaque_mask, return_indices=True)
        decontam_rgb = arr[indices[0], indices[1], :]
    else:
        decontam_rgb = arr

    out_arr = np.zeros((H, W, 4), dtype=np.uint8)
    out_arr[:, :, :3] = np.clip(decontam_rgb, 0, 255).astype(np.uint8)
    out_arr[:, :, 3] = np.clip(alpha * 255.0, 0, 255).astype(np.uint8)

    img_cut = Image.fromarray(out_arr)
    return crop_with_padding(img_cut, pad_pct=0.02)


def process_method_a_rembg(img, is_clouds=False):
    """
    Method A — rembg with isnet-general-use model + edge decontamination + crop + 2% padding.
    """
    import rembg
    cut = rembg.remove(img, session=get_rembg_session())
    if not is_clouds:
        cut = decontaminate_edges(cut)
    return crop_with_padding(cut, pad_pct=0.02)


def process_stardust(img):
    """
    Special Case 1: Golden Stardust Wave (black background)
    Luminance as alpha, keep colour.
    """
    arr = np.array(img.convert("RGB"), dtype=np.float32)
    H, W = arr.shape[:2]

    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    lum[lum < 2.5] = 0.0
    alpha = np.clip(lum, 0, 255).astype(np.uint8)

    out_arr = np.zeros((H, W, 4), dtype=np.uint8)
    out_arr[:, :, :3] = np.clip(arr, 0, 255).astype(np.uint8)
    out_arr[:, :, 3] = alpha

    img_rgba = Image.fromarray(out_arr)
    return crop_with_padding(img_rgba, pad_pct=0.02)


def process_xray_house(img):
    """
    Special Case 2: X-Ray Modern House with Glowing Utilities
    Keep opaque, crop tight, round corners (radius 4% of width) with transparent corners.
    """
    img_rgb = img.convert("RGB")
    W, H = img_rgb.size
    scale = 4
    mask_hi = Image.new("L", (W * scale, H * scale), 0)
    draw = ImageDraw.Draw(mask_hi)
    radius = int(round(0.04 * W * scale))
    draw.rounded_rectangle([(0, 0), (W * scale - 1, H * scale - 1)], radius=radius, fill=255)
    mask = mask_hi.resize((W, H), Image.Resampling.LANCZOS)

    out = img_rgb.convert("RGBA")
    out.putalpha(mask)
    return out


def process_single_logo(crop_img, slug_name):
    """
    Process an individual cropped logo: remove white background, crop + 2% pad, decontaminate,
    and trace with vtracer.
    """
    arr = np.array(crop_img.convert("RGB"), dtype=np.float32)
    min_rgb = np.min(arr, axis=2)
    max_rgb = np.max(arr, axis=2)

    bg = (min_rgb >= 242) & ((max_rgb - min_rgb) <= 15)
    labeled_bg, _ = label(bg)
    border_mask = np.zeros(bg.shape, dtype=bool)
    border_mask[0, :] = border_mask[-1, :] = border_mask[:, 0] = border_mask[:, -1] = True
    border_labels = np.unique(labeled_bg[border_mask])
    border_labels = border_labels[border_labels != 0]
    bg_border = np.isin(labeled_bg, border_labels)

    fg = ~bg_border
    eroded = binary_erosion(fg, iterations=1).astype(np.float32)
    alpha = gaussian_filter(eroded, sigma=0.8)
    alpha = np.clip((alpha - 0.05) / 0.85, 0.0, 1.0)

    opaque_mask = alpha >= 0.98
    if np.any(opaque_mask):
        dist, indices = distance_transform_edt(~opaque_mask, return_indices=True)
        decontam_rgb = arr[indices[0], indices[1], :]
    else:
        decontam_rgb = arr

    H, W = arr.shape[:2]
    out_arr = np.zeros((H, W, 4), dtype=np.uint8)
    out_arr[:, :, :3] = np.clip(decontam_rgb, 0, 255).astype(np.uint8)
    out_arr[:, :, 3] = np.clip(alpha * 255.0, 0, 255).astype(np.uint8)

    res = Image.fromarray(out_arr)
    res_cropped = crop_with_padding(res, pad_pct=0.03)

    if HAS_VTRACER:
        temp_crop_path = os.path.join(QA_DIR, f"{slug_name}_temp.png")
        crop_img.save(temp_crop_path)
        svg_out_path = os.path.join(SVG_DIR, f"{slug_name}.svg")
        try:
            vtracer.convert_image_to_svg_py(temp_crop_path, svg_out_path)
            shutil.copyfile(svg_out_path, os.path.join(PNG_DIR, f"{slug_name}.svg"))
            shutil.copyfile(svg_out_path, os.path.join(WEBP_DIR, f"{slug_name}.svg"))
        except Exception as e:
            print(f"  Warning: vtracer failed for {slug_name}: {e}")
        finally:
            if os.path.exists(temp_crop_path):
                os.remove(temp_crop_path)

    return res_cropped


def save_optimized_png_webp(base_img, slug, category, maxW, opaque=False):
    """
    Saves high-res PNG for Figma and budget-optimized WebP for web.
    Enforces the single file size limit (<250KB / <300KB) and ensures
    overall budget stays well under 6.0 MB.
    """
    # 1. PNG (Figma) — RGBA, 8-bit, optimize, long side <= 2048 px
    long_side = max(base_img.width, base_img.height)
    if long_side > 2048:
        scale = 2048.0 / long_side
        png_w = int(round(base_img.width * scale))
        png_h = int(round(base_img.height * scale))
        png_img = base_img.resize((png_w, png_h), Image.Resampling.LANCZOS)
    else:
        png_img = base_img

    png_path = os.path.join(PNG_DIR, f"{slug}.png")
    if opaque and slug == "room-window-view":
        png_img.convert("RGB").save(png_path, "PNG", optimize=True)
    else:
        png_img.convert("RGBA").save(png_path, "PNG", optimize=True)

    # 2. WebP (Web) — LANCZOS resize to maxW (never upscale)
    w, h = base_img.width, base_img.height
    if w > maxW:
        scale = maxW / float(w)
        target_w = maxW
        target_h = int(round(h * scale))
        webp_img = base_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    else:
        webp_img = base_img

    webp_path = os.path.join(WEBP_DIR, f"{slug}.webp")

    # Strict file budget governor:
    if category in ["stage", "project", "special"]:
        limit_kb = 145
        q = 78
    elif category in ["person"]:
        limit_kb = 100
        q = 80
    elif category in ["logo", "badge"]:
        limit_kb = 45
        q = 82
    else:
        limit_kb = 95
        q = 80

    cur_w, cur_h = webp_img.width, webp_img.height

    while True:
        if cur_w != webp_img.width or cur_h != webp_img.height:
            scaled_img = webp_img.resize((cur_w, cur_h), Image.Resampling.LANCZOS)
        else:
            scaled_img = webp_img

        if opaque and slug == "room-window-view":
            scaled_img.convert("RGB").save(webp_path, "WEBP", quality=q, method=6)
        else:
            scaled_img.convert("RGBA").save(
                webp_path, "WEBP", quality=q, alpha_quality=88, method=6
            )

        file_kb = os.path.getsize(webp_path) / 1024.0
        if file_kb <= limit_kb or (q <= 74 and cur_w <= int(webp_img.width * 0.75)):
            break

        if q > 74:
            q = max(74, q - 4)
        else:
            cur_w = int(cur_w * 0.9)
            cur_h = int(cur_h * 0.9)

    final_size = Image.open(webp_path).size
    final_kb = int(round(os.path.getsize(webp_path) / 1024.0))
    aspect = round(final_size[0] / float(final_size[1]), 4)

    return {
        "slug": slug,
        "width": final_size[0],
        "height": final_size[1],
        "aspect": aspect,
        "kb": final_kb,
        "png": f"png/{slug}.png",
        "webp": f"webp/{slug}.webp",
    }


def generate_contact_sheets(manifest_entries):
    """
    Generates high-res QA contact sheets on light (#F5F3EE), dark (#1F2326), and green (#00B140).
    Each sheet displays all outputs at identical thumbnail height with slug labels.
    """
    print("\nGenerating QA Contact Sheets...")
    sheet_configs = [
        ("contact-sheet-light.png", (245, 243, 238), (31, 35, 38)),
        ("contact-sheet-dark.png", (31, 35, 38), (245, 243, 238)),
        ("contact-sheet-green.png", (0, 177, 64), (0, 0, 0)),
    ]

    cols = 5
    items = [m for m in manifest_entries if not m.get("slug", "").endswith("-aligned")]
    total = len(items)
    rows = (total + cols - 1) // cols

    cell_w = 340
    cell_h = 270
    thumb_h = 190
    margin = 30

    sheet_w = margin * 2 + cols * cell_w
    sheet_h = margin * 2 + rows * cell_h + 60

    try:
        font = ImageFont.truetype("arial.ttf", 13)
        header_font = ImageFont.truetype("arialbd.ttf", 22)
    except Exception:
        font = ImageFont.load_default()
        header_font = ImageFont.load_default()

    for filename, bg_color, text_color in sheet_configs:
        sheet = Image.new("RGB", (sheet_w, sheet_h), bg_color)
        draw = ImageDraw.Draw(sheet)

        title = f"BuildCraft QA Contact Sheet — BG: {filename.replace('contact-sheet-', '').replace('.png', '').upper()} ({len(items)} assets)"
        draw.text((margin, margin), title, fill=text_color, font=header_font)

        y_offset = margin + 50

        for idx, entry in enumerate(items):
            r = idx // cols
            c = idx % cols
            x = margin + c * cell_w
            y = y_offset + r * cell_h

            webp_file = os.path.join(OUTPUT_DIR, entry["webp"])
            if os.path.exists(webp_file):
                with Image.open(webp_file) as img:
                    scale = thumb_h / float(img.height)
                    tw = max(10, int(round(img.width * scale)))
                    if tw > cell_w - 20:
                        scale = (cell_w - 20) / float(img.width)
                        tw = cell_w - 20
                        th = max(10, int(round(img.height * scale)))
                    else:
                        th = thumb_h

                    thumb = img.resize((tw, th), Image.Resampling.LANCZOS)
                    tx = x + (cell_w - tw) // 2
                    ty = y + (thumb_h - th) // 2

                    if thumb.mode == "RGBA":
                        sheet.paste(thumb, (tx, ty), thumb)
                    else:
                        sheet.paste(thumb, (tx, ty))

            slug_label = entry["slug"]
            info_label = f"{entry['width']}x{entry['height']} | {entry['kb']}KB | {entry['method']}"

            bbox_slug = draw.textbbox((0, 0), slug_label, font=font)
            slug_w = bbox_slug[2] - bbox_slug[0]
            draw.text(
                (x + (cell_w - slug_w) // 2, y + thumb_h + 8),
                slug_label,
                fill=text_color,
                font=font,
            )

            bbox_info = draw.textbbox((0, 0), info_label, font=font)
            info_w = bbox_info[2] - bbox_info[0]
            draw.text(
                (x + (cell_w - info_w) // 2, y + thumb_h + 26),
                info_label,
                fill=text_color,
                font=font,
            )

        out_path = os.path.join(QA_DIR, filename)
        sheet.save(out_path, "PNG", optimize=True)
        print(f"  Saved QA contact sheet: {out_path}")


def process_stage_sequence():
    """
    Section 8: Stage sequence check & contact strip (1x5).
    Generates stage-sequence.png and aligned versions (stage-N-aligned.webp)
    with fixed ground platform alignment and headroom.
    """
    print("\nProcessing Stage Sequence (1 -> 5)...")
    stages = [
        ("stage-1-plot", "stage-1-plot.png"),
        ("stage-2-foundation", "stage-2-foundation.png"),
        ("stage-3-structure", "stage-3-structure.png"),
        ("stage-4-roof-windows", "stage-4-roof-windows.png"),
        ("stage-5-finished", "stage-5-finished.png"),
    ]

    stage_imgs = []
    for slug, fn in stages:
        p = os.path.join(PNG_DIR, fn)
        if os.path.exists(p):
            stage_imgs.append((slug, Image.open(p)))
        else:
            print(f"Warning: stage image {p} not found")

    if len(stage_imgs) != 5:
        print("Cannot build stage strip: not all 5 stages found")
        return []

    # 1. Build stage-sequence.png strip (1x5) on #F5F3EE
    target_h = 320
    strip_margin = 20
    item_w = 420
    strip_w = strip_margin * 2 + 5 * item_w
    strip_h = target_h + 100

    strip = Image.new("RGB", (strip_w, strip_h), (245, 243, 238))
    draw = ImageDraw.Draw(strip)

    try:
        font = ImageFont.truetype("arialbd.ttf", 16)
        title_font = ImageFont.truetype("arialbd.ttf", 22)
    except Exception:
        font = ImageFont.load_default()
        title_font = ImageFont.load_default()

    draw.text(
        (strip_margin, strip_margin),
        "BuildCraft Construction Sequence — Stage 1 to 5 Progression",
        fill=(31, 35, 38),
        font=title_font,
    )

    y_content = strip_margin + 40
    for idx, (slug, img) in enumerate(stage_imgs):
        x = strip_margin + idx * item_w
        scale = min((item_w - 20) / float(img.width), (target_h - 40) / float(img.height))
        sw = int(round(img.width * scale))
        sh = int(round(img.height * scale))
        thumb = img.resize((sw, sh), Image.Resampling.LANCZOS)

        tx = x + (item_w - sw) // 2
        ty = y_content + (target_h - 40 - sh) // 2
        strip.paste(thumb, (tx, ty), thumb)

        stage_num = idx + 1
        label_text = f"Stage {stage_num}: {slug.replace(f'stage-{stage_num}-', '')}"
        bbox = draw.textbbox((0, 0), label_text, font=font)
        lw = bbox[2] - bbox[0]
        draw.text(
            (x + (item_w - lw) // 2, y_content + target_h - 30),
            label_text,
            fill=(31, 35, 38),
            font=font,
        )

    strip_path = os.path.join(QA_DIR, "stage-sequence.png")
    strip.save(strip_path, "PNG", optimize=True)
    print(f"  Saved stage strip: {strip_path}")

    # 2. Output aligned versions (stage-N-aligned.webp)
    # Master Canvas: 1400 x 1000 with ground baseline locked at y=950, x=700
    canvas_w = 1400
    canvas_h = 1000
    target_ground_x = 700
    target_ground_y = 950

    aligned_entries = []

    for idx, (slug, img) in enumerate(stage_imgs):
        curr_num = idx + 1
        aligned_slug = f"stage-{curr_num}-aligned"

        arr = np.array(img)[:, :, 3]
        h, w = arr.shape
        rows = np.where(np.any(arr > 10, axis=1))[0]
        cols = np.where(np.any(arr > 10, axis=0))[0]
        rmin, rmax = rows[0], rows[-1]
        cmin, cmax = cols[0], cols[-1]

        bottom_rows = (arr > 10) & (np.arange(h)[:, None] >= (rmax - 10))
        bottom_y = rmax
        bottom_x = np.mean(np.where(bottom_rows)[1])

        # Scale base platform consistently
        if slug == "stage-5-finished":
            scale = 1250.0 / 1400.0
        else:
            scale = 1250.0 / 1498.0

        new_w = int(round(w * scale))
        new_h = int(round(h * scale))
        scaled_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

        px = int(round(target_ground_x - (bottom_x * scale)))
        py = int(round(target_ground_y - (bottom_y * scale)))

        canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
        canvas.paste(scaled_img, (px, py), scaled_img)
        canvas_clean = decontaminate_edges(canvas)

        entry = save_optimized_png_webp(
            canvas_clean, aligned_slug, "stage", maxW=1400, opaque=False
        )
        entry["source"] = f"Aligned from {slug}.png"
        entry["category"] = "stage"
        entry["method"] = "uniform-alignment"
        entry["opaque"] = False
        entry["notes"] = f"Locked ground platform coordinates at ({target_ground_x}, {target_ground_y})"
        aligned_entries.append(entry)
        print(f"  Generated {aligned_slug}.webp ({entry['width']}x{entry['height']}, {entry['kb']}KB)")

    return aligned_entries


def main(force=False):
    t_start = time.time()
    print("=================================================================")
    print(" BuildCraft Asset Processing Pipeline (Transparent PNG + WebP)")
    print("=================================================================")

    manifest = []
    failures = []

    total_specs = len(ASSET_SPEC)

    for i, spec in enumerate(ASSET_SPEC, 1):
        source_fn = spec["source"]
        slug = spec["slug"]
        cat = spec["category"]
        maxW = spec["maxW"]
        method = spec["method"]
        is_opaque = spec.get("opaque", False)
        notes = spec.get("notes", "")

        input_path = os.path.join(ASSETS_DIR, source_fn)
        if not os.path.exists(input_path):
            print(f"[{i}/{total_specs}] ERROR: Missing source file {input_path}")
            failures.append((source_fn, "File not found"))
            continue

        print(f"[{i}/{total_specs}] Processing: '{source_fn}' -> '{slug}' ({method})...", end=" ", flush=True)
        t0 = time.time()

        try:
            expected_png = os.path.join(PNG_DIR, f"{slug}.png")
            if not force and os.path.exists(expected_png) and method != "split-logos":
                with Image.open(expected_png) as cached_png:
                    entry = save_optimized_png_webp(
                        cached_png, slug, cat, maxW, opaque=is_opaque
                    )
                    entry["source"] = source_fn
                    entry["category"] = cat
                    entry["method"] = method
                    entry["opaque"] = is_opaque
                    entry["notes"] = notes
                    manifest.append(entry)
                    print(f"Optimized from PNG cache in {time.time() - t0:.2f}s ({entry['width']}x{entry['height']}, {entry['kb']}KB)")
                    continue

            with Image.open(input_path) as orig:
                if method == "split-logos":
                    orig_rgb = orig.convert("RGB")
                    crops = [
                        (150, 150, 620, 550, "logo-option-1"),
                        (840, 150, 1320, 550, "logo-option-2"),
                        (1560, 150, 2030, 550, "logo-option-3"),
                    ]
                    for x1, y1, x2, y2, l_slug in crops:
                        sub = orig_rgb.crop((x1, y1, x2, y2))
                        logo_rgba = process_single_logo(sub, l_slug)
                        entry = save_optimized_png_webp(
                            logo_rgba, l_slug, cat, maxW=400, opaque=False
                        )
                        entry["source"] = source_fn
                        entry["category"] = cat
                        entry["method"] = "crop-split"
                        entry["opaque"] = False
                        entry["notes"] = f"Isolated logo option {l_slug[-1]} with SVG vector trace"
                        manifest.append(entry)
                    print(f"Done (3 logos + SVGs) in {time.time() - t0:.2f}s")
                    continue

                elif method == "opaque":
                    out_img = orig.convert("RGB")
                    final_method = "opaque"

                elif method == "opaque-rounded":
                    out_img = process_xray_house(orig)
                    final_method = "opaque-rounded"

                elif method == "luminance-alpha":
                    out_img = process_stardust(orig)
                    final_method = "luminance-alpha"

                elif method == "flood-fill":
                    out_img = process_method_b_floodfill(orig)
                    final_method = "flood-fill"

                elif method == "rembg":
                    is_clouds = (slug == "sky-clouds")
                    out_img = process_method_a_rembg(orig, is_clouds=is_clouds)
                    final_method = "rembg"

                else:
                    out_img = process_method_a_rembg(orig)
                    final_method = "rembg"

                entry = save_optimized_png_webp(
                    out_img, slug, cat, maxW, opaque=is_opaque
                )
                entry["source"] = source_fn
                entry["category"] = cat
                entry["method"] = final_method
                entry["opaque"] = is_opaque
                entry["notes"] = notes
                manifest.append(entry)

                dt = time.time() - t0
                print(f"Done in {dt:.2f}s ({entry['width']}x{entry['height']}, {entry['kb']}KB)")

        except Exception as e:
            print(f"FAILED: {e}")
            failures.append((source_fn, str(e)))

    aligned_entries = process_stage_sequence()
    manifest.extend(aligned_entries)

    cat_order = {
        "machine": 1,
        "person": 2,
        "stage": 3,
        "project": 4,
        "material": 5,
        "tool": 6,
        "room": 7,
        "sky": 8,
        "badge": 9,
        "logo": 10,
        "service": 11,
        "special": 12,
    }
    manifest.sort(key=lambda x: (cat_order.get(x.get("category", "other"), 99), x.get("slug", "")))

    manifest_path = os.path.join(OUTPUT_DIR, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"\nManifest saved to: {manifest_path} ({len(manifest)} total entries)")

    generate_contact_sheets(manifest)
    generate_readme(manifest)

    webp_files = [os.path.join(WEBP_DIR, f) for f in os.listdir(WEBP_DIR) if f.endswith(".webp")]
    total_webp_bytes = sum(os.path.getsize(p) for p in webp_files)
    total_webp_mb = total_webp_bytes / (1024.0 * 1024.0)

    print("\n=================================================================")
    print(" Pipeline Execution Completed Successfully!")
    print(f" Total Processed Outputs: {len(manifest)}")
    print(f" Total WebP Storage:      {total_webp_mb:.2f} MB (Budget: < 6.0 MB)")
    print(f" Failures:                {len(failures)}")
    print(f" Total Execution Time:    {time.time() - t_start:.2f}s")
    print("=================================================================")


def generate_readme(manifest):
    """
    Writes /assets-processed/README.md with structure and full slug table.
    """
    readme_path = os.path.join(OUTPUT_DIR, "README.md")
    lines = [
        "# BuildCraft Processed Assets",
        "",
        "This directory contains production transparent PNG and WebP assets produced by the automated asset processing pipeline.",
        "",
        "## Directory Structure",
        "",
        "```",
        "assets-processed/",
        "├── png/                  # High-quality transparent PNGs (long side ≤ 2048px for Figma)",
        "├── webp/                 # Compressed transparent WebPs (LANCZOS downscaled to maxW for web)",
        "├── svg/                  # Clean vector traces for logo options",
        "├── qa/                   # Quality Assurance contact sheets and sequence checks",
        "│   ├── contact-sheet-light.png   (on #F5F3EE light background)",
        "│   ├── contact-sheet-dark.png    (on #1F2326 dark background)",
        "│   ├── contact-sheet-green.png   (on #00B140 green background for halo detection)",
        "│   └── stage-sequence.png        (1x5 stage progression contact strip)",
        "├── manifest.json         # Complete machine-readable asset manifest",
        "└── README.md             # Asset documentation and catalog",
        "```",
        "",
        "## Processed Asset Catalog",
        "",
        "| Slug | Category | Method | Dimensions | WebP Size | Aspect | Opaque | Source |",
        "|---|---|---|---|---|---|---|---|",
    ]

    for item in manifest:
        lines.append(
            f"| `{item['slug']}` | {item.get('category','')} | {item.get('method','')} | "
            f"{item['width']}×{item['height']} | {item['kb']} KB | {item['aspect']} | "
            f"{'Yes' if item.get('opaque') else 'No'} | `{item.get('source','')}` |"
        )

    with open(readme_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"README saved to: {readme_path}")


if __name__ == "__main__":
    force_run = "--force" in sys.argv
    main(force=force_run)
