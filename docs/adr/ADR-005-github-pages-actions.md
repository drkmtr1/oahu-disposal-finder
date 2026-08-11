# ADR-005 — GitHub Pages + GitHub Actions Deployment

**Status:** Accepted  
**Date:** 2026-08-09

## Context
V1 produces static assets and is intended as a public, reviewable portfolio project.

## Decision
Use GitHub Actions for CI/CD and GitHub Pages for production hosting.

## Deployment policy
Only a build that passes data validation, lint, type checking, tests, and production build checks is eligible for deployment.

## Consequences
- repository and deployment history stay connected;
- no application server is operated;
- Pages constraints are acceptable for this small static product.

## Revisit if
A future requirement introduces a backend, runtime secrets, dynamic write operations, or server-controlled HTTP behavior that GitHub Pages cannot satisfy.
