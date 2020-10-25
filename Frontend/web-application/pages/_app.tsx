import { AppProps } from "next/dist/next-server/lib/router/router";
import { Provider } from "react-redux";
import store from "../state/store";
import { ChakraProvider } from "@chakra-ui/core";
import { customTheme } from "../theme";
import dynamic from "next/dynamic";
import Menu from "../components/Menu";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Provider store={store}>
        <Map position="absolute" w="100%" h="100vh" zIndex="-1" />
        <Component {...pageProps} />
        <Menu
          w={["100%", "100%", "500px"]}
          position="fixed"
          bottom="0"
          p={[2, 4, 6]}
          alignSelf="flex-end"
          justify="space-between"
          align="flex-end"
        />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
