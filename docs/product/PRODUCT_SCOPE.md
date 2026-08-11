# PRODUCT_SCOPE.md

# Oʻahu Household-Item Disposal Finder — V1 Scope

**Scope status:** FROZEN  
**Version:** 1.0

---

## 1. Scope Statement

Version 1.0 will solve one narrow resident job:

> Search for or select a supported non-routine household item and receive a source-backed Oʻahu disposal method, applicable preparation/restrictions, and eligible City disposal locations/processes when required.

The product will do this for a **curated set of 25 canonical disposal topics**.

V1 is intentionally not comprehensive.

---

# 2. Must Have — V1 Release Scope

## Resident interaction

- text search;
- browse all supported topics;
- ordinary-language aliases;
- deterministic clarification for ambiguous items;
- no-match state;
- result screen.

## Result content

- canonical topic;
- disposal method;
- plain-language next action;
- preparation instructions;
- important restrictions;
- eligible City locations/process, when applicable;
- facility address and published hours, when applicable;
- authoritative source;
- source verification date;
- independent-project disclosure.

## Rule behavior

- deterministic item resolution;
- structured item-to-facility eligibility;
- facility-specific exclusions/restrictions;
- distinction between required disposal and optional reuse/recycling alternatives;
- no guessed advice.

## Quality

- responsive mobile/desktop core flow;
- WCAG 2.2 AA target;
- automated rule/data tests;
- manual acceptance verification;
- lint/type checks;
- public HTTPS deployment;
- complete repository documentation.

---

# 3. Frozen Canonical Topic Coverage

1. Large appliance
2. Small appliance
3. Bicycle
4. Computer / laptop
5. Television / monitor
6. Cell phone
7. Embedded-battery electronic device
8. Standalone lithium / rechargeable battery
9. Alkaline battery
10. Vehicle lead-acid battery
11. Fire extinguisher
12. Furniture / mattress / carpet
13. Household hazardous chemical
14. Medication
15. Oxygen tank
16. Fluorescent tube / bulb
17. Helium tank
18. Latex / oil paint
19. Lead / aluminum paint
20. Propane tank / cylinder
21. Tire
22. Motor oil
23. Rock / dirt / concrete
24. Large metal item
25. Christmas tree

### Why 25?

Because this is large enough to exercise:

- regular refuse;
- bulky collection;
- City drop-off;
- transfer-station differences;
- HHW;
- e-waste;
- retailer/take-back options;
- preparation rules;
- quantity restrictions;
- compressed-gas exclusions;
- battery classification;
- non-combustible waste rules;

while remaining small enough to manually verify every record.

The number is a scope-control choice, not a claim that these are Oʻahu's 25 most common disposal questions.

---

# 4. Five V1 Acceptance Scenarios

These existing scenarios must be solvable in V1:

| Scenario | Capability exercised |
|---|---|
| Swollen laptop lithium-ion battery | battery/device clarification and special pathway |
| Old propane tank | prohibition + eligible facility matching |
| Leftover latex paint | preparation requirement + regular-refuse pathway |
| Mattress | bulky-item pathway |
| Concrete pieces | special material + facility/quantity restrictions |

They are release acceptance scenarios and later formative usability scenarios.

---

# 5. Should Have — Non-Blocking

The following may be implemented only if they do not jeopardize the V1 completion path:

- type-ahead search suggestions;
- simple category browsing;
- facility telephone numbers;
- copy/shareable canonical result URL.

If time or complexity becomes material, defer them.

---

# 6. Won't Have — V1

## Intelligence / automation
- chatbot;
- generative AI;
- image recognition;
- machine learning;
- predictive recommendations;
- automated scraping;
- automatic source-change monitoring.

## User/account features
- accounts;
- authentication;
- profiles;
- favorites;
- saved history;
- personalized notifications.

## Location complexity
- GPS permission;
- geocoding;
- nearest-facility ranking;
- route optimization;
- turn-by-turn directions;
- live facility status.

## Civic-scope expansion
- illegal-dumping reporting;
- illegal-dumping maps;
- dumping analytics;
- enforcement workflows;
- statewide disposal coverage;
- commercial waste workflows;
- unrelated collection-service functions.

## Operational complexity
- admin dashboard;
- CMS;
- payments;
- crowdsourcing;
- resident-submitted disposal locations.

---

# 7. Scope Change Rule

After this freeze, a requested feature is handled as follows:

### Add to V1 only when:
1. it is necessary to make an existing Must-Have requirement correct;
2. it fixes a source-backed safety/correctness problem;
3. it fixes a release-blocking accessibility defect; or
4. it fixes a release-blocking technical defect.

### Otherwise:
Add it to the backlog for post-V1 consideration.

The test is:

> “Can Version 1.0 correctly solve the frozen resident job without this?”

If yes, it does not enter V1.

---

# 8. Scope Freeze Decision

**Decision:** V1.0 scope is frozen at the end of Product Definition.

Coding should not begin until the Data Foundation and Technical Design documents define how the frozen requirements will be represented and implemented.

Any future scope expansion must be explicit rather than accidental.
