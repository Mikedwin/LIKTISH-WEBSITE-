import type { SpamProtectionInput } from "@/types/site";

const MIN_FORM_FILL_TIME_MS = 2500;
const MAX_LINK_COUNT = 3;

function countLinks(value: string) {
  const matches = value.match(/https?:\/\//gi);
  return matches?.length ?? 0;
}

export function checkSpamProtection(
  input: SpamProtectionInput,
  fieldsToScan: string[] = [],
): {
  valid: boolean;
  status: number;
  message: string;
} {
  if (input.website?.trim()) {
    return {
      valid: false,
      status: 200,
      message: "Thanks. LIKTISH has received your request.",
    };
  }

  if (
    typeof input.formStartedAt !== "number" ||
    !Number.isFinite(input.formStartedAt) ||
    Date.now() - input.formStartedAt < MIN_FORM_FILL_TIME_MS
  ) {
    return {
      valid: false,
      status: 400,
      message: "Please take a moment to complete the form and try again.",
    };
  }

  const combinedContent = fieldsToScan.join(" ").trim();

  if (combinedContent && countLinks(combinedContent) > MAX_LINK_COUNT) {
    return {
      valid: false,
      status: 400,
      message: "Please remove excessive links and try again.",
    };
  }

  return {
    valid: true,
    status: 200,
    message: "",
  };
}
