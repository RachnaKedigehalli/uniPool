import React from "react";
import banner_light from "../assets/banner_light.png";
import banner_dark from "../assets/banner_dark.png";
import {
  Box,
  Image,
  useColorModeValue,
  Text,
  useColorMode,
} from "@chakra-ui/react";
const Banner = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "20px 40px 20px 25px",
      }}
      bg={useColorModeValue("bg.light", "bg.dark")}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "10%",
        }}
      >
        <Text
          style={{
            fontSize: 55,
            // fontWeight: "900",
            fontWeight: "bold",
          }}
          fontFamily={"heading"}
        >
          Ride together,
        </Text>
        <Text
          style={{
            fontSize: 55,
            fontWeight: "900",
          }}
          fontFamily={"heading"}
        >
          save together with{" "}
          <span
            style={{
              color: `${colorMode == "light" ? "#777EFF" : "#F8CEFA"}`,
            }}
          >
            uniPool
          </span>
        </Text>
      </Box>
      <Image
        src={colorMode == "light" ? banner_light : banner_dark}
        h={"550px"}
      ></Image>
    </Box>
  );
};

export default Banner;
