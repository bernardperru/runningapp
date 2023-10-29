import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getActivities() {
  const activities = prisma.activity.findMany();

  return activities;
}
