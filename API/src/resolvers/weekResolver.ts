import { GQLResolvers } from "../resolvers-types";
import { Prisma } from "@prisma/client";
import { database } from "../database.js";

interface weekDict {
  [key: number]: weekActivities;
}

interface weekActivities {
  id: number;
  week: number;
  year: number;
  distance: Array<number>;
  heartrate: Array<number>;
  cadence: Array<number>;
  time: Array<number>;
}

export const weekResolver: GQLResolvers = {
  Query: {
    getWeeks: async (_, args, context) => {
      if (!context.auth) {
        throw new Error("No strava refresh token assigned to User:)");
      }

      //need to use filter for findMany
      const activites = await database.activity.findMany();

      //create weeks here
      let weekDictionary: weekDict = {};
      activites.forEach((activity) => {
        const id = parseFloat(
          activity.year.toString() +
            activity.week.toString() +
            context.auth?.user.id.toString()
        );
        if (weekDictionary[id]) {
          weekDictionary[id].cadence.push(activity.average_cadence);
          weekDictionary[id].distance.push(activity.distance);
          weekDictionary[id].time.push(activity.elapsed_time);
          weekDictionary[id].heartrate.push(activity.average_heartrate);
        } else {
          weekDictionary[id] = {
            id: id,
            week: activity.week,
            year: activity.year,
            cadence: [activity.average_cadence],
            distance: [activity.distance],
            heartrate: [activity.average_heartrate],
            time: [activity.elapsed_time],
          };
        }
      });

      //upsert
      const weeks = Object.keys(weekDictionary).map((key) => {
        return {
          id: weekDictionary[parseFloat(key)].id,
          week: weekDictionary[parseFloat(key)].week,
          year: weekDictionary[parseFloat(key)].year,
          distance: weekDictionary[parseFloat(key)].distance.reduce(
            (sum, current) => {
              return sum + current;
            },
            0
          ),
          heartrate:
            weekDictionary[parseFloat(key)].heartrate.reduce((sum, current) => {
              return sum + current;
            }, 0) / weekDictionary[parseFloat(key)].heartrate.length,
          cadence:
            weekDictionary[parseFloat(key)].cadence.reduce((sum, current) => {
              return sum + current;
            }, 0) / weekDictionary[parseFloat(key)].cadence.length,
          time: weekDictionary[parseFloat(key)].time.reduce((sum, current) => {
            return sum + current;
          }, 0),
        };
      });

      const upsertWeeks = await Promise.all(
        weeks.map(async (week) => {
          await database.week.upsert({
            where: {
              id: week.id,
            },
            update: {
              cadence: week.cadence,
              distance: week.distance,
              heartrate: week.heartrate,
            },
            create: {
              user: {
                connect: {
                  id: context.auth ? context.auth.user.id : 0,
                },
              },
              cadence: week.cadence,
              distance: week.distance,
              heartrate: week.heartrate,
              id: week.id,
              time: week.time,
              week: week.week,
              year: week.year,
            },
          });
        })
      );

      //need a conditional
      const result = await database.week.findMany();

      return result;
    },
  },
};
