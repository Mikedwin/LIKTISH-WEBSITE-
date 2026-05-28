"use client";

import { useState } from "react";
import { LEAD_STATUSES } from "@/lib/admin/lead-types";
import type { AdminLeadRow, LeadStatus } from "@/lib/admin/lead-types";

export function AdminDashboard({
  leads,
  role,
}: {
  leads: AdminLeadRow[];
  role: "admin" | "viewer";
}) {
  const [rows, setRows] = useState(leads);
  const [message, setMessage] = useState("");
  const canEdit = role === "admin";

  async function updateStatus(lead: AdminLeadRow, status: LeadStatus) {
    setMessage("");
    const response = await fetch("/api/admin/leads/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: lead.table,
        id: lead.id,
        status,
      }),
    });

    if (!response.ok) {
      setMessage("Unable to update lead status.");
      return;
    }

    setRows((current) =>
      current.map((row) =>
        row.table === lead.table && row.id === lead.id
          ? { ...row, lead_status: status }
          : row,
      ),
    );
    setMessage("Lead status updated.");
  }

  async function anonymizeLead(lead: AdminLeadRow) {
    setMessage("");

    if (
      !window.confirm(
        "Anonymize this lead? This removes personal data and marks the record for cleanup.",
      )
    ) {
      return;
    }

    const response = await fetch("/api/admin/leads/anonymize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table: lead.table,
        id: lead.id,
      }),
    });

    if (!response.ok) {
      setMessage("Unable to anonymize lead.");
      return;
    }

    setRows((current) =>
      current.map((row) =>
        row.table === lead.table && row.id === lead.id
          ? {
              ...row,
              name: "Anonymized lead",
              email: "Anonymized",
              phone: "Anonymized",
              summary: "Anonymized by admin privacy action.",
              lead_status: "closed",
              anonymized_at: new Date().toISOString(),
            }
          : row,
      ),
    );
    setMessage("Lead personal data anonymized.");
  }

  return (
    <section className="space-y-4">
      {message ? (
        <p className="rounded-[0.85rem] border border-[#b8dfcd] bg-[#f3fbf6] px-4 py-3 text-sm text-[#2f6b51]">
          {message}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-[1.25rem] border border-[#d9e5dc] bg-white">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-[#edf4ef] text-xs uppercase tracking-[0.14em] text-[#4f7265]">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Summary</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              {canEdit ? <th className="px-4 py-3">Privacy</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((lead) => (
              <tr key={`${lead.table}:${lead.id}`} className="border-t border-[#e4eee8] align-top">
                <td className="px-4 py-4">
                  <p className="font-semibold text-[#14372b]">{lead.name}</p>
                  <p className="mt-1 text-xs text-[#4f7265]">{lead.type} #{lead.id}</p>
                  {lead.source_path ? (
                    <p className="mt-1 text-xs text-[#798693]">{lead.source_path}</p>
                  ) : null}
                </td>
                <td className="px-4 py-4 text-[#4f5f57]">
                  <p>{lead.email}</p>
                  <p className="mt-1">{lead.phone}</p>
                </td>
                <td className="max-w-md px-4 py-4 text-[#4f5f57]">
                  {lead.summary.slice(0, 220)}
                  {lead.summary.length > 220 ? "..." : ""}
                </td>
                <td className="px-4 py-4">
                  {canEdit ? (
                    <select
                      value={lead.lead_status}
                      onChange={(event) =>
                        updateStatus(lead, event.target.value as LeadStatus)
                      }
                      className="rounded-[0.85rem] border border-[#d9e5dc] bg-white px-3 py-2 text-sm"
                    >
                      {LEAD_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="rounded-full bg-[#edf4ef] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#159066]">
                      {lead.lead_status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-[#4f5f57]">
                  {new Date(lead.created_at).toLocaleString()}
                  {lead.anonymized_at ? (
                    <p className="mt-1 text-xs font-semibold text-[#9b5a2a]">Anonymized</p>
                  ) : null}
                </td>
                {canEdit ? (
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => anonymizeLead(lead)}
                      disabled={Boolean(lead.anonymized_at)}
                      className="inline-flex min-h-10 items-center rounded-[0.85rem] border border-[#b65d46] px-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#9b3f2c] disabled:cursor-not-allowed disabled:border-[#d9e5dc] disabled:text-[#7c8a83]"
                    >
                      Anonymize
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-[#4f5f57]">No leads yet.</p>
        ) : null}
      </div>
    </section>
  );
}
