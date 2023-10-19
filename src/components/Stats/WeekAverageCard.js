import React from "react";
import "./WeekAverageCard.css";

function WeekAverageCard({ activityStat, averageOfStats }) {
  return (
    <li>
      <span>{activityStat}</span> {averageOfStats}
    </li>
  );
}

export default WeekAverageCard;
