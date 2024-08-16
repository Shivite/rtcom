import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const UserAuth = () => {
  const { user } = useContext(AuthContext);
  console.log("setupser---", user);
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = UserAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
