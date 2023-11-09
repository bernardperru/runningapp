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
          refresh_token: "xxx",
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET || "");

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
        user: {
          email: user.email,
          id: user.id,
          name: user.name,
          password: user.password,
          refreshToken: user.refresh_token,
        },
      };
    },
  },
};
