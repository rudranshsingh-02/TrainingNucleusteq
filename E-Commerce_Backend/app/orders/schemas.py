from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class OrderItemRead(BaseModel):
    id: int
    product_id: int
    quantity: int
    price_at_purchase: float

    model_config = ConfigDict(from_attributes=True) 

class OrderRead(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    created_at: datetime
    items: List[OrderItemRead]

    model_config = ConfigDict(from_attributes=True) 
