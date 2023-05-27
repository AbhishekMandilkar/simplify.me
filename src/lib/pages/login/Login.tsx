/* eslint-disable no-console */
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
  Link,
  FormControl,
  FormLabel,
  useColorModeValue,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { Google } from "iconsax-react";
import { useState } from "react";

import { login, register } from "lib/configs/appwrite";
import { ACCOUNT_CONFIGURATION } from "lib/constants";
import ThemeToggle from "lib/layout/ThemeToggle";
import Colors from "lib/styles/Colors";

import LeftCTA from "./components/LeftCTA";
import { ILoginScreenContext } from "./interfaces";

const LoginScreen = () => {
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  const accentColor = useColorModeValue(Colors.main, "blue.400");
  const toast = useToast();
  const [screenContext, setScreenContext] = useState<ILoginScreenContext>(
    ILoginScreenContext.LOGIN
  );

  const [componentState, setComponentState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleScreenContextChange = (context: ILoginScreenContext) => {
    setComponentState({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
    setScreenContext(context);
  };

  const handleInputChange = (e: any) => {
    setComponentState({
      ...componentState,
      [e.target.id]: e.target.value,
    });
  };

  const handleCreateAccount = () => {
    register(componentState.email, componentState.password, "dasdsa").then(
      (response) => {
        if (response.$id) {
          localStorage.setItem(
            ACCOUNT_CONFIGURATION.USER,
            JSON.stringify(response)
          );
        }
      },
      (error) => {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    );
  };

  const handleLogin = () => {
    login(componentState.email, componentState.password)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderNameField = () => (
    <FormControl id="name">
      <FormLabel>Name</FormLabel>
      <Input id="name" onChange={handleInputChange} />
    </FormControl>
  );

  const renderEmailField = () => (
    <FormControl id="email">
      <FormLabel>Email address</FormLabel>
      <Input type="email" id="email" onChange={handleInputChange} />
    </FormControl>
  );

  const renderPasswordFields = () => (
    <>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input type="password" id="password" onChange={handleInputChange} />
      </FormControl>
      {screenContext === ILoginScreenContext.REGISTER && (
        <FormControl id="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            id="confirmPassword"
            onChange={handleInputChange}
          />
        </FormControl>
      )}
    </>
  );

  const renderLoginForm = () => (
    <>
      {renderEmailField()}
      {renderPasswordFields()}
      <Stack>
        <Stack
          direction={{ base: "column", sm: "row" }}
          align="start"
          justify="space-between"
        >
          <Link color={accentColor}>Forgot password?</Link>
        </Stack>
        <Button
          bg={accentColor}
          color="white"
          _hover={{
            bg: "blue.500",
          }}
          onClick={handleLogin}
        >
          Sign in
        </Button>
        <Button variant="outline" rightIcon={<Google variant="Bold" />}>
          Continue with
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            handleScreenContextChange(ILoginScreenContext.REGISTER)
          }
        >
          Create an account?
        </Button>
      </Stack>
    </>
  );
  const renderRegisterForm = () => (
    <>
      {renderNameField()}
      {renderEmailField()}
      {renderPasswordFields()}
      <Stack>
        <Button
          bg={accentColor}
          color="white"
          _hover={{
            bg: "blue.500",
          }}
          onClick={handleCreateAccount}
        >
          Sign up
        </Button>
        <Button
          onClick={() => handleScreenContextChange(ILoginScreenContext.LOGIN)}
          variant="outline"
        >
          Sign In
        </Button>
      </Stack>
    </>
  );

  const renderForm = () => {
    switch (screenContext) {
      case ILoginScreenContext.LOGIN:
        return renderLoginForm();
      case ILoginScreenContext.REGISTER:
        return renderRegisterForm();
      default:
        return renderLoginForm();
    }
  };

  return (
    <Box
      position="relative"
      bg={useColorModeValue("gray.50", "gray.800")}
      h="100vh"
    >
      {!isMobileScreen && (
        <Box position="absolute" bottom={10} right={10}>
          <ThemeToggle />
        </Box>
      )}
      <Stack
        h="full"
        as={SimpleGrid}
        spacing={{ base: 5, lg: 32 }}
        py={{ base: 5, sm: 5, lg: 32 }}
        mx={{ base: 5, lg: 32 }}
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
            // py={12}
            // px={6}
            textAlign={isMobileScreen ? "center" : "left"}
          >
            <Stack align="center">
              <Heading fontSize="4xl">Sign in to your account</Heading>
              <Text fontSize="lg" color="gray.500">
                to enjoy all of our cool{" "}
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
              <Stack spacing={4}>{renderForm()}</Stack>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
};

export default LoginScreen;
