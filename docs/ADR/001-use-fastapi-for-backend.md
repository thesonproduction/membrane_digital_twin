# ADR-001: Use FastAPI for Backend

## Status

Accepted

## Context

The project needs a Python backend to serve API endpoints for data upload, prediction, simulation, and digital twin state management. The AI models are implemented in Python/PyTorch.

## Decision

Use FastAPI as the backend framework.

## Consequences

- Easy integration with Python AI models.
- Automatic API documentation.
- Suitable for REST API and model inference.
- Django may be added later only if admin/CRUD requirements become complex.