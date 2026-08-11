# DATA_SOURCE_REGISTER.md

# Oʻahu Household-Item Disposal Finder — Data Source Register

**Phase:** 3 — Data Foundation  
**Verification date:** 2026-08-09 (Pacific/Honolulu)  
**Source policy:** authoritative City guidance first.

## Purpose

This register identifies the public sources from which V1 disposal records are derived.

The application is an independent civic-tech pilot. ENV remains the authority; this dataset is a structured interpretation of ENV's published resident guidance.

## Source precedence

1. Current item-specific ENV guidance.
2. Current resident drop-off rules for preparation, quantity, and prohibited-item refinements.
3. Current facility page for facility-specific acceptance and hours.
4. General ENV “How to Dispose” guidance for broader context/fallback.
5. If two sources differ only in specificity, preserve both and use the more specific rule.
6. If authoritative sources materially conflict and cannot be reconciled, do **not** guess; flag the record and direct the resident to ENV.

## Registered sources

| ID | Source | Primary use | Verified | URL |
|---|---|---|---|---|
| SRC-001 | How to Dispose of Trash | General item-by-item disposal guidance and fallback resident reference. | 2026-08-09 | https://www.honolulu.gov/env/ref/how-to-dispose-of-trash/ |
| SRC-002 | Waste Drop-Off Locations | Facility addresses, hours, accepted-item lists, resident delivery rules, WGSL and composting facility. | 2026-08-09 | https://www.honolulu.gov/env/ref/waste-drop-off-locations/ |
| SRC-003 | Waste Drop-Off Rules — Residents | Specific resident preparation, load, size, battery, tire, compressed-gas, concrete, metal, and prohibited-item rules. | 2026-08-09 | https://www.honolulu.gov/env/ref/waste-drop-off-rules-residents/ |
| SRC-004 | Household Hazardous Waste (HHW) | HHW classification, appointment process, safety guidance, and disposal-method distinctions. | 2026-08-09 | https://www.honolulu.gov/env/ref/hhw-2/ |
| SRC-005 | Other Household Hazardous Waste | Current appointment-only event rules, listed HHW materials, registration limits. | 2026-08-09 | https://www.honolulu.gov/env/ref/other-hhw/ |
| SRC-006 | Batteries (HHW) | Battery-type-specific disposal rules, including embedded batteries. | 2026-08-09 | https://www.honolulu.gov/env/ref/batteries-hhw/ |
| SRC-007 | E-Waste Recycling | Household e-waste options, battery/electronics guidance, City-referenced external recyclers. | 2026-08-09 | https://www.honolulu.gov/env/ref/e-waste-recycling/ |
| SRC-008 | E-Waste Recycling at City Disposal Sites | Acceptable and unacceptable materials for City e-waste bins at convenience centers and transfer stations. | 2026-08-09 | https://www.honolulu.gov/env/city-ewaste-dropbins/ |
| SRC-009 | Medications / Sharps / Needles (HHW) | Medication drop-box/take-back guidance. | 2026-08-09 | https://www.honolulu.gov/env/ref/medications-sharps-needles-hhw/ |
| SRC-010 | Paints (HHW) | Paint-type-specific disposal rules. | 2026-08-09 | https://www.honolulu.gov/env/ref/paints-hhw/ |
| SRC-011 | Propane (HHW) | Propane/butane/MAPP City drop-off rules and Keʻehi exclusion. | 2026-08-09 | https://www.honolulu.gov/env/ref/propane-hhw/ |
| SRC-012 | Motor Oil / Filter (HHW) | Motor oil absorption/trash rule and mixed oil/gas distinction. | 2026-08-09 | https://www.honolulu.gov/env/ref/motor-oil-filter-hhw/ |
| SRC-013 | Oʻahu Christmas Tree Disposal | Natural Christmas tree curbside preparation and whole-tree drop-off guidance. | 2026-08-09 | https://www.honolulu.gov/env/ref/christmas-tree-disposal/ |
| SRC-014 | Holiday Opala Alerts | Current natural-tree facility exclusions and bulky-appointment limitation. | 2026-08-09 | https://www.honolulu.gov/env/ref/holiday-opala-alerts/ |
| SRC-015 | ENV Frequently Asked Questions | Current bulky-item appointment guidance and household e-waste context. | 2026-08-09 | https://www.honolulu.gov/env/ref/faq-accordion/ |
| SRC-016 | ENV Contact Information | Official escalation contacts for collection, disposal, HHW, and recycling questions. | 2026-08-09 | https://www.honolulu.gov/env/ref/contact-information/ |

## Source types

### Stable-ish policy sources
Examples:
- item-specific disposal pages;
- resident rules;
- battery rules.

They are still re-verified before release because City policy can change.

### Dynamic operational sources
Examples:
- HHW event status/capacity;
- holiday information;
- third-party recycler lists.

V1 should link to these sources rather than hard-code short-lived event dates or availability as permanent rules.

## Provenance requirement

Every canonical V1 item record contains:

- one or more `source_ids`;
- a `verified_on` date;
- a resident-facing next action;
- any applicable preparation/restrictions;
- eligible facility IDs only when supported by source evidence.

A record without source provenance is not releaseable.

## Material source-reconciliation decisions

### Concrete / rock / dirt
The general “How to Dispose” page points residents to WGSL. The more specific resident-rules page also permits dirt/rock/sand/concrete/tile/asphalt/non-combustible waste at Kapaʻa Transfer Station, limited to five 5-gallon buckets per day, while WGSL permits up to two standard pickup-truck loads per day.

**Dataset decision:** include both Kapaʻa and WGSL and preserve both source IDs.

### Electronics
The general e-waste page describes multiple household disposal/recycling choices, while the City e-waste-bin page specifically lists which items can use the City's recycling bins.

**Dataset decision:** computers/laptops and TVs/monitors may use the City e-waste-bin facility set; cell phones are not routed to those bins because the City e-waste-bin page explicitly excludes mobile telephones.

### Embedded batteries
ENV separately routes non-removable batteries/devices to HHW and/or e-waste-recycler options.

**Dataset decision:** a battery problem involving a laptop/device requires clarification between standalone/removed and embedded/non-removable rather than guessing.

## Phase 3 decision

The registered sources are sufficient to support the frozen 25-topic V1 corpus.

No unresolved authoritative-source conflict currently blocks Technical Design.
