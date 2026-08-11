# DATA_VALIDATION_REPORT.md

# Oʻahu Household-Item Disposal Finder — Phase 3 Validation

**Validation date:** 2026-08-09 HST

## Structural checks

- Canonical topics: **25 / 25**
- Facility records: **12**
- Clarification groups: **5**
- Registered sources: **16**
- Duplicate direct aliases: **0**
- Integrity errors: **0**

## Integrity result

**PASS**

No unresolved structural integrity errors were found.

Checks performed:

- unique item IDs;
- unique source IDs;
- unique facility IDs;
- unique direct aliases;
- valid item → source references;
- valid item → facility references;
- valid clarification → item references;
- exactly 25 frozen V1 canonical topics;
- non-empty next action for each item.

## Five acceptance-scenario traces

| Scenario | Data-only resolution | Status |
|---|---|---|
| Swollen laptop lithium-ion battery | CLAR-LAPTOP-BATTERY → resident states whether removed/standalone (IT-008) or built-in/non-removable (IT-007). No guessed branch. | PASS — requires one source-backed clarification |
| Old propane tank | IT-020 → no trash → convenience centers or Kapaʻa/Kawailoa, subject to listed household sizes; Keʻehi excluded. | PASS |
| Leftover latex paint | IT-018 → absorb or air-dry → contained regular refuse. | PASS |
| Mattress | IT-012 → bulky-item appointment or City disposal site. | PASS |
| Concrete pieces | IT-023 → Kapaʻa up to five 5-gallon buckets/day or WGSL up to two standard pickup loads/day. | PASS |

## Important validation finding

The swollen-laptop-battery scenario should **not** resolve from the phrase alone.

The authoritative City distinction is whether the lithium/rechargeable battery is:

- standalone/removed; or
- embedded/non-removable.

The V1 data therefore requires that clarification before selecting a pathway.

This is a successful validation result because it prevents the product from guessing policy.

## Source reconciliation reviewed

- Concrete: specific resident rule refines the general WGSL guidance.
- E-waste: City-bin eligibility separated from broader household e-waste options.
- Cell phones: excluded from City e-waste-bin eligibility.
- Oxygen tanks: prohibited at City resident disposal sites and routed to City-referenced recyclers.
- Motor oil: ordinary motor oil uses absorb-and-trash; mixed oil/gas is explicitly a different HHW pathway.
- Christmas trees: whole-tree drop-off uses the specific seasonal facility set rather than generic green-waste assumptions.

## Phase 3 exit assessment

Phase 3 exit conditions are satisfied:

- 25/25 frozen topics have authoritative provenance;
- required core data fields are populated;
- facilities are normalized;
- ambiguous search terms are represented as deterministic clarification groups;
- five acceptance scenarios resolve without guessed policy;
- limitations and source inconsistencies are documented;
- no unresolved source conflict currently makes a frozen V1 topic unusable.

**Phase 3 — Data Foundation: PASS / COMPLETE**

Next phase: **Phase 4 — Technical Design**.
