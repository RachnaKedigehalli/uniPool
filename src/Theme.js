import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    navbar: "Poppins",
    body: `'Poppins', sans-serif`,
  },
  fontSizes: {
    banner: "4.5vw",
    headings: "2.6vw",
    navbar: "18px",
    logo: "1.3vw",
    petitionFormField: "1.2vw",
  },
  colors: {
    bg: {
      dark: "#000000",
      light: "#ffffff",
    },
    accents: {
      pink: "#F8CEFA",
      blue: "#777EFF",
      grad: "linear-gradient(60deg, #F8CEFA, #777EFF)",
    },
  },
  radii: {},
  sizes: {},
});

export default theme;
