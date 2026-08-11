# ADR-003 — Deterministic Search Resolution

**Status:** Accepted  
**Date:** 2026-08-09

## Context
Broad terms can map to materially different official disposal rules.

## Decision
Use:

```text
normalize
→ exact canonical name
→ exact alias
→ exact clarification trigger
→ no-match
```

No fuzzy algorithm may automatically select a disposal result.

## Consequences
- every answer is auditable;
- all routing can be exhaustively tested;
- aliases must be maintained deliberately;
- unsupported wording may produce no-match more often than fuzzy search.

That tradeoff is acceptable because correctness outranks search cleverness in V1.

## Future
Type-ahead suggestions may be added without changing the rule that the final policy route is explicit/deterministic.
