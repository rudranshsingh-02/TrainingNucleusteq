from pydantic import BaseModel, ConfigDict
from typing import Optional

class ProductCreate(BaseModel):
    name : str
    description: Optional[str] = None
    price: float
    stock : int
    category: str

class ProductRead(ProductCreate):
    id: int

    model_config = ConfigDict(from_attributes=True) 

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    category: Optional[str] = None