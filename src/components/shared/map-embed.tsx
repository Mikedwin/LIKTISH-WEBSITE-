interface MapEmbedProps {
  className?: string;
}

export function MapEmbed({ className }: MapEmbedProps) {
  return (
    <iframe
      title="LIKTISH office location"
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?q=Adientem%20Takoradi%20Ghana&output=embed"
    />
  );
}
