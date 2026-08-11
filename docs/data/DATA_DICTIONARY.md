# DATA_DICTIONARY.md

# Oʻahu Household-Item Disposal Finder — Data Dictionary

**Dataset:** `data/v1_disposal_data.json`  
**Schema:** `data/v1_disposal_data.schema.json`

## Design objective

Represent public disposal guidance as reviewable structured data rather than embedding policy in UI components.

The model separates:

```text
source
facility
item rule
clarification rule
fallback
```

so that a later implementation can resolve:

```text
user term
→ canonical topic / clarification
→ disposal pathway
→ restriction/preparation
→ eligible facility records
→ authoritative provenance
```

## Top-level objects

### `metadata`
Dataset identity, version, scope, verification date, and disclaimer.

Important fields:

- `schema_version` — structural contract version.
- `dataset_version` — content snapshot version.
- `verified_on` — manual source-review date, not the City's publication/update date.
- `coverage` — frozen topic/facility/clarification counts.

### `sources[]`
Authoritative public references.

Fields:

- `id` — stable local identifier such as `SRC-006`.
- `title`
- `organization`
- `url`
- `role` — why V1 relies on the source.
- `verified_on`
- `dynamic` — optional flag indicating operational content can change quickly.

### `facilities[]`
Normalized physical City/City-contracted locations used by item records.

Fields:

- `id`
- `name`
- `kind`
- `resident_only`
- `address`
- `phone`
- `hours`
- `restrictions[]`
- `source_ids[]`

Facility information is not duplicated inside each item. Items reference `facility_ids`.

### `items[]`
The 25 frozen canonical disposal topics.

Fields:

- `id` — PRD-aligned topic ID (`IT-001`…`IT-025`).
- `name`
- `category`
- `aliases[]` — **unambiguous direct-match terms only**.
- `primary_pathway.type`
- `primary_pathway.next_action`
- `primary_pathway.facility_ids[]`
- `preparation[]`
- `restrictions[]`
- `prohibitions[]`
- `alternatives[]`
- `source_ids[]`
- `verified_on`
- `notes[]`

## Alias rule

An alias may map directly to only one canonical item.

Ambiguous terms are **not** stored as direct aliases.

Examples:

```text
"propane tank" → IT-020
"latex paint"  → IT-018

"battery"      → clarification group
"paint"        → clarification group
"electronics"  → clarification group
```

This prevents probabilistic or accidental routing.

## `clarification_groups[]`

A clarification group handles a supported broad term that can lead to materially different official rules.

Fields:

- `id`
- `triggers[]`
- `prompt`
- `options[]`

Each option contains either:

- `item_id` — deterministic route to a frozen topic; or
- `fallback` — authoritative escape hatch when V1 should not guess.

## `fallbacks`

Named safe outcomes used when the frozen corpus does not support a definitive answer.

A fallback:

- says V1 does not cover/resolve the item;
- does not invent policy;
- points to an appropriate official ENV source.

## Pathway types

Current V1 pathway values include:

- `regular_refuse`
- `absorb_regular_refuse`
- `absorb_dry_regular_refuse`
- `bulky_or_city_dropoff`
- `city_dropoff`
- `city_ewaste_recycling`
- `hhw_appointment`
- `retailer_or_city_dropoff`
- `provider_or_ewaste_recycler`
- `external_recycler_contact`
- `medication_takeback`
- `requires_material_identification`
- `special_city_dropoff`
- `green_waste_or_dropoff`

These are domain labels, not UI text.

## `alternatives[]`

Optional source-backed alternatives such as:

- donation/reuse;
- retailer/manufacturer take-back;
- private recycler;
- external event.

They must never override a prohibition or be presented as mandatory unless the authoritative source says so.

## Facility eligibility rule

If `primary_pathway.facility_ids` is non-empty, those are the only locations V1 may present as eligible for that specific pathway without additional source verification.

Examples:

- standalone lithium battery → all listed convenience centers + transfer stations;
- propane → convenience centers + Kapaʻa + Kawailoa, not Keʻehi;
- concrete → Kapaʻa + WGSL;
- oxygen tank → no City facility IDs.

## Verification semantics

`verified_on` means:

> A project maintainer manually reviewed the cited City source on this date.

It does **not** mean:

> ENV last changed the rule on this date.

The UI must preserve that distinction.

## Required downstream validation

Before production release:

1. every item ID is unique;
2. every alias is unique among direct aliases;
3. every referenced source ID exists;
4. every referenced facility ID exists;
5. each item has at least one source;
6. each item has a non-empty next action;
7. exactly 25 canonical items remain in the frozen V1 corpus unless the product scope is explicitly revised.
