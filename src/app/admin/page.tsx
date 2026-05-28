import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/app/admin/admin-dashboard";
import { getLeadDashboard } from "@/lib/admin/leads";
import { getAdminSession } from "@/lib/admin/auth";
import { getOperationalEvents } from "@/lib/ops/events";

export const metadata: Metadata = {
  title: "Admin Dashboard | LIKTISH Engineering",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const [dashboard, operationalEvents] = await Promise.all([
    getLeadDashboard(),
    getOperationalEvents(),
  ]);

  return (
    <main className="min-h-screen bg-[#f4f0e8] px-4 py-8 text-[#183127]">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-[1.4rem] border border-[#d9e5dc] bg-white p-5 shadow-[0_18px_60px_rgba(20,55,43,0.08)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4f7265]">
              LIKTISH Admin
            </p>
            <h1 className="mt-2 text-3xl font-black text-[#159066]">Lead dashboard</h1>
            <p className="mt-2 text-sm text-[#4f5f57]">
              Signed in as {session.username} ({session.role})
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {session.role === "admin" ? (
              <Link
                href="/api/admin/leads/export"
                className="inline-flex min-h-11 items-center rounded-[0.9rem] border border-[#159066] px-4 text-sm font-semibold text-[#159066]"
              >
                Export CSV
              </Link>
            ) : null}
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center rounded-[0.9rem] bg-[#159066] px-4 text-sm font-semibold text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {dashboard.stats.map((stat) => (
            <div key={stat.status} className="rounded-[1rem] border border-[#d9e5dc] bg-white p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#4f7265]">{stat.status}</p>
              <p className="mt-2 text-2xl font-black text-[#159066]">{stat.count}</p>
            </div>
          ))}
        </section>

        <AdminDashboard leads={dashboard.leads} role={session.role} />

        <section className="rounded-[1.25rem] border border-[#d9e5dc] bg-white p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4f7265]">
                Operations
              </p>
              <h2 className="mt-1 text-xl font-black text-[#159066]">
                Recent operational events
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-[#4f5f57]">Latest {operationalEvents.length}</p>
              {session.role === "admin" ? (
                <form action="/api/admin/ops/test-alert" method="post">
                  <button
                    type="submit"
                    className="inline-flex min-h-10 items-center rounded-[0.85rem] border border-[#159066] px-3 text-sm font-semibold text-[#159066]"
                  >
                    Send Test Alert
                  </button>
                </form>
              ) : null}
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-[#edf4ef] text-xs uppercase tracking-[0.14em] text-[#4f7265]">
                <tr>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {operationalEvents.map((event) => (
                  <tr key={event.id} className="border-t border-[#e4eee8] align-top">
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-[#edf4ef] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#159066]">
                        {event.severity}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#14372b]">{event.event_type}</p>
                      <p className="mt-1 text-xs text-[#798693]">{event.source}</p>
                      {event.request_id ? (
                        <p className="mt-1 text-xs text-[#798693]">{event.request_id}</p>
                      ) : null}
                    </td>
                    <td className="max-w-lg px-4 py-4 text-[#4f5f57]">{event.message}</td>
                    <td className="px-4 py-4 text-[#4f5f57]">
                      {new Date(event.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {operationalEvents.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-[#4f5f57]">
                No operational events recorded yet.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
