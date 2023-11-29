import * as dotenv from "dotenv";
import { GQLActivity } from "./resolvers-types";
import {
  getZone,
  getWeek,
  calculateRunningPace,
} from "./utils/formatActivityData.js";

interface StravaActivity {
  id: number;
  average_cadence: number;
  average_heartrate: number;
  distance: number;
  elapsed_time: number;
  start_date: string;
  map: {
    summary_polyline: string;
  };
  userId: number;
  week: number;
  zone: number;
  type: string;
}

interface AccessTokenResponse {
  access_token: string;
}

interface RefreshTokenResponse {
  refresh_token: string;
}

export class StravaAPI {
  public async getRefreshToken(authCode: String) {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const url = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${authCode}&grant_type=authorization_code`;

    //get refresh token with the access token
    const refreshRequest = await fetch(url, { method: "POST" });
    const refreshResponse =
      (await refreshRequest.json()) as RefreshTokenResponse;

    return refreshResponse.refresh_token;
  }

  public async getListActivities(refreshToken: string) {
    dotenv.config();
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    const callActivities = `https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=`;
    try {
      //fetch access token by using refresh token
      const accessRequest = await fetch(callRefresh, { method: "POST" });
      const accessResponse =
        (await accessRequest.json()) as AccessTokenResponse;
      //use access token to fetch activities
      const activitiesRequest = await fetch(
        callActivities + accessResponse.access_token
      );
      const activitiesResponse =
        (await activitiesRequest.json()) as StravaActivity[];

      //Cut off superflous datafields and add some new ones

      const activities = activitiesResponse
        .filter((activity) => activity.type === "Run")
        .map((activity) => {
          let temp: Omit<GQLActivity, "id"> = {
            activityId: activity.id,
            average_cadence: Math.floor(activity.average_cadence * 2),
            average_heartrate: Math.floor(activity.average_heartrate),
            distance: activity.distance,
            elapsed_time: activity.elapsed_time,
            start_date: activity.start_date,
            summary_polyline: activity.map.summary_polyline,
            average_pace: calculateRunningPace(
              activity.elapsed_time,
              activity.distance
            ),
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
