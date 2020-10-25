import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../hooks/useApi";
import useColorMode from "../hooks/useColorMode";
import useDisbounce from "../hooks/useDebounce";
import { api } from "../api/index";
import { setPoints } from "../state/actions/geo";
import { categories } from "../utils/categories";
import { AppState } from "../state/reducers";
import { SiteState } from "../state/reducers/site";
import Layout from "../components/Layout";
import ShopList from "../components/ShopList";
import Favourite from "../components/Favourite";
import Recently from "../components/Recently";
import Settings from "../components/Setting";

export default function Home() {
  const [colorMode] = useColorMode();
  const site: SiteState = useSelector((state: AppState) => state.site);
  const dispatch = useDispatch();
  const [r, loading, search, error] = useApi(api.searchController.search);
  const [category, setCategory] = useState("");
  const debouncedSearchTerm = useDisbounce(category, 500);

  const load = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const res = await search({
        search: category,
        identity: localStorage.getItem("id") || "",
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });

      dispatch(setPoints(res.result.items || []));
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      load();
    }
  }, [debouncedSearchTerm]);

  if (site.page === "search") {
    return (
      <Layout>
        {loading && (
          <Box
            position="absolute"
            w="100%"
            h="100vh"
            bg="rgb(0,0,0,0.2)"
            zIndex="-1"
          />
        )}

        <Box position="absolute" w={["100%", "100%", "500px"]} p={[2, 4, 6]}>
          <InputGroup
            border={`1px solid ${
              colorMode === "light" ? "#D8D7D6" : "#27292D"
            }`}
            borderRadius="5px"
          >
            <InputLeftElement>
              <Icon color="secondary.caspion" as={GoSearch} />
            </InputLeftElement>
            <Input
              placeholder="Поиск поблизости"
              bg={
                colorMode === "light"
                  ? "primary.white"
                  : "secondary.graphiteBlack"
              }
              color={colorMode === "light" ? "primary.black" : "primary.white"}
              value={category}
              onChange={(e) => setCategory(e.currentTarget.value)}
            />
            {loading && (
              <InputRightElement w="fit-content">
                <Text color="secondary.caspion">Loading...</Text>
              </InputRightElement>
            )}
          </InputGroup>

          <Flex mt="-2px">
            {categories.map((cat) => (
              <Stack
                key={cat.label}
                w="20%"
                p={2}
                bg={
                  colorMode === "light" ? "#f6f6f6" : "secondary.graphiteBlue"
                }
                border={`1px solid ${
                  colorMode === "light" ? "#D8D7D6" : "#27292D"
                }`}
                color={
                  colorMode === "light" ? "primary.black" : "primary.white"
                }
                borderTop="0"
                borderRadius="0 0 5px 5px"
                align="center"
                onClick={() => {
                  if (cat.label !== "Ещё") setCategory(cat.label);
                }}
                _hover={{
                  cursor: "pointer",
                  bg:
                    colorMode === "light"
                      ? "primary.white"
                      : "secondary.graphiteBlack",
                }}
              >
                <Image w={["20px", "30px", "40px"]} src={cat.iconUrl} />
                <Text fontSize={["0.7em", "1em", "1em"]}>{cat.label}</Text>
              </Stack>
            ))}
          </Flex>
        </Box>
      </Layout>
    );
  }

  if (site.page === "shoplist") return <ShopList />;
  if (site.page === "favourite") return <Favourite />;
  if (site.page === "recently") return <Recently />;
  if (site.page === "settings") return <Settings />;
}
