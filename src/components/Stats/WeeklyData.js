import React from "react";
import { getWeeks } from "../../funktioner";
import WeekCard from "./WeekCard";
import ActivityCard from "./ActivityCard";
import "./WeeklyData.css";

function WeeklyData({ activities }) {
  const [view, setView] = React.useState({
    weekNumber: 0,
    viewAll: true,
  });

  function handleCardClick(week) {
    setView({ weekNumber: week, viewAll: false });
  }

  const weeks = getWeeks(activities);

  return (
    <div>
      {view.viewAll == false ? (
        <div>
          {activities.map((activity) =>
            activity.week == view.weekNumber ? (
              <ActivityCard activity={activity}></ActivityCard>
            ) : (
              <div></div>
            )
          )}
        </div>
      ) : (
        weeks.map((week) => (
          <div onClick={() => handleCardClick(week)}>
            <WeekCard
              key={week}
              weekNumber={week}
              activities={activities}
            ></WeekCard>
          </div>
        ))
      )}
    </div>
  );
}

export default WeeklyData;
