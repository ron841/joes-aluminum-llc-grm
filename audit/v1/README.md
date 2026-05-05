# Joe's Aluminum site audit. Pass v1.

Design seat: read this file first. Findings live in [findings.md](findings.md). Screenshots and machine-readable index follow.

## Audit scope

Live URL: https://joes-aluminum-llc-grm.vercel.app

- Functional walks: nav anchors, CTAs, FAQ accordion, contact form submission, /reviews route.
- Visual captures at desktop 1440×900 and mobile 375×812.
- Asset integrity: `<img>` loads, font requests, console errors, network 4xx/5xx.
- SEO/GEO: meta description, canonical, Open Graph, Twitter Card, JSON-LD, sitemap, robots.
- Accessibility spot-checks: focus rings, skip link, alt text, heading hierarchy, contrast.
- Spec compliance against the Design pack iter-1 ([slots.md](../../_design-pack-reference) is the build contract; deviations flagged).

This pass is audit-only. No fixes applied. Findings are categorized so Design can review, then a separate Code pass implements fixes.

## Headlines

- **2 BLOCKERS.** B1 (pink-on-pink CTA buttons, text invisible) likely explains the operator's "broken nav links" report. B2 documents the anchor-link verification.
- **5 POLISH items.** Incremental wins; none block ship.
- **4 OPTIONAL items.** Design judgment calls, mostly walkthrough material.
- **3 DESIGN RE-REVIEW items.** Implementation pattern deviates from spec where a different pattern was cleaner; Design ratifies or spec-aligns.

## Reading order

1. [findings.md](findings.md) — full categorized findings with screenshots and build locations.
2. [triage.md](triage.md) — Design's decisions on each finding plus the bundled v2 build sequence.
3. [screenshots/](screenshots/) — Playwright captures referenced from findings.
4. [manifest.json](manifest.json) — machine-readable index of every artifact in this pass.

## Triage status

Design completed triage. 14 findings → 7 fixes bundled for v2 (B1, P1, P2, P3, P4, D1, D3). Build sequence is in [triage.md §Build sequence for v2](triage.md). Code consumes triage directly; chat is not in the loop for v2 implementation.

## Verified clean

Heading hierarchy intact, JSON-LD validates, sitemap and robots correct, contact form submits successfully (200 from Static Forms), zero console errors at either viewport, every image loads, zero em-dashes in rendered HTML, focus ring chain works on Tab, skip-to-content surfaces. The end of [findings.md](findings.md) carries the full green-check list.

## Stock seat prompts

### For Design (v1 review — completed)

```
You are the Design seat reviewing the v1 audit of joes-aluminum-llc-grm.

Read these in order:
1. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v1/README.md
2. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v1/findings.md
3. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v1/manifest.json

For each BLOCKER, ratify the suggested approach or propose a different fix.
For each POLISH item, decide ship-now or defer-to-walkthrough.
For each OPTIONAL item, decide accept or revisit at walkthrough.
For each DESIGN RE-REVIEW item, ratify the deviation or spec-align.

Output a triage table: finding ID, decision (Fix Now | Defer | Accept | Spec-align), one-sentence rationale.
```

### For Code (v2 build pass)

```
You are the Code seat implementing the v2 build pass for joes-aluminum-llc-grm.

Read these in order:
1. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v1/triage.md
2. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v1/findings.md (for finding context)
3. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v1/manifest.json

Execute the 7-fix build sequence in triage.md §Build sequence for v2. Bundle into a single Code pass, single deploy at the end. After deploy, audit v2 re-verifies.
```
