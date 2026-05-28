import "server-only";

import { assertProductionLeadStorageEnv, isProductionRuntime } from "@/lib/env";
import { StorageUnavailableError } from "@/lib/errors";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseInsert } from "@/lib/supabase/rest";
import type { ContactInput, SavingsLeadInput, SolarAssessmentInput } from "@/types/site";

export interface LeadMetadata {
  requestId: string;
  sourcePath: string;
  sourcePageUrl?: string;
  userAgent?: string;
}

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

function ensureStorageAvailable() {
  assertProductionLeadStorageEnv();

  if (hasSupabaseAdminConfig()) {
    return "supabase";
  }

  if (!isProductionRuntime()) {
    return "memory";
  }

  throw new StorageUnavailableError();
}

function buildLeadMetadata(metadata?: LeadMetadata) {
  if (!metadata) {
    return {};
  }

  return {
    request_id: metadata.requestId,
    source_path: metadata.sourcePath,
    source_page_url: metadata.sourcePageUrl ?? null,
    user_agent: metadata.userAgent ?? null,
  };
}

export async function createContactInquiry(input: ContactInput, metadata?: LeadMetadata) {
  if (ensureStorageAvailable() === "memory") {
    store.contacts.unshift(input);
    return input;
  }

  await supabaseInsert("contact_inquiries", {
    name: input.name,
    email: input.email,
    phone: input.phone,
    enquiry_type: input.enquiryType,
    message: input.message,
    ...buildLeadMetadata(metadata),
  });

  return input;
}

export async function createSavingsLead(input: SavingsLeadInput, metadata?: LeadMetadata) {
  if (ensureStorageAvailable() === "memory") {
    store.savingsLeads.unshift(input);
    return input;
  }

  await supabaseInsert("savings_leads", {
    name: input.name,
    phone: input.phone,
    email: input.email,
    estimate_summary: input.estimateSummary,
    ...buildLeadMetadata(metadata),
  });

  return input;
}

export async function createSolarAssessment(input: SolarAssessmentInput, metadata?: LeadMetadata) {
  if (ensureStorageAvailable() === "memory") {
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
    consent_at: input.consent ? new Date().toISOString() : null,
    ...buildLeadMetadata(metadata),
  });

  return input;
}
