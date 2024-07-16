export enum ToastStatus {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export type TypeToastPayload = {
  text: string;
  status: ToastStatus;
};
