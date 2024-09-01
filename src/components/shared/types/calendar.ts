export enum TypeCalendarVariant {
  Default = "default",
  Compact = "compact",
}

export enum TypeWeekdaysFormat {
  Default = "default",
  Short = "short",
  Min = "min",
}

export type TypePreviousMonthDays = {
  date: string;
  isCurrentMonth: boolean;
}[];
