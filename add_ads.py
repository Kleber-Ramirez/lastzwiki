#!/usr/bin/env python3
"""
Agrega el banner de BuffHub a las 44 páginas del acuerdo:
  1) <div id="ad-slot"></div> justo después de la sección de introducción (.wiki-intro)
  2) <script src="/ads.js"></script> antes de </body>

Uso (desde la carpeta raíz del sitio, la que contiene ads.js):
  python add_ads.py            -> SIMULACIÓN: muestra qué haría, no cambia nada
  python add_ads.py --apply    -> aplica los cambios

Es seguro ejecutarlo varias veces: si una página ya tiene el marcador o el script, la salta.
Reconoce la introducción de las páginas de inicio (.wiki-intro), las fichas de héroes (.heroe-header)
y las páginas de guía (section.intro).
Las páginas con otra estructura se reportan para hacerlas a mano.
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

# Patrones de "fin de la introducción". Cada uno: (regex de apertura, etiqueta que se cierra).
#  - Páginas de inicio: <section class="wiki-intro"> ... </section>
#  - Fichas de héroes:  <div class="heroe-header"> ... </div>  (tarjeta con imagen, nombre y datos)
#  - Páginas de guía:   <section class="intro"> ... </section>
#  - Temporadas:        <section id="introduccion"> ... </section>
#  - Listado de héroes: <div class="heroes-intro-wrap"> ... </div>
PATTERNS = [
    (re.compile(r'<section\b[^>]*class="[^"]*\bwiki-intro\b[^"]*"[^>]*>', re.IGNORECASE), "section"),
    (re.compile(r'<div\b[^>]*class="[^"]*\bheroe-header\b[^"]*"[^>]*>', re.IGNORECASE), "div"),
    # Páginas de guía (edificios, eventos, etc.): <section class="intro"> ... </section>
    (re.compile(r'<section\b[^>]*class="[^"]*(?<![\w-])intro(?![\w-])[^"]*"[^>]*>', re.IGNORECASE), "section"),
    # Páginas de temporada: <section class="s5-section" id="introduccion"> ... </section>
    (re.compile(r'<section\b[^>]*\bid="(?:introduccion|introduction|intro)"[^>]*>', re.IGNORECASE), "section"),
    # Listado de héroes: <div class="heroes-intro-wrap"> (título + cajas de estadísticas) ... </div>
    (re.compile(r'<div\b[^>]*class="[^"]*\bheroes-intro-wrap\b[^"]*"[^>]*>', re.IGNORECASE), "div"),
]


def _close_pos(text, start, tag):
    """Posición justo después de la etiqueta de cierre que equilibra la apertura (maneja anidación)."""
    tags = re.compile(r"<%s\b|</%s\s*>" % (tag, tag), re.IGNORECASE)
    depth = 1
    for t in tags.finditer(text, start):
        depth += -1 if t.group(0).startswith("</") else 1
        if depth == 0:
            return t.end()
    return None


def end_of_intro(text):
    """Posición justo después del bloque de introducción, o None si la página no tiene ninguno conocido."""
    for opener, tag in PATTERNS:
        m = opener.search(text)
        if m:
            pos = _close_pos(text, m.end(), tag)
            if pos is not None:
                return pos
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