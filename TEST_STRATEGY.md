# TEST_STRATEGY.md

# Oʻahu Household-Item Disposal Finder — V1 Test Strategy

## Testing objective

The highest-risk failure is a plausible-looking but incorrect disposal result. Tests therefore prioritize domain correctness and source-backed routing over arbitrary line-coverage targets.

## Test layers

### 1. Data validation — release critical
Command: `npm run validate:data`

Validate JSON Schema and cross-record integrity:
- exactly 25 item records;
- unique IDs and direct aliases;
- valid source/facility/item references;
- required provenance and next action;
- HTTPS source URLs;
- frozen clarification references.

Any failure blocks build/deployment.

### 2. Domain/unit tests — Vitest
Targets:
- normalization;
- canonical match;
- alias match;
- clarification triggers;
- no-match;
- facility resolution;
- error-safe behavior.

Prefer exhaustive data-driven tests for aliases and relationship tables.

### 3. Component tests — Testing Library
Targets:
- visible label/search form;
- browse list;
- clarification controls;
- result hierarchy;
- warnings/prohibitions;
- provenance;
- no-match/fallback;
- keyboard-oriented behavior.

Use role/name/label queries before test IDs.

### 4. End-to-end tests — Playwright
Minimum release scenarios:
- browse → result;
- generic battery clarification;
- swollen laptop battery clarification;
- propane;
- latex paint;
- mattress;
- concrete;
- unsupported item.

Run at least Chromium and WebKit before release.

### 5. Automated accessibility — Playwright + axe
Representative screens:
- home/search;
- browse;
- clarification;
- standard result;
- facility-heavy result;
- no-match;
- data-error if practical.

Automated accessibility checks do not replace manual WCAG review.

### 6. Manual accessibility verification
Before V1:
- complete all five scenarios keyboard-only;
- confirm visible focus and logical focus order;
- verify 200% zoom;
- verify narrow reflow/mobile;
- inspect headings/labels/control names;
- verify warning meaning without color;
- verify target sizes and source links.

### 7. Manual civic-data spot check
Immediately before release, manually re-open authoritative sources for all 25 records and update only source-backed data/verification dates.

## CI quality gates

Expected order:

```text
npm ci
→ validate:data
→ lint
→ typecheck
→ unit/component tests
→ build
→ e2e/a11y smoke tests
```

## Coverage policy

No arbitrary percentage blocks V1.

Instead, release-blocking behaviors must have explicit tests, especially:
- every alias;
- every clarification group;
- all referenced facility IDs;
- known exclusions;
- five acceptance scenarios;
- no-match and data-error behavior.

## Defect severity

### Critical
Could cause unsafe/incorrect civic guidance or entirely block core task/accessibility.
Must fix before release.

### High
Materially wrong pathway/facility/restriction or severe usability/accessibility impairment.
Must fix before release.

### Medium
Does not change authoritative answer but impairs clarity/usability.
Fix before release where feasible; document if consciously deferred.

### Low
Cosmetic or non-blocking polish.
May be deferred.
