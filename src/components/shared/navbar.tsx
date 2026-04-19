"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, siteContact } from "@/lib/site-data";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#dfe8e2] bg-[#eef3ef]/96 backdrop-blur">
      <div className="container-shell flex min-h-18 items-center justify-between gap-3 py-3 sm:min-h-22 sm:gap-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 text-brand sm:gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#19A875] text-sm font-extrabold text-[#19A875] sm:h-10 sm:w-10">
            L
          </span>
          <span className="headline truncate text-[1.45rem] font-extrabold tracking-tight text-brand sm:text-[1.9rem]">
            LIKTISH
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex py-3 text-[1rem] font-semibold text-[#53657b] transition hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteContact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center rounded-full border-2 border-[#19A875] px-6 py-3 text-[1rem] font-semibold text-[#19A875] transition hover:bg-[#e8fbf4]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="mr-2 h-5 w-5 fill-current"
            >
              <path d="M19.05 4.94A9.94 9.94 0 0 0 12 2a9.96 9.96 0 0 0-8.63 14.93L2 22l5.22-1.36A10 10 0 1 0 19.05 4.94ZM12 20.13a8.06 8.06 0 0 1-4.11-1.13l-.29-.17-3.1.81.83-3.02-.19-.31A8.12 8.12 0 1 1 12 20.13Zm4.46-5.97c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.18-1.42-1.32-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.11 3.64.57.25 1.02.4 1.37.51.58.18 1.11.15 1.53.09.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
            </svg>
            WhatsApp
          </a>
          <Link
            href="/solar-assessment"
            className="inline-flex min-h-12 items-center rounded-full bg-brand px-7 py-3 text-[1rem] font-semibold text-white shadow-[0_14px_24px_rgba(20,55,43,0.18)] transition hover:bg-brand-strong"
          >
            Get a Free Solar Assessment
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#d7e2dc] bg-white px-4 text-sm font-semibold text-brand lg:hidden"
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#dfe8e2] bg-[#eef3ef] px-4 py-4 lg:hidden">
          <div className="container-shell space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-[1rem] px-4 py-3 text-sm font-semibold text-brand transition hover:bg-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={siteContact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-[#19A875] px-6 py-3 text-[0.98rem] font-semibold text-[#19A875]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mr-2 h-5 w-5 fill-current"
                >
                  <path d="M19.05 4.94A9.94 9.94 0 0 0 12 2a9.96 9.96 0 0 0-8.63 14.93L2 22l5.22-1.36A10 10 0 1 0 19.05 4.94ZM12 20.13a8.06 8.06 0 0 1-4.11-1.13l-.29-.17-3.1.81.83-3.02-.19-.31A8.12 8.12 0 1 1 12 20.13Zm4.46-5.97c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.18-1.42-1.32-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.11 3.64.57.25 1.02.4 1.37.51.58.18 1.11.15 1.53.09.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                </svg>
                WhatsApp
              </a>
              <Link
                href="/solar-assessment"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-7 py-3 text-center text-[0.96rem] font-semibold text-white transition hover:bg-brand-strong"
              >
                Get a Free Solar Assessment
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
