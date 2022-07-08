import React from "react";
import {
  ChakraProvider,
  extendTheme,
  Heading,
  type ThemeConfig,
  Flex,
  Text,
  Stack,
} from "@chakra-ui/react";

import { Scanner } from "./Scanner";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToggleTheme } from "./ToggleTheme";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
    mutations: {},
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
        <Flex alignItems={"center"} direction={"row"} gap={4} padding={4}>
          <Heading size={"lg"} textAlign="center">
            Can I use CSS.
          </Heading>
          <ToggleTheme />
        </Flex>
        <Stack px={4} mb={3}>
          <Text fontSize={"sm"}>
            Check your CSS for compatibility against browsers
          </Text>
        </Stack>
        <Scanner />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
