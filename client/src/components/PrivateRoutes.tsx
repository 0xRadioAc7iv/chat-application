import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const auth = { token: true }; // Pseudo Auth for now
  return auth.token ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoutes;
