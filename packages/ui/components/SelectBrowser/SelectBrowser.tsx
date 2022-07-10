import React, { ChangeEventHandler } from "react";
import { Browsers } from "@browser-scan/schema";

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
    <select name="browser" onChange={onSelection} placeholder={placeholder}>
      {options.map((o) => (
        <option value={o} key={o}>
          {o}
        </option>
      ))}
    </select>
  );
};
