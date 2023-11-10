import { User } from "@prisma/client";
import { StravaAPI } from "./StravaAPI";

export interface MyContext {
  auth: { stravaAPI: StravaAPI | null; user: User } | null;
}
