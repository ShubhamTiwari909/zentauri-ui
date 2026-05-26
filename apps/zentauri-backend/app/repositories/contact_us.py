from datetime import UTC, datetime

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorCollection

from app.schemas.form import FormCreate, FormListResponse, FormResponse
from app.utils.mongo import serialize_form_document


class ContactFormRepository:
    def __init__(self, collection: AsyncIOMotorCollection) -> None:
        self.collection = collection

    async def create(self, payload: FormCreate) -> FormResponse:
        now = datetime.now(UTC)
        document = payload.model_dump() # This converts the FormCreate Pydantic object into a normal Python dictionary.
        document["created_at"] = now
        document["updated_at"] = now

        result = await self.collection.insert_one(document)
        created = await self.collection.find_one({"_id": result.inserted_id})
        if created is None:
            raise RuntimeError("Unable to read form submission after insert.")

        # This converts the MongoDB document into a FormResponse.
        # # MongoDB documents usually have _id as an ObjectId, which cannot be directly returned as JSON.
        return serialize_form_document(created)

    async def list(self, page: int, page_size: int) -> FormListResponse:
        skip = (page - 1) * page_size
        total = await self.collection.count_documents({})
        cursor = (
            self.collection.find({})
            .sort("created_at", -1)
            .skip(skip)
            .limit(page_size)
        )
        items = [serialize_form_document(document) async for document in cursor]
        pages = (total + page_size - 1) // page_size if total else 0
        return FormListResponse(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            pages=pages,
        )

    async def get_by_id(self, form_id: str) -> FormResponse | None:
        if not ObjectId.is_valid(form_id):
            return None

        document = await self.collection.find_one({"_id": ObjectId(form_id)})
        if document is None:
            return None
        return serialize_form_document(document)

