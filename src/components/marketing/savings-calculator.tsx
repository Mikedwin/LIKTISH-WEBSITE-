"use client";

import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";
import { calculateSolarEstimate } from "@/lib/calculator/solar";
import type { SavingsLeadInput } from "@/types/site";
import { formatPrice } from "@/lib/utils";

type SavingsLeadFormState = Omit<SavingsLeadInput, "estimateSummary">;

function createInitialLead(): SavingsLeadFormState {
  return {
    name: "",
    phone: "",
    email: "",
    website: "",
    formStartedAt: Date.now(),
  };
}

export function SavingsCalculator() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [monthlyBill, setMonthlyBill] = useState(1200);
  const [customerType, setCustomerType] = useState<
    "Residential" | "Commercial" | "Industrial"
  >("Residential");
  const [location, setLocation] = useState<
    "Greater Accra" | "Ashanti" | "Western" | "Other"
  >("Western");
  const [propertyOwnership, setPropertyOwnership] = useState<"Own" | "Renting">("Own");
  const [lead, setLead] = useState(createInitialLead);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusTone, setStatusTone] = useState<"error" | "success">("success");

  const estimate = useMemo(
    () =>
      calculateSolarEstimate({
        monthlyBill,
        customerType,
        location,
        propertyOwnership,
      }),
    [customerType, location, monthlyBill, propertyOwnership],
  );

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (turnstileSiteKey && !lead.turnstileToken) {
      setStatusTone("error");
      setStatus("Please complete the verification check before requesting a quote.");
      return;
    }

    setStatus("");
    setLoading(true);

    const response = await fetch("/api/savings-leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...lead,
        estimateSummary: `${customerType} lead in ${location}: estimated monthly savings ${formatPrice(
          estimate.monthlySavings,
        )}`,
      }),
    });

    const payload = (await response.json()) as { error?: string; message?: string };
    setLoading(false);
    setStatusTone(response.ok ? "success" : "error");
    setStatus(payload.message ?? payload.error ?? "Saved.");

    if (response.ok) {
      setLead(createInitialLead());
    }
  }

  return (
    <section className="px-4 py-18 sm:py-24">
      <div className="container-shell">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="ink-panel rounded-[1.7rem] p-5 text-white sm:rounded-[2rem] sm:p-7 md:p-9">
            <p className="eyebrow text-white/68">Solar Savings Calculator</p>
            <h2 className="headline mt-4 max-w-xl text-[2.1rem] font-black sm:mt-5 sm:text-4xl md:text-5xl">
              How much could you save with solar?
            </h2>
            <p className="mt-5 max-w-lg text-[0.98rem] leading-7 text-white/74 sm:mt-6 sm:text-base sm:leading-8">
              This should feel like a serious decision tool, not a decorative widget. Visitors should understand the estimate, then move naturally into the next conversation with LIKTISH.
            </p>
            <div className="mt-10 grid gap-4">
              <FormField label="Monthly electricity bill (GHS)">
                <input
                  type="number"
                  min={0}
                  value={monthlyBill}
                  onChange={(event) => setMonthlyBill(Number(event.target.value) || 0)}
                  className="field-shell border-white/14 bg-white/10 text-white"
                />
              </FormField>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Customer type">
                  <select
                    value={customerType}
                    onChange={(event) =>
                      setCustomerType(
                        event.target.value as "Residential" | "Commercial" | "Industrial",
                      )
                    }
                    className="field-shell border-white/14 bg-white/10 text-white"
                  >
                    <option className="text-foreground">Residential</option>
                    <option className="text-foreground">Commercial</option>
                    <option className="text-foreground">Industrial</option>
                  </select>
                </FormField>
                <FormField label="Location">
                  <select
                    value={location}
                    onChange={(event) =>
                      setLocation(
                        event.target.value as "Greater Accra" | "Ashanti" | "Western" | "Other",
                      )
                    }
                    className="field-shell border-white/14 bg-white/10 text-white"
                  >
                    <option className="text-foreground">Greater Accra</option>
                    <option className="text-foreground">Ashanti</option>
                    <option className="text-foreground">Western</option>
                    <option className="text-foreground">Other</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Property ownership">
                <select
                  value={propertyOwnership}
                  onChange={(event) =>
                    setPropertyOwnership(event.target.value as "Own" | "Renting")
                  }
                  className="field-shell border-white/14 bg-white/10 text-white"
                >
                  <option className="text-foreground">Own</option>
                  <option className="text-foreground">Renting</option>
                </select>
              </FormField>
            </div>
          </div>

          <div className="editorial-panel rounded-[1.7rem] p-4 sm:rounded-[2rem] sm:p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.3rem] bg-brand px-4 py-5 text-white sm:rounded-[1.5rem] sm:px-5 sm:py-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Estimated monthly savings
                </p>
                <p className="headline mt-3 text-[2.15rem] font-black sm:mt-4 sm:text-4xl md:text-5xl">
                  {formatPrice(estimate.monthlySavings)}
                </p>
              </div>
              <ResultCard label="Estimated annual savings" value={formatPrice(estimate.annualSavings)} />
              <ResultCard label="Estimated system payback period" value={`${estimate.paybackYears} years`} accent />
              <ResultCard label="Recommended system size" value={`${estimate.recommendedSystemSizeKw} kW`} />
              <ResultCard label="25-year projected savings" value={formatPrice(estimate.twentyFiveYearSavings)} />
              <ResultCard label="Estimated CO2 offset" value={`${estimate.co2OffsetKg} kg/year`} />
            </div>

            <form onSubmit={handleLeadSubmit} className="mt-6 rounded-[1.35rem] border border-border bg-white/84 p-4 sm:rounded-[1.6rem] sm:p-6">
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                    Next step
                  </p>
                  <h3 className="headline mt-3 text-[1.6rem] font-black text-brand sm:text-2xl">
                    Get Your Accurate Quote and Let LIKTISH Follow Up
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={lead.website}
                    onChange={(event) => setLead({ ...lead, website: event.target.value })}
                    className="hidden"
                    name="website"
                  />
                  <input
                    required
                    value={lead.name}
                    onChange={(event) => setLead({ ...lead, name: event.target.value })}
                    placeholder="Name"
                    className="field-shell"
                  />
                  <input
                    required
                    value={lead.phone}
                    onChange={(event) => setLead({ ...lead, phone: event.target.value })}
                    placeholder="Phone"
                    className="field-shell"
                  />
                  <input
                    required
                    type="email"
                    value={lead.email}
                    onChange={(event) => setLead({ ...lead, email: event.target.value })}
                    placeholder="Email"
                    className="field-shell"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-5 inline-flex min-h-12 items-center rounded-[1rem] bg-brand px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] disabled:opacity-60"
              >
                {loading ? "Saving..." : "Get My Accurate Quote"}
              </button>
              <div className="mt-4">
                <TurnstileWidget
                  siteKey={turnstileSiteKey}
                  onVerify={(token) =>
                    setLead((current) => ({ ...current, turnstileToken: token ?? undefined }))
                  }
                />
              </div>
              {status ? (
                <p
                  className={
                    statusTone === "error"
                      ? "status-chip mt-4 rounded-[1rem] border border-[#d39c95] bg-[#fff4f2] px-4 py-3 text-sm text-[#8d4a40]"
                      : "status-chip mt-4 rounded-[1rem] border border-[#b8dfcd] bg-[#f3fbf6] px-4 py-3 text-sm text-[#2f6b51]"
                  }
                >
                  {status}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className={accent ? "rounded-[1.45rem] bg-[#efe2c8] p-5" : "rounded-[1.45rem] bg-white/78 p-5"}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">{label}</p>
      <p className="headline mt-4 text-2xl font-black text-brand">{value}</p>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/88">{label}</span>
      {children}
    </label>
  );
}
