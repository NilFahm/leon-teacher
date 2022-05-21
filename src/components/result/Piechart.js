import React, { useEffect } from 'react'
import DonutChart from 'react-donut-chart';

const Piechart = ({ details }) => {
  useEffect(() => {
  }, [])
  const reactDonutChartdata = [
    {
      label: "DONE",
      value: 25,
      color: "#00E396"
    },
    {
      label: "REMAINING",
      value: 65,
      color: "#FEB019"
    },
    {
      label: "FALSE",
      value: 100,
      color: "#FF4560"
    },
    {
      label: "TRUE",
      value: 15,
      color: "#775DD0"
    }
  ];
  const reactDonutChartBackgroundColor = [
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0"
  ];
  const reactDonutChartInnerRadius = 0.5;
  const reactDonutChartSelectedOffset = 0.04;
  const reactDonutChartHandleClick = (item, toggled) => {
    if (toggled) {
      console.log(item);
    }
  };
  let reactDonutChartStrokeColor = "#FFFFFF";
  const reactDonutChartOnMouseEnter = (item) => {
    let color = reactDonutChartdata.find((q) => q.label === item.label).color;
    reactDonutChartStrokeColor = color;
  };
  return (
    <>
      <DonutChart
        width={250}
        height={180}
        onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
        strokeColor={reactDonutChartStrokeColor}
        colors={reactDonutChartBackgroundColor}
        innerRadius={reactDonutChartInnerRadius}
        selectedOffset={reactDonutChartSelectedOffset}
        data={reactDonutChartdata}
        onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
      />
    </>
  )
}

export default Piechart
