import "./App.css";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { ToggleTheme } from "./ToggleTheme";
import { Scanner } from "@browser-scan/ui";
function App() {
  return (
    <div className="App">
      <Stack>
        <Flex alignItems={"center"} gap={4} px={4} mt="5  " direction={"row"}>
          <Text textAlign={"left"} maxW={"50vw"} fontSize={"xl"}>
            Scan CSS Files in your project and check their Compatibility in a
            browser of your choice
          </Text>
          <ToggleTheme />
        </Flex>
        <Scanner />
      </Stack>
    </div>
  );
}

export default App;
