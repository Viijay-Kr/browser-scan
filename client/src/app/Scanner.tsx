import { Button, Flex, Input, Select, Stack } from "@chakra-ui/react";
import React, {
  ChangeEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useBrowsers } from "../api/useBrowsers";
import { useFileScanner, useStreamScanner } from "../api/useScanner";
import { useQuery } from "react-query";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { BrowsersResponse, CompatibilityTuple } from "../api/types";
import axios from "axios";

export const Scanner: React.FC = () => {
  const { stream, streamedResponse, isStreamingResults } = useStreamScanner();
  const {
    data: fileResponse,
    isLoading: isFileScanning,
    mutate: scanFile,
  } = useFileScanner();
  const { data: browsers } = useQuery<BrowsersResponse>("browsers");
  const formRef = useRef<HTMLFormElement>(null);
  const onScan: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const formProps = Object.fromEntries(formData);
      const project_path = formProps.project_path.toString();
      if (
        project_path.endsWith(".css") ||
        project_path.endsWith(".less") ||
        project_path.endsWith(".scss")
      ) {
        scanFile({
          version: formProps.version.toString(),
          browser: formProps.browser.toString(),
          project_path,
        });
      } else {
        stream({
          version: formProps.version.toString(),
          browser: formProps.browser.toString(),
          project_path,
        });
      }
    }
  };

  const formData = Object.fromEntries(
    new FormData(formRef.current ?? undefined)
  );
  const selectedBrowser =
    browsers?.browsers_list[formData?.browser?.toString() ?? ""];
  const project_path = formData?.project_path?.toString();
  const version = formData?.version?.toString();
  return (
    <form ref={formRef} onSubmit={onScan}>
      <Stack px={5}>
        <Flex
          alignItems={"flex-start"}
          gap={5}
          mb={4}
          width={"100%"}
          direction={"row"}
        >
          <Input
            name="project_path"
            isRequired
            variant={"flushed"}
            size="md"
            placeholder="Enter Project Path"
          />
          <SelectBrowsers />
        </Flex>
        <Flex gap={5} direction="column">
          <Button
            size={"md"}
            width={200}
            type="submit"
            colorScheme={"cyan"}
            variant="solid"
            mb={5}
            isLoading={isStreamingResults || isFileScanning}
          >
            Scan
          </Button>
          <CompatibilityTable
            browser={selectedBrowser}
            project_path={project_path}
            data={streamedResponse || fileResponse}
            version={version}
          />
        </Flex>
      </Stack>
    </form>
  );
};

const SelectBrowsers = () => {
  const { data: browsers, isFetched: isBrowsersFetched } = useBrowsers();
  const [browser, setBrowser] = useState("");
  const loadVersion = useCallback(
    async () =>
      browser
        ? (await axios.get<string[]>(`/versions/${browser}`)).data
        : undefined,
    [browser]
  );
  const {
    data,
    isLoading: isVersionLoading,
    isFetched,
    refetch,
  } = useQuery("versions", loadVersion);
  useEffect(() => {
    refetch();
  }, [browser, refetch]);

  return (
    <>
      <Select
        isRequired
        name="browser"
        variant={"flushed"}
        size={"md"}
        disabled={!isFetched}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setBrowser(e.target.value)
        }
        placeholder="Select a browser"
      >
        {isBrowsersFetched &&
          browsers &&
          Object.keys(browsers.browsers_list ?? {}).map((browser) => (
            <option key={browser} value={browser}>
              {browsers.browsers_list[browser]}
            </option>
          ))}
      </Select>
      <Select
        isRequired
        name="version"
        variant={"flushed"}
        disabled={isVersionLoading || !isFetched}
        size={"md"}
        placeholder="Select a Version"
      >
        {data &&
          data.map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
      </Select>
    </>
  );
};

const CompatibilityTable = ({
  data,
  browser,
  project_path,
  version,
}: {
  data?: {
    scanned_result: [string, CompatibilityTuple[]][];
  };
  browser?: string;
  project_path?: string;
  version?: string;
}) => {
  if (!data) return null;
  const { scanned_result } = data;
  const getRelativeFilePath = (file: string) => {
    if (
      project_path?.endsWith(".css") ||
      project_path?.endsWith(".scss") ||
      project_path?.endsWith(".less")
    ) {
      return file;
    }
    return file.replace(project_path ?? "", "");
  };
  const TableHead = (
    <Tr>
      <Th>File</Th>
      <Th>Non Compatible Properties</Th>
    </Tr>
  );
  return (
    <TableContainer overflowX="scroll" whiteSpace={"pre-wrap"}>
      <Table size={"md"} variant={"striped"} colorScheme="teal">
        <TableCaption placement="top">
          CSS Features not supported in {browser} v{version}
        </TableCaption>
        <Thead>{TableHead}</Thead>
        <Tbody>
          {scanned_result.map(([file, compatability_tuple], index) => (
            <Tr key={file}>
              <Td valign="top" maxW={"35vw"}>
                {getRelativeFilePath(file)}
              </Td>
              <Td>
                {compatability_tuple.map(([line, message], index) => (
                  <React.Fragment key={`${line}-${index}`}>
                    <p>
                      {line} {message}
                    </p>
                    <br />
                  </React.Fragment>
                ))}
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>{TableHead}</Tfoot>
      </Table>
    </TableContainer>
  );
};
