import { GQLResolvers, GQLBook } from "../resolvers-types";

const books: GQLBook[] = [
  {
    name: "yohoo",
  },
  {
    name: "City of Glass",
  },
];

export const bookResolver: GQLResolvers = {
  Query: {
    getBooks: () => books,
  },
};
