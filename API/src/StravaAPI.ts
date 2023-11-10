import * as dotenv from "dotenv";
import { GQLActivity, GQLUser } from "./resolvers-types";
import { getZone, getWeek } from "./utils/functions.js";

interface StravaActivity {
  average_cadence: number;
  average_heartrate: number;
  distance: number;
  elapsed_time: number;
  athlete: { id: number };
  start_date: string;
  map: {
    summary_polyline: string;
  };
  userId: number;
  week: number;
  zone: number;
}

interface JsonBob {
  access_token: string;
}

interface refreshResponse {
  refresh_token: string;
}

export class StravaAPI {
  public async getRefreshToken(authCode: String) {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    const url = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${authCode}&grant_type=authorization_code`;

    //get refresh token with the access token thingy
    const req = await fetch(url, { method: "GET" });
    const code = (await req.json()) as refreshResponse;
    return code.refresh_token;
  }

  public async getListActivities(refreshToken: string) {
    dotenv.config();
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    //refresh token and call address
    // const refreshToken = process.env.REACT_APP_REFRESH_TOKEN;
    const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

    try {
      const data = await fetch(callRefresh, { method: "POST" });
      const json = (await data.json()) as JsonBob;
      const data1 = await fetch(callActivities + json.access_token);
      const json1 = (await data1.json()) as StravaActivity[];
      const activities = json1.map((activity) => {
        let temp: Omit<GQLActivity, "id"> = {
          average_cadence: Math.floor(activity.average_cadence * 2),
          average_heartrate: Math.floor(activity.average_heartrate),
          distance: activity.distance,
          elapsed_time: activity.elapsed_time,
          userId: activity.athlete.id,
          start_date: activity.start_date,
          summary_polyline: activity.map.summary_polyline,
          week: getWeek(activity.start_date),
          zone: Math.floor(getZone(activity.average_heartrate)),
        };
        return temp;
      });
      return activities;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
