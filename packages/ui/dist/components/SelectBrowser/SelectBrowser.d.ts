import React from "react";
import { Browsers } from "@browser-scan/schema";
export interface SelectBrowserProps {
    onChange?: (browser: Browsers) => void;
    placeholder?: string;
    options?: string[];
}
export declare const SelectBrowser: React.FC<SelectBrowserProps>;
