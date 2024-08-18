import { Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { AuthContext } from "./AuthContext";
import Home from "./Dashboard/Home";
import ProtectedRoutes from "./ProtectedRoute";
const Views = () => {
  const { user } = useContext(AuthContext);
  return user.loggedIn === null ? (
    <Text> Loading ....</Text>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Views;
