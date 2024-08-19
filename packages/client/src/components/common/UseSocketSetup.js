import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AuthContext } from "../AuthContext";
const UseSocketSetup = () => {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    socket.connect();
    socket.on("connect_error", (error) => {
      setUser({ loggedIn: false });
      console.log("sockket connect error", error);
    });
    return () => {
      socket.off("connet_error");
    };
  }, [setUser]);
};

export default UseSocketSetup;
