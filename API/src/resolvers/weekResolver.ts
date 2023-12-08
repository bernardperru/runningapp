import { GQLResolvers } from "../resolvers-types";
import { Prisma } from "@prisma/client";
import { database } from "../database.js";
import { getWeek, getYear } from "../utils/formatActivityData.js";
interface weekDict {
  [key: number]: weekActivities;
}

interface weekActivities {
  id: number;
  week: number;
  year: number;
  distance: Array<number>;
  heartrate: Array<number>;
  cadence: Array<number>;
  time: Array<number>;
}

export const weekResolver: GQLResolvers = {
  Query: {
    getWeeks: async (_, args, context) => {
      if (!context.auth) {
        throw new Error("No strava refresh token assigned to User:)");
      }

      //Fetch activities with no week relation
      const activites = await database.activity.findMany({
        where: {
          weekId: null,
        },
      });

      console.log(activites.length);

      const createWeeks = await Promise.all(
        activites.map(async (activity) => {
          const weekId = parseFloat(
            getYear(activity.start_date).toString() +
              getWeek(activity.start_date).toString() +
              activity.userId.toString()
          );
          await database.week.upsert({
            where: { id: weekId },
            update: {
              activities: {
                connect: { activityId: activity.activityId },
              },
              cadence: { increment: activity.average_cadence },
              distance: { increment: activity.distance },
              time: { increment: activity.elapsed_time },
              heartrate: { increment: activity.average_heartrate },
            },
            create: {
              id: weekId,
              cadence: activity.average_cadence,
              distance: activity.distance,
              heartrate: activity.average_heartrate,
              time: activity.elapsed_time,
              week: getWeek(activity.start_date),
              year: getYear(activity.start_date),
              activities: {
                connect: { activityId: activity.activityId },
              },
              user: {
                connect: {
                  id: context.auth?.user.id,
                },
              },
            },
          });
        })
      );

      //need a conditional
      const result = await database.week.findMany({
        where: { userId: context.auth.user.id },
        include: { activities: true },
      });

      return result;
    },
  },
};
