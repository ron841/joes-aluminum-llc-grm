import type { MetadataRoute } from "next";

const SITE_URL = "https://joes-aluminum-llc-grm.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/reviews"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
