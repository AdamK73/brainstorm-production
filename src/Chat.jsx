import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Heading,
  Textarea,
  theme,
  useColorModeValue,
  Container,
  Stack,
  Tag,
  TagLabel,
  Text,
  useToast,
  Icon,
  Highlight,
  Tooltip,
  Skeleton,
  HStack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  Asterisk,
  Robot,
  CircleWavyCheck,
  LightbulbFilament,
} from "@phosphor-icons/react";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tokenUsage, setTokenUsage] = useState(0);

  // Responsive settings for font size and icon size
  const tagFontSize = useBreakpointValue({ base: "xs", md: "sm" });
  const iconSize = useBreakpointValue({ base: "sm", md: "md" });

  // Styling for buttons and text

  const toast = useToast();
  const inputBg = useColorModeValue("white", "gray.700");
  const inputTextColor = useColorModeValue("gray.800", "white");
  const buttonColor = useColorModeValue("gray.800", "black");
  const bulletPointColor = useColorModeValue("#6B7280", "#9CA3AF"); // Light mode: Medium grey, Dark mode: Light grey;
  const buttonBg = useColorModeValue("#CCFF00", "#CCFF00");
  const buttonHoverBg = useColorModeValue("#B2FF59", "#B2FF59");

  const handlePromptChange = (e) => {
    if (e.target.value.length <= 256) {
      setPrompt(e.target.value);
    }
  };

  const handleTagClick = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateIdea();
    }
  };

  const generateIdea = async () => {
    setIsLoading(true);
    const apiKey = import.meta.env.VITE_APP_OPENAI_API_KEY;
    if (!apiKey) {
      console.error("API KEY is not set or empty.");
      setIsLoading(false);
      return;
    }

    const structuredPrompt = createStructuredPrompt(selectedTags);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: structuredPrompt },
              { role: "user", content: prompt },
            ],
            max_tokens: 1024,
            temperature: 0.5,
          }),
        }
      );
      const data = await response.json();
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        setResponse(data.choices[0].message.content.trim());
        setTokenUsage(data.usage.total_tokens);
        showToast("Idea generated successfully!", "success");
      } else {
        setResponse("No valid response received.");
      }
    } catch (error) {
      console.error("Error in fetching data:", error);
      setResponse("Failed to fetch response.");
      showToast("Failed to generate idea. Please try again.", "error");
    }
    setIsLoading(false);
  };

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  const createStructuredPrompt = (selectedTags) => {
    const tagDescriptions = selectedTags.map((tag) => {
      switch (tag) {
        case "INTERNAL":
          return "Generate innovative app ideas tailored for internal corporate use, leveraging AI-driven analytics and cutting-edge technologies to optimize workflows and enhance productivity.";
        case "EXTERNAL":
          return "Connect communities through a platform that adapts to their evolving needs.";
        case "CRAZY":
          return "Revolutionize industry standards by creating an innovative app that seamlessly integrates virtual and physical environments, setting new benchmarks for user experience and engagement.";
        default:
          return "";
      }
    });
    return `Your mission is to envision a groundbreaking app concept that can catalyze change. Ensure the idea adheres to the following:
  
    - Craft a succinct headline that encapsulates the app's core proposition. (dont use headline:!!!)
    - Enumerate the main points that underscore the app's unique value proposition and potential benefits.
    - Steer clear of naming the app to maintain flexibility in branding.
    - Shun ideas that don't translate into practical, actionable solutions.
    - Pursue only those concepts that push the envelope and introduce new possibilities.
    - No sucky fluff ideas that are fucking cliché!!!!
    - provide only real values ideas
    - don't write things on start like "Key Points:", "Headline: "

  
    ${tagDescriptions.join("\n")}`;
  };
  const RenderResponse = ({ responseText, isLoading }) => {
    if (isLoading) {
      return (
        <Box textAlign="center">
          <Stack spacing={4}>
            <Stack w="90vw">
              <Skeleton
                height="30px"
                isLoaded={!isLoading}
                fadeDuration={0.4}
                startColor="blue.600"
                endColor="blue.300"
              >
                <Box>Loading.. </Box>
              </Skeleton>
            </Stack>
            <Stack w="60vw">
              <Skeleton
                height="30px"
                isLoaded={!isLoading}
                fadeDuration={0.4}
                startColor="blue.400"
                endColor="blue.100"
              >
                <Box>Loading.. </Box>
              </Skeleton>
            </Stack>
            <Stack w="70vw">
              <Skeleton
                height="30px"
                isLoaded={!isLoading}
                fadeDuration={0.4}
                startColor="blue.800"
                endColor="blue.400"
              >
                <Box>Loading.. </Box>
              </Skeleton>
            </Stack>
          </Stack>
        </Box>
      );
    }

    if (!responseText || typeof responseText !== "string") {
      return null;
    }

    const lines = responseText.split("\n").filter((line) => line.trim() !== "");
    const title = lines[0];
    const bulletPoints = lines.slice(1);
    const words = title.split(" ");
    const highlightQuery = words.slice(0, 4).join(" ");

    return (
      <Container W="100vv" p={1} centerContent>
        <Box w="90vw" borderRadius="lg" p={1} align="left">
          <Heading
            as="h1"
            lineHeight="tall"
            color="green.100"
            size="md"
            mb={5}
            fontWeight="bold"
            isTruncated={false} // This ensures text does not get truncated
            noOfLines={{ base: 4, md: 1 }} // Allows text to wrap in base (mobile view) and restricts to one line in md (tablet view and above)
          >
            <Highlight
              query={highlightQuery}
              styles={{ px: "2", py: "1", rounded: "md", bg: "teal.100" }}
            >
              {title}
            </Highlight>
          </Heading>
          {bulletPoints.map((point, index) => (
            <Box
              key={index}
              my={2}
              mb={5}
              borderRadius="md"
              bg="gray.700"
              p={3}
            >
              <Box display="flex" alignItems="start">
                <Icon
                  as={Asterisk}
                  color={bulletPointColor}
                  weight="duotone"
                  boxSize={6}
                  mr={2}
                />
                <Text color="gray.300" fontSize="md" fontWeight="semibold">
                  {point}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="100vw" h="100vh" p={4} centerContent>
        <Stack w="90vw" spacing={5} alignItems="center">
          <Textarea
            placeholder="Enter your prompt here..."
            bg={inputBg}
            color={inputTextColor}
            value={prompt}
            onChange={handlePromptChange}
            onKeyPress={handleKeyPress}
            borderRadius="md"
            size="sm"
            resize="none"
            p={3}
            m={1}
          />
          <HStack
            w="full" // Full width container
            overflowX="scroll"
            spacing={4}
            justifyContent="space-between" // Justify content space between
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {[
              {
                name: "INTERNAL",
                icon: CircleWavyCheck,
                description: "Generate internal corporate solutions",
              },
              {
                name: "INNOVATIVE",
                icon: LightbulbFilament,
                description: "Create groundbreaking and innovative apps",
              },
            ].map((tag) => (
              <Tooltip
                key={tag.name}
                hasArrow
                label={tag.description} // Tooltip specific to each tag
                bg="gray.200"
                color="black"
                placement="top" // Ensuring tooltip is visible on top of the tag
              >
                <Tag
                  onClick={() => handleTagClick(tag.name)}
                  colorScheme={
                    selectedTags.includes(tag.name) ? "green" : "gray"
                  }
                  cursor="pointer"
                  p={3}
                  size="lg"
                  borderRadius="lg"
                  width="full"
                >
                  <IconButton
                    aria-label={tag.description}
                    icon={<tag.icon />}
                    size={iconSize}
                    borderRadius="lg"
                    mr={2}
                  />
                  <TagLabel fontSize={tagFontSize}>{tag.name}</TagLabel>
                </Tag>
              </Tooltip>
            ))}
          </HStack>
          <Button
            rightIcon={<Robot />}
            bg={buttonBg}
            color={buttonColor}
            _hover={{ bg: buttonHoverBg }}
            isLoading={isLoading}
            loadingText="Generating..."
            onClick={generateIdea}
            w="full"
            mt={1}
            mx={3}
            py={7}
            px={6}
          >
            Generate
          </Button>
          <Text fontSize="sm" color="gray.600" mt={4}>
            Tokens used for this response: {tokenUsage}
          </Text>
          {response && (
            <RenderResponse responseText={response} isLoading={isLoading} />
          )}
        </Stack>
      </Container>
    </ChakraProvider>
  );
};

export default Chat;
