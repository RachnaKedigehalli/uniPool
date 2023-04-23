import React, { useState } from "react";
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
import axios from "axios";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onSubmit = async () => {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phone,
      password: pass,
    };
    console.log("body: ", body);
    axios
      .get("/users/exists/id/1")
      .then((res) => {
        console.log("register: ", res);
      })
      .catch(console.log);
  };

  return (
    <>
      <Stack w={"80%"} spacing={5}>
        <Stack>
          <Text
            fontSize={"tags"}
            fontWeight={"500"}
            color={useColorModeValue("tagText.light", "tagText.dark")}
            ml={1}
          >
            First Name
          </Text>
          <Input
            mt={0}
            placeholder="Enter your first Name"
            borderRadius={"input"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Stack>
        <Stack>
          <Text
            fontSize={"tags"}
            fontWeight={"500"}
            color={useColorModeValue("tagText.light", "tagText.dark")}
            ml={1}
          >
            Last Name
          </Text>
          <Input
            mt={0}
            placeholder="Enter your last Name"
            borderRadius={"input"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Stack>
        <Stack>
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
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputRightElement children={<CheckIcon color="green.500" />} />
          </InputGroup>
        </Stack>
        <Stack>
          <Text
            fontSize={"tags"}
            fontWeight={"500"}
            color={useColorModeValue("tagText.light", "tagText.dark")}
            ml={1}
          >
            Phone number
          </Text>
          <InputGroup>
            <Input
              borderRadius={"input"}
              style={{
                borderWidth: 2,
              }}
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <InputRightElement children={<CheckIcon color="green.500" />} />
          </InputGroup>
        </Stack>
        <Stack>
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
            placeholder="Set your password"
            borderRadius={"input"}
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />
        </Stack>
        <Stack display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Button
            onClick={onSubmit}
            marginTop={5}
            bg={useColorModeValue("bg.dark", "bg.light")}
            color={useColorModeValue("bg.light", "bg.dark")}
            _hover={{
              color: useColorModeValue("bg.dark", "bg.light"),
              background: "accents.grad",
            }}
            borderRadius={"button"}
            w="80%"
          >
            Register
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default RegisterForm;
