import { GraphQLSchema } from "graphql";
import { defaultFieldResolver } from "graphql";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { MyContext } from "../context";
import { GQLDirectiveResolvers } from "../resolvers-types";

export function buildDirective<
  DirectiveName extends keyof GQLDirectiveResolvers
>(
  directiveName: DirectiveName,
  customResolver: NonNullable<GQLDirectiveResolvers<MyContext>[DirectiveName]>
) {
  return (schema: GraphQLSchema) =>
    mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig: any) => {
        // Check whether this field has the specified directive
        const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

        if (directive) {
          // Get this field's original resolver
          const { resolve = defaultFieldResolver } = fieldConfig;

          // Replace the original resolver with a function that first calls
          // the original resolver, then converts its result to upper case
          return {
            ...fieldConfig,
            resolve: async function (source, args, context, info) {
              return customResolver(
                () => resolve(source, args, context, info),
                source,
                { ...directive, ...args },
                context,
                info
              );
            },
          };
        }
      },
    });
}
