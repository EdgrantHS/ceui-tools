import { ScheduleData, Weekday } from "@/types/schedule";
import Week from "./Week";
import scheduleData from "@/data/schedule.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Schedule() {
  const schedules: ScheduleData[] = [];
  for (const schedule of scheduleData) {
    schedules.push({
      id: schedule.id,
      title: schedule.title,
      weekday: schedule.weekday as Weekday,
      time: schedule.time,
      duration: schedule.duration,
    });
  }

  console.log(schedules);

  return (
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle>Weeks</CardTitle>
        <CardDescription>Weeks Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto justify-between">
          {Object.values(Weekday).map((weekday) =>
            Week(
              weekday,
              schedules,
              { hour: 7, minute: 0 },
              { hour: 20, minute: 0 }
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
