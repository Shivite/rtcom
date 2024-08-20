import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import socket from "../../../socket";
import { FriendContext } from "../Home";
const Chat = () => {
  const { friendList, setFriendList } = useContext(FriendContext);
  socket.on("get_friends", (currentFriendList) => {
    setFriendList(currentFriendList);
  });
  return friendList.length > 0 ? (
    <VStack h="100vh" justify="center" pt="5rem" alignItems="center">
      <TabPanels>
        {friendList.map((friend, i) => (
          <Text key={i}>{friend.username}</Text>
        ))}
      </TabPanels>
    </VStack>
  ) : (
    <VStack h="100vh" w="100%" justify="center" p="5rem" textAlign="center">
      <TabPanels>
        <TabPanel>
          <Text>No friend available right now!</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Chat;
