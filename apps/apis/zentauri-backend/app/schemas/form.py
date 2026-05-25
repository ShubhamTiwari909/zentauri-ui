from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class FormCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=32)
    subject: str = Field(min_length=2, max_length=160)
    message: str = Field(min_length=10, max_length=5000)

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    @field_validator("name", "subject", "message")
    @classmethod
    def reject_blank_text(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Field cannot be blank.")
        return value

    @field_validator("phone")
    @classmethod
    def normalize_phone(cls, value: str | None) -> str | None:
        if value is None:
            return value
        stripped = value.strip()
        return stripped or None


class FormResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str | None = None
    subject: str
    message: str
    created_at: datetime
    updated_at: datetime


class FormListResponse(BaseModel):
    items: list[FormResponse]
    total: int
    page: int
    page_size: int
    pages: int

