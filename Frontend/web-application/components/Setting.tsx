import React from "react";
import useColorMode from "../hooks/useColorMode";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Switch,
  Text,
} from "@chakra-ui/core";
import Layout from "../components/Layout";

export default function Settings() {
  const [colorMode, changeColorMode] = useColorMode();

  return (
    <Layout>
      <Box
        position="absolute"
        w={["100%", "100%", "500px"]}
        h="100vh"
        bg={colorMode === "light" ? "rgb(255,255,255,0.85)" : "rgb(0,0,0,0.85)"}
        color={colorMode === "light" ? "primary.black" : "primary.white"}
        zIndex="-1"
        px={6}
      >
        <Flex w="100%" h="100px" my={8} align="center" justify="space-between">
          <Box w="100px">
            <Image src="https://duck-duck-code.s3.eu-central-1.amazonaws.com/icons/Logo.svg" />
          </Box>
          <Heading size="md">Duck Duck Code</Heading>
        </Flex>

        <Divider />

        <Flex my={8} justify="space-between">
          <Text fontWeight="bold">Dark Mode</Text>
          <Switch
            size="lg"
            onChange={changeColorMode}
            isChecked={colorMode === "dark"}
          />
        </Flex>
      </Box>
    </Layout>
  );
}
