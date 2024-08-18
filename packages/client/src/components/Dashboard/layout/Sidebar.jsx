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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FriendContext } from "../Home";
import FriendModal from "./FriendModal";
const Sidebar = () => {
  const { friendList } = useContext(FriendContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack py="1.4rem">
      <HStack justify="space-evenly" w="100%">
        <Heading size="md"> Add Friend</Heading>
        <Button onClick={onOpen}>
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
      <FriendModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default Sidebar;
