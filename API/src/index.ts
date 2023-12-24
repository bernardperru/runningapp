import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import { decodeAuthHeader } from "./utils/auth.js";
import { MyContext } from "./context.js";
import { StravaAPI } from "./StravaAPI.js";
import { attachDirectives } from "./directives/index.js";

const schema = attachDirectives(
  makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  })
);

const server = new ApolloServer<MyContext>({ schema, introspection: true });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }): Promise<MyContext> => {
    const auth = await decodeAuthHeader(req.headers.authorization);
    if (auth !== null) {
      return {
        auth: { stravaAPI: new StravaAPI(), user: auth },
      };
    }
    return { auth: null };
  },
});

console.log(`🚀  Server ready at: ${url}`);
//christmas commit :)
