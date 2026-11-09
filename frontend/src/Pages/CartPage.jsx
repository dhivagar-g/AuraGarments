import React, { useContext } from "react";
import AppContext from "../context/AppContext";

function CartPage() {
  const { cart, removeFromCart, decreaseQty, increaseQty } = useContext(AppContext);
  console.log("Cart contents:", cart);

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  console.log("Total price:", total);
  return (
    <div>
      <h1> Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} width="100" />
            <h2>{item.name}</h2>
            <p>₹{item.price}</p>
            <div>
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
              <button style={{ marginLeft: "10px" }} onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      <h2>Total: ₹{total}</h2>
    </div>
  );
}
export default CartPage;
