import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/seo/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "LIKTISH Engineering";

export default function OpengraphImage() {
  return renderOgImage();
}
