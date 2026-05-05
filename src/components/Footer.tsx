import { footer } from "@/content/slots";

export default function Footer() {
  return (
    <footer
      className="pt-16 pb-12"
      style={{
        background: "var(--color-footer-bg)",
        color: "var(--color-footer-fg)",
      }}
    >
      <div className="container-x">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-12">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid place-items-center w-8 h-8 rounded-[6px] font-semibold text-sm"
                style={{
                  background: "var(--color-bg)",
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-display)",
                }}
              >
                JA
              </span>
              <span
                className="text-[20px] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {footer.brand_wordmark}
              </span>
            </div>
            <p className="text-[15px]" style={{ color: "#bbb" }}>
              {footer.tagline}
            </p>
          </div>
          <div>
            <h4
              className="text-[12px] uppercase tracking-[0.08em] mb-3 font-medium"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Contact
            </h4>
            <a
              href={footer.contact_phone_href}
              className="block text-[15px] mb-1.5 no-underline hover:underline"
              style={{ color: "var(--color-footer-fg)" }}
            >
              {footer.contact_phone_display}
            </a>
            <p className="text-[15px]">
              {footer.contact_address_lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < footer.contact_address_lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
          <div>
            <h4
              className="text-[12px] uppercase tracking-[0.08em] mb-3 font-medium"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Find
            </h4>
            <a
              href={footer.fb_href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[15px] mb-1.5 no-underline hover:underline"
              style={{ color: "var(--color-footer-fg)" }}
            >
              {footer.fb_label}
            </a>
            <a
              href={footer.gbp_href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[15px] mb-1.5 no-underline hover:underline"
              style={{ color: "var(--color-footer-fg)" }}
            >
              {footer.gbp_label}
            </a>
          </div>
          <div>
            <h4
              className="text-[12px] uppercase tracking-[0.08em] mb-3 font-medium"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Legal
            </h4>
            <p className="text-[15px]">{footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
