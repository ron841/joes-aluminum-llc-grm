import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCall from "@/components/StickyCall";
import { reviewsPage, site } from "@/content/slots";
import corpus from "@/content/reviews-corpus.json";

type Review = {
  reviewer_name: string;
  rating: number | string;
  date_iso: string;
  text: string;
  owner_reply: string | null;
  source: string;
};

export const metadata: Metadata = {
  title: "Reviews. Joe's Aluminum L.L.C. The Villages, Fruitland Park, FL",
  description:
    "Thirty of Joe's Aluminum's 115 five-star Google reviews. Lanais, pool cages, screen doors, vinyl windows, gutters, metal-roof leaks. Joe replies to nearly every one.",
  alternates: { canonical: "/reviews" },
  robots: { index: true, follow: true },
};

function Stars({ count }: { count: number }) {
  return (
    <span
      aria-label={`${count} out of 5 stars`}
      className="text-[16px] tracking-[2px]"
      style={{ color: "var(--color-accent)" }}
    >
      {"★".repeat(count)}
    </span>
  );
}

function ReviewCard({ r, isLead = false }: { r: Review; isLead?: boolean }) {
  const stars = typeof r.rating === "number" ? r.rating : 5;
  return (
    <article
      className="flex flex-col gap-4"
      style={{
        paddingBottom: "32px",
        borderBottom: "1px solid var(--color-rule)",
      }}
    >
      <Stars count={stars} />
      <blockquote
        className={
          isLead
            ? "text-[19px] md:text-[21px] leading-[1.5] italic"
            : "text-[17px] md:text-[19px] leading-[1.55]"
        }
        style={isLead ? { fontFamily: "var(--font-display)" } : undefined}
      >
        {r.text}
      </blockquote>
      {r.owner_reply ? (
        <div
          className="rounded-[8px] p-4 md:p-5 ml-0 md:ml-6"
          style={{ background: "var(--color-accent-soft)" }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.08em] font-medium mb-1.5"
            style={{
              color: "var(--color-accent)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Joe replied
          </p>
          <p className="text-[15px] italic" style={{ color: "var(--color-fg)" }}>
            {r.owner_reply}
          </p>
        </div>
      ) : null}
      <p className="flex flex-wrap gap-3 items-baseline text-[15px]">
        <cite className="not-italic font-semibold">{r.reviewer_name}</cite>
        <span style={{ color: "var(--color-fg-muted)" }}>{r.date_iso}</span>
      </p>
    </article>
  );
}

export default function ReviewsPage() {
  const reviews = corpus as Review[];
  const leadNames = reviewsPage.curated_lead_names;

  // Pick leads in the order Design ratified.
  const leads: Review[] = leadNames
    .map((n) => reviews.find((r) => r.reviewer_name === n))
    .filter((r): r is Review => r !== undefined);

  // Remaining reviews in chronological order, newest first.
  const remaining: Review[] = reviews
    .filter((r) => !leadNames.includes(r.reviewer_name))
    .slice()
    .sort((a, b) => {
      // ISO date sortable; "[gap]" sorts to the bottom.
      const aKey = /^\d{4}-\d{2}-\d{2}$/.test(a.date_iso) ? a.date_iso : "0000-00-00";
      const bKey = /^\d{4}-\d{2}-\d{2}$/.test(b.date_iso) ? b.date_iso : "0000-00-00";
      return bKey.localeCompare(aKey);
    });

  return (
    <>
      <Nav />
      <main
        id="main"
        className="py-16 md:py-24 pb-24 md:pb-32"
        aria-labelledby="reviews-heading"
      >
        <div className="container-x max-w-[880px]">
          <div className="text-center mb-12 md:mb-16">
            <p className="eyebrow inline-block mb-4">{reviewsPage.eyebrow}</p>
            <h1
              id="reviews-heading"
              className="mb-6"
              style={{ color: "var(--color-fg)" }}
            >
              {reviewsPage.headline}
            </h1>
            <p
              className="text-[17px] md:text-[19px] mx-auto max-w-[680px]"
              style={{ color: "var(--color-fg-muted)" }}
            >
              {reviewsPage.intro}
            </p>
          </div>

          <section aria-labelledby="leads-heading" className="mb-16 md:mb-20">
            <h2
              id="leads-heading"
              className="text-[24px] md:text-[28px] mb-8 text-center"
              style={{
                color: "var(--color-fg)",
                fontFamily: "var(--font-display)",
              }}
            >
              {reviewsPage.leads_label}
            </h2>
            <div className="flex flex-col gap-12">
              {leads.map((r) => (
                <ReviewCard key={r.reviewer_name + r.date_iso} r={r} isLead />
              ))}
            </div>
          </section>

          <section aria-labelledby="rest-heading">
            <h2
              id="rest-heading"
              className="text-[24px] md:text-[28px] mb-8 text-center"
              style={{
                color: "var(--color-fg)",
                fontFamily: "var(--font-display)",
              }}
            >
              {reviewsPage.rest_label}
            </h2>
            <div className="flex flex-col gap-10">
              {remaining.map((r, i) => (
                <ReviewCard key={r.reviewer_name + r.date_iso + i} r={r} />
              ))}
            </div>
          </section>

          <p className="text-center mt-16">
            <a
              href={site.gbp_listing_url}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.06em] text-[14px]"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {reviewsPage.see_all_label} <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </main>
      <Footer />
      <StickyCall />
    </>
  );
}
