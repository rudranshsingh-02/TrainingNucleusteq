FastAPI E-Commerce Backend
A robust, secure, and maintainable backend RESTful API for an e-commerce platform, built with FastAPI and PostgreSQL.
This backend enables admin product management, user authentication, product browsing, shopping cart, checkout, and order history—all tested and documented with Postman.

Features
User Authentication (Signup, Signin, JWT, Forgot/Reset Password, Logout)

Role-based Access Control (Admin, User)

Admin Product Management (CRUD, Pagination)

Product Listing & Search (Filters, Query params)

Cart Management (Add, View, Update, Remove)

Dummy Checkout (Order creation, cart clearing)

Order History & Details

Logging & Middleware (API access logs, error logging)

Input Validation & Error Handling (Pydantic)

JWT-secured endpoints

Tech Stack: 
Python 3.10+

FastAPI

PostgreSQL (or SQLite for dev)

SQLAlchemy (ORM)

Alembic (DB migrations)

Pydantic (validation)

JWT (Auth)

Setup Instructions:

1. Clone the repo

2. Create virtual environment
python3 -m venv venv
source venv/bin/activate  # (Linux/Mac)
venv\Scripts\activate     # (Windows)

3. Install dependencies
pip install -r requirements.txt

4. Set up environment variables

5. Database migrations
alembic upgrade head

6. Run the server
uvicorn app.main:app --reload