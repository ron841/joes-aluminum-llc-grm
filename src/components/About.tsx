import { about } from "@/content/slots";

// Per slots.md: "If no portrait at deploy, hide right col, expand left col to full width."
// No operator portrait at deploy (pending walkthrough); render single column.
export default function About() {
  return (
    <section id="about" className="py-16 md:py-24" aria-labelledby="about-heading">
      <div className="container-x max-w-[1000px]">
        <p className="eyebrow inline-block mb-4">{about.eyebrow}</p>
        <h2 id="about-heading" className="mb-8 max-w-[720px] text-[var(--color-fg)]">
          {about.headline}
        </h2>
        <div className="flex flex-col gap-6 max-w-[720px]">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-[17px] md:text-[19px] leading-[1.6]">
              {p}
            </p>
          ))}
          <p
            className="text-[20px] md:text-[22px] italic mt-4"
            style={{
              color: "var(--color-accent)",
              fontFamily: "var(--font-display)",
            }}
          >
            {about.founded_line}
          </p>
        </div>
      </div>
    </section>
  );
}
