import React from "react";
import { Input } from "@chakra-ui/input";
export interface ProjectPathProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const ProjectPath: React.FC<ProjectPathProps> = (props) => {
  const { placeholder, onChange } = props;

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(evt.target.value);
  };
  return (
    <Input
      variant={"flushed"}
      size="md"
      placeholder={placeholder}
      type={"text"}
      onChange={onInputChange}
    />
  );
};
