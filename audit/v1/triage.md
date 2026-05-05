# Joe's Aluminum v1 audit — Design triage

Companion to [findings.md](findings.md). Decisions Design made on each finding, plus the bundled build sequence Code consumes for the v2 pass.

Read order: [README.md](README.md) → [findings.md](findings.md) → this file.

## Triage table

| ID | Decision | Rationale |
| --- | --- | --- |
| **B1** | **Fix Now — @layer base wrap** | Ratify Code's primary suggestion. Wrapping the global `a {}` rule in `@layer base` is the minimal intervention that makes Tailwind utilities win. The `:where(.prose, p) a` scope alternative is more invasive and changes more than the bug requires. Pink CTAs preserve cream-on-pink (5.8:1) per slots.md accessibility floor. |
| **B2** | **Defer (verification only)** | No build action. Functionally clean per Playwright walk. After B1 ships, the operator's "broken nav links" report should resolve. If it persists post-fix, capture an environment trace at walkthrough — but don't preempt. |
| **P1** | **Fix Now** | `html { scroll-padding-top: 72px; scroll-behavior: smooth; }` is two lines. Defense-in-depth + the smooth-scroll is itself a UX win the operator may have been reaching for. Bundle with B1. |
| **P2** | **Fix Now — render `opengraph-image.tsx`** | Portrait OG cropping is visible to anyone Joe shares the link with. The Next.js `opengraph-image.tsx` convention is right here — brand mark + tagline + 5.0★ / 115 reviews badge. Self-contained, doesn't depend on the photo library being good. |
| **P3** | **Fix Now** | Inline SVG phone icon is twenty lines and removes the cross-skin font-fallback risk for free. No reason to ship an emoji on a sticky CTA. |
| **P4** | **Spec-align — restore vertical rules** | Spec called for them. The "visual cleanliness" deviation is fine but the rules are part of the marquee's rhythm. Code restores `border-l var(--color-rule)` on items 2-5, desktop only. |
| **P5** | **Defer to walkthrough** | Content-availability constraint, not a build defect. Walkthrough Decision #8 (hero photo) and #11 (operator photo curation) cover this — if Joe surfaces landscape sources, the cards re-spec naturally. Don't re-crop the existing portrait shots; that would just hide the constraint. |
| **O1** | **Defer to walkthrough** | Decision #8 in the pack's Open Decisions table. Text-only stands as the default per the photo-library-weakness rule. Joe's portrait or finished-lanai shot at walkthrough flips it to glass-single. |
| **O2** | **Defer to walkthrough** | Same as O1 — Decision #11. Single-column About with "Established 2017." accent line is the spec-compliant fallback; restore two-col only if Joe supplies a portrait. |
| **O3** | **Defer to walkthrough** | Decision #2 (operator name). Build correctly omits the literal `[pending-walkthrough]` token. The "Established 2017." accent is a clean stand-in until Joe confirms his last name; then the signature replaces it. |
| **O4** | **Accept — middle-dot stands** | Em-dash prohibition is universal. Middle-dot with spaces (·) is the cleanest substitute and maintains the rhythm. Period reads as full-stop, vertical bar reads as UI chrome. Ratify and move on. |
| **D1** | **Spec-align — switch to button + aria-expanded** | The native `<details>/<summary>` is functionally fine but the spec exists for a reason: cross-browser typographic consistency on the disclosure triangle is uneven, and a custom button gives Code one fine animation control surface for a future hover/transition pass. Spec-align this iteration so the pattern is the same shape across categories. |
| **D2** | **Accept (no action)** | Confirmed — instrumented state, not a real defect. Note for the record only. |
| **D3** | **Spec-align — extend 1.5x to md** | `md:grid-cols-[repeat(2,1fr)_1.5fr]` is one line. The Cole Ramsey quote is the marquee's anchor element; it should keep its weight at tablet, not stack indistinguishably. |

## Build sequence for v2

Bundle into a single Code pass, single deploy at the end (per the bundling lesson from Yankee iter 2-3):

1. **B1** — `@layer base` wrap on globals.css `a {}` rule.
2. **P1** — `scroll-padding-top: 72px` + `scroll-behavior: smooth` on `html`.
3. **P2** — `src/app/opengraph-image.tsx` (text-based card: brand mark + "Joe's Aluminum L.L.C." + "5.0 ★ · 115 reviews · Fruitland Park, FL").
4. **P3** — inline SVG phone icon in `StickyCall.tsx`, remove emoji.
5. **P4** — restore `border-l var(--color-rule)` on Trust marquee items 2-5, lg only.
6. **D1** — refactor `Faq.tsx` to button + `aria-expanded` + `aria-hidden`, preserve first-item-open default.
7. **D3** — extend 1.5x grid template to md breakpoint.

7 fixes, single v2 deploy, then audit v2 re-verifies.

## Lessons-doc candidates

Two patterns from this audit worth promoting to `grm-lessons.md` after v2 lands:

1. **Unlayered global `a {}` rules outrank Tailwind utilities.** This is a CSS-Cascade-Layer-5 footgun any Tailwind-based contractor build will hit if globals.css has unscoped link styling. Lesson candidate for the Capture / Pipeline section, with the `@layer base` fix as the standing remedy. Should propagate to `grm-build-defaults.md` as a "Tailwind + globals.css" boilerplate note.

2. **Operator-reported bugs need their visual root cause checked, not just the functional layer.** The operator said "broken nav links." Functionally the anchors work. The visual layer (invisible CTA labels) was the actual report — the operator described what they could see, not the underlying mechanism. Lesson for the Workflow section: when an operator reports a vague functional defect, audit the visual surface in parallel with the functional one. Saves a round-trip.

Both fold into the lessons doc when v2 audit clears, alongside the trade-lexicon candidate already filed from this build.
