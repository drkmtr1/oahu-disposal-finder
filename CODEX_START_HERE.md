# CODEX_START_HERE.md

## Mission

Continue the Oʻahu Household-Item Disposal Finder from the completed Discovery, Product Definition, Data Foundation, and Technical Design phases.

Do **not** redesign the product or expand V1. Implement the frozen V1 one scoped story at a time.

## Before writing product code

Perform this one-time foundation bootstrap:

1. Confirm Node 24.19.x is active.
2. Run `npm install` to resolve the pinned dependency ranges and generate `package-lock.json`.
3. Install Playwright browsers: `npx playwright install chromium webkit`.
4. Run `npm run foundation:check`.
5. Fix setup/configuration issues only. Do not implement product stories while establishing the baseline.
6. Commit the generated `package-lock.json` after the foundation is green.

### Required green baseline

The following must succeed:

```bash
npm run validate:data
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run test:a11y
```

## Then begin implementation

Start with **US-001 — Browse supported topics** in `BACKLOG.md`.

For each story:

```text
read requirement + acceptance criteria
→ inspect existing architecture/data
→ implement only that story
→ add/update automated tests
→ run relevant quality checks
→ manually verify the story
→ summarize changes and risks
→ stop for review/commit
```

Do not jump ahead to later stories merely because related code is convenient to add.

## Non-negotiable rules

Read `AGENTS.md` before modifying code.

Especially:

- no backend/database/authentication;
- no AI/LLM/image recognition;
- no fuzzy algorithm may automatically choose a disposal rule;
- no unsupported disposal advice;
- no unproven illegal-dumping claims;
- no GPS/nearest-facility feature;
- no analytics/tracking;
- no scope additions without an explicit product decision;
- policy/data must stay in structured data, not duplicated in presentation code;
- source provenance must remain visible and testable;
- accessibility defects in the core flow are release defects.

## Source-of-truth hierarchy

When documents appear to differ:

1. `docs/product/PRD.md` — product requirements.
2. `docs/product/PRODUCT_SCOPE.md` — frozen scope.
3. `docs/data/DATA_DICTIONARY.md` + structured JSON — data contract.
4. `docs/technical/ARCHITECTURE.md` and ADRs — implementation constraints.
5. `BACKLOG.md` — implementation sequence.

If a source-backed correctness problem is discovered, stop and document it instead of silently changing civic guidance.
