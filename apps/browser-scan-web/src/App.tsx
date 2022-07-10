import React from "react";
import "./App.css";
import { ProjectPath, SelectBrowser, SelectVersion } from "@browser-scan/ui";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { ToggleTheme } from "./ToggleTheme";
function App() {
  return (
    <div className="App">
      <Stack>
        <Flex alignItems={"center"} gap={4} px={4} mt="10" direction={"row"}>
          <Text fontSize={"xl"}>
            Scan your CSS Files in your project for browser Compatibility
          </Text>
          <ToggleTheme />
        </Flex>
        <Flex alignItems={"center"} gap={5} direction="row" p={4}>
          <ProjectPath placeholder="Enter Project Path" />
          <SelectBrowser placeholder="Select Browser" options={["Chrome"]} />
          <SelectVersion
            placeholder="Select Version"
            options={["103", "102"]}
          />
        </Flex>
      </Stack>
    </div>
  );
}

export default App;
