export function weekDistanceCumulative(activities) {
  const activitiesWithWeek = activities.map((activity) => {
    const currentDate = new Date(activity["start_date"]);
    const startDate = new Date(currentDate.getFullYear(), 0, 1);

    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

    const weekNumber = Math.ceil(days / 7);

    return { key: weekNumber, val: activity };
  });

  let hash = {};

  activitiesWithWeek.map((x) => {
    if (hash[x.key] == undefined) {
      hash[x.key] = 0;
    }
    hash[x.key] = hash[x.key] + x.val["distance"];
  });

  return hash;
}

export function prettyDate(start_date) {
  const date = new Date(start_date);

  return (
    date.getDate() +
    "-" +
    (parseInt(date.getMonth()) + 1) +
    "-" +
    date.getFullYear()
  );
}

//Adds Zone data field to the activity objects
export function addZones(activities) {
  activities.map((activity) => {
    Object.assign(activity, zone(activity["average_heartrate"].toFixed(0)));
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

export function average(key, activities) {
  let accumulator = 0;
  activities.map((activity) => {
    accumulator += activity[key];
  });
  return accumulator / activities.length;
}

export function format(key, value) {
  switch (key) {
    case "distance":
      return (value / 1000).toFixed(2) + " km";
    case "average_cadence":
      return (value * 2).toFixed(0) + " spm";
    case "elapsed_time":
      return (value / 60).toFixed(2) + " min";
    case "average_heartrate":
      return value.toFixed(0) + " bpm";
    case "start_date":
      return prettyDate(value);
    default:
      return value;
  }
}
