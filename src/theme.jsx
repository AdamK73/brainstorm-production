import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter/400.css"; // For body text normal
import "@fontsource/inter/700.css"; // For body text bold

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "brand.black",
        backgroundPosition: "0 0, 25px 25px",
        backgroundSize: "50px 50px",
      },
    },
  },
  fonts: {
    heading: "Sora, sans-serif",
    body: "Inter, sans-serif",
  },
  textStyles: {
    headlineElevated: {
      fontSize: { base: "1rem", md: "40px" }, // smaller on base, 40px on md screens and up
      lineHeight: "1.1",
      fontWeight: "600",
      letterSpacing: "0em",
      as: "h1",
      fontFamily: "Inter, sans-serif",
    },
    siteBody: {
      fontSize: { base: "16px", md: "19px" }, // smaller on base, 19px on md screens and up
      lineHeight: "1.4211026316",
      fontWeight: "600",
      letterSpacing: ".012em",
      fontFamily: "Inter, sans-serif",
    },
  },
  colors: {
    brand: {
      light: "#f4f4f4",
      dark: "#333",
      primary: "#000",
      secondary: "#686868",
      platinum: "#D9D9D9",
      cornflowerBlue: "#5E85EE",
      yellow: "#D7FC6E",
      black: "#070707",
      violetWeb: "#F284F2",
    },
  },
  components: {
    Heading: {
      baseStyle: (props) => ({
        textStyle:
          props.colorMode === "dark" ? "headlineElevated" : "headlineElevated",
      }),
    },
    Text: {
      baseStyle: (props) => ({
        textStyle: props.colorMode === "dark" ? "siteBody" : "siteBody",
      }),
    },
  },
});

export default theme;
