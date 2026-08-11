# BACKLOG.md

# Oʻahu Household-Item Disposal Finder — V1 Implementation Backlog

Status vocabulary: `READY`, `IN PROGRESS`, `BLOCKED`, `DONE`, `POST-V1`.

The ordering is intentional. Complete one story, verify it, and commit before starting the next.

## Foundation

### DF-001 — Establish green dependency baseline
**Status:** READY — one-time local/Codex setup

**Scope**
- run `npm install` under Node 24.19.x;
- generate `package-lock.json`;
- install Playwright Chromium/WebKit;
- make `npm run foundation:check` green;
- commit lockfile.

**Do not implement product functionality in DF-001.**

---

## User stories

### US-001 — Browse supported topics
**Status:** READY
**Requirements:** PR-002, PR-017, PR-018, PR-019

As a resident, I can browse all 25 supported canonical topics so I do not need to know the exact search term.

**Acceptance criteria**
- all 25 canonical topics are rendered from structured data;
- each is keyboard reachable using a native semantic control;
- choosing a topic reaches a minimal result state for that canonical record;
- no duplicate item list is hard-coded in UI code;
- tests prove 25 topics are discoverable.

**Codex boundary:** Do not add search/alias matching yet.

### US-002 — Exact canonical search
**Status:** READY
**Requirements:** PR-001, PR-014

As a resident, I can enter an exact canonical topic name and reach that result.

**Acceptance criteria**
- normalization handles case/outer whitespace/benign repeated spaces;
- exact canonical names resolve deterministically;
- unsupported input produces no-match;
- no fuzzy routing.

### US-003 — Direct alias matching
**Status:** READY
**Requirements:** PR-003

As a resident, I can use a frozen ordinary-language alias such as `couch` or `propane tank`.

**Acceptance criteria**
- aliases come from dataset records;
- each direct alias resolves to exactly one topic;
- automated tests cover all frozen aliases;
- ambiguous broad words remain clarification triggers rather than aliases.

### US-004 — Deterministic clarification
**Status:** READY
**Requirements:** PR-004

As a resident entering a broad supported term, I am asked a clear clarification question instead of receiving a guessed answer.

**Required groups**
- battery;
- laptop/swollen battery condition;
- paint;
- appliance;
- electronics.

**Acceptance criteria**
- clarification groups render from data;
- choices use native semantic controls;
- selected item routes deterministically;
- fallback choices reach the correct official-source path;
- keyboard flow passes.

### US-005 — Action-first disposal result
**Status:** READY
**Requirements:** PR-005, PR-009

Render the canonical topic, next action, prohibitions, preparation and restrictions in an action-first hierarchy.

**Acceptance criteria**
- no required result field is duplicated as policy logic in components;
- prohibitions cannot rely on color alone;
- missing critical data produces data-error, not a plausible partial result.

### US-006 — Provenance and verification
**Status:** READY
**Requirements:** PR-011, PR-012, PR-013, PR-015, PR-016

Show source provenance, manual verification date, independent-project disclosure and resident-scope disclosure.

### US-007 — Eligible City facility resolution
**Status:** READY
**Requirements:** PR-007, PR-008

Resolve eligible facility IDs into facility cards.

**Acceptance criteria**
- only referenced facilities are shown;
- cards include name, address, published hours, applicable restrictions and source link where available;
- unknown facility reference is treated as invalid data;
- tests include Keʻehi exclusions and concrete facility limits.

### US-008 — Multiple pathways and alternatives
**Status:** READY
**Requirements:** PR-006

Display optional source-backed alternatives without confusing them with required/prohibited actions.

### US-009 — HHW process presentation
**Status:** READY
**Requirements:** PR-010

HHW-routed topics clearly state appointment/process requirements and send the resident to the authoritative current source rather than hard-coding a supposedly permanent event date.

### US-010 — Complete no-match / fallback states
**Status:** READY
**Requirements:** PR-014

Unsupported terms and unresolved clarification fallbacks never generate guessed disposal advice.

### US-011 — Responsive core flow
**Status:** READY
**Requirements:** PR-017

Complete the core flow on representative phone and desktop widths without required horizontal scrolling.

### US-012 — Accessibility release refinement
**Status:** READY
**Requirements:** PR-018

Complete the documented WCAG 2.2 AA-targeted manual and automated review for the core flow.

### US-013 — Five acceptance scenarios
**Status:** READY
**Requirements:** PR-020, PR-021

Automate and manually verify:
1. swollen laptop lithium-ion battery;
2. old propane tank;
3. leftover latex paint;
4. mattress;
5. concrete pieces.

### US-014 — Error-safe data rendering
**Status:** READY
**Requirements:** PR-022

Invalid/missing required data cannot render a normal disposal result.

### US-015 — Production deployment and documentation
**Status:** READY
**Requirements:** PR-024, PR-025

Deploy through GitHub Actions/Pages, perform production smoke validation, and finalize repository documentation/known limitations.

---

## Should-Have — only after Must-Have work is stable

### SH-001 — Type-ahead suggestions
**Status:** POST-V1 unless it is clearly zero-risk before closeout
**Requirement:** PR-101

Suggestions may aid discovery but may not automatically route policy via fuzzy matching.

### SH-002 — Facility telephone number
**Status:** POST-V1 / optional
**Requirement:** PR-102

### SH-003 — Copy/share canonical result URL
**Status:** POST-V1 / optional
**Requirement:** PR-103

### SH-004 — Category browse
**Status:** POST-V1 / optional
**Requirement:** PR-104

---

## V1 Stop Rule

When all Must-Have requirements are satisfied and release validation/deployment/documentation are complete, declare Version 1.0 complete and stop adding features.
