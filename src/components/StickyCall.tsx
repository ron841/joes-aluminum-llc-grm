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
      <span aria-hidden="true" className="mr-2">
        📞
      </span>
      {sticky.label} {sticky.phone_display}
    </a>
  );
}
