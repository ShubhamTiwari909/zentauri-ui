"""Endpoint smoke tests for the contact-us API.

These run without a real MongoDB: the repository dependency is overridden with an
in-memory fake, and the rate limiter is disabled. TestClient is constructed
without the `with` context manager so the app lifespan (which would connect to
MongoDB) never runs.
"""

from collections.abc import Iterator
from datetime import UTC, datetime

import pytest
from fastapi.testclient import TestClient

from app.api.v1.routes.contact_us import get_contact_form_repository
from app.core.config import settings
from app.core.rate_limit import limiter
from app.schemas.form import FormCreate, FormListResponse, FormResponse
from main import app

PREFIX = f"{settings.api_v1_prefix}/contact-us"

VALID_PAYLOAD = {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Demo request",
    "message": "I would like to learn more about Zentauri.",
}


class FakeContactFormRepository:
    """Minimal in-memory stand-in for ContactFormRepository."""

    def __init__(self) -> None:
        self._items: list[FormResponse] = []

    async def create(self, payload: FormCreate) -> FormResponse:
        now = datetime.now(UTC)
        record = FormResponse(
            id=str(len(self._items) + 1),
            created_at=now,
            updated_at=now,
            **payload.model_dump(),
        )
        self._items.append(record)
        return record

    async def list(self, page: int, page_size: int) -> FormListResponse:
        total = len(self._items)
        newest_first = list(reversed(self._items))
        start = (page - 1) * page_size
        items = newest_first[start : start + page_size]
        pages = (total + page_size - 1) // page_size if total else 0
        return FormListResponse(
            items=items, total=total, page=page, page_size=page_size, pages=pages
        )

    async def get_by_id(self, form_id: str) -> FormResponse | None:
        return next((item for item in self._items if item.id == form_id), None)


@pytest.fixture
def client() -> Iterator[TestClient]:
    repo = FakeContactFormRepository()
    app.dependency_overrides[get_contact_form_repository] = lambda: repo
    limiter.enabled = False
    try:
        # base_url host must be in settings.allowed_hosts (TrustedHostMiddleware).
        yield TestClient(app, base_url="http://localhost")
    finally:
        app.dependency_overrides.pop(get_contact_form_repository, None)
        limiter.enabled = True


def test_health_check_reports_ok(client: TestClient) -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_create_submission_returns_201_with_id(client: TestClient) -> None:
    response = client.post(PREFIX, data=VALID_PAYLOAD)
    assert response.status_code == 201
    body = response.json()
    assert body["id"]
    assert body["email"] == VALID_PAYLOAD["email"]
    assert body["phone"] is None


def test_create_rejects_missing_required_field(client: TestClient) -> None:
    payload = {k: v for k, v in VALID_PAYLOAD.items() if k != "message"}
    response = client.post(PREFIX, data=payload)
    assert response.status_code == 422


def test_create_rejects_message_below_minimum_length(client: TestClient) -> None:
    response = client.post(PREFIX, data={**VALID_PAYLOAD, "message": "too short"})
    assert response.status_code == 422


def test_list_paginates_submissions(client: TestClient) -> None:
    for i in range(3):
        created = client.post(
            PREFIX, data={**VALID_PAYLOAD, "subject": f"Request {i}"}
        )
        assert created.status_code == 201

    response = client.get(PREFIX, params={"page": 1, "page_size": 2})
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 3
    assert body["page"] == 1
    assert body["page_size"] == 2
    assert body["pages"] == 2
    assert len(body["items"]) == 2


def test_get_unknown_submission_returns_404(client: TestClient) -> None:
    response = client.get(f"{PREFIX}/does-not-exist")
    assert response.status_code == 404
