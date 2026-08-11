# ADR-002 — React + TypeScript + Vite

**Status:** Accepted  
**Date:** 2026-08-09

## Context
V1 needs a small interactive state machine and testable components but no full-stack framework.

## Decision
Use React, TypeScript strict mode, and Vite.

## Consequences
- conventional component architecture;
- strong type checking;
- static production output;
- straightforward Vitest/Testing Library integration.

## Rejected
### Plain JavaScript
Less useful static verification for ID-heavy domain structures.

### Full-stack React framework
Server-side capabilities are unnecessary for V1.
