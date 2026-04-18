"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem("liktish-cookie-consent");
    if (!accepted) {
      const frame = window.requestAnimationFrame(() => {
        setVisible(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-3xl rounded-[1.5rem] border border-border bg-white p-5 shadow-[0_24px_60px_rgba(2,44,34,0.18)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          LIKTISH uses essential cookies and analytics to improve website performance and lead handling.
        </p>
        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem("liktish-cookie-consent", "accepted");
            setVisible(false);
          }}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
