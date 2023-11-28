import { GQLResolvers } from "../resolvers-types";

export const userResolver: GQLResolvers = {
  Query: {
    getUserInfo: async (_, args, context) => {
      if (!context.auth) {
        throw new Error("No user logged in!");
      }

      return context.auth.user;
    },
    getDistanceSum: async (_, args, context) => {
      return 0;
    },
  },
};
