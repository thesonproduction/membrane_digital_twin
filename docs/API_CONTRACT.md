# API Contract

## 1. Health API

### GET /health/

Response:

{
  "status": "ok",
  "service": "membrane-digital-twin-api"
}

---

## 2. Experiment API

### POST /experiments/upload

Purpose:

Upload membrane experiment CSV file.

Input:

- CSV file

Expected CSV columns:

- time
- feed_pressure
- permeate_pressure
- flow_rate
- temperature
- feed_concentration
- recovery
- flux

Response:

{
  "experiment_id": "EXP_001",
  "filename": "sample.csv",
  "n_rows": 1200,
  "status": "uploaded"
}

---

## 3. Prediction API

### POST /prediction/run

Request:

{
  "experiment_id": "EXP_001",
  "model_type": "model_based",
  "input": {
    "feed_pressure": 4.2,
    "flow_rate": 1.5,
    "temperature": 28.0,
    "feed_concentration": 1200
  }
}

Response:

{
  "experiment_id": "EXP_001",
  "model_type": "model_based",
  "prediction": {
    "recovery": 0.43,
    "flux": 35.2,
    "pressure_drop": 0.81
  }
}

---

## 4. Simulation API

### POST /simulation/run

Request:

{
  "experiment_id": "EXP_001",
  "scenario": {
    "feed_pressure": 5.0,
    "flow_rate": 1.8,
    "temperature": 30.0
  }
}

Response:

{
  "simulation_id": "SIM_001",
  "result": {
    "recovery": 0.46,
    "flux": 37.5,
    "fouling_risk": "medium"
  }
}