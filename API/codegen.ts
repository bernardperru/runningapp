import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/schema/*.graphql",
  generates: {
    "src/resolvers-types.ts": {
      config: {
        useIndexSignature: true,
        typesPrefix: "GQL",
        contextType: "./context#MyContext",
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
