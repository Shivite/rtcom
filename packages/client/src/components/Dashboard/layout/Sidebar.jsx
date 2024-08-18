import { ChatIcon } from "@chakra-ui/icons";
import {
  Button,
  Circle,
  Divider,
  Heading,
  HStack,
  TabList,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FriendContext } from "../Home";
const Sidebar = () => {
  const { friendList } = useContext(FriendContext);
  console.log("friendList", friendList);
  return (
    <VStack py="1.4rem">
      <HStack justify="space-evenly" w="100%">
        <Heading size="md"> Add Friend</Heading>
        <Button>
          <ChatIcon></ChatIcon>
        </Button>
      </HStack>
      <Divider />
      <VStack as={TabList} pt="1rem">
        {friendList &&
          friendList.map((friend, i) => (
            <HStack as={Tabs} key={i}>
              <Circle
                h="15px"
                w="15px"
                bg={friend.onlineStatus ? "green.500" : "red.500"}
              ></Circle>
              <Text>{friend.username}</Text>
            </HStack>
          ))}
      </VStack>
    </VStack>
  );
};

export default Sidebar;
