# DATA_LIMITATIONS.md

# Oʻahu Household-Item Disposal Finder — Data Limitations

## 1. Snapshot, not live government data

The V1 dataset is manually derived from public ENV pages and was verified on **2026-08-09 HST**.

It is not synchronized with a City API.

A City rule, facility hour, phone number, restriction, or third-party option may change after verification.

## 2. Operational status can change faster than the dataset

ENV warns that heavy use or mechanical breakdowns can cause temporary, unscheduled facility closures.

V1 therefore must not claim real-time open/closed status.

Display published hours and provide the official source.

## 3. HHW schedules are dynamic

HHW:

- is appointment-based for applicable materials;
- has capacity limits;
- accepts only registered items;
- uses event dates/deadlines that change.

The structured dataset stores the durable process and official contact/source, not a permanent hard-coded “next event” date.

## 4. ENV source-count inconsistency

The current Waste Drop-Off Locations page says the City provides “nine public refuse drop-off locations: six convenience centers and three transfer stations,” but the same page currently lists **seven** named convenience centers plus three transfer stations. The City's e-waste-bin page also enumerates those seven convenience centers and three transfer stations.

V1 does not infer which introductory count is intended.

**Dataset decision:** enumerate the currently named facilities individually and avoid presenting the inconsistent aggregate count as a fact.

## 5. Facility-specific operation overrides general assumptions

Facilities do not accept identical material sets.

Examples:

- Keʻehi excludes large metal appliances, tires, and compressed gas/fire extinguishers.
- Kapaʻa accepts small quantities of non-combustible material under the resident rules.
- WGSL's resident accepted-waste list is narrow.
- Wahiawā Convenience Center does not accept green waste.

The UI must use item-specific facility IDs, not “all disposal sites” as a blanket assumption.

## 6. Concrete source specificity

The general How to Dispose page says rock/dirt/concrete should go to WGSL.

The resident-rules page is more specific and additionally permits small quantities at Kapaʻa.

V1 treats the specific resident rule as a refinement, not as evidence that the general page is wrong.

## 7. Electronics have overlapping pathways

ENV permits household e-waste to have several disposal/reuse/recycling options, while the City e-waste-bin page has a specific accepted/unaccepted list.

Examples:

- computers/laptops and TVs/monitors are accepted in City e-waste bins;
- mobile phones are explicitly listed as unacceptable in those bins;
- embedded-battery devices have separate recycler/HHW guidance.

V1 therefore does not collapse “electronics” into one disposal record.

## 8. Damaged/swollen battery condition is not independently classified by V1

The existing test scenario mentions a swollen laptop lithium-ion battery.

ENV's current battery rules distinguish primarily by whether the battery is standalone/removed or embedded/non-removable.

V1 does not invent an additional damaged-battery policy.

It asks the user which physical condition applies:

- standalone/removed → standalone lithium/rechargeable rule;
- embedded/non-removable → embedded-battery pathway;
- cannot determine → official battery source/contact fallback.

## 9. Broad hazardous-chemical topic cannot safely choose every chemical's method

ENV's HHW guidance shows that different household chemicals can be:

- drained with water;
- put in trash;
- absorbed and trashed;
- scheduled for HHW.

Therefore the generic `Household hazardous chemical` record is a material-identification gateway, not a claim that every chemical requires an HHW appointment.

## 10. Third-party options are City-referenced, not guaranteed by V1

ENV lists external organizations for:

- e-waste;
- oxygen tanks;
- medication take-back;
- retailer programs;
- reuse.

Acceptance, fees, operating hours, or program availability can change.

V1 should describe them as **City-referenced external options** and encourage confirmation with the provider.

## 11. Residential scope

The dataset is for household/residential waste.

It must not be used as commercial, industrial, agricultural, medical-facility, or government waste guidance.

## 12. Corpus limitation

V1 contains 25 canonical topics.

A no-match does not mean the City lacks a disposal rule. It means this independent V1 dataset does not cover that item.

## 13. Facility staff and current instructions remain controlling

ENV directs residents to follow site-attendant instructions and notes that facilities can operate differently.

V1 cannot guarantee acceptance for an unusual load merely because the static category generally matches.

## 14. User-provided item classification can be incomplete

A word such as:

- battery;
- paint;
- appliance;
- electronics;

is not enough to determine the correct pathway.

V1 uses deterministic clarification instead of fuzzy guessing.

## Release implication

These limitations do **not** block V1.

They define required behaviors:

- show provenance;
- show last-verified date;
- never claim real-time status;
- clarify ambiguous inputs;
- preserve facility restrictions;
- provide official-source fallback;
- never fabricate a disposal rule.
