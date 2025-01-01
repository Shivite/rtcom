import { Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { AuthContext } from "./AuthContext";
import Home from "./Dashboard/Home";
import Rhook from "./learn/Rhook";
import RuseCallback from "./learn/RuseCallback";
import RuseDebugValue from "./learn/RuseDebugValue";
import RuseEffect from "./learn/RuseEffect";
import RuseImparitiveHandle from "./learn/RuseImparitiveHandle";
import RuseLayoutEffect from "./learn/RuseLayoutEffect";
import RuseReducer from "./learn/RuseReducer";
import RuseRef from "./learn/RuseRef";
import Tesst from "./learn/tesst";
import Rmemo from "./learn/Rmemo";
import ProtectedRoutes from "./ProtectedRoute";
import Hoc from "./learn/Hoc";
const Views = () => {
  const { user } = useContext(AuthContext);
  return user.loggedIn === null ? (
    <Text> Loading ....</Text>
  ) : (
    <Routes>
      <Route path="/test" element={<Tesst />} />

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login />} />
      <Route path="/reactHooks" element={<Rhook />} />
      <Route path="/RuseEffect" element={<RuseEffect />} />
      <Route path="/RuseReducer" element={<RuseReducer />} />
      <Route path="/RuseCallback" element={<RuseCallback />} />
      <Route path="/RuseRef" element={<RuseRef />} />
      <Route path="/tesst" element={<Tesst />} />
      <Route path="/RuseImparitiveHandle" element={<RuseImparitiveHandle />} />
      <Route path="/RuseLayoutEffect" element={<RuseLayoutEffect />} />
      <Route path="/RuseDebugValue" element={<RuseDebugValue />} />
      <Route path="/Rmemo" element={<Rmemo />} />
      <Route path="/hoc" element={<Hoc />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Views;
