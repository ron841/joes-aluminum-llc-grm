# Joe's Aluminum site audit. Pass v2.

Design seat: read this file first. Findings live in [findings.md](findings.md). Triage doc lands here as `triage.md` once Design completes the pass.

## Audit scope (v2)

Live URL: https://joes-aluminum-llc-grm.vercel.app

Triggered by operator walkthrough on 2026-05-05. Operator surfaced four issues during their own walk:

1. Mobile spacing nav-to-eyebrow reads cramped after anchor scroll.
2. `/reviews` page is a placeholder, not a real reviews page. Operator surprised by this.
3. Nav links are dead from `/reviews` (e.g. clicking Contact does nothing).
4. Brand-mark "return to home" feels clunky on `/reviews`.

Plus a follow-up note: **operator supplied a hero-photo candidate** (landscape pool-cage shot with palm, sky, pool framework detail). Addresses the v1 audit's O1 deferred decision.

Plus a binding label change: **"All 115 Reviews" → "Reviews"** (operator dictated, not Design's call).

This pass is audit-only. No fixes applied. Findings categorized so Design ratifies the approach, then a separate Code pass implements.

## Headlines

- **3 BLOCKERS.** Cross-page anchor breakage from `/reviews` (every nav link dead). Brand-mark "home" silently no-ops. `/reviews` placeholder vs the 30-review corpus already captured in audit data.
- **2 POLISH.** Mobile scroll-padding buffer (24px bump suggested). `/reviews` page padding (folds into the BLOCKER fix).
- **2 OPERATOR DECISION.** Nav label change (binding). Hero photo candidate (Design ratifies treatment).
- **1 CONTENT.** Reviews-page eyebrow follows the nav-label change.

## Reading order

1. [findings.md](findings.md) — full categorized findings with screenshots and build locations.
2. `triage.md` — Design's decisions on each finding plus the bundled v3 build sequence (added after Design pass).
3. [screenshots/](screenshots/) — Playwright captures referenced from findings.
4. [manifest.json](manifest.json) — machine-readable index of every artifact in this pass.

## Stock seat prompts

### For Design (v2 review)

```
You are the Design seat reviewing the v2 audit of joes-aluminum-llc-grm.

Read these in order:
1. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v2/README.md
2. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v2/findings.md
3. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v2/manifest.json

For each BLOCKER, ratify Code's suggested approach or propose a different fix.
For each POLISH item, decide ship-now or defer.
For each OPERATOR DECISION, ratify the operator's call and add any treatment notes Code needs.
For each CONTENT item, decide whether it lands as part of the OPERATOR DECISION sweep or its own pass.

Special attention on O2 (hero photo): operator supplied a landscape pool-cage
photo. v1 audit O1 deferred this to walkthrough; the photo flips that finding
to ready-for-build. Choose treatment A (full-bleed + scrim) or B (split
layout) per the findings note. Specify scrim opacity, text alignment, and
mobile collapse pattern.

Output a triage table: finding ID, decision (Fix Now | Defer | Accept |
Spec-align | Operator-binding), one-sentence rationale.
```

### For Code (v3 build pass — after Design completes triage)

```
You are the Code seat implementing the v3 build pass for joes-aluminum-llc-grm.

Read these in order:
1. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v2/triage.md
2. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v2/findings.md (for finding context)
3. https://raw.githubusercontent.com/ron841/joes-aluminum-llc-grm/main/audit/v2/manifest.json

Execute the build sequence per triage.md. Bundle into a single Code pass,
single deploy at the end. After deploy, audit v3 re-verifies.

For O2 (hero photo), expect operator to drop the file at
~/grm-sites-prospects/joes-aluminum-l-l-c/audit/photos/operator-supplied/hero-pool-cage.jpg
or a path noted in triage.md. If the file isn't on disk at build time, skip
O2, deploy the rest, and flag in the build summary so Code seat picks up the
hero swap on a follow-up pass.
```
