import React from "react";
import { getWeeks } from "../../funktioner";
import WeekCard from "./WeekCard";
import ActivityCard from "./ActivityCard";
import RunMap from "../Map/RunMap";
import "./WeeklyData.css";
import { BsArrowReturnLeft } from "react-icons/bs";

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
  }

  function handleWeekCardClick(weekNumber) {
    setWeek({ weekNumber: weekNumber });
    setView({
      viewAllWeeks: false,
      viewSingleWeek: true,
      viewSingleActivity: false,
    });
  }

  function handleActivityCardClick(activity) {
    setActivity({ activity: activity });
    setView({
      viewAllWeeks: false,
      viewSingleWeek: false,
      viewSingleActivity: true,
    });
  }

  const weeks = getWeeks(activities);

  return (
    <div>
      {(view.viewSingleWeek || view.viewSingleActivity) && (
        <BsArrowReturnLeft
          onClick={() => handleBackButtonClick()}
        ></BsArrowReturnLeft>
      )}
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
                <div
                  key={activity.id}
                  onClick={() => handleActivityCardClick(activity)}
                >
                  <ActivityCard activity={activity}></ActivityCard>
                </div>
              )
          )}
        </div>
      )}
      {view.viewSingleActivity && (
        <div>
          <RunMap activity={activity.activity}></RunMap>
        </div>
      )}
    </div>
  );
}

export default WeeklyData;
