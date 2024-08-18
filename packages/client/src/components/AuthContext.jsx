import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ loggedIn: null });
  useEffect(() => {
    fetch("http://localhost:4000/auth/login", {
      credentials: "include",
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        return null;
      })
      .then((r) => {
        console.log("rrr", r);
        if (!r || !r.ok || r.status >= 400) {
          setUser({ loggedIn: false });
          return null;
        }
        return r.json();
      })
      .then((data) => {
        console.log("data", data);
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        navigate("/home");
        setUser({ ...data });
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
