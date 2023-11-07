import { StravaAPI } from "../StravaAPI.js";
import { GQLResolvers } from "../resolvers-types";
import { PrismaClient, Prisma } from "@prisma/client";

const stravaAPI = new StravaAPI();
const prisma = new PrismaClient();

export const activityResolver: GQLResolvers = {
  Query: {
    getActivities: async () => {
      const activities = await stravaAPI.getListActivities();
      const data = activities.map((activity) => {
        return {
          userId: activity.userId,
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

      const cd = await Promise.all(
        data.map(async (activity) => {
          await prisma.activity.upsert({
            where: { userId: activity.userId },
            update: {},
            create: {
              userId: activity.userId,
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
        })
      );

      console.log("i am here");
      console.log(cd);
      const result = await prisma.activity.findMany();

      return result;
    },
  },
};
