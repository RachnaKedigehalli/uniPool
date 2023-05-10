import React from "react";
import NavBar from "../components/Navbar/Navbar.tsx";
import { Box, flexbox, useColorModeValue } from "@chakra-ui/react";
import Banner from "../components/Banner.js";
import env from "react-dotenv";
const LandingPage = () => {
  return (
    <>
      <Box
        bg={useColorModeValue("bg.light", "bg.dark")}
        style={{
          flex: "1",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Banner />
      </Box>
    </>
  );
};

export default LandingPage;
