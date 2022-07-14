import React from "react";
import { Browsers } from "../../../schema/dist/@types";
export interface SelectVersionProps {
    onChange?: (version: string) => void;
    placeholder?: string;
    browser: Browsers;
}
export declare const SelectVersion: React.FC<SelectVersionProps>;
