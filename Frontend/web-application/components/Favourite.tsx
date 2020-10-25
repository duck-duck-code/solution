import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Layout from "../components/Layout";
import {
  Box,
  HStack,
  Stack,
  Text,
  Icon,
  Heading,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  useToast,
} from "@chakra-ui/core";
import useColorMode from "../hooks/useColorMode";
import { useApi } from "../hooks/useApi";
import { api } from "../api";

export default function Favourite() {
  const toast = useToast();
  const [colorMode] = useColorMode();
  const [value, setValue] = useState("");
  const [shops, loading, getFullHistory] = useApi(
    api.favouriteController.getFavourites
  );
  const [nothing, favLoading, addToFavourites] = useApi(
    api.favouriteController.addToFavourites
  );

  const load = async () => {
    const res = await getFullHistory(localStorage.getItem("id"));
  };

  useEffect(() => {
    load();
  }, []);

  const addShopToFavourites = async () => {
    await addToFavourites({
      shopName: value,
      identity: localStorage.getItem("id") || "",
    });

    await getFullHistory(localStorage.getItem("id"));

    toast({
      title: "Магазин добавлен в список любимых",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

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
          Любимые магазины
        </Heading>

        <InputGroup
          border={`1px solid ${colorMode === "light" ? "#D8D7D6" : "#27292D"}`}
          borderRadius="5px"
        >
          <InputLeftElement>
            <Icon color="secondary.caspion" as={GoSearch} />
          </InputLeftElement>
          <Input
            placeholder="Введите название магазина"
            bg={
              colorMode === "light" ? "primary.white" : "secondary.graphiteBlue"
            }
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            color={colorMode === "light" ? "primary.black" : "primary.white"}
          />
          <InputRightAddon
            onClick={addShopToFavourites}
            bg="rgb(0,0,0,0.2)"
            color={colorMode === "light" ? "primary.black" : "primary.white"}
            _hover={{ cursor: "pointer" }}
          >
            <Text>{favLoading ? "..." : "Добавить"}</Text>
          </InputRightAddon>
        </InputGroup>

        {loading && (
          <Text
            textAlign="center"
            color={colorMode === "light" ? "primary.black" : "primary.white"}
          >
            Загрузка...
          </Text>
        )}

        {shops && !loading && shops.length > 0
          ? shops.reverse().map((shop, i) => {
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
                      <Icon as={MdShoppingCart} color="primary.sandstone" />
                      <Text
                        color={
                          colorMode === "light"
                            ? "primary.black"
                            : "primary.white"
                        }
                      >
                        {shop.shopName}
                      </Text>
                    </HStack>

                    <Icon as={IoMdClose} color="primary.sandstone" />
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
                Магазинов нет...
              </Text>
            )}
      </Stack>
    </Layout>
  );
}
