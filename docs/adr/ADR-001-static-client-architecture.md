# ADR-001 — Static Client-Side Architecture

**Status:** Accepted  
**Date:** 2026-08-09

## Context
V1 reads a small, versioned, public JSON dataset and performs deterministic lookup. It has no accounts, writes, secrets, payments, personalization, or required live API.

## Decision
Build V1 as a static browser application with no application backend.

## Consequences

### Positive
- fewer deployment components;
- no server/database attack surface;
- no runtime secret management;
- core lookup works without a live City API;
- cheap/simple hosting;
- easier portfolio review.

### Negative
- data freshness requires a new build/deployment;
- no server-controlled personalization;
- no live City status unless a future architecture change adds it.

## Rejected
Backend/API + database.

Reason: solves no frozen V1 requirement.
