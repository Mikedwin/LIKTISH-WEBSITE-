import type { ContactInput, SavingsLeadInput, SolarAssessmentInput } from "@/types/site";

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

function ensureMaxLength(
  errors: string[],
  label: string,
  value: string | undefined,
  maxLength: number,
) {
  if (value && value.length > maxLength) {
    errors.push(`${label} must be ${maxLength} characters or fewer.`);
  }
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
  ensureMaxLength(errors, "Name", input.name, 120);
  ensureMaxLength(errors, "Email", input.email, 160);
  ensureMaxLength(errors, "Phone", input.phone, 40);
  ensureMaxLength(errors, "Enquiry type", input.enquiryType, 80);
  ensureMaxLength(errors, "Message", input.message, 3000);

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
  ensureMaxLength(errors, "Name", input.name, 120);
  ensureMaxLength(errors, "Phone", input.phone, 40);
  ensureMaxLength(errors, "Email", input.email, 160);
  ensureMaxLength(errors, "Estimate summary", input.estimateSummary, 1200);

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
  ensureMaxLength(errors, "Request nature", input.requestNature, 120);
  ensureMaxLength(errors, "Installer information", input.installerType, 120);
  ensureMaxLength(errors, "Name", input.name, 120);
  ensureMaxLength(errors, "Address", input.address, 240);
  ensureMaxLength(errors, "Email", input.email, 160);
  ensureMaxLength(errors, "Project details", input.helpNeeded, 4000);
  ensureMaxLength(errors, "Phone", input.phone, 40);
  ensureMaxLength(errors, "Preferred contact method", input.preferredContactMethod, 80);

  return {
    valid: errors.length === 0,
    errors,
  };
}
