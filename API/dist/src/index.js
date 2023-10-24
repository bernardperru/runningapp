import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers.js";
import typeDefs from "./typeDefs.js";
async function main() {
    const schema = makeExecutableSchema({
        typeDefs: typeDefs,
        resolvers: resolvers,
    });
    const server = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
