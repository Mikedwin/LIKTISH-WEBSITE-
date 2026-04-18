import type { ContactInput, SavingsLeadInput } from "@/types/site";

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
