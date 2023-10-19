import React from "react";
import { weekDistanceCumulative, average, format } from "../../funktioner";
import WeekCard from "./WeekCard";
import ActivityCard from "./ActivityCard";
import "./WeeklyData.css";

function WeeklyData(props) {
  const [weekView, setWeek] = React.useState({
    weekNumber: 0,
    view: false,
  });

  function handleCardClick(week) {
    setWeek({ weekNumber: week, see: true });
  }

  //list of week numbers to get average per week
  const weeks = weekDistanceCumulative(props.activities);

  return (
    <div>
      {weekView.see ? (
        <>
          {props.activities.map((activity) =>
            activity.week == weekView.weekNumber ? (
              <ActivityCard activity={activity}></ActivityCard>
            ) : (
              <></>
            )
          )}
        </>
      ) : (
        weeks.map((week) => (
          <WeekCard
            key={week}
            weekNumber={week}
            activities={props.activities}
          ></WeekCard>
        ))
      )}
    </div>
  );
}

export default WeeklyData;
/*
<div
key={week}
className="weekcard"
onClick={() => handleCardClick(week)}
>
<h1>{week}</h1>
{stats.map((stat) => (
  <div>
    <ul>
      <WeekCard
        key={stat.id}
        activityStat={stat.label}
        averageOfStats={format(
          stat.key,
          average(stat.key, week, props.activities, stat.type)
        )}
      ></WeekCard>
    </ul>
  </div>
))}
</div>
*/
