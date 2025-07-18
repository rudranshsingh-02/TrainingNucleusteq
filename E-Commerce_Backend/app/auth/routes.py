from fastapi import APIRouter, Depends, HTTPException, status
from app.utils.logging import logger
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.auth.models import User, UserRole
from app.auth.schemas import ForgotPasswordRequest, ResetPasswordRequest, SuccessMessagge, UserCreate, UserRead, UserLogin
from app.utils.utils import create_reset_token, hash_password, validate_email_format, verify_password, verify_reset_token, create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db  # hand over session to route
    finally:
        db.close()

@router.post("/signup", response_model = SuccessMessagge)
def signup(user: UserCreate, db: Session = Depends(get_db)):  #user represents incoming data
    validate_email_format(user.email)
    logger.info(f"Signup attempt for email: {user.email}")
    existing_user = db.query(User).filter(User.email == user.email).first() # return first result found
    if existing_user:
        logger.info(f"Signup failed for email: {user.email} (already registered)")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    user_obj = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
        role=UserRole(user.role)
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    logger.info(f"Signup success for email: {user.email}")
    return {"message" : "Sign-up Succesfull!"}

@router.post("/signin")
def login(user: UserLogin, db: Session = Depends(get_db)):   
    existing_user = db.query(User).filter(User.email == user.email).first()
    if not existing_user:
        logger.info(f"Login failed for email: {user.email} - user not found")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is not registered, please signup first!"
        )
    if not verify_password(user.password, existing_user.hashed_password):
        logger.info(f"Login failed for email: {user.email} - wrong password")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password"
        )
    access_token = create_access_token({
        "sub": existing_user.email,
        "role": existing_user.role.value
    })
    logger.info(f"Login success for email: {user.email}")
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/forgot-password", response_model = SuccessMessagge)
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    logger.info(f"Forgot password requested for email: {request.email}")
    user = db.query(User).filter(User.email == request.email).first()
    if user:
        token = create_reset_token(user.email)
        logger.info(f"Password reset token generated for email: {user.email}")
        print(f"Reset Link (send via email in real app): http://localhost:127.0.0.1/auth/reset-password?token={token}")
    else:
        logger.info(f"Password reset requested for non-existing email: {request.email}")
    return {"message": "If the email exists, a reset link has been sent."}

@router.post("/reset-password", response_model=SuccessMessagge)
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    logger.info(f"Reset password attempt using token: {request.token}")
    
    email = verify_reset_token(request.token)
    if not email:
        logger.info("Password reset failed: Invalid or expired token.")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        logger.info(f"Password reset failed: User with email {email} not found.")
        raise HTTPException(status_code=404, detail="User not found")
    
    if verify_password(request.new_password, user.hashed_password):
        logger.info(f"Password reset failed: New password matches old one for user {email}.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please create a new password different from the previous one."
        )

    user.hashed_password = hash_password(request.new_password)
    db.commit()
    logger.info(f"Password reset successful for email: {email}")
    return {"message": "Password reset successful"}