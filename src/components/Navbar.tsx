import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  textDecoration,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

import { useStateValue } from "../StateProvider";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link to="/">
    <Button
      variant="ghost"
      _hover={{
        // background: "accents.grad",
        color: useColorModeValue("accents.blue", "accents.pink"),
      }}
    >
      {children}
    </Button>
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [state, dispatch] = useStateValue();
  const Links = !state.isLoggedIn
    ? ["Home", "About", "Team"]
    : ["Home", "Add a trip", "My trips"];
  return (
    <>
      <Box
        bg={useColorModeValue("bg.light", "bg.dark")}
        px={4}
        fontFamily={"navbar"}
        fontSize={"navbar"}
        fontWeight={"medium"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack alignItems={"center"} spacing={"100%"}>
            <Box
              fontFamily={"navbar"}
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginLeft: "2vw",
              }}
            >
              uniPool
            </Box>
            <HStack
              as={"nav"}
              spacing={10}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              onClick={toggleColorMode}
              style={{
                marginRight: "2vw",
              }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                // rounded={"full"}
                variant={"ghost"}
                // cursor={"pointer"}
                bg={useColorModeValue("bg.dark", "bg.light")}
                color={useColorModeValue("bg.light", "bg.dark")}
                _hover={{
                  color: useColorModeValue("bg.dark", "bg.light"),
                  background: "accents.grad",
                }}
                minW={0}
              >
                {state.isLoggedIn ? (
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                ) : (
                  <Text>{"Sign in"}</Text>
                )}
              </MenuButton>
              <MenuList>
                <MenuItem>My Account</MenuItem>
                <MenuItem>My Bookings</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
