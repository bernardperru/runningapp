import React from "react";
import { format } from "../../funktioner";
import "./ActivityCard.css";

function ActivityCard({ activity }) {
  const headers = [
    {
      id: 1,
      key: "start_date",
      label: "Date",
    },
    {
      id: 2,
      key: "distance",
      label: "Distance",
    },
    {
      id: 3,
      key: "average_cadence",
      label: "Avg. Cadence",
    },
    {
      id: 4,
      key: "elapsed_time",
      label: "Time",
    },
    {
      id: 5,
      key: "average_heartrate",
      label: "Avg. Heartrate",
    },
    {
      id: 6,
      key: "zone",
      label: "Zone",
    },
  ];

  return (
    <ul className="activity-card">
      {headers.map((header) => (
        <li key={header.id}>
          {header.label} : {format(header.key, activity[header.key])}
        </li>
      ))}
    </ul>
  );
}

export default ActivityCard;
