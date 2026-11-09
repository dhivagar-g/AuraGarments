import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const { cart, logout, token, user } = useContext(AppContext);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <div className="navbar">
        <h2>Auragarments</h2>
        <div>
          <button onClick={() => navigate("/")}>Home</button>
          {token && <button onClick={() => navigate("/products")}>Products</button>}
          {!token && <button onClick={() => navigate("/login")}>Login</button>}
          {token && (
            <Link style={{ color: "white", marginLeft: "10px" }} to="/cart">
              Cart {cartCount}
            </Link>
          )}
          {user && <span style={{ marginLeft: "10px" }}>Welcome, {user.name}</span>}
          {user && <button onClick={() => navigate("/profile")}>Profile</button>}
          {token && <button onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </>
  );
}
export default NavBar;
