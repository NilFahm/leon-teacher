import React, { useState, useEffect } from 'react'

const RTime = ({ schedule }) => {

    const [datestring, setDateString] = useState(null);
    const [isclassstart, setIsClassStart] = useState(false);
    const [time, settime] = useState(0)

    useEffect(() => {
        if (schedule) {
          setInterval(() => {
            setDateString(
              GetTimeString(schedule.startDate, schedule.endDate)
            );
          }, 1000);
        }
      }, []);
    
    
      function GetTimeString(start, end) {
        let secs = (new Date() - new Date(start)) / 1000;
        console.log(start)
        // if (secs > 0) {
        //     let hours = Math.floor(secs / (60 * 60));

        //     let divisor_for_minutes = secs % (60 * 60);
        //     let minutes = Math.floor(divisor_for_minutes / 60);

        //     let divisor_for_seconds = divisor_for_minutes % 60;
        //     let seconds = Math.ceil(divisor_for_seconds);

        //     let obj = {
        //         h: hours,
        //         m: minutes,
        //         s: seconds,
        //     };
        //     return obj.h + ":" + obj.m + ":" + obj.s;

        // } else {
        //     setIsClassStart(true);
        // }
    }
    return (
        <>
            <div className="recTiming">00:44:59</div>
        </>
    )
}

export default RTime
