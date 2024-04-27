export type TypeTableHeader = {
  key: string
  label?: string
}

export type TypeTableRow = {
  id: string;
} & {
  [key: string]: string | number | boolean | string[] | null;
};
