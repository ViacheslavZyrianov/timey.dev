import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { TypeSelectItem } from "@/components/shared/select";

dayjs.extend(localeData);

export const months: TypeSelectItem[] = dayjs()
  .localeData()
  .months()
  .map((month: string, index: number) => ({
    label: month,
    value: `${index + 1}`,
  }));

export const years = [
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2024",
    label: "2024",
  },
];
