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

## Códigos de Regalo de la Tienda (actualización cuando sale código nuevo)

⚠️ EXCEPCIÓN al mapeo de nombres de archivo — esta página NO sigue la
regla general de "mismo nombre en los 3 idiomas":
- Español = `tienda.html`
- Inglés = `store.html` (dentro de `/en/`)
- Portugués = `loja.html` (dentro de `/pt/`)

### El código en sí NUNCA se traduce
El código de regalo (ej. `LZCORESTRENGTH`) es el mismo texto literal en
los 3 idiomas — es un dato global del juego, no de la wiki. Solo se
traducen: fechas, fuente, requisito, límite, texto del badge, y los
nombres de las recompensas.

### Estructura de una tarjeta
Vive dentro de `<div class="codigos-grid">`, en el bloque marcado por
`⬇️ EDITAR cuando cambien los códigos`. Cada tarjeta es un
`<div class="codigo-card [urgente|expirado]">` con: badge, código,
fecha, fuente, límite, requisito, verificado, y lista de recompensas.

### 🚨 REGLA CRÍTICA — Clases CSS SIEMPRE en español
Las clases `urgente` y `expirado` (y `codigo-badge urgente` /
`codigo-badge expirado`) son las ÚNICAS que existen en el CSS
(`tienda.css`/estilos embebidos) — el CSS está escrito una sola vez y se
comparte entre los 3 idiomas. **NUNCA usar `urgent`/`expired` en inglés**,
ni siquiera en `store.html`, aunque el resto del texto de esa tarjeta esté
en inglés — solo el texto es bilingüe, la clase CSS no.

**Bug conocido a corregir en la próxima edición:** en `en/store.html`, las
tarjetas `LZCORESTRENGTH` y `LEVELUPHIGHER` tienen las clases en inglés
(`urgent`/`expired`) por error — sin estilo visual aplicado. Corregirlas a
`urgente`/`expirado` la próxima vez que se edite ese archivo, aunque no
sean las tarjetas que se estén actualizando ese día.

### Formato de recompensas — regla estricta
Siempre `[emoji] [Nombre del ítem] x[cantidad]`, en el mismo orden que el
inglés. NUNCA mover el número dentro del nombre (ej. "100 Diamantes x1"
es INCORRECTO si el original dice "Diamonds x100" — debe ser
"Diamantes x100"). Si hay duda sobre la cantidad real, preguntar al
usuario antes de adivinar.

### Proceso semanal
1. Localizar la tarjeta actualmente activa (clase `urgente`) en los 3
   archivos.
2. Cambiarla a expirada: clase `urgente` → `expirado` en el div y en el
   badge; badge texto → "❌ Expired" / "❌ Expirado" / "❌ Expirado";
   reemplazar la línea de fecha "Valid/Válido: ... → ..." por
   "Expired/Expiró/Expirou: [fecha de hoy]".
3. Crear una tarjeta NUEVA con clase `urgente`, insertada al PRINCIPIO
   del `codigos-grid`, con los datos que dé el usuario.
4. Nunca tocar las tarjetas expiradas del historial (las de abajo).
5. Aplicar en los 3 archivos: `tienda.html`, `en/store.html`,
   `pt/loja.html`.

### Glosario de recompensas (ir ampliando con cada código nuevo)

| Inglés | Español | Portugués |
|---|---|---|
| Energy Core | Núcleo de Energía | Núcleo de Energia |
| Reinforced Alloy | Aleación Reforzada | Liga Reforçada |
| Diamonds | Diamantes | Diamantes |
| Universal S Fragment | Fragmento Universal S | Fragmento Universal S |
| S / A / B Fragment | Fragmento S / A / B | Fragmento S / A / B |
| Orange Skill Manual | Manual de Habilidad Naranja | Manual de Habilidade Laranja |
| Skill Manual | Manual de Habilidad(es) | Manual de Habilidades |
| Blue EXP Chest | Cofre de EXP Azul | Baú de EXP Azul |
| Wood Box | Caja de Madera | Caixa de Madeira |
| Food Box | Caja de Comida | Caixa de Comida |
| Speedup (1h / 5min) | Acelerador (1h / 5min) | Acelerador (1h / 5min) |
| Wrench | Llave Inglesa | Chave Inglesa |
| Blueprints | Planos | Plantas |
| Common Z Coin Box | Caja Común de Moneda Z | Caixa Comum de Moeda Z |
| Advanced Recruit Card | Carta de Recluta Avanzada | Carta de Recrutamento Avançado |

### Glosario de etiquetas de campo

| Inglés | Español | Portugués |
|---|---|---|
| ⚡ Expiring Soon | ⚡ Expira Pronto | ⚡ Expira em Breve |
| ❌ Expired | ❌ Expirado | ❌ Expirado |
| Valid | Válido | Válido |
| Expired (fecha) | Expiró / Venció | Expirou |
| Source | Fuente | Fonte |
| Limit | Límite | Limite |
| Requirement | Requisito | Requisito |
| Rewards verified in-game | Recompensas verificadas en juego | Recompensas verificadas no jogo |
| Apocalypse Time | Hora Apocalipsis | Hora do Apocalipse |

### Formato del mensaje semanal del usuario
```
Nuevo código: [CÓDIGO]
Válido: [fecha inicio] → [fecha fin]
Fuente: [ej. Sitio web oficial last-z.com / Discord oficial / Facebook oficial]
Límite: [número] canjes (o "sin límite")
Requisito: [ej. Sede Nivel 10+] (o "ninguno")
Verificado en juego: sí/no
Recompensas:
- [emoji] [Ítem] x[cantidad]
- [emoji] [Ítem] x[cantidad]

Actualiza según CLAUDE.md: expira la tarjeta activa actual y crea la
nueva en tienda.html, en/store.html y pt/loja.html. Aprovecha y corrige
las clases CSS de las tarjetas LZCORESTRENGTH/LEVELUPHIGHER en
en/store.html si siguen sin corregir. Haz commit, no hagas push todavía.
```


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