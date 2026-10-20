from ninja import Schema
from pydantic import EmailStr, Field

class ContactIn(Schema):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=5000)
    website: str = ""

class ContactOut(Schema):
    detail: str
    