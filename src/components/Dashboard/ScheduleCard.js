import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScheduleCard = ({ scheduledata }) => {
  const navigate = useNavigate();
  const [datestring, setDateString] = useState(null);
  const [isclassstart, setIsClassStart] = useState(false);

  useEffect(() => {
    
    if (scheduledata) {
      setInterval(() => {
        setDateString(
          GetTimeString(scheduledata.startTime, scheduledata.endTime)
        );
      }, 1000);
    }
  }, [datestring, scheduledata]);

  function GetFormatedTime(datestring) {
    let date = new Date(datestring);
    return (
      (date.getHours() > 12
        ? ("0" + (date.getHours() - 12)).slice(-2)
        : ("0" + date.getHours()).slice(-2)) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      " " +
      (date.getHours() > 12 ? "PM" : "AM")
    );
  }

  function GetTimeString(start, end) {
    let secs = (new Date(start) - new Date()) / 1000;
    if (secs > 0) {
      let hours = Math.floor(secs / (60 * 60));

      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);

      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let obj = {
        h: hours,
        m: minutes,
        s: seconds,
      };
      return obj.h + ":" + obj.m + ":" + obj.s;

    } else {
      setIsClassStart(true);
    }
  }

  async function StartClass(sessionid) {
    return navigate("/startcall/" + sessionid);
  }

  return (
    <>
      <li className={!isclassstart && "nextActive"}>
        <div className="dashSchBoxIn">
          <div className="dashSchTim">
            {scheduledata.startTime &&
              GetFormatedTime(scheduledata.startTime)}{" "}
            -{" "}
            {scheduledata.endTime &&
              GetFormatedTime(scheduledata.endTime)}
          </div>
          <div className="dashLes">
            {scheduledata.courseName} - {scheduledata.courseType}
          </div>
          <div
            className="dashStatus"
            style={{ cursor: "pointer" }}
            onClick={(e) => isclassstart && StartClass(scheduledata.roomId)}
          >
            {isclassstart ? (
              <span>Start Class</span>
            ) : (
              <>
                {" "}
                Start In <span>{datestring}</span>
              </>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default ScheduleCard;
