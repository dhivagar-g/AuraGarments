from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional


app = FastAPI()
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI backend!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/products/{product_id}")
def get_product(product_id: int):
    return {"product_id": product_id}

@app.get("/products")
def list_products(category: str, limit: int):
    return {"category": category, "limit": limit}

class Product(BaseModel):
    name: str
    price: float
    description: Optional[str] = None

@app.post("/products")
def create_product(product: Product):
    return product.model_dump()


