import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #0f7554 0%, #159066 60%, #12684a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}
        >
          LIKTISH
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.3em",
            color: "#d3ecd9",
          }}
        >
          ENGINEERING
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 36,
            fontWeight: 500,
            maxWidth: 880,
            color: "#f2fbf5",
          }}
        >
          Solar design, installation, and maintenance across Ghana and Africa
        </div>
      </div>
    ),
    ogImageSize,
  );
}
