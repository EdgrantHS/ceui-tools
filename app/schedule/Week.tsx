import { ScheduleData, ScheduleTime, Weekday } from "@/types/schedule";
import Class from "./Class";

export default function Week(
  weekday: Weekday,
  scheduleData: ScheduleData[],
  startTime?: ScheduleTime,
  endTime?: ScheduleTime
) {
  const week = scheduleData.filter((schedule) => schedule.weekday === weekday);
  const scheduleStartHour = startTime?.hour || 0;
  const scheduleEndHour = endTime?.hour || 24;

  const schedule = week.filter(
    (schedule) =>
      schedule.time.hour >= scheduleStartHour &&
      schedule.time.hour < scheduleEndHour
  );

  return (
    <div className="flex flex-col min-w-40" key={weekday}>
      <h2 className="border-b border-gray-200 h-12 flex items-center">
        {weekday}
      </h2>
      <div className="flex flex-col relative">
        {Array.from({
          length: scheduleEndHour - scheduleStartHour,
        }).map((_, index) => (
          <div
            key={index}
            className="border-b border-gray-200 h-12 flex items-center text-xs text-gray-400"
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
