import {
  Stack,
  Heading,
  useColorModeValue,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import Colors from "lib/styles/Colors";

function LeftCTA() {
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Stack
      spacing={{ base: 10, md: 20 }}
      textAlign={[
        "center", // base
        "center", // 480px upwards
        "left", // 768px upwards
      ]}
    >
      <Heading
        borderWidth={1}
        lineHeight={1.5}
        fontSize={{ sm: "2xl", md: "5xl" }}
      >
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
    </Stack>
  );
}

export default LeftCTA;
