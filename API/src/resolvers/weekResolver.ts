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
    getWeeks: async (_, args, { auth }) => {
      if (!auth) {
        throw new Error("User not found");
      }

      //Fetch activities with no week relation
      const activites = await database.activity.findMany({
        where: {
          weekId: null,
          userId: auth.user.id,
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
            where: { id: weekId, userId: auth.user.id },
            update: {
              activities: {
                connect: { activityId: activity.activityId },
              },
              cadence: { increment: activity.average_cadence },
              distance: { increment: activity.distance },
              time: { increment: activity.elapsed_time },
              heartrate: { increment: activity.average_heartrate },
              activityCount: { increment: 1 },
            },
            create: {
              id: weekId,
              cadence: activity.average_cadence,
              distance: activity.distance,
              heartrate: activity.average_heartrate,
              time: activity.elapsed_time,
              week: getWeek(activity.start_date),
              year: getYear(activity.start_date),
              activityCount: 1,
              activities: {
                connect: { activityId: activity.activityId },
              },
              user: {
                connect: {
                  id: auth.user.id,
                },
              },
            },
          });
        })
      );

      const result = await database.week.findMany({
        where: { userId: auth.user.id },
        include: { activities: true },
      });

      return result;
    },
    getWeeksPage: async (_, { first, offset }, { auth }) => {
      const [weeks, count] = await Promise.all([
        database.week.findMany({
          where: {
            userId: auth?.user.id,
          },
          skip: offset,
          take: first,
        }),
        database.week.count({
          where: {
            userId: auth?.user.id,
          },
        }),
      ]);

      const pages = Math.ceil(count / first);
      const currentPage = offset / first + 1;

      return {
        weeks,
        pages,
        currentPage,
      };
    },
    getWeekActivities: async (_, { year, week }, { auth }) => {
      const activities = await database.week.findUnique({
        where: {
          id: parseInt(
            year.toString() + week.toString() + auth?.user.id.toString()
          ),
        },
        include: {
          activities: true,
        },
      });

      if (!activities) {
        return [];
      }

      return activities.activities;
    },
  },
};
