import { CheckIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Stack,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone) => {
    return String(phone)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      <Stack w={"80%"}>
        <Text
          fontSize={"tags"}
          fontWeight={"500"}
          color={useColorModeValue("tagText.light", "tagText.dark")}
          ml={1}
        >
          Email
        </Text>
        <InputGroup>
          <Input
            borderRadius={"input"}
            style={{
              borderWidth: 2,
            }}
            type="tel"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validateEmail(email) ? (
            <InputRightElement children={<CheckIcon color="green.500" />} />
          ) : (
            <></>
          )}
        </InputGroup>
        <Text
          fontSize={"tags"}
          fontWeight={"500"}
          color={useColorModeValue("tagText.light", "tagText.dark")}
          ml={1}
        >
          Password
        </Text>
        <Input
          mt={0}
          placeholder="Enter password"
          borderRadius={"input"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <Stack display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Button
            onClick={() => {}}
            marginTop={5}
            bg={useColorModeValue("bg.dark", "bg.light")}
            color={useColorModeValue("bg.light", "bg.dark")}
            style={{
              transition: "1s",
            }}
            _hover={{
              color: useColorModeValue("bg.dark", "bg.light"),
              background: "accents.grad",
              transition: "1s",
            }}
            borderRadius={"button"}
            w="80%"
            isDisabled={!email || !pass || !validateEmail(email)}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default LoginForm;
