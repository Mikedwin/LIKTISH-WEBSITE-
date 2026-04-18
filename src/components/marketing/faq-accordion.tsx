"use client";

import { useState } from "react";
import type { FAQItem } from "@/types/site";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.question} className="rounded-[1.5rem] border border-border bg-white shadow-[0_12px_30px_rgba(11,33,25,0.06)]">
          <button
            type="button"
            onClick={() => setOpenIndex((value) => (value === index ? null : index))}
            className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
          >
            <span className="headline text-lg font-black text-brand">{item.question}</span>
            <span className="text-brand">{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index ? (
            <div className="px-6 pb-5 text-sm leading-7 text-muted">{item.answer}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
