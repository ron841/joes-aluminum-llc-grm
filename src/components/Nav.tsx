"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/slots";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-rule)] h-[72px] md:h-[72px] flex items-center"
      style={{ height: "72px" }}
    >
      <div className="container-x flex items-center justify-between w-full">
        <a href="#main" className="flex items-center gap-3 no-underline">
          <span
            aria-hidden="true"
            className="grid place-items-center w-8 h-8 rounded-[6px] text-white font-semibold text-sm"
            style={{
              background: "var(--color-accent)",
              fontFamily: "var(--font-display)",
            }}
          >
            JA
          </span>
          <span
            className="font-semibold text-[22px] text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {nav.brand_wordmark}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--color-fg)] uppercase tracking-[0.06em] text-[13px] hover:text-[var(--color-accent)] hover:no-underline"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.phone_tel}
            className="text-white px-5 py-[10px] rounded-[6px] uppercase tracking-[0.04em] text-[13px] font-medium hover:opacity-90 hover:no-underline"
            style={{
              background: "var(--color-accent)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {nav.cta_phone}
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        >
          <span
            className="w-6 h-[2px] rounded-full transition-transform"
            style={{
              background: "var(--color-fg)",
              transform: open ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            className="w-6 h-[2px] rounded-full transition-opacity"
            style={{
              background: "var(--color-fg)",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="w-6 h-[2px] rounded-full transition-transform"
            style={{
              background: "var(--color-fg)",
              transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </div>

      {open && (
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Primary navigation"
          className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[var(--color-bg)] z-40 flex flex-col gap-1 px-5 pt-6 pb-12 overflow-y-auto"
          style={{ borderTop: "1px solid var(--color-rule)" }}
        >
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[var(--color-fg)] uppercase tracking-[0.06em] text-[15px] py-4 border-b border-[var(--color-rule)] no-underline"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.phone_tel}
            onClick={() => setOpen(false)}
            className="mt-6 text-white py-4 px-6 rounded-[6px] uppercase tracking-[0.04em] text-[14px] font-medium text-center no-underline"
            style={{
              background: "var(--color-accent)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {nav.cta_phone}
          </a>
        </div>
      )}
    </nav>
  );
}
