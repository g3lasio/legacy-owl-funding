# Backend — `POST /api/public/legacy-quiz` (para portar a `g3lasio/leadprime`)

Implementación de **referencia, lista para portar**, del endpoint público de captura
del Quiz Router de Legacy. Vive en este repo porque la sesión que la generó **no
tuvo acceso al repo `g3lasio/leadprime` ni al conector autenticado de LeadPrime**
(ver `IMPLEMENTATION_REPORT_LEGACY_LANDING.md` → "Limitaciones de acceso"). El
código es correcto y probado en su lógica de ruteo; solo faltan **2 puntos de
integración** con los servicios existentes de leadprime.

## Archivos

| Archivo | Qué es |
|---|---|
| `src/routing.mjs` | **Fuente única de verdad** del ruteo (4 rutas + tags). La usa el servidor para recalcular; el cliente la replica en `public/assets/js/quiz.js`. |
| `src/routing.test.mjs` | Prueba `node --test`: recorre las **160 combinaciones** y valida contra una referencia independiente. |
| `src/legacyQuiz.schema.ts` | Validación **Zod** del body (todos los campos + honeypot). |
| `src/handler.ts` | Handler Express completo: rate-limit, honeypot, validación, recálculo de ruta, creación de lead, email, respuesta. |

## Contrato

```
POST /api/public/legacy-quiz
Content-Type: application/json

Body: {
  name, phone, email, city, trade,
  credit_band:  "no_se"|"menos_600"|"600_649"|"650_699"|"700_mas",
  capital_band: "nada"|"menos_20k"|"20_50k"|"50k_mas",
  business_age: "sin_negocio"|"menos_1"|"1_3"|"3_mas",
  crew_propia:  boolean,
  utm_source?, utm_medium?, utm_campaign?,
  company_website?   // honeypot: debe ir VACÍO (bots lo llenan)
}

200 → { ok: true, route: "EXPRESS"|"TRES_VIAS"|"CAPITAL_FIRST"|"ESCALERA", booking_available: boolean }
400 → { ok: false, error: "invalid_input", issues }
429 → { ok: false, error: "rate_limited" }        // 6.º request/hora/IP
```

## Ruteo (recalculado EN SERVIDOR, en este orden)

1. `credit >= 650` **Y** `capital >= 20k` → **EXPRESS**
2. `credit >= 650` → **TRES_VIAS**
3. `capital >= 20k` → **CAPITAL_FIRST** (incluye `credit = "no_se"`)
4. resto → **ESCALERA**

- `credit >= 650` ⇔ banda ∈ {`650_699`, `700_mas`}
- `capital >= 20k` ⇔ banda ∈ {`20_50k`, `50k_mas`}
- `business_age` y `crew_propia` **no bloquean**: son tags.
- `business_age ∈ {sin_negocio, menos_1}` → tag extra **`escalera_inversa`**.
- Tags del lead: `["legacy", <ruta>, "escalera_inversa"?, "business_age:<v>", "crew_propia"|"sin_crew"]`.
- Solo EXPRESS/TRES_VIAS/CAPITAL_FIRST agendan; ESCALERA **no**.

## Variables de entorno

| Var | Default | Uso |
|---|---|---|
| `LEGACY_LEADS_CONTRACTOR_ID` | — | Cuenta de Owl Funding donde se crea el lead. **Requerida.** |
| `LEGACY_PIPELINE_NAME` | `Owl Funding` | Pipeline destino. |
| `LEGACY_PIPELINE_FIRST_STAGE` | `Nuevo` | Primer stage. |
| `LEAD_NOTIFY_EMAIL` | `info@chyrris.com` | Destino de la notificación. |
| `LEGACY_BOOKING_URL` | *(vacío)* | Si hay widget de booking → su URL; vacío ⇒ `booking_available=false` y el sitio usa el fallback "Te contactamos en <24h". |

## Puntos de integración (los 2 únicos pendientes)

En `src/handler.ts`, reemplazar los stubs `createLeadViaLeadPrime()` y
`notifyByEmail()` por los **servicios existentes** de leadprime:

- **#1 Crear lead**: usar el servicio de leads actual con `source="legacy.chyrris.com"`,
  `tags`, `notes`, asignado al pipeline `Owl Funding` / stage `Nuevo`. Si el
  pipeline **no existe**, crear el lead **sin pipeline** y registrarlo (Gelasio lo
  crea desde la UI). **No crear pipelines por código.** No hay migraciones: solo INSERT.
- **#2 Email**: usar el mailer existente (SendGrid/Nodemailer) → `info@chyrris.com`.

Registro de ruta:
```ts
import express from "express";
import { legacyQuizHandler } from "./legacy/handler.js";
app.post("/api/public/legacy-quiz", express.json(), legacyQuizHandler);
```

## Discovery de booking (BRIEF 1.6 / 3.2)

**Estado: NO verificable en esta sesión** — el conector `LeadPrime` requiere
autenticación (no disponible headless) y el repo `g3lasio/leadprime` no estuvo en
alcance. Por decisión conservadora el endpoint arranca con `booking_available=false`
(el sitio muestra "Te contactamos en menos de 24 horas para agendar tu llamada de
evaluación"). **Para activar booking**: confirmar un widget/endpoint público
utilizable para la cuenta de Owl Funding y poner su URL en `LEGACY_BOOKING_URL`;
el frontend ya está preparado para insertarlo en las 3 pantallas calificadas
(`data-booking-url` en `index.html`).

## Pruebas

```bash
cd backend/src && node --test          # 4 suites, 160 combinaciones — PASA
```
