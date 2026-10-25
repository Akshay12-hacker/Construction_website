# BuildCraft Processed Assets

This directory contains production transparent PNG and WebP assets produced by the automated asset processing pipeline.

## Directory Structure

```
assets-processed/
├── png/                  # High-quality transparent PNGs (long side ≤ 2048px for Figma)
├── webp/                 # Compressed transparent WebPs (LANCZOS downscaled to maxW for web)
├── svg/                  # Clean vector traces for logo options
├── qa/                   # Quality Assurance contact sheets and sequence checks
│   ├── contact-sheet-light.png   (on #F5F3EE light background)
│   ├── contact-sheet-dark.png    (on #1F2326 dark background)
│   ├── contact-sheet-green.png   (on #00B140 green background for halo detection)
│   └── stage-sequence.png        (1x5 stage progression contact strip)
├── manifest.json         # Complete machine-readable asset manifest
└── README.md             # Asset documentation and catalog
```

## Processed Asset Catalog

| Slug | Category | Method | Dimensions | WebP Size | Aspect | Opaque | Source |
|---|---|---|---|---|---|---|---|
| `machine-crane` | machine | flood-fill | 810×783 | 84 KB | 1.0345 | No | `Stylized Yellow Tower Crane Render.png` |
| `machine-excavator` | machine | flood-fill | 810×804 | 91 KB | 1.0075 | No | `Yellow Excavator with Soil-Filled Bucket.png` |
| `machine-mixer` | machine | rembg | 1000×558 | 87 KB | 1.7921 | No | `Glossy Yellow Concrete Mixer Truck.png` |
| `machine-scaffold` | machine | flood-fill | 656×675 | 129 KB | 0.9719 | No | `Three-Tier Yellow Scaffold Tower.png` |
| `founder-clipboard` | person | rembg | 800×1169 | 88 KB | 0.6843 | No | `Confident Architect with Blueprints and Clipboard.png` |
| `founder-hardhat-arms-crossed` | person | rembg | 700×988 | 59 KB | 0.7085 | No | `Confident Engineer in Golden Light.png` |
| `founder-presenting` | person | rembg | 800×1443 | 86 KB | 0.5544 | No | `Friendly Engineer Presenting in Studio.png` |
| `founder-seated` | person | rembg | 800×1136 | 86 KB | 0.7042 | No | `Confident Construction Professional with Hard Hat.png` |
| `stage-1-aligned` | stage | uniform-alignment | 1020×729 | 150 KB | 1.3992 | No | `Aligned from stage-1-plot.png` |
| `stage-1-plot` | stage | rembg | 1020×487 | 168 KB | 2.0945 | No | `Isometric Construction Plot Diorama.png` |
| `stage-2-aligned` | stage | uniform-alignment | 1020×729 | 125 KB | 1.3992 | No | `Aligned from stage-2-foundation.png` |
| `stage-2-foundation` | stage | rembg | 1020×486 | 149 KB | 2.0988 | No | `Isometric Concrete Foundation Site.png` |
| `stage-3-aligned` | stage | uniform-alignment | 1020×729 | 154 KB | 1.3992 | No | `Aligned from stage-3-structure.png` |
| `stage-3-structure` | stage | rembg | 1020×670 | 185 KB | 1.5224 | No | `Isometric Brick House Under Construction.png` |
| `stage-4-aligned` | stage | uniform-alignment | 1400×1000 | 110 KB | 1.4 | No | `Aligned from stage-4-roof-windows.png` |
| `stage-4-roof-windows` | stage | rembg | 1400×879 | 124 KB | 1.5927 | No | `Modern Concrete House Construction Diorama.png` |
| `stage-5-aligned` | stage | uniform-alignment | 1020×729 | 177 KB | 1.3992 | No | `Aligned from stage-5-finished.png` |
| `stage-5-finished` | stage | rembg | 992×734 | 215 KB | 1.3515 | No | `Modern Luxury Villa Garden Diorama.png` |
| `extra-pool` | project | rembg | 900×571 | 126 KB | 1.5762 | No | `Modern Tropical Backyard Plunge Pool.png` |
| `house-model-blueprint` | project | rembg | 1200×749 | 144 KB | 1.6021 | No | `Modern House Model with Blueprint Tools.png` |
| `project-courtyard-villa` | project | rembg | 1020×646 | 229 KB | 1.5789 | No | `Modern Courtyard Villa at Dusk.png` |
| `project-golden-terrace-villa` | project | rembg | 1020×615 | 216 KB | 1.6585 | No | `Golden-Hour Modern Villa Diorama.png` |
| `project-haven-bungalow` | project | rembg | 1020×486 | 174 KB | 2.0988 | No | `Warm Contemporary Bungalow Exterior.png` |
| `project-modern-family-villa` | project | rembg | 994×640 | 174 KB | 1.5531 | No | `Warm Modern Villa Diorama.png` |
| `project-twin-duplex` | project | rembg | 1005×639 | 216 KB | 1.5728 | No | `Modern Duplex Homes at Sunset.png` |
| `explode-wall-layers` | material | rembg | 729×710 | 103 KB | 1.0268 | No | `Exploded Wall Foundation Cross-Section.png` |
| `material-bricks-cement` | material | rembg | 900×517 | 87 KB | 1.7408 | No | `Clay Bricks and Cement Bags.png` |
| `material-concrete` | material | rembg | 800×488 | 56 KB | 1.6393 | No | `Floating Concrete Slab Render.png` |
| `material-glass` | material | rembg | 800×447 | 53 KB | 1.7897 | No | `Floating Glass Panel.png` |
| `material-marble` | material | rembg | 800×442 | 50 KB | 1.81 | No | `Floating Polished Marble Slab.png` |
| `material-oak` | material | rembg | 800×452 | 41 KB | 1.7699 | No | `Floating Oak Wood Plank.png` |
| `material-rebar-cage` | material | flood-fill | 729×444 | 85 KB | 1.6419 | No | `Warmly Lit Reinforced Rebar Cage.png` |
| `material-steel-beams` | material | flood-fill | 900×779 | 91 KB | 1.1553 | No | `Steel Beams and Columns in Warm Light.png` |
| `material-tile` | material | rembg | 800×462 | 57 KB | 1.7316 | No | `Geometric Marble Tile Slab.png` |
| `material-wheelbarrow` | material | rembg | 900×486 | 71 KB | 1.8519 | No | `Weathered Wheelbarrow Filled with Wet Cement.png` |
| `tool-blueprint` | tool | rembg | 729×460 | 86 KB | 1.5848 | No | `Architectural Blueprint with Drafting Tools.png` |
| `tool-hammer` | tool | flood-fill | 700×500 | 31 KB | 1.4 | No | `Floating Claw Hammer Product Render.png` |
| `tool-hardhat` | tool | rembg | 700×519 | 34 KB | 1.3487 | No | `Glossy Yellow Construction Hard Hat.png` |
| `tool-level` | tool | flood-fill | 800×318 | 29 KB | 2.5157 | No | `Floating Yellow Box Level.png` |
| `tool-tape-measure` | tool | flood-fill | 700×487 | 40 KB | 1.4374 | No | `Red and Black Tape Measure Render.png` |
| `room-shelf` | room | rembg | 583×767 | 137 KB | 0.7601 | No | `Modern Oak Architectural Display Shelf.png` |
| `room-sofa-set` | room | rembg | 1000×515 | 93 KB | 1.9417 | No | `Modern Sage Sofa Living Room Set.png` |
| `room-wall-art` | room | rembg | 1000×595 | 93 KB | 1.6807 | No | `Framed Architectural Art Collection.png` |
| `sky-birds` | sky | flood-fill | 800×325 | 24 KB | 2.4615 | No | `Origami Birds in Flight.png` |
| `sky-clouds` | sky | rembg | 900×567 | 38 KB | 1.5873 | No | `Sunlit Trio of Fluffy Clouds.png` |
| `sky-island` | sky | rembg | 656×743 | 140 KB | 0.8829 | No | `Floating Island Waterfall Diorama.png` |
| `badge-laurel` | badge | rembg | 540×532 | 44 KB | 1.015 | No | `Luxury Architectural Laurel Emblem.png` |
| `extra-lantern` | badge | flood-fill | 450×499 | 40 KB | 0.9018 | No | `Warm Glow Garden Lantern.png` |
| `logo-option-1` | logo | crop-split | 400×329 | 8 KB | 1.2158 | No | `Minimalist Geometric House Logo Set.png` |
| `logo-option-2` | logo | crop-split | 400×319 | 12 KB | 1.2539 | No | `Minimalist Geometric House Logo Set.png` |
| `logo-option-3` | logo | crop-split | 400×341 | 9 KB | 1.173 | No | `Minimalist Geometric House Logo Set.png` |
| `service-renovation` | service | rembg | 810×563 | 86 KB | 1.4387 | No | `Renovation Before and After Diorama.png` |
| `explode-xray-house` | special | opaque-rounded | 1400×933 | 144 KB | 1.5005 | Yes | `X-Ray Modern House with Glowing Utilities.png` |
| `fx-stardust` | special | luminance-alpha | 920×613 | 229 KB | 1.5008 | No | `Golden Stardust Wave.png` |
| `room-window-view` | special | opaque | 1382×921 | 137 KB | 1.5005 | Yes | `Golden Window View of Modern Villas.png` |
