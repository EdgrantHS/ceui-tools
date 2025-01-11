"use client";

import { Weekday, ClassMeta, ScheduleTime } from "@/types/schedule";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  }, []);

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

  const timeToString = (time: ScheduleTime) => {
    const hour = time.hour.toString().padStart(2, "0");
    const minute = time.minute.toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  useEffect(() => {
    // tempschedule populated with default data
    setTempSchedule(JSON.parse(JSON.stringify(schedule)));
  }, [schedule]);

  return (
    <Card className="container mx-auto max-w-screen-xl">
      <CardHeader>
        <CardTitle>Semester 6</CardTitle>
        <CardDescription>
          Pemilihan jadwal untuk semster 6 tekkom UI Source code di sini, kalian
          sangat dipersilahkan untuk PR, fork, atau buatin JSON terus DM Edgrant
          https://github.com/EdgrantHS/ceui-tools.
        </CardDescription>
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
      <CardFooter className="flex flex-col">
        <div className="flex flex-col gap-4">
          <Table>
            <TableCaption>Your Class Right Here</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule
                .filter((cls) => cls.meta.selected)
                .map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell>{cls.title}</TableCell>
                    <TableCell>{cls.weekday}</TableCell>
                    <TableCell>
                      {timeToString(cls.time)} -{" "}
                      {timeToString({
                        hour: cls.time.hour + cls.duration.hour,
                        minute: cls.time.minute + cls.duration.minute,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <hr className="my-8 w-full" />
        <div className="mb-8 flex justify-between gap-4">
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
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
        <p className="mb-4">
          Ini kamu bisa edit/save jadwal kamu dengan copy paste, tapi kalau mau
          edit copy ke notepad {"->"} edit {"->"} baru paste karena kalau
          langsung edit disini bisa error.
        </p>
        <textarea
          className="w-full rounded-lg border border-gray-200 p-2 text-gray-400"
          value={JSON.stringify(tempSchedule, null, 2)}
          onChange={(e) => {
            setTempSchedule(JSON.parse(e.target.value));
          }}
          rows={10}
        />
      </CardFooter>
    </Card>
  );
}
