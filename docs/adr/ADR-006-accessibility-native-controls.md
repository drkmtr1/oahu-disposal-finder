# ADR-006 — Native Semantic Controls First

**Status:** Accepted  
**Date:** 2026-08-09

## Context
Accessibility is a Must-Have V1 requirement and the UI is small.

## Decision
Prefer native HTML semantics and repository-owned CSS over a UI component framework.

Examples:
- `<form>`
- `<label>`
- `<input>`
- `<button>`
- `<fieldset>` / `<legend>` when appropriate
- headings/lists/links

Use ARIA only where native semantics do not express the needed relationship/state.

## Consequences
- less custom interaction code;
- easier keyboard behavior;
- easier accessibility inspection;
- fewer UI dependencies.

## Rejected
A large component library solely for visual convenience.
