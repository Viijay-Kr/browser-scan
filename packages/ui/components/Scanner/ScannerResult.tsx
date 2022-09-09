import React from "react";
import { ScannerResponse, Browsers } from "@browser-scan/schema";
import {
  Table,
  TableContainer,
  Tr,
  Td,
  Thead,
  Tfoot,
  TableCaption,
  Th,
  Tbody,
} from "@chakra-ui/table";
export interface ScannerResultProps {
  result: ScannerResponse;
  browser?: Browsers;
  project_path?: string;
  version?: string;
}
export const ScannerResult: React.FC<ScannerResultProps> = ({
  result,
  browser,
  project_path,
  version,
}) => {
  if (!Object.keys(result.scanned_result).length) return null;
  const { scanned_result } = result;
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
          {Object.entries(scanned_result)
            .reverse()
            .filter((res) => !!res.length)
            .map(([file, compatability_tuple]) => (
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
