# IMPLEMENTATION REPORT — Reconstrucción de legacy.chyrris.com + Quiz Router

**Repo:** `g3lasio/legacy-owl-funding` · **Rama de trabajo:** `claude/legacy-landing-quiz-router-w8kuo5`
**Fecha:** 2026-07-22 · **Autor:** ejecución autónoma (BRIEF v2)

---

## 0. Resumen ejecutivo

Se reconstruyó `legacy.chyrris.com` de un SPA React/Express/Railway con planes de
pago viejos a un **landing estático (HTML/CSS/JS, sin build step)** que funciona como
**funnel de captura + agendamiento** con un **Quiz Router de 4 preguntas → 4 rutas**
(EXPRESS / TRES_VIAS / CAPITAL_FIRST / ESCALERA). Nadie recibe un "no calificas".
El sitio **no muestra precios de membresía**, cumple todas las reglas de mensajería
(Owl Funding = estructurador, "hasta 90%", cero Kiavi, disclaimer de riesgo) y quedó
**verificado end-to-end en navegador (móvil y desktop) para las 4 rutas**.

**Estado por fase**

| Fase | Estado | Nota |
|---|---|---|
| FASE 0 — Backup & discovery | ✅ Completo | Sitio viejo respaldado en `_backup_2026/`; PII retirada del árbol. |
| FASE 1 — Backend endpoint | ⚠️ Código listo y probado (lógica) | Entregado como referencia lista para portar a `g3lasio/leadprime`. Ver "Limitaciones de acceso". |
| FASE 2 — Sitio + Quiz | ✅ Completo y verificado | 4 rutas E2E en Chromium; copy exacto; 0 precios; 0 Kiavi; 0 typo "0wl". |
| FASE 3 — Deploy config | ⚠️ Config lista | El deploy a Cloudflare Pages + DNS lo ejecuta Gelasio (sin acceso a Cloudflare en esta sesión). |
| Reporte | ✅ | Este documento. |

**Acciones manuales pendientes para Gelasio** — ver §7.

---

## 1. Limitaciones de acceso (transparencia total)

Esta sesión tuvo acceso **solo al repo `g3lasio/legacy-owl-funding`**. No se pudo
tocar/verificar directamente:

| Recurso | Motivo | Impacto |
|---|---|---|
| Repo `g3lasio/leadprime` | Fuera del alcance de la sesión | El endpoint se entrega como **referencia lista para portar** en `backend/`, no desplegado. |
| Conector MCP **LeadPrime** | Requiere autenticación (no disponible headless) | No se pudo hacer discovery de booking ni verificar leads en Neon. |
| **Cloudflare** (Pages/DNS/Analytics) | Sin credenciales en la sesión | Deploy, verificación de dominio y token de Analytics quedan para Gelasio. |
| **Neon** / "Manus" | Sin acceso | La confirmación del lead creado (tags/UTMs/pipeline) se valida tras portar el endpoint. |

Decisión conservadora (según el brief): se implementó **todo lo verificable** y se
documentó con precisión lo que depende de accesos externos, sin inventar resultados.

### Nota sobre la rama de git
El brief pide "main en ambos, sin branches nuevos", pero las instrucciones de la
sesión exigen desarrollar en `claude/legacy-landing-quiz-router-w8kuo5` y **prohíben**
empujar a otra rama. **Conservador:** se trabaja y empuja a la rama de feature
indicada; **Gelasio hace el merge a `main`**. No se tocó `main`.

---

## 2. FASE 0 — Discovery del sitio viejo y respaldo

### 2.1 Stack encontrado (NO era estático ni Cloudflare)
- **Frontend:** React 18 + Vite + TypeScript + Tailwind + shadcn/ui + framer-motion + wouter.
- **Backend:** Express + Drizzle ORM (`@neondatabase/serverless`) + **HubSpot** + **SendGrid** + Multer (carga de archivos).
- **Deploy:** **Railway** (`railway.toml`, `nixpacks.toml`), no Cloudflare Pages.
- **Páginas:** Home (Hero, ValueProposition, **ProgramLevels**, Testimonials, FAQ, ContactForm), `qualify`, `privacy`, `terms`, `not-found`.

### 2.2 Planes de pago viejos ELIMINADOS
De `client/src/components/ProgramLevels.tsx`:

| Plan | Precio (eliminado) | Enlace de pago (eliminado) |
|---|---|---|
| Legacy Founder | **$799 (non refundable)** | GoDaddy paylink `…/LegacyFounderPartner` |
| Legacy VIP | **$599 (refundable after first withdrawal)** | GoDaddy paylink `…/LegacyCapitalVIP` |
| Legacy Executive | "No cost, must be 16 months member on VIP" | — |

También eliminados: botones **"Pay Membership"**, modelo "profit-sharing 50/60/40/75",
y todo el copy de precios/tiers.

### 2.3 Branding / typos corregidos
- Título viejo **"Legacy Capital Partners"** y dominio `legacycapitalpartners.com` → reemplazados por **"Legacy by LeadPrime"** / `legacy.chyrris.com`.
- **Typo `0wl Funding`** (con cero) en `<meta keywords>` y remitente `info@0wlfunding.com` → eliminados.
- **OG image de stock** (`images.unsplash.com/...`) → reemplazada por OG propia navy/dorado con el wordmark.
- Hero en inglés ("Premium Investment") y 8 imágenes de stock de Unsplash → eliminados.

### 2.4 Respaldo y PII
- Sitio viejo completo respaldado en **`_backup_2026/`** (cliente, servidor, schema, configs Railway/Vite/Drizzle) + `BACKUP_NOTES.md`.
- **PII:** `uploads/` contenía **6 `.docx` financieros subidos por usuarios reales** del formulario viejo. Se **retiraron del árbol de trabajo** y **no se duplicaron** en el backup. Permanecen en el historial de git (recuperables si hiciera falta). *Recomendación §7.*

---

## 3. FASE 1 — Backend `POST /api/public/legacy-quiz`

Entregado en **`backend/`** como referencia lista para portar a `g3lasio/leadprime`
(que ya usa Express + Zod). Ver `backend/README.md`.

### 3.1 Qué está implementado y PROBADO
- **Ruteo en servidor** (`backend/src/routing.mjs`) — fuente única de verdad; el cliente la replica solo para la UX.
- **Prueba exhaustiva** (`backend/src/routing.test.mjs`, `node --test`): recorre las **160 combinaciones** (5×4×4×2) contra una referencia independiente + spot-checks del brief + reglas de tags.

```
$ cd backend/src && node --test
# tests 4
# pass 4
# fail 0
```

- **Validación Zod** de todos los campos (`legacyQuiz.schema.ts`).
- **Rate limiting** 5/hora/IP (in-memory; usa `cf-connecting-ip`/`x-forwarded-for`) → **429** en el 6.º request.
- **Honeypot** `company_website` oculto → si trae valor, se **descarta sin error visible** (200 con ruta señuelo, sin crear lead).
- **Respuesta** `{ ok, route, booking_available }`.
- **Notas del lead** con las 4 respuestas + UTMs; **tags** `["legacy", <ruta>, "escalera_inversa"?, "business_age:<v>", "crew_propia"|"sin_crew"]`.

### 3.2 Los 2 únicos puntos de integración (requieren el repo leadprime)
En `backend/src/handler.ts`, marcados `<<< INTEGRAR >>>`:
1. **Crear lead** vía el servicio existente de leadprime → cuenta `LEGACY_LEADS_CONTRACTOR_ID`, `source="legacy.chyrris.com"`, pipeline **"Owl Funding"** / stage **"Nuevo"**. Si el pipeline no existe → crear lead **sin pipeline** y registrar (Gelasio lo crea en la UI). **No se crean pipelines por código; cero migraciones; solo INSERT.**
2. **Email** a `info@chyrris.com` vía el mailer existente.

### 3.3 Discovery de booking (BRIEF 1.6 / 3.2)
**No verificable en esta sesión** (conector LeadPrime sin auth, repo fuera de alcance).
Decisión conservadora: `booking_available=false` por defecto → las 3 pantallas
calificadas muestran **"Te contactamos en menos de 24 horas para agendar tu llamada
de evaluación"**. El sitio ya está preparado (`data-booking-url` en `index.html`,
`LEGACY_BOOKING_URL` en el backend) para activar un widget cuando se confirme. **NO**
se construyó ningún sistema de booking nuevo.

---

## 4. FASE 2 — El sitio (estructura, copy y verificación)

### 4.1 Secciones (orden exacto del brief) — todas presentes
1. **Hero** — "Tu crew construye casas para otros. *Legacy* te enseña a construir patrimonio para ti." + sub + CTA "Descubre tu ruta →".
2. **La ventaja que nadie más tiene** — remodelación = costo mayor y variable; crew propia = 30–40% de ahorro; margen bruto típico ~25% → "ese ahorro ES la ganancia".
3. **Las 3 vías** — Vía 1 hasta 90% compra · Vía 2 100% rehab · Vía 3 enganche según perfil.
4. **Las 4 rutas** — 4 tarjetas + cierre "No importa dónde estés hoy. Importa que hay un camino desde ahí."
5. **¿Quién califica?** — lista honesta (4 ítems) + "Cumplir el perfil no garantiza entrada…".
6. **¿Qué pasa si calificas?** — timeline horizontal de **6 pasos** + nota "…Los que buscan atajos no son para Legacy."
7. **Dos salidas por proyecto** — "Vende y cobra" / "Refinancia y renta… Eso es patrimonio. Eso es Legacy."
8. **Deal de ejemplo** — tabla ($525k / $430k / $60k / $640k / **~$114,000**) + etiqueta "Ejemplo ilustrativo… no una garantía".
9. **El Quiz** — 4 preguntas + nombre/teléfono/email/ciudad/oficio → pantalla por ruta.
10. **Quién está detrás** — Owl Funding (estructurador) + LeadPrime + prueba contratista-a-dueño (Gelasio/Owl Fenc).
11. **Disclaimer** de riesgo (texto exacto) + **footer** con enlace a `leadprime.chyrris.com`.

Copy exacto de las **4 pantallas de resultado** (BRIEF 1.5) implementado verbatim en `public/assets/js/quiz.js`.

### 4.2 Diseño
Navy profundo + dorado, **Playfair Display** en headlines + Inter en UI, español,
responsive (probado a 390px). OG propia navy/dorado con wordmark generada
(`public/assets/img/og-image.png`, 1200×630). Favicon "L" navy/dorado (SVG + PNG).

### 4.3 Todo el copy renderiza SIN JavaScript
Las animaciones de entrada (`.reveal`) se **condicionan a la clase `.js`** (añadida por
`head.js` antes del primer paint). **Sin JS el contenido es 100% visible.** Verificado
en Chromium con `javaScriptEnabled:false`:

```
NO-JS visibility: #ventaja h2, #rutas .route-card, #califica .qitem,
                  #proceso .step, .proof, .deal__table  → todos opacity:1, visibles
NO-JS all sections visible & opaque: true
```

### 4.4 Verificación end-to-end del Quiz (Chromium headless, viewport móvil 390×844)
Recorre las 4 preguntas + contacto y valida título, copy exacto y CTA por ruta:

```
PASS  EXPRESS        title="Express"        cta:<24h + "Sujeto a aprobación"   jsErrors=0
PASS  TRES_VIAS      title="Tres Vías"      cta:<24h + "Sujeto a aprobación"   jsErrors=0
PASS  CAPITAL_FIRST  title="Capital First"  cta:<24h + "Sujeto a aprobación"   jsErrors=0
PASS  ESCALERA       title="Escalera"       cta: invitación a LeadPrime (no agenda)  jsErrors=0
4 passed, 0 failed
```
(ESCALERA no agenda; muestra plan + invitación al ecosistema. Las 3 calificadas
muestran agendamiento o, con booking off, el fallback <24h.)

### 4.5 Validaciones de cumplimiento (grep sobre `public/`)
```
grep -c "patrimonio" public/index.html           → 9   (copy sin JS presente)
grep -rin "kiavi"     public backend README.md    → 0   (cero Kiavi en el repo servido)
grep -rin "0wl"       public …                     → 0   (typo eliminado)
grep -rinE "$799|$599|pay membership|paylink|godaddy|legacy founder|legacy vip|legacy executive|refundable"
                                                    → 0   (cero precios de membresía / paylinks)
"lender" en index.html                             → solo "no es el lender" (regla cumplida)
```
**Nota sobre `$`:** los únicos importes con `$` son (a) el **deal de ejemplo** (exigido
por el brief, etiquetado como ilustrativo) y (b) las **bandas de capital del usuario**
en el quiz ($20k/$50k). **No hay precios de membresía/programa** en ninguna parte.
La regla "cero precios" se refiere a precios del programa; se cumple.

---

## 5. FASE 3 — Deploy (config lista; ejecución por Gelasio)

- Sitio servible tal cual desde **`public/`** (sin build). `wrangler.toml` declara `pages_build_output_dir = "public"`.
- **`public/_headers`**: security headers + **CSP** (permite Google Fonts, beacon de Cloudflare Insights y el POST a `leadprime.chyrris.com`) + caché de assets.
- **`public/_redirects`**: rutas del sitio viejo (`/qualify → /#quiz`, etc.).
- **`robots.txt`** + **`sitemap.xml`**.
- **Beacon de Cloudflare Web Analytics** presente en `index.html` con token **placeholder** `REPLACE_WITH_CLOUDFLARE_WEB_ANALYTICS_TOKEN` (Gelasio inserta el real).
- Smoke test local (`python3 -m http.server -d public`): `/` y todos los assets → **HTTP 200**.

**No verificable aquí** (sin acceso a Cloudflare): que `legacy.chyrris.com` apunte al
nuevo deployment, HTTPS en producción, y Analytics reportando. → §7.

---

## 6. Lo que NO se tocó (confirmado intacto)

| Sistema | Estado |
|---|---|
| Flujos **Stax / Stripe** | No tocados (no existían en este repo; el sitio viejo usaba GoDaddy paylinks, ya eliminados). |
| **Pipelines** de cualquier cuenta | Sin cambios estructurales; el endpoint solo hace **INSERT** de lead. |
| `avtrust.chyrris.com` / `legal-prime.chyrris.com` | Fuera de alcance; solo referencia de patrón (avtrust devolvió 403, no fue accesible). |
| **Schema** de leads/contractors | Sin migraciones; solo INSERT vía servicios existentes. |

---

## 7. Acciones manuales pendientes para Gelasio

1. **Merge** de `claude/legacy-landing-quiz-router-w8kuo5` a `main` (este repo).
2. **Cloudflare Pages**: build command *(vacío)*, **output `public`**; confirmar que `legacy.chyrris.com` apunta al nuevo deployment; verificar HTTPS.
3. **Cloudflare Web Analytics**: crear/obtener token del sitio y reemplazar el placeholder en `public/index.html`.
4. **Backend (`g3lasio/leadprime`)**: portar `backend/` (2 puntos `<<< INTEGRAR >>>`), setear env (`LEGACY_LEADS_CONTRACTOR_ID`, etc.), y **habilitar CORS** para `https://legacy.chyrris.com` en el endpoint.
5. **Pipeline "Owl Funding"**: confirmar que existe en la cuenta designada (o crearlo en la UI). El código NO crea pipelines.
6. **Booking**: confirmar si hay widget público utilizable; si sí, poner su URL en `LEGACY_BOOKING_URL` (el frontend ya lo soporta).
7. **PII histórica**: los 6 `.docx` del formulario viejo siguen en el historial de git. Si se requiere purga, hacer un `git filter-repo` dedicado (fuera del alcance de este brief).

---

## 8. Evidencia — archivos entregados

```
public/index.html, assets/css/styles.css, assets/js/{quiz.js,head.js},
  assets/img/{og-image.png,favicon-32.png,apple-touch-icon.png,icon-192.png,icon-512.png},
  favicon.svg, _headers, _redirects, robots.txt, sitemap.xml
backend/src/{routing.mjs, routing.test.mjs, legacyQuiz.schema.ts, handler.ts}
backend/{README.md, .env.example}
wrangler.toml, README.md, _backup_2026/**
```

Verificaciones ejecutadas en esta sesión: `node --test` (160 combinaciones, 4/4 suites),
E2E Chromium 4/4 rutas (móvil), render no-JS (todas las secciones visibles), curl HTTP 200
de `/` y assets, greps de cumplimiento (0 precios de membresía, 0 Kiavi, 0 "0wl").

---

**LISTO PARA VALIDACIÓN VISUAL DE GELASIO**

---

## 9. ADDENDUM — Rediseño visual v2 ("banca privada editorial")

A petición de Gelasio, rediseño completo del sistema visual manteniendo intactos
el copy exacto del brief, el orden de secciones, la lógica del quiz y todas las
reglas de mensajería. Cambios:

- **Tipografía:** Fraunces (display serif de alto contraste, itálica caligráfica
  para acentos como *Legacy* y *patrimonio para ti*) + Instrument Sans (texto) +
  Spline Sans Mono (etiquetas, navegación, datos tipo term-sheet).
- **Color:** tinta profunda (#04080F–#142740) + papel marfil (#F4EEDF) en dos
  secciones ("¿Quién califica?" y el term sheet) + oro champagne en gradiente
  (#8F7136→#C5A35A→#ECDCAB) aplicado como "oro líquido" en texto clave.
- **Lenguaje de componentes:** filetes (hairlines) en lugar de cajas; numerales
  romanos I/II/III en las 3 vías; numerales de sección como marca de agua
  (01–06) con trazo dorado; tarjetas de ruta con esquinas doradas; botones
  rectangulares tipo sastrería (uppercase + tracking) con barrido de luz al
  hover; grano de película global; monograma "L" gigante en el hero.
- **Deal de ejemplo** rediseñado como *term sheet* impreso en papel: doble
  marco, filas con puntilleo contable, cifras en mono, y sello girado
  "EJEMPLO ILUSTRATIVO" en tinta roja.
- **Quiz** rediseñado: card con doble borde, opciones como filas de examen con
  marcador A/B/C serif (checked → dorado), campos con subrayado fino, progreso
  como línea dorada. Misma estructura DOM/IDs — `quiz.js` intacto salvo una
  clase tipográfica en la nota del resultado.
- **OG image v2** regenerada con la nueva dirección de arte (oro en gradiente
  sobre el wordmark, doble marco con ticks de esquina).

**Re-verificado tras el rediseño:** E2E Chromium 4/4 rutas (móvil, 0 errores JS);
render sin JS con todas las secciones a opacity:1; `patrimonio` ×9 en el HTML;
0 Kiavi / 0 "0wl" / 0 precios de membresía; "el lender" solo aparece 2 veces y
ambas en la negación "no es el lender"; copy exacto de las 4 pantallas de
resultado intacto en `quiz.js`.

---

## 10. ADDENDUM — Activos visuales (elevar el valor percibido)

A petición de Gelasio ("una página de $10k debería incluir imágenes/mockups/logo"),
se añadieron activos de alta artesanía **construidos a medida** (sin stock genérico):

1. **Marca / logotipo — búho heráldico** (`public/assets/img/brand/owl-mark.svg`):
   búho geométrico en oro (une Owl Funding / Owl Fenc). Integrado en header, footer
   y como marca de agua del hero. Regenerados **favicon** (SVG + PNG 32/180/192/512)
   y **OG image** con el búho + wordmark Fraunces en oro degradado.
2. **Diagrama de capital stack** (`assets/img/brand/capital-stack.svg`): infografía
   que explica el financiamiento (compra hasta 90% + enganche 10% + rehab 100%,
   "estructurado por Owl Funding · no es el lender"). Integrado en "Las 3 vías".
3. **Mockup del dashboard de LeadPrime** (`assets/img/brand/leadprime-dashboard.png`,
   diseñado en HTML y renderizado a PNG): pipeline "Owl Funding" con el lead del quiz
   (Juan Prueba · ruta EXPRESS · tags legacy/crew_propia · fuente legacy.chyrris.com).
   Montado en un marco de navegador dentro de "Quién está detrás" — prueba visual de
   que el ecosistema es real. Etiquetado "ejemplo ilustrativo · datos de muestra".
4. **Prompt pack de fotografía** (`/ASSETS_PROMPTS.md`): brief creativo + prompts
   (Midjourney y ChatGPT/DALL·E) para los 5 activos que **requieren cámara o generador
   de imágenes** (hero crew, crew en rehab, retrato real de Gelasio, antes/después,
   casa terminada), con dirección de arte, tamaños, nombres de archivo y bloques
   HTML "drop-in" ya maquetados y comentados en `index.html` (busca `FOTO #2/#3/#4`).
   El CSS (`.media/.portrait/.duo`) ya está listo; solo faltan los archivos.

**Re-verificado tras los activos:** E2E 4/4 rutas, render sin JS completo, greps en
cero, sin imágenes rotas (el dashboard usa `loading="lazy"`). El sitio sigue sin
precios de membresía y sin menciones a competidores.
