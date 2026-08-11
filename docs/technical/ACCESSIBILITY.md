# ACCESSIBILITY.md

# Oʻahu Household-Item Disposal Finder — Accessibility Design

**Target:** WCAG 2.2 Level AA  
**Scope:** complete V1 core resident flow  
**Decision date:** 2026-08-09 HST

---

# 1. Accessibility Is a Release Requirement

Accessibility is not deferred polish.

A release-blocking accessibility defect in the core task blocks V1 completion.

The project targets WCAG 2.2 Level AA and uses:

- semantic implementation;
- automated checks;
- manual keyboard review;
- manual zoom/reflow review;
- manual content/focus review.

Automated tools alone are not treated as proof of conformance.

---

# 2. Semantic Page Structure

Use native elements first.

Expected structure:

```html
<header>...</header>
<main>...</main>
<footer>...</footer>
```

Within main content:

- one logical `h1`;
- ordered heading hierarchy;
- real `<form>`;
- real `<label>`;
- real `<button>`;
- real links for navigation;
- lists for lists;
- `<address>` only where semantically appropriate.

Do not recreate buttons/links using generic `<div>` elements.

---

# 3. Search Form

Requirements:

- persistent visible text label;
- input purpose understandable without placeholder text;
- submit button has an accessible name;
- instructions are associated programmatically when needed;
- Enter submits normally;
- error/no-match messaging is announced appropriately.

Placeholder may provide an example but never replaces the label.

Example:

```text
Label: What item do you need to dispose of?
Example text: propane tank
Button: Find disposal instructions
```

---

# 4. Browse Interface

The 25 topics must be keyboard accessible.

Prefer ordinary buttons or links in a semantic list.

Do not build a custom ARIA listbox unless native controls cannot satisfy the design.

---

# 5. Clarification Interface

Clarification must expose:

- a clear question;
- explicit choices;
- keyboard-operable controls;
- a predictable focus sequence.

Preferred implementations:

- group of native buttons; or
- fieldset + legend + radio inputs when choosing then submitting is clearer.

Do not rely on clickable cards without semantic controls.

---

# 6. Result Focus Management

A search/clarification changes the main content meaningfully.

After an explicit resident action produces a result:

- move focus to the new result heading or a logical result container;
- use `tabIndex="-1"` only when needed for programmatic focus;
- do not trap focus;
- do not move focus during passive typing.

For a no-match result, move focus to the no-match heading/message region using the same predictable pattern.

---

# 7. Status Announcements

Use an appropriate live region for concise state messages that do not receive focus.

Examples:

- “25 supported topics available”
- “No supported item matched”
- validation/error notices.

Do not put the entire result into an assertive live region.

---

# 8. Keyboard Requirements

The complete core journey must work with:

```text
Tab
Shift+Tab
Enter
Space
```

where appropriate.

Requirements:

- no keyboard traps;
- logical tab order;
- visible focus;
- focused controls remain visible;
- no hover-only content required for task completion.

---

# 9. Focus Appearance

Focus indicators must be visually obvious and meet the WCAG 2.2 focus-related requirements targeted by the project.

Do not remove browser outlines without providing an equal or stronger replacement.

Focus cannot be obscured by sticky elements.

---

# 10. Touch Target Size

Controls should comfortably exceed the WCAG 2.2 Level AA minimum target-size requirement where practical.

V1 design target:

**approximately 44 × 44 CSS pixels or larger for primary interactive controls**.

This is a product design target, not a statement that every inline text link must be physically 44×44.

---

# 11. Color and Contrast

Target at least:

- 4.5:1 for normal text;
- 3:1 for qualifying large text;
- 3:1 for meaningful non-text UI boundaries/indicators where WCAG requires it.

Warnings cannot rely on red/orange alone.

Example:

```text
⚠ Do not put this propane tank in household trash.
```

The text carries the meaning even without color.

---

# 12. Typography and Readability

Use a system font stack.

Guidelines:

- body text generally at least 16 CSS px;
- comfortable line height;
- readable line length;
- avoid all-caps paragraphs;
- plain-language headings;
- sufficient spacing between result sections.

The interface must remain usable when users override text spacing.

---

# 13. Zoom and Reflow

Manually verify:

- 200% browser zoom;
- narrow mobile viewport;
- 320 CSS-pixel reflow scenario where applicable;
- no required horizontal scrolling for the core content;
- facility cards and long URLs do not break layout.

Source URLs should be presented as human-readable link labels rather than raw long URLs in the resident-facing result whenever possible.

---

# 14. Mobile

Core controls must remain operable on touch screens.

Avoid:

- hover-only information;
- tiny disclosure controls;
- horizontal carousels for required information;
- drag-only interactions.

No device orientation should be required.

---

# 15. Motion

V1 does not need animation to solve the task.

If transitions are used:

- keep them non-essential;
- respect `prefers-reduced-motion`;
- never require motion to understand state.

Simplest V1 choice: minimal/no non-essential animation.

---

# 16. Icons

Icons are optional.

If used:

- decorative icons are hidden from assistive technology;
- meaningful icon-only controls require accessible names;
- critical meaning must not depend on an icon alone.

Text-first design is preferred.

---

# 17. Links

Source links need descriptive names.

Good:

```text
View official Honolulu ENV propane guidance
```

Avoid:

```text
Click here
```

Default external-source navigation should stay in the same tab unless there is a deliberate reason otherwise.

---

# 18. Facility Cards

Each card should expose:

1. facility name as heading;
2. address;
3. published hours;
4. applicable restriction;
5. official-source link.

Repeated labels such as “Hours” and “Restrictions” improve scanability.

Do not encode facility eligibility only through visual placement.

---

# 19. Prohibitions and Restrictions

Critical instructions must appear in text.

Example semantic structure:

```text
What to do
...
Do not
...
Prepare the item
...
Restrictions
...
Eligible locations
...
Official source
...
```

This provides a predictable reading sequence for visual and screen-reader users.

---

# 20. Automated Accessibility Testing

Use Playwright + axe on representative states:

1. initial search;
2. browse;
3. battery clarification;
4. propane result;
5. concrete/facility result;
6. no-match;
7. data-error state where testable.

Automated violations at serious/critical levels require review and resolution before V1.

Do not suppress a rule solely to make CI green; document a justified exception if one ever becomes necessary.

---

# 21. Manual Release Checklist

Before V1 release:

## Keyboard
- [ ] complete all five acceptance scenarios without mouse/touch;
- [ ] browse all topics;
- [ ] trigger and complete clarification;
- [ ] reach official source link;
- [ ] verify focus is always visible;
- [ ] verify no focus trap.

## Zoom/reflow
- [ ] 200% zoom;
- [ ] narrow mobile width;
- [ ] no clipped critical text;
- [ ] no required horizontal scrolling.

## Screen-reader-oriented structure
- [ ] page title meaningful;
- [ ] headings logical;
- [ ] search label announced;
- [ ] buttons/links have meaningful names;
- [ ] clarification group understandable;
- [ ] result hierarchy understandable;
- [ ] no-match understandable;
- [ ] warnings represented in text.

## Visual
- [ ] text contrast checked;
- [ ] focus contrast checked;
- [ ] warnings not color-only;
- [ ] target sizes usable;
- [ ] link states distinguishable.

---

# 22. Accessibility Test Philosophy

Test the resident journey, not only individual components.

A technically valid button does not make the workflow accessible if:

- focus jumps unpredictably;
- restrictions are announced too late;
- the resident cannot distinguish required vs optional actions;
- mobile layout hides a critical facility constraint.

Accessibility review therefore includes **information architecture and task comprehension**, not just ARIA.

---

# 23. Reference

Primary standard:

- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- W3C How to Meet WCAG: https://www.w3.org/WAI/WCAG22/quickref/
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing
