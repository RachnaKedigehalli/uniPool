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
    tags: "0.7vw",
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
    tagText: {
      light: "#afafaf",
      dark: "#f2f2f2",
    },
  },
  radii: {
    button: "100px",
    input: "20px",
  },
  sizes: {},
});

export default theme;
