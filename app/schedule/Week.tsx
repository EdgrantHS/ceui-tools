import { ScheduleData, ScheduleTime, Weekday } from "@/types/schedule";
import Class from "./Class";

export default function Week(
  weekday: Weekday,
  scheduleData: ScheduleData[],
  startTime?: ScheduleTime,
  endTime?: ScheduleTime,
) {
  const week = scheduleData.filter((schedule) => schedule.weekday === weekday);
  const scheduleStartHour = startTime?.hour || 0;
  const scheduleEndHour = endTime?.hour || 24;

  const schedule = week.filter(
    (schedule) =>
      schedule.time.hour >= scheduleStartHour &&
      schedule.time.hour < scheduleEndHour,
  );

  return (
    <div className="flex min-w-40 flex-col" key={weekday}>
      <h2 className="flex h-12 items-center border-b border-gray-200">
        {weekday}
      </h2>
      <div className="relative flex flex-col">
        {Array.from({
          length: scheduleEndHour - scheduleStartHour,
        }).map((_, index) => (
          <div
            key={index}
            className="flex h-12 items-center border-b border-gray-200 text-xs text-gray-400"
          >
            {index + (scheduleStartHour || 0)}:00
          </div>
        ))}
        {schedule?.map((schedule, index) => (
          <Class
            key={index}
            startTime={startTime}
            classTime={schedule.time}
            classDuration={schedule.duration}
            title={schedule.title}
          />
        ))}
      </div>
    </div>
  );
}
