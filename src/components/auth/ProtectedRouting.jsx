import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function ProtectedRoute({ children }) {
  const { loggedUser } = useContext(AuthContext);
  if (!loggedUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}
