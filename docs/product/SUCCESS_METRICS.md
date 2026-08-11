# SUCCESS_METRICS.md

# Oʻahu Household-Item Disposal Finder — Success Metrics

The project has two different definitions of success:

1. **Version 1.0 engineering/release success**
2. **Formative product-performance evidence**

They must not be conflated.

A technically complete V1 can demonstrate disciplined product development even before a statistically meaningful population study exists.

---

# 1. Version 1.0 Release Metrics

These metrics are release gates.

## SM-001 — Must-Have requirement completion

**Measure:** PR-001 through PR-025 satisfied.

**Target:** 100%

**Release rule:**  
Any unresolved Must-Have requirement blocks V1 completion.

---

## SM-002 — Canonical topic coverage

**Measure:** frozen canonical topics fully represented in production data.

**Target:** 25 / 25

A topic is complete only when all required structured fields are present.

---

## SM-003 — Provenance completeness

**Measure:** canonical topics with authoritative source organization, page title, URL, and verification date.

**Target:** 100%

**Release rule:**  
A disposal topic without provenance cannot ship.

---

## SM-004 — Manual authoritative verification

**Measure:** canonical topics manually checked against the authoritative source immediately before V1 release.

**Target:** 25 / 25

**Release rule:**  
No known incorrect disposal instruction may remain.

---

## SM-005 — Facility-mapping correctness

**Measure:** frozen item-to-City-facility eligibility mappings that agree with the reviewed authoritative source.

**Target:** 100% of frozen mappings

This includes both eligible and explicitly ineligible cases.

---

## SM-006 — Frozen alias correctness

**Measure:** defined aliases resolving to the intended canonical topic or clarification flow.

**Target:** 100%

Alias inventory is finalized during Data Foundation.

---

## SM-007 — Five acceptance scenarios

**Measure:** existing five scenarios successfully completed through V1.

**Target:** 5 / 5

Scenarios:

1. swollen laptop lithium-ion battery;
2. old propane tank;
3. leftover latex paint;
4. mattress;
5. concrete pieces.

Success means the application produces a source-backed next action without invented policy.

---

## SM-008 — Automated test status

**Measure:** project automated test suite.

**Target:** 100% passing on the release commit.

No arbitrary code-coverage percentage is required for V1. Tests should instead cover the deterministic domain behaviors that could cause incorrect disposal guidance.

---

## SM-009 — Static quality checks

**Measure:** configured lint and type checks.

**Target:** 100% passing.

---

## SM-010 — Accessibility release review

**Measure:** core user flow reviewed against the project's WCAG 2.2 Level AA target.

**Target:**

- no known release-blocking WCAG 2.2 AA failure in the core flow;
- automated accessibility checks pass for covered screens;
- manual keyboard navigation succeeds;
- visible focus is present;
- labels/names and reading order are verified;
- mobile zoom/reflow is usable.

**Important:**  
Automated tools alone do not prove WCAG conformance.

---

## SM-011 — Responsive completion

**Measure:** core task manually verified at representative phone and desktop viewport sizes.

**Target:** 100% of the core flow usable without required horizontal scrolling.

---

## SM-012 — Production availability

**Measure:** validated application publicly reachable by HTTPS.

**Target:** 1 production deployment with successful smoke test.

---

## SM-013 — Documentation completeness

**Measure:** required project/documentation artifacts complete.

**Target:** 100% of V1-required documentation present and consistent with the shipped system.

---

# 2. Product Outcome Metrics — Formative Evaluation

These metrics are evaluated after a functional V1 exists.

They are intended to determine whether the product appears to improve the resident task.

A small 8–10-person test is **formative**, not statistically representative of Oʻahu.

---

## PM-001 — Task completion

**Question:**  
Can the participant reach a disposal answer?

**Measure:**  
Completed tasks / attempted tasks.

**Desired direction:**  
V1 should be at least as high as the current information environment.

Any systematic V1 failure on one scenario requires investigation.

---

## PM-002 — Answer correctness

**Question:**  
Did the participant arrive at the authoritative disposal pathway?

**Measure:**  
Correct answers / completed attempts.

**Desired direction:**  
V1 should not reduce correctness.

**Strong V1 signal:**  
Approximately 90%+ correct across task attempts, while recognizing the small-sample limitation.

Correctness takes priority over speed.

---

## PM-003 — Facility-selection correctness

**Question:**  
When a physical location is required, did the participant select an eligible facility/process?

**Measure:**  
Correct facility/process selections / facility-required tasks.

**Desired direction:**  
V1 should outperform or equal the current environment.

**Strong V1 signal:**  
Approximately 90%+ correct in the small formative sample.

---

## PM-004 — Time to answer

**Question:**  
How long does the participant need to reach the correct next action?

**Measure:**  
Median completion time by scenario and environment.

**Desired direction:**  
V1 median time is lower for most scenarios.

**Directional target:**  
Lower median time in at least 4 of the 5 scenarios.

Do not overinterpret small differences with a small sample.

---

## PM-005 — Information-navigation burden

**Question:**  
How many distinct pages/sources must the resident actively consult before reaching an answer?

**Measure:**  
Pages/sources opened before decision.

**V1 design target:**  
The resident can obtain the actionable answer from one V1 result view; the official source remains available for verification.

This measures interface consolidation, not whether the resident chooses to inspect the official source.

---

## PM-006 — Source awareness

**Question:**  
Does the participant understand where the disposal information came from?

**Measure:**  
Participant can identify City/ENV as the authoritative underlying source after completing the task.

**Directional target:**  
At least 80% in the formative test.

---

## PM-007 — Confidence

**Question:**  
How confident is the participant that they know the next legal/practical action?

**Measure:**  
Simple consistent post-task rating.

**Desired direction:**  
Higher median confidence with V1 than in the current information environment.

Confidence without correctness is not success.

---

## PM-008 — Observed confusion

**Question:**  
Where does the participant hesitate, backtrack, misunderstand a restriction, or select an incorrect branch?

**Measure:**  
Facilitator observations by scenario.

**Target:**  
No repeated severe confusion pattern that causes incorrect disposal behavior.

This is qualitative and diagnostic rather than statistical.

---

## PM-009 — Accessibility/usability defects

**Question:**  
Does testing expose a barrier that prevents or materially impairs task completion?

**Measure:**  
Observed defects categorized by severity.

**Target before declaring the evaluated build stable:**

- 0 unresolved critical task-blocking defects;
- severe issues fixed or explicitly documented.

---

# 3. What We Will Not Use as V1 Success Metrics

V1 will not claim success based on:

- number of registered users;
- account growth;
- social engagement;
- ad metrics;
- illegal-dumping reduction;
- City adoption;
- statewide usage;
- population-level behavioral change;
- machine-learning accuracy;
- revenue.

These are outside the pilot's objective.

---

# 4. Decision Framework After Formative Testing

## Strong positive signal

Proceed to a post-V1 improvement cycle only if there is a clear reason to do so, for example:

- correctness is maintained/improved;
- task time clearly decreases;
- facility-selection errors decrease;
- participants understand the source;
- no major accessibility/usability barrier emerges.

## Mixed signal

Investigate the specific failing scenario or interaction.

Do not automatically add features.

## Negative signal

If V1 consistently causes incorrect answers or greater confusion:

1. stop expansion;
2. identify whether the cause is data, product logic, wording, or interaction design;
3. correct the core flow;
4. retest the affected scenario.

---

# 5. Portfolio Success Definition

For the primary purpose of this civic-tech pilot, the project succeeds when it can credibly demonstrate:

> A real public-information problem was identified, bounded with evidence, converted into source-backed requirements, implemented with deterministic logic and provenance, tested, reviewed for accessibility, deployed, documented, and deliberately completed as Version 1.0.

That success claim does not require claiming population-level impact.
