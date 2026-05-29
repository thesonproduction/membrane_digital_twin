# Membrane Digital Twin

Membrane Digital Twin is a web project for building a digital twin workflow for membrane/RO train systems. The current MVP target is an offline CSV-based application with a FastAPI backend, React/Vite frontend, and separated modeling logic in `membrane_core`.

## Current Status

The repository structure is suitable as a real application foundation:

- `backend/`: FastAPI application. Currently exposes a health-check API.
- `frontend/`: React + Vite application. Currently checks backend connectivity.
- `membrane_core/`: core domain logic for preprocessing, model-based methods, PINNs, ensemble methods, and simulation.
- `ml_pipeline/`: model training/evaluation/register scripts.
- `data/`: local data workspace. Raw/processed data should not be committed.
- `docs/`: architecture, API contract, roadmap, coding standard, and ADR documents.

The project is still at the foundation/MVP stage. Upload, prediction, and simulation APIs are documented in `docs/API_CONTRACT.md` but are not fully implemented yet.

## Folder Structure

```text
membrane_digital_twin/
├── backend/
│   ├── app/
│   │   ├── api/routes/
│   │   ├── database/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── config.py
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── membrane_core/
│   ├── ensemble_method/
│   ├── model_base/
│   ├── pinns_membrane/
│   └── preprocessing/
├── ml_pipeline/
├── data/
├── docs/
└── readme.md
```

## Requirements

- Python 3.10+
- Node.js 20+
- npm

## Run Backend

From the project root:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies and start the API:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check:

```text
http://localhost:8000/health/
```

Swagger UI:

```text
http://localhost:8000/docs
```

## Run Frontend

Open another terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

By default, the frontend calls:

```text
http://localhost:8000
```

To override the backend URL, create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Existing API

### GET `/health/`

Response:

```json
{
  "status": "OK",
  "service": "membrane-digital-twin-api"
}
```

Planned APIs are described in `docs/API_CONTRACT.md`:

- `POST /experiments/upload`
- `POST /prediction/run`
- `POST /simulation/run`

## Architecture Rules

- Frontend handles UI and API calls only.
- Backend validates requests and coordinates services.
- Physics, preprocessing, model-based logic, PINNs, ensemble logic, and simulation belong in `membrane_core`.
- Training, evaluation, and model registration belong in `ml_pipeline`.
- API request/response contracts should be represented with schemas in `backend/app/schemas`.

## Pre-Push Checks

```bash
git status
```

Frontend:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
python -m compileall app
```

## Documentation

- `docs/ARCHITECTURE.md`: system architecture.
- `docs/API_CONTRACT.md`: API contract.
- `docs/ROADMAP.md`: development roadmap.
- `docs/CODING_STANDARD.md`: coding standard.
- `docs/ADR/`: architecture decision records.
