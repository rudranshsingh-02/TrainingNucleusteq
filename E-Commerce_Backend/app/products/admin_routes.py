from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.products.models import Product
from app.products.schemas import ProductCreate, ProductUpdate, ProductRead
from app.auth.dependencies import require_role
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
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product already exists"
        )
    product_obj = Product(**product.model_dump())
    db.add(product_obj)
    db.commit()
    db.refresh(product_obj)
    return product_obj

@router.get("/", response_model=list[ProductRead], dependencies=[Depends(require_role("admin"))])
def list_products(db:Session=Depends(get_db)):
    products = db.query(Product).all()
    return products

@router.get("/{product_id}", response_model=ProductRead, dependencies=[Depends(require_role("admin"))])
def get_Product(product_id: int, db:Session=Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}",response_model=ProductRead, dependencies=[Depends(require_role("admin"))])
def update_product(product_id: int, product: ProductUpdate,  db:Session=Depends(get_db)):
    product_obj = db.query(Product).filter(Product.id == product_id).first()
    if not product_obj:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in product.model_dump(exclude_unset=True).items():
        setattr(product_obj, key, value)
    db.commit()
    db.refresh(product_obj)
    return product_obj

@router.delete("/{product_id}", dependencies=[Depends(require_role("admin"))])
def delete_product(product_id: int,  db:Session=Depends(get_db)):
    product_obj = db.query(Product).filter(Product.id == product_id).first()
    if not product_obj:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product_obj)
    db.commit()
    return {"message": "Product deleted"}

