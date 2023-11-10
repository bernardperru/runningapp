import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GQLAuthPayload, GQLResolvers } from "../resolvers-types";
import { database } from "../database.js";
import * as dotenv from "dotenv";

dotenv.config();

export const authResolver: GQLResolvers = {
  Mutation: {
    signup: async (_, { email, name, password }, context) => {
      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await database.user.create({
        data: {
          email: email,
          name: name,
          password: encryptedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET || "");

      const authPayload: GQLAuthPayload = {
        token: token,
        hasRefreshToken: user.refresh_token ? true : false,
      };

      return authPayload;
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
    addRefreshToken: async (_, { email, refreshToken }) => {
      //update user with the refresh_token
      const user = await database.user.update({
        where: { email: email },
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
