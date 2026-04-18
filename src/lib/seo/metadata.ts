import type { Metadata } from "next";

const BASE_URL = "https://liktishengineering.com";

interface MetadataInput {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({
  title,
  description,
  path,
}: MetadataInput): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title,
      description,
      url,
      siteName: "LIKTISH Engineering",
      locale: "en_GH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
