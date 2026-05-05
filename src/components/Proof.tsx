import Image from "next/image";
import { proof } from "@/content/slots";

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

export default function Proof() {
  return (
    <section
      id="proof"
      className="py-16 md:py-24 border-y"
      style={{
        background: "var(--color-card-bg)",
        borderColor: "var(--color-rule)",
      }}
    >
      <div className="container-x">
        <div className="text-center max-w-[720px] mx-auto mb-12 md:mb-16">
          <p className="eyebrow inline-block mb-4">{proof.eyebrow}</p>
          <h2 className="text-[var(--color-fg)]">{proof.headline}</h2>
        </div>

        <div className="max-w-[880px] mx-auto flex flex-col gap-12 md:gap-16">
          {proof.testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4"
              style={
                idx < proof.testimonials.length - 1
                  ? {
                      paddingBottom: "48px",
                      borderBottom: "1px solid var(--color-rule)",
                    }
                  : {}
              }
            >
              <Stars count={t.stars} />
              <blockquote
                className="text-[19px] md:text-[21px] leading-[1.5] italic"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.body}
              </blockquote>
              <div
                className="rounded-[8px] p-5 ml-0 md:ml-6"
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
                <p
                  className="text-[15px] italic"
                  style={{ color: "var(--color-fg)" }}
                >
                  {t.reply}
                </p>
              </div>
              <p className="flex flex-wrap gap-3 items-baseline text-[15px]">
                <cite className="not-italic font-semibold">
                  {t.attribution}
                </cite>
                <span style={{ color: "var(--color-fg-muted)" }}>{t.role}</span>
                <span style={{ color: "var(--color-fg-muted)" }}>
                  {t.relative_date}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
          {proof.grid.map((tile, idx) => (
            <figure
              key={idx}
              className="relative aspect-[4/3] rounded-[12px] overflow-hidden"
              style={{ background: "var(--color-accent-soft)" }}
            >
              <Image
                src={`/photos/${tile.photo}`}
                alt={tile.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <figcaption className="sr-only">{tile.alt}</figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center mt-12">
          <a
            href={proof.see_all.href}
            className="uppercase tracking-[0.06em] text-[14px]"
            style={{
              color: "var(--color-accent)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {proof.see_all.label} <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </section>
  );
}
