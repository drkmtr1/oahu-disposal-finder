# Oʻahu Household-Item Disposal Finder

Independent Hawaiʻi civic-tech pilot that helps Oʻahu residents determine the authoritative disposal pathway for a curated set of non-routine household items.

## Project status

- Phase 1 — Discovery: complete
- Phase 2 — Product Definition: complete; V1 scope frozen
- Phase 3 — Data Foundation: complete
- Phase 4 — Technical Design: complete
- Phase 5 — Development Foundation: prepared in this repository
- Product-story implementation: not started

## V1 boundary

V1 is a static React + TypeScript application using a manually verified, read-only Honolulu ENV dataset. It does not use a backend, database, accounts, AI, GPS, analytics, or live City API.

The frozen V1 corpus contains 25 canonical disposal topics. See `docs/product/PRODUCT_SCOPE.md` and `docs/product/PRD.md`.

## First-time setup

Target runtime: Node.js 24.19.x LTS.

```bash
node --version
npm install
npx playwright install chromium webkit
npm run foundation:check
npm run dev
```

`npm install` must create and commit `package-lock.json` before CI is used. The handoff package intentionally does not contain a fabricated lockfile because the environment that generated this repository could not reach the public npm registry.

## Quality commands

```bash
npm run validate:data
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run test:a11y
npm run foundation:check
```

## Important documents

Start here:

1. `CODEX_START_HERE.md`
2. `AGENTS.md`
3. `BACKLOG.md`
4. `TEST_STRATEGY.md`
5. `DEFINITION_OF_DONE.md`
6. `docs/product/PRD.md`
7. `docs/data/DATA_DICTIONARY.md`
8. `docs/technical/ARCHITECTURE.md`

## Data provenance

Application records are derived from public City & County of Honolulu Department of Environmental Services guidance. Every canonical item record includes source IDs and a manual verification date.

This project is not an official City service and must not imply City endorsement.
