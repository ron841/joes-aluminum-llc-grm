# Joe's Aluminum site audit — findings, pass v2

Audit run: 2026-05-05. Live URL: https://joes-aluminum-llc-grm.vercel.app. Triggered by operator walkthrough; findings are partly operator-reported, all verified against the live site via Playwright.

Categories: BLOCKERS, POLISH, OPERATOR DECISION, CONTENT.

Each finding cites a screenshot under `screenshots/` plus a build location for Code's reference. Suggested approach is direction only; no fixes applied in this audit pass.

---

## BLOCKERS

### B1. Cross-page anchor links are dead. Nav becomes a trap on `/reviews`.

- **Description:** Every nav anchor link (`#services`, `#proof`, `#about`, `#contact`) is hardcoded as an in-page hash. When the user is on `/reviews` and clicks any of those nav items, the URL hash updates (e.g., `/reviews#contact`) but the browser stays on `/reviews` and does not navigate. Same on mobile drawer. The result: once a visitor reaches `/reviews`, the only way back to the home sections is the "Back home" button on the placeholder body or a manual URL edit. Operator-reported. Confirmed via headless walk.
- **Probe data:**
  - Click `Contact` from `/reviews` → URL `→ /reviews#contact`, scrolled_to=0, navigated_off_reviews=false.
  - Same outcome for `What He Does`, `What People Say`, `About Joe`.
  - Same outcome via mobile drawer tap on `Contact`.
- **Screenshots:** [reviews-after-click-contact.png](screenshots/reviews-after-click-contact.png), [reviews-mobile-after-tap-contact.png](screenshots/reviews-mobile-after-tap-contact.png).
- **Build location:** [src/content/slots.ts](../../src/content/slots.ts) `nav.links` carries `href: "#services"` etc. Consumed in [src/components/Nav.tsx](../../src/components/Nav.tsx).
- **Suggested approach:** Make the nav location-aware. On non-home pages, anchor hrefs should resolve to `/#services` (root + hash) so the browser navigates home and lands on the section. One-line fix using `usePathname()` from `next/navigation` inside `Nav.tsx` to prefix `/` when not on `/`. Same fix applies to the mobile drawer anchors.

### B2. Brand mark "return to home" is silently broken on `/reviews`.

- **Description:** The brand `<a href="#main">` wrapper at the top-left of the nav is the conventional "click to go home" element. On `/reviews` it scrolls to the top of `/reviews` (which renders `id="main"` on its own `<main>`), so the user perceives the click as doing nothing — the page is already at the top. Operator-reported as "function of top tabs, return to home screen all clunky." Confirmed.
- **Screenshots:** [reviews-desktop.png](screenshots/reviews-desktop.png) (showing the brand mark in the nav).
- **Build location:** [src/components/Nav.tsx:30-46](../../src/components/Nav.tsx) — the brand link is `<a href="#main">`.
- **Suggested approach:** Brand link should always be `<Link href="/">` (using `next/link`). Anchors stay anchors; the brand mark routes. This is the standard multi-page convention and removes the "is anything happening?" friction.

### B3. `/reviews` is a placeholder, not a reviews page. Operator perceives it as misleading.

- **Description:** The `/reviews` route renders zero actual review bodies. Page content is one headline ("The full set is on its way."), one paragraph of operator-tagged "we'll fill this in later" copy, and two buttons ("Read on Google", "Back home"). Playwright confirmed `<blockquote>` count = 0, `<article>` count = 0. The `audit/data/reviews.json` corpus has 30 deduped reviews ready to render (29 with operator replies). Operator-reported: "On the all 115 reviews, there's no review showing. It's like, a link to his Google. Is that really what we're doing here?" The original Design pack flagged this as iter-1.5 deferred work, but the operator's expectation has caught up to the deferred timeline.
- **Screenshots:** [reviews-desktop.png](screenshots/reviews-desktop.png), [reviews-mobile.png](screenshots/reviews-mobile.png).
- **Build location:** [src/app/reviews/page.tsx](../../src/app/reviews/page.tsx).
- **Suggested approach:** Render the 30-review corpus from `audit/data/reviews.json` using the existing Proof testimonial pattern (stars, body, owner reply, attribution row). Add the saturation summary (job-noun + praise-pattern frequencies) at the top from `audit/reviews.md`. Keep the "Read all 115 on Google" link as a tertiary action since the captured corpus is 30 of 115. Lift the page out of `noindex`/`Disallow` once content is real so it's discoverable.

---

## POLISH

### P1. Mobile spacing nav-to-eyebrow reads cramped after anchor scroll.

- **Description:** When the user taps a nav anchor on mobile, the page scroll-pads to land the section top exactly at the nav bottom (scroll-padding-top: 72px). The section then has 64px-68px of internal top padding, putting the eyebrow text 73px below the nav. Visually, the brand wordmark "Joe's Aluminum" (in display font, semibold) and the eyebrow "WHAT HE DOES" (mono uppercase pink, 13px) both read as header-class content. With only 73px of cream between them, the hierarchy collapses into a single dense block. Operator-reported: "What he does is literally right on top of Joe's aluminum. The spacing right in there really looks bad."
- **Probe data (mobile, post-tap):**
  - nav_height: 72px
  - section_top to nav_bottom buffer: 0px (intentional, scroll-padding lands the section exactly at nav bottom)
  - eyebrow_top to nav_bottom buffer: 73px
  - h2_top to nav_bottom buffer: 110px
- **Screenshots:** [mobile-after-tap-services.png](screenshots/mobile-after-tap-services.png), [mobile-after-tap-proof.png](screenshots/mobile-after-tap-proof.png).
- **Build location:** [src/app/globals.css](../../src/app/globals.css) `html { scroll-padding-top: 72px; }`. Section padding in each section component, e.g. [src/components/Services.tsx:7](../../src/components/Services.tsx) `py-16 md:py-24`.
- **Suggested approach:** Bump `scroll-padding-top` to `96px` (24px buffer below the nav before the section begins) — this gives a visible breath of cream between the wordmark and the eyebrow. Optionally also bump mobile section padding to `py-20` (80px) per slots.md original spec which called for 48px mobile / 64px tablet / 96px desktop. The current `py-16` mobile is close to spec but the combined effect with the 13px eyebrow font reads tight; 24px of scroll-padding buffer fixes it without changing on-page layout.

### P2. Reviews-page section padding lands the heading under the sticky nav.

- **Description:** `/reviews` uses `py-24 md:py-32` on `<main>` plus a 72px sticky nav. Combined buffer is fine; the heading sits ~120px below nav at desktop. On mobile, the heading "The full set is on its way." sits ~96px below nav which is OK alone, but when the user navigates to `/reviews` from `/#contact` (e.g. via "All 115 Reviews"), the residual scroll-position perception combined with the mobile sticky-call-bar at viewport bottom can compress the visual real estate. Lower-priority since B3 will likely rewrite the page.
- **Screenshots:** [reviews-mobile.png](screenshots/reviews-mobile.png).
- **Build location:** [src/app/reviews/page.tsx](../../src/app/reviews/page.tsx).
- **Suggested approach:** Resolve in B3.

---

## OPERATOR DECISION

### O1. Nav label change: "All 115 Reviews" → "Reviews".

- **Description:** Operator dictated the new label: "I think we should get rid of the all for sure. It should only say 115 Reviews. Actually, we should just get rid of the 115. We should just say reviews." Decision is binding; this is not Design's call to debate.
- **Screenshots:** [reviews-desktop.png](screenshots/reviews-desktop.png) shows current "ALL 115 REVIEWS" eyebrow + nav label.
- **Build location:** [src/content/slots.ts](../../src/content/slots.ts) `nav.links[3].label`. Same string is rendered in [src/app/reviews/page.tsx](../../src/app/reviews/page.tsx) eyebrow `All 115 Reviews`.
- **Suggested approach:** Two-line slot change: nav link label `"All 115 Reviews"` → `"Reviews"`, reviews page eyebrow `"All 115 Reviews"` → `"Reviews"`. Page title meta and JSON-LD reviewCount stay 115 — that's the GBP truth count, separate from the nav label. The `proof.see_all.label` "See all 115 reviews" can stay as the proof-section CTA since context there is a count of remaining reviews, not a nav label.

### O2. Hero photo candidate supplied by operator, ready for Design ratify.

- **Description:** Operator supplied a finished pool-cage photo (landscape Florida shot, blue sky, palm, pool foreground, sharp framework detail). This addresses the v1 audit O1 ("Hero text-only vs photo, defer to walkthrough"). The photo was the missing constraint — Design specified text-only because the photo library was all portrait owner-uploaded GBP shots with no customer-attributed angles or clean landscape brand-anchor frames. Operator's new photo is a landscape brand-anchor frame. Status flips from "defer to walkthrough" to "Design ratifies hero treatment, then Code implements."
- **Screenshots:** Photo not yet on disk. Operator pasted into chat. File needs to land at a known path (suggested `~/grm-sites-prospects/joes-aluminum-l-l-c/audit/photos/operator-supplied/hero-pool-cage.jpg`) before Code can wire it into the build.
- **Build location:** [src/components/Hero.tsx](../../src/components/Hero.tsx) (currently text-only mode per slots.md §Hero).
- **Suggested approach for Design ratify:** Two viable hero treatments per slots.md vocabulary —
  - **A. Full-bleed photo with dark scrim + centered text overlay.** Photo fills hero panel; semi-transparent charcoal scrim (rgba(26,26,26,0.55)) ensures WCAG contrast on the headline. Text composition unchanged (eyebrow + rule + h1 + subhead + CTA pair + trust line) but rendered cream-on-photo. Pink CTA stands out against the photo's cool blue-and-teal palette.
  - **B. Split layout (glass-single per slots.md).** Left half (text on cream): eyebrow + rule + h1 + subhead + CTAs. Right half (photo, no overlay): the pool-cage shot with rounded `--radius-lg` corners. Mobile collapses to text-on-top, photo-below stacked.
  - Treatment A is more dramatic and reads "you are seeing the actual finished work." Treatment B preserves the current text composition exactly and adds the photo as a side asset, less risky against the lens flare and contrast constraints.
  - **Crop/composition note:** Photo aspect is roughly 4:5 portrait. A 16:9 hero crop will lose the top (sun/lens flare) or the bottom (pool foreground). Acceptable; the cage framework center band is the keeper. For treatment B, native aspect can be preserved.

---

## CONTENT

### C1. Reviews-page eyebrow "All 115 Reviews" is currently fabricated against the operator's stated preference.

- **Description:** Folds into O1. The page eyebrow on `/reviews` reads "All 115 Reviews" (rendered in pink mono uppercase). After O1 lands, change to "Reviews".
- **Build location:** [src/app/reviews/page.tsx](../../src/app/reviews/page.tsx) `<p className="eyebrow">All 115 Reviews</p>`.
- **Suggested approach:** Resolve as part of O1.

---

## Verified clean (carryforward from v1)

- All v1 BLOCKERS closed (B1 pink-on-pink CTA fixed, B2 anchors functional within the home page).
- v2 build pass landed: P1 scroll-padding, P2 OG card, P3 sticky-bar SVG icon, P4 Trust marquee rules, D1 FAQ button pattern, D3 Trust marquee md breakpoint extension.
- JSON-LD still validates with founded 2017, 5.0/115 aggregate rating.
- OG card renders cleanly (1200×630, brand mark + name + 5★ + 115 reviews + Fruitland Park, FL).
- Sitemap, robots.txt, all green.
- Em-dash count in rendered HTML: 0.

## Counts

- **3 BLOCKERS** (B1 cross-page anchors, B2 brand-link home, B3 reviews placeholder vs corpus).
- **2 POLISH** (P1 mobile scroll-padding buffer, P2 reviews page padding).
- **2 OPERATOR DECISION** (O1 nav label, O2 hero photo supplied).
- **1 CONTENT** (C1 reviews eyebrow, folds into O1).

8 findings total. B1, B2, B3, O1 are all narrow code changes. P1 is a one-line CSS bump. O2 needs Design ratify before Code wires it.
