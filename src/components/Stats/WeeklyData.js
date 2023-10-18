import React from "react";
import { weekDistanceCumulative, average, format } from "../../funktioner";
import AverageStats from "./AverageStats";
import "./WeeklyData.css";

function WeeklyData(props) {
  function handleCardClick() {
    console.log("clicked card");
  }

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
    <div>
      {weeks.map((week) => (
        <div key={week} className="weekcard" onClick={() => handleCardClick()}>
          <h1 className="weektitle">{week}</h1>
          {stats.map((stat) => (
            <div className="weekstats">
              <ul>
                <AverageStats
                  key={stat.id}
                  activityStat={stat.label}
                  averageOfStats={format(
                    stat.key,
                    average(stat.key, week, props.activities, stat.type)
                  )}
                ></AverageStats>
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default WeeklyData;
