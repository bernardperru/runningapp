import { bcrypt } from "bcryptjs";
import { Jwt } from "jsonwebtoken";
import { GQLResolvers } from "../resolvers-types";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const authResolver: GQLResolvers = {
  Mutation: {
    // signup: async (args: { email: string; password: string; name: string }) => {
    //   const { email, name } = args;
    //   const password = await bcrypt.hash(args.password, 10);
    //   const user = (await prisma.user.create({
    //     data: {
    //       email,
    //       name,
    //       password,
    //       refresh_token: "xxx",
    //     },
    //   })) satisfies Prisma.UserCreateInput;
    // },
  },
};
