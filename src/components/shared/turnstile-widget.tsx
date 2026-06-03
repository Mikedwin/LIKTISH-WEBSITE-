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
          "error-callback"?: (errorCode?: string) => boolean | void;
          "timeout-callback"?: () => void;
          retry?: "auto" | "never";
          "retry-interval"?: number;
          "refresh-expired"?: "auto" | "manual" | "never";
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
  const onVerifyRef = useRef(onVerify);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const renderedRef = useRef(false);
  const [scriptReady, setScriptReady] = useState(turnstileScriptLoaded);
  const [widgetMessage, setWidgetMessage] = useState("");

  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);

  useEffect(() => {
    if (!siteKey || !scriptReady || !window.turnstile || renderedRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(`#${containerId}`, {
      sitekey: siteKey,
      theme: "light",
      retry: "auto",
      "retry-interval": 8000,
      "refresh-expired": "auto",
      callback: (token) => {
        setWidgetMessage("");
        onVerifyRef.current(token);
      },
      "expired-callback": () => {
        setWidgetMessage("Verification expired. Please retry the check.");
        onVerifyRef.current(null);
      },
      "timeout-callback": () => {
        setWidgetMessage("Verification timed out. Please retry the check.");
        onVerifyRef.current(null);
      },
      "error-callback": (errorCode) => {
        setWidgetMessage("Verification had trouble loading. Please retry the check.");
        onVerifyRef.current(null);

        if (retryTimerRef.current) {
          clearTimeout(retryTimerRef.current);
        }

        retryTimerRef.current = setTimeout(() => {
          if (widgetIdRef.current) {
            window.turnstile?.reset?.(widgetIdRef.current);
          }
        }, 3000);

        return Boolean(errorCode);
      },
    });
    renderedRef.current = true;

    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
      renderedRef.current = false;
    };
  }, [containerId, scriptReady, siteKey]);

  if (!siteKey) {
    return null;
  }

  function retryVerification() {
    setWidgetMessage("");
    onVerifyRef.current(null);
    if (widgetIdRef.current) {
      window.turnstile?.reset?.(widgetIdRef.current);
    }
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
        {widgetMessage ? (
          <div className="mt-3 flex flex-col gap-2 rounded-[0.85rem] border border-[#e4c1b7] bg-[#fff7f4] px-3 py-3 text-sm text-[#8a463b] sm:flex-row sm:items-center sm:justify-between">
            <span>{widgetMessage}</span>
            <button
              type="button"
              onClick={retryVerification}
              className="inline-flex min-h-9 items-center justify-center rounded-[0.7rem] border border-[#d79d8f] bg-white px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a463b] transition hover:bg-[#fff0ec]"
            >
              Retry
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
