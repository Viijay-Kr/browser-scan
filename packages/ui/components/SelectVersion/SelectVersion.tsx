import React, { ChangeEventHandler, useEffect } from "react";
import { Select } from "@chakra-ui/select";
import { useVersions } from "@browser-scan/scanner";
import { Browsers } from "../../../schema/dist/@types";
export interface SelectVersionProps {
  onChange?: (version: string) => void;
  placeholder?: string;
  browser: Browsers;
}

export const SelectVersion: React.FC<SelectVersionProps> = (props) => {
  const { data, refetch, isFetched } = useVersions(props.browser);
  const { placeholder, onChange } = props;
  const onSelection: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    onChange?.(evt.target.value);
  };
  useEffect(() => {
    refetch();
  }, [props.browser]);

  return (
    <Select
      variant={"flushed"}
      size="md"
      placeholder={placeholder}
      onChange={onSelection}
      disabled={!isFetched}
    >
      {data?.supported_versions.map((o) => (
        <option value={o} key={o}>
          {o}
        </option>
      ))}
    </Select>
  );
};
