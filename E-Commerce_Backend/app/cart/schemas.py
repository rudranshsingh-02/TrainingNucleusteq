from pydantic import BaseModel, ConfigDict

from pydantic import BaseModel

class CartCreate(BaseModel):
    product_id: int
    quantity: int

class CartRead(BaseModel):
    id: int
    product_id: int
    quantity: int

    model_config = ConfigDict(from_attributes=True) 
