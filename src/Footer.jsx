import React from "react";
import { Stack, Box, Text, IconButton, Tooltip } from "@chakra-ui/react";
import { GithubLogo } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <Stack
      m={0}
      direction="row"
      align="center"
      justify="space-between" // Align content to the edges
      bg="gray.900" // Background color
      p={4} // Padding
      position="fixed" // Fixed position so it always stays at the bottom
      bottom={0} // Align at the bottom
      width="100vw" // Full width
      zIndex={10} // Ensure it's above other content
    >
      <Box textAlign="center" flex="1">
        <Text fontSize="sm" color="gray.500">
          © 2024 Adam All rights reserved.
        </Text>
      </Box>
      <Box textAlign="center">
        <Tooltip label="GitHub Repository" aria-label="GitHub Repository">
          <IconButton
            as="a"
            href="https://github.com/your-username/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            icon={<GithubLogo />}
            colorScheme="gray"
            variant="ghost"
          />
        </Tooltip>
      </Box>
    </Stack>
  );
};

export default Footer;
