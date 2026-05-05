# Joe's Aluminum v2 audit — Design triage

Companion to [findings.md](findings.md). Decisions Design made on each finding, plus the bundled v3 build sequence Code consumes for the next pass.

Read order: [README.md](README.md) → [findings.md](findings.md) → this file.

## Triage table

| ID | Decision | Rationale |
| --- | --- | --- |
| **B1** | **Fix Now — location-aware hrefs** | Ratify. The nav was authored for the single-page architecture; the `/reviews` page broke the assumption silently. Standard Next.js pattern: `pathname === '/' ? '#contact' : '/#contact'`. Implement once in the nav component, applies to all four anchors + the mobile drawer. |
| **B2** | **Fix Now — `<Link href="/">` on the brand mark** | Ratify. The brand mark must always return to home from anywhere. `<a href="#main">` made sense in the single-page world; in the two-page world it's a silent dead-end and erodes trust. |
| **B3** | **Fix Now — render the corpus, not a placeholder** | Ratify with one constraint. The 30-review saturation corpus is the whole point of the reviews-as-own-page architectural flex (per the decisions ledger). Shipping a placeholder undercuts the architectural argument. Constraint: render in chronological-by-relevance order, not raw chronological — the three operator-endorsement / same-week-timing / competitor-mention picks (Michael Baruch, Cole Ramsey, Lou Berger) lead the page, then the rest follow. Code references content-inventory.md §reviews-page.curated_leads for the order. |
| **P1** | **Fix Now — bump scroll-padding to 96px** | Ratify. The 72px was nav-height-only; the 24px buffer restores the eyebrow-then-section-heading hierarchy on mobile. Two-character change in globals.css. |
| **P2** | **Fix Now — bundled with B3** | Reviews-page padding falls out of B3's render pass. No separate decision. |
| **O1** | **Accept — operator binding** | "Reviews" is correct. The "All 115 Reviews" framing was a synthesis-layer flourish that landed before walkthrough; once the operator weighs in, walkthrough wins. JSON-LD reviewCount: 115 stays as-is (that's the GBP aggregate truth, independent of the nav label). |
| **O2** | **Ratify treatment B — split layout, text left, photo right** | The hero photo Joe supplied is strong. Treatment B is the correct call for three reasons: (1) it sidesteps the lens-flare-vs-text collision Code flagged; (2) it preserves WCAG AA contrast for both pink and charcoal text against the cream background, no scrim engineering required; (3) it matches the glass-single mode in categories/contractor-profile.md with a literal split-layout interpretation rather than a scrim-overlay one — same architectural mode, more honest to the photo. Crop spec: 4:5 source crops to 4:5 in the right column, no enforced aspect change. Photo dominates the right column at desktop; on mobile, photo stacks below the text block at full bleed (no aspect change), height-constrained to ~60vh so the CTAs stay above the fold. |
| **C1** | **Fix Now — bundled with O1** | Reviews-page eyebrow follows the nav label rename. One string change. |

## Build sequence for v3

Single Code pass, single deploy:

1. **B1** — location-aware nav hrefs (component-level pathname check).
2. **B2** — brand mark to `<Link href="/">`.
3. **B3 + P2** — render the 30-review corpus on `/reviews` using the Proof testimonial pattern; curated leads (Baruch, Ramsey, Berger) first, then the remaining 27 in chronological order; reviews-page padding follows.
4. **P1** — `scroll-padding-top: 96px`.
5. **O1 + C1** — nav label and reviews-page eyebrow to "Reviews".
6. **O2** — split-layout hero, photo at the path Joe supplied (`~/grm-sites-prospects/joes-aluminum-l-l-c/audit/photos/operator-supplied/hero-pool-cage.jpg`).

6 fixes, single v3 deploy, then audit v3 re-verifies.

## Lessons-doc candidates from this iteration

Three patterns to fold into `grm-lessons.md` after v3 lands:

1. **Architectural flexes (single-page → two-page) need an explicit nav-href audit.** When the reviews-as-own-page decision flipped the architecture mid-build, the nav stayed authored for the single-page world. Pipeline contract should call out that any architectural flex triggers a nav-link sweep — anchors, brand mark, mobile drawer.

2. **Render the corpus, not a placeholder, when the corpus is the architectural argument.** Shipping `/reviews` as a coming-soon stub in v2 quietly contradicted the synthesis-layer reasoning that justified the page existing. Lesson: when an architectural flex is data-driven (saturation corpus, photo library threshold), the data has to ship with the architecture or the architecture is unjustified.

3. **v1 fixes held cleanly through v2.** Code flagged this as a non-finding, but it's worth recording as a positive pattern — bundled-fix passes with single deploys at iteration boundaries don't regress earlier work. Reinforces the bundling lesson from Yankee iter 2-3.

All three fold into the lessons doc when v3 audit clears, alongside the trade-lexicon and Tailwind-globals candidates already filed.
