import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCall from "@/components/StickyCall";
import { site } from "@/content/slots";

export const metadata: Metadata = {
  title: "All 115 Reviews. Coming soon. Joe's Aluminum",
  description:
    "Joe's Aluminum review corpus is being prepared. In the meantime, see all reviews on Google.",
  alternates: { canonical: "/reviews" },
  robots: { index: false, follow: true },
};

export default function ReviewsPage() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="py-24 md:py-32 pb-24 md:pb-32"
        aria-labelledby="reviews-heading"
      >
        <div className="container-x max-w-[720px] text-center">
          <p className="eyebrow inline-block mb-4">All 115 Reviews</p>
          <h1
            id="reviews-heading"
            className="mb-6"
            style={{ color: "var(--color-fg)" }}
          >
            The full set is on its way.
          </h1>
          <p
            className="text-[17px] md:text-[19px] mb-10"
            style={{ color: "var(--color-fg-muted)" }}
          >
            Joe's customers have left {site.review_count} reviews on Google,
            averaging {site.aggregate_rating} stars. We're putting the full
            corpus on this page after Joe's walkthrough. In the meantime, read
            them where they live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={site.gbp_listing_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-7 py-4 rounded-[6px] uppercase tracking-[0.04em] text-[14px] font-medium hover:opacity-90 hover:no-underline w-full sm:w-auto text-center no-underline"
              style={{
                background: "var(--color-accent)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Read on Google
            </a>
            <a
              href="/"
              className="text-[var(--color-fg)] uppercase tracking-[0.04em] text-[14px] inline-flex items-center gap-2 hover:no-underline"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span aria-hidden="true">←</span> Back home
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <StickyCall />
    </>
  );
}
