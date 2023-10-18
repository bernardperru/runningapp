import React from "react";
import "./AverageStats.css";

function AverageStats({ activityStat, averageOfStats }) {
  return (
    <li>
      <span>{activityStat}</span> {averageOfStats}
    </li>
  );
}

export default AverageStats;
