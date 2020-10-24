import { Button, useColorMode } from "@chakra-ui/core";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return <Button onClick={toggleColorMode}>Change mode</Button>;
}
