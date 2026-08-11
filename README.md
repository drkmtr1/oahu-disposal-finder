# Oʻahu Household-Item Disposal Finder

Independent Hawaiʻi civic-tech pilot that helps Oʻahu residents determine the authoritative disposal pathway for a curated set of non-routine household items.

## Project status

- Phase 1 — Discovery: complete
- Phase 2 — Product Definition: complete; V1 scope frozen
- Phase 3 — Data Foundation: complete
- Phase 4 — Technical Design: complete
- Phase 5 — Development Foundation: complete
- Product-story implementation: complete
- Production deployment: live on GitHub Pages; human visual/screen-reader release sign-off remains pending

## V1 boundary

V1 is a static React + TypeScript application using a manually verified, read-only Honolulu ENV dataset. It does not use a backend, database, accounts, AI, GPS, analytics, or live City API.

The frozen V1 corpus contains 25 canonical disposal topics. See `docs/product/PRODUCT_SCOPE.md` and `docs/product/PRD.md`.

## What it does

Residents can browse the 25 supported topics or use an exact supported topic/alias. The app then presents the data-backed disposal action, prohibitions, preparation, restrictions, eligible City locations, and source provenance. Broad terms use explicit clarification choices; unsupported terms never receive guessed disposal advice.

## Architecture

- Static React + TypeScript + Vite application.
- Read-only, versioned local JSON dataset validated by JSON Schema and Ajv.
- Deterministic routing only: normalization → exact canonical name → exact alias → exact clarification trigger → no-match.
- No backend, database, accounts, analytics, runtime secrets, GPS, fuzzy routing, or live City API.
- GitHub Actions validates every pull request and deploys `main` to GitHub Pages.

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

### Verification process

The dataset is a manually reviewed snapshot, not a City API mirror. Before changing civic data, identify the authoritative ENV source, preserve or add the relevant source ID, update `verified_on` only after manual checking, and document any unresolved source conflict rather than resolving it by inference. See [the source register](docs/data/DATA_SOURCE_REGISTER.md) and [data limitations](docs/data/DATA_LIMITATIONS.md).

## Accessibility

The core flow targets WCAG 2.2 AA with native semantic controls, visible focus, keyboard operation, responsive reflow, Playwright + axe coverage, and a documented release review. See [the accessibility design](docs/technical/ACCESSIBILITY.md) and [review record](docs/technical/ACCESSIBILITY_REVIEW.md).

## Known limitations

- This is a frozen, manually verified V1 snapshot; City guidance, hours, and third-party options may change.
- It covers 25 household/residential topics only. A no-match does not mean the City has no rule.
- It does not provide real-time facility status, nearest-location ranking, commercial guidance, or automated source monitoring.
- Residents must confirm unusual loads, dynamic HHW details, and current facility instructions with ENV or site staff.

See the complete [data limitations](docs/data/DATA_LIMITATIONS.md).

## Deployment and release handoff

GitHub Actions deploys `main` through the Pages workflow after the full quality suite passes. The public URL is:

`https://drkmtr1.github.io/oahu-disposal-finder/`

The release process and production smoke checks are documented in [the release handoff](docs/technical/RELEASE_HANDOFF.md).
