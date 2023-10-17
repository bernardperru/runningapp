//Divides the activities into weeks, and accumulates the distance for each week
export function weekDistanceCumulative(activities) {
  const activitiesWithWeek = activities.map((activity) => {
    const currentDate = new Date(activity["start_date"]);
    const startDate = new Date(currentDate.getFullYear(), 0, 1);

    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

    const weekNumber = Math.ceil(days / 7);

    return weekNumber;
  });

  let uniqueWeeks = [];

  activitiesWithWeek.map((x) => {
    if (!uniqueWeeks.includes(x)) {
      uniqueWeeks.push(x);
    }
  });

  return uniqueWeeks;
}

function weekNumber(activity) {
  const currentDate = new Date(activity["start_date"]);
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil(days / 7);

  return { week: weekNumber };
}

//Adds Zone data field to the activity objects
export function addZones(activities) {
  activities.map((activity) => {
    Object.assign(activity, zone(activity["average_heartrate"].toFixed(0)));
  });
}

export function addWeekNumbers(activities) {
  activities.map((activity) => {
    Object.assign(activity, weekNumber(activity));
  });
}

//Chooses zone based on heartrate -- Currently static, but can be based on % of max heartrate
function zone(heartRate) {
  if (98 <= heartRate && heartRate <= 116) {
    return { zone: 1 };
  } else if (117 <= heartRate && heartRate <= 136) {
    return { zone: 2 };
  } else if (137 <= heartRate && heartRate <= 155) {
    return { zone: 3 };
  } else if (156 <= heartRate && heartRate <= 175) {
    return { zone: 4 };
  } else if (175 < heartRate) {
    return { zone: 5 };
  }
}

export function average(key, conditional, activities, type) {
  let accumulator = 0;
  let i = 0;
  activities.map((activity) => {
    if (activity.week == conditional) {
      accumulator += activity[key];
      i++;
    }
  });

  if (type == "avg") {
    return accumulator / i;
  }

  return accumulator;
}

export function format(key, value) {
  switch (key) {
    case "distance":
      return (value / 1000).toFixed(2) + " km";
    case "average_cadence":
      return (value * 2).toFixed(0) + " spm";
    case "elapsed_time":
      const hours = Math.floor(value / 3600);
      value = value - hours * 3600;
      const minutes = Math.floor(value / 60);
      const seconds = value - minutes * 60;
      return hours + ":" + minutes + ":" + seconds.toFixed(0) + "";
    case "average_heartrate":
      return value.toFixed(0) + " bpm";
    case "start_date":
      const date = new Date(value);
      return (
        date.getDate() +
        "-" +
        (parseInt(date.getMonth()) + 1) +
        "-" +
        date.getFullYear()
      );
    default:
      return value;
  }
}
