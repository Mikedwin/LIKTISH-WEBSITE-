"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      remove?: (widgetId: string) => void;
      reset?: (widgetId?: string) => void;
    };
  }
}

let turnstileScriptLoaded = false;

interface TurnstileWidgetProps {
  siteKey?: string;
  onVerify: (token: string | null) => void;
}

export function TurnstileWidget({ siteKey, onVerify }: TurnstileWidgetProps) {
  const containerId = useId().replace(/:/g, "");
  const widgetIdRef = useRef<string | null>(null);
  const renderedRef = useRef(false);
  const [scriptReady, setScriptReady] = useState(turnstileScriptLoaded);

  useEffect(() => {
    if (!siteKey || !scriptReady || !window.turnstile || renderedRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(`#${containerId}`, {
      sitekey: siteKey,
      theme: "light",
      callback: (token) => onVerify(token),
      "expired-callback": () => onVerify(null),
      "error-callback": () => onVerify(null),
    });
    renderedRef.current = true;

    return () => {
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
      renderedRef.current = false;
    };
  }, [containerId, onVerify, scriptReady, siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => {
          turnstileScriptLoaded = true;
          setScriptReady(true);
        }}
      />
      <div className="rounded-[1rem] border border-[#d7e2db] bg-white/86 px-4 py-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-soft">
          Verification
        </p>
        <div id={containerId} />
      </div>
    </>
  );
}
