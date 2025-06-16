from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import SessionLocal
from app.products.models import Product
from app.products.schemas import ProductRead
from app.utils.logging import logger 

router = APIRouter(
    prefix="/products",
    tags=["products"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[ProductRead])
def get_products(
    db: Session = Depends(get_db),
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    sort_by: Optional[str] = Query(None, description="Field to sort by: price, name, etc."),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100)
):
    query = db.query(Product)

    if category:
        query = query.filter(Product.category == category)
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    if sort_by:
        if sort_by == "price":
            query = query.order_by(Product.price)
        elif sort_by == "-price":
            query = query.order_by(Product.price.desc())
        elif sort_by == "name":
            query = query.order_by(Product.name)
        elif sort_by == "-name":
            query = query.order_by(Product.name.desc())

    products = query.offset((page - 1) * page_size).limit(page_size).all()
    return products

@router.get("/search", response_model=List[ProductRead])
def search_products(
    keyword: str = Query(..., min_length=1),
    db: Session = Depends(get_db)
):
    keyword_pattern = f"%{keyword}%"
    products = db.query(Product).filter(
        (Product.name.ilike(keyword_pattern)) | (Product.description.ilike(keyword_pattern))
    ).all()
    logger.info(f"Product search performed with keyword='{keyword}'. {len(products)} results returned.")
    return products

@router.get("/{product_id}", response_model=ProductRead)
def get_product_detail(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        logger.warning(f"Product detail view failed for product_id={product_id}: Not found.")
        raise HTTPException(status_code=404, detail="Product not found")
    logger.info(f"Product detail viewed for product_id={product_id} ('{product.name}')")
    return product