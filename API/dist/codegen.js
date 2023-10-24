const config = {
    schema: "src/schema/*.graphql",
    generates: {
        "src/resolvers-types.ts": {
            config: {
                useIndexSignature: true,
                typesPrefix: "GQL",
            },
            plugins: ["typescript", "typescript-resolvers"],
        },
    },
};
export default config;
