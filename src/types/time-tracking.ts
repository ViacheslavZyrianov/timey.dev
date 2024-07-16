export type TypeTimeTrackingItemRead = {
  id: string;
  hours: number;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  task: string;
};

export type TypeTimeTrackingItemAdd = {
  task: string;
  hours: number | null;
  date: Date;
};
