import React from "react";
import { useState, useEffect } from "react";
import { weekDistanceCumulative, average, format } from "../funktioner";
import AverageStats from "./AverageStats";

function WeeklyData(props) {
  const [activities, setActivities] = useState(props.activities);

  const stats = [
    {
      id: 1,
      key: "distance",
      label: "Distance",
    },
    {
      id: 2,
      key: "average_cadence",
      label: "Avg. Cadence",
    },
    {
      id: 3,
      key: "elapsed_time",
      label: "Time",
    },
    {
      id: 4,
      key: "average_heartrate",
      label: "Avg. Heartrate",
    },
  ];

  const hash = weekDistanceCumulative(props.activities);
  let averageMileage = 0;
  Object.keys(hash).map((key) => {
    averageMileage += hash[key];
  });

  averageMileage = (averageMileage / Object.keys(hash).length / 1000).toFixed(
    2
  );
  let goalMileage = averageMileage / 10;
  goalMileage += parseFloat(averageMileage);

  return (
    <div>
      {stats.map((stat) => (
        <AverageStats
          key={stat.id}
          activityStat={stat.label}
          averageOfStats={format(stat.key, average(stat.key, props.activities))}
        ></AverageStats>
      ))}
    </div>
  );
}

export default WeeklyData;
