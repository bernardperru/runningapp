import { PrismaClient, Activity, Map, Prisma } from "@prisma/client";
import { StravaAPI } from "./StravaAPI.js";
import { GQLActivity } from "./resolvers-types";
const prisma = new PrismaClient();
const stravaAPI = new StravaAPI();

async function main() {
  const activities = await stravaAPI.getListActivities();
  const data = activities.map((activity) => {
    return {
      distance: activity.distance,
      elapsed_time: activity.elapsed_time,
      start_date: activity.start_date,
      map: { create: { summary_polyline: activity.map.summary_polyline } },
      average_cadence: activity.average_cadence,
      average_heartrate: activity.average_heartrate,
      week: activity.week,
      zone: activity.zone,
    } satisfies Prisma.ActivityCreateInput;
  });

  const activity = activities[0];

  const createActivities = await prisma.activity.create({
    data: data[0],
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
