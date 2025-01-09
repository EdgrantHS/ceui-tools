"use client";

import {
  ClassMeta,
  ScheduleData,
  ScheduleTime,
  Weekday,
} from "@/types/schedule";
import Class from "./Class";

export default function Week({
  weekday,
  scheduleData,
  startTime,
  endTime,
  changeScheduleCallback,
}: {
  weekday: Weekday;
  scheduleData: ScheduleData[];
  startTime?: ScheduleTime;
  endTime?: ScheduleTime;
  changeScheduleCallback?: (title: string, meta: ClassMeta) => void;
}) {
  return (
    <div className="flex min-w-40 flex-col" key={weekday}>
      <h2 className="flex h-12 items-center border-b border-gray-200">
        {weekday}
      </h2>
      <div className="relative flex flex-col">
        {Array.from({
          length: (endTime?.hour || 24) - (startTime?.hour || 0),
        }).map((_, index) => (
          <div
            key={index}
            className="flex h-12 items-center border-b border-gray-200 text-xs text-gray-400"
          >
            {index + (startTime?.hour || 0)}:00
          </div>
        ))}
        {scheduleData.map((schedule, index) => (
          <Class
            key={index}
            id={schedule.id}
            startTime={startTime}
            classTime={schedule.time}
            classDuration={schedule.duration}
            title={schedule.title}
            meta={schedule.meta}
            changeScheduleCallback={changeScheduleCallback}
          />
        ))}
      </div>
    </div>
  );
}
