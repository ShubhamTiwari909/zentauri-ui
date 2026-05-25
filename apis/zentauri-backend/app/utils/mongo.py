from typing import Any

from app.schemas.form import FormResponse


def serialize_form_document(document: dict[str, Any]) -> FormResponse:
    return FormResponse(
        id=str(document["_id"]),
        name=document["name"],
        email=document["email"],
        phone=document.get("phone"),
        subject=document["subject"],
        message=document["message"],
        created_at=document["created_at"],
        updated_at=document["updated_at"],
    )

