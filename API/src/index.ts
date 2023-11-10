import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import { decodeAuthHeader } from "./utils/auth.js";
import { MyContext } from "./context.js";
import { StravaAPI } from "./StravaAPI.js";

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const server = new ApolloServer<MyContext>({ schema, introspection: true });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }): Promise<MyContext> => {
    const temp = await decodeAuthHeader(req.headers.authorization);
    if (temp !== null) {
      return {
        auth: temp?.refresh_token
          ? { stravaAPI: new StravaAPI(temp.refresh_token), user: temp }
          : { stravaAPI: null, user: temp },
      };
    }
    return { auth: null };
  },
});

// const server = new ApolloServer({ schema });

// const { url } = await startStandaloneServer(server);

console.log(`🚀  Server ready at: ${url}`);
