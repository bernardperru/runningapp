import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Book = {
  __typename?: 'Book';
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getBooks?: Maybe<Array<Book>>;
};

export type ExampleQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ExampleQueryQuery = { __typename?: 'Query', getBooks?: Array<{ __typename?: 'Book', name: string }> | null };


export const ExampleQueryDocument = gql`
    query ExampleQuery {
  getBooks {
    name
  }
}
    `;

/**
 * __useExampleQueryQuery__
 *
 * To run a query within a React component, call `useExampleQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useExampleQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExampleQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useExampleQueryQuery(baseOptions?: Apollo.QueryHookOptions<ExampleQueryQuery, ExampleQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExampleQueryQuery, ExampleQueryQueryVariables>(ExampleQueryDocument, options);
      }
export function useExampleQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExampleQueryQuery, ExampleQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExampleQueryQuery, ExampleQueryQueryVariables>(ExampleQueryDocument, options);
        }
export type ExampleQueryQueryHookResult = ReturnType<typeof useExampleQueryQuery>;
export type ExampleQueryLazyQueryHookResult = ReturnType<typeof useExampleQueryLazyQuery>;
export type ExampleQueryQueryResult = Apollo.QueryResult<ExampleQueryQuery, ExampleQueryQueryVariables>;