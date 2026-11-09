import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

function ProductCard({ id, name, price, image, onDelete, addToCart }) {
  const navigate = useNavigate();

  // const { addToCart } = useContext(AppContext);

  const product = { id, name, price, image };

  const handleEdit = () => {
    navigate(`/edit-product/${id}`);
  };
  return (
    <div className="card">
      <div onClick={() => navigate(`/products/${id}`)} style={{ cursor: "pointer" }}>
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>₹{price}</p>
      </div>

      <button style={{ width: "100px" }} onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button style={{ marginLeft: "10px", width: "100px" }} onClick={handleEdit}>
        Edit
      </button>
      <button style={{ marginLeft: "10px", width: "100px" }} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
export default ProductCard;
