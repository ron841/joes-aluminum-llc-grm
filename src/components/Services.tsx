import Image from "next/image";
import { services } from "@/content/slots";

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container-x">
        <div className="text-center max-w-[720px] mx-auto mb-12 md:mb-16">
          <p className="eyebrow inline-block mb-4">{services.eyebrow}</p>
          <h2 className="mb-4 text-[var(--color-fg)]">{services.headline}</h2>
          <p
            className="text-[17px] md:text-[19px]"
            style={{ color: "var(--color-fg-muted)" }}
          >
            {services.intro}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-[12px] overflow-hidden flex flex-col"
              style={{
                background: "var(--color-card-bg)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="relative aspect-[16/9] bg-[var(--color-accent-soft)]">
                <Image
                  src={`/photos/${card.photo}`}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-[var(--color-fg)]">{card.title}</h3>
                <p
                  className="text-[16px] leading-[1.5]"
                  style={{ color: "var(--color-fg-muted)" }}
                >
                  {card.description}
                </p>
                <blockquote
                  className="mt-auto pl-3 italic text-[15px]"
                  style={{
                    borderLeft: "2px solid var(--color-accent)",
                    color: "var(--color-fg-muted)",
                  }}
                >
                  {card.quote}
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
