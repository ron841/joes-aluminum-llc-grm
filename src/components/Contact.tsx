"use client";

import { useState } from "react";
import { contact, site } from "@/content/slots";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      accessKey: site.static_forms_key,
      subject: "New inquiry from joes-aluminum site",
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      message: String(formData.get("message") || ""),
      replyTo: "@",
    };
    try {
      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container-x">
        <div className="text-center max-w-[720px] mx-auto mb-12 md:mb-16">
          <p className="eyebrow inline-block mb-4">{contact.eyebrow}</p>
          <h2 className="text-[var(--color-fg)]">{contact.headline}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start max-w-[1100px] mx-auto">
          <div className="flex flex-col gap-8">
            <div>
              <p
                className="text-[13px] uppercase tracking-[0.08em] font-medium mb-2"
                style={{
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {contact.phone_label}
              </p>
              <a
                href={contact.phone_href}
                className="text-[28px] md:text-[32px] font-semibold no-underline hover:underline"
                style={{
                  color: "var(--color-fg)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {contact.phone_display}
              </a>
            </div>
            <div>
              <p
                className="text-[13px] uppercase tracking-[0.08em] font-medium mb-2"
                style={{
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {contact.address_label}
              </p>
              <p
                className="text-[17px] md:text-[19px]"
                style={{ color: "var(--color-fg)" }}
              >
                {contact.address_lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < contact.address_lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p
                className="text-[13px] uppercase tracking-[0.08em] font-medium mb-2"
                style={{
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {contact.hours_label}
              </p>
              <p
                className="text-[17px] md:text-[19px]"
                style={{ color: "var(--color-fg)" }}
              >
                {contact.hours_display}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <p
              className="text-[17px] mb-2"
              style={{ color: "var(--color-fg-muted)" }}
            >
              {contact.form.intro}
            </p>
            <label className="flex flex-col gap-1.5">
              <span className="text-[14px] font-medium">
                {contact.form.name_label}
              </span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                className="w-full p-4 rounded-[6px] text-[16px]"
                style={{
                  background: "var(--color-card-bg)",
                  border: "1px solid var(--color-rule)",
                  fontFamily: "var(--font-body)",
                }}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[14px] font-medium">
                {contact.form.phone_label}
              </span>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                className="w-full p-4 rounded-[6px] text-[16px]"
                style={{
                  background: "var(--color-card-bg)",
                  border: "1px solid var(--color-rule)",
                  fontFamily: "var(--font-body)",
                }}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[14px] font-medium">
                {contact.form.address_label}
              </span>
              <input
                type="text"
                name="address"
                autoComplete="street-address"
                className="w-full p-4 rounded-[6px] text-[16px]"
                style={{
                  background: "var(--color-card-bg)",
                  border: "1px solid var(--color-rule)",
                  fontFamily: "var(--font-body)",
                }}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[14px] font-medium">
                {contact.form.message_label}
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full p-4 rounded-[6px] text-[16px] min-h-[120px] resize-y"
                style={{
                  background: "var(--color-card-bg)",
                  border: "1px solid var(--color-rule)",
                  fontFamily: "var(--font-body)",
                }}
              />
            </label>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="self-start text-white px-7 py-4 rounded-[6px] uppercase tracking-[0.04em] text-[14px] font-medium disabled:opacity-60"
              style={{
                background: "var(--color-accent)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {status === "submitting"
                ? "Sending..."
                : contact.form.submit_label}
            </button>
            <div role="status" aria-live="polite" className="min-h-[1.5em]">
              {status === "success" && (
                <p style={{ color: "var(--color-fg)" }}>
                  {contact.form.success_message}
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "var(--color-fg)" }}>
                  {contact.form.error_message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
