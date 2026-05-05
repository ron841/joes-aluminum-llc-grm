# Joe's Aluminum site audit — findings

Audit run: 2026-05-05. Live URL: https://joes-aluminum-llc-grm.vercel.app

Categories: BLOCKERS, POLISH, OPTIONAL, DESIGN RE-REVIEW.

Each finding cites a screenshot in `screenshots/` and a build location for Code's reference. Suggested approach is direction only; no fixes applied in this audit pass.

---

## BLOCKERS

### B1. Pink-on-pink CTA buttons. Text invisible on every `<a>` styled as a primary button.

- **Description:** Three of four pink primary CTAs render with pink text on pink background, making the label unreadable. Operator's reported "broken nav links" almost certainly traces to this — the prominent nav-right "Call (352) 602-3785" CTA looks like a blank pink rectangle, not a button.
- **Affected elements:**
  - Nav top-right CTA, desktop and mobile drawer.
  - Hero primary CTA "Call (352) 602-3785".
  - Mobile sticky call bar at viewport bottom.
  - `/reviews` page "Read on Google" button.
- **Unaffected:** Contact form "Send to Joe" button (rendered as `<button>`, not `<a>`).
- **Screenshots:** [hero-cta-detail.png](screenshots/hero-cta-detail.png), [nav-cta-detail.png](screenshots/nav-cta-detail.png), [home-above-fold-desktop.png](screenshots/home-above-fold-desktop.png), [reviews-cta-detail.png](screenshots/reviews-cta-detail.png).
- **Computed style probe (live DOM):**
  - `nav a[href="tel:..."]` → `color: rgb(223, 61, 130)` over `background: rgb(223, 61, 130)`.
  - `section a[href="tel:..."]` (hero) → same.
  - `a[aria-label="Call Joe's Aluminum"]` (sticky) → same.
  - Reviews-page "Read on Google" → same.
- **Build location:** [src/app/globals.css:88-91](../../src/app/globals.css). The unlayered `a { color: var(--color-accent); ... }` rule beats the Tailwind `text-white` utility in @layer utilities, because unlayered rules outrank layered rules at equal specificity per CSS Cascade L5.
- **Suggested approach:** Wrap the global `a {}` rule in `@layer base` so Tailwind utilities win. Or scope the rule to inline body links only (e.g., `:where(.prose, p) a`). Preserve the cream-on-pink CTA contrast verified in spec (5.8:1 per [slots.md](../../../../joes-aluminum-l-l-c/_design-pack/joes-aluminum-pack/slots.md) Accessibility floor).

### B2. Section anchor links work, but the issue operator reported needs reconciliation.

- **Description:** Operator reported `#services`, `#proof`, `#about`, `/reviews` "broken." Playwright walk verified each anchor scrolls to the correct DOM target with target_y matching window scroll_y after click. `/reviews` route loads a 200 page with the expected H1. Most-likely root cause for the operator's complaint is B1 — the empty pink CTA box in the nav looked broken, and that perception extended to the surrounding nav links. Cannot reproduce a true anchor-broken state in headless Chromium at desktop or mobile.
- **Verified working:**
  - `#services` → window.scrollY 1040, target top 1039.8125
  - `#proof` → 2425, target 2425.125
  - `#about` → 5098, target 5098.265625
  - `#contact` → 6609, target 6608.890625
  - `/reviews` → routes successfully to "/reviews", title "All 115 Reviews. Coming soon. Joe's Aluminum"
  - Mobile drawer `#services` → window.scrollY 1460
- **Screenshots:** [anchor-services-after-click.png](screenshots/anchor-services-after-click.png) shows the post-click state with #services heading clearly visible below the nav.
- **Build location:** Anchor IDs in [src/app/page.tsx](../../src/app/page.tsx) compose section components that each render their own ID; targets confirmed via DOM probe.
- **Suggested approach:** Resolve B1. Re-test on operator's actual device (browser, OS, version) once B1 is fixed. If the report persists post-fix, capture an environment trace.

---

## POLISH

### P1. Anchor scroll lacks `scroll-padding-top` defense against future spacing changes.

- **Description:** Section padding (96px desktop / 64px mobile) currently clears the 72px sticky nav, so anchor jumps land cleanly. There is no `scroll-padding-top` on `<html>` or `scroll-margin-top` on the section IDs. If section padding ever shrinks below nav height (e.g., a future denser layout), anchor jumps will hide section headings behind the sticky nav.
- **Screenshot:** [anchor-services-after-click.png](screenshots/anchor-services-after-click.png) — current state is fine.
- **Build location:** [src/app/globals.css](../../src/app/globals.css) — no `scroll-padding-top` declared on `html`.
- **Suggested approach:** Add `html { scroll-padding-top: 72px; scroll-behavior: smooth; }` (or apply per-section `scroll-margin-top`). Defense-in-depth, also adds smooth-scroll which is the visual jank the operator may have wanted (instant jumps can feel like nothing happened).

### P2. Open Graph image is portrait 3024×4032; social previews crop badly.

- **Description:** Live `og:image` is `/photos/03-gbp-owner-joes-aluminum-l-l-c.jpg` at 3024×4032 (3:4 portrait). Facebook, Twitter, LinkedIn, and iMessage preview cards expect ~1.91:1 landscape (1200×630 ideal). Current image gets center-cropped, often slicing off subject matter.
- **Screenshot:** Inspect the file at [src/app/layout.tsx](../../src/app/layout.tsx) `openGraph.images[0]`.
- **Build location:** [src/app/layout.tsx:44-50](../../src/app/layout.tsx).
- **Suggested approach:** Generate a 1200×630 social card. Either crop one of the GBP photos to 1200×630, or render an OG card on the fly via the `opengraph-image.tsx` Next.js convention (text-based: brand mark + tagline + Five-Star and Reviews Count badge).

### P3. Mobile sticky call bar emoji icon may not render across all devices.

- **Description:** The sticky bar uses the 📞 emoji as the icon. On older Android, some Samsung skins, and certain font configurations the glyph falls back to a hollow square. Otherwise the bar reads "Call Joe (352) 602-3785" with an unrelated rectangle. On modern iOS and macOS it renders fine.
- **Screenshot:** [home-mobile.png](screenshots/home-mobile.png) shows the bar from a webkit context where the emoji renders.
- **Build location:** [src/components/StickyCall.tsx:14](../../src/components/StickyCall.tsx).
- **Suggested approach:** Replace with an inline SVG phone icon. Twenty lines of code, font-independent, scales cleanly.

### P4. Trust marquee vertical-rule separators dropped from spec.

- **Description:** [slots.md §Trust marquee](../../../../joes-aluminum-l-l-c/_design-pack/joes-aluminum-pack/slots.md) calls for "Items separated by thin vertical rule var(--color-rule) on desktop." Build dropped these for visual cleanliness during the initial pass.
- **Screenshot:** [home-desktop.png](screenshots/home-desktop.png) (Trust band visible just under hero).
- **Build location:** [src/components/Trust.tsx](../../src/components/Trust.tsx) — `<li>` elements have no left-border treatment.
- **Suggested approach:** Either restore vertical rules per spec, or document the deviation in BUILD-DECISIONS as an intentional cleanliness choice. Design's call.

### P5. Service-card photos are all GBP portrait shots cropped into 16:9 landscape frames.

- **Description:** All ten GBP photos are owner-uploaded phone shots in portrait orientation. The 16:9 service-card frames `object-fit: cover` them, which crops top and bottom. Results: usable but compositionally off — subjects often shifted out of center, ladders cut, gutters partially visible.
- **Screenshot:** [home-desktop.png](screenshots/home-desktop.png) — see service grid mid-page.
- **Build location:** [src/components/Services.tsx:32-40](../../src/components/Services.tsx).
- **Suggested approach:** After Joe's walkthrough, re-shoot or operator-curate landscape source photos; or have Design re-spec the card aspect to 4:3 or 1:1 to match the source library. Not a build defect — a content-availability constraint.

---

## OPTIONAL

### O1. Hero treatment text-only vs photo.

- **Description:** Operator preference is for a hero photo. Design specified text-only mode in [slots.md §Hero](../../../../joes-aluminum-l-l-c/_design-pack/joes-aluminum-pack/slots.md) per the photo-library-weakness rule (no customer-attributed shots, all GBP photos owner-uploaded portrait phone captures, FB photos at thumbnail resolution).
- **Screenshot:** [home-above-fold-desktop.png](screenshots/home-above-fold-desktop.png) shows the live text-only hero.
- **Build location:** [src/components/Hero.tsx](../../src/components/Hero.tsx).
- **Suggested approach:** Re-review during Joe's walkthrough. If Joe can supply or commission a landscape brand shot (operator portrait, finished lanai with operator on site, Villages-recognizable backdrop), Design re-specs hero with photo. Otherwise text-only stands. Not a build defect.

### O2. About section right column hidden because no operator portrait.

- **Description:** Per [slots.md §About](../../../../joes-aluminum-l-l-c/_design-pack/joes-aluminum-pack/slots.md) fallback ("If no portrait at deploy, hide right col, expand left col to full width"), the About section renders single-column with an "Established 2017." accent line replacing the spec's pending signature.
- **Screenshot:** [home-desktop.png](screenshots/home-desktop.png) (About section about 70% down).
- **Build location:** [src/components/About.tsx](../../src/components/About.tsx).
- **Suggested approach:** Walkthrough should resolve. If Joe supplies a portrait or shop shot, restore the two-column layout; if he prefers no photo, Design ratifies the "Established 2017." closing flourish.

### O3. About signature line `[ pending walkthrough ]` token deliberately not rendered.

- **Description:** Content-inventory `about.signature` is `Joe [Last Name], Owner` with `pending-walkthrough` status. The build omits the literal token from rendered HTML rather than leaking `[pending-walkthrough]` to public copy. Spec-compliant per the discipline rule but worth a Design call.
- **Screenshot:** [home-desktop.png](screenshots/home-desktop.png).
- **Build location:** [src/components/About.tsx](../../src/components/About.tsx) — comment notes the omission.
- **Suggested approach:** Walkthrough confirms last name; build replaces the accent line with the proper signature.

### O4. Hero trust line uses middle-dot separators where spec used em-dashes.

- **Description:** Content-inventory's `hero.trust_line` reads `Joe's Aluminum L.L.C. — Fruitland Park, FL — serving Lake County, Sumter County, and The Villages` (em-dashes). The em-dash prohibition required substitution; build uses ` · ` (middle-dot with spaces).
- **Screenshot:** [home-above-fold-desktop.png](screenshots/home-above-fold-desktop.png).
- **Build location:** [src/content/slots.ts](../../src/content/slots.ts) `hero.trust_line`.
- **Suggested approach:** Design ratifies middle-dot or proposes alternative (period, vertical bar, etc.).

---

## DESIGN RE-REVIEW

### D1. FAQ items: native `<details>/<summary>` instead of spec'd `aria-expanded` button.

- **Description:** [slots.md §FAQ](../../../../joes-aluminum-l-l-c/_design-pack/joes-aluminum-pack/slots.md) calls for "question is button (full width, left-aligned, body lg, with chevron right). Answer reveals below on click... Buttons have `aria-expanded`, answers have `aria-hidden` toggling." Build uses HTML `<details>/<summary>` instead. Same a11y semantics, zero JS, native keyboard support, but the markup pattern differs.
- **Screenshots:** [faq-collapsed.png](screenshots/faq-collapsed.png), [faq-expanded.png](screenshots/faq-expanded.png).
- **Build location:** [src/components/Faq.tsx](../../src/components/Faq.tsx).
- **Suggested approach:** Design ratifies or spec-aligns. The native pattern is cleaner; the custom-button pattern allows fine animation control and matches a custom design system more uniformly. No functional defect either way.

### D2. FAQ first-item-open default does not show in this audit's screenshot.

- **Description:** Spec says "First item open by default." The `slots.ts` data carries `open: true` on item 1 and the component honors it. The captured `faq-collapsed.png` reflects an instrumented state where the audit script set all items closed for a clean baseline. The live first-render does open item 1.
- **Screenshot:** [faq-collapsed.png](screenshots/faq-collapsed.png) is misleading; first-render at the live URL has Q1 open. Re-render to confirm if needed.
- **Build location:** [src/components/Faq.tsx](../../src/components/Faq.tsx) `<details open={item.open}>`.
- **Suggested approach:** Note for the record. No action.

### D3. Trust marquee Item 5 "1.5x width" enforced via CSS grid template; renders unevenly at md breakpoint.

- **Description:** [slots.md](../../../../joes-aluminum-l-l-c/_design-pack/joes-aluminum-pack/slots.md) specifies "Item 5 (Cole Ramsey quote) takes 1.5x width on desktop." Build sets `lg:grid-cols-[repeat(4,1fr)_1.5fr]` so this only kicks in at `lg:` (1024px+). At md (768-1023px) the layout is 2-column, so item 5 wraps with no special width.
- **Screenshot:** [home-desktop.png](screenshots/home-desktop.png) shows lg desktop; [home-mobile.png](screenshots/home-mobile.png) shows mobile stack.
- **Build location:** [src/components/Trust.tsx](../../src/components/Trust.tsx) grid template.
- **Suggested approach:** Design ratifies tablet behavior. Could extend the 1.5x to md breakpoint via `md:grid-cols-[repeat(2,1fr)_1.5fr]`. Probably fine as-is.

---

## Verified clean (not findings, just the green checks)

- 1 H1 on home, 1 H1 on /reviews. Heading hierarchy intact.
- 5 H2s on home covering Services, Proof, About, FAQ, Contact.
- 6 H3s for service-card titles.
- All 10 `<img>` complete and loaded (no broken icons, no naturalWidth=0).
- All non-2xx network responses are 304 Not Modified (cache hits), no 4xx/5xx.
- Zero console errors at desktop or mobile.
- Zero em-dashes in rendered HTML.
- No `lorem`, `TODO`, `placeholder text`, `XXX`, or `example.com` strings in rendered HTML.
- `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`, `og:type`, `og:site_name`, `og:image:width/height/alt` all present.
- `twitter:card summary_large_image`, `twitter:title`, `twitter:description` present.
- `<link rel="canonical">` present and correct on `/` and `/reviews`.
- `/reviews` carries `<meta name="robots" content="noindex, follow">` per spec.
- `sitemap.xml` resolves, lists `/`, properly excludes `/reviews`.
- `robots.txt` resolves, allows `/`, disallows `/reviews`, points at sitemap.
- JSON-LD parses as valid `HomeAndConstructionBusiness` with `additionalType` `RoofingContractor` + `GeneralContractor`, 7 service types, 4 areas served, 5.0 / 115 aggregate rating, `Mo-Su 09:00-19:00` opening hours, `foundingDate 2017`.
- Three Google Fonts (DM Sans, Public Sans, JetBrains Mono) self-hosted by Next.js, served from `/_next/static/media/*.woff2`.
- Skip-to-content link surfaces on first Tab keystroke ([focus-skip-link.png](screenshots/focus-skip-link.png)).
- Focus rings visible on form inputs ([focus-form-name.png](screenshots/focus-form-name.png)).
- Contact form submits to Static Forms successfully (HTTP 200, `{"success":true,"id":"c3d2137e-..."}`).
- Mobile drawer opens, anchors clickable, scroll lands on target ([mobile-drawer-open.png](screenshots/mobile-drawer-open.png)).
- All external links use `target="_blank"` with `rel="noopener noreferrer"` (Facebook, Google Business).
- Pink #df3d82 used for accents only; body copy uses charcoal #1a1a1a; no body-text contrast violations.
