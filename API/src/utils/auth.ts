import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

export function decodeAuthHeader(authHeader: string) {
  const token = authHeader.replace("Authorization ", "");

  if (!token) {
    throw new Error("No token found");
  }

  return jwt.verify(token, process.env.APP_SECRET) as string;
}
