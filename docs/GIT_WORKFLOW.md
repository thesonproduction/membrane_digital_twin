# Contributing Guide

## 1. Main Rule

The `main` branch is protected.

No developer is allowed to push code directly to `main`.

All changes must be made through a feature branch and submitted as a Pull Request. The Pull Request must be reviewed and approved before merging into `main`.

## 2. Branch Naming Convention

Use the following branch naming format:

```text
<type>/<task-id>-short-description
```

Examples:

```text
feature/BE-01-health-api
feature/FE-02-upload-csv-page
feature/AI-01-model-based-baseline
fix/BE-03-upload-validation-error
docs/update-api-contract
refactor/prediction-service
```

Allowed branch types:

```text
feature  - new feature
fix      - bug fix
docs     - documentation update
refactor - code restructuring without changing behavior
test     - adding or updating tests
chore    - project setup, config, dependency update
```

## 3. Workflow

### Step 1: Update local main

Before starting a new task, always update your local `main` branch.

```bash
git checkout main
git pull origin main
```

### Step 2: Create a new branch

Create a new branch from the latest `main`.

```bash
git checkout -b feature/BE-01-health-api
```

### Step 3: Work on the task

Make changes only related to the assigned task.

Do not mix multiple unrelated tasks in one branch.

For example, do not combine:

```text
- upload CSV API
- dashboard UI
- PINNs model change
```

in the same Pull Request.

### Step 4: Commit changes

Use clear commit messages.

Recommended format:

```text
<type>: short description
```

Examples:

```bash
git commit -m "feature: add health check API"
git commit -m "fix: validate required CSV columns"
git commit -m "docs: update API contract for prediction endpoint"
```

### Step 5: Push branch

```bash
git push origin feature/BE-01-health-api
```

### Step 6: Create Pull Request

Open a Pull Request from your branch into `main`.

The Pull Request title should follow this format:

```text
[Task ID] Short description
```

Examples:

```text
[BE-01] Add health check API
[FE-02] Add CSV upload page
[AI-01] Add model-based baseline
```

### Step 7: Wait for review

Do not merge your own Pull Request.

The project lead must review the Pull Request before it is merged.

A Pull Request can only be merged when:

```text
1. The code matches the assigned task.
2. The code does not break the architecture rules.
3. The API contract is not changed without approval.
4. The application can run locally.
5. There are no unrelated changes.
6. Review comments have been resolved.
```

## 4. Pull Request Checklist

Before requesting review, make sure:

```text
[ ] I created this branch from the latest main.
[ ] I only changed files related to this task.
[ ] I did not push directly to main.
[ ] I followed the project architecture.
[ ] I did not put model/PINNs logic inside FastAPI routes.
[ ] I did not put backend logic inside React components.
[ ] I updated documentation if the API or architecture changed.
[ ] I tested the feature locally.
[ ] I added screenshots or logs if relevant.
```

## 5. Architecture Rules

The following rules must be respected:

```text
1. Frontend only handles UI and API calls.
2. Backend routes only receive requests and return responses.
3. Business logic must be placed in the service layer.
4. Membrane physics, model-based logic, PINNs, hybrid models, simulation, and digital twin logic must be placed in membrane_core.
5. Training code must be separated from inference API.
6. API request and response formats must follow API_CONTRACT.md.
```

## 6. When Documentation Must Be Updated

Update documentation when you change:

```text
- API input/output
- project structure
- model interface
- database schema
- architecture rules
- setup instructions
- environment variables
```

Relevant documentation files:

```text
README.md
docs/ARCHITECTURE.md
docs/API_CONTRACT.md
docs/ROADMAP.md
docs/ADR/
```

## 7. When an ADR Is Required

Do not create an ADR for every task.

Create an ADR only when the team makes an important architecture decision, such as:

```text
- choosing FastAPI instead of Django
- choosing PostgreSQL instead of MongoDB
- separating membrane_core from backend
- changing model serving strategy
- adding a task queue
- changing deployment architecture
```

## 8. Prohibited Actions

The following actions are not allowed:

```text
- pushing directly to main
- force pushing to main
- merging without review
- changing API contract without discussion
- mixing unrelated tasks in one Pull Request
- committing large data files or model checkpoints without approval
- hard-coding local file paths
- committing secrets, tokens, passwords, or API keys
```

## 9. Large Files

Do not commit large files such as:

```text
- raw datasets
- trained checkpoints
- experiment outputs
- generated plots
- temporary files
```

Use the approved data or artifact storage location instead.

## 10. Review Authority

The project lead is responsible for final review and merge approval.

If a Pull Request affects architecture, API contract, model interface, or database schema, it must be reviewed carefully before merging.
