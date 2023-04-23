import React from "react";
import NavBar from "../components/Navbar/Navbar.tsx";
import { Box, flexbox, useColorModeValue } from "@chakra-ui/react";
import Banner from "../components/Banner.js";

const LandingPage = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Box
        bg={useColorModeValue("bg.light", "bg.dark")}
        style={{
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
