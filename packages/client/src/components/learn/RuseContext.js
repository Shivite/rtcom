import { Children, createContext, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = () => {
  const UserContext = createContext();
  const [user, setUser] = useState({ loggedin: false });
  useEffect(() => {
    fetch("https://localhost:4000/api/auth/login")
      .catch((err) => {
        setUser({ loggedin: false });
      })
      .then((res) => {
        setUser({ loggedin: true });
      });
  }, []);
  return <UserContext.Provider value={user}>{Children}</UserContext.Provider>;
};

//in component we need context.

import UserContext from AuthContext;

const ConsumeContextComp = () => {
    const [user, setUser] = UserContext(UserContext);
    useEffect(() => {
      if(user.loggedin){
        Navigate('/dashboard')
      }else{
        setUser({loggedin:false})
      }
    }, [user])

}