"use client";

import { ScheduleData, Weekday, ClassMeta } from "@/types/schedule";
import Week from "./Week";
import scheduleData from "@/data/schedule.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";

export default function Schedule() {
  // Import default data from json
  const schedules = useMemo(() => {
    return scheduleData.map((schedule) => {
      const scheduleToReturn = {
        title: schedule.title,
        id: schedule.id,
        weekday: schedule.weekday as Weekday,
        time: schedule.time,
        duration: schedule.duration,
        meta: schedule.meta,
      };

      return scheduleToReturn;
    });
  }, [scheduleData]);

  const [schedule, setSchedule] = useState(schedules);

  // Function to change the schedule
  const changeSchedule = (id: string, meta: ClassMeta) => {
    let noChange = true;

    const newSchedule = schedule.map((schedule) => {
      if (schedule.id === id) {
        noChange = false;

        return {
          ...schedule,
          meta: {
            ...schedule.meta,
            ...meta,
          },
        };
      }

      return schedule;
    });

    if (noChange) {
      console.error("No schedule found with title: ", id);
      return;
    }

    setSchedule(newSchedule);
  };

  useEffect(() => {
    // console.table(schedule);

    setTimeout(() => {
      changeSchedule("Jartel 1 Part 1", { active: false, selected: false });
    }, 2000);
  }, []);

  return (
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle>Weeks</CardTitle>
        <CardDescription>Weeks Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between overflow-x-auto">
          {Object.values(Weekday).map((weekday) => {
            const filteredSchedules = schedule.filter(
              (schedule) => schedule.weekday === weekday,
            );
            return (
              <Week
                key={weekday}
                weekday={weekday}
                scheduleData={filteredSchedules}
                startTime={{ hour: 7, minute: 0 }}
                endTime={{ hour: 20, minute: 0 }}
                changeScheduleCallback={changeSchedule}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
