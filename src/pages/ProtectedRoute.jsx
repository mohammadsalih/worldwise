import { Navigate } from "react-router-dom";
import { useFakeAuthContext } from "../context/FakeAuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useFakeAuthContext();

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
