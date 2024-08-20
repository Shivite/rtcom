import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex>
        <Box p="4">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Menu
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href="/reactHooks/">UseState Hook</Link>
              </MenuItem>{" "}
              <MenuItem>
                <Link href="/RuseEffect/">UseEffect Hook</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/RuseContext/">UseContext Hook</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/RuseReducer/">Use Reducer Hook</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/RuseCallback/">Use Callback Hook</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/RuseRef/">Use Ref Hook</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/RuseImparitiveHandle/">Use Imparitive Handle</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/RuseLayoutEffect/">Use Layout Effect</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/RuseDebugValue/">Use Debug Value</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Spacer />
        <Box p="4">
          <Button
            onClick={toggleColorMode}
            pos="absolute"
            top="0"
            right="0"
            m="1rem"
          >
            {colorMode === "dark" ? (
              <SunIcon color="orange.400" />
            ) : (
              <MoonIcon color="blue.700" />
            )}
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default ToggleColorMode;
