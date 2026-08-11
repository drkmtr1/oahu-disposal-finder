# Accessibility review record

**Target:** WCAG 2.2 AA for the V1 core resident flow

**Review date:** 2026-08-10 HST
**Scope:** browse, exact search, clarification, result, facility cards, provenance, and no-match/fallback states.

## Automated evidence

- `npm run test:a11y` scans the initial page, battery clarification, alkaline-battery result, propane result with facilities and restrictions, and the no-match state using axe WCAG 2.0/2.1/2.2 A and AA tags.
- The same test proves keyboard activation reaches clarification, result, and no-match headings and that focus does not remain trapped in the prior state.
- `npm run test:e2e` checks the complete flow at 320 CSS pixels in Chromium and WebKit, including no required horizontal overflow.
- Native labels, buttons, links, landmarks, lists, heading hierarchy, text-based warnings, and visible focus styles are implemented in the application and covered by the browser checks.

## Release operator visual check

Automated checks cannot substitute for a human visual or assistive-technology review. Before declaring V1 released, the operator must complete the checklist in `docs/technical/ACCESSIBILITY.md` section 21 at 200% browser zoom and with a screen reader of their choice. Record the browser, assistive technology, date, and any findings in the release handoff.

## Current conclusion

The automated, keyboard, and reflow portions of the WCAG 2.2 AA-targeted review pass. Human visual and screen-reader confirmation remains a release sign-off activity; it is not represented as automated conformance.
