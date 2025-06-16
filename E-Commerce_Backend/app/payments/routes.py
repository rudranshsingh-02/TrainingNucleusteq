from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.auth.dependencies import get_current_user
from app.orders.models import Order, OrderStatus
from app.auth.models import User

router = APIRouter(
    prefix="/pay",
    tags=["payments"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/{order_id}")
def pay_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == current_user.id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.status == OrderStatus.paid:
        raise HTTPException(status_code=400, detail="Order already paid")
    if order.status == OrderStatus.cancelled:
        raise HTTPException(status_code=400, detail="Order is cancelled")

    order.status = OrderStatus.paid
    db.commit()
    db.refresh(order)
    return {"detail": "Order paid successfully", "order_id": order.id, "status": order.status.value}