import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box h="100vh" transition="0.5s ease-out">
      <Box width="full" as="main">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
