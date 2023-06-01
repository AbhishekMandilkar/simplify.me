/* eslint-disable no-console */
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
  FormErrorMessage,
} from "@chakra-ui/react";
import { Google } from "iconsax-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppWriteServices } from "lib/configs/appwrite";
import { ACCOUNT_CONFIGURATION } from "lib/constants";
import { AuthContext } from "lib/context/AuthProvider/AuthenticationProvider";
import Meta from "lib/layout/Meta";
import ThemeToggle from "lib/layout/ThemeToggle";
import Colors from "lib/styles/Colors";

import LeftCTA from "./components/LeftCTA";
import { ValidateForm } from "./helper";
import type { ILoginScreenComponentState } from "./interfaces";
import { ILoginScreenContext } from "./interfaces";

const LoginScreen = () => {
  const { storeLoginUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMobileScreen = useBreakpointValue(
    { base: true, md: true, lg: false },
    { ssr: false }
  );
  const accentColor = useColorModeValue(Colors.main, "blue.400");
  const toast = useToast();
  const [screenContext, setScreenContext] = useState<ILoginScreenContext>(
    ILoginScreenContext.LOGIN
  );

  const [componentState, setComponentState] =
    useState<ILoginScreenComponentState>({
      email: "abhi@simp.com",
      password: "asdf1234",
      confirmPassword: "",
      name: "",
    });

  const [componentError, setComponentError] =
    useState<ILoginScreenComponentState>({
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
    setComponentError({
      ...componentError,
      [e.target.id]: "",
    });
  };

  const handleCreateAccount = () => {
    AppWriteServices.register(
      componentState.email,
      componentState.password,
      componentState.name
    ).then(
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
          position: "top",
        });
      }
    );
  };

  const handleLogin = () => {
    const formData = ValidateForm(componentState, ILoginScreenContext.LOGIN);
    if (!formData.isValid) {
      setComponentError(formData.componentError);
      return;
    }
    AppWriteServices.login(componentState.email, componentState.password)
      .then((data) => {
        if (data.$id) {
          storeLoginUserInfo(data);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "An error occurred.",
          description: error?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const renderNameField = () => (
    <FormControl id="name" isInvalid={!!componentError.name}>
      <FormLabel>Name</FormLabel>
      <Input
        value={componentState.name}
        id="name"
        onChange={handleInputChange}
      />
    </FormControl>
  );

  const renderEmailField = () => (
    <FormControl id="email" isInvalid={!!componentError.email}>
      <FormLabel>Email address</FormLabel>
      <Input
        value={componentState.email}
        type="email"
        id="email"
        onChange={handleInputChange}
      />
      {componentError.email && (
        <FormErrorMessage>{componentError.email}</FormErrorMessage>
      )}
    </FormControl>
  );

  const renderPasswordFields = () => (
    <>
      <FormControl id="password" isInvalid={!!componentError.password}>
        <FormLabel>Password</FormLabel>
        <Input
          value={componentState.password}
          type="password"
          id="password"
          onChange={handleInputChange}
        />
        {componentError.password && (
          <FormErrorMessage>{componentError.password}</FormErrorMessage>
        )}
      </FormControl>
      {screenContext === ILoginScreenContext.REGISTER && (
        <FormControl
          id="confirmPassword"
          isInvalid={!!componentError.confirmPassword}
        >
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
          onClick={() => handleLogin()}
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
          onClick={() => handleCreateAccount()}
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
      className="custom-bg"
      bg={useColorModeValue("gray.50", "gray.800")}
      h="100vh"
      borderWidth={1}
    >
      <Meta />
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
        direction={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
        }}
        alignItems="flex-start"
      >
        <LeftCTA />
        <Flex
          width={isMobileScreen ? "100%" : "50%"}
          alignItems="center"
          justifyContent="center"
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack width="70%">
            <Stack
              align="center"
              textAlign={isMobileScreen ? "center" : "left"}
            >
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
              flex={1}
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
