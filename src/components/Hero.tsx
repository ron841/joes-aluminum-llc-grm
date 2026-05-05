import { hero } from "@/content/slots";

export default function Hero() {
  return (
    <section className="text-center py-20 md:py-24 lg:py-32">
      <div className="container-x max-w-[880px] mx-auto">
        <p className="eyebrow inline-block mb-6">{hero.eyebrow}</p>
        <div
          aria-hidden="true"
          className="w-20 h-px mx-auto mb-6"
          style={{ background: "var(--color-accent)" }}
        />
        <h1 className="mb-6 text-[var(--color-fg)]">{hero.headline}</h1>
        <p
          className="text-[17px] md:text-[19px] mb-10 max-w-[720px] mx-auto"
          style={{ color: "var(--color-fg-muted)" }}
        >
          {hero.subhead}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
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
    </section>
  );
}
