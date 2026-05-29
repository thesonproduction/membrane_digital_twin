# ADR-002: Separate membrane_core from Backend

## Status

Accepted

## Context

The project contains physics equations, model-based models, PINNs models, hybrid models, preprocessing, and digital twin logic. If these are placed directly inside FastAPI routes, the backend will become hard to maintain.

## Decision

Create a separate membrane_core package for all domain, physics, model, and simulation logic.

## Consequences

- Backend remains clean.
- Model logic can be tested independently.
- Future models can be added without changing API routes too much.