import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseInsert } from "@/lib/supabase/rest";
import type { ContactInput, SavingsLeadInput } from "@/types/site";

declare global {
  var __liktishLeadStore:
    | {
        contacts: ContactInput[];
        savingsLeads: SavingsLeadInput[];
      }
    | undefined;
}

const store =
  globalThis.__liktishLeadStore ??
  (globalThis.__liktishLeadStore = {
    contacts: [],
    savingsLeads: [],
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
