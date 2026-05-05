import { trust } from "@/content/slots";

export default function Trust() {
  return (
    <section
      aria-label="Trust signals"
      className="border-y py-12"
      style={{
        background: "var(--color-card-bg)",
        borderColor: "var(--color-rule)",
      }}
    >
      <div className="container-x">
        <ul className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_1.5fr]">
          {trust.map((item, idx) => (
            <li
              key={idx}
              className="flex flex-col gap-2"
              style={
                idx > 0
                  ? {
                      borderLeft: "0",
                    }
                  : {}
              }
            >
              <span
                className="text-[13px] uppercase tracking-[0.08em] font-medium"
                style={{
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {item.headline}
              </span>
              <span
                className="text-[15px] leading-[1.4]"
                style={{
                  color: item.isQuote
                    ? "var(--color-fg-muted)"
                    : "var(--color-fg)",
                  fontStyle: item.isQuote ? "italic" : "normal",
                }}
              >
                {item.subhead}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
