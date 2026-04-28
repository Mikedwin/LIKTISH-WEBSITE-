"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types/site";

export function FAQAccordion({
  items,
  variant = "default",
}: {
  items: FAQItem[];
  variant?: "default" | "soft";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isSoft = variant === "soft";

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.question}
          className={cn(
            "rounded-[1.5rem] border shadow-[0_12px_30px_rgba(11,33,25,0.06)]",
            isSoft
              ? "border-[#d7e6dc] bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(246,250,247,0.94)_100%)]"
              : "border-border bg-white",
          )}
        >
          <button
            type="button"
            onClick={() => setOpenIndex((value) => (value === index ? null : index))}
            className={cn(
              "flex w-full items-center justify-between gap-6 text-left",
              isSoft ? "px-6 py-5 sm:px-7 sm:py-6" : "px-6 py-5",
            )}
          >
            <span
              className={cn(
                "headline font-black text-brand",
                isSoft ? "text-[1.05rem] leading-7 sm:text-[1.15rem]" : "text-lg",
              )}
            >
              {item.question}
            </span>
            <span className={cn("text-brand", isSoft ? "text-xl" : "")}>
              {openIndex === index ? "-" : "+"}
            </span>
          </button>
          {openIndex === index ? (
            <div
              className={cn(
                "text-sm leading-7 text-muted",
                isSoft ? "px-6 pb-6 sm:px-7" : "px-6 pb-5",
              )}
            >
              {item.answer}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
