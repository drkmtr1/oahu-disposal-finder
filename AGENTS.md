# AGENTS.md

Instructions for coding agents working in this repository.

## Product objective

Finish a credible, small Version 1.0 of the Oʻahu Household-Item Disposal Finder. Completion and correctness are more important than feature breadth.

## Scope control

The V1 job is:

> A resident searches for or selects a supported household item and receives the authoritative Oʻahu disposal method and, when applicable, eligible City disposal locations, restrictions, preparation requirements, source provenance, and a clear next action.

V1 contains 25 frozen canonical topics.

### Do not add to V1

- generative AI or chatbot;
- image recognition;
- accounts/authentication;
- social features;
- illegal-dumping reporting;
- notifications;
- statewide expansion;
- analytics dashboards/tracking;
- machine learning;
- payments;
- crowdsourcing;
- CMS/admin system;
- GPS/geocoding/nearest-facility ranking;
- live facility status;
- automated scraping/source-change monitoring;
- business/commercial disposal guidance;
- fuzzy/semantic answer routing.

If something is useful but not required by the frozen V1, add it to the backlog rather than implementing it.

## Civic-information correctness

1. Never invent disposal guidance.
2. Never infer an unsupported facility.
3. Use item `facility_ids` for eligibility; do not derive eligibility from text matching.
4. Preserve `source_ids` and `verified_on` semantics.
5. `verified_on` means the project manually checked the source on that date, not that the City updated it then.
6. When a query is unsupported or ambiguous beyond the dataset, return the defined no-match/fallback path.
7. If authoritative sources appear to conflict, do not resolve the conflict by intuition. Document it for product/data review.

## Search rule

Final answer routing is deterministic:

```text
normalize
→ exact canonical topic name
→ exact direct alias
→ exact clarification trigger
→ no-match
```

Type-ahead suggestions may eventually help discovery but may not silently select a policy result.

## Architecture

- static React + TypeScript + Vite;
- no application backend;
- no database;
- read-only local JSON dataset;
- JSON Schema + Ajv validation;
- plain repository-owned CSS;
- GitHub Actions + GitHub Pages;
- no runtime secrets.

## Accessibility

Target WCAG 2.2 AA for the core flow.

Prefer native semantics. All core functionality must work with keyboard. Keep visible focus. Do not rely on color alone. Maintain usable reflow/zoom. Automated axe checks supplement manual review.

## Testing expectation

Every story must add tests proportional to its risk.

Priority test targets:

- deterministic routing;
- no-match behavior;
- clarification paths;
- facility eligibility;
- prohibitions/restrictions;
- provenance;
- the five acceptance scenarios;
- keyboard-accessible interactions;
- automated accessibility scans.

## Change discipline

Before changing civic data, identify the authoritative source and explain the change in the commit/PR summary.

Do not combine unrelated refactors with a scoped user story.

Keep implementation understandable to a developer reviewing this project as a portfolio example.
