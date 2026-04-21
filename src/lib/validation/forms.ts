import type { ContactInput, SavingsLeadInput, SolarAssessmentInput } from "@/types/site";

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export function validateContactInput(input: Partial<ContactInput>) {
  const errors: string[] = [];

  if (!input.name?.trim()) errors.push("Name is required.");
  if (!input.email?.trim() || !isEmail(input.email)) {
    errors.push("A valid email address is required.");
  }
  if (!input.phone?.trim()) errors.push("Phone is required.");
  if (!input.enquiryType?.trim()) errors.push("Enquiry type is required.");
  if (!input.message?.trim()) errors.push("Message is required.");

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateSavingsLeadInput(input: Partial<SavingsLeadInput>) {
  const errors: string[] = [];

  if (!input.name?.trim()) errors.push("Name is required.");
  if (!input.phone?.trim()) errors.push("Phone is required.");
  if (!input.email?.trim() || !isEmail(input.email)) {
    errors.push("A valid email address is required.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateSolarAssessmentInput(input: Partial<SolarAssessmentInput>) {
  const errors: string[] = [];

  if (!input.requestNature?.trim() || input.requestNature === "Please Select") {
    errors.push("Request nature is required.");
  }
  if (!input.installerType?.trim() || input.installerType === "Please Select") {
    errors.push("Installer information is required.");
  }
  if (!input.name?.trim()) errors.push("Name is required.");
  if (!input.address?.trim()) errors.push("Address is required.");
  if (!input.email?.trim() || !isEmail(input.email)) {
    errors.push("A valid email address is required.");
  }
  if (!input.helpNeeded?.trim()) errors.push("Project details are required.");
  if (!input.phone?.trim()) errors.push("Phone is required.");
  if (!input.preferredContactMethod?.trim() || input.preferredContactMethod === "Please Select") {
    errors.push("Preferred contact method is required.");
  }
  if (!input.consent) {
    errors.push("Consent is required.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
