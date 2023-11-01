import { PrismaClient, Prisma } from "@prisma/client";
import { StravaAPI } from "./StravaAPI.js";
import { GQLActivity } from "./resolvers-types";
const prisma = new PrismaClient();
const stravaAPI = new StravaAPI();

export function getActivities() {
  const activities = prisma.activity.findMany();

  return activities;
}

export async function addAndGetActivities() {
  const activities = await stravaAPI.getListActivities();
  const data = activities.map((activity) => {
    return {
      stravaId: activity.id,
      distance: activity.distance,
      elapsed_time: activity.elapsed_time,
      start_date: activity.start_date,
      summary_polyline: activity.summary_polyline,
      average_cadence: activity.average_cadence,
      average_heartrate: activity.average_heartrate,
      week: activity.week,
      zone: activity.zone,
    } satisfies Prisma.ActivityCreateManyInput;
  });

  data.map((activity) => {
    upsertActivity(activity);
  });

  const result = await prisma.activity.findMany();

  return result;
}

async function upsertActivity(activity: Prisma.ActivityCreateManyInput) {
  const upsertActivities = await prisma.activity.upsert({
    where: { stravaId: activity.stravaId },
    update: {},
    create: {
      stravaId: activity.stravaId,
      distance: activity.distance,
      elapsed_time: activity.elapsed_time,
      start_date: activity.start_date,
      summary_polyline: activity.summary_polyline,
      average_cadence: activity.average_cadence,
      average_heartrate: activity.average_heartrate,
      week: activity.week,
      zone: activity.zone,
    },
  });

  console.log(upsertActivities);
}
