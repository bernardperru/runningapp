import React from "react";
import "./WeekCard.css";
import { average, format } from "../../funktioner";

function WeekCard({ weekNumber, activities }) {
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

  return (
    <div className="weekcard">
      <h1>{weekNumber}</h1>
      <ul>
        {stats.map((stat) => (
          <li key={stat.id}>
            <span>
              {stat.label}
              {" : "}
              <span>
                {format(
                  stat.key,
                  average(stat.key, weekNumber, activities, stat.type)
                )}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeekCard;
