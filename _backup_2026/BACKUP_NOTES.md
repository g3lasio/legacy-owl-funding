# Snapshot _backup_2026 — sitio anterior (React + Express + Railway)

Fecha: 2026-07-22
Motivo: Reconstrucción de legacy.chyrris.com como landing estático (Quiz Router de 4 rutas).

Este directorio conserva el sitio anterior COMPLETO tal como estaba antes de la
reconstrucción (código React/TypeScript del cliente, backend Express, esquema
Drizzle, y toda la configuración de build/deploy de Railway/Replit/Vite).

## Qué se eliminó del sitio nuevo (documentado en IMPLEMENTATION_REPORT_LEGACY_LANDING.md)
- Planes de pago: "Legacy Founder $799 (non refundable)", "Legacy VIP $599",
  "Legacy Executive". Ver client/src/components/ProgramLevels.tsx.
- Botones "Pay Membership" + enlaces de pago GoDaddy paylinks
  (68291e54-...paylinks.godaddy.com/LegacyFounderPartner y /LegacyCapitalVIP).
- Branding viejo "Legacy Capital Partners" / legacycapitalpartners.com.
- Typo "0wl Funding" (con cero) en meta keywords y remitente info@0wlfunding.com.
- OG image de stock (images.unsplash.com).
- Backend HubSpot + SendGrid (/api/contact, /api/qualify con carga de archivos).

## NO incluido en este backup (a propósito)
- uploads/*.docx — 6 documentos financieros subidos por usuarios reales del
  formulario viejo (PII). Se retiran del árbol de trabajo y NO se duplican aquí.
  Permanecen en el historial de git si se necesitara recuperarlos.
- node_modules/, dist/ (artefactos regenerables).

## Cómo se desplegaba antes
Railway (railway.toml, nixpacks.toml) — build `vite build && esbuild server`,
start `node dist/index.mjs`. NO era Cloudflare Pages.
