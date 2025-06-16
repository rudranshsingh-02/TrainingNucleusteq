from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.checkout.schemas import CheckoutResponse
from app.core.database import SessionLocal
from app.cart.models import Cart
from app.orders.models import Order, OrderItem, OrderStatus
from app.auth.dependencies import get_current_user
from app.products.models import Product

router = APIRouter(
    prefix="/checkout",
    tags=["Checkout"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", status_code=201)
def checkout(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    cart_items = db.query(Cart).filter(Cart.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total = 0
    order_items = []
    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name}")
        subtotal = product.price * item.quantity
        total += subtotal
        order_items.append({
            "product_id": product.id,
            "quantity": item.quantity,
            "price_at_purchase": product.price
        })
        product.stock -= item.quantity

    order = Order(
        user_id=current_user.id,
        total_amount=total,
        status=OrderStatus.pending 
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    for item in order_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item["product_id"],
            quantity=item["quantity"],
            price_at_purchase=item["price_at_purchase"]
        )
        db.add(order_item)
    db.commit()

    db.query(Cart).filter(Cart.user_id == current_user.id).delete()  #for clearing cart
    db.commit()

    return CheckoutResponse(
        order_id=order.id,
        total=total
    )
