from dotenv import load_dotenv
load_dotenv()

import os
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    database_url: str = Field(..., env='DATABASE_URL')
    jwt_secret_key: str = Field(..., env='JWT_SECRET_KEY')
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    class Config:
        env_file = os.path.abspath(".env") 

settings = Settings()