import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href?: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
}

export function CTAButton({
  href,
  label,
  variant = "primary",
  className,
  disabled = false,
}: CTAButtonProps) {
  const sharedClassName = cn(
    "inline-flex min-h-11 items-center justify-center rounded-[1rem] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-center transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] sm:min-h-12 sm:px-5 sm:text-[11px] sm:tracking-[0.2em]",
    variant === "primary" &&
      "bg-brand text-white shadow-[0_18px_34px_rgba(11,33,25,0.18)] hover:bg-brand-strong",
    variant === "secondary" &&
      "border border-white/24 bg-white/10 text-white backdrop-blur hover:bg-white/16",
    variant === "ghost" &&
      "border border-border bg-white/82 text-brand hover:border-brand hover:bg-surface-muted",
    disabled && "cursor-default hover:translate-y-0",
    className,
  );

  if (disabled || !href) {
    return (
      <span
        aria-disabled="true"
        className={sharedClassName}
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={sharedClassName}
    >
      {label}
    </Link>
  );
}
