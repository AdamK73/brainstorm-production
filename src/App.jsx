import React, { useState } from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  useMediaQuery,
  Text,
  Center,
} from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Chat from "./Chat";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import AppDrawer from "./AppDrawer";
import theme from "./theme";

function App() {
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [isDesktop] = useMediaQuery("(min-width: 1024px)"); // Example breakpoint for desktop

  const handleModelSelect = (event) => {
    setModel(event.target.value);
  };

  if (isDesktop) {
    return (
      <ChakraProvider>
        <Center height="100vh" w="100vw">
          <Text textAlign="center" fontSize="xl" fontWeight="bold">
            Site Under Construction, use mobile please 👀
          </Text>
        </Center>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Box className="App">
          <Flex>
            <AppDrawer onModelSelect={handleModelSelect} />
          </Flex>
          <Chat h="100vw" model={model} />
        </Box>
        <Footer />
      </SignedIn>
    </ChakraProvider>
  );
}

export default App;
