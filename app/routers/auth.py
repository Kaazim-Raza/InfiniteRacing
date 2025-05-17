from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.utils import auth
from app.database import get_db
from app.models.user import User
from app.utils.auth import role_required


router = APIRouter()

@router.post("/register", status_code=201)
async def register(
    username: str,
    password: str,
    role: str,
    db: Session = Depends(get_db),
    payload=Depends(role_required(["root"]))  # 🔒 Only root can access
):
    # ✅ Check if username already exists
    existing_user = db.query(User).filter(User.username == username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # ✅ Validate role
    valid_roles = ["root", "admin", "viewer"]
    if role not in valid_roles:
        raise HTTPException(status_code=400, detail=f"Invalid role. Must be one of: {valid_roles}")

    # ✅ Create user
    hashed_pw = auth.hash_password(password)
    new_user = User(username=username, hashed_password=hashed_pw, role=role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {
        "msg": "User created successfully",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "role": new_user.role
        }
    }
@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token = auth.create_access_token(data={"sub": user.username, "role": user.role, "id": user.id})

    return {"access_token": access_token, "token_type": "bearer"}
