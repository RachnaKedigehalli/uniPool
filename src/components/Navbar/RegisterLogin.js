import {
  Box,
  Button,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import RegisterModal from "./RegisterModal";

const RegisterLogin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg={useColorModeValue("bg.dark", "bg.light")}
        color={useColorModeValue("bg.light", "bg.dark")}
        _hover={{
          color: useColorModeValue("bg.dark", "bg.light"),
          background: "accents.grad",
        }}
        borderRadius={"button"}
        onClick={onOpen}
      >
        Get started
      </Button>
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
        <RegisterModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default RegisterLogin;
