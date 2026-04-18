export interface SolarEstimateInput {
  monthlyBill: number;
  customerType: "Residential" | "Commercial" | "Industrial";
  location: "Greater Accra" | "Ashanti" | "Western" | "Other";
  propertyOwnership: "Own" | "Renting";
}

export interface SolarEstimateOutput {
  monthlySavings: number;
  annualSavings: number;
  paybackYears: number;
  twentyFiveYearSavings: number;
  co2OffsetKg: number;
  recommendedSystemSizeKw: number;
}

const CUSTOMER_MULTIPLIER = {
  Residential: 1,
  Commercial: 1.22,
  Industrial: 1.52,
} as const;

const LOCATION_MULTIPLIER = {
  "Greater Accra": 1.06,
  Ashanti: 1,
  Western: 1.08,
  Other: 0.96,
} as const;

const OWNERSHIP_FACTOR = {
  Own: 1,
  Renting: 0.88,
} as const;

export function calculateSolarEstimate(
  input: SolarEstimateInput,
): SolarEstimateOutput {
  const performanceFactor =
    CUSTOMER_MULTIPLIER[input.customerType] *
    LOCATION_MULTIPLIER[input.location] *
    OWNERSHIP_FACTOR[input.propertyOwnership];

  const monthlySavings = Math.round(input.monthlyBill * 0.74 * performanceFactor);
  const annualSavings = monthlySavings * 12;
  const recommendedSystemSizeKw = Number(
    Math.max(2.5, (input.monthlyBill / 165) * performanceFactor).toFixed(1),
  );
  const systemCost = recommendedSystemSizeKw * 5600;
  const paybackYears = Number((systemCost / annualSavings).toFixed(1));
  const twentyFiveYearSavings = annualSavings * 25;
  const co2OffsetKg = Math.round(recommendedSystemSizeKw * 410);

  return {
    monthlySavings,
    annualSavings,
    paybackYears,
    twentyFiveYearSavings,
    co2OffsetKg,
    recommendedSystemSizeKw,
  };
}
