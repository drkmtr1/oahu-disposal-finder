# PRD.md

# Oʻahu Household-Item Disposal Finder — Product Requirements Document

**Product version:** Version 1.0  
**Phase:** Product Definition  
**Scope status:** FROZEN for V1.0  
**Authoritative information last reviewed for this PRD:** 2026-08-09 (HST)

---

## 1. Product Summary

The Oʻahu Household-Item Disposal Finder is a small, independent civic-tech web application that helps an Oʻahu resident answer:

> “I have this item. How should I dispose of it on Oʻahu, and where can I take it if necessary?”

The application converts current authoritative City & County of Honolulu Department of Environmental Services (ENV) guidance into a deterministic, task-oriented flow.

The application does not invent disposal advice. It presents structured guidance derived from authoritative sources and makes the source and verification date visible.

---

## 2. Product Goal

Reduce the amount of interpretation and cross-referencing required for a resident to determine the correct disposal pathway for a curated set of non-routine household items.

A successful V1 demonstrates:

- explicit requirements;
- deterministic rule resolution;
- item-to-facility eligibility matching;
- clear data provenance;
- accessibility;
- automated testing;
- maintainable implementation;
- public deployment;
- disciplined Version 1.0 completion.

This is a portfolio/civic-tech pilot. City adoption and statistically representative market validation are not V1 goals.

---

## 3. Primary User

An Oʻahu resident disposing of household-generated material.

### V1 user assumptions

The user:

- is acting as a resident, not as a business/commercial hauler;
- knows the ordinary-language name of the item/material;
- may not know City waste-management terminology;
- wants a clear next action rather than a waste-policy education course;
- may be using a phone while preparing for disposal.

---

## 4. Core User Journey

```text
Resident enters/selects an item
        ↓
System matches a canonical disposal topic
        ↓
If ambiguous, system asks a deterministic clarification
        ↓
System presents disposal method
        ↓
System presents preparation/restrictions
        ↓
If physical drop-off applies:
    system presents eligible City location(s)
        ↓
System presents clear next action
        ↓
System presents authoritative source + verification date
```

---

## 5. Product Principles

### P-1 — Authoritative before convenient
No disposal instruction may be invented merely to provide an answer.

### P-2 — Deterministic before intelligent
V1 uses structured rules, aliases, and explicit clarification choices. No generative AI or probabilistic classification is required.

### P-3 — Action before explanation
The resident should see the next action first, then supporting restrictions and source detail.

### P-4 — Provenance is part of the product
Every disposal record must be traceable to an authoritative source.

### P-5 — Unknown is a valid result
If V1 does not contain a sufficiently supported match, the application must say so rather than guessing.

### P-6 — Complete the small product
Features that do not support the frozen V1 core task go to the backlog.

---

# 6. Frozen V1 Canonical Topic Set

V1 will support **25 canonical disposal topics**.

This is a deliberately curated corpus chosen to:

- cover the five existing formative test scenarios;
- exercise materially different disposal pathways;
- exercise facility matching and restrictions;
- demonstrate deterministic disambiguation;
- remain small enough for every record to be manually source-verified.

It is **not** presented as a comprehensive directory of every disposable item on Oʻahu.

| ID | Canonical topic | Typical user terms / examples |
|---|---|---|
| IT-001 | Large appliance | refrigerator, freezer, washer, dryer, stove |
| IT-002 | Small appliance | toaster, small appliance |
| IT-003 | Bicycle | bike, bicycle |
| IT-004 | Computer / laptop | computer, desktop, laptop |
| IT-005 | Television / monitor | TV, television, monitor |
| IT-006 | Cell phone | phone, mobile phone, smartphone |
| IT-007 | Embedded-battery electronic device | device with non-removable battery |
| IT-008 | Standalone lithium / rechargeable battery | lithium-ion battery, Li-ion, NiMH, NiCad |
| IT-009 | Alkaline battery | AA, AAA, D, 9V, button battery |
| IT-010 | Vehicle lead-acid battery | car battery, motorcycle battery |
| IT-011 | Fire extinguisher | residential fire extinguisher |
| IT-012 | Furniture / mattress / carpet | couch, chair, mattress, rug, carpet |
| IT-013 | Household hazardous chemical | corrosive, toxic, flammable household chemical |
| IT-014 | Medication | old medicine, prescription medicine |
| IT-015 | Oxygen tank | oxygen cylinder |
| IT-016 | Fluorescent tube / bulb | fluorescent lamp, CFL |
| IT-017 | Helium tank | helium cylinder |
| IT-018 | Latex / oil paint | leftover latex paint, oil paint |
| IT-019 | Lead / aluminum paint | lead paint, aluminum paint |
| IT-020 | Propane tank / cylinder | propane bottle, grill tank |
| IT-021 | Tire | car tire, tire with rim |
| IT-022 | Motor oil | used motor oil |
| IT-023 | Rock / dirt / concrete | concrete pieces, rubble, dirt, rock |
| IT-024 | Large metal item | metal shelving, large metal piece |
| IT-025 | Christmas tree | natural Christmas tree |

### Corpus change rule

After this Product Definition freeze:

- correcting a source-backed mistake is allowed;
- splitting a frozen topic when required to avoid an incorrect answer is allowed;
- adding an entirely new item/topic is a backlog change unless it is necessary to satisfy a frozen Must-Have requirement.

---

# 7. Functional Requirements

## PR-001 — Item search

**Requirement**  
The user must be able to search for a supported household item using ordinary-language text.

**Rationale**  
The resident begins with an item, not a City program name.

**Priority**  
MUST

**Acceptance criteria**

1. A visible search input is available on the primary screen.
2. Entering a supported canonical name returns the intended topic.
3. Entering a defined alias returns the intended topic.
4. Search is case-insensitive.
5. Leading/trailing whitespace does not prevent a match.
6. Search never silently invents a match for an unsupported term.

**Evidence**  
Current ENV guidance is organized around materially different item categories and disposal pathways.

---

## PR-002 — Browse fallback

**Requirement**  
The user must be able to browse the supported V1 topics without knowing the exact search term.

**Rationale**  
Search alone is brittle for users who do not know how the dataset names an item.

**Priority**  
MUST

**Acceptance criteria**

1. All 25 canonical topics are discoverable through a browse/list interface.
2. Browse is usable without a mouse.
3. Selecting a topic opens its disposal result or required clarification step.

---

## PR-003 — Alias matching

**Requirement**  
Each canonical topic must support a documented set of ordinary-language aliases where useful.

**Rationale**  
Residents may search “couch” rather than “furniture,” or “Li-ion battery” rather than the canonical topic name.

**Priority**  
MUST

**Acceptance criteria**

1. Aliases are stored as data, not hard-coded independently in UI components.
2. Every frozen alias maps to exactly one canonical topic or an explicit clarification path.
3. Alias-to-topic mappings have automated tests.

**Note**  
The exact alias inventory is a Data Foundation deliverable, not a new product-scope decision.

---

## PR-004 — Deterministic clarification

**Requirement**  
When a broad term can lead to materially different authoritative rules, the application must ask the user to choose among explicit supported options rather than guessing.

**Rationale**  
Current ENV rules distinguish, for example, alkaline batteries, standalone lithium/rechargeable batteries, embedded batteries, and vehicle batteries.

**Priority**  
MUST

**Acceptance criteria**

1. Ambiguous supported queries trigger a clarification view when needed.
2. Each choice is plain-language and mutually understandable.
3. Choosing an option produces the correct canonical topic.
4. No generative AI or probabilistic model is used for clarification.

**Example**

```text
Search: “battery”

Which type do you have?

[Alkaline household battery]
[Standalone lithium/rechargeable battery]
[Battery built into a device]
[Car or motorcycle battery]
```

---

## PR-005 — Clear disposal result

**Requirement**  
A matched topic must display a concise disposal-method summary and an explicit next action.

**Rationale**  
The product exists to answer “what do I do next?”

**Priority**  
MUST

**Acceptance criteria**

Every result includes:

1. canonical item/topic name;
2. disposal method;
3. plain-language next action;
4. applicable preparation instructions;
5. applicable restrictions;
6. eligible location/process information when relevant;
7. authoritative source;
8. source verification date.

---

## PR-006 — Multiple legitimate pathways

**Requirement**  
When authoritative guidance provides multiple legitimate disposal/reuse pathways, V1 may show more than one option but must distinguish the primary disposal action from optional alternatives.

**Rationale**  
City guidance sometimes includes City drop-off, bulky collection, retailer take-back, donation, or recycling options.

**Priority**  
MUST

**Acceptance criteria**

1. Required/prohibited instructions are visually distinguishable from optional alternatives.
2. V1 does not imply that a voluntary reuse option is legally required.
3. Third-party options are labeled as external/City-referenced when applicable.

---

## PR-007 — Item-to-facility eligibility matching

**Requirement**  
When City drop-off applies, the result must display only City facilities supported by the structured eligibility rules for that topic.

**Rationale**  
Published City facility acceptance differs by location.

**Priority**  
MUST

**Acceptance criteria**

1. Facility eligibility is derived from structured data.
2. An item is never shown as eligible at a facility when the frozen source data marks it ineligible.
3. Facility-specific restrictions can override generalized item rules.
4. Automated tests cover all frozen item-to-facility mappings.

**Example**  
Compressed-gas topics must not show Keʻehi as eligible when current ENV guidance excludes compressed gas there.

---

## PR-008 — Facility information

**Requirement**  
Eligible City facility cards must provide enough information for the resident to decide whether to use the site.

**Priority**  
MUST

**Acceptance criteria**

Each eligible City facility result includes, when available in the authoritative source:

- facility name;
- address;
- published operating hours;
- applicable facility-specific restriction;
- link to the authoritative City facility page.

**Boundary**  
V1 does not promise real-time open/closed status.

---

## PR-009 — Preparation and restriction prominence

**Requirement**  
Safety-, preparation-, appointment-, quantity-, or facility-critical restrictions must be displayed before the user is likely to travel or dispose of the item.

**Priority**  
MUST

**Acceptance criteria**

1. Critical restrictions are not hidden only behind a secondary source link.
2. Examples such as battery-terminal taping, concrete quantity limits, or HHW appointments are visible in the result when applicable.
3. Restrictions are data-driven.

---

## PR-010 — Household Hazardous Waste process

**Requirement**  
Topics routed to the City HHW process must identify the appointment requirement and direct the user to the authoritative scheduling/process source.

**Priority**  
MUST

**Acceptance criteria**

1. HHW results state that drop-off is appointment-based when that remains the authoritative rule.
2. The result links to the current City HHW page rather than hard-coding a future event date as permanent product logic.
3. Any event-specific information included in V1 is clearly treated as time-sensitive.

**Reason for design**  
Current City HHW information includes appointment-only drop-off, event capacity, registration deadlines, and item limits. Those values can change over time.

---

## PR-011 — Authoritative provenance

**Requirement**  
Every canonical disposal topic must identify its authoritative source.

**Priority**  
MUST

**Acceptance criteria**

Every topic has:

- source organization;
- source page title;
- source URL;
- source verification date.

No topic can ship without provenance.

---

## PR-012 — Visible verification date

**Requirement**  
The user must be able to see when the underlying guidance was last manually verified.

**Priority**  
MUST

**Acceptance criteria**

1. Every result exposes a “Last verified” date.
2. The date comes from the structured record.
3. The application does not label the date as “last updated by the City” unless that is separately known.

---

## PR-013 — Official-source escape hatch

**Requirement**  
Every result must provide a direct path to the authoritative source for confirmation.

**Priority**  
MUST

**Acceptance criteria**

1. The source link is clearly labeled.
2. External navigation is understandable to keyboard and screen-reader users.
3. Unsupported/no-match states also provide a useful authoritative ENV starting point.

---

## PR-014 — Unsupported item / no-match state

**Requirement**  
If the application cannot confidently map a query to a frozen V1 topic, it must not manufacture disposal advice.

**Priority**  
MUST

**Acceptance criteria**

The no-match state:

1. says the item is not currently covered by this V1;
2. does not provide guessed disposal instructions;
3. offers the browse list;
4. links to the authoritative ENV “How to Dispose”/Opala resource;
5. makes it clear that lack of V1 coverage does not mean the item has no City disposal rule.

---

## PR-015 — Independent-project disclosure

**Requirement**  
The product must clearly state that it is an independent civic-tech pilot using public City information and is not an official City service.

**Priority**  
MUST

**Acceptance criteria**

1. Disclosure is visible in the application.
2. City source attribution is separate from product ownership.
3. The UI does not use wording that implies City endorsement.

---

## PR-016 — Resident scope disclosure

**Requirement**  
V1 must communicate that its core guidance is intended for residential household disposal.

**Priority**  
MUST

**Acceptance criteria**

1. The resident scope is visible in an appropriate location.
2. When an authoritative source distinguishes business rules, V1 does not silently apply resident guidance to business waste.
3. The app provides the official source rather than attempting to solve commercial disposal.

---

## PR-017 — Responsive core flow

**Requirement**  
The complete core task must work on common phone and desktop viewport sizes.

**Priority**  
MUST

**Acceptance criteria**

1. Search, clarification, result, facility, restrictions, and source controls remain usable on a narrow mobile viewport.
2. No required horizontal scrolling exists in the core flow.
3. Touch targets and text remain usable at mobile sizes.

---

## PR-018 — Accessibility

**Requirement**  
The V1 core flow must target WCAG 2.2 Level AA.

**Priority**  
MUST

**Acceptance criteria**

At minimum:

- semantic headings and landmarks;
- programmatic form labels;
- full keyboard operation;
- visible keyboard focus;
- logical focus order;
- sufficient color contrast;
- no information conveyed only by color;
- accessible link/control names;
- usable zoom/reflow behavior;
- status/error messaging available to assistive technology;
- reduced-motion preference respected if non-essential animation exists.

Automated accessibility checks supplement but do not replace manual review.

---

## PR-019 — Data-driven content

**Requirement**  
Disposal rules, aliases, provenance, restrictions, and facility eligibility must be represented in structured data separate from presentation components.

**Priority**  
MUST

**Rationale**  
The civic information is the primary domain asset and must be reviewable and maintainable without editing UI logic.

**Acceptance criteria**

1. The UI consumes a structured dataset.
2. Data validation fails when required provenance fields are missing.
3. Facility eligibility is not duplicated across arbitrary UI code paths.

---

## PR-020 — Deterministic automated tests

**Requirement**  
The project must have automated tests that verify frozen rule resolution and facility matching.

**Priority**  
MUST

**Acceptance criteria**

Tests cover:

- canonical topic search;
- alias matching;
- clarification routing;
- no-match behavior;
- item-to-facility eligibility;
- required result fields;
- provenance completeness;
- representative critical restrictions.

All tests pass before V1 release.

---

## PR-021 — Five acceptance scenarios

**Requirement**  
The existing five resident-test scenarios must be represented as release acceptance scenarios.

**Priority**  
MUST

**Scenarios**

1. swollen laptop lithium-ion battery;
2. old propane tank;
3. leftover latex paint;
4. mattress;
5. concrete pieces.

**Acceptance criteria**

Each scenario can be completed through V1 without guessed policy and produces a source-backed next action.

**Important**  
The existing resident-testing document remains the source instrument. It is not recreated here.

---

## PR-022 — Error-safe rendering

**Requirement**  
Missing or malformed data must not produce a plausible-looking but incomplete disposal answer.

**Priority**  
MUST

**Acceptance criteria**

1. Required-field schema validation exists.
2. Invalid records fail tests/build validation or render an explicit unavailable state.
3. A missing source or disposal method is treated as an error, not as optional display content.

---

## PR-023 — No personal account required

**Requirement**  
A resident must be able to use all V1 core functionality without creating an account or supplying personal information.

**Priority**  
MUST

**Acceptance criteria**

1. No login exists.
2. No resident profile exists.
3. No personal location is required.
4. Search terms may be processed locally/client-side where architecture permits.

---

## PR-024 — Public deployment

**Requirement**  
V1 must be deployed to a public HTTPS URL.

**Priority**  
MUST

**Acceptance criteria**

1. The production URL is publicly accessible.
2. Core functionality works in production.
3. Production uses the same validated structured data and testable codebase as the repository.

---

## PR-025 — Product documentation

**Requirement**  
Another developer must be able to understand what the application does, how its data is sourced, how to run/test it, and what V1 intentionally does not do.

**Priority**  
MUST

**Acceptance criteria**

Repository documentation includes:

- project purpose;
- local setup;
- test commands;
- data/provenance approach;
- architecture summary;
- accessibility approach;
- known limitations;
- source-verification process;
- V1 scope boundary.

---

# 8. Should-Have Requirements

These are desirable but **do not block V1.0** unless promoted before implementation begins.

## PR-101 — Search suggestions
Show matching suggestions while the user types.

## PR-102 — Facility telephone number
Display the facility phone number when present in the authoritative City source.

## PR-103 — Copy/share result
Allow a user to copy a concise result or share a URL representing the selected canonical topic.

## PR-104 — Search by category
Permit browsing through simple categories such as batteries, bulky items, hazardous materials, electronics, and construction/inert materials.

---

# 9. Explicitly Out of V1

The following are backlog items, not hidden requirements:

- AI chatbot;
- generative AI;
- image recognition;
- automatic item classification from photos;
- user accounts;
- authentication;
- saved favorites/history;
- social features;
- illegal-dumping reporting;
- illegal-dumping prediction/prevention claims;
- notifications;
- statewide expansion;
- analytics dashboard;
- machine learning;
- payments;
- crowdsourced locations;
- complex administration UI;
- real-time facility open/closed monitoring;
- GPS permission;
- nearest-facility geospatial ranking;
- turn-by-turn navigation;
- automated web scraping;
- automated City-source change detection;
- commercial/business disposal guidance;
- comprehensive coverage of every item on Oʻahu.

---

# 10. Known Product Limitations

V1 will have deliberate limitations:

1. It covers 25 curated canonical topics, not every possible item.
2. Source data is manually verified rather than synchronized live.
3. Facility hours and rules can change after verification.
4. V1 does not know temporary closures unless the dataset is manually updated.
5. V1 does not determine geographic nearest facility.
6. Third-party reuse/recycling options can change independently of the City.
7. A user may still need to confirm unusual circumstances with ENV or a facility.
8. Formative resident testing will not be statistically representative of Oʻahu.

---

# 11. Release Definition

Version 1.0 can be declared complete only when:

- all PR-001 through PR-025 requirements are satisfied;
- all 25 canonical topics have verified authoritative provenance;
- no known incorrect Must-Have disposal or facility mapping remains;
- automated tests pass;
- lint/type checks pass;
- accessibility review is completed;
- mobile/desktop core flow is manually verified;
- production deployment is live;
- documentation and known limitations are complete;
- no unresolved Must-Have requirement remains.

Once these are true:

> **Declare Version 1.0 complete. Stop adding features.**

---

# 12. Authoritative Product-Definition References

Current City sources reviewed for product decisions:

- ENV — How to Dispose of Trash  
  https://www.honolulu.gov/env/ref/how-to-dispose-of-trash/

- ENV — Waste Drop-Off Locations  
  https://www.honolulu.gov/env/ref/waste-drop-off-locations/

- ENV — Waste Drop-Off Rules — Residents  
  https://www.honolulu.gov/env/ref/waste-drop-off-rules-residents/

- ENV — Household Hazardous Waste  
  https://www.honolulu.gov/env/ref/other-hhw/

- ENV — Batteries  
  https://www.honolulu.gov/env/ref/batteries-hhw/

- ENV — E-Waste Recycling  
  https://www.honolulu.gov/env/ref/e-waste-recycling/

- ENV — E-Waste Recycling at City Disposal Sites  
  https://www.honolulu.gov/env/city-ewaste-dropbins/

Accessibility target reference:

- W3C — Web Content Accessibility Guidelines (WCAG) 2.2  
  https://www.w3.org/TR/WCAG22/
