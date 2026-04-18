import test from "node:test";
import assert from "node:assert/strict";
import { calculateSolarEstimate } from "../src/lib/calculator/solar.ts";

test("solar estimate returns positive savings and payback", () => {
  const estimate = calculateSolarEstimate({
    monthlyBill: 1200,
    customerType: "Commercial",
    location: "Western",
    propertyOwnership: "Own",
  });

  assert.equal(estimate.monthlySavings > 0, true);
  assert.equal(estimate.annualSavings, estimate.monthlySavings * 12);
  assert.equal(estimate.paybackYears > 0, true);
  assert.equal(estimate.recommendedSystemSizeKw > 0, true);
});
