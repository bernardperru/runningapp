import * as resolversRaw from "./resolvers/index.js";
import { merge } from "lodash-es";
const allResolvers = Object.values(resolversRaw);
export const resolvers = allResolvers.reduce((curr, resolver) => {
    return merge(resolver, curr);
}, {});
