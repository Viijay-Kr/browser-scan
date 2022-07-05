import React from "react";
import {
  ChakraProvider,
  extendTheme,
  Heading,
  type ThemeConfig,
} from "@chakra-ui/react";
import { FeedInput } from "./FeedInput";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
    mutations: {
      
    }
  },
});
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

function App() {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <Heading size={"lg"} textAlign="center" padding={4}>
          Can I use CSS
        </Heading>
        <FeedInput />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
