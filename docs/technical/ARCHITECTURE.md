# ARCHITECTURE.md

# Oʻahu Household-Item Disposal Finder — Technical Architecture

**Phase:** 4 — Technical Design  
**Architecture status:** FROZEN FOR V1.0  
**Decision date:** 2026-08-09 HST

---

## 1. Architecture Decision

Version 1.0 will be a **static client-side web application**.

There will be:

- no application backend;
- no database server;
- no user accounts;
- no authentication;
- no server-side disposal-rule engine;
- no runtime City API dependency;
- no AI/LLM service;
- no analytics service in V1.

The application will bundle the manually verified Phase 3 JSON dataset as read-only application data.

### Why

The frozen requirements require:

```text
local structured data
→ deterministic item resolution
→ deterministic clarification
→ deterministic facility matching
→ accessible result rendering
```

Nothing in the V1 requirements requires server-side state or secret credentials.

Adding a backend would create operational, security, deployment, and testing surface without solving a frozen requirement.

---

# 2. System Context

```text
┌─────────────────────────────┐
│ Oʻahu Resident              │
│ browser / phone / desktop   │
└──────────────┬──────────────┘
               │ HTTPS
               ▼
┌─────────────────────────────┐
│ Static V1 Web Application   │
│ React + TypeScript          │
│ built by Vite               │
└──────────────┬──────────────┘
               │ local import
               ▼
┌─────────────────────────────┐
│ Validated V1 JSON Dataset   │
│ 25 topics                   │
│ facilities                  │
│ aliases                     │
│ clarification groups        │
│ source provenance           │
└─────────────────────────────┘
               │
               │ resident chooses official source
               ▼
┌─────────────────────────────┐
│ Honolulu ENV website        │
│ authoritative source        │
└─────────────────────────────┘
```

The browser does **not** fetch ENV pages to determine the answer at runtime.

That separation is intentional:

- V1 behavior remains deterministic;
- temporary network failure does not corrupt the local rule engine;
- the resident can still inspect the live authoritative source;
- source freshness remains an explicit maintenance responsibility.

---

# 3. Architectural Style

Use a small **modular monolith in the browser**.

The application is one deployable artifact, but its code is separated into clear modules.

```text
Presentation
     ↓
Application / Domain Services
     ↓
Validated Data Access
     ↓
Static JSON Dataset
```

No module may bypass the domain resolver to independently invent a disposal answer.

---

# 4. Proposed Repository Structure

```text
oahu-disposal-finder/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy-pages.yml
├── docs/
│   ├── adr/
│   ├── ACCESSIBILITY.md
│   ├── ARCHITECTURE.md
│   ├── SECURITY_PRIVACY.md
│   └── TECH_STACK.md
├── public/
│   └── static assets only
├── scripts/
│   └── validate-data.ts
├── src/
│   ├── app/
│   │   └── App.tsx
│   ├── components/
│   │   ├── SearchForm.tsx
│   │   ├── TopicBrowse.tsx
│   │   ├── ClarificationPanel.tsx
│   │   ├── DisposalResult.tsx
│   │   ├── FacilityCard.tsx
│   │   ├── SourceProvenance.tsx
│   │   ├── NoMatch.tsx
│   │   └── DataError.tsx
│   ├── data/
│   │   ├── v1_disposal_data.json
│   │   ├── v1_disposal_data.schema.json
│   │   └── loadData.ts
│   ├── domain/
│   │   ├── types.ts
│   │   ├── normalizeSearch.ts
│   │   ├── resolveSearch.ts
│   │   ├── resolveFacilities.ts
│   │   └── validation.ts
│   ├── styles/
│   │   └── app.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   ├── domain/
│   ├── components/
│   └── e2e/
├── DATA_DICTIONARY.md
├── DATA_LIMITATIONS.md
├── DATA_SOURCE_REGISTER.md
├── PRD.md
├── PRODUCT_SCOPE.md
├── README.md
├── eslint.config.js
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

The final tree may differ slightly during implementation, but these module boundaries are architectural requirements.

---

# 5. Domain Resolution Pipeline

## Step 1 — Normalize search input

The search normalizer may:

- trim leading/trailing whitespace;
- collapse repeated internal whitespace;
- lowercase/case-fold;
- normalize benign punctuation/hyphen variation.

It must **not** perform semantic guessing.

Example:

```text
"  Lithium-Ion   Battery "
→ "lithium ion battery"
```

---

## Step 2 — Resolve an exact supported term

Resolution order:

```text
1. exact canonical topic name
2. exact direct alias
3. exact clarification trigger
4. NO MATCH
```

The implementation must not silently choose a “closest” disposal topic.

### Why no fuzzy-routing in V1

A fuzzy result is harmless for many consumer searches but is inappropriate when similar words can lead to different disposal rules.

Examples:

- battery;
- paint;
- appliance;
- electronics.

A future suggestion UI may visually offer possible matches, but an actual disposal result must be produced only from an explicit supported mapping/selection.

---

# 6. Search Resolver Contract

Conceptual return type:

```ts
type SearchResolution =
  | { kind: "item"; itemId: string }
  | { kind: "clarification"; clarificationId: string }
  | { kind: "no-match"; query: string };
```

This union is intentionally small.

The renderer switches on `kind` and must handle all states.

---

# 7. Facility Resolution Contract

A disposal item stores zero or more eligible facility IDs.

The facility resolver:

1. receives a validated canonical item;
2. reads `primary_pathway.facility_ids`;
3. resolves each ID against the normalized facility table;
4. returns only those facility records;
5. treats an unknown referenced facility ID as invalid dataset state.

The UI must not determine facility eligibility by textual matching.

---

# 8. Application States

The main user experience can be modeled as:

```text
START
  │
  ├── browse topic ───────────────→ RESULT
  │
  └── search
        │
        ├── direct item ──────────→ RESULT
        │
        ├── ambiguous term ───────→ CLARIFICATION
        │                              │
        │                              ├── item → RESULT
        │                              └── fallback → OFFICIAL SOURCE PATH
        │
        └── unsupported ──────────→ NO MATCH
```

Separate fatal state:

```text
dataset/schema integrity failure
→ DATA ERROR
```

A data integrity failure must never degrade into a normal-looking partial disposal answer.

---

# 9. Data Loading and Validation

The Phase 3 files remain the content source:

```text
v1_disposal_data.json
v1_disposal_data.schema.json
```

Validation occurs in two places.

## Build/CI validation

`scripts/validate-data.ts` will:

1. validate JSON structure against JSON Schema;
2. verify exactly 25 frozen topics;
3. verify unique item/source/facility IDs;
4. verify direct aliases are unique;
5. verify every referenced source ID exists;
6. verify every referenced facility ID exists;
7. verify clarification item references exist;
8. verify every topic has required provenance and next action;
9. verify URLs use permitted protocols;
10. fail with a non-zero exit status on error.

**This is the release-critical validation.**

## Application defensive validation

The application data loader will assert that imported data conforms to the expected structure during development/test execution.

Production data should already have passed CI before deployment.

---

# 10. Rendering Rules

## Disposal result information hierarchy

Recommended order:

```text
1. Item/topic name
2. "What to do" — next action
3. Critical "Do not" warnings
4. Preparation
5. Restrictions / limits
6. Eligible location(s) or process
7. Optional alternatives
8. Official source / last verified
9. Independent-project disclaimer
```

The result should answer the resident task before showing supporting metadata.

## Prohibitions

`prohibitions[]` must receive visually strong treatment but cannot rely only on color.

Example:

```text
Do not put this propane tank in household trash.
```

## Alternatives

Alternatives must be explicitly differentiated from required disposal instructions.

---

# 11. Navigation

V1 does not require a routing library.

The core application can remain a single-page interaction with application state.

Reasons:

- one principal task;
- no account areas;
- no multi-page workflow;
- shareable URLs are Should-Have, not Must-Have.

If PR-103 is implemented later, a canonical result may be encoded using a simple query parameter (for example `?item=IT-020`) without adopting a routing framework.

---

# 12. Styling Architecture

Use standard CSS controlled by the repository.

V1 will not depend on a component framework or utility-CSS framework.

Reasons:

- small interface;
- easier semantic control;
- fewer dependencies;
- easier accessibility inspection;
- no need for a design-system abstraction.

Prefer:

- CSS custom properties for spacing/type tokens;
- responsive layout using Grid/Flexbox;
- system font stack;
- content width constraints;
- mobile-first rules;
- reduced-motion media query.

No external font/CDN dependency is required.

---

# 13. Error Handling

## User-level no-match

Expected application state.

Message:

- V1 does not currently cover the item;
- V1 will not guess;
- browse supported topics;
- open authoritative ENV source.

## Data error

Unexpected release/development defect.

The UI must show a non-actionable error state and an authoritative ENV fallback instead of rendering incomplete policy.

## External source unavailable

The local result remains visible, but V1 cannot claim the external site is available.

The browser handles normal external-link failure.

---

# 14. CI/CD Architecture

## Pull request / branch CI

```text
checkout
→ Node 24
→ npm ci
→ validate data
→ lint
→ typecheck
→ unit/component tests
→ build
→ end-to-end/accessibility tests
```

## Default-branch deployment

```text
successful quality gates
→ production build
→ upload GitHub Pages artifact
→ deploy Pages
→ production smoke check/manual verification
```

Deployment must not bypass the quality workflow.

---

# 15. Architecture Requirements Traceability

| Requirement area | Architecture response |
|---|---|
| PR-001 search | deterministic resolver |
| PR-002 browse | topic list reads validated dataset |
| PR-003 aliases | data-driven alias index |
| PR-004 clarification | explicit clarification groups |
| PR-005 results | structured result renderer |
| PR-007 facility matching | ID-based resolver |
| PR-009 restrictions | structured arrays + result hierarchy |
| PR-010 HHW | durable process + official source link |
| PR-011 provenance | required source IDs |
| PR-012 verification | record `verified_on` |
| PR-014 no-match | explicit resolver state |
| PR-017 responsive | mobile-first CSS |
| PR-018 accessibility | native semantics + test plan |
| PR-019 data-driven | static JSON + data layer |
| PR-020 tests | domain/component/e2e layers |
| PR-022 data errors | CI validation + defensive error state |
| PR-023 no account | no backend/state service |
| PR-024 deployment | static GitHub Pages deployment |

---

# 16. Architecture Non-Goals

Do not introduce for V1:

- API server;
- database;
- ORM;
- serverless functions;
- Redis/cache;
- container orchestration;
- Docker requirement;
- authentication provider;
- CMS;
- search engine;
- fuzzy/semantic search service;
- analytics pipeline;
- GIS stack;
- cloud object store;
- AI SDK.

A tool may enter V1 only if a frozen requirement cannot reasonably be completed without it.

---

# 17. Architecture Exit Gate

Phase 4 architecture is ready for development when:

- static architecture is accepted;
- repository/module boundaries are clear;
- search-resolution order is frozen;
- facility-resolution behavior is frozen;
- data validation behavior is frozen;
- quality-gate order is defined;
- accessibility strategy is defined;
- deployment target is defined;
- no implementation-critical architecture question remains.

**Status: PASS / READY FOR PHASE 5.**
