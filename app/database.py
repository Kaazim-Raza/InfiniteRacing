# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker

# # --- Adjust this for your database ---
# # For SQLite (dev/testing):
# SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"

# # For PostgreSQL (production):
# # SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/dbname"

# # Create engine
# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL,
#     connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
# )

# # Create a session factory
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # Base class for ORM models
# Base = declarative_base()

# # ✅ Optional utility function to create tables
# def create_database():
#     # Import all models here so Base.metadata has them
#     from app import models  # assumes you have models/__init__.py that imports all models
#     Base.metadata.create_all(bind=engine)


from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# --- Adjust this for your database ---
# For SQLite (dev/testing):
SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"

# For PostgreSQL (production):
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/dbname"

# Create engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for ORM models
Base = declarative_base()

# Dependency to get DB session for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Optional utility function to create tables
# def create_database():
#     # Import all models here so Base.metadata has them
#     from app import models  # assumes you have models/__init__.py that imports all models
#     Base.metadata.create_all(bind=engine)
