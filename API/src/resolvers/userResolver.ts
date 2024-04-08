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

      const upsertWeekGoal = await database.weekGoal.upsert({
        where: { id: temp },
        update: {},
        create: {
          user: {
            connect: {
              id: context.auth.user.id,
            },
          },
          currentDistance: 0,
          goalDistance: 20,
          id: temp,
        },
      });

      console.log({ upsertWeekGoal });

      const weekGoal = await database.weekGoal.findFirst({
        where: {
          userId: context.auth.user.id,
        },
      });

      if (weekGoal) {
        return weekGoal;
      }

      return { currentDistance: 0, goalDistance: 0, id: context.auth.user.id };
    },
  },
};
