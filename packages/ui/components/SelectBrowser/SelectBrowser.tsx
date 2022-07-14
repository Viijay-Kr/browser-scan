import React, { ChangeEventHandler } from "react";
import { Browsers } from "@browser-scan/schema";
import { Select } from "@chakra-ui/select";
import { useBrowsers } from "@browser-scan/scanner";
export interface SelectBrowserProps {
  onChange?: (browser: Browsers) => void;
  placeholder?: string;
  options?: string[];
}

export const SelectBrowser: React.FC<SelectBrowserProps> = (props) => {
  const { data, isLoading, isFetched } = useBrowsers();
  const { onChange, placeholder } = props;
  const onSelection: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    onChange?.(evt.target.value as Browsers);
  };
  return (
    <Select
      variant={"flushed"}
      name="browser"
      onChange={onSelection}
      isDisabled={isLoading}
      placeholder={placeholder}
    >
      {isFetched &&
        Object.entries(data?.supported_browsers ?? {}).map(([key, value]) => (
          <option value={key} key={key}>
            {value}
          </option>
        ))}
    </Select>
  );
};
