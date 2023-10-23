import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL Strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Map {
    id: String,
    summary_polyline: String,
    resource_state: Float
  }

 type Activity {
    resource_state: Float
    name: String
    distance: Float
    moving_time: Float
    elapsed_time: Float
    total_elevation_gain: Float
    type: String
    sport_type: String
    workout_type: String
    id: Float
    start_date: String
    start_date_local: String
    timezone: String
    utc_offset: Float
    location_city: String
    location_state: String
    location_country: String
    achievement_count: Float
    kudos_count: Float
    comment_count: Float
    athlete_count: Float
    photo_count: Float
    map: Map
    trainer: Boolean
    commute: Boolean
    manual: Boolean
    private: Boolean
    visibility: String
    flagged: Boolean
    gear_id: String  
    average_speed: Float
    max_speed: Float
    average_cadence: Float
    has_heartrate: Boolean
    average_heartrate: Float
    max_heartrate: Float
    heartrate_opt_out: Boolean
    display_hide_heartrate_option: Boolean
    elev_high: Float
    elev_low: Float
    upload_id: Float
    upload_id_str: String
    external_id: String
    from_accepted_tag: Boolean
    pr_count: Float
    total_photo_count: Float
    has_kudoed: Boolean
}
  

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
