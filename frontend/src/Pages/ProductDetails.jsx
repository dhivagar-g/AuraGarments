import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import AppContext from "../context/AppContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(AppContext);
  const [product, setProduct] = useState(null);

  console.log("Fetching product details for ID:", id);
  console.log("Current product state:", product);
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  if (!product) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="details-container">
      <img src={product.image} alt={product.name} className="details-image" />
      <div className="details-info">
        <h2>{product.name}</h2>
        <h3>₹{product.price}</h3>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <button onClick={() => navigate("/products")}>Back</button>
      </div>
    </div>
  );
}
export default ProductDetails;
