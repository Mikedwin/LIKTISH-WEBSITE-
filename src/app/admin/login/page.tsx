import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin Login | LIKTISH Engineering",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#f4f0e8] px-4 py-16 text-[#183127]">
      <section className="mx-auto max-w-md rounded-[1.5rem] border border-[#d9e5dc] bg-white p-6 shadow-[0_24px_80px_rgba(20,55,43,0.12)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4f7265]">
          LIKTISH Admin
        </p>
        <h1 className="mt-3 text-3xl font-black text-[#159066]">Sign in</h1>
        <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Username</span>
            <input
              name="username"
              autoComplete="username"
              className="field-shell"
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="field-shell"
              required
            />
          </label>
          {params.error ? (
            <p className="rounded-[1rem] border border-[#d39c95] bg-[#fff4f2] px-4 py-3 text-sm text-[#8d4a40]">
              Invalid admin credentials.
            </p>
          ) : null}
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-[1rem] bg-[#159066] px-5 py-3 text-sm font-semibold text-white"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
