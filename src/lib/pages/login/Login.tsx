/* eslint-disable prettier/prettier */
import {
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  SimpleGrid,
  Flex,
  Checkbox,
  Link,
  FormControl,
  FormLabel,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

import ThemeToggle from "lib/layout/ThemeToggle";
import Colors from "lib/styles/Colors";

import LeftCTA from "./components/LeftCTA";

const LoginScreen = () => {
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Box
      position="relative"
      bg={useColorModeValue("gray.50", "gray.800")}
      h="100vh"
    >
      <Box position="absolute" bottom={10} right={10}>
        <ThemeToggle />
      </Box>
      <Stack
        h="full"
        as={SimpleGrid}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 5, lg: 32 }}
        mx={{ base: 10, lg: 32 }}
        direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
        alignItems="flex-start"
      >
        <LeftCTA />
        <Flex
          width={isMobileScreen ? "100%" : "60%"}
          align="center"
          justify="center"
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={8}
            mx="auto"
            maxW="lg"
            py={12}
            px={6}
            textAlign={isMobileScreen ? "center" : "left"}
          >
            <Stack align="center">
              <Heading fontSize="4xl">Sign in to your account</Heading>
              <Text fontSize="lg" color="gray.500">
                to enjoy all of our cool {" "}
                <Link color={useColorModeValue(Colors.main, "blue.400")}>
                  features
                </Link>{" "}
                ✌️
              </Text>
            </Stack>
            <Box
              rounded="lg"
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="lg"
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Stack>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align="start"
                    justify="space-between"
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={useColorModeValue(Colors.main, "blue.400")}>
                      Forgot password?
                    </Link>
                  </Stack>
                  <Button
                    mt={100}
                    bg={useColorModeValue(Colors.main, "blue.400")}
                    color="white"
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    variant="outline"
                    color="white"
                  >
                    Create an account?
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default LoginScreen;
