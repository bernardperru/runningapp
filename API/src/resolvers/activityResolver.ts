import { GQLResolvers } from "../resolvers-types";
import { Prisma } from "@prisma/client";
import { database } from "../database.js";

export const activityResolver: GQLResolvers = {
  Query: {
    getActivities: async (_, args, context) => {
      if (!context.auth) {
        throw new Error("No strava refresh token assigned to User:)");
      }

      if (!context.auth.user.refresh_token) {
        throw new Error("No strava refresh token assigned to User:)");
      }

      const activities = await context.auth?.stravaAPI.getListActivities(
        context.auth.user.refresh_token
      );

      if (!activities) {
        throw new Error("activities not found");
      }

      const data = activities.map((activity) => {
        return {
          userId: context.auth ? context.auth.user.id : 0,
          activityId: activity.activityId,
          distance: activity.distance,
          elapsed_time: activity.elapsed_time,
          start_date: activity.start_date,
          summary_polyline: activity.summary_polyline,
          average_cadence: activity.average_cadence,
          average_heartrate: activity.average_heartrate,
          average_pace: activity.average_pace,
          zone: activity.zone,
          weekId: undefined,
        } satisfies Prisma.ActivityCreateManyInput;
      });

      const upsertActivities = await Promise.all(
        data.map(async (activity) => {
          await database.activity.upsert({
            where: { activityId: activity.activityId },
            update: {},
            create: {
              user: {
                connect: {
                  id: activity.userId,
                },
              },
              activityId: activity.activityId,
              distance: activity.distance,
              elapsed_time: activity.elapsed_time,
              start_date: activity.start_date,
              summary_polyline: activity.summary_polyline,
              average_cadence: activity.average_cadence,
              average_heartrate: activity.average_heartrate,
              average_pace: activity.average_pace,
              zone: activity.zone,
              weekId: activity.weekId,
            },
          });
        })
      );

      //need to use filter for findMany
      const result = await database.activity.findMany();

      return result;
    },
    getActivityPage: async (_, { first, offset, order, sort }, context) => {
      const orderBy = { [sort]: order };

      const activities = await database.activity.findMany({
        skip: offset,
        take: first,
        orderBy,
      });

      const count = await database.activity.count();

      if (activities.length === 0) {
        return {
          activities: [],
          count: 0,
        };
      }

      return {
        activities: activities,
        count: count,
      };
    },
  },
};
