import { GQLResolvers } from "../resolvers-types";
import { StravaAPI } from "../StravaAPI.js";

export const userResolver: GQLResolvers = {
  Query: {
    // postUser: async (parent, args, contextValue, info) => {
    //   const user = (await prisma.user.create({
    //     data: {
    //       id: 1,
    //       email: args.email,
    //       name: args.name
    //       password: args.password,
    //       refresh_token: args.refreshToken,
    //     },
    //   })) satisfies Prisma.UserCreateInput;
    //   return "user";
    // },
  },
};
