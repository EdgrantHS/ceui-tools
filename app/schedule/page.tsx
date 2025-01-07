import { ScheduleData, Weekday } from "@/types/schedule";
import Week from "./Week";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Schedule() {
  const schedules: ScheduleData[] = [
    {
      id: "1",
      title: "Jartel 1",
      weekday: Weekday.Monday,
      time: { hour: 8, minute: 0 },
      duration: { hour: 1, minute: 40 },
    },
    {
      id: "1",
      title: "Jartel 2",
      weekday: Weekday.Tuesday,
      time: { hour: 8, minute: 0 },
      duration: { hour: 1, minute: 40 },
    },
    {
      id: "2",
      title: "Kemjar 1",
      weekday: Weekday.Wednesday,
      time: { hour: 8, minute: 0 },
      duration: { hour: 2, minute: 30 },
    },
    {
      id: "2",
      title: "Kemjar 2",
      weekday: Weekday.Wednesday,
      time: { hour: 13, minute: 0 },
      duration: { hour: 2, minute: 30 },
    },
  ];

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
