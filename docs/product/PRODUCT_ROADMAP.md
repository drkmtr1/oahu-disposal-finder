# PRODUCT_ROADMAP.md

# Oʻahu Household-Item Disposal Finder — Product Roadmap

This roadmap is milestone-based rather than date-based.

The governing objective is to finish Version 1.0, not continuously enlarge it.

---

# Milestone 1 — Discovery

**Status: COMPLETE**

Outputs:

- PROJECT_CHARTER.md
- PROBLEM_OPPORTUNITY.md
- CURRENT_STATE_JOURNEY.md
- STAKEHOLDER_MAP.md
- EVIDENCE_REGISTER.md

Gate:

- Discovery Gate 1 — PASS

Decision:

- legitimate information-navigation problem is sufficiently supported for an experimental V1;
- no additional pre-build resident research is required.

---

# Milestone 2 — Product Definition

**Status: COMPLETE WITH THIS PACKAGE**

Outputs:

- PRD.md
- PRODUCT_SCOPE.md
- PRODUCT_ROADMAP.md
- SUCCESS_METRICS.md

Decisions:

- resident job frozen;
- 25-topic V1 corpus frozen;
- deterministic search/clarification model selected;
- item-to-facility eligibility is core;
- no GPS/AI/accounts/illegal-dumping functionality;
- Must-Have requirements numbered and frozen;
- V1 completion criteria defined.

Gate:

> Product Definition Gate — PASS when these documents are accepted as project state.

---

# Milestone 3 — Data Foundation

**Next milestone**

Outputs:

- DATA_SOURCE_REGISTER.md
- DATA_DICTIONARY.md
- DATA_LIMITATIONS.md
- initial structured V1 disposal dataset

Work:

1. enumerate the authoritative source for each of the 25 canonical topics;
2. define canonical topics and aliases;
3. model disposal pathways;
4. model restrictions/preparation;
5. model City facilities;
6. model item-to-facility eligibility;
7. model provenance and verification dates;
8. identify third-party source limitations;
9. validate all 25 records manually;
10. define how stale/uncertain data is represented.

Exit criteria:

- every frozen topic is source-backed;
- required data fields are defined;
- no unresolved source conflict would make a Must-Have result incorrect;
- representative data can support all five acceptance scenarios.

---

# Milestone 4 — Technical Design

Outputs:

- ARCHITECTURE.md
- TECH_STACK.md
- SECURITY_PRIVACY.md
- ACCESSIBILITY.md
- docs/adr/

Key decisions to make:

- application framework;
- structured-data format;
- search/alias implementation;
- deterministic clarification model;
- validation/schema library;
- testing stack;
- deployment platform;
- accessibility test tooling.

Default architecture principle:

> Prefer the simplest modular web application that satisfies the frozen requirements.

Avoid infrastructure that V1 does not need.

Exit criteria:

- architecture explains every Must-Have requirement;
- no ambiguous implementation-critical decision remains;
- test strategy can verify deterministic rules;
- deployment path is known.

---

# Milestone 5 — Development Foundation

Outputs:

- repository/app skeleton;
- BACKLOG.md
- TEST_STRATEGY.md
- DEFINITION_OF_DONE.md
- CI checks where appropriate.

Work:

- initialize project;
- configure formatting/lint/type checking;
- load/validate structured dataset;
- establish component/layout foundation;
- establish automated test harness;
- implement accessibility baseline.

Exit criteria:

- application boots locally;
- data validates;
- automated tests execute;
- quality checks execute.

---

# Milestone 6 — Core User Stories

Implement one story at a time:

```text
story
→ scoped Codex task
→ implementation
→ automated tests
→ manual verification
→ review
→ commit
→ next story
```

Recommended sequence:

1. browse supported topics;
2. exact canonical search;
3. alias matching;
4. deterministic clarification;
5. disposal-result view;
6. provenance display;
7. restrictions/preparation;
8. facility eligibility;
9. facility information;
10. HHW/special-process result;
11. no-match state;
12. responsive/accessibility refinement.

Do not ask Codex to build the whole application in one task.

---

# Milestone 7 — Release Validation

Validate:

- all PR-001 through PR-025 acceptance criteria;
- all 25 canonical topics;
- five resident acceptance scenarios;
- automated tests;
- data schema validation;
- item-to-facility mappings;
- source/provenance completeness;
- lint;
- type checks;
- responsive layout;
- keyboard flow;
- accessibility review;
- error/no-match states.

Exit criteria:

- zero unresolved Must-Have requirements;
- zero known incorrect authoritative mappings;
- no release-blocking accessibility defect.

---

# Milestone 8 — Public Deployment and Documentation

Work:

- deploy production build;
- perform production smoke test;
- finalize README/project documentation;
- document known limitations;
- record source-verification state;
- verify public HTTPS URL.

Exit criteria:

- another developer can clone, understand, run, test, and maintain the project;
- deployed application matches validated build.

---

# Milestone 9 — Version 1.0 Closeout

When all release criteria are satisfied:

> **Declare Oʻahu Household-Item Disposal Finder Version 1.0 complete.**

Then stop feature development.

Create a V1 closeout note containing:

- what shipped;
- requirements status;
- test status;
- accessibility status;
- known limitations;
- source verification date;
- deployment URL;
- backlog items intentionally deferred.

---

# Milestone 10 — Formative Evaluation

This occurs after a functional V1 exists and does not block the portfolio goal of reaching a technically complete V1 unless a severe correctness/usability problem is discovered.

Use the existing resident test packet to compare:

- current information environment;
- Disposal Finder V1.

Possible measures:

- completion;
- correctness;
- completion time;
- pages/sources used;
- facility-selection correctness;
- confidence;
- source awareness;
- confusion;
- accessibility/usability observations.

The sample should be described as formative and not statistically representative.

---

# Post-V1 Backlog

Possible future work only after V1 closeout:

- expand item corpus;
- nearest-facility/location features;
- automated source freshness checks;
- enhanced sharing;
- richer category browsing;
- official stakeholder feedback;
- deeper resident evaluation;
- data-maintenance tooling.

Illegal-dumping features remain a separate product decision, not a default evolution of this project.
