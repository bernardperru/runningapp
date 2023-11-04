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

      await Promise.all(
        data.map(async (activity) => {
          await prisma.activity.upsert({
            where: { stravaId: activity.stravaId },
            update: {},
            create: {
              userId: activity.userId,
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
        })
      );

      const result = await prisma.activity.findMany();
      return result;
    },
  },
};
