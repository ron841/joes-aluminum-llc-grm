import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Joe's Aluminum L.L.C. 5.0 stars on 115 reviews. Fruitland Park, FL.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Defaults to ImageResponse's built-in sans-serif. Edge-safe (no external
// font fetch). The card stays on-brand via color and composition; exact
// typographic match to on-page DM Sans is a v0.4 polish item.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f7f5f2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "96px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "48px",
            right: "96px",
            width: "80px",
            height: "1px",
            background: "#df3d82",
            display: "flex",
          }}
        />
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "16px",
            background: "#df3d82",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "44px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "48px",
          }}
        >
          JA
        </div>
        <div
          style={{
            fontSize: "92px",
            fontWeight: 700,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            marginBottom: "32px",
            display: "flex",
          }}
        >
          Joe&apos;s Aluminum L.L.C.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "32px",
            color: "#5a5550",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ color: "#1a1a1a", fontWeight: 700 }}>5.0</span>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="#df3d82"
            style={{
              marginLeft: "12px",
              marginRight: "20px",
            }}
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26z" />
          </svg>
          <span>115 reviews</span>
          <span style={{ margin: "0 16px", color: "#5a5550" }}>·</span>
          <span>Fruitland Park, FL</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "96px",
            fontSize: "22px",
            color: "#5a5550",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          The Villages · Lake County · Sumter County
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
