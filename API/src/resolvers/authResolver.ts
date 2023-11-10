import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GQLAuthPayload, GQLResolvers } from "../resolvers-types";
import { database } from "../database.js";
import * as dotenv from "dotenv";

dotenv.config();

export const authResolver: GQLResolvers = {
  Mutation: {
    signup: async (_, { email, name, password }) => {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await database.user.create({
        data: {
          email: email,
          name: name,
          password: encryptedPassword,
          refresh_token: "",
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET || "");

      return {
        token: token,
        hasRefreshToken: false,
      };
    },
    login: async (_, { email, password }) => {
      const user = await database.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new Error("No such user found");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET || "");

      return {
        token: token,
        hasRefreshToken: user.refresh_token ? true : false,
      };
    },
    addRefreshToken: async (_, { accessToken }, context) => {
      if (!context.auth) {
        throw new Error("No user found in context");
      }

      const refreshToken = await context.auth.stravaAPI.getRefreshToken(
        accessToken
      );

      const user = await database.user.update({
        where: { email: context.auth?.user.email },
        data: {
          refresh_token: refreshToken,
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET || "");

      return {
        token: token,
        hasRefreshToken: user.refresh_token ? true : false,
      };
    },
  },
};
