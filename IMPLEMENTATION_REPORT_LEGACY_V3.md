# IMPLEMENTATION REPORT — BRIEF v3 (Credibilidad, Conversión y Confianza)

**Repo:** `g3lasio/legacy-owl-funding` · **Branch:** `main` · **Fecha:** 2026-07-23
**Alcance:** correcciones de contenido sobre el sitio en producción. **Cero cambios de backend.**

---

## 0. Resumen

Ejecutado en orden P0 → P1 → P2. El sitio no se rediseñó: se corrigió en credibilidad
(ejemplo financiero de 3 escenarios, 3 frases infladas), conversión (sección "No es
para ti", FAQ de 8 preguntas, reorden del quiz, consentimiento, footer institucional +
páginas legales) y pulido de marca (derivados de logo, favicon legible). El endpoint
`POST /api/public/legacy-quiz` y todo `g3lasio/leadprime` **no se tocaron**; el reorden
del quiz es solo visual y el payload conserva los mismos campos/valores (verificado E2E).

| Fase | Estado |
|---|---|
| P0 — Credibilidad | ✅ Completo y verificado |
| P1 — Conversión y confianza | ✅ Completo (WhatsApp pendiente de número — ver §Pendientes) |
| P2 — Pulido de marca | ⚠️ Parcial por decisión conservadora (ver §P2) |

---

## 1. P0 — CREDIBILIDAD

### 1.1 Deal de ejemplo reconstruido (3 escenarios) ✅
- Reemplazada la tabla anterior por **Conservador / Esperado / Favorable** con los 12
  conceptos exactos del brief. Encabezado "Cómo se ven los números — en tres escenarios",
  subtítulo "Un proyecto tipo con todos los costos a la vista. Sin números redondeados
  hacia arriba."
- **Desktop:** tabla en papel, columna *Esperado* destacada; *Inversión total* con borde,
  *Total para ti* en oro. **Móvil (≤768px, verificado a 375px):** tarjetas apiladas,
  **Esperado primero y destacado** (borde + badge dorado).
- Los dos bloques obligatorios ("Capital de entrada" y "La línea de tu cuadrilla") y el
  nuevo disclaimer están al pie de la sección. El **aviso de riesgo** al pie del sitio se
  conserva íntegro; el disclaimer nuevo se suma.
- Consistencia numérica verificada (Esperado: 430+60+14+23+6+32+10 = 575; 640−575 = 65; +18 = 83).

### 1.2 Tres frases infladas corregidas ✅ — antes → después
| # | Antes | Después |
|---|---|---|
| 1 | "…ese ahorro no es un extra: **ES la ganancia.**" | "…controlar la ejecución protege tu margen: **donde otros pagan precio de mercado, tú pagas tu costo real.**" |
| 2 | "**El activo que ningún otro inversionista puede comprar.**" | "**La ventaja operativa que tú ya construiste.**" |
| 3 | "~25% · Margen bruto típico de un flip en el mercado" | Mismo dato **+ fuente:** "Fuente: ATTOM, Reporte de Flipping Q1 2026" |
- Añadida la línea de matiz al párrafo de la ventaja: *"El ahorro real depende del alcance
  del trabajo, tus costos internos, materiales, permisos y la duración del proyecto."*

### 1.3 "La prueba" → "El origen" ✅
Tarjeta en "Quién está detrás": etiqueta cambiada de **"La prueba"** a **"El origen"**;
el texto ("De contratista a dueño…") se mantiene.

### 1.4 "¿Quién califica?" endurecido ✅
Punto 01 ahora: **"Un negocio de construcción operando. Con cuadrilla, clientes y
experiencia real de ejecución."** Eliminado "— o la disposición de construirlo…".

### 1.5 Choque de tiempos de Express resuelto ✅
Nota bajo el paso 5 del proceso: *"Ruta Express: si llegas con crédito y capital listos,
la evaluación de propiedades comienza de inmediato tras la aprobación. Los meses 1–6 de
construcción aplican a quienes necesitan fortalecer crédito o capital."*

### Evidencia P0 (grep sobre `public/`)
```
'$36,000'                                → 0
'~$114,000'                              → 0
'ES la ganancia'                         → 0
'ningún otro inversionista puede comprar'→ 0
'La prueba'                              → 0
'o la disposición de construirlo'        → 0
'ATTOM'                                  → presente junto al 25%
```

---

## 2. P1 — CONVERSIÓN Y CONFIANZA

### 2.1 "No es para ti si…" ✅
Nueva sección `#no-es-para-ti` inmediatamente después de "¿Quién califica?", con
tratamiento visual distinto (fondo oscuro + borde rojizo). Encabezado "Legacy no es para
todos", 4 puntos exactos + cierre "Si te reconoces en esta lista, te ahorramos el tiempo
a ambos."

### 2.2 FAQ "Antes de decidir" ✅
Nueva sección `#faq` **antes del quiz, después del ejemplo**. Acordeón con `<details>/
<summary>` **nativo — funciona sin JavaScript**; las 8 preguntas con copy exacto; la
primera abierta por defecto (`open`). Verificado: renderiza y opera sin JS y en móvil.

### 2.3 WhatsApp (salida secundaria) ⚠️ PENDIENTE DE NÚMERO
Botón secundario maquetado bajo el quiz (`#waCta`), con ícono de WhatsApp y mensaje
pre-cargado "Hola, tengo preguntas sobre el programa Legacy.". **Está oculto tras el
atributo `hidden`** porque no se proporcionó número. Para activarlo: poner el número en
formato internacional (sin `+`) en el `href` (`https://wa.me/<numero>?text=…`) y quitar
`hidden`. **No se inventó ningún número.**

### 2.4 Reorden del quiz (solo visual) ✅
Nuevo orden: **1) negocio → 2) cuadrilla → 3) capital → 4) crédito**. El contenido, los
`name` y los `value` de cada input **no cambian**; el payload al endpoint es idéntico.
Verificado E2E en Chromium (móvil): las 4 rutas siguen resolviendo correctamente.
```
PASS EXPRESS · PASS TRES_VIAS · PASS CAPITAL_FIRST · PASS ESCALERA  (4/4, 0 errores JS)
```
> Validación con Manus/Neon (leads con ruta y tags correctos) NO ejecutable en esta
> sesión (sin acceso a Neon ni al conector LeadPrime). El ruteo cliente es idéntico al
> del servidor (misma tabla `routing.mjs`); queda para validación de Manus tras deploy.

### 2.5 Consentimiento y privacidad ✅
Texto exacto bajo el formulario de contacto del quiz.

### 2.6 Footer institucional ✅
- Enlaces a **/privacidad** y **/terminos** (páginas creadas: `privacidad.html`,
  `terminos.html`, ambas con banner **"PENDIENTE DE REVISIÓN LEGAL POR GELASIO"**).
  Cargan 200; en Cloudflare Pages las clean-URLs `/privacidad` y `/terminos` funcionan
  (además se añadieron rewrites en `_redirects`).
- Email de contacto (info@chyrris.com) y alcance geográfico **"Operamos actualmente en
  California"** añadidos.
- **Nombre legal de la compañía:** marcado en el código como PENDIENTE (ver §Pendientes);
  no se inventó una razón social.
- **Dirección física:** NO publicada; espacio marcado con comentario en el HTML.

---

## 3. P2 — PULIDO DE MARCA

**Decisión conservadora documentada.** El brief pide derivar versiones **planas
vectoriales** del logo a partir de una **versión horizontal**. En el repo solo existe el
logo oficial en **raster (PNG) y en lockup vertical** — no hay archivo vectorial ni
versión horizontal. Un re-trazo a mano del glifo estilizado, a ciegas, produjo un
resultado de baja calidad (probado y descartado para no degradar la marca).

Entregado en su lugar, **derivado fielmente del logo real**:
- **Favicon** (`favicon-32/180/192/512`, `icon-*`) regenerado como **silueta blanca de la
  marca sobre tile navy** — significativamente **más legible a 32/16px** que el metálico
  (que a ese tamaño se satura). Cumple "solo la L, sin wordmark, legible a tamaño mínimo".
- **Versión monocromática** navy y blanca (`logo-mono-navy.png`, `logo-mono-white.png`),
  legibles en negro/blanco sólido a 32px.
- **Header/footer/OG:** se **conservó el logo metálico** (color + detalle completos, se
  ve premium a esos tamaños); NO se sustituyó por la silueta plana para no degradar.

**Pendiente para calidad vectorial total (requiere decisión/entrega de Gelasio):** el
**archivo vectorial original** (SVG/AI) del logo, o una **versión horizontal** oficial. Con
eso se derivan la versión plana vectorial, la mono con detalle de trazo y el favicon
vectorial exactos que pide el brief. Sin la fuente vectorial no es responsable redibujarlo.

---

## 4. Confirmación: backend intacto
- `git status backend/` → **sin cambios**. `g3lasio/leadprime` no forma parte de este repo
  y no se tocó. Los nombres de ruta (EXPRESS/TRES_VIAS/CAPITAL_FIRST/ESCALERA), la lógica
  de ruteo y el pipeline de Owl Funding permanecen idénticos.

---

## 5. Problemas encontrados y resolución
| Problema | Resolución |
|---|---|
| `/privacidad` y `/terminos` daban 404 en el server local de python (sin clean-URLs) | Los `.html` cargan 200; Cloudflare Pages sirve clean-URLs; se añadieron rewrites en `_redirects`. |
| Re-trazo vectorial del logo a mano quedó de baja calidad | Descartado; se derivaron favicon + mono fieles del raster real y se documentó la necesidad del vector original. |
| Validación Manus/Neon del lead no ejecutable (sin acceso) | Documentado; ruteo cliente = servidor; queda para Manus tras deploy. |

---

## 6. Pendientes que requieren decisión de Gelasio
1. **Número de WhatsApp** → activar el botón (`#waCta`): poner número en el `href` y quitar `hidden`.
2. **Revisión legal** de `/privacidad` y `/terminos` (ambas marcadas como borrador).
3. **Nombre legal (razón social)** de la compañía para el footer y las páginas legales.
4. **Dirección física** — autorizar (o no) su publicación; hoy va omitida.
5. **Archivo vectorial original del logo** (o versión horizontal) para completar los
   derivados vectoriales de P2 con calidad exacta.
6. **Validación de Manus** en Neon de que los leads llegan con ruta y tags correctos tras deploy.

---

**LISTO PARA VALIDACIÓN VISUAL DE GELASIO**

---

## 7. ADDENDUM — WhatsApp activado + logo oficial (dark master)

- **WhatsApp:** activado con el número **+1 202 549 3519** → `https://wa.me/12025493519?text=Hola%2C%20tengo%20preguntas%20sobre%20el%20programa%20Legacy.`. El botón secundario bajo el quiz ya no está oculto. (Pendiente #1 del §6 resuelto.)
- **Logo oficial:** Gelasio subió la versión **en cromo sobre fondo oscuro** (`ChatGPT Image … 11_51_21 PM.png`, calidad nativa para fondos oscuros). Se procesó a **PNG transparente** (flood-fill del fondo navy) y se integró como **master oficial**:
  - `logo-official.png` (lockup completo) → footer y OG.
  - `logo-official-mark.png` (marca "L") → header y marca de agua del hero.
  - **OG image regenerada** con el lockup oficial.
  - Se retiraron las variantes recoloreadas anteriores (`logo-light/-mark-light`, `logo-color/-mark-color`).
  - Favicon: se conserva la **silueta blanca** (más legible a 32px). Mono navy/blanco disponibles.
  - Esto resuelve el pendiente #5 del §6 para uso en pantalla (dark). El vector plano escalable sigue requiriendo el archivo vectorial (SVG/AI) si se necesita impresión/escalado extremo.
