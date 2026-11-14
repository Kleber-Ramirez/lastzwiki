#!/usr/bin/env python3
"""
Agrega el banner de BuffHub a las 44 páginas del acuerdo:
  1) <div id="ad-slot"></div> justo después de la sección de introducción (.wiki-intro)
  2) <script src="/ads.js"></script> antes de </body>

Uso (desde la carpeta raíz del sitio, la que contiene ads.js):
  python add_ads.py            -> SIMULACIÓN: muestra qué haría, no cambia nada
  python add_ads.py --apply    -> aplica los cambios

Es seguro ejecutarlo varias veces: si una página ya tiene el marcador o el script, la salta.
Las páginas que no tengan la sección .wiki-intro se reportan para hacerlas a mano.
"""
import re
import sys
from pathlib import Path

PAGES = [
    # Inglés (29)
    "en/index.html", "en/season-5.html", "en/heroes.html", "en/buildings.html",
    "en/events.html", "en/events-calendar.html", "en/laboratory.html",
    "en/season-4.html", "en/alliances.html", "en/workshop.html",
    "en/building-tierlist.html", "en/tips.html", "en/strategy.html",
    "en/beginner-guide.html", "en/season-3.html", "en/season-2.html",
    "en/store.html",
    "en/heroes/hero-lysia.html", "en/heroes/hero-katrina.html",
    "en/heroes/hero-bella.html", "en/heroes/hero-selena.html",
    "en/heroes/hero-oliveira.html", "en/heroes/hero-alma.html",
    "en/heroes/hero-nyx.html", "en/heroes/hero-laura.html",
    "en/heroes/hero-vivian.html", "en/heroes/hero-scarlett.html",
    "en/heroes/hero-evelyn.html", "en/heroes/hero-chinatsu.html",
    # Español (15)
    "index.html", "edificios.html", "heroes.html", "eventos.html",
    "temporada-5.html", "laboratorio.html", "tienda.html", "consejos.html",
    "temporada-4.html", "eventos-calendario.html", "taller.html",
    "alianzas.html", "temporada-2.html", "guia-principiantes.html",
    "temporada-3.html",
]

SLOT = '<div id="ad-slot"></div>'
SCRIPT = '<script src="/ads.js"></script>'

SECTION_TAG = re.compile(r"<section\b|</section\s*>", re.IGNORECASE)
INTRO_OPEN = re.compile(r'<section\b[^>]*class="[^"]*\bwiki-intro\b[^"]*"[^>]*>', re.IGNORECASE)


def end_of_intro(text):
    """Posición justo después del </section> que cierra la sección .wiki-intro."""
    m = INTRO_OPEN.search(text)
    if not m:
        return None
    depth = 1
    for t in SECTION_TAG.finditer(text, m.end()):
        depth += 1 if not t.group(0).startswith("</") else -1
        if depth == 0:
            return t.end()
    return None


def process(path, apply):
    raw = path.read_bytes().decode("utf-8")
    nl = "\r\n" if "\r\n" in raw else "\n"  # respeta los saltos de línea del archivo
    text = raw
    notes = []

    # 1) marcador
    if 'id="ad-slot"' in text:
        notes.append("slot ya estaba")
    else:
        pos = end_of_intro(text)
        if pos is None:
            notes.append("SIN INTRO: poner el ad-slot a mano")
        else:
            text = text[:pos] + nl + nl + "  " + SLOT + text[pos:]
            notes.append("slot agregado")

    # 2) script
    if re.search(r'src="[^"]*ads\.js', text):
        notes.append("script ya estaba")
    else:
        i = text.lower().rfind("</body>")
        if i == -1:
            notes.append("SIN </body>: poner el script a mano")
        else:
            text = text[:i] + "  " + SCRIPT + nl + text[i:]
            notes.append("script agregado")

    if apply and text != raw:
        path.write_bytes(text.encode("utf-8"))
    return notes


def main():
    apply = "--apply" in sys.argv
    root = Path(".")
    if not (root / "ads.js").exists():
        print("No encuentro ads.js aquí. Ejecuta el script desde la carpeta raíz del sitio (lastzwiki).")
        sys.exit(1)

    print("MODO:", "APLICANDO CAMBIOS" if apply else "SIMULACIÓN (no se modifica nada)")
    print("-" * 70)
    faltan = 0
    for n, page in enumerate(PAGES, 1):
        p = root / page
        if not p.exists():
            print(f"{n:>2}. {page:<34} NO EXISTE")
            faltan += 1
            continue
        notes = process(p, apply)
        if any(x.startswith("SIN") for x in notes):
            faltan += 1
        print(f"{n:>2}. {page:<34} " + "; ".join(notes))
    print("-" * 70)
    print(f"{len(PAGES)} páginas revisadas; {faltan} requieren atención manual.")
    if not apply:
        print("Si todo se ve bien, ejecuta:  python add_ads.py --apply")


if __name__ == "__main__":
    main()