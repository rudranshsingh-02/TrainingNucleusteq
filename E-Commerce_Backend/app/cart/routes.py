from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.cart.models import Cart
from app.cart.schemas import CartCreate, CartRead
from app.auth.dependencies import get_current_user  # adjust import as per your project
from app.core.database import SessionLocal
from app.products.models import Product
from app.auth.models import User

router = APIRouter(
    prefix="/cart",
    tags=["cart"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=CartRead)
def add_to_cart(
    item: CartCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    cart_item = db.query(Cart).filter(
        Cart.user_id == current_user.id,
        Cart.product_id == item.product_id
    ).first()
    
    new_quantity = item.quantity
    if cart_item:
        new_quantity += cart_item.quantity  # Adding to existing quantity

    if new_quantity > product.stock:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot add {item.quantity}. Only {product.stock - (cart_item.quantity if cart_item else 0)} items left in stock."
        )

    if cart_item:
        cart_item.quantity += item.quantity
    else:
        cart_item = Cart(
            user_id=current_user.id,
            product_id=item.product_id,
            quantity=item.quantity
        )
        db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item


@router.get("/", response_model=List[CartRead])
def view_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).all()
    return cart

@router.put("/{cart_id}", response_model=CartRead)
def update_cart_item(
    cart_id: int,
    item: CartCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_item = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == current_user.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    cart_item.quantity = item.quantity
    db.commit()
    db.refresh(cart_item)
    return cart_item

@router.delete("/{cart_id}")
def remove_from_cart(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_item = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == current_user.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db.delete(cart_item)
    db.commit()
    return {"detail": "Item removed from cart"}
