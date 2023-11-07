import { bcrypt } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {
  GQLAuthPayload,
  GQLMutationResolvers,
  GQLResolvers,
} from "../resolvers-types";
import { PrismaClient, Prisma } from "@prisma/client";
import * as dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

export const authResolver: GQLMutationResolvers = {
  Mutation: {
    signup: async (args: { email: string; password: string; name: string }) => {
      const { email, name } = args;
      const password = await bcrypt.hash(args.password, 10);
      const tempUser = {
        email: email,
        name: name,
        password: password,
        refresh_token: "xxx",
      } satisfies Prisma.UserCreateInput;

      const user = await prisma.user.create({
        data: tempUser,
      });

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

      const authPayload = {
        token: token,
        user: user,
      };
      return authPayload;
    },
    login: async (args: { email: string; name: string; password: string }) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });

      if (!user) {
        throw new Error("No such user found");
      }

      const valid = await bcrypt.compare(args.password, user.password);

      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

      const authPayload = {
        token: token,
        user: user,
      };

      return authPayload;
    },
  },
};
