import { faq } from "@/content/slots";

export default function Faq() {
  return (
    <section
      id="faq"
      className="py-16 md:py-24 border-y"
      style={{
        background: "var(--color-card-bg)",
        borderColor: "var(--color-rule)",
      }}
    >
      <div className="container-x">
        <div className="text-center max-w-[720px] mx-auto mb-12 md:mb-16">
          <p className="eyebrow inline-block mb-4">{faq.eyebrow}</p>
          <h2 className="text-[var(--color-fg)]">{faq.headline}</h2>
        </div>
        <div className="max-w-[880px] mx-auto">
          {faq.items.map((item, idx) => (
            <details
              key={idx}
              open={item.open}
              className="border-b group"
              style={{ borderColor: "var(--color-rule)" }}
            >
              <summary
                className="flex justify-between items-center py-6 cursor-pointer text-[17px] md:text-[19px] font-medium list-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform group-open:rotate-45 text-[24px] leading-none"
                  style={{ color: "var(--color-accent)" }}
                >
                  +
                </span>
              </summary>
              <div
                className="pb-6 text-[17px] leading-[1.6]"
                style={{ color: "var(--color-fg-muted)" }}
              >
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
