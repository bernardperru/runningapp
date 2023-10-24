const books = [
    {
        name: "yohoo",
    },
    {
        name: "City of Glass",
    },
];
export const bookResolver = {
    Query: {
        getBooks: () => books,
    },
};
