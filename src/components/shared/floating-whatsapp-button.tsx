import { siteContact } from "@/lib/site-data";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={siteContact.whatsapp}
      target="_blank"
      rel="noreferrer"
      title="Chat with LIKTISH on WhatsApp"
      aria-label="Chat with LIKTISH on WhatsApp"
      className="button-breathe fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-[0_16px_34px_rgba(11,33,25,0.18)] transition-transform hover:translate-y-[-2px]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-7 w-7 fill-white"
      >
        <path d="M19.05 4.94A9.94 9.94 0 0 0 12 2a9.96 9.96 0 0 0-8.63 14.93L2 22l5.22-1.36A10 10 0 1 0 19.05 4.94ZM12 20.13a8.06 8.06 0 0 1-4.11-1.13l-.29-.17-3.1.81.83-3.02-.19-.31A8.12 8.12 0 1 1 12 20.13Zm4.46-5.97c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.18-1.42-1.32-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.11 3.64.57.25 1.02.4 1.37.51.58.18 1.11.15 1.53.09.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    </a>
  );
}
