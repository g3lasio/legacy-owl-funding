// routing.test.mjs — prueba exhaustiva del router (node --test).
// Recorre las 5×4×4×2 = 160 combinaciones y compara contra una implementación
// de referencia INDEPENDIENTE (no reusa computeRoute) para atrapar errores.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  computeRoute,
  CREDIT_BANDS,
  CAPITAL_BANDS,
  BUSINESS_AGES,
} from "./routing.mjs";

// Referencia independiente basada literalmente en el brief.
function expectedRoute(credit_band, capital_band) {
  const creditGE650 = ["650_699", "700_mas"].includes(credit_band);
  const capitalGE20k = ["20_50k", "50k_mas"].includes(capital_band);
  if (creditGE650 && capitalGE20k) return "EXPRESS";
  if (creditGE650) return "TRES_VIAS";
  if (capitalGE20k) return "CAPITAL_FIRST";
  return "ESCALERA";
}

test("las 160 combinaciones producen la ruta esperada", () => {
  let n = 0;
  for (const credit_band of CREDIT_BANDS)
    for (const capital_band of CAPITAL_BANDS)
      for (const business_age of BUSINESS_AGES)
        for (const crew_propia of [true, false]) {
          const { route } = computeRoute({ credit_band, capital_band, business_age, crew_propia });
          assert.equal(
            route,
            expectedRoute(credit_band, capital_band),
            `credit=${credit_band} capital=${capital_band}`
          );
          n++;
        }
  assert.equal(n, 160);
});

test("spot-checks explícitos del brief", () => {
  assert.equal(computeRoute({ credit_band: "700_mas", capital_band: "50k_mas", business_age: "3_mas", crew_propia: true }).route, "EXPRESS");
  assert.equal(computeRoute({ credit_band: "650_699", capital_band: "20_50k", business_age: "1_3", crew_propia: true }).route, "EXPRESS");
  assert.equal(computeRoute({ credit_band: "700_mas", capital_band: "menos_20k", business_age: "3_mas", crew_propia: false }).route, "TRES_VIAS");
  assert.equal(computeRoute({ credit_band: "650_699", capital_band: "nada", business_age: "3_mas", crew_propia: true }).route, "TRES_VIAS");
  // credit "no_se" con capital>=20k -> CAPITAL_FIRST
  assert.equal(computeRoute({ credit_band: "no_se", capital_band: "50k_mas", business_age: "1_3", crew_propia: true }).route, "CAPITAL_FIRST");
  assert.equal(computeRoute({ credit_band: "600_649", capital_band: "20_50k", business_age: "3_mas", crew_propia: true }).route, "CAPITAL_FIRST");
  // credit bajo + capital bajo -> ESCALERA
  assert.equal(computeRoute({ credit_band: "menos_600", capital_band: "nada", business_age: "3_mas", crew_propia: false }).route, "ESCALERA");
  assert.equal(computeRoute({ credit_band: "no_se", capital_band: "menos_20k", business_age: "1_3", crew_propia: false }).route, "ESCALERA");
});

test("tag escalera_inversa cuando business_age es sin_negocio o menos_1", () => {
  assert.ok(computeRoute({ credit_band: "700_mas", capital_band: "50k_mas", business_age: "sin_negocio", crew_propia: true }).tags.includes("escalera_inversa"));
  assert.ok(computeRoute({ credit_band: "700_mas", capital_band: "50k_mas", business_age: "menos_1", crew_propia: true }).tags.includes("escalera_inversa"));
  assert.ok(!computeRoute({ credit_band: "700_mas", capital_band: "50k_mas", business_age: "1_3", crew_propia: true }).tags.includes("escalera_inversa"));
  assert.ok(!computeRoute({ credit_band: "700_mas", capital_band: "50k_mas", business_age: "3_mas", crew_propia: true }).tags.includes("escalera_inversa"));
});

test("tags base siempre incluyen legacy + ruta; booking solo en rutas calificadas", () => {
  const r = computeRoute({ credit_band: "700_mas", capital_band: "50k_mas", business_age: "3_mas", crew_propia: true });
  assert.ok(r.tags.includes("legacy"));
  assert.ok(r.tags.includes("EXPRESS"));
  assert.equal(r.booking_eligible, true);
  const e = computeRoute({ credit_band: "menos_600", capital_band: "nada", business_age: "3_mas", crew_propia: false });
  assert.equal(e.booking_eligible, false); // ESCALERA no agenda
});
