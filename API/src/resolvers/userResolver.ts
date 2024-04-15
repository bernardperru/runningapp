import { GQLResolvers } from "../resolvers-types";
import { database } from "../database.js";
import { getCurrentWeekAndYear } from "../utils/formatActivityData.js";

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
  },
};
