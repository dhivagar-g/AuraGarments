import { useEffect, useState } from "react";
import AppContext from "./AppContext";

function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(true);

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item)).filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (id) => {
    console.log("Removing from cart:", id);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const getUserFromToken = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const responseUser = await fetch("http://localhost:5000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataUser = await responseUser.json();
      console.log("responseUser---->", dataUser);
      if (!responseUser.ok) {
        logout();
        setIsLoading(false);
        alert(dataUser.error);
        return;
      }
      setUser(dataUser.user);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user from token:", error);
      logout();
      setIsLoading(false);
    }
  };
  const updateUser = async (userData) => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const responseUser = await fetch("http://localhost:5000/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      const dataUser = await responseUser.json();
      console.log("responseUser---->", dataUser);
      if (!responseUser.ok) {
        setIsLoading(false);
        alert(dataUser.error);
        return false;
      }
      setUser((prevUser) => ({ ...prevUser, ...userData }));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      setIsLoading(false);
      return false;
    }
  };
  useEffect(() => {
    getUserFromToken();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        user,
        token,
        login,
        logout,
        isLoading,
        setIsLoading,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
