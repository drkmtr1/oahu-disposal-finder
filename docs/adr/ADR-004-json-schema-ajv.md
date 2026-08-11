# ADR-004 — JSON Schema + Ajv Data Validation

**Status:** Accepted  
**Date:** 2026-08-09

## Context
Phase 3 produced a structured JSON dataset and JSON Schema.

## Decision
Keep JSON Schema as the data structural contract and use Ajv in a build/CI validation script.

Add custom validation for referential integrity and frozen-scope rules.

## Required custom checks
- exactly 25 topics;
- unique IDs;
- unique direct aliases;
- valid source references;
- valid facility references;
- valid clarification references;
- mandatory provenance;
- permitted URL protocols.

## Consequence
Invalid civic data fails the quality gate before deployment.
