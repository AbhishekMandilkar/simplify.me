import {
  Stack,
  Heading,
  useColorModeValue,
  Text,
  useBreakpointValue,
  Box,
  Spacer,
  HStack,
} from "@chakra-ui/react";

import ThemeToggle from "lib/layout/ThemeToggle";
import Colors from "lib/styles/Colors";

function LeftCTA() {
  const isMobileScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });
  const mainAccent = useColorModeValue(Colors.main, "blue.500");
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isMobileScreen ? (
        <HStack w="100%">
          <Heading>
            <Text
              lineHeight={1.1}
              as="span"
              color={mainAccent}
              fontSize={{ sm: "4xl" }}
            >
              Simplify.me <br />
            </Text>
          </Heading>
          <Spacer />
          <Box>
            <ThemeToggle />
          </Box>
        </HStack>
      ) : (
        <Stack
          w="50%"
          alignItems="center"
          spacing={{ base: 10, md: 20 }}
          direction={["row", "row", "row", "row"]}
          textAlign={[
            "center", // base
            "center", // 480px upwards
            "left", // 768px upwards
          ]}
        >
          <Heading lineHeight={1.5} fontSize={{ sm: "2xl", md: "4xl" }}>
            {isMobileScreen ? null : (
              <>
                Welcome to <br />
              </>
            )}

            <Text
              lineHeight={1.1}
              as="span"
              color={mainAccent}
              fontSize={{ sm: "4xl", md: "5xl", lg: "6xl" }}
            >
              Simplify.me <br />
            </Text>
            {isMobileScreen ? null : (
              <Text fontSize={{ sm: "2xl", md: "4xl" }} as="span">
                Streamline Your Ultimate Productivity Companion
              </Text>
            )}
          </Heading>
        </Stack>
      )}
    </>
  );
}

export default LeftCTA;
