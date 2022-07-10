import React, { ChangeEventHandler } from 'react';

export interface SelectVersionProps {
  onChange?: (version: string) => void;
  placeholder?: string;
  options: string[];
}

export const SelectVersion: React.FC<SelectVersionProps> = (props) => {
  const {options,placeholder,onChange } = props;
  const onSelection: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    onChange?.(evt.target.value);
  };
  return (
    <select
      placeholder={placeholder}
      onChange={onSelection}
    >
      {options.map((o) => (
        <option value={o} key={o}>
          {o}
        </option>
      ))}
    </select>
  )
  
}