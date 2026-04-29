"use client";

import { useState } from "react";
import type { FormEvent } from "react";

function createInitialState() {
  return {
    name: "",
    email: "",
    phone: "",
    enquiryType: "General enquiry",
    message: "",
    website: "",
    formStartedAt: Date.now(),
  };
}

export function ContactForm() {
  const [formState, setFormState] = useState(createInitialState);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [statusTone, setStatusTone] = useState<"error" | "success">("success");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const response = await fetch("/api/contact", {
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
    setStatus(payload.message ?? "Thanks. LIKTISH will get back to you shortly.");
    setFormState(createInitialState());
  }

  return (
    <form onSubmit={handleSubmit} className="editorial-panel rounded-[1.5rem] p-5 sm:rounded-[1.8rem] sm:p-8">
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
          Send an enquiry
        </p>
        <h2 className="headline mt-3 text-[2rem] font-black text-brand sm:text-3xl">
          Tell LIKTISH what the site needs.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={formState.website}
          onChange={(event) => setFormState({ ...formState, website: event.target.value })}
          className="hidden"
          name="website"
        />
        <input
          required
          value={formState.name}
          onChange={(event) => setFormState({ ...formState, name: event.target.value })}
          placeholder="Full name"
          className="field-shell"
        />
        <input
          required
          type="email"
          value={formState.email}
          onChange={(event) => setFormState({ ...formState, email: event.target.value })}
          placeholder="Email address"
          className="field-shell"
        />
        <input
          required
          value={formState.phone}
          onChange={(event) => setFormState({ ...formState, phone: event.target.value })}
          placeholder="Phone number"
          className="field-shell"
        />
        <select
          value={formState.enquiryType}
          onChange={(event) =>
            setFormState({ ...formState, enquiryType: event.target.value })
          }
          className="field-shell"
        >
          <option>General enquiry</option>
          <option>Residential solar</option>
          <option>Commercial solar</option>
          <option>Industrial / EPC</option>
          <option>Maintenance & repairs</option>
        </select>
      </div>
      <textarea
        required
        value={formState.message}
        onChange={(event) => setFormState({ ...formState, message: event.target.value })}
        placeholder="How can LIKTISH help?"
        rows={5}
        className="field-shell mt-4 min-h-[9rem] py-3"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex min-h-12 items-center rounded-[1rem] bg-brand px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send enquiry"}
      </button>
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
  );
}
