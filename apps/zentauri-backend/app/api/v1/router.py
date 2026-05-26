from fastapi import APIRouter

from app.api.v1.routes.contact_us import router as forms_router

api_router = APIRouter()
api_router.include_router(forms_router, prefix="/contact-us", tags=["contact-us"])

