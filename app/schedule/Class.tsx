"use client";

import { ClassMeta, ScheduleTime } from "@/types/schedule";
import React, { useEffect, useState } from "react";

export default function Class({
  id,
  title,
  classTime,
  classDuration,
  startTime,
  meta,
  changeScheduleCallback,
}: {
  id: string;
  title: string;
  classTime: ScheduleTime;
  classDuration: ScheduleTime;
  startTime?: ScheduleTime;
  meta?: ClassMeta;
  changeScheduleCallback?: (title: string, meta: ClassMeta) => void;
}) {
  const [active, setActive] = useState("");
  const [metaState, setMetaState] = useState(meta);

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

  const changeScheduleForThisClass = (newMeta: ClassMeta) => {
    if (changeScheduleCallback) {
      // console.log("changing this class");
      changeScheduleCallback(id, newMeta);
      setMetaState(newMeta);
    } else {
      console.error("No changeScheduleCallback found");
    }
  };

  const changeScheduleForPartner = (newMeta: ClassMeta) => {
    if (changeScheduleCallback && meta?.partnerId) {
      meta.partnerId.forEach((partnerId) => {
        console.log("changing partner class id: ", partnerId);
        changeScheduleCallback(partnerId, { ...newMeta }); // Pass a new object reference
      });
    }
  };

  const handleClassClick = () => {
    if (metaState?.active) {
      changeScheduleForThisClass({
        active: false,
        selected: true,
        partnerHovered: false,
      });
      changeScheduleForPartner({
        active: false,
        selected: false,
        partnerHovered: false,
      });
    } else {
      changeScheduleForThisClass({
        active: true,
        selected: false,
        partnerHovered: false,
      });
      changeScheduleForPartner({
        active: true,
        selected: false,
        partnerHovered: false,
      });
    }
  };

  const handlePartnerHoverLeave = () => {
    if (metaState?.active) {
      changeScheduleForThisClass({ active: true, partnerHovered: false });
      setMetaState({ ...metaState, partnerHovered: false });
      changeScheduleForPartner({ active: true, partnerHovered: false });
    }
  };

  const handlePartnerHoverEnter = () => {
    if (metaState?.active) {
      changeScheduleForThisClass({ active: true, partnerHovered: true });
      setMetaState({ ...metaState, partnerHovered: true });
      changeScheduleForPartner({ active: true, partnerHovered: true });
    }
  };

  useEffect(() => {
    console.log("meta of ", title, " is ", metaState);
    if (metaState) {
      if (metaState.active) {
        setActive("active");
      } else {
        if (metaState.selected) {
          setActive("selected");
        } else {
          setActive("Not Selected");
        }
      }
      if (metaState.partnerHovered) {
        console.log("partnerHovered");
        setActive("partnerHovered");
      }
    }
  }, [metaState]);

  useEffect(() => {
    setMetaState(meta);
  }, [meta]);

  return (
    <div
      className="absolute z-10 w-full cursor-pointer rounded-lg border border-blue-200 p-1 text-xs text-black opacity-75 transition-all duration-200 ease-in-out hover:bg-blue-200 hover:opacity-100"
      style={{
        height: timeToHeight(classDuration),
        top: timeToTop(startTime?.hour || 0, classTime.hour),
        backgroundColor:
          active === "partnerHovered"
            ? "rgba(255, 100, 100, 0.8)"
            : active === "selected"
              ? "rgba(100, 255, 100, 0.8)"
              : active === "active"
                ? "rgba(100, 100, 255, 0.8)"
                : "rgba(160, 160, 160, 0.8)",
      }}
      onClick={handleClassClick}
      onMouseEnter={handlePartnerHoverEnter}
      onMouseLeave={handlePartnerHoverLeave}
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
