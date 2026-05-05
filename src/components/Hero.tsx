import Image from "next/image";
import { hero } from "@/content/slots";

// Split-layout hero per Design's v2 triage on O2 (Treatment B):
// text on the left, photo on the right at native aspect. Mobile stacks
// text on top, photo below height-constrained to ~60vh so the CTAs
// stay above the fold.
export default function Hero() {
  return (
    <section className="py-12 md:py-20 lg:py-24">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="text-left max-w-[600px]">
            <p className="eyebrow inline-block mb-6">{hero.eyebrow}</p>
            <div
              aria-hidden="true"
              className="w-20 h-px mb-6"
              style={{ background: "var(--color-accent)" }}
            />
            <h1 className="mb-6 text-[var(--color-fg)]">{hero.headline}</h1>
            <p
              className="text-[17px] md:text-[19px] mb-8 max-w-[560px]"
              style={{ color: "var(--color-fg-muted)" }}
            >
              {hero.subhead}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
              <a
                href={hero.cta_primary.href}
                className="text-white px-7 py-4 rounded-[6px] uppercase tracking-[0.04em] text-[14px] font-medium hover:opacity-90 hover:no-underline w-full sm:w-auto text-center"
                style={{
                  background: "var(--color-accent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {hero.cta_primary.label}
              </a>
              <a
                href={hero.cta_secondary.href}
                className="text-[var(--color-fg)] uppercase tracking-[0.04em] text-[14px] inline-flex items-center gap-2 hover:no-underline"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {hero.cta_secondary.label} <span aria-hidden="true">→</span>
              </a>
            </div>
            <p
              className="text-[12px] md:text-[14px] uppercase tracking-[0.06em]"
              style={{
                color: "var(--color-fg-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {hero.trust_line}
            </p>
          </div>

          <div
            className="relative w-full max-h-[60vh] lg:max-h-none aspect-[4/5] lg:aspect-auto lg:h-[640px] rounded-[20px] overflow-hidden"
            style={{ background: "var(--color-accent-soft)" }}
          >
            <Image
              src="/photos/hero.jpg"
              alt="A finished pool cage in The Villages with palm landscaping and morning light, an example of Joe's Aluminum work."
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
