export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "closed" | "spam";
export type LeadTable = "contact_inquiries" | "savings_leads" | "solar_assessments";

export interface AdminLeadRow {
  id: number;
  table: LeadTable;
  type: string;
  name: string;
  email: string;
  phone: string;
  lead_status: LeadStatus;
  created_at: string;
  updated_at?: string;
  anonymized_at?: string | null;
  source_path?: string | null;
  request_id?: string | null;
  summary: string;
}

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "closed",
  "spam",
];
