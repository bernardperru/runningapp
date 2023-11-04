import { GQLResolvers } from "../resolvers-types";
import { StravaAPI } from "../StravaAPI.js";

const api = new StravaAPI();

export const userResolver: GQLResolvers = {
  Query: {
    //     postUser: () => {
    //       const refresh_token = api.getRefreshToken();
    //       return "you did it";
    //     },
  },
};
