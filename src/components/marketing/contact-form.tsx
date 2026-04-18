"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  enquiryType: "General enquiry",
  message: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

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
      setStatus(payload.error ?? "Something went wrong.");
      return;
    }

    setStatus(payload.message ?? "Thanks. LIKTISH will get back to you shortly.");
    setFormState(initialState);
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
        className="mt-5 inline-flex min-h-12 items-center rounded-[1rem] bg-brand px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send enquiry"}
      </button>
      {status ? <p className="mt-4 text-sm text-muted">{status}</p> : null}
    </form>
  );
}
