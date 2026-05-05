"use client";

import { useState } from "react";
import { faq } from "@/content/slots";

export default function Faq() {
  const [openMap, setOpenMap] = useState<boolean[]>(
    faq.items.map((item) => !!item.open),
  );

  function toggle(idx: number) {
    setOpenMap((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  }

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
          {faq.items.map((item, idx) => {
            const isOpen = openMap[idx];
            const answerId = `faq-answer-${idx}`;
            const buttonId = `faq-question-${idx}`;
            return (
              <div
                key={idx}
                className="border-b"
                style={{ borderColor: "var(--color-rule)" }}
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggle(idx)}
                  className="w-full flex justify-between items-center py-6 text-left text-[17px] md:text-[19px] font-medium bg-transparent border-0 cursor-pointer"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-fg)",
                  }}
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="text-[24px] leading-none transition-transform duration-150"
                    style={{
                      color: "var(--color-accent)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  hidden={!isOpen}
                  className="pb-6 text-[17px] leading-[1.6]"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
