import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  VStack,
  Select,
} from "@chakra-ui/react";
import { Plus, MagnifyingGlass } from "@phosphor-icons/react";

const CustomDrawer = ({ isOpen, onClose, onModelSelect }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <VStack spacing="24px">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MagnifyingGlass size={20} />
              </InputLeftElement>
              <Input placeholder="Search" />
            </InputGroup>
            <Button leftIcon={<Plus size={20} />} colorScheme="blue">
              Add New
            </Button>
            <Select placeholder="Select model" onChange={onModelSelect}>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
            </Select>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
