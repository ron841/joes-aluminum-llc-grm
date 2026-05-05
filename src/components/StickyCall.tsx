import { sticky } from "@/content/slots";

// Mobile only (max-width 767px). Hidden on md+ via Tailwind.
export default function StickyCall() {
  return (
    <a
      href={sticky.phone_href}
      aria-label="Call Joe's Aluminum"
      className="fixed bottom-0 inset-x-0 h-16 flex items-center justify-center text-white uppercase tracking-[0.04em] text-[14px] font-medium z-[100] no-underline md:hidden"
      style={{
        background: "var(--color-accent)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-2"
      >
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
      {sticky.label} {sticky.phone_display}
    </a>
  );
}
