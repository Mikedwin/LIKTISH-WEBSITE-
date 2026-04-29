"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";
import type { SolarAssessmentInput } from "@/types/site";

const requestOptions = [
  "Please Select",
  "New solar installation",
  "Assessment for an existing system",
  "Maintenance or repairs",
  "Battery backup or upgrade",
  "Commercial or business enquiry",
];

const installerOptions = [
  "Please Select",
  "LIKTISH Engineering",
  "Another solar company",
  "Independent installer",
  "Not installed yet",
  "Not sure",
];

const contactOptions = ["Please Select", "Phone call", "WhatsApp", "Email"];

function createInitialState(): SolarAssessmentInput {
  return {
    requestNature: "Please Select",
    installerType: "Please Select",
    name: "",
    address: "",
    email: "",
    helpNeeded: "",
    phone: "",
    preferredContactMethod: "Please Select",
    consent: false,
    website: "",
    formStartedAt: Date.now(),
  };
}

export function SolarAssessmentForm() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [formState, setFormState] = useState(createInitialState);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"error" | "success">("success");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (turnstileSiteKey && !formState.turnstileToken) {
      setStatusTone("error");
      setStatus("Please complete the verification check before submitting.");
      return;
    }

    setLoading(true);
    setStatus("");

    const response = await fetch("/api/solar-assessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    const payload = (await response.json()) as { error?: string; message?: string };
    setLoading(false);

    if (!response.ok) {
      setStatusTone("error");
      setStatus(payload.error ?? "Something went wrong.");
      return;
    }

    setStatusTone("success");
    setStatus(
      payload.message ??
        "Your solar assessment request has been sent. LIKTISH will follow up soon.",
    );
    setFormState(createInitialState());
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4 sm:space-y-5">
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={formState.website ?? ""}
        onChange={(event) => setFormState({ ...formState, website: event.target.value })}
        className="hidden"
        name="website"
      />
      <div className="rounded-[1.2rem] border border-white/45 bg-white/48 p-4 sm:rounded-[1.5rem] sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
          Project details
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
          <label className="flex h-full flex-col">
            <span className="mb-2 block min-h-[3rem] text-[0.92rem] font-semibold leading-6 text-brand sm:min-h-[3.5rem] sm:text-sm">
              What is the nature of your request?
            </span>
            <select
              className="field-shell"
              value={formState.requestNature}
              onChange={(event) =>
                setFormState({ ...formState, requestNature: event.target.value })
              }
            >
              {requestOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="flex h-full flex-col">
            <span className="mb-2 block min-h-[3rem] text-[0.92rem] font-semibold leading-6 text-brand sm:min-h-[3.5rem] sm:text-sm">
              Who installed the solar system at your home or business?
            </span>
            <select
              className="field-shell"
              value={formState.installerType}
              onChange={(event) =>
                setFormState({ ...formState, installerType: event.target.value })
              }
            >
              {installerOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="rounded-[1.2rem] border border-white/45 bg-white/42 p-4 sm:rounded-[1.5rem] sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
          Contact information
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-5">
          <label className="block">
            <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
              Name
            </span>
            <input
              type="text"
              className="field-shell"
              placeholder="Your full name"
              value={formState.name}
              onChange={(event) => setFormState({ ...formState, name: event.target.value })}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
              Phone Number*
            </span>
            <input
              type="tel"
              className="field-shell"
              placeholder="Your phone number"
              value={formState.phone}
              onChange={(event) => setFormState({ ...formState, phone: event.target.value })}
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:mt-5 md:grid-cols-2 md:gap-5">
          <label className="block">
            <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
              Address*
            </span>
            <input
              type="text"
              className="field-shell"
              placeholder="Property address or business location"
              value={formState.address}
              onChange={(event) => setFormState({ ...formState, address: event.target.value })}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
              Email*
            </span>
            <input
              type="email"
              className="field-shell"
              placeholder="Your email address"
              value={formState.email}
              onChange={(event) => setFormState({ ...formState, email: event.target.value })}
            />
          </label>
        </div>
      </div>

      <div className="rounded-[1.2rem] border border-white/45 bg-white/38 p-4 sm:rounded-[1.5rem] sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
          Request details
        </p>
        <label className="mt-4 block">
          <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
            What can we help you with today?*
          </span>
          <textarea
            rows={5}
            className="field-shell min-h-[10rem] py-3"
            placeholder="Tell us about the property, the issue you are facing, or the kind of solar support you need"
            value={formState.helpNeeded}
            onChange={(event) =>
              setFormState({ ...formState, helpNeeded: event.target.value })
            }
          />
        </label>
      </div>

      <div className="rounded-[1.2rem] border border-white/45 bg-white/44 p-4 sm:rounded-[1.5rem] sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
          Preferred follow-up
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-5">
          <label className="block">
            <span className="mb-2 block text-[0.92rem] font-semibold text-brand sm:text-sm">
              How would you like us to reach out?
            </span>
            <select
              className="field-shell"
              value={formState.preferredContactMethod}
              onChange={(event) =>
                setFormState({
                  ...formState,
                  preferredContactMethod: event.target.value,
                })
              }
            >
              {contactOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="flex items-start gap-3 rounded-[1.1rem] border border-[#d6e2da] bg-white/82 px-4 py-4 text-[0.92rem] leading-6 text-muted sm:rounded-[1.2rem] sm:px-5 sm:text-sm">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-[#aac9b9] text-brand focus:ring-brand"
              checked={formState.consent}
              onChange={(event) =>
                setFormState({ ...formState, consent: event.target.checked })
              }
            />
            <span>
              I agree to hear back from LIKTISH Engineering about this solar
              assessment request.
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-[1rem] bg-brand px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition duration-200 hover:-translate-y-0.5 hover:bg-brand-strong active:translate-y-0 active:scale-[0.985] disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      <TurnstileWidget
        siteKey={turnstileSiteKey}
        onVerify={(token) =>
          setFormState((current) => ({ ...current, turnstileToken: token ?? undefined }))
        }
      />

      {status ? (
        <p
          className={
            statusTone === "error"
              ? "status-chip rounded-[1rem] border border-[#d39c95] bg-[#fff4f2] px-4 py-3 text-sm text-[#8d4a40]"
              : "status-chip rounded-[1rem] border border-[#b8dfcd] bg-[#f3fbf6] px-4 py-3 text-sm text-[#2f6b51]"
          }
        >
          {status}
        </p>
      ) : null}
    </form>
  );
}
