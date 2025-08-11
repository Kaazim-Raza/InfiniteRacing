from core.database import SessionLocal
from models.user import User
from core.security import get_password_hash
from schemas.user import RoleEnum  # Adjust import if needed

def seed_users():
    db = SessionLocal()

    users = [
        {
            "first_name": "Admin",
            "last_name": "One",
            "email": "admin@example.com",
            "password": "adminpass",
            "role": RoleEnum.admin
        },
        {
            "first_name": "Team",
            "last_name": "Manager",
            "email": "manager@example.com",
            "password": "managerpass",
            "role": RoleEnum.manager  # ✅ FIXED HERE
        },
        {
            "first_name": "Vice",
            "last_name": "Manager",
            "email": "vicemanager@example.com",
            "password": "vicepass",
            "role": RoleEnum.vice_manager
        },
        {
            "first_name": "Runner",
            "last_name": "One",
            "email": "runner@example.com",
            "password": "runnerpass",
            "role": RoleEnum.runner
        }
    ]


    for u in users:
        hashed_password = get_password_hash(u["password"])
        existing = db.query(User).filter(User.email == u["email"]).first()
        if not existing:
            new_user = User(
                first_name=u["first_name"],
                last_name=u["last_name"],
                email=u["email"],
                hashed_password=hashed_password,
                role=u["role"]
            )
            db.add(new_user)

    db.commit()
    db.close()
    print("✅ Seeded users successfully.")

if __name__ == "__main__":
    seed_users()
