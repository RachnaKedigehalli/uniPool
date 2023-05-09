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
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [state, dispatch] = useStateValue();

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
      .match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/);
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
    await axios
      .post("http://localhost:30697/users/register", body)
      .then(async (res) => {
        console.log("register: ", res.data);
        await dispatch({
          type: "setIsLoggedIn",
          payload: {
            isLoggedIn: true,
          },
        });
        await dispatch({
          type: "setUser",
          payload: {
            user: res.data,
          },
        });
        navigate("/home");
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
            {validateEmail(email) ? (
              <InputRightElement children={<CheckIcon color="green.500" />} />
            ) : (
              <></>
            )}
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
            {validatePhone(phone) ? (
              <InputRightElement children={<CheckIcon color="green.500" />} />
            ) : (
              <></>
            )}
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
            isDisabled={
              !firstName ||
              !lastName ||
              !email ||
              !pass ||
              !phone ||
              !validateEmail(email) ||
              !validatePhone(phone)
            }
          >
            Register
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default RegisterForm;
