import { Color } from "@/types/common";

export type TypeDropdownItem = {
  label: string;
  color: Color;
  onClick?: () => void;
};
