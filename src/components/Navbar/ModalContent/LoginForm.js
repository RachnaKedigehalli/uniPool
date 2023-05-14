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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../../StateProvider";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const body = {
      email: email,
      password: pass,
    };
    console.log("body: ", body);
    await axios
      .post("http://localhost:9898/users/login", body)
      .then(async (res) => {
        console.log("login: ", res.data);
        setIsLoading(false);
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
        props.onClose();
      })
      .catch(console.log);
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
          type="password"
          onChange={(e) => setPass(e.target.value)}
        />
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
            isDisabled={!email || !pass || !validateEmail(email)}
            isLoading={isLoading}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default LoginForm;
