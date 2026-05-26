from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Query, Request, status
from motor.motor_asyncio import AsyncIOMotorCollection

from app.core.config import settings
from app.core.database import get_contact_form_collection
from app.core.rate_limit import limiter
from app.repositories.contact_us import ContactFormRepository
from app.schemas.form import FormCreate, FormListResponse, FormResponse

router = APIRouter()


def get_contact_form_repository(
    collection: Annotated[AsyncIOMotorCollection, Depends(get_contact_form_collection)],
) -> ContactFormRepository:
    return ContactFormRepository(collection)


def form_payload(
    name: Annotated[str, Form(min_length=2, max_length=100)],
    email: Annotated[str, Form(max_length=254)],
    subject: Annotated[str, Form(min_length=2, max_length=160)],
    message: Annotated[str, Form(min_length=10, max_length=5000)],
    phone: Annotated[str | None, Form(max_length=32)] = None,
) -> FormCreate:
    return FormCreate(
        name=name,
        email=email,
        phone=phone,
        subject=subject,
        message=message,
    )


@router.post("", response_model=FormResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit(settings.rate_limit_form_create)
async def create_form_submission(
    request: Request,
    payload: Annotated[FormCreate, Depends(form_payload)],
    repository: Annotated[ContactFormRepository, Depends(get_contact_form_repository)],
) -> FormResponse:
    del request
    return await repository.create(payload)


@router.get("", response_model=FormListResponse)
async def list_form_submissions(
    repository: Annotated[ContactFormRepository, Depends(get_contact_form_repository)],
    page: Annotated[int, Query(ge=1)] = 1,
    page_size: Annotated[int, Query(ge=1, le=100)] = 20,
) -> FormListResponse:
    return await repository.list(page=page, page_size=page_size)


@router.get("/{form_id}", response_model=FormResponse)
async def get_form_submission(
    form_id: str,
    repository: Annotated[ContactFormRepository, Depends(get_contact_form_repository)],
) -> FormResponse:
    submission = await repository.get_by_id(form_id)
    if submission is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Form submission was not found.",
        )
    return submission

