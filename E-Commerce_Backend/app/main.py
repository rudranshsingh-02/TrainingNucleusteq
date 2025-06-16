from fastapi import FastAPI
from app.auth.routes import router as auth_router
from app.products.admin_routes import router as products_router
from app.products.public_routes import router as public_products_router
from app.cart.routes import router as cart_router
from app.orders.routes import router as order_router
from app.checkout.routes import router as checkout_router
from app.payments.routes import router as payments_router
from app.middlewares.logging_middleware import LoggingMiddleware

app = FastAPI(
    title="E-commerce Backend API",
    description="RESTful backend for E-commerce Platform (FastAPI + PostgreSQL)",
    version="1.0.0"
)
app.add_middleware(LoggingMiddleware)
app.include_router(auth_router) 
app.include_router(products_router)
app.include_router(public_products_router)
app.include_router(cart_router)
app.include_router(order_router)
app.include_router(checkout_router)
app.include_router(payments_router)

@app.get("/")
def read_root():
    return {"status": "OK", "message": "E-commerce Backend running"}
