import { AppProps } from "next/dist/next-server/lib/router/router";
import { Provider } from "react-redux";
import store from "../state/store";
import { ChakraProvider } from "@chakra-ui/core";
import { customTheme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
