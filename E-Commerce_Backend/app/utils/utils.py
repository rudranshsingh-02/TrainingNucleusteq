from fastapi import HTTPException, status
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta, timezone
from app.core.config import settings
import re

def validate_email_format(email: str):
    email_regex = r"^[\w\.-]+@[\w\.-]+\.(com|in)$"
    if not re.match(email_regex, email):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Email is invalid"
        )
    if not email.endswith("@gmail.com"):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Only Gmail addresses are allowed"
        )

def create_access_token(data: dict, expires_delta: int = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_delta or settings.access_token_expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.algorithm)  # creates jwt token
    return encoded_jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def hash_password(password: str):
    return pwd_context.hash(password)
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_reset_token(email: str):
    expire = datetime.utcnow() + timedelta(hours=1)
    payload = {        
        "sub": email,
        "exp": expire,
        "scope": "reset_password" 
    }  # data to store inside token
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.algorithm)

def verify_reset_token(token: str):
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.algorithm])
        if payload.get("scope") != "reset_password":
            return None
        return payload.get("sub")
    except Exception:
        return None