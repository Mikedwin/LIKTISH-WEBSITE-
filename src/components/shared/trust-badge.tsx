interface TrustBadgeProps {
  label: string;
}

export function TrustBadge({ label }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-[1.05rem] border border-white/14 bg-white/8 px-4 py-3 text-sm backdrop-blur">
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_6px_rgba(203,138,46,0.18)]" />
      <span className="text-white/88">{label}</span>
    </div>
  );
}
