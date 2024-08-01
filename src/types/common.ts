export enum Color {
  Default = "default",
  Primary = "primary",
  Support1 = "support-1",
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}

export enum Size {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export type ClassList = (string | Record<string, boolean>)[];
