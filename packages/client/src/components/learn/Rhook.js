import { Button, Container, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const Rhook = () => {
  const [count, setCount] = useState(0);
  return (
    <VStack>
      <Container maxW="md" bg="gray" color="white">
        Use State: Allow user to manage states in functional components. const
        [count, setCount] = useState(0);
        <Text fontSize="xs">Counter Value : {count}</Text>
        <Button colorScheme="green" onClick={() => setCount(count + 1)}>
          Increment
        </Button>
      </Container>
    </VStack>
  );
};

export default Rhook;
