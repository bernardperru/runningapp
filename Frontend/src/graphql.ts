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

export type GQLActivity = {
  __typename?: 'Activity';
  average_cadence: Scalars['Float']['output'];
  average_heartrate: Scalars['Float']['output'];
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  map: GQLMap;
  start_date: Scalars['String']['output'];
};

export type GQLBook = {
  __typename?: 'Book';
  name: Scalars['String']['output'];
};

export type GQLMap = {
  __typename?: 'Map';
  summary_polyline: Scalars['String']['output'];
};

export type GQLQuery = {
  __typename?: 'Query';
  getActivity: Array<GQLActivity>;
  getBooks?: Maybe<Array<GQLBook>>;
};

export type GQLGetActivityQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLGetActivityQuery = { __typename?: 'Query', getActivity: Array<{ __typename?: 'Activity', start_date: string, id: number, average_heartrate: number, average_cadence: number, distance: number, elapsed_time: number, map: { __typename?: 'Map', summary_polyline: string } }> };

export type GQLExampleQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLExampleQueryQuery = { __typename?: 'Query', getBooks?: Array<{ __typename?: 'Book', name: string }> | null };


export const GetActivityDocument = gql`
    query GetActivity {
  getActivity {
    start_date
    id
    average_heartrate
    average_cadence
    distance
    elapsed_time
    map {
      summary_polyline
    }
  }
}
    `;

/**
 * __useGetActivityQuery__
 *
 * To run a query within a React component, call `useGetActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivityQuery(baseOptions?: Apollo.QueryHookOptions<GQLGetActivityQuery, GQLGetActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLGetActivityQuery, GQLGetActivityQueryVariables>(GetActivityDocument, options);
      }
export function useGetActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLGetActivityQuery, GQLGetActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLGetActivityQuery, GQLGetActivityQueryVariables>(GetActivityDocument, options);
        }
export type GetActivityQueryHookResult = ReturnType<typeof useGetActivityQuery>;
export type GetActivityLazyQueryHookResult = ReturnType<typeof useGetActivityLazyQuery>;
export type GetActivityQueryResult = Apollo.QueryResult<GQLGetActivityQuery, GQLGetActivityQueryVariables>;
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
export function useExampleQueryQuery(baseOptions?: Apollo.QueryHookOptions<GQLExampleQueryQuery, GQLExampleQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLExampleQueryQuery, GQLExampleQueryQueryVariables>(ExampleQueryDocument, options);
      }
export function useExampleQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLExampleQueryQuery, GQLExampleQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLExampleQueryQuery, GQLExampleQueryQueryVariables>(ExampleQueryDocument, options);
        }
export type ExampleQueryQueryHookResult = ReturnType<typeof useExampleQueryQuery>;
export type ExampleQueryLazyQueryHookResult = ReturnType<typeof useExampleQueryLazyQuery>;
export type ExampleQueryQueryResult = Apollo.QueryResult<GQLExampleQueryQuery, GQLExampleQueryQueryVariables>;