import type { ContactInput, SavingsLeadInput, SolarAssessmentInput } from "@/types/site";

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeMultiline(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

export function normalizeContactInput(input: Partial<ContactInput>): Partial<ContactInput> {
  return {
    ...input,
    name: input.name ? normalizeWhitespace(input.name) : input.name,
    email: input.email ? normalizeWhitespace(input.email).toLowerCase() : input.email,
    phone: input.phone ? normalizeWhitespace(input.phone) : input.phone,
    enquiryType: input.enquiryType
      ? normalizeWhitespace(input.enquiryType)
      : input.enquiryType,
    message: input.message ? normalizeMultiline(input.message) : input.message,
    website: input.website ? normalizeWhitespace(input.website) : input.website,
  };
}

export function normalizeSavingsLeadInput(
  input: Partial<SavingsLeadInput>,
): Partial<SavingsLeadInput> {
  return {
    ...input,
    name: input.name ? normalizeWhitespace(input.name) : input.name,
    email: input.email ? normalizeWhitespace(input.email).toLowerCase() : input.email,
    phone: input.phone ? normalizeWhitespace(input.phone) : input.phone,
    estimateSummary: input.estimateSummary
      ? normalizeMultiline(input.estimateSummary)
      : input.estimateSummary,
    website: input.website ? normalizeWhitespace(input.website) : input.website,
  };
}

export function normalizeSolarAssessmentInput(
  input: Partial<SolarAssessmentInput>,
): Partial<SolarAssessmentInput> {
  return {
    ...input,
    requestNature: input.requestNature
      ? normalizeWhitespace(input.requestNature)
      : input.requestNature,
    installerType: input.installerType
      ? normalizeWhitespace(input.installerType)
      : input.installerType,
    name: input.name ? normalizeWhitespace(input.name) : input.name,
    address: input.address ? normalizeWhitespace(input.address) : input.address,
    email: input.email ? normalizeWhitespace(input.email).toLowerCase() : input.email,
    helpNeeded: input.helpNeeded ? normalizeMultiline(input.helpNeeded) : input.helpNeeded,
    phone: input.phone ? normalizeWhitespace(input.phone) : input.phone,
    preferredContactMethod: input.preferredContactMethod
      ? normalizeWhitespace(input.preferredContactMethod)
      : input.preferredContactMethod,
    website: input.website ? normalizeWhitespace(input.website) : input.website,
  };
}
