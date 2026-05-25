from functools import lru_cache

from pydantic import Field, MongoDsn
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Zentauri Backend"
    app_env: str = "development"
    debug: bool = False
    api_v1_prefix: str = "/api/v1"

    mongodb_uri: MongoDsn | str = "mongodb://localhost:27017"
    mongodb_db_name: str = "zentauri_backend"
    mongodb_forms_collection: str = "form_submissions"

    allowed_origins: list[str] = Field(
        default_factory=lambda: ["http://localhost:3000", "http://localhost:3001"]
    )
    allowed_hosts: list[str] = Field(default_factory=lambda: ["localhost", "127.0.0.1"])
    rate_limit_default: str = "100/minute"
    rate_limit_form_create: str = "10/minute"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
