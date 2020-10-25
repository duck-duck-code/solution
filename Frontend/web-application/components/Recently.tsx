import React, { useEffect } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { IoMdClose, IoIosTimer } from "react-icons/io";
import Layout from "../components/Layout";
import {
  Box,
  HStack,
  Stack,
  Text,
  Image,
  Icon,
  Heading,
  Flex,
} from "@chakra-ui/core";
import useColorMode from "../hooks/useColorMode";
import { useApi } from "../hooks/useApi";
import { api } from "../api";

export default function Recently() {
  const [colorMode] = useColorMode();
  const [requests, loading, getFullHistory] = useApi(
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

      <Stack
        position="absolute"
        w={["100%", "100%", "500px"]}
        bg={
          colorMode === "light"
            ? "primary.sandstone"
            : "secondary.graphiteBlack"
        }
        p={[2, 4, 6]}
        borderRadius="0 0 5px 5px"
        spacing={4}
      >
        <Heading
          size="md"
          color={colorMode === "light" ? "primary.black" : "primary.white"}
          mb={6}
        >
          Последние запросы
        </Heading>

        {loading && (
          <Text
            textAlign="center"
            color={colorMode === "light" ? "primary.black" : "primary.white"}
          >
            Загрузка...
          </Text>
        )}

        {requests && !loading && requests.length > 0
          ? requests.reverse().map((request, i) => {
              return (
                i < 5 && (
                  <Flex
                    key={i}
                    bg={
                      colorMode === "light"
                        ? "primary.white"
                        : "secondary.graphiteBlue"
                    }
                    borderRadius="5px"
                    align="center"
                    p={2}
                    _hover={{
                      cursor: "pointer",
                      bg:
                        colorMode === "light"
                          ? "rgb(255,255,255,0.8)"
                          : "rgb(0,0,0,0.2)",
                    }}
                    justify="space-between"
                    onClick={(e) => onclick}
                  >
                    <HStack>
                      <Icon as={IoIosTimer} color="primary.sandstone" />
                      <Text
                        color={
                          colorMode === "light"
                            ? "primary.black"
                            : "primary.white"
                        }
                      >
                        {request}
                      </Text>
                    </HStack>

                    <HStack>
                      <Icon
                        as={i === 1 || i === 2 ? FcLike : FcLikePlaceholder}
                      />
                      <Icon as={IoMdClose} color="primary.sandstone" />
                    </HStack>
                  </Flex>
                )
              );
            })
          : !loading && (
              <Text
                textAlign="center"
                color={
                  colorMode === "light" ? "primary.black" : "primary.white"
                }
              >
                История пуста...
              </Text>
            )}
      </Stack>
    </Layout>
  );
}
