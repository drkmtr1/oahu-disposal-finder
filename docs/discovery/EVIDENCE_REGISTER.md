# EVIDENCE_REGISTER.md

## Purpose
Maintain a traceable distinction among:

- **Verified evidence** — supported by authoritative government records, current official documentation, or other sufficiently reliable sources.
- **Anecdotal evidence** — individual observations or community/social-media accounts.
- **Plausible hypothesis** — an explanation consistent with evidence but not demonstrated.
- **Speculation** — explanation lacking meaningful support.

## Evidence Register

| ID | Evidence / Claim | Classification | Source | Project Relevance | Status |
|---|---|---|---|---|---|
| EV-001 | ENV maintains multiple separate resident resources for disposal tasks, including “How to Dispose,” HHW, drop-off locations, bulky pickup, e-waste, and recycling resources. | Verified evidence | ENV Opala Home | Supports multi-branch current-state journey | VERIFIED 2026-08-09 (HST) |
| EV-002 | Item-specific disposal rules differ materially among household items/materials. | Verified evidence | ENV How to Dispose of Trash | Core problem evidence | VERIFIED 2026-08-09 (HST) |
| EV-003 | Propane tanks must not be placed in trash and are routed to eligible City drop-off pathways; Keʻehi is excluded for compressed gas. | Verified evidence | ENV How to Dispose of Trash | Demonstrates item → facility rule dependency | VERIFIED 2026-08-09 (HST) |
| EV-004 | Kapaʻa, Kawailoa, and Keʻehi have different accepted-item rules and hours; Keʻehi has explicit exclusions. | Verified evidence | ENV Waste Drop-Off Locations | Demonstrates facility-specific matching requirement | VERIFIED 2026-08-09 (HST) |
| EV-005 | Resident drop-off rules include sorting, load/quantity limits, preparation requirements, and special restrictions for materials such as concrete/non-combustible waste. | Verified evidence | ENV Waste Drop-Off Rules — Residents | Supports need to display restrictions and preparation | VERIFIED 2026-08-09 (HST) |
| EV-006 | HHW disposal can require appointment-only drop-off, advance registration, event capacity, item registration, and quantity limits. | Verified evidence | ENV Other HHW | Demonstrates time/process-dependent routing | VERIFIED 2026-08-09 (HST) |
| EV-007 | Battery disposal depends on battery type/condition; ENV distinguishes alkaline, standalone lithium/rechargeable, embedded, and vehicle batteries. | Verified evidence | ENV Batteries | Demonstrates classification requirement | VERIFIED 2026-08-09 (HST) |
| EV-008 | ENV provides a distinct process for reporting illegal dump sites. | Verified evidence | ENV Report Illegal Dumping | Supports keeping illegal-dumping reporting outside V1 | VERIFIED 2026-08-09 (HST) |
| EV-009 | A 2008 City Auditor report on the 2003–04 Mililani recycling pilot found public education was not actively used to correct observed participation issues and documented substantial contamination in that historical pilot. | Verified historical evidence | Honolulu City Auditor, Report 08-04 | Context only; does not establish present disposal-finder need | VERIFIED HISTORICAL |
| AN-001 | Product owner personally observed large/bulky items abandoned along roads near the Kapaʻa disposal area. | Anecdotal evidence | Product-owner observation | Generated ET-03 | OPEN SIGNAL |
| AN-002 | Product owner has seen Facebook/Instagram posts showing or discussing apparently similar dumping. | Anecdotal evidence | Product-owner recollection; posts not cataloged | Generated ET-03 | OPEN SIGNAL |
| HYP-001 | Some improper disposal near waste facilities may result from information/navigation friction. | Plausible hypothesis | Derived from AN-001/AN-002 + verified complexity of disposal rules | Contextual research only | OPEN / NON-BLOCKING |
| HYP-002 | A unified item → method → location interface will improve task completion versus the current information environment. | Plausible hypothesis | Product concept derived from EV-001 through EV-007 | Core solution hypothesis | UNVALIDATED UNTIL V1 TEST |
| SPEC-001 | Information friction is a major or primary cause of illegal dumping near Kapaʻa. | Speculation | No causal evidence established | Must not be claimed | REJECT AS CURRENT CLAIM |

## Source Register for Phase 1

### SRC-001 — ENV Opala Home
URL: https://www.honolulu.gov/env/ref/opala-home/

Used for:
- current information architecture;
- separate resident disposal resources;
- boundary between disposal guidance and illegal-dumping reporting.

### SRC-002 — ENV How to Dispose of Trash
URL: https://www.honolulu.gov/env/ref/how-to-dispose-of-trash/

Used for:
- item-specific disposal rules;
- mattresses/furniture;
- HHW;
- fluorescent lamps;
- paint;
- propane;
- tires;
- motor oil;
- rock/dirt/concrete;
- batteries.

### SRC-003 — ENV Waste Drop-Off Locations
URL: https://www.honolulu.gov/env/ref/waste-drop-off-locations/

Used for:
- facility hours;
- facility-specific accepted items;
- Keʻehi exclusions;
- Kapaʻa/Kawailoa differences;
- Waimānalo Gulch Sanitary Landfill permitted resident waste.

### SRC-004 — ENV Waste Drop-Off Rules — Residents
URL: https://www.honolulu.gov/env/ref/waste-drop-off-rules-residents/

Used for:
- daily load limits;
- sorting rules;
- appliance/tire restrictions;
- standalone battery preparation;
- compressed-gas limits;
- concrete/non-combustible waste rules;
- unloading expectations.

### SRC-005 — ENV Other Household Hazardous Waste
URL: https://www.honolulu.gov/env/ref/other-hhw/

Used for:
- appointment-only HHW;
- item registration;
- event schedule/deadline;
- item limit.

### SRC-006 — ENV Batteries
URL: https://www.honolulu.gov/env/ref/batteries-hhw/

Used for:
- battery-type distinctions;
- standalone vs embedded routing;
- preparation instructions.

### SRC-007 — ENV Report Illegal Dumping
URL: https://www.honolulu.gov/env/ref/report-illegal-dumping-ql/

Used for:
- confirmation that illegal-dumping reporting is a separate City service;
- scope boundary for ET-03.

### SRC-008 — City Auditor Report 08-04
URL: https://www.honolulu.gov/oca/wp-content/uploads/sites/39/2024/03/mililani_curbside_recycling_pilot_project_final_report.pdf

Used for:
- historical context on public education and compliance/contamination during the 2003–04 Mililani curbside recycling pilot.

Caution:
This source is historical and addresses a different program. It should not be used as direct proof of the current disposal-navigation problem.

## Evidence Threads

### ET-01 — Authoritative Rules Are Item-Dependent
**Status:** SUPPORTED.

Supported by EV-002, EV-003, EV-007.

### ET-02 — Facility/Process Matching Is Conditional
**Status:** SUPPORTED.

Supported by EV-004, EV-005, EV-006.

### ET-03 — Illegal Dumping Near Waste Facilities
**Status:** OPEN / NON-BLOCKING.

Evidence:
- AN-001;
- AN-002.

Related verified context:
- EV-003 through EV-006 show that facility and process constraints exist;
- EV-008 shows the City treats illegal-dumping reporting as a distinct service.

No causal conclusion is permitted.

## Discovery Hypothesis Status

### PH-01 — Problem Hypothesis
> Oʻahu residents encounter meaningful uncertainty or friction when determining the correct disposal pathway for at least some non-routine household items.

**Status:** SUFFICIENTLY SUPPORTED TO PROCEED.

Basis:
- item-dependent rules;
- facility-dependent acceptance;
- preparation/load restrictions;
- appointment-dependent pathways;
- multiple City information branches.

### SH-01 — Solution Hypothesis
> A unified searchable item → disposal method → eligible location interface materially improves the task.

**Status:** PLAUSIBLE / NOT YET VALIDATED.

Validation:
Post-functional-V1 comparative task testing.

## Genuine Remaining Gaps

| Gap ID | Question | Blocks Phase 1? | Correct Phase |
|---|---|---:|---|
| GAP-PRD-001 | Which exact items/categories are Must-Have in V1? | No | Product Definition |
| GAP-PRD-002 | What search aliases, synonyms, and no-match behavior are required? | No | Product Definition |
| GAP-DATA-001 | What is the complete authoritative source inventory for every frozen V1 record? | No | Data Foundation |
| GAP-DATA-002 | What normalized schema best represents item, pathway, restrictions, facility eligibility, provenance, and verification date? | No | Data Foundation |
| GAP-EVAL-001 | Does V1 outperform the current information environment on task completion/correctness/time? | No | Post-V1 formative evaluation |
| GAP-ET03-001 | Does information/navigation friction causally contribute to illegal dumping near waste facilities? | No | Optional contextual research |

## Phase 1 Evidence Decision
No open evidence gap currently changes the decision to move into Product Definition.

**Discovery Gate 1 remains PASS.**

**Phase 1 documentation closeout: COMPLETE.**
