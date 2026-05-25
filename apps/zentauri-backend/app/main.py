from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.database import database
from app.core.exceptions import rate_limit_exception_handler
from app.core.middleware import add_application_middleware
from app.core.rate_limit import limiter


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    await database.connect()
    try:
        yield
    finally:
        await database.close()


app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
    version="0.1.0",
    lifespan=lifespan,
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_exception_handler)
app.add_middleware(SlowAPIMiddleware)

add_application_middleware(app)
app.include_router(api_router, prefix=settings.api_v1_prefix)


@app.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok", "environment": settings.app_env}

