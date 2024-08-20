import { Container, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const RuseEffect = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("Message get updated by use Effect");
    }, 3000);

    return () => {
      // will run when component unmount to deal with memory leaks
      clearTimeout(timer);
    };
  }, []);
  return (
    <VStack>
      <Container maxW="md" bg="gray" color="white">
        Use Effect: Allow a user manage the side effects of data fetching, dom
        manupulations. User can perform specific task in some phases of RLCycle
        <Text fontSize="xs">Page Message: {msg}</Text>
      </Container>
    </VStack>
  );
};

export default RuseEffect;
