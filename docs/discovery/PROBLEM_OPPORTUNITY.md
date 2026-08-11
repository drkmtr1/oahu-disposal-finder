# PROBLEM_OPPORTUNITY.md

## Problem Statement
Oʻahu residents disposing of unusual, bulky, hazardous, electronic, or otherwise non-routine household items can face a multi-step information task:

**identify the item → determine the disposal rule → determine whether drop-off or another process is required → identify an eligible facility/process → understand preparation/restrictions → act.**

The City publishes authoritative information for these decisions. The problem is not lack of government information in general; it is that the correct answer can depend on item type, item condition, disposal pathway, facility capability, quantity, preparation, and timing.

## What Is Verified

### 1. Disposal rules materially vary by item
Current ENV guidance gives different instructions for different items. Examples include:

- furniture/mattresses: bulky collection or City disposal sites;
- hazardous chemicals: appointment-based HHW events;
- fluorescent lamps: retailer take-back or HHW appointment;
- latex/oil paint: harden or absorb before regular refuse;
- propane tanks: not trash; use specified City drop-off pathways;
- rock/dirt/concrete: specialized drop-off;
- battery rules that distinguish alkaline, standalone rechargeable/lithium, embedded batteries, and vehicle batteries.

This supports the conclusion that a single generic “take it to the dump” instruction is not sufficient.

### 2. Facility eligibility varies
ENV publishes different accepted-item lists and operating rules for transfer stations and other disposal locations.

For example, Kapaʻa and Keʻehi do not have identical acceptance rules. Current ENV guidance states that Keʻehi does not accept large metal appliances, tires, or compressed gases, while Kapaʻa accepts a broader set including those categories.

### 3. Additional operating restrictions exist
Resident drop-off rules include constraints such as:

- daily load limits;
- sorting requirements;
- appliance and tire quantity limits;
- special restrictions for concrete/non-combustible waste;
- preparation requirements;
- no attendant unloading assistance.

### 4. Some pathways are time- or appointment-dependent
Current household hazardous waste guidance requires an appointment, registration of items, and compliance with event capacity and registration deadlines.

### 5. The City's information architecture contains multiple task-specific resources
ENV's current Opala landing page separately links residents to resources including:

- How to Dispose of Trash;
- Waste Drop-Off Locations;
- Household Hazardous Waste;
- E-Waste Recycling;
- Bulky Item Pickup;
- Recycling Centers.

This does not prove that every resident experiences difficulty. It does establish that the task can cross multiple rule sets and pages.

## Problem Hypothesis
**Oʻahu residents encounter meaningful uncertainty or friction when determining the correct disposal pathway for at least some non-routine household items.**

### Status
**Sufficiently supported for an experimental V1.**

The evidence supports existence of a non-trivial information/navigation task. It does not establish prevalence across the population.

## Solution Hypothesis
**A unified searchable item → disposal method → eligible location interface will make the task easier and more reliable.**

### Status
**Plausible; not yet validated.**

The correct validation point is after a functional V1 exists, using task-based comparison against the current information environment.

## Opportunity
The product opportunity is to transform authoritative City guidance into a task-oriented resident interface without changing the underlying policy.

The product should reduce the amount of interpretation and cross-referencing required by presenting:

1. what to do;
2. where to go, if applicable;
3. what restrictions matter;
4. how to prepare the item;
5. the authoritative source;
6. when the source was last verified.

## Why This Is a Suitable Pilot
This candidate has characteristics useful for demonstrating disciplined engineering:

- a real civic task;
- deterministic rules;
- clear authoritative sources;
- facility/location matching;
- manageable scope;
- meaningful accessibility requirements;
- testable correctness;
- visible data provenance;
- limited need for backend complexity.

## Claims We May Make
Based on current evidence, project documentation may state:

- authoritative City disposal guidance exists;
- disposal instructions vary by item;
- facilities have different acceptance rules;
- some pathways require special preparation, limits, appointments, or timing;
- residents may need to navigate multiple City resources to complete certain disposal tasks;
- these facts justify building and evaluating an experimental task-oriented V1.

## Claims We Must Not Make
Without further evidence, do not claim:

- most Oʻahu residents are confused;
- the current City website is objectively bad;
- this product will reduce illegal dumping;
- information friction is a primary cause of illegal dumping;
- the product is statistically proven to improve disposal behavior;
- City adoption is warranted;
- the V1 interface is superior before comparative testing.

## Historical Supporting Context
A 2008 Honolulu City Auditor report about the 2003–04 Mililani curbside recycling pilot found that public education was not used effectively to correct participation issues and documented substantial contamination during that specific historical pilot.

This is **contextual historical evidence only**. It is not direct evidence of the present-day disposal-finder problem and should not carry the Discovery decision by itself.

## Evidence Thread ET-03 — Illegal Dumping Near Waste Facilities

### Signal
The product owner has personally observed bulky/large items abandoned along roads near the Kapaʻa disposal area and has seen social-media discussions or images that appear similar.

### Classification
Anecdotal signal.

### Generated Hypothesis
A resident might arrive near a facility expecting an item to be accepted, encounter a restriction or process mismatch, fail to identify the next legal option, and abandon the item nearby.

### Competing Explanations
- deliberate noncompliance;
- convenience;
- commercial dumping;
- disposal cost;
- facility hours/access;
- transportation/unloading limitations;
- prohibited materials;
- adequate information that was ignored.

### Status
OPEN / NON-BLOCKING.

The City separately maintains an illegal-dumping reporting process, reinforcing that illegal-dumping reporting is a distinct service area and outside this V1 product boundary.

## Genuine Remaining Evidence Gaps
No remaining Discovery gap materially blocks Product Definition.

The following are intentionally deferred:

### Product Definition
- exact Must-Have item coverage;
- search/alias expectations;
- no-match behavior;
- presentation hierarchy;
- what qualifies as an “eligible location” result.

### Data Foundation
- complete authoritative source register;
- normalized item/facility schema;
- source-change verification workflow;
- exact provenance fields.

### Post-V1 Evaluation
- task completion comparison;
- answer correctness;
- time to answer;
- number of pages/sources required;
- facility-selection correctness;
- confidence/source awareness;
- observed usability/accessibility problems.

## Discovery Decision
**Proceed to Product Definition.**

Further broad Discovery research would add process without materially changing the current decision.

## Authoritative References
Verified 2026-08-09 (HST):

- https://www.honolulu.gov/env/ref/opala-home/
- https://www.honolulu.gov/env/ref/how-to-dispose-of-trash/
- https://www.honolulu.gov/env/ref/waste-drop-off-locations/
- https://www.honolulu.gov/env/ref/waste-drop-off-rules-residents/
- https://www.honolulu.gov/env/ref/other-hhw/
- https://www.honolulu.gov/env/ref/batteries-hhw/
- https://www.honolulu.gov/env/ref/report-illegal-dumping-ql/
- Historical City Auditor report: https://www.honolulu.gov/oca/wp-content/uploads/sites/39/2024/03/mililani_curbside_recycling_pilot_project_final_report.pdf
