import React, { ChangeEventHandler } from "react";
import { Browsers } from "@browser-scan/schema";
import { Select } from "@chakra-ui/select";
export interface SelectBrowserProps {
  onChange?: (browser: Browsers) => void;
  placeholder?: string;
  options: string[];
}

export const SelectBrowser: React.FC<SelectBrowserProps> = (props) => {
  const { onChange, placeholder, options } = props;
  const onSelection: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    onChange?.(evt.target.value as Browsers);
  };
  return (
    <Select
      variant={"flushed"}
      name="browser"
      onChange={onSelection}
      placeholder={placeholder}
    >
      {options.map((o) => (
        <option value={o} key={o}>
          {o}
        </option>
      ))}
    </Select>
  );
};
