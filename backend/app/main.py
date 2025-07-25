from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.auth import routes as auth_routes
from app.api.v1.admin import routes as admin_routes
from app.api.v1.manager import routes as manager_routes
from app.api.v1.runner import routes as runner_routes

app = FastAPI(title=settings.PROJECT_NAME)

# Include routes
app.include_router(auth_routes.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(admin_routes.router, prefix=f"{settings.API_V1_STR}/admin", tags=["admin"])
app.include_router(manager_routes.router, prefix=f"{settings.API_V1_STR}/manager", tags=["manager"])
app.include_router(runner_routes.router, prefix=f"{settings.API_V1_STR}/runner", tags=["runner"])

