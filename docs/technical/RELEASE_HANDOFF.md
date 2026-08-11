# V1 release handoff

## Deployment

The repository deploys with `.github/workflows/deploy-pages.yml`.

1. Enable GitHub Pages for `drkmtr1/oahu-disposal-finder` with **GitHub Actions** as the build source.
2. Merge the validated release branch sequence into `main`.
3. The `Deploy GitHub Pages` workflow runs the complete quality suite, uploads `dist`, and deploys it to Pages.
4. Confirm the workflow's `github-pages` environment URL, expected to be `https://drkmtr1.github.io/oahu-disposal-finder/`.

No runtime secrets are required.

## Production smoke check

After a successful Pages deployment, verify the public HTTPS URL:

- page responds successfully over HTTPS;
- title and `Oʻahu Household-Item Disposal Finder` heading render;
- browse list contains 25 native topic buttons;
- `propane tank` shows the no-trash prohibition and no Keʻehi facility card;
- `battery` shows the clarification question, and a keyboard choice reaches a result;
- an unsupported term shows the safe V1-coverage message and ENV How to Dispose link;
- no required horizontal scrolling at a 320 CSS-pixel viewport;
- no browser-console errors during the smoke flow.

## Release evidence

- `npm run foundation:check` validates data, lint, TypeScript, unit tests, build, Chromium/WebKit end-to-end tests, and axe accessibility scans.
- The five V1 acceptance scenarios are covered by `tests/e2e/acceptance-scenarios.spec.ts`.
- Accessibility evidence and the remaining human visual/screen-reader sign-off boundary are recorded in `docs/technical/ACCESSIBILITY_REVIEW.md`.
- Source provenance, manual verification semantics, and known limitations are documented in `docs/data/DATA_SOURCE_REGISTER.md` and `docs/data/DATA_LIMITATIONS.md`.

## V1 boundary

This is a static Oʻahu household/residential disposal finder for 25 frozen topics. It intentionally excludes accounts, backend services, payments, analytics, fuzzy routing, image recognition, live facility status, GPS/nearest-location functions, commercial disposal guidance, and automated source monitoring.
