import "server-only";

import { LEAD_STATUSES } from "@/lib/admin/lead-types";
import type { AdminLeadRow, LeadStatus, LeadTable } from "@/lib/admin/lead-types";
import { supabaseSelect, supabaseUpdate } from "@/lib/supabase/rest";

const LEAD_TABLES: Array<{
  table: LeadTable;
  type: string;
  summaryField: string;
}> = [
  { table: "contact_inquiries", type: "Contact", summaryField: "message" },
  { table: "savings_leads", type: "Savings", summaryField: "estimate_summary" },
  { table: "solar_assessments", type: "Solar assessment", summaryField: "help_needed" },
];

type RawLeadRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  lead_status?: LeadStatus;
  created_at: string;
  updated_at?: string;
  anonymized_at?: string | null;
  source_path?: string | null;
  request_id?: string | null;
  message?: string;
  estimate_summary?: string;
  help_needed?: string;
};

export async function getLeadDashboard(limit = 50) {
  const groups = await Promise.all(
    LEAD_TABLES.map(async ({ table, type, summaryField }) => {
      const rows = await supabaseSelect<RawLeadRow[]>(table, {
        order: "created_at.desc",
        limit,
      });

      return rows.map((row) => normalizeLeadRow(row, table, type, summaryField));
    }),
  );

  const leads = groups
    .flat()
    .sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at))
    .slice(0, limit);

  return {
    leads,
    stats: buildLeadStats(leads),
  };
}

export async function getLeadsForExport(limit = 1000) {
  const groups = await Promise.all(
    LEAD_TABLES.map(async ({ table, type, summaryField }) => {
      const rows = await supabaseSelect<RawLeadRow[]>(table, {
        order: "created_at.desc",
        limit,
      });

      return rows.map((row) => normalizeLeadRow(row, table, type, summaryField));
    }),
  );

  return groups
    .flat()
    .sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at));
}

export async function updateLeadStatus(table: LeadTable, id: number, status: LeadStatus) {
  const timestampField = getStatusTimestampField(status);
  const payload: Record<string, unknown> = {
    lead_status: status,
  };

  if (timestampField) {
    payload[timestampField] = new Date().toISOString();
  }

  return supabaseUpdate(table, { id }, payload);
}

export async function anonymizeLead(table: LeadTable, id: number) {
  const now = new Date().toISOString();
  const payload: Record<string, unknown> = {
    name: "Anonymized lead",
    email: `anonymized+${table}-${id}@liktish.local`,
    phone: "Anonymized",
    lead_status: "closed",
    source_page_url: null,
    user_agent: null,
    assigned_to: null,
    closed_at: now,
    archived_at: now,
    anonymized_at: now,
    retention_until: now,
  };

  if (table === "contact_inquiries") {
    payload.message = "Anonymized by admin privacy action.";
  }

  if (table === "savings_leads") {
    payload.estimate_summary = "Anonymized by admin privacy action.";
  }

  if (table === "solar_assessments") {
    payload.address = "Anonymized";
    payload.help_needed = "Anonymized by admin privacy action.";
  }

  return supabaseUpdate(table, { id }, payload);
}

export function isLeadTable(value: string): value is LeadTable {
  return LEAD_TABLES.some((entry) => entry.table === value);
}

export function isLeadStatus(value: string): value is LeadStatus {
  return LEAD_STATUSES.includes(value as LeadStatus);
}

function normalizeLeadRow(
  row: RawLeadRow,
  table: LeadTable,
  type: string,
  summaryField: string,
): AdminLeadRow {
  const summaryValue = row[summaryField as keyof RawLeadRow];

  return {
    id: row.id,
    table,
    type,
    name: row.name,
    email: row.email,
    phone: row.phone,
    lead_status: row.lead_status ?? "new",
    created_at: row.created_at,
    updated_at: row.updated_at,
    anonymized_at: row.anonymized_at,
    source_path: row.source_path,
    request_id: row.request_id,
    summary: typeof summaryValue === "string" ? summaryValue : "",
  };
}

function buildLeadStats(leads: AdminLeadRow[]) {
  return LEAD_STATUSES.map((status) => ({
    status,
    count: leads.filter((lead) => lead.lead_status === status).length,
  }));
}

function getStatusTimestampField(status: LeadStatus) {
  if (status === "contacted") return "contacted_at";
  if (status === "qualified") return "qualified_at";
  if (status === "converted") return "converted_at";
  if (status === "closed" || status === "spam") return "closed_at";
  return null;
}
