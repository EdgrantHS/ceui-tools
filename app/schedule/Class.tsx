"use client";

import { ScheduleTime } from "@/types/schedule";
import React from "react";

export default function Class({
  title,
  classTime,
  classDuration,
  startTime,
}: {
  title: string;
  classTime: ScheduleTime;
  classDuration: ScheduleTime;
  startTime?: ScheduleTime;
}) {
  const timeToHeight = (time: ScheduleTime) => {
    const hour = time.hour * 60;
    const minute = time.minute;
    const calculate = ((hour + minute) / 60) * 3;
    return `${calculate}rem`;
  };

  const timeToTop = (scheduleStartHour: number, classStartHour: number) => {
    if (scheduleStartHour !== undefined && classStartHour !== undefined) {
      const hour = classStartHour - scheduleStartHour;
      const calculate = hour;
      return `${calculate * 3}rem`;
    }
    return "0rem";
  };

  const timeToString = (time: ScheduleTime) => {
    const hour = time.hour.toString().padStart(2, "0");
    const minute = time.minute.toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  return (
    <div
      className="absolute z-10 w-full rounded-lg border border-blue-200 bg-blue-100 p-1 text-xs text-blue-500 opacity-75 transition-all duration-200 ease-in-out hover:bg-blue-200 hover:opacity-100"
      style={{
        height: timeToHeight(classDuration),
        top: timeToTop(startTime?.hour || 0, classTime.hour),
      }}
    >
      <div>{title}</div>
      <div>
        {timeToString(classTime)} -{" "}
        {timeToString({
          hour: classTime.hour + classDuration.hour,
          minute: classTime.minute + classDuration.minute,
        })}
      </div>
    </div>
  );
}
