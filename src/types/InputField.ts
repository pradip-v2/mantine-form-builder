import { ComboboxItem } from "@mantine/core";

export interface Option extends ComboboxItem {
  id: number;
  position: number;
  [key: string]: any;
}

export type InputField = {
  type: "text" | "select";
  config: {
    label: string;
    required: boolean;
    span: number;
    defaultValue: string;
    options?: Option[];
  };
};
