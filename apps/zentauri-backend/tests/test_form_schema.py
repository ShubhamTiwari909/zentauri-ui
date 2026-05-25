import pytest
from pydantic import ValidationError

from app.schemas.form import FormCreate


def test_form_create_accepts_valid_payload() -> None:
    payload = FormCreate(
        name="Jane Doe",
        email="jane@example.com",
        subject="Demo request",
        message="I would like to learn more about Zentauri.",
    )

    assert payload.name == "Jane Doe"
    assert payload.phone is None


def test_form_create_rejects_invalid_email() -> None:
    with pytest.raises(ValidationError):
        FormCreate(
            name="Jane Doe",
            email="not-an-email",
            subject="Demo request",
            message="I would like to learn more about Zentauri.",
        )


def test_form_create_rejects_extra_fields() -> None:
    with pytest.raises(ValidationError):
        FormCreate(
            name="Jane Doe",
            email="jane@example.com",
            subject="Demo request",
            message="I would like to learn more about Zentauri.",
            unexpected="value",
        )

