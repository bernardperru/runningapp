import { GQLResolvers } from "../resolvers-types";
import { Prisma } from "@prisma/client";
import { database } from "../database.js";

export const userResolver: GQLResolvers = {
  Query: {
    getUserInfo: async (_, args, context) => {
      if (!context.auth) {
        throw new Error("No user logged in!");
      }

      return context.auth.user;
    },
  },
};
