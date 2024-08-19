import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import React, { createContext, useState } from "react";
import UseSocketSetup from "../common/UseSocketSetup";
import Chat from "./layout/Chat";
import Sidebar from "./layout/Sidebar";
export const FriendContext = createContext();
const Home = () => {
  const [friendList, SetFriendList] = useState([
    // { username: "ravinder", onlineStatus: false },
    // { username: "ravinder", onlineStatus: true },
  ]);
  // const [isConnected, setIsConnected] = useState(socket.connected);
  UseSocketSetup();
  return (
    <FriendContext.Provider value={{ friendList, SetFriendList }}>
      <Grid templateColumns="repeat(10, 1fr)" as={Tabs} h="100vh">
        <GridItem colSpan={3} borderRight="1px solid gray">
          <Sidebar />
        </GridItem>
        <GridItem colSpan={7} maxH="100vh">
          <Chat />
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  );
};

export default Home;
