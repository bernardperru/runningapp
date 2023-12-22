import { GraphQLSchema } from "graphql";
import { accessDirective } from "./access.js";

type SchemaMapper = (schema: GraphQLSchema) => GraphQLSchema;

export function attachDirectives(schema: GraphQLSchema): GraphQLSchema {
  const directives: SchemaMapper[] = [accessDirective];

  return directives.reduce(
    (currentSchema, transformer) => transformer(currentSchema),
    schema
  );
}
