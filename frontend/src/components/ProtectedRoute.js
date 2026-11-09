import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function ProtectedRoute({ children }) {
  const { isLoading, token } = useContext(AppContext);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
