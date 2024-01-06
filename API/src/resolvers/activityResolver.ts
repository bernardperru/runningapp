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
      const result = await database.activity.findMany({
        where: {
          userId: context.auth.user.id,
        },
      });

      return result;
    },
    getActivityPage: async (_, { first, offset, order, sort }, context) => {
      const orderBy = { [sort]: order };

      const [activities, count] = await Promise.all([
        database.activity.findMany({
          where: {
            userId: context.auth?.user.id,
          },
          skip: offset,
          take: first,
          orderBy,
        }),
        database.activity.count({
          where: {
            userId: context.auth?.user.id,
          },
        }),
      ]);

      const pages = Math.ceil(count / first);
      const currentPage = offset / first + 1;

      return {
        activities,
        pages,
        currentPage,
      };
    },
    updateActivities: async (_, args, context) => {
      if (!context.auth) {
        throw new Error("User not logged in");
      }

      if (!context.auth.user.refresh_token) {
        throw new Error("No strava refresh token assigned to User");
      }

      const activities = await context.auth.stravaAPI.getListActivities(
        context.auth.user.refresh_token
      );

      if (!activities) {
        throw new Error("activities not returned from Strava");
      }

      const oldActivityCount = await database.activity.count({
        where: {
          userId: context.auth.user.id,
        },
      });

      const upsertActivities = await Promise.all(
        activities.map(async (activity) => {
          await database.activity.upsert({
            where: { activityId: activity.activityId },
            update: {},
            create: {
              user: {
                connect: {
                  id: context.auth ? context.auth.user.id : 0,
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
              weekId: undefined,
            },
          });
        })
      );

      const newActivityCount = await database.activity.count({
        where: {
          userId: context.auth.user.id,
        },
      });

      return newActivityCount - oldActivityCount;
    },
    getPages: async (_, { first }, context) => {
      const count = await database.activity.count({
        where: {
          userId: context.auth?.user.id,
        },
      });
      const pages = Math.ceil(count / first);

      return pages;
    },
  },
};
