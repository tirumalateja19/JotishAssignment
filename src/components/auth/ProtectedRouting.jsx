import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const LoggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (!LoggedUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}
