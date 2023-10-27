import * as dotenv from "dotenv";
import { GQLActivity } from "./resolvers-types";
import { getZone, getWeek } from "./functions.js";

export class StravaAPI {
  public async getListActivities(): Promise<GQLActivity[]> {
    dotenv.config();
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    //refresh token and call address
    const refreshToken = process.env.REACT_APP_REFRESH_TOKEN;
    const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

    try {
      const data = await fetch(callRefresh, { method: "POST" });
      const json = await data.json();
      const data1 = await fetch(callActivities + json["access_token"]);
      const json1 = (await data1.json()) as GQLActivity[];
      json1.map((activity) => {
        activity.zone = getZone(activity.average_heartrate);
        activity.week = getWeek(activity.start_date);
      });
      return json1;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
