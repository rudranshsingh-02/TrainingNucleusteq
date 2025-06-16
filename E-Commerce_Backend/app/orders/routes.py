from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.orders.models import Order, OrderItem
from app.orders.schemas import OrderRead
from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[OrderRead])
def list_orders(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Only list orders for the current logged-in user
    orders = db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()
    return orders

@router.get("/{order_id}", response_model=OrderRead)
def order_details(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == current_user.id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
