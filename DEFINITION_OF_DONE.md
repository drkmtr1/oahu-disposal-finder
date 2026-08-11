# DEFINITION_OF_DONE.md

# Definition of Done

## Story-level Done

A user story is `DONE` only when:

- scope matches the backlog story and linked PRD requirement;
- implementation uses existing architecture/data boundaries;
- no unrelated feature was added;
- relevant automated tests exist and pass;
- `npm run validate:data` still passes if data is touched;
- lint and typecheck pass;
- relevant Playwright tests pass when the story affects user flow;
- keyboard/manual behavior was checked for interactive changes;
- civic information remains source-backed;
- no new unsupported inference is introduced;
- documentation/backlog status is updated when appropriate;
- changes are reviewable as a coherent commit.

## Data-change Done

A civic-data change additionally requires:

- authoritative source identified;
- source ID preserved/added;
- `verified_on` intentionally updated if manual verification occurred;
- source conflict documented if present;
- affected scenario/mapping tests updated;
- no UI-only duplicate of the policy introduced.

## V1 Release Done

Version 1.0 is complete only when:

- PR-001 through PR-025 are satisfied;
- 25/25 canonical topics are present and manually re-verified;
- 100% frozen provenance is present;
- item/facility mappings match reviewed sources;
- five acceptance scenarios pass;
- automated suite passes;
- lint/typecheck/build pass;
- core flow passes WCAG 2.2 AA-targeted automated and manual review with no release-blocking defect;
- mobile and desktop core flow are manually verified;
- public HTTPS deployment is live;
- production smoke test passes;
- README and known limitations are current;
- no unresolved Must-Have requirement remains.

Then explicitly declare:

> Oʻahu Household-Item Disposal Finder Version 1.0 complete.

Do not add another feature before that declaration.
