import { useEffect, useState, useContext } from "react";
import AppContext from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import "./Product.css";

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(AppContext);
  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });

      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <div>
      <h2>Products Page</h2>
      <div className="product-container">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            onDelete={deleteProduct}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
export default Products;
