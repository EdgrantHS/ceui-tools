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

export interface ClassMeta {
  active: boolean; // true = not yet picked, false = already picked
  selected?: boolean; // only active when active is false, true = selected and partner class not selected
  siblingId?: string[];
  partnerId?: string[];
  partnerHovered?: boolean;
  siblingHovered?: boolean;
}

export interface ScheduleData {
  id: string;
  title: string;
  weekday: Weekday;
  time: ScheduleTime;
  duration: ScheduleTime;
  meta: ClassMeta;
}
