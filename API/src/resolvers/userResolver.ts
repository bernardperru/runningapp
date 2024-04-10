import { GQLResolvers } from "../resolvers-types";
import { database } from "../database.js";

export const userResolver: GQLResolvers = {
  Query: {
    getUserInfo: async (_, args, context) => {
      if (!context.auth) {
        throw new Error("No user logged in!");
      }

      return context.auth.user;
    },
    getDistanceSum: async (_, args, context) => {
      const distanceAgg = await database.activity.aggregate({
        _sum: {
          distance: true,
        },
        where: {
          userId: context.auth?.user.id,
        },
      });

      return distanceAgg._sum.distance ? distanceAgg._sum.distance : 0;
    },
    getWeeklyGoal: async (_, { week, year }, context) => {
      // check database if there is a goal for this week

      if (!context.auth) {
        throw new Error("User not logged in");
      }

      const temp = parseInt(context.auth?.user.id + "" + year + "" + week);
      const weekId = parseInt(year + "" + week + "" + context.auth?.user.id);

      const currentMileage = await database.week.findUnique({
        where: { id: weekId },
      });

      const upsertWeekGoal = await database.weekGoal.upsert({
        where: { id: temp },
        update: {
          currentDistance: currentMileage ? currentMileage.distance : 0,
        },
        create: {
          user: {
            connect: {
              id: context.auth.user.id,
            },
          },
          currentDistance: currentMileage ? currentMileage.distance : 0,
          goalDistance: 20,
          id: temp,
        },
      });

      const weekGoal = await database.weekGoal.findFirst({
        where: {
          userId: context.auth.user.id,
        },
      });

      if (upsertWeekGoal) {
        return upsertWeekGoal;
      }

      return { currentDistance: 0, goalDistance: 0, id: context.auth.user.id };
    },
  },
};
