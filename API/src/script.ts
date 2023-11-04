import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = (await prisma.user.create({
    data: {
      id: 1,
      email: "yann0052@gmail.com",
      password: "atj73nwe",
      refresh_token: "jkjkjkjkjjk",
    },
  })) satisfies Prisma.UserCreateInput;

  const activity = await prisma.activity.create({
    data: {
      average_cadence: 178,
      average_heartrate: 160,
      distance: 6300,
      elapsed_time: 1000,
      start_date: "xd i dag",
      stravaId: 1234565,
      summary_polyline: "lule",
      week: 44,
      zone: 4,
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
