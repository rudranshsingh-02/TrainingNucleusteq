from pydantic import BaseModel, ConfigDict

class CheckoutResponse(BaseModel):
    order_id: int
    total: float
    message: str = "Order placed successfully"

    model_config = ConfigDict(from_attributes=True)
