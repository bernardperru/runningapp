import React from "react";
import { weekDistanceCumulative, average, format } from "../../funktioner";
import WeekAverageCard from "./WeekAverageCard";
import ActivityCard from "./ActivityCard";
import "./WeeklyData.css";

function WeeklyData(props) {
  const [weekView, setWeek] = React.useState({
    weekNumber: 0,
    see: false,
  });

  function handleCardClick(week) {
    setWeek({ weekNumber: week, see: true });
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
  const weeks = weekDistanceCumulative(props.activities);

  return (
    <div>
      {weekView.see ? (
        <div>
          {props.activities.map((activity) =>
            activity.week == weekView.weekNumber ? (
              <ActivityCard activity={activity}></ActivityCard>
            ) : (
              <></>
            )
          )}
        </div>
      ) : (
        weeks.map((week) => (
          <div
            key={week}
            className="weekcard"
            onClick={() => handleCardClick(week)}
          >
            <h1 className="weektitle">{week}</h1>
            {stats.map((stat) => (
              <div className="weekstats">
                <ul>
                  <WeekAverageCard
                    key={stat.id}
                    activityStat={stat.label}
                    averageOfStats={format(
                      stat.key,
                      average(stat.key, week, props.activities, stat.type)
                    )}
                  ></WeekAverageCard>
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default WeeklyData;
