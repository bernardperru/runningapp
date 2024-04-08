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
    getWeeklyGoal: async (_, args, context) => {
      // check database if there is a goal for this week

      // if not create one based on the previous week

      //return WeekGoal
      return { currentDistance: 0, goalDistance: 20, id: 1 };
    },
  },
};
