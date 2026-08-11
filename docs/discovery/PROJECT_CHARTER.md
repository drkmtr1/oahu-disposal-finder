# PROJECT_CHARTER.md

## Project
Oʻahu Household-Item Disposal Finder

## Project Type
Small Hawaiʻi civic-tech development pilot.

## Purpose
Build and complete a credible Version 1.0 application that demonstrates a disciplined software-development lifecycle using a real Oʻahu public-information problem.

The project is primarily a proof of execution and engineering process. It is not dependent on proving broad market demand or obtaining City adoption.

## Core Resident Question
> “I have this item. How should I dispose of it on Oʻahu, and where can I take it if necessary?”

## Core Product Concept
A resident identifies or searches for a non-routine household item and receives:

1. the authoritative disposal method;
2. the required next action;
3. eligible City disposal location(s), when applicable;
4. preparation instructions and important restrictions;
5. the authoritative source used;
6. source verification/update information.

## Problem Context
The City and County of Honolulu Department of Environmental Services (ENV) publishes authoritative disposal information, but the resident task can require navigating different information branches depending on the item.

Current City guidance distinguishes among pathways such as:

- regular refuse;
- bulky-item collection;
- City drop-off;
- household hazardous waste (HHW) events;
- recycling/reuse options;
- specialized disposal restrictions.

City facility acceptance also varies by location, and some materials carry preparation, quantity, appointment, or load restrictions.

## Primary User
An Oʻahu resident trying to determine the correct disposal pathway for a household item.

### V1 User Boundary
V1 is for residential household disposal guidance. Business/commercial disposal is outside the core V1 user journey unless a City source must be shown to explain a restriction or distinguish resident rules.

## Geographic Scope
Island of Oʻahu / City and County of Honolulu.

## Project Objective
Complete a publicly deployable Version 1.0 that demonstrates:

- evidence-based problem framing;
- explicit product scope;
- authoritative data provenance;
- deterministic application logic;
- accessible and responsive UI;
- automated testing;
- documented technical decisions;
- maintainable repository structure;
- deployment and completion discipline.

## Non-Goals for V1
Unless later shown to be essential to the validated core task, V1 will not include:

- AI chatbot or generative AI;
- image recognition;
- user accounts or authentication;
- social features;
- illegal-dumping reporting or prevention workflows;
- notifications;
- statewide expansion;
- analytics dashboards;
- machine learning or predictive models;
- payments;
- complex administration;
- crowdsourced disposal locations;
- unrelated waste-management functionality.

Interesting ideas are backlog items, not automatic V1 requirements.

## Product Boundary
This is a disposal-information navigation product.

It is **not**:

- an official City service;
- an illegal-dumping application;
- a guarantee that a facility will accept an item under every circumstance;
- a replacement for authoritative City instructions;
- a system for commercial waste disposal.

## Evidence Position

### Problem Hypothesis
Oʻahu residents can encounter meaningful uncertainty or navigation friction when determining the correct disposal pathway for at least some non-routine household items.

**Status:** sufficiently supported to proceed.

### Solution Hypothesis
A unified searchable item → disposal method → eligible location interface materially improves residents' ability to complete the task.

**Status:** plausible but not yet empirically validated.

### Illegal-Dumping Hypothesis
Some improper disposal near waste facilities may result from information/navigation friction.

**Status:** open contextual hypothesis only. Not established and not required for V1.

## Discovery Gate
**Discovery Gate 1: PASS**

Meaning: sufficient evidence exists to justify an experimental V1.

It does not establish:

- statistically representative public demand;
- City adoption;
- reduction in illegal dumping;
- causal impact;
- superiority of the proposed UI.

## Lifecycle
1. Discovery
2. Product Definition
3. Data Foundation
4. Technical Design
5. Development
6. Testing and accessibility review
7. Deployment
8. Documentation
9. Version 1.0 closeout

## Roles

### Product Owner / Developer
Will is the product owner, decision maker, developer/operator, tester, and person responsible for understanding the system.

### ChatGPT
Product manager, systems analyst, technical architect, development mentor, requirements reviewer, evidence-quality reviewer, code/architecture reviewer, and scope-control mechanism.

### Codex
Implementation engineer for scoped coding tasks, automated tests, debugging, refactoring, implementation, and documentation updates.

Ambiguous product decisions should not be delegated to Codex.

## V1 Completion Principle
V1 is complete only when the frozen Must-Have requirements are satisfied and the application is tested, documented, accessible, deployable, and publicly deployed.

Once the V1 completion conditions are satisfied, declare Version 1.0 complete and stop adding features.

## Phase 1 Closeout
The Discovery documentation is sufficient to move into Product Definition.

Remaining questions that affect implementation are intentionally deferred to the correct later phases:

- exact V1 item corpus;
- alias/search behavior;
- no-match behavior;
- complete source inventory and normalized data schema;
- comparative resident usability testing after a functional V1.

No unresolved Discovery evidence gap currently blocks Product Definition.

## Authoritative References
Verified 2026-08-09 (HST):

- ENV Opala Home: https://www.honolulu.gov/env/ref/opala-home/
- ENV How to Dispose of Trash: https://www.honolulu.gov/env/ref/how-to-dispose-of-trash/
- ENV Waste Drop-Off Locations: https://www.honolulu.gov/env/ref/waste-drop-off-locations/
- ENV Waste Drop-Off Rules — Residents: https://www.honolulu.gov/env/ref/waste-drop-off-rules-residents/
- ENV Household Hazardous Waste: https://www.honolulu.gov/env/ref/other-hhw/
- ENV Batteries: https://www.honolulu.gov/env/ref/batteries-hhw/
