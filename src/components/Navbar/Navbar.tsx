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
  Image,
  LinkProps,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

import { useStateValue } from "../../StateProvider";
import ProfileOptions from "./ProfileOptions";
import RegisterLogin from "./RegisterLogin";
import logo_light from "../../assets/uniPool.png";
import logo_dark from "../../assets/uniPool_dark.png";
import { To } from "react-router-dom";

const NavLink = ({ children, link }: { children: ReactNode; link: To }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Link to={link}>
      <Button
        variant="link"
        style={{
          color: `${colorMode == "light" ? "#000000" : "#ffffff"}`,
        }}
        _hover={{
          color: useColorModeValue("accents.blue", "accents.pink"),
        }}
      >
        {children}
      </Button>
    </Link>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [state, dispatch] = useStateValue();
  const Links = !state.isLoggedIn
    ? [
        // { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Team", link: "/team" },
      ]
    : [
        { name: "Home", link: "/home" },
        // { name: "Add a trip", link: "/addTrip" },
        { name: "My trips", link: "/myTrips" },
      ];
  return (
    <>
      <Box
        bg={useColorModeValue("bg.light", "bg.dark")}
        px={4}
        fontFamily={"navbar"}
        fontSize={"navbar"}
        fontWeight={"medium"}
        paddingX={7}
        pt={2}
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
              }}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"row"}
            >
              <Image
                src={colorMode == "light" ? logo_light : logo_dark}
                h={6}
                w={6}
                mr={2}
              ></Image>
              <Text>uniPool</Text>
            </Box>
            <HStack
              as={"nav"}
              spacing={10}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name} link={link.link}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              onClick={toggleColorMode}
              style={{
                marginRight: "2vw",
              }}
              borderRadius={"button"}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {state.isLoggedIn ? <ProfileOptions /> : <RegisterLogin />}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} link={link.link}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
