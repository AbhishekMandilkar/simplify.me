import {
  Stack,
  Heading,
  useColorModeValue,
  Text,
  useBreakpointValue,
  Box,
  Spacer,
} from "@chakra-ui/react";

import ThemeToggle from "lib/layout/ThemeToggle";
import Colors from "lib/styles/Colors";

function LeftCTA() {
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Stack
      w="100%"
      alignItems="center"
      spacing={{ base: 10, md: 20 }}
      direction={["row", "row", "row", "row"]}
      textAlign={[
        "center", // base
        "center", // 480px upwards
        "left", // 768px upwards
      ]}
    >
      <Heading lineHeight={1.5} fontSize={{ sm: "2xl", md: "5xl" }}>
        {isMobileScreen ? null : (
          <>
            Welcome to <br />
          </>
        )}

        <Text
          lineHeight={1.1}
          as="span"
          color={useColorModeValue(Colors.main, "blue.500")}
          fontSize={{ sm: "4xl", md: "9xl" }}
        >
          Simplify.me <br />
        </Text>
        {isMobileScreen ? null : (
          <Text fontSize={{ sm: "2xl", md: "5xl" }} as="span">
            Streamline Your Ultimate Productivity Companion
          </Text>
        )}
      </Heading>
      {isMobileScreen && (
        <>
          <Spacer />
          <Box>
            <ThemeToggle />
          </Box>
        </>
      )}
    </Stack>
  );
}

export default LeftCTA;
