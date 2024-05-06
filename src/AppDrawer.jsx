import React from "react";
import {
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  VStack,
  Box,
  Text,
  Select,
  useDisclosure,
  IconButton,
  Flex,
  Icon,
  Badge,
  useColorMode, // Make sure to import useColorMode
} from "@chakra-ui/react";
import {
  Moon,
  Sun,
  Equals,
  MagnifyingGlass,
  Plus,
  ChatTeardropText,
  OpenAiLogo,
} from "@phosphor-icons/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import Chat from "./Chat";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import theme from "./theme";

const AppDrawer = ({ onModelSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode(); // Now correctly imported and used

  return (
    <>
      <Flex py={5}>
        <IconButton
          icon={<Equals size={24} />}
          onClick={onOpen}
          aria-label="Open menu"
        />
        <Badge
          colorScheme="blue"
          borderRadius="full"
          display="flex"
          alignItems="center"
          p={3}
        >
          Powered by GPT-4
          <Icon as={OpenAiLogo} ml={2} boxSize={4} color="blue.500" />
        </Badge>
        <IconButton onClick={toggleColorMode} colorScheme="blue">
          {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </IconButton>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={4} p={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MagnifyingGlass size={20} />
                </InputLeftElement>
                <Input placeholder="Search" />
              </InputGroup>
              <Button leftIcon={<Plus size={20} />} colorScheme="blue" w="full">
                Add New
              </Button>
              <Select
                placeholder="Select model"
                onChange={onModelSelect}
                w="full"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
              </Select>
              <Box w="full" mt={4}>
                <Text fontSize="lg" mb={2} fontWeight="semibold">
                  Recent Ideas
                </Text>
                {[
                  "AI-driven Finance App",
                  "Virtual Reality Social Platform",
                  "Automated Content Generator",
                ].map((idea, index) => (
                  <Box key={index} p={2}>
                    <IconButton
                      aria-label="Open chat"
                      icon={<ChatTeardropText size={20} />}
                      size="sm"
                      mr={2}
                    />
                    <Text display="inline">{idea}</Text>
                  </Box>
                ))}
              </Box>
              <UserButton />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppDrawer;
