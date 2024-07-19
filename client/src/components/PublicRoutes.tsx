import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  let auth = { token: true }; // Pseudo Auth for now
  return auth.token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
