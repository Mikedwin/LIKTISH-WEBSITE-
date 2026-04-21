import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseInsert } from "@/lib/supabase/rest";
import type { ContactInput, SavingsLeadInput, SolarAssessmentInput } from "@/types/site";

declare global {
  var __liktishLeadStore:
    | {
        contacts: ContactInput[];
        savingsLeads: SavingsLeadInput[];
        solarAssessments: SolarAssessmentInput[];
      }
    | undefined;
}

const store =
  globalThis.__liktishLeadStore ??
  (globalThis.__liktishLeadStore = {
    contacts: [],
    savingsLeads: [],
    solarAssessments: [],
  });

export async function createContactInquiry(input: ContactInput) {
  if (!hasSupabaseAdminConfig()) {
    store.contacts.unshift(input);
    return input;
  }

  await supabaseInsert("contact_inquiries", {
    name: input.name,
    email: input.email,
    phone: input.phone,
    enquiry_type: input.enquiryType,
    message: input.message,
  });

  return input;
}

export async function createSavingsLead(input: SavingsLeadInput) {
  if (!hasSupabaseAdminConfig()) {
    store.savingsLeads.unshift(input);
    return input;
  }

  await supabaseInsert("savings_leads", {
    name: input.name,
    phone: input.phone,
    email: input.email,
    estimate_summary: input.estimateSummary,
  });

  return input;
}

export async function createSolarAssessment(input: SolarAssessmentInput) {
  if (!hasSupabaseAdminConfig()) {
    store.solarAssessments.unshift(input);
    return input;
  }

  await supabaseInsert("solar_assessments", {
    request_nature: input.requestNature,
    installer_type: input.installerType,
    name: input.name,
    address: input.address,
    email: input.email,
    help_needed: input.helpNeeded,
    phone: input.phone,
    preferred_contact_method: input.preferredContactMethod,
    consent: input.consent,
  });

  return input;
}
