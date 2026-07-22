// handler.ts — Endpoint público de captura del Quiz Router de Legacy.
// PORTAR A: g3lasio/leadprime  (rama main)  ->  POST /api/public/legacy-quiz
//
// Este archivo es una implementación de REFERENCIA, autocontenida salvo por DOS
// puntos de integración que deben conectarse a los servicios existentes de
// LeadPrime (marcados con  <<< INTEGRAR >>> ). No inventa esquema ni migra nada:
// solo hace INSERT de un lead vía los servicios existentes y envía un email.
//
// Dependencias ya presentes en leadprime/legacy-owl-funding: express, zod.
// Rate limiting y honeypot se implementan sin librerías nuevas.

import type { Request, Response } from "express";
import { legacyQuizSchema } from "./legacyQuiz.schema.js";
// routing.mjs es la fuente única de verdad (la misma lógica que replica el cliente).
import { computeRoute } from "./routing.mjs";

// ─────────────────────────────────────────────────────────────────────────────
// Config por entorno
// ─────────────────────────────────────────────────────────────────────────────
const LEGACY_LEADS_CONTRACTOR_ID = process.env.LEGACY_LEADS_CONTRACTOR_ID || "";
const LEGACY_PIPELINE_NAME = process.env.LEGACY_PIPELINE_NAME || "Owl Funding";
const LEGACY_PIPELINE_FIRST_STAGE = process.env.LEGACY_PIPELINE_FIRST_STAGE || "Nuevo";
const LEAD_NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "info@chyrris.com";
// Si existe widget/endpoint público de booking utilizable para la cuenta de Owl
// Funding, poner su URL aquí; el frontend la usa para las 3 rutas calificadas.
const LEGACY_BOOKING_URL = process.env.LEGACY_BOOKING_URL || ""; // vacío => booking_available=false

// ─────────────────────────────────────────────────────────────────────────────
// Rate limiting: 5 requests / hora / IP (en memoria; para multi-instancia usar
// el store compartido/Redis que ya use leadprime).
// ─────────────────────────────────────────────────────────────────────────────
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}
// Limpieza periódica para no crecer sin límite.
setInterval(() => {
  const now = Date.now();
  for (const [ip, arr] of hits) {
    const keep = arr.filter((t) => now - t < WINDOW_MS);
    if (keep.length) hits.set(ip, keep);
    else hits.delete(ip);
  }
}, WINDOW_MS).unref?.();

function clientIp(req: Request): string {
  const xff = (req.headers["cf-connecting-ip"] as string) ||
    (req.headers["x-forwarded-for"] as string) || "";
  return (xff.split(",")[0] || req.ip || "unknown").trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────────────────────
export async function legacyQuizHandler(req: Request, res: Response) {
  // 1) Rate limit por IP
  if (rateLimited(clientIp(req))) {
    return res.status(429).json({ ok: false, error: "rate_limited" });
  }

  // 2) Validación Zod
  const parsed = legacyQuizSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "invalid_input", issues: parsed.error.flatten() });
  }
  const data = parsed.data;

  // 3) Honeypot: si el campo oculto trae contenido, es bot -> descartar SIN error
  //    visible (respondemos 200 con una ruta plausible pero NO creamos lead).
  if (data.company_website && data.company_website.length > 0) {
    const decoy = computeRoute(data);
    return res.status(200).json({ ok: true, route: decoy.route, booking_available: false });
  }

  // 4) Recalcular ruta EN SERVIDOR (no confiar en el cliente)
  const { route, tags, escaleraInversa, booking_eligible } = computeRoute(data);
  const booking_available = booking_eligible && Boolean(LEGACY_BOOKING_URL);

  // 5) Notas del lead: las 4 respuestas + UTMs
  const notes = [
    `Lead desde legacy.chyrris.com — Ruta calculada: ${route}`,
    ``,
    `Crédito: ${data.credit_band}`,
    `Capital: ${data.capital_band}`,
    `Antigüedad del negocio: ${data.business_age}`,
    `Crew propia: ${data.crew_propia ? "sí" : "no"}`,
    escaleraInversa ? `Tag: escalera_inversa` : ``,
    ``,
    `Ciudad: ${data.city}`,
    `Oficio: ${data.trade}`,
    ``,
    `UTM source: ${data.utm_source || "-"}`,
    `UTM medium: ${data.utm_medium || "-"}`,
    `UTM campaign: ${data.utm_campaign || "-"}`,
  ].filter((l) => l !== undefined).join("\n");

  try {
    // ── <<< INTEGRAR #1 >>> Crear el lead en la cuenta de Owl Funding ──────────
    // Usar el SERVICIO EXISTENTE de leads de leadprime (no crear esquema nuevo).
    // Debe asignarse al pipeline LEGACY_PIPELINE_NAME, primer stage
    // LEGACY_PIPELINE_FIRST_STAGE. Si el pipeline NO existe, crear el lead SIN
    // pipeline y registrarlo (Gelasio lo crea desde la UI). NO crear pipelines.
    //
    // Ejemplo (ajustar a la firma real del servicio de leadprime):
    //
    //   await leadsService.createLead({
    //     contractorId: LEGACY_LEADS_CONTRACTOR_ID,
    //     source: "legacy.chyrris.com",
    //     name: data.name,
    //     email: data.email,
    //     phone: data.phone,
    //     city: data.city,
    //     tags,                       // ["legacy", route, "escalera_inversa"?, ...]
    //     notes,
    //     pipeline: LEGACY_PIPELINE_NAME,      // si existe
    //     stage: LEGACY_PIPELINE_FIRST_STAGE,  // "Nuevo"
    //   });
    //
    // Si el servicio no acepta pipeline inexistente, capturar y crear sin él.
    await createLeadViaLeadPrime({
      contractorId: LEGACY_LEADS_CONTRACTOR_ID,
      source: "legacy.chyrris.com",
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      tags,
      notes,
      pipelineName: LEGACY_PIPELINE_NAME,
      firstStage: LEGACY_PIPELINE_FIRST_STAGE,
    });

    // ── <<< INTEGRAR #2 >>> Notificación por email a info@chyrris.com ──────────
    // Usar el mailer existente de leadprime (SendGrid/Nodemailer, el que aplique).
    await notifyByEmail({
      to: LEAD_NOTIFY_EMAIL,
      subject: `Nuevo lead Legacy — Ruta ${route} — ${data.name} (${data.city})`,
      text:
        `Nuevo lead desde legacy.chyrris.com\n\n` +
        `Nombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\n` +
        `Ciudad: ${data.city}\nOficio: ${data.trade}\n\n` +
        `RUTA: ${route}\nTags: ${tags.join(", ")}\n\n${notes}`,
    });
  } catch (err) {
    // No filtramos detalles al cliente; log interno para observabilidad.
    console.error("[legacy-quiz] error creando lead/notificando:", err);
    // El lead pudo fallar, pero el usuario igual debe ver su ruta.
    // Devolvemos ok:true con route para no romper la UX; el fallo queda en logs
    // y (recomendado) en una cola/reintento del propio leadprime.
  }

  // 6) Respuesta
  return res.status(200).json({ ok: true, route, booking_available });
}

// ─────────────────────────────────────────────────────────────────────────────
// Stubs de integración — REEMPLAZAR por los servicios reales de leadprime.
// Se dejan como funciones para que el archivo compile y sea testeable en aislado.
// ─────────────────────────────────────────────────────────────────────────────
type CreateLeadArgs = {
  contractorId: string; source: string; name: string; email: string;
  phone: string; city: string; tags: string[]; notes: string;
  pipelineName: string; firstStage: string;
};
async function createLeadViaLeadPrime(_args: CreateLeadArgs): Promise<void> {
  throw new Error("createLeadViaLeadPrime no está conectado al servicio de leadprime todavía");
}
async function notifyByEmail(_args: { to: string; subject: string; text: string }): Promise<void> {
  throw new Error("notifyByEmail no está conectado al mailer de leadprime todavía");
}

// Registro de ruta (Express) — añadir en el router público de leadprime:
//   import { legacyQuizHandler } from "./legacy/handler.js";
//   app.post("/api/public/legacy-quiz", express.json(), legacyQuizHandler);
