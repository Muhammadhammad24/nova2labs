"""
Imports the 3D service icons from service-icons-3d.zip and recolours them into
the site palette: the copper family becomes the brand cyan, the olive family
becomes teal, charcoal becomes navy slate and cream becomes cool white.

Writes <slug>.svg (dark theme) and <slug>-light.svg (light theme) into
public/icons/services/. In dark mode the ground shadow turns into a soft cyan
glow, and near-black details are lifted so they stay visible.

    python scripts/recolor-icons.py
"""
import io
import re
import zipfile

ZIP = "service-icons-3d.zip"
OUT = "public/icons/services"

FILES = {
    "ai-agents.svg": "ai-agents",
    "llm-nlp.svg": "llm-nlp",
    "full-stack-engineering.svg": "full-stack",
    "devops-devsecops.svg": "devops",
    "networking.svg": "networking",
    "it-infrastructure.svg": "it-infrastructure",
    "brand-product-design.svg": "graphic-design",
}

PALETTE = {
    # copper → brand cyan
    "#f0bd91": "#b6f4ff", "#eeb98c": "#a5f3fc", "#e3a874": "#67e8f9",
    "#c67139": "#06b6d4", "#c06c34": "#0891b2", "#b3602a": "#0e7490",
    "#96501f": "#0e7490", "#874823": "#155e75", "#7d4320": "#164e63",
    "#6b3818": "#083344",
    # olive → teal
    "#cfdcb0": "#b5f5e8", "#cbd7ab": "#a7f3e4", "#c8d4a9": "#99f6e4",
    "#bfcc9e": "#5eead4", "#b0bd8d": "#5eead4", "#8f9c76": "#2dd4bf",
    "#7a8a5e": "#14b8a6", "#5a6844": "#0f766e", "#566340": "#0f766e",
    "#4f5c39": "#115e59", "#3f4a2c": "#134e4a",
    # charcoal → navy slate
    "#5a5652": "#334155", "#3c3936": "#1e293b", "#201e1d": "#0f172a",
    "#151413": "#0b1220",
    # cream → cool white
    "#f7eddc": "#ecfeff", "#f5ead8": "#ecfeff", "#d8caae": "#cbd5e1",
    "#bdae92": "#94a3b8",
}


def clean(svg: str) -> str:
    svg = re.sub(r"<\?xml[^>]*\?>\s*", "", svg)
    svg = re.sub(r'\s*data-dc-tpl="\d+"', "", svg)
    svg = re.sub(r">\s+<", "><", svg).strip()
    return svg + "\n"


def recolor(svg: str) -> str:
    return re.sub(r"#[0-9a-fA-F]{6}", lambda m: PALETTE.get(m.group(0).lower(), m.group(0)), svg)


def dark_variant(svg: str) -> str:
    # ground shadow → soft brand glow (a dark shadow disappears on a dark page)
    svg = re.sub(
        r'(<ellipse[^>]*?)fill="#0f172a" opacity="\.(?:18|2|22)"',
        r'\1fill="#22d3ee" opacity=".28"',
        svg,
    )
    # lift near-black swatch / details so they read against a dark background
    if 'id="bd-' in svg:
        svg = svg.replace('stop-color="#334155"', 'stop-color="#94a3b8"').replace('stop-color="#0b1220"', 'stop-color="#475569"')
    return svg


if __name__ == "__main__":
    z = zipfile.ZipFile(ZIP)
    for name, slug in FILES.items():
        base = recolor(clean(z.read(name).decode("utf-8")))
        for suffix, body in (("", dark_variant(base)), ("-light", base)):
            with io.open(f"{OUT}/{slug}{suffix}.svg", "w", encoding="utf-8", newline="\n") as f:
                f.write(body)
        leftovers = [c for c in set(re.findall(r"#[0-9a-fA-F]{6}", base.lower()))
                     if c not in PALETTE.values() and c not in ("#ffffff", "#000000")]
        print(f"{slug:18} ok{'  unmapped: ' + ', '.join(leftovers) if leftovers else ''}")
