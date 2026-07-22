// legacyQuiz.schema.ts — Validación Zod del body de POST /api/public/legacy-quiz.
// Portar a g3lasio/leadprime (ya usa zod ^3).
import { z } from "zod";

export const CreditBand = z.enum(["no_se", "menos_600", "600_649", "650_699", "700_mas"]);
export const CapitalBand = z.enum(["nada", "menos_20k", "20_50k", "50k_mas"]);
export const BusinessAge = z.enum(["sin_negocio", "menos_1", "1_3", "3_mas"]);

// Teléfono flexible (EE.UU./LatAm): 7–20 caracteres, dígitos y separadores comunes.
const phone = z
  .string()
  .trim()
  .min(7, "Teléfono inválido")
  .max(20)
  .regex(/^[0-9+()\-.\s]{7,20}$/, "Teléfono inválido");

export const legacyQuizSchema = z.object({
  // Contacto
  name: z.string().trim().min(2, "Nombre requerido").max(120),
  phone,
  email: z.string().trim().email("Email inválido").max(160),
  city: z.string().trim().min(2, "Ciudad requerida").max(120),
  trade: z.string().trim().min(2, "Oficio requerido").max(120), // oficio / crew

  // Quiz (4 preguntas)
  credit_band: CreditBand,
  capital_band: CapitalBand,
  business_age: BusinessAge,
  crew_propia: z.boolean(),

  // Atribución (opcional)
  utm_source: z.string().trim().max(120).optional(),
  utm_medium: z.string().trim().max(120).optional(),
  utm_campaign: z.string().trim().max(120).optional(),

  // Honeypot anti-bot: campo oculto que un humano deja vacío.
  // Cualquier valor => se descarta silenciosamente (200 falso).
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type LegacyQuizInput = z.infer<typeof legacyQuizSchema>;
