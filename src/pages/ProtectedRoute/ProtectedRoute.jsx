import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useFakeAuth } from "../../contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated } = useFakeAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
