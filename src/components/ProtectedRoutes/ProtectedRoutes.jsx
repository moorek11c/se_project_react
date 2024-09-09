import { Navigate } from "react-router-dom";
import "./ProtectedRoutes.css";

function ProtectedRoutes({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoutes;
