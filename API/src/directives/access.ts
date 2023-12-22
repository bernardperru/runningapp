import { buildDirective } from "./utils.js";

export const accessDirective = buildDirective(
  "access",
  (next, _, __, context) => {
    if (!context.auth) {
      throw new Error("Not logged in!");
    }

    return next();
  }
);
