import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const [authorized, setAuthorized] = useState(Boolean);

  fetch("http://localhost:3000/api/auth/status").then((response) => {
    if (response.ok) {
      setAuthorized(true);
    }
    setAuthorized(false);
  });

  return authorized ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
