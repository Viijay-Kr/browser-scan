import { Button, Flex, Input, Select } from "@chakra-ui/react";
import React, { FormEventHandler, useRef } from "react";
import { useBrowsers } from "./api/useBrowsers";
import { useScanner } from "./api/useScanner";

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
import { ScannerResponse } from "./api/types";

export const FeedInput: React.FC = () => {
  const { data, mutate } = useScanner();
  const formRef = useRef<HTMLFormElement>(null);
  const onScan: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const formProps = Object.fromEntries(formData);
      mutate({
        version: ">=1",
        browser: formProps.browser.toString(),
        project_path: formProps.project_path.toString(),
      });
    }
  };

  const selectedBrowser = Object.fromEntries(
    new FormData(formRef.current ?? undefined)
  )?.browser?.toString();

  return (
    <form ref={formRef} onSubmit={onScan}>
      <Flex
        alignItems={"flex-start"}
        p={5}
        gap={5}
        width={"100%"}
        direction={"column"}
      >
        <Input
          name="project_path"
          isRequired
          variant={"flushed"}
          size="md"
          placeholder="Enter Project Path"
        />
        <SelectBrowsers />
        <Button
          size={"md"}
          width={200}
          type="submit"
          colorScheme="cyan"
          variant="solid"
        >
          Scan
        </Button>
        <CompatibilityTable browser={selectedBrowser} data={data} />
      </Flex>
    </form>
  );
};

const SelectBrowsers = () => {
  const { data: browsers, isFetched } = useBrowsers();
  if (!browsers) return null;
  const { browsers_list } = browsers;
  return (
    <>
      <Select
        isRequired
        name="browser"
        variant={"flushed"}
        size={"md"}
        placeholder="Select a browser"
      >
        {isFetched &&
          Object.keys(browsers_list ?? {}).map((browser, index) => (
            <option key={browser} value={browsers_list[browser]}>
              {browser}
            </option>
          ))}
      </Select>
    </>
  );
};

const CompatibilityTable = ({
  data,
  browser,
}: {
  data?: ScannerResponse;
  browser?: string;
}) => {
  if (!data) return null;
  return (
    <TableContainer>
      <Table variant={"striped"}>
        <TableCaption>CSS Features not supported in {browser}</TableCaption>
      </Table>
    </TableContainer>
  );
};
