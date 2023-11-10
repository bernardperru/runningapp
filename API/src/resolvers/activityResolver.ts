import { GQLResolvers } from "../resolvers-types";
import { Prisma } from "@prisma/client";
import { database } from "../database.js";

export const activityResolver: GQLResolvers = {
  Query: {
    getActivities: async (_, args, context) => {
      if (!context.auth?.stravaAPI) {
        throw new Error("No strava refresh token assigned to User:)");
      }
      console.log(context.auth?.user.id);

      const activities = await context.auth?.stravaAPI.getListActivities();

      if (!activities) {
        throw new Error("activities not found");
      }

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
          await database.activity.upsert({
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

      const result = await database.activity.findMany();

      return result;
    },
  },
};
