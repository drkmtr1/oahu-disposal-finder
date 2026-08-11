# SECURITY_PRIVACY.md

# Oʻahu Household-Item Disposal Finder — Security and Privacy Design

**Version:** V1.0  
**Decision date:** 2026-08-09 HST

---

# 1. Security Posture

V1 is intentionally low-state and low-trust-surface.

It has:

- no account system;
- no login;
- no passwords;
- no payments;
- no resident profile;
- no backend;
- no database;
- no API keys;
- no geolocation permission;
- no uploads;
- no user-generated HTML;
- no analytics/tracking requirement.

This materially reduces the attack surface compared with a stateful web application.

It does not remove the need for secure development practices.

---

# 2. Data Classification

## Public application data

The disposal dataset contains public civic information:

- item names;
- disposal instructions;
- facility information;
- public source URLs;
- verification dates.

Classification:

**Public / non-sensitive.**

## User input

The search box receives a household-item phrase.

Examples:

```text
propane tank
mattress
lithium battery
```

V1 does not require that search text be sent to a server.

The search should execute entirely in the browser.

---

# 3. Privacy Requirements

V1 will not:

- request name;
- request email;
- request phone number;
- request precise location;
- store search history in a user account;
- use third-party behavioral analytics;
- use advertising trackers;
- fingerprint users;
- sell/share resident data.

If browser/local storage is later proposed, it requires an explicit scope/privacy decision.

Default V1 state is memory-only and cleared naturally when the page/session is closed or refreshed.

---

# 4. Secrets

There should be **no production application secrets**.

Vite environment variables are not a secret store for browser-delivered values.

Therefore:

- no API key belongs in `VITE_*`;
- no token is needed for application runtime;
- GitHub deployment credentials are handled by GitHub Actions/Pages permissions, not embedded in the app.

---

# 5. Input Handling

Search text is treated only as text.

Rules:

1. normalize text;
2. compare against known local strings;
3. never evaluate it as code;
4. never inject it as HTML;
5. never build a URL directly from arbitrary user text.

React's normal escaped text rendering should be preserved.

Do not use `dangerouslySetInnerHTML` for dataset/user content.

---

# 6. URL Handling

Authoritative and external-option URLs originate from the validated dataset.

Build validation should reject:

- unsupported URL protocols;
- malformed source URLs.

Allowed external link protocols for V1:

```text
https:
```

If another protocol becomes necessary, it requires review.

---

# 7. External Links

External-source links must:

- visibly identify their destination/purpose;
- not execute arbitrary script;
- avoid unexpected behavior.

Default preference:

**open in the same tab**.

This avoids hidden new-window behavior and does not require target-window security handling.

If a future design intentionally uses `target="_blank"`, pair it with appropriate `rel` protection and accessible indication.

---

# 8. Dependency / Supply-Chain Controls

Required:

- commit `package-lock.json`;
- use `npm ci` in CI;
- review dependency changes in pull requests;
- keep runtime dependencies minimal;
- remove unused dependencies;
- use supported toolchain releases;
- enable repository dependency alerts/Dependabot when practical.

Dependency update does not automatically mean product behavior changed; the full quality suite must run.

---

# 9. Build Integrity

The deployed site must come from the tested repository commit.

Deployment order:

```text
clean dependency install
→ data validation
→ lint
→ typecheck
→ tests
→ production build
→ deploy generated artifact
```

Do not manually upload locally built files as the normal release process.

---

# 10. GitHub Actions Permissions

Workflows should use least privilege.

Normal CI:

```text
contents: read
```

Pages deployment should receive only the permissions required for Pages publication, such as the documented Pages/id-token permissions.

Avoid broad write permissions.

---

# 11. Content Integrity

The principal safety/security risk in this product is not account compromise; it is **incorrect civic guidance**.

Controls:

- authoritative provenance on every item;
- build-time schema/integrity validation;
- deterministic search;
- no fuzzy policy inference;
- explicit no-match;
- source-verification date;
- facility IDs instead of textual guesses;
- critical acceptance tests;
- source-review workflow before release.

In this domain, data integrity is a security-adjacent quality requirement.

---

# 12. XSS / Injection Risk

Risk is low because V1 has no server and no user-generated content persistence.

Still prohibited:

- `eval`;
- `new Function`;
- rendering raw HTML from JSON;
- interpreting search input as markup;
- arbitrary dynamic script loading.

Dataset text should be rendered through ordinary React text nodes.

---

# 13. Network Behavior

Core disposal lookup should require no application API request.

Expected external network behavior after page load:

- resident may choose an official ENV/external source link.

No third-party CDN, external font, analytics script, or remote UI library is required.

---

# 14. Availability

GitHub Pages availability is outside the application itself.

Because the dataset is bundled into the static build, a resident who successfully loads the app does not depend on an ENV API for the core lookup.

The app must not claim live facility operational status.

---

# 15. Security Headers / Hosting Constraints

Static-host security controls available through the chosen hosting platform should be reviewed during deployment.

Do not add fragile browser policies merely to “check a security box” if they break the Vite development/build flow.

The highest-value V1 controls are:

- no secrets;
- no backend;
- no untrusted HTML;
- deterministic local data;
- HTTPS hosting;
- dependency locking;
- CI quality gates.

---

# 16. Threat Summary

| Threat | V1 exposure | Control |
|---|---|---|
| Credential theft | None | no accounts/credentials |
| PII leak | Very low | no PII collection |
| API key leakage | None expected | no runtime secret/API |
| SQL injection | None | no database |
| Server RCE | None in app runtime | no application server |
| XSS | Low | escaped React rendering; no raw HTML |
| Malicious search input | Low | text-only local matching |
| Wrong disposal advice | Material | source provenance + deterministic rules + tests |
| Stale civic data | Material | verification dates + source links + maintenance process |
| Dependency compromise | Low but real | lockfile, minimal dependencies, CI/review |

---

# 17. Privacy Statement Content for V1 UI/README

The product can accurately state:

> This independent pilot does not require an account or precise location. Item searches are designed to run in your browser. Version 1.0 does not use advertising or behavioral analytics.

Only ship that statement if implementation remains consistent with it.
