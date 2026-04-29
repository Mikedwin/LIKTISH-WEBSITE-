import type { SVGProps } from "react";

type LogoProps = {
  className?: string;
};

function LiktishMarkSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 84 84" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="liktishSunFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff6bf" />
          <stop offset="100%" stopColor="#eed6ac" />
        </linearGradient>
      </defs>
      <ellipse
        cx="42"
        cy="42"
        rx="34"
        ry="38"
        fill="rgba(255,255,255,0.88)"
        stroke="#159066"
        strokeWidth="3"
      />
      <path
        d="M16 33c6-13 20-21 37-21 9 0 17 2 24 6-2-2-6-5-10-7-7-4-15-6-24-6-20 0-35 11-42 28Z"
        fill="url(#liktishSunFill)"
        opacity="0.96"
      />
      <path
        d="M19 37c9-11 21-17 36-17 8 0 15 1 21 4"
        fill="none"
        stroke="#cb8a2e"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M24 40 15 28M29 36 22 23M36 33 31 19M44 32 42 18M52 33 54 19"
        fill="none"
        stroke="#cb8a2e"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M23 54V28h7v19h10"
        fill="none"
        stroke="#159066"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 28v26M42 43l10-15M42 43l10 11"
        fill="none"
        stroke="#159066"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M56 33c2-3 5-5 9-5 4 0 7 2 8 5m-17 15c2 3 5 5 9 5 4 0 7-2 8-5m-17-7h15"
        fill="none"
        stroke="#cb8a2e"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M67 28v26M78 28v26M67 41h11"
        fill="none"
        stroke="#159066"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LiktishNavbarLogo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] border border-[#b9d8c9] bg-white/82 p-1.5 shadow-[0_8px_22px_rgba(11,33,25,0.08)] sm:h-12 sm:w-12">
        <LiktishMarkSvg className="h-full w-full" />
      </span>
      <span className="min-w-0">
        <span className="headline block truncate text-[1.45rem] font-extrabold tracking-[-0.05em] text-brand sm:text-[1.9rem]">
          LIKTISH
        </span>
        <span className="mt-1 block h-[2px] w-16 rounded-full bg-[#cb8a2e]/70 sm:w-20" />
      </span>
    </span>
  );
}

export function LiktishFooterLogo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-4 ${className}`}>
      <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.3rem] border border-[#cfe8dc] bg-white/88 p-2 shadow-[0_12px_28px_rgba(11,33,25,0.08)] sm:h-18 sm:w-18">
        <LiktishMarkSvg className="h-full w-full" />
      </span>
      <span className="min-w-0">
        <span className="headline block text-[1.95rem] font-extrabold tracking-[-0.05em] text-brand sm:text-[2.25rem]">
          LIKTISH
        </span>
        <span className="mt-2 block text-[0.76rem] font-bold uppercase tracking-[0.22em] text-[#5d7468] sm:text-[0.8rem]">
          Engineering
        </span>
      </span>
    </span>
  );
}
