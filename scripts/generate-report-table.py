import json

with open('assets-processed/manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

print(f"Total entries: {len(manifest)}")
for x in manifest:
    slug = x['slug']
    cat = x.get('category', '')
    met = x.get('method', '')
    w, h = x['width'], x['height']
    kb = x['kb']
    notes = x.get('notes', '')
    print(f"| `{slug}` | {cat} | {met} | {w}×{h} | {kb} KB | **PASS** | {notes} |")
