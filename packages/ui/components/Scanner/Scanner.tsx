import React, { useState } from "react";
import { ProjectPath } from "../ProjectPath/ProjectPath";
import { SelectBrowser } from "../SelectBrowser/SelectBrowser";
import { SelectVersion } from "../SelectVersion/SelectVersion";
import { Stack, Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Browsers } from "@browser-scan/schema";
import { useStreamScanner } from "@browser-scan/scanner";
import { ScannerResult } from "./ScannerResult";
export interface ScannerProps {}

export const Scanner: React.FC<ScannerProps> = () => {
  const [browser, setBrowser] = useState<Browsers | undefined>(undefined);
  const [version, setVersion] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const { streamedResponse, isStreamingResults, startStreaming } =
    useStreamScanner();
  const disableScanbutton = !!(browser && version && path);
  const onScan = () => {
    if (browser && version && path) {
      startStreaming({
        browser,
        version,
        path,
      });
    }
  };
  return (
    <Stack>
      <Flex alignItems={"center"} gap={5} direction="row" p={4}>
        <ProjectPath onChange={setPath} placeholder="Enter Project Path" />
        <SelectBrowser onChange={setBrowser} placeholder="Select Browser" />
        {browser && (
          <SelectVersion
            onChange={setVersion}
            placeholder="Select Version"
            browser={browser}
          />
        )}
      </Flex>
      <Flex direction={"column"} gap={5} p={4}>
        <Button
          size={"md"}
          width={200}
          type="submit"
          colorScheme={"cyan"}
          variant="solid"
          mb={5}
          disabled={!disableScanbutton}
          onClick={onScan}
          isLoading={isStreamingResults}
        >
          Scan
        </Button>
        <ScannerResult
          browser={browser}
          project_path={path}
          result={streamedResponse}
          version={version}
        />
      </Flex>
    </Stack>
  );
};
