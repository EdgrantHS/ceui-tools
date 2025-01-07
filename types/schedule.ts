export enum Weekday {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export interface ScheduleTime {
  hour: number;
  minute: number;
}

export interface ScheduleData {
  id: string;
  title: string;
  weekday: Weekday;
  time: ScheduleTime;
  duration: ScheduleTime;
}
