# STAKEHOLDER_MAP.md

## Purpose
Identify the people and organizations affected by, authoritative for, or operationally relevant to the Oʻahu Household-Item Disposal Finder.

The map is intentionally small. It does not create unnecessary stakeholder-engagement requirements for a portfolio pilot.

## Stakeholder Prioritization

| Stakeholder | Role in V1 | Influence on correctness | Need during V1 | Notes |
|---|---|---:|---|---|
| Oʻahu residents | Primary users | High | Design for | Core task: determine correct disposal action |
| City & County of Honolulu Department of Environmental Services (ENV) | Authoritative source owner | Very High | Research/verify | V1 derives guidance from current official sources |
| ENV Refuse Division / disposal operations | Operational rule owner | Very High | Research/verify as needed | Facility rules, resident restrictions, contact escalation |
| City disposal-site staff/operators | Execute site acceptance rules | High | No formal engagement required pre-V1 | Product must not contradict published site rules |
| Household Hazardous Waste program/event operators | Execute appointment-based special disposal | High for HHW | Source verification | Relevant only to items routed to HHW |
| Private recyclers/reuse/take-back organizations referenced by City guidance | Secondary disposal/reuse pathway | Medium | Include only when authoritative guidance supports it | Third-party details may change more frequently |
| Product owner/developer | Builds and maintains pilot | High | Continuous | Responsible for understanding code/data and source verification |
| Formative usability-test participants | Evaluate V1 task performance | Medium | Post-V1 functional build | Small-sample formative testing, not representative research |
| City illegal-dumping reporting function | Contextual adjacent service | Low for core V1 | No integration | Keeps ET-03 separate from product scope |
| Future reviewers/employers/civic stakeholders | Portfolio audience | Low on product correctness | Documentation quality | Need to understand process, evidence discipline, and maintainability |

## Primary Stakeholder — Oʻahu Resident

### Need
A clear answer to:
- what should I do with this item?
- where can I take it, if needed?
- what must I do before disposal?
- what restrictions apply?
- where did this answer come from?

### V1 Design Obligations
- plain language;
- mobile-friendly interaction;
- keyboard accessibility;
- readable content hierarchy;
- visible source/provenance;
- no implied City endorsement;
- safe handling of unknown/no-match cases.

## Authoritative Stakeholder — Honolulu ENV

### Role
ENV is the principal authoritative source for the public disposal rules represented by V1.

### V1 Relationship
The pilot does not require ENV adoption or formal partnership to be developed as an independent prototype using public information.

However, the product must:
- attribute official guidance accurately;
- preserve source provenance;
- avoid implying official status;
- make source verification dates visible;
- provide a route back to the authoritative source.

## Operational Stakeholders

### Disposal Sites / Transfer Stations
Their published accepted-item lists, hours, and restrictions determine whether a location can appear as eligible for an item.

### Household Hazardous Waste Program
The program adds appointment, event, registration, and item-limit requirements for applicable materials.

### Private Reuse/Recycling/Take-Back Programs
These are secondary pathways only when the authoritative City guidance explicitly points residents toward them.

Because third-party details can change, V1 should distinguish:
- authoritative City rule;
- City-referenced external option.

## Contextual Stakeholder — Illegal-Dumping Function
ENV separately provides an illegal-dumping reporting process.

This stakeholder is relevant to the open ET-03 research thread but does not create a V1 requirement for:
- reporting;
- enforcement;
- incident mapping;
- dumping prediction;
- prevention claims.

## Engagement Plan

### Before V1 Scope Freeze
Required:
- authoritative desk verification only.

Not required:
- broad resident interviews;
- formal City interviews;
- agency approval;
- statistical survey.

### During Data Foundation
Required:
- verify every V1 data record against authoritative sources;
- document ambiguous or conflicting source material;
- define source-review dates.

### After Functional V1
Preferred:
- small formative resident task test comparing the current information environment with V1;
- record correctness, completion, time, confusion, and accessibility issues.

### Before Any Claim of Official Adoption/Partnership
Required:
- explicit agency engagement and permission appropriate to the claim.

## Stakeholder Risks

| Risk | Mitigation |
|---|---|
| Product appears official when it is not | Prominent independent-project disclaimer and source attribution |
| City rule changes after data capture | Verification date + source URL + maintenance process |
| Facility rules differ from generalized item rule | Model item and facility restrictions separately |
| Third-party recycler information goes stale | Clearly label source type; minimize dependency; re-verify |
| Small usability test is overgeneralized | Describe it as formative, not representative |

## Authoritative References
Verified 2026-08-09 (HST):

- https://www.honolulu.gov/env/ref/opala-home/
- https://www.honolulu.gov/env/ref/waste-drop-off-locations/
- https://www.honolulu.gov/env/ref/waste-drop-off-rules-residents/
- https://www.honolulu.gov/env/ref/other-hhw/
- https://www.honolulu.gov/env/ref/report-illegal-dumping-ql/
