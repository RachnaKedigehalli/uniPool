import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
  Image,
  useColorMode,
  useColorModeValue,
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import logo_light from "../../assets/uniPool.png";
import logo_dark from "../../assets/uniPool_dark.png";
import LoginForm from "./ModalContent/LoginForm";
import RegisterForm from "./ModalContent/RegisterForm";

const RegisterModal = ({ isOpen, onOpen, onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [modalState, setModalState] = useState("login");
  const borderColor = useColorModeValue("tagText.light", "tagText.dark");
  useEffect(() => {
    setModalState("login");
  }, [isOpen]);
  return (
    <>
      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue("bg.light", "bg.dark")}
          style={{
            borderWidth: 1,
            borderRadius: 10,
          }}
          shadow={`0px 0px 15px ${useColorModeValue("bg.dark", "#F8CEFA")}`}
        >
          <ModalHeader>
            <Center flexDirection={"column"}>
              <Box
                fontFamily={"navbar"}
                style={{
                  fontWeight: "bold",
                  fontSize: 28,
                  marginTop: 10,
                }}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"row"}
              >
                <Image
                  src={colorMode == "light" ? logo_light : logo_dark}
                  h={8}
                  w={8}
                  mr={3}
                ></Image>
                <Text>uniPool</Text>
              </Box>
              <Text
                fontFamily={"heading"}
                style={{
                  fontWeight: "900",
                  fontSize: 20,
                  marginTop: 30,
                }}
              >
                {modalState == "login"
                  ? "Let's login into your uniPool account"
                  : "Register on uniPool"}
              </Text>
            </Center>
          </ModalHeader>
          <ModalBody
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            {modalState == "login" ? (
              <>
                <LoginForm />
                <HStack mt={10} w={"80%"} justifyContent={"space-evenly"}>
                  <Divider orientation="horizontal" borderColor={borderColor} />
                  <Text>or</Text>
                  <Divider orientation="horizontal" borderColor={borderColor} />
                </HStack>
                <Button
                  variant={"link"}
                  onClick={() => setModalState("register")}
                >
                  Register on uniPool
                </Button>
              </>
            ) : (
              <>
                <RegisterForm />
                <Button
                  variant={"link"}
                  onClick={() => setModalState("login")}
                  mt={10}
                >
                  Go back to login
                </Button>
              </>
            )}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegisterModal;
