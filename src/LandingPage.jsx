import React from "react";
import {
  ChakraProvider,
  extendTheme,
  Flex,
  Text,
  Button,
  Heading,
  AvatarGroup,
  Avatar,
  Container,
  Image,
  useBreakpointValue,
  useColorModeValue,
  Stack,
  VStack,
  Center,
  Badge,
  Box,
  Icon,
  List,
  ListItem,
  ListIcon,
  Divider,
  Link,
  Highlight,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import { SignInButton } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

import { CalendarHeart, LinkedinLogo } from "@phosphor-icons/react";

import theme from "./theme";

const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW="100%" py={1}>
      <Center py="8">
        <Image
          src="src/assets/logo.png"
          alt="Brainstorm logo"
          h={isMobile ? "30px" : "40px"}
          w="auto"
        />
      </Center>
    </Container>
  );
};

const HeroSection = () => {
  return (
    <Center flexDirection="column" justifyContent="center" w="100%" p={3}>
      <Heading
        textAlign="center"
        as="h1"
        fontSize="42px"
        lineHeight="1.1"
        fontWeight="700"
        letterSpacing="0em"
        mb={4}
        textStyle="headlineElevated"
        bgGradient="linear(to-b, white, brand.platinum)"
        bgClip="text"
      >
        <Highlight
          query={["matter with AI"]}
          styles={{
            px: "2",
            rounded: "full",
            bgGradient: "linear(to-b, yellow.200, brand.yellow)",
            bgClip: "text",
          }}
        >
          Make innovations matter with AI
        </Highlight>
      </Heading>
      <Text
        fontSize="19px"
        mb={6}
        color="gray.400"
        textAlign="center"
        text-edge="cap"
        font-variant-numeric="lining-nums proportional-nums stacked-fractions"
        lineHeight="1.4211026316"
        fontWeight="400"
        letterSpacing=".012em"
        bgGradient="linear(to-b, gray.500,brand.platinum)"
        bgClip="text"
      >
        Want better and friendly tools for your big idea? Brainstorm is easy to
        use for creative minds.
      </Text>
      <Flex width="100%" gap={1} justiffont-familyy="center" p={5}>
        <SignInButton
          appearance={{
            baseTheme: dark,
          }}
          path="/sign-in"
          signUpUrl="/sign-up"
        >
          <Button
            bg="brand.yellow"
            color="brand.black"
            fontSize="lg"
            fontWeight="400"
            line-height="1.1764805882"
            letterSpacing="-0.022em"
            borderRadius="xl"
            py="4"
            h="10"
            width="70%"
            mb="10"
          >
            Sign In
          </Button>
        </SignInButton>
      </Flex>

      <ScreenSection />
    </Center>
  );
};

const ScreenSection = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Container w="104%" h="50vh" position="relative" overflow="hidden">
      <Box
        position="absolute"
        r="0"
        w="150%"
        borderRadius="lg"
        bg={bgColor}
        boxShadow="2xl"
      >
        <Image
          src="/src/assets/screen.png"
          alt="Screen Mockup"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
    </Container>
  );
};

const Testimonials = () => {
  const padding = useBreakpointValue({ base: 3, md: 2 });
  const fontSize = useBreakpointValue({ base: ".85rem", md: ".6rem" });
  const avatarSize = useBreakpointValue({ base: "2xs", md: "xs" });

  return (
    <Badge
      alignItems="center"
      bg="gray.900"
      bgGradient="linear(to-t, gray.900, brand.black, gray.900)"
      borderRadius="full"
      opacity=".9"
      p={padding}
      pl={padding + 2}
    >
      <Flex>
        <AvatarGroup size={avatarSize} max={3} spacing={-1} mr={5}>
          <Avatar
            bg="red.700"
            border="none"
            name="Ryan Florence"
            src="/src/assets/avatars/avatar_1.png"
          />
          <Avatar
            bg="blue.700"
            border="none"
            name="Segun Adebayo"
            src="/src/assets/avatars/avatar_2.png"
          />
          <Avatar
            bg="green.700"
            border="none"
            name="Kent Dodds"
            src="/src/assets/avatars/avatar_4.png"
          />
        </AvatarGroup>
        <Text
          fontSize={fontSize}
          mr={padding}
          textTransform="none"
          fontWeight="400"
          color="brand.platinum"
        >
          Trusted by 1 innovator
        </Text>
      </Flex>
    </Badge>
  );
};

const roadmapItems = [
  {
    month: "May 2024",
    details: [
      "Adding history.",
      "Enhancing output for more refined idea results.",
    ],
    icon: CalendarHeart,
  },
  {
    month: "June 2024",
    details: [
      "Customizing tools to fit user-specific needs.",
      "Idea improvement process.",
      "Collaboration features.",
    ],
    icon: CalendarHeart,
  },
  {
    month: "August 2024",
    details: [
      "Integrating user feedback mechanisms.",
      "Implementing AI for idea recommendations.",
      "Developing personalized user dashboards.",
      "Enhancing usability with accessibility features.",
    ],
    icon: CalendarHeart,
  },
];

const DashedLine = () => (
  <Box
    position="absolute"
    left=".2rem"
    top="0"
    bottom="0"
    opacity=".2"
    width="2px"
    bgImage="linear-gradient(to bottom, brand.yellow 60%,transparent 0%, brand.platinum 50%, transparent 100%)"
    bgSize="3px 20px"
    zIndex="1"
  />
);

const RoadmapSection = () => {
  const brandColor = useColorModeValue("brand.yellow", "brand.yellow");

  return (
    <VStack spacing={5} my={10} align="center" w="full" px={5}>
      <Badge
        borderRadius="full"
        p="1"
        px="3"
        fontSize="0.5em"
        colorScheme="green"
      >
        Upcoming
      </Badge>
      <Heading
        size="xl"
        textAlign="center"
        mb={4}
        color={brandColor}
        bgGradient="linear(to-b, yellow.200,brand.yellow)"
        bgClip="text"
      >
        Roadmap features
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {roadmapItems.map((item, index) => (
          <Box
            key={index}
            p={5}
            shadow="xl"
            borderRadius="lg"
            overflow="hidden"
            bgGradient="linear(to-b, gray.800, brand.black, black)"
            color="brand.platinum"
          >
            <Flex gap="4">
              <Icon as={item.icon} w={6} h={6} mb={4} color={brandColor} />
              <Text fontSize="1rem" fontWeight="900">
                {item.month}
              </Text>
            </Flex>
            {item.details.map((detail, idx) => (
              <Text
                key={idx}
                fontSize="md"
                fontWeight="200"
                lineHeight="tall"
                mb={1}
              >
                {detail}
              </Text>
            ))}
          </Box>
        ))}
      </Grid>
    </VStack>
  );
};

const Footer = () => {
  return (
    <Box w="full" bg="brand.yellow" p={4} color="brand.black">
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        textAlign="center"
      >
        <Text fontSize="sm" mb={{ base: 1, md: 0 }}>
          Crafted by Adam Kundrat
        </Text>
        <Text fontSize="xs" mb={{ base: 2, md: 0 }}>
          UX/UI Graphic Designer @ Erste Digital
        </Text>
        <Link href="https://www.linkedin.com/in/kundratadam/" isExternal>
          <IconButton
            aria-label="LinkedIn Profile"
            icon={<LinkedinLogo weight="fill" />}
            fontSize="2xl"
            color="brand.cornflowerBlue"
            variant="ghost"
            _hover={{
              color: "brand.cornflowerBlue",
              transform: "translateY(-2px)",
              shadow: "lg",
            }}
          />
        </Link>
      </Flex>
    </Box>
  );
};

const LandingPage = () => {
  return (
    <ChakraProvider theme={theme}>
      <Stack
        spacing={0}
        alignItems="center"
        w="100vw"
        minH="100vh"
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage="url('/src/assets/background.png')"
          bgPos="top"
          bgSize="fill"
          bgRepeat="no-repeat"
          zIndex={0}
        />
        <Navbar />
        <Testimonials />
        <HeroSection />

        <RoadmapSection />
        <Footer />
      </Stack>
    </ChakraProvider>
  );
};

export default LandingPage;
