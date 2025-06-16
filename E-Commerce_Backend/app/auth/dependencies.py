from fastapi import Depends, HTTPException, status
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.auth.models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/signin")

def get_jwt_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.algorithm])
        user_email: str = payload.get("sub")
        role: str = payload.get("role")
        if user_email is None or role is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
        return {"email": user_email, "role": role}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")

# Dependency 2: Parse JWT, then load user from DB (for cart, orders, etc.)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.algorithm])
        user_email: str = payload.get("sub")
        if user_email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == user_email).first()
    if user is None:
        raise credentials_exception
    return user  # SQLAlchemy model instance

def require_role(required_role: str):
    def role_dependency(user=Depends(get_jwt_user)):
        if user["role"] != required_role:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
        return user
    return role_dependency
