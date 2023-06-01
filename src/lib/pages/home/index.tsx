import { Button, Grid } from "@chakra-ui/react";
import { useContext } from "react";

import { AppWriteServices } from "lib/configs/appwrite";
import { AuthContext } from "lib/context/AuthProvider/AuthenticationProvider";

import CTASection from "./components/CTASection";
import SomeImage from "./components/SomeImage";
import SomeText from "./components/SomeText";

const Home = () => {
  const { removeLoginUserInfo } = useContext(AuthContext);
  const handleLogout = () => {
    AppWriteServices.logout().then(() => removeLoginUserInfo());
  };

  return (
    <Grid gap={4}>
      <SomeText />
      <SomeImage />
      <CTASection />
      <Button onClick={() => handleLogout()}>Logout</Button>
    </Grid>
  );
};

export default Home;
