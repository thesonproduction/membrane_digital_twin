# membrane_digital_twin\backend\app\api\routes\health.py


from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["Health"])

@router.get("/")
def health_check():
    return {
        "status": "OK",
        "service": "membrane-digital-twin-api"
    }