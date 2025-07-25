from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Race App"
    API_V1_STR: str = "/api/v1"

    # Database
    SQLALCHEMY_DATABASE_URL: str = "sqlite:///./app.db"  # or your PostgreSQL URL

    # JWT Settings
    SECRET_KEY: str = "your-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    class Config:
        env_file = ".env"

settings = Settings()
