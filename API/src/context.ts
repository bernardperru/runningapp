import { User } from "@prisma/client";
import { StravaAPI } from "./StravaAPI";

export interface MyContext {
  auth: { stravaAPI: StravaAPI; user: User } | null;
}
