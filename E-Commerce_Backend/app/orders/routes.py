from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth.models import User
from app.core.database import SessionLocal
from app.orders.models import Order, OrderItem, OrderStatus
from app.orders.schemas import OrderRead
from app.auth.dependencies import get_current_user
from app.utils.logging import logger

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
    current_user: User = Depends(get_current_user)
):
    logger.info(f"User {current_user.email} requested order history")
    orders = db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()
    logger.info(f"Orders fetched for user {current_user.email}: {len(orders)} orders")
    return orders

@router.get("/{order_id}", response_model=OrderRead)
def order_details(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == current_user.id).first()
    if not order:
        logger.warning(f"Order {order_id} not found for user {current_user.email}")
        raise HTTPException(status_code=404, detail="Order not found")
    logger.info(f"User {current_user.email} viewed order {order_id}")
    return order

@router.post("/{order_id}/cancel")
def cancel_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == current_user.id).first()
    if not order:
        logger.warning(f"Cancel failed: order {order_id} not found for user {current_user.email}")
        raise HTTPException(status_code=404, detail="Order not found")

    if order.status == OrderStatus.paid:
        logger.warning(f"Cancel failed: paid order {order_id} for user {current_user.email}")
        raise HTTPException(status_code=400, detail="Paid order cannot be cancelled")
    if order.status == OrderStatus.cancelled:
        logger.info(f"Order {order_id} already cancelled for user {current_user.email}")
        raise HTTPException(status_code=400, detail="Order already cancelled")

    order.status = OrderStatus.cancelled
    db.commit()
    db.refresh(order)
    logger.info(f"Order {order_id} cancelled by user {current_user.email}")
    return {"detail": "Order cancelled", "order_id": order.id, "status": order.status.value}
