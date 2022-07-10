import React from 'react';
export interface SelectVersionProps {
    onChange?: (version: string) => void;
    placeholder?: string;
    options: string[];
}
export declare const SelectVersion: React.FC<SelectVersionProps>;
