import { PrismaClient, Activity, Prisma } from "@prisma/client";
import { StravaAPI } from "./StravaAPI.js";
import { GQLActivity } from "./resolvers-types";
const prisma = new PrismaClient();
const stravaAPI = new StravaAPI();

async function main() {
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
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
