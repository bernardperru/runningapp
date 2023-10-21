import React from "react";
import { getWeeks } from "../../funktioner";
import WeekCard from "./WeekCard";
import ActivityCard from "./ActivityCard";
import RunMap from "../Map/RunMap";
import "./WeeklyData.css";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

function WeeklyData({ activities }) {
  let { weekNumber } = useParams();

  return (
    <div>
      {activities.map(
        (activity) =>
          activity.week === weekNumber && (
            <div key={activity.id}>
              <ActivityCard activity={activity}></ActivityCard>
            </div>
          )
      )}
    </div>
  );
}

export default WeeklyData;
