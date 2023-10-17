import React from "react";
import { weekDistanceCumulative, average, format } from "../../funktioner";
import AverageStats from "./AverageStats";

function WeeklyData(props) {
  const stats = [
    {
      id: 1,
      key: "distance",
      label: "Distance",
      type: "sum",
    },
    {
      id: 2,
      key: "average_cadence",
      label: "Avg. Cadence",
      type: "avg",
    },
    {
      id: 3,
      key: "elapsed_time",
      label: "Time",
      type: "sum",
    },
    {
      id: 4,
      key: "average_heartrate",
      label: "Avg. Heartrate",
      type: "avg",
    },
  ];

  //list of week numbers to get average per week
  const weeks = weekDistanceCumulative(props.activities).reverse();

  return (
    <span>
      {weeks.map((week) => (
        <span key={week}>
          {week}
          {stats.map((stat) => (
            <AverageStats
              key={stat.id}
              activityStat={stat.label}
              averageOfStats={format(
                stat.key,
                average(stat.key, week, props.activities, stat.type)
              )}
            ></AverageStats>
          ))}
        </span>
      ))}
    </span>
  );
}

export default WeeklyData;
