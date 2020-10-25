import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Box, Text } from "@chakra-ui/core";
import useColorMode from "../hooks/useColorMode";
import { useApi } from "../hooks/useApi";
import { api } from "../api";

export default function Recently() {
  const [colorMode] = useColorMode();
  const [r, loading, getFullHistory] = useApi(
    api.historyController.getFullHistory
  );

  const load = async () => {
    const res = await getFullHistory(localStorage.getItem("id"));
    console.log(res);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout>
      <Box
        position="absolute"
        w={["100%", "100%", "500px"]}
        h="100vh"
        bg={colorMode === "light" ? "rgb(255,255,255,0.85)" : "rgb(0,0,0,0.85)"}
        color={colorMode === "light" ? "primary.black" : "primary.white"}
        zIndex="-1"
      />
      {loading && (
        <Text color={colorMode === "light" ? "primary.black" : "primary.white"}>
          Recently watched
        </Text>
      )}
    </Layout>
  );
}
