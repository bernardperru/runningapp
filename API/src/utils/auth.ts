import jwt from "jsonwebtoken";
import { database } from "../database.js";
import * as dotenv from "dotenv";
import { User } from "@prisma/client";

dotenv.config();

export async function decodeAuthHeader(authHeader: string | undefined) {
  if (!authHeader) {
    return null;
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const lmao = jwt.verify(token, process.env.APP_SECRET || "") as
      | {
          userId: number;
        }
      | undefined;
    if (lmao) {
      const user = await database.user.findUnique({
        where: {
          id: lmao.userId,
        },
      });
      return user;
    }
  } catch {
    return null;
  }
  return null;
}
