"use client";

import { ScheduleData, Weekday, ClassMeta } from "@/types/schedule";
import Week from "./Week";
import scheduleData from "@/data/schedule.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

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
  const [tempSchedule, setTempSchedule] = useState("");

  // Function to change the schedule
  const changeScheduleCallback = (id: string, newMeta: ClassMeta) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((cls) =>
        cls.id === id ? { ...cls, meta: { ...cls.meta, ...newMeta } } : cls,
      ),
    );
  };

  useEffect(() => {
    // tempschedule populated with default data
    setTempSchedule(JSON.parse(JSON.stringify(schedule)));
  }, [schedule]);

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
                changeScheduleCallback={changeScheduleCallback}
              />
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h1>Your Class</h1>
          <ul>
            {schedule
              .filter((cls) => cls.meta.selected)
              .map((cls) => (
                <li key={cls.id}>
                  {cls.title} - {cls.weekday} - {cls.time.hour}:
                  {cls.time.minute} - {cls.duration.hour}:{cls.duration.minute}
                </li>
              ))}
          </ul>
        </div>
        <div className="flex justify-between gap-4">
          <Button
            onClick={() => {
              setSchedule(JSON.parse(JSON.stringify(tempSchedule)));
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setTempSchedule(JSON.parse(JSON.stringify(schedule)));
            }}
          >
            Cancel
          </Button>
        </div>
        <textarea
          className="w-full rounded-lg border border-gray-200 p-2"
          value={JSON.stringify(tempSchedule, null, 2)}
          onChange={(e) => {
            setTempSchedule(JSON.parse(e.target.value));
          }}
          rows={20}
        />
      </CardFooter>
    </Card>
  );
}

/*
[
  {
    "title": "Jartel 1",
    "id": "Jartel 1 Part 1",
    "weekday": "Monday",
    "time": {
      "hour": 10,
      "minute": 0
    },
    "duration": {
      "hour": 1,
      "minute": 40
    },
    "meta": {
      "active": true,
      "siblingId": [
        "Jartel 1 Part 2"
      ],
      "partnerId": [
        "Jartel 2 Part 1",
        "Jartel 2 Part 2"
      ]
    }
  },
  {
    "title": "Jartel 1",
    "id": "Jartel 1 Part 2",
    "weekday": "Thursday",
    "time": {
      "hour": 8,
      "minute": 0
    },
    "duration": {
      "hour": 1,
      "minute": 40
    },
    "meta": {
      "active": true,
      "siblingId": [
        "Jartel 1 Part 1"
      ],
      "partnerId": [
        "Jartel 2 Part 1",
        "Jartel 2 Part 2"
      ]
    }
  },
  {
    "title": "Jartel 2",
    "id": "Jartel 2 Part 1",
    "weekday": "Tuesday",
    "time": {
      "hour": 8,
      "minute": 0
    },
    "duration": {
      "hour": 1,
      "minute": 40
    },
    "meta": {
      "active": true,
      "siblingId": [
        "Jartel 2 Part 2"
      ],
      "partnerId": [
        "Jartel 1 Part 1",
        "Jartel 1 Part 2"
      ]
    }
  },
  {
    "title": "Jartel 2",
    "id": "Jartel 2 Part 2",
    "weekday": "Friday",
    "time": {
      "hour": 8,
      "minute": 0
    },
    "duration": {
      "hour": 1,
      "minute": 40
    },
    "meta": {
      "active": true,
      "siblingId": [
        "Jartel 2 Part 1"
      ],
      "partnerId": [
        "Jartel 1 Part 1",
        "Jartel 1 Part 2"
      ]
    }
  },
  {
    "title": "Kemjar 1",
    "id": "2",
    "weekday": "Wednesday",
    "time": {
      "hour": 10,
      "minute": 0
    },
    "duration": {
      "hour": 2,
      "minute": 30
    },
    "meta": {
      "active": true,
      "partnerId": [
        "Kemjar 2"
      ]
    }
  },
  {
    "title": "Kemjar 2",
    "id": "2",
    "weekday": "Wednesday",
    "time": {
      "hour": 13,
      "minute": 0
    },
    "duration": {
      "hour": 2,
      "minute": 30
    },
    "meta": {
      "active": false,
      "selected": true,
      "partnerId": [
        "Kemjar 1"
      ]
    }
  }
]
 */
