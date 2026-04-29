import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { buildMetadata } from "@/lib/seo/metadata";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans-base",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-headline-base",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: "LIKTISH Engineering | Solar Solutions in Ghana",
  description:
    "LIKTISH Engineering designs, installs, and maintains solar systems for homes, businesses, industries, and institutions across Ghana.",
  path: "/",
});

metadata.icons = {
  icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  shortcut: ["/icon.svg"],
  apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plusJakartaSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
