# from fastapi import FastAPI
# from app.core.config import settings
# from app.api.v1.auth import routes as auth_routes
# from app.api.v1.admin import routes as admin_routes
# from app.api.v1.manager import routes as manager_routes
# from app.api.v1.runner import routes as runner_routes
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.openapi.utils import get_openapi

# app = FastAPI(title=settings.PROJECT_NAME)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Change this to your frontend URL in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # Include routes
# app.include_router(auth_routes.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
# app.include_router(admin_routes.router, prefix=f"{settings.API_V1_STR}/admin", tags=["admin"])
# app.include_router(manager_routes.router, prefix=f"{settings.API_V1_STR}/manager", tags=["manager"])
# app.include_router(runner_routes.router, prefix=f"{settings.API_V1_STR}/runner", tags=["runner"])

# def custom_openapi():
#     if app.openapi_schema:
#         return app.openapi_schema

#     openapi_schema = get_openapi(
#         title=settings.PROJECT_NAME,
#         version="1.0.0",
#         description="API for your project with JWT Bearer Auth",
#         routes=app.routes,
#     )

#     openapi_schema["components"]["securitySchemes"] = {
#         "BearerAuth": {
#             "type": "http",
#             "scheme": "bearer",
#             "bearerFormat": "JWT"
#         }
#     }

#     for path in openapi_schema["paths"].values():
#         for method in path.values():
#             method.setdefault("security", [{"BearerAuth": []}])

#     app.openapi_schema = openapi_schema
#     return app.openapi_schema

# app.openapi = custom_openapi

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

from app.core.config import settings
from app.api.v1.auth import routes as auth_routes
from app.api.v1.admin import routes as admin_routes
from app.api.v1.manager import routes as manager_routes
from app.api.v1.runner import routes as runner_routes

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_routes.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(admin_routes.router, prefix=f"{settings.API_V1_STR}/admin", tags=["admin"])
app.include_router(manager_routes.router, prefix=f"{settings.API_V1_STR}/manager", tags=["manager"])
app.include_router(runner_routes.router, prefix=f"{settings.API_V1_STR}/runner", tags=["runner"])

# Custom OpenAPI schema for Swagger UI auth
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=settings.PROJECT_NAME,
        version="1.0.0",
        description="Backend API for race management app",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }

    # Apply BearerAuth to all paths
    for path in openapi_schema["paths"]:
        for method in openapi_schema["paths"][path]:
            openapi_schema["paths"][path][method]["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
