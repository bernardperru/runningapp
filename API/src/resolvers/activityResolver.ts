import { StravaAPI } from "../StravaAPI.js";

import { getWeek, getZone } from "../functions";
import { GQLResolvers, GQLActivity } from "../resolvers-types";

const stravaAPI = new StravaAPI();

export const activityResolver: GQLResolvers = {
  Query: {
    getActivity: () => stravaAPI.getListActivities(),
  },
};

// const c = new StravaAPI();
// const activities: GQLActivity[] = await c.getListActivities();

// activities.map((activity) => {
//   activity.zone = getZone(activity.average_heartrate);
//   activity.week = getWeek(activity.start_date);
// });
