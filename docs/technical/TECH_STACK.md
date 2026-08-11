# TECH_STACK.md

# Oʻahu Household-Item Disposal Finder — V1 Technical Stack

**Decision date:** 2026-08-09 HST  
**Principle:** choose the smallest conventional stack that can satisfy the frozen requirements and produce a credible, maintainable portfolio project.

---

# 1. Runtime / Development Platform

## Node.js 24 LTS

**Decision:** Use Node.js 24 LTS for local tooling and CI.

Recommended repository configuration:

```text
.nvmrc → 24
package.json engines → >=24 <25
CI → node-version: 24
```

### Why

Node 24 is an LTS release at the time of this design and provides a stable development baseline.

Node is a **build/test tool** here; the production site itself is static browser assets.

---

# 2. Package Manager

## npm

**Decision:** use npm and commit `package-lock.json`.

CI uses:

```bash
npm ci
```

### Why

- ships naturally with the Node toolchain;
- a committed lockfile makes dependency resolution reproducible;
- `npm ci` is intended for clean automated installs and fails if the lockfile and package manifest disagree.

Do not add a second package manager.

---

# 3. Language

## TypeScript — strict mode

**Decision:** application and domain logic use TypeScript.

Required compiler posture:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Additional strictness can be enabled when it improves correctness without disproportionate friction.

### Why

The domain has many structured relationships:

- item IDs;
- source IDs;
- facility IDs;
- discriminated search results;
- clarification choices;
- optional restrictions.

Static type checking reduces accidental invalid state in implementation code.

---

# 4. UI Library

## React

**Decision:** React for the component UI.

### Why

The application has a small but genuine interactive state machine:

- search;
- browse;
- clarification;
- result;
- no-match;
- data-error.

React gives a conventional component model that is easy to test and review without requiring a full-stack framework.

### Do not add

- Next.js;
- Remix;
- server components;
- Redux;
- Zustand;
- MobX.

V1 state is small enough for React component state and small pure-domain functions.

---

# 5. Build Tool

## Vite

**Decision:** Vite builds and serves the React/TypeScript application.

Primary commands will be conceptually:

```bash
npm run dev
npm run build
npm run preview
```

### Why

Vite directly supports static production builds suitable for static hosting.

No SSR capability is needed.

---

# 6. Data Validation

## JSON Schema + Ajv

**Decision:** preserve the Phase 3 JSON Schema as the structural contract and validate it with Ajv.

Files:

```text
src/data/v1_disposal_data.json
src/data/v1_disposal_data.schema.json
scripts/validate-data.ts
```

### Why

Phase 3 already produced an explicit JSON Schema.

Using Ajv lets the project validate that existing contract rather than replacing it with a second schema format.

### Custom integrity validation

JSON Schema is insufficient for referential rules such as:

```text
facility_id must exist in facilities[]
source_id must exist in sources[]
alias must map uniquely
exactly 25 frozen topics
```

Those checks belong in `validate-data.ts`.

---

# 7. Unit Test Runner

## Vitest

**Decision:** Vitest for pure-domain and component-adjacent tests.

Primary targets:

- search normalization;
- canonical matching;
- alias matching;
- clarification triggers;
- no-match behavior;
- facility resolution;
- data-integrity helpers.

### Why

Vitest integrates naturally with Vite and supports standard test/expect workflows.

---

# 8. Component Testing

## React Testing Library

**Decision:** use React Testing Library with user-event for component behavior.

Primary targets:

- labeled search form;
- browse selection;
- clarification choices;
- result content hierarchy;
- warnings;
- no-match state;
- source/provenance presentation;
- keyboard-reachable controls.

### Test principle

Query elements the way a resident or assistive technology finds them:

- role;
- accessible name;
- label;
- visible text.

Avoid making `data-testid` the default interaction model.

---

# 9. End-to-End Testing

## Playwright

**Decision:** Playwright for browser-level release scenarios.

Minimum e2e scenarios:

1. swollen laptop lithium-ion battery;
2. propane tank;
3. latex paint;
4. mattress;
5. concrete pieces;
6. generic battery clarification;
7. unsupported-item no-match;
8. browse-to-result path.

### Browser scope

Release automation should cover at least:

- Chromium;
- WebKit.

Firefox may be added if CI remains simple and reliable.

Mobile viewport/device emulation should cover the core flow.

---

# 10. Automated Accessibility Testing

## `@axe-core/playwright` with Playwright

**Decision:** run automated accessibility scans on core states.

Scan:

- initial/search view;
- browse view;
- clarification;
- standard result;
- facility-heavy result;
- no-match state.

### Boundary

Automated checks are a guardrail, not proof of WCAG conformance.

Manual keyboard, zoom/reflow, focus, and content review remain required.

---

# 11. Linting

## ESLint

**Decision:** ESLint is a release quality gate.

Configure for:

- TypeScript;
- React hooks;
- React refresh/Vite conventions where relevant.

Lint errors block release.

Avoid a large opinionated rule stack that primarily creates style churn.

---

# 12. Formatting

## Prettier

**Decision:** use Prettier for mechanical formatting.

Formatting is separate from domain correctness.

Recommended command:

```bash
npm run format:check
```

Whether `format:check` blocks CI can be decided during Development Foundation; lint/type/test/data validation remain the core gates.

---

# 13. CSS

## Repository-owned plain CSS

**Decision:** no CSS/UI framework in V1.

Use:

- CSS custom properties;
- Flexbox/Grid;
- media queries;
- system fonts.

Do not add:

- Tailwind;
- Bootstrap;
- Material UI;
- Chakra;
- component-kit dependencies;

unless a frozen requirement later proves impossible or disproportionately expensive without one.

---

# 14. Deployment

## GitHub Pages + GitHub Actions

**Decision:** deploy the production static build to GitHub Pages using GitHub Actions.

### Why

The project is:

- static;
- public;
- source-controlled in GitHub;
- portfolio-oriented;
- free of runtime secrets/backends.

GitHub Pages directly supports publishing static build output through Actions.

### Production requirement

The deployment workflow runs only after required quality checks pass.

A custom domain is optional and post-V1 unless already available at zero scope cost.

---

# 15. CI

## GitHub Actions

Quality workflow:

```text
npm ci
npm run validate:data
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Actual script names may be adjusted, but these gates must remain represented.

---

# 16. Dependency Policy

## Rules

1. Prefer platform/browser APIs over dependencies for trivial behavior.
2. Every runtime dependency must solve a frozen requirement.
3. Commit `package-lock.json`.
4. Use clean CI installs.
5. Review dependency updates rather than blindly auto-merging them.
6. Keep production runtime dependencies very small.
7. No dependency may introduce an external runtime service without an architecture review.

---

# 17. Explicit Rejections for V1

| Technology | Decision | Reason |
|---|---|---|
| Next.js | No | no SSR/backend requirement |
| Database | No | dataset is small, versioned, read-only |
| Express/Fastify | No | no server requirement |
| Supabase/Firebase | No | no account/database requirement |
| Elasticsearch/Algolia | No | 25 deterministic topics |
| Fuse.js/fuzzy routing | No for answer routing | can incorrectly infer policy |
| Tailwind/UI kit | No | unnecessary dependency/design abstraction |
| Redux/global state library | No | state is small/local |
| Map SDK | No | nearest-location/map is outside V1 |
| Docker | No requirement | static app does not need containerized runtime |
| AI SDK | No | generative AI explicitly out of scope |

---

# 18. Technical References

Official documentation used when freezing this stack:

- Node.js Releases: https://nodejs.org/en/about/previous-releases
- React: https://react.dev/
- Vite static deployment: https://vite.dev/guide/static-deploy
- Vite production build: https://vite.dev/guide/build
- TypeScript TSConfig: https://www.typescriptlang.org/tsconfig/
- Ajv: https://ajv.js.org/guide/getting-started.html
- Vitest: https://vitest.dev/guide/
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- Playwright: https://playwright.dev/
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing
- ESLint: https://eslint.org/docs/latest/use/getting-started
- npm ci: https://docs.npmjs.com/cli/v10/commands/npm-ci/
- GitHub Pages publishing source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
