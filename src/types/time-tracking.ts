export type TypeTimeTrackingItemRead = {
  id: string;
  hours: number;
  minutes: number;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  task: string;
};

export type TypeTimeTrackingItemAdd = {
  task: string;
  hours: number | null;
  minutes: number | null;
  date: Date;
};
