import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let auth = { token: false }; // Pseudo Auth for now
  return auth.token ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoutes;
