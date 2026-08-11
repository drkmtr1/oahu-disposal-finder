# PHASE5_DEVELOPMENT_FOUNDATION.md

## Phase 5 status

**Prepared / handoff-ready, with one environment-dependent bootstrap step remaining.**

Created:
- backlog;
- test strategy;
- definition of done;
- React/TypeScript/Vite shell;
- structured data copied into application source;
- Ajv validation script;
- Vitest/Testing Library harness;
- Playwright e2e and axe harness;
- ESLint/TypeScript/Prettier configuration;
- GitHub Actions CI and Pages deployment workflows;
- `AGENTS.md` and `CODEX_START_HERE.md`.

## Required first local step

The artifact-generation environment could not access the public npm registry. Therefore it would be incorrect to fabricate a `package-lock.json` or claim dependency-backed test execution.

Codex must first:

```bash
npm install
npx playwright install --with-deps chromium webkit
npm run foundation:check
```

Then commit the generated `package-lock.json`.

Once that baseline is green, **DF-001 is complete** and Codex should start **US-001**.

## What has already been validated independently

- Phase 3 JSON parses successfully;
- JSON Schema parses successfully;
- the Phase 3 dataset previously passed structural/cross-reference validation;
- the repository contains the expected 25-item source dataset;
- all project documents from Phases 1–4 are included.

## What has deliberately not been implemented

No product user story has been completed in this foundation package. The UI shell only confirms that the development foundation exists.
