# Reglas del proyecto — lastzwiki.com

Wiki no oficial de "Last Z: Survival Shooter". Arquitectura JAMstack estática
(HTML/CSS/JS, GitHub Pages), 3 versiones de idioma.

## Estructura de idiomas
- Español = raíz (`index.html`, `edificios.html`, etc.)
- Inglés = `/en/` (mismos nombres de archivo, contenido traducido)
- Portugués = `/pt/` (mismos nombres de archivo que ES/EN — NUNCA traducir
  el slug del archivo, solo el contenido visible y el texto de navegación)

## Rosa Semanal (actualización todos los lunes)

Vive en el bloque `<div class="apocalypse-bar">` dentro de:
- `index.html`
- `en/index.html`
- `pt/index.html`

Se edita SOLO dentro del comentario `⬇️ EDITAR CADA LUNES ⬆️`, en el
`<script>` al final del archivo, cambiando estas 3 constantes:
- `rosaCantidad` (número, igual en los 3 idiomas)
- `rosaBuff` (texto del beneficio, traducido a cada idioma)
- `rosaDuracion` (texto de duración, traducido a cada idioma — ver nota QA)

**Nunca tocar:** la lógica de `updateApocClock()`, el reloj de hora
apocalipsis, ni el HTML fuera de ese bloque.

**Nota QA:** en `en/index.html`, `rosaDuracion` quedó como `"2 hs"` sin
traducir (debería ser `"2 hrs"`). Al editar, siempre traducir también
`rosaDuracion` — no asumir que quedó bien en versiones anteriores.

## Catálogo de buffs de la Rosa Semanal

CONFIRMADO: solo existen 6 tipos de buff, y cada uno es un paquete
COMPLETAMENTE FIJO (nombre + % + duración). Nada de esto varía semana a
semana — lo único variable en el sitio es (a) cuál de los 6 buffs está
activo esa semana y (b) la cantidad de rosas (1 al 10).

⚠️ Las columnas EN y PT son SUGERENCIAS marcadas como "sugerido — confirmar
con el usuario" hasta que él las valide contra el resto del sitio
(laboratory.html, edificios.html). Una vez confirmadas, quitar la marca.

| # | Español (fijo)                  | % fijo | Duración fija | Inglés (sugerido)     | Portugués (sugerido)   |
|---|-----------------------------------|:---:|:---:|--------------------------|----------------------------|
| 1 | Ataque de la Tropa                 | +10% | 2 hs  | Troop Attack             | Ataque da Tropa            |
| 2 | Tiempo de Ayuda de Aliado          | +120s | 24 hs | Ally Help Time           | Tempo de Ajuda de Aliado   |
| 3 | Capacidad de Carga de la Tropa     | +15% | 24 hs | Troop Load Capacity      | Capacidade de Carga da Tropa |
| 4 | Aceleración de Recolección         | +30% | 24 hs | Gathering Speed          | Aceleração de Coleta       |
| 5 | Aceleración de Investigación        | +20% | 2 hs  | Research Speed           | Aceleração de Pesquisa     |
| 6 | Aceleración de Construcción         | +20% | 2 hs  | Construction Speed       | Aceleração de Construção   |

### Formato del mensaje semanal del usuario (simplificado)
Ahora el usuario solo necesita dar 2 datos — el número de rosas y CUÁL de
los 6 buffs salió. La IA completa el % y la duración desde la tabla, NUNCA
desde lo que escriba el usuario (salvo corrección explícita):

```
Rosa: 6 | Buff: Ataque de la Tropa
```

o incluso más corto, por número de fila:

```
Rosa: 6 | Buff: #1
```

Si el usuario menciona un % o duración que no coincide con la tabla, la IA
debe señalarlo explícitamente antes de editar ("Este % no coincide con el
registrado para este buff, ¿lo corrijo en la tabla o fue un error de
tipeo?") — nunca sobrescribir la tabla en silencio.

## Glosario general (otros términos recurrentes)

| Español              | Inglés          | Portugués |
|-----------------------|-----------------|-----------|
| rosas                  | roses           | *(pendiente)* |
| hs (horas)             | hrs             | *(pendiente)* |

## Archivos que NUNCA se deben modificar
- `menu.js`
- `responsive.css`

## Reglas de AdSense (crítico)
- Nunca usar `display:none` ni `<template>` para ocultar contenido de forma
  permanente — los bots de AdSense no lo indexan.
- Si algo debe estar colapsado visualmente pero visible para crawlers, usar
  `max-height:0; overflow:hidden` en su lugar.
- Todo contenido informativo relevante debe existir como HTML estático,
  no inyectado solo por JS.

## Variables CSS del sitio (no reinventar, siempre reutilizar)
```css
--fondo: #0e0e0e;
--primario: #8a0303;
--secundario: #262626;
--texto: #ffffff;
--acento: #c41e3a;
--muted: #999;
```

## Tracking (no eliminar ni duplicar)
- GTM: GTM-PXVTLS5T
- GA: G-D52HENZW9L
- AdSense publisher ID: ca-pub-5000420044416855