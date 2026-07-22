// routing.mjs — Fuente única de verdad del Quiz Router de Legacy.
// Se usa (importado) por el handler del backend (g3lasio/leadprime) para
// RECALCULAR la ruta EN SERVIDOR. El cliente replica esta misma lógica solo
// para pintar la pantalla de resultado; el servidor es la autoridad.
//
// Reglas (BRIEF v2, punto 1.4), evaluadas EN ESTE ORDEN:
//   1. credit >= 650  AND capital >= 20k  -> EXPRESS
//   2. credit >= 650                       -> TRES_VIAS
//   3. capital >= 20k                      -> CAPITAL_FIRST  (incluye credit "no_se")
//   4. todo lo demás                       -> ESCALERA
// business_age y crew_propia NO bloquean: son tags.
// Si business_age IN (sin_negocio, menos_1) -> tag adicional "escalera_inversa".

export const CREDIT_BANDS = ["no_se", "menos_600", "600_649", "650_699", "700_mas"];
export const CAPITAL_BANDS = ["nada", "menos_20k", "20_50k", "50k_mas"];
export const BUSINESS_AGES = ["sin_negocio", "menos_1", "1_3", "3_mas"];
export const ROUTES = ["EXPRESS", "TRES_VIAS", "CAPITAL_FIRST", "ESCALERA"];

/** credit >= 650 ? (solo 650_699 y 700_mas cumplen; "no_se" NO cumple) */
export function creditIsQualified(credit_band) {
  return credit_band === "650_699" || credit_band === "700_mas";
}

/** capital >= 20k ? (20_50k y 50k_mas cumplen) */
export function capitalIsQualified(capital_band) {
  return capital_band === "20_50k" || capital_band === "50k_mas";
}

/**
 * Calcula la ruta y las tags a partir de las 4 respuestas del quiz.
 * @param {{credit_band:string, capital_band:string, business_age:string, crew_propia:boolean}} a
 * @returns {{route:string, tags:string[], escaleraInversa:boolean, booking_eligible:boolean}}
 */
export function computeRoute(a) {
  const credit = creditIsQualified(a.credit_band);
  const capital = capitalIsQualified(a.capital_band);

  let route;
  if (credit && capital) route = "EXPRESS";
  else if (credit) route = "TRES_VIAS";
  else if (capital) route = "CAPITAL_FIRST";
  else route = "ESCALERA";

  const escaleraInversa =
    a.business_age === "sin_negocio" || a.business_age === "menos_1";

  // Tags del lead (BRIEF 3.1): ["legacy", ruta, "escalera_inversa" si aplica].
  // Añadimos business_age y crew_propia como tags porque el punto 1.4 dice que
  // "son tags"; las 4 respuestas + UTMs también van en las notas del lead.
  const tags = ["legacy", route];
  if (escaleraInversa) tags.push("escalera_inversa");
  tags.push(`business_age:${a.business_age}`);
  tags.push(a.crew_propia ? "crew_propia" : "sin_crew");

  // Solo las 3 rutas calificadas agendan llamada; ESCALERA no agenda.
  const booking_eligible = route !== "ESCALERA";

  return { route, tags, escaleraInversa, booking_eligible };
}
