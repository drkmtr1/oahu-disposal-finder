# CURRENT_STATE_JOURNEY.md

## Purpose
Document the present resident information journey before designing the V1 interface.

This is a task-flow model based on current authoritative City resources. It is not a claim that every resident follows the exact same path.

## Resident Job
> “I have this household item. I need to know what I am legally and practically supposed to do with it on Oʻahu.”

## Current-State Journey

### Step 1 — Identify the item
The resident begins with an object or material, not necessarily with City waste-management terminology.

Examples:
- “old propane tank”;
- “swollen laptop battery”;
- “mattress”;
- “leftover paint”;
- “broken concrete.”

### Step 2 — Locate the relevant City guidance
The ENV Opala landing page provides separate entry points for disposal instructions, HHW, waste drop-off locations, e-waste, bulky pickup, recycling, and other programs.

**Potential friction:** the resident must choose the correct information branch before knowing the answer.

### Step 3 — Determine the disposal pathway
The resident interprets the item-specific rule.

Possible pathways include:

- regular refuse;
- bulky collection;
- City facility drop-off;
- HHW event;
- specialized landfill/drop-off;
- reuse/recycling program;
- retailer/manufacturer take-back.

**Potential friction:** superficially similar items can have different rules.

Example:
- alkaline batteries may go in regular refuse;
- standalone lithium/rechargeable batteries require a different pathway;
- embedded batteries can require HHW handling.

### Step 4 — Determine whether a physical location is required
If the rule requires drop-off, the resident must identify which facilities are eligible.

**Potential friction:** facility acceptance is not uniform.

Example:
- some compressed gases may be accepted at Kapaʻa or other eligible City sites;
- Keʻehi has explicit exclusions that include compressed gases.

### Step 5 — Interpret facility-specific rules
The resident may need to verify:

- facility hours;
- accepted item categories;
- quantity/load limits;
- residential eligibility;
- preparation requirements;
- sorting requirements;
- unloading limitations.

**Potential friction:** “this facility accepts the category” may still not mean “my exact load is acceptable without preparation or limits.”

### Step 6 — Complete a special process if required
For HHW or other special pathways, the resident may need to:

- schedule an appointment;
- register the specific material;
- track an event date;
- meet a registration deadline;
- comply with quantity/item limits.

### Step 7 — Prepare and transport the item
The resident follows preparation instructions and transports the item or sets it out according to the applicable collection process.

### Step 8 — Complete disposal
The resident disposes of the item using the identified pathway.

## Current-State Decision Model

```text
Resident has item
        |
        v
Find authoritative City guidance
        |
        v
Identify exact item/material rule
        |
        +-----------------------------+
        |                             |
        v                             v
No drop-off required              Drop-off/special process required
        |                             |
        v                             v
Prepare for refuse/collection     Identify eligible facility/process
                                      |
                                      v
                              Check restrictions/hours/limits
                                      |
                                      v
                              Appointment needed?
                                /             \
                              yes              no
                               |                |
                               v                v
                       Schedule/register     Prepare/transport
                               |                |
                               +-------+--------+
                                       |
                                       v
                                 Complete disposal
```

## Representative Current-State Scenarios

### Scenario A — Propane Tank
1. Resident finds item-specific guidance.
2. Learns the tank must not go in trash.
3. Learns that only eligible City drop-off pathways should be used.
4. Checks the facility list or facility restrictions.
5. Avoids a facility that explicitly does not accept compressed gas.
6. Transports the tank to an eligible site.

**Information burden:** item rule + facility matching.

### Scenario B — Concrete Pieces
1. Resident finds the item/material rule.
2. Learns concrete is special/non-combustible waste.
3. Checks resident drop-off rules.
4. Determines which location(s) accept the material and under what quantity limits.
5. Transports the load accordingly.

**Information burden:** item rule + quantity/location restriction.

### Scenario C — Battery
1. Resident identifies the battery/device type.
2. Determines whether the battery is alkaline, standalone rechargeable/lithium, embedded, or vehicle battery.
3. Follows the appropriate disposal route.
4. For standalone lithium/rechargeable batteries, follows preparation instructions such as terminal protection.
5. For an embedded battery pathway, follows HHW scheduling instructions where applicable.

**Information burden:** classification before routing.

## Current-State Pain Points Supported by Evidence

### P-01 — Rule branching
Different item categories lead to materially different disposal methods.

### P-02 — Facility mismatch risk
Not every facility accepts the same materials.

### P-03 — Restriction discovery
Load limits, preparation requirements, and facility rules can alter the answer.

### P-04 — Time/process dependency
HHW disposal can depend on scheduled events, registration, and appointment capacity.

### P-05 — Information cross-reference
A resident can need both item-specific guidance and facility/process-specific guidance to complete one task.

## What Is Not Yet Proven
This journey does not prove:

- how often residents abandon the task;
- which pain point is most severe;
- how many pages the average resident visits;
- whether residents prefer search, browse, or guided questions;
- whether the proposed V1 reduces time/error.

Those questions are suitable for post-V1 comparative task testing.

## V1 Design Implication
The product should try to collapse the current multi-branch task into one deterministic result flow:

```text
Item
→ authoritative disposal method
→ eligible location/process
→ restrictions/preparation
→ clear next action
→ authoritative source
```

The design should not hide uncertainty. If the City source does not support a definitive answer, V1 should say so and direct the resident to the authoritative next step.

## Authoritative References
Verified 2026-08-09 (HST):

- https://www.honolulu.gov/env/ref/opala-home/
- https://www.honolulu.gov/env/ref/how-to-dispose-of-trash/
- https://www.honolulu.gov/env/ref/waste-drop-off-locations/
- https://www.honolulu.gov/env/ref/waste-drop-off-rules-residents/
- https://www.honolulu.gov/env/ref/other-hhw/
- https://www.honolulu.gov/env/ref/batteries-hhw/
