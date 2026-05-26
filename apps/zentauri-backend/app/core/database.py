from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection, AsyncIOMotorDatabase
import certifi

from app.core.config import settings


class MongoDatabase:
    def __init__(self) -> None:
        self._client: AsyncIOMotorClient | None = None
        self._database: AsyncIOMotorDatabase | None = None

    async def connect(self) -> None:
        self._client = AsyncIOMotorClient(
            str(settings.mongodb_uri),
            serverSelectionTimeoutMS=5000,
            tlsCAFile=certifi.where(),
        )
        self._database = self._client[settings.mongodb_db_name]
        await self.contact_form.create_index("email")
        await self.contact_form.create_index("created_at")

    async def close(self) -> None:
        if self._client is not None:
            self._client.close()
        self._client = None
        self._database = None

    @property
    def db(self) -> AsyncIOMotorDatabase:
        if self._database is None:
            raise RuntimeError("MongoDB connection has not been initialized.")
        return self._database

    @property
    def contact_form(self) -> AsyncIOMotorCollection:
        return self.db[settings.mongodb_contact_form_collection]


database = MongoDatabase()


def get_contact_form_collection() -> AsyncIOMotorCollection:
    return database.contact_form
