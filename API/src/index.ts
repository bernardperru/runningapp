import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers.js";
import typeDefs from "./typeDefs.js";
import { PrismaClient, Prisma } from "@prisma/client";
import { decodeAuthHeader } from "./utils/auth.js";
const prisma = new PrismaClient();

interface MyContext {
  prisma: PrismaClient;
  user: string;
}

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers as any,
});

const server = new ApolloServer<MyContext>({ schema });

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";

    // try to retrieve a user with the token
    const user = decodeAuthHeader(token);

    if (!user) {
      throw new Error("User is not authenticated");
    }

    // add the user to the context
    return { prisma, user };
  },
});

// const server = new ApolloServer({schema});

// const {url} = await startStandaloneServer(server)

console.log(`🚀  Server ready at: ${url}`);
