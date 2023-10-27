import { StravaAPI } from "../StravaAPI.js";
import { GQLResolvers, GQLActivity } from "../resolvers-types";
// import { PrismaClient } from "@prisma/client";

const stravaAPI = new StravaAPI();
// const prisma = new PrismaClient();

export const activityResolver: GQLResolvers = {
  Query: {
    getActivity: () => stravaAPI.getListActivities(),
  },
};

// async function xd() {
//   const activities = await stravaAPI.getListActivities();

//   return stravaAPI.getListActivities();
// }

// const c = new StravaAPI();
// const activities: GQLActivity[] = await c.getListActivities();

// activities.map((activity) => {
//   activity.zone = getZone(activity.average_heartrate);
//   activity.week = getWeek(activity.start_date);
// });
