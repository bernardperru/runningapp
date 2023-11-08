import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { GQLAuthPayload, GQLResolvers } from "../resolvers-types";
import { PrismaClient, Prisma } from "@prisma/client";
import * as dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

export const authResolver: GQLResolvers = {
  Mutation: {
    signup: async (_, { email, name, password }) => {
      try {
        // const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: {
            email: email,
            name: name,
            password: password,
            refresh_token: "xxx",
          },
        });

        // const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        const token = "xd";

        const authPayload: GQLAuthPayload = {
          token: token,
          user: {
            email: user.email,
            id: user.id,
            name: user.name,
            password: user.password,
            refreshToken: user.refresh_token,
          },
        };

        return authPayload;
      } catch (e) {
        console.log(e);
      }
    },
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new Error("No such user found");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

      const authPayload: GQLAuthPayload = {
        token: token,
        user: {
          email: user.email,
          id: user.id,
          name: user.name,
          password: user.password,
          refreshToken: user.refresh_token,
        },
      };

      return authPayload;
    },
  },
};
