import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Collectif Nova — Agence créative branding + digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A2E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              backgroundImage: "linear-gradient(135deg, #7B61FF, #00E5CC)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
            }}
          >
            Collectif Nova
          </div>
          <div style={{ fontSize: 28, color: "#F0F0F5", fontWeight: 400 }}>
            Agence créative branding + digital
          </div>
          <div
            style={{
              marginTop: "24px",
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #7B61FF, #00E5CC)",
              borderRadius: "2px",
            }}
          />
          <div style={{ fontSize: 20, color: "#F0F0F5", opacity: 0.6, marginTop: "8px" }}>
            Montréal, QC
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
