export type TypeSettings = {
  teamManager: {
    isTeamManager: boolean;
  };
  calendar: {
    isShowWeekends: boolean;
  };
};

export type TimeTrackingPayload = {
  month: number;
  year: number;
  userId: string;
};
