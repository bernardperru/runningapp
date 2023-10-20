import React from "react";
import { getWeeks } from "../../funktioner";
import WeekCard from "./WeekCard";
import ActivityCard from "./ActivityCard";
import RunMap from "../Map/RunMap";
import "./WeeklyData.css";

function WeeklyData({ activities }) {
  const [view, setView] = React.useState({
    viewAllWeeks: true,
    viewSingleWeek: false,
    viewSingleActivity: false,
  });

  const [activity, setActivity] = React.useState({
    activity: "",
  });

  const [week, setWeek] = React.useState({
    weekNumber: 0,
  });

  function handleBackButtonClick() {
    if (view.viewSingleActivity) {
      setView({
        viewAllWeeks: false,
        viewSingleWeek: true,
        viewSingleActivity: false,
      });
    } else if (view.viewSingleWeek) {
      setView({
        viewAllWeeks: true,
        viewSingleWeek: false,
        viewSingleActivity: false,
      });
    }
    console.log(view);
  }

  function handleWeekCardClick(weekNumber) {
    setWeek({ weekNumber: weekNumber });
    setView({
      viewAllWeeks: false,
      viewSingleWeek: true,
      viewSingleActivity: false,
    });
    console.log("clicked on a week card");
    console.log(view);
  }

  function handleActivityCardClick(activity) {
    setActivity({ activity: activity });
    setView({
      viewAllWeeks: false,
      viewSingleWeek: false,
      viewSingleActivity: true,
    });
    console.log("clicked on an activity inside a week");
    console.log(view);
  }

  const weeks = getWeeks(activities);

  return (
    <div>
      <div onClick={() => handleBackButtonClick()}>back button template</div>
      {view.viewAllWeeks &&
        weeks.map((weekNumber) => (
          <div key={weekNumber} onClick={() => handleWeekCardClick(weekNumber)}>
            <WeekCard
              weekNumber={weekNumber}
              activities={activities}
            ></WeekCard>
          </div>
        ))}
      {view.viewSingleWeek && (
        <div>
          {activities.map(
            (activity) =>
              activity.week === week.weekNumber && (
                <div onClick={() => handleActivityCardClick(activity)}>
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                  ></ActivityCard>
                </div>
              )
          )}
        </div>
      )}
      {view.viewSingleActivity && (
        <RunMap activity={activity.activity}></RunMap>
      )}
    </div>
  );
}

export default WeeklyData;
