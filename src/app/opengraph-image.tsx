import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Joe's Aluminum L.L.C. 5.0 stars on 115 reviews. Fruitland Park, FL.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function loadFont(family: string, weight: number): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&display=swap`;
  const css = await (
    await fetch(cssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      },
    })
  ).text();
  const match = css.match(
    /src:\s*url\((https:\/\/[^)]+\.woff2)\)\s*format\('woff2'\)/,
  );
  if (!match) {
    throw new Error(`Could not extract woff2 URL for ${family} ${weight}`);
  }
  return await (await fetch(match[1])).arrayBuffer();
}

export default async function Image() {
  const [dmSansBold, dmSansRegular] = await Promise.all([
    loadFont("DM Sans", 700),
    loadFont("DM Sans", 400),
  ]);

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
          fontFamily: '"DM Sans", system-ui, sans-serif',
        }}
      >
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
          <span
            style={{
              color: "#df3d82",
              marginLeft: "12px",
              marginRight: "20px",
            }}
          >
            ★
          </span>
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
        <div
          style={{
            position: "absolute",
            top: "48px",
            right: "96px",
            width: "80px",
            height: "1px",
            background: "#df3d82",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "DM Sans",
          data: dmSansBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "DM Sans",
          data: dmSansRegular,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
