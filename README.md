# Legacy by LeadPrime — legacy.chyrris.com

Landing estático (HTML/CSS/JS, sin frameworks, sin build step) que funciona como
**funnel de captura y agendamiento**: un **Quiz Router de 4 preguntas + contacto**
que rutea a 1 de 4 rutas (nadie recibe un "no calificas"), crea un lead en el
pipeline de **Owl Funding** y agenda la llamada de evaluación para las rutas
calificadas. El sitio **no muestra precios de membresía en ninguna parte**.

> Reconstrucción 2026 del sitio anterior (React + Express + Railway). El sitio
> viejo se conserva en [`_backup_2026/`](_backup_2026/). Detalle completo en
> [`IMPLEMENTATION_REPORT_LEGACY_LANDING.md`](IMPLEMENTATION_REPORT_LEGACY_LANDING.md).

## Estructura

```
public/                     # <- Cloudflare Pages sirve ESTE directorio
  index.html                # todo el copy; renderiza sin JS
  assets/css/styles.css
  assets/js/quiz.js         # única pieza que requiere JS (el quiz)
  assets/img/og-image.png   # OG navy/dorado con el wordmark
  favicon.svg, _headers, _redirects, robots.txt, sitemap.xml
backend/                    # endpoint POST /api/public/legacy-quiz (para portar a g3lasio/leadprime)
  src/routing.mjs           # fuente única del ruteo (la replica el cliente)
  src/routing.test.mjs      # node --test: 160 combinaciones
  src/legacyQuiz.schema.ts  # validación Zod
  src/handler.ts            # handler Express (rate-limit, honeypot, lead, email)
  README.md
_backup_2026/               # snapshot del sitio anterior
wrangler.toml               # pages_build_output_dir = "public"
```

## Deploy (Cloudflare Pages)

- Proyecto de Pages conectado a `g3lasio/legacy-owl-funding`.
- **Build command:** *(vacío)* · **Build output directory:** `public`
- Dominio: `legacy.chyrris.com`.
- Insertar el token real de **Cloudflare Web Analytics** en `public/index.html`
  (placeholder `REPLACE_WITH_CLOUDFLARE_WEB_ANALYTICS_TOKEN`).

## El Quiz Router

El cliente rutea de inmediato para la UX; **el servidor recalcula la ruta** y es
la autoridad para tags y creación del lead. Reglas y contrato en
[`backend/README.md`](backend/README.md).

## Reglas de mensajería (no negociables)

- Owl Funding = **estructurador** de financiamiento con socios institucionales — **nunca "el lender"**.
- Siempre **"hasta 90%"**, nunca cifra garantizada. **Cero precios de membresía**, **sin nombrar lenders de terceros**.
- Programa = **membresía con inversión mensual, sujeto a aprobación**.
- Deal de ejemplo etiquetado **"ejemplo ilustrativo … no una garantía"** + disclaimer de riesgo al pie.

## Pruebas locales

```bash
# Router (160 combinaciones)
cd backend/src && node --test

# Servir el sitio
python3 -m http.server -d public 8080   # http://localhost:8080
```
