from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.products.models import Product
from app.products.schemas import ProductCreate, ProductUpdate, ProductRead
from app.auth.dependencies import require_role
from app.utils.logging import logger  

router = APIRouter(
    prefix="/admin/products",
    tags=["admin-products"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ProductRead, dependencies=[Depends(require_role("admin"))])
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    existing_product = db.query(Product).filter(
        Product.name == product.name,
        Product.category == product.category
        ).first()
    if existing_product:
        logger.warning(f"Admin tried to create product '{product.name}' in category '{product.category}' but it already exists.")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product already exists"
        )
    product_obj = Product(**product.model_dump())
    db.add(product_obj)
    db.commit()
    db.refresh(product_obj)
    logger.info(f"Admin created product '{product_obj.name}' (ID: {product_obj.id}) in category '{product_obj.category}'.")
    return product_obj

@router.get("/", response_model=list[ProductRead], dependencies=[Depends(require_role("admin"))])
def list_products(db:Session=Depends(get_db)):
    products = db.query(Product).all()
    logger.info(f"Admin listed all products. Total: {len(products)}")
    return products

@router.get("/{product_id}", response_model=ProductRead, dependencies=[Depends(require_role("admin"))])
def get_Product(product_id: int, db:Session=Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        logger.warning(f"Admin tried to view product ID {product_id} but not found.")
        raise HTTPException(status_code=404, detail="Product not found")
    logger.info(f"Admin viewed product '{product.name}' (ID: {product.id})")
    return product

@router.put("/{product_id}",response_model=ProductRead, dependencies=[Depends(require_role("admin"))])
def update_product(product_id: int, product: ProductUpdate,  db:Session=Depends(get_db)):
    product_obj = db.query(Product).filter(Product.id == product_id).first()
    if not product_obj:
        logger.warning(f"Admin tried to update product ID {product_id} but not found.")
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in product.model_dump(exclude_unset=True).items():
        setattr(product_obj, key, value)
    db.commit()
    db.refresh(product_obj)
    logger.info(f"Admin updated product '{product_obj.name}' (ID: {product_obj.id})")
    return product_obj

@router.delete("/{product_id}", dependencies=[Depends(require_role("admin"))])
def delete_product(product_id: int,  db:Session=Depends(get_db)):
    product_obj = db.query(Product).filter(Product.id == product_id).first()
    if not product_obj:
        logger.warning(f"Admin tried to delete product ID {product_id} but not found.")
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product_obj)
    db.commit()
    logger.info(f"Admin deleted product '{product_obj.name}' (ID: {product_obj.id})")
    return {"message": "Product deleted"}