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
  __typename: 'Activity';
  average_cadence: Scalars['Float']['output'];
  average_heartrate: Scalars['Float']['output'];
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  start_date: Scalars['String']['output'];
  summary_polyline: Scalars['String']['output'];
  userId: Scalars['Float']['output'];
  week: Scalars['Int']['output'];
  zone: Scalars['Int']['output'];
};

export type GQLQuery = {
  __typename: 'Query';
  getActivities: Array<GQLActivity>;
  getUser: GQLUser;
  postUser: Scalars['String']['output'];
};


export type GQLQueryPostUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  refreshToken: Scalars['String']['input'];
};

export type GQLUser = {
  __typename: 'User';
  activities?: Maybe<Array<GQLActivity>>;
  email: Scalars['String']['output'];
  password: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type GQLGetActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLGetActivitiesQuery = { __typename: 'Query', getActivities: Array<{ __typename: 'Activity', zone: number, week: number, average_heartrate: number, average_cadence: number, summary_polyline: string, id: number, userId: number, distance: number, elapsed_time: number, start_date: string }> };

export type GQLQueryQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  refreshToken: Scalars['String']['input'];
}>;


export type GQLQueryQuery = { __typename: 'Query', postUser: string };


export const GetActivitiesDocument = gql`
    query GetActivities {
  getActivities {
    zone
    week
    average_heartrate
    average_cadence
    summary_polyline
    id
    userId
    distance
    elapsed_time
    start_date
  }
}
    `;

/**
 * __useGetActivitiesQuery__
 *
 * To run a query within a React component, call `useGetActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GQLGetActivitiesQuery, GQLGetActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLGetActivitiesQuery, GQLGetActivitiesQueryVariables>(GetActivitiesDocument, options);
      }
export function useGetActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLGetActivitiesQuery, GQLGetActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLGetActivitiesQuery, GQLGetActivitiesQueryVariables>(GetActivitiesDocument, options);
        }
export type GetActivitiesQueryHookResult = ReturnType<typeof useGetActivitiesQuery>;
export type GetActivitiesLazyQueryHookResult = ReturnType<typeof useGetActivitiesLazyQuery>;
export type GetActivitiesQueryResult = Apollo.QueryResult<GQLGetActivitiesQuery, GQLGetActivitiesQueryVariables>;
export const QueryDocument = gql`
    query Query($email: String!, $password: String!, $refreshToken: String!) {
  postUser(email: $email, password: $password, refreshToken: $refreshToken)
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useQueryQuery(baseOptions: Apollo.QueryHookOptions<GQLQueryQuery, GQLQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLQueryQuery, GQLQueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLQueryQuery, GQLQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLQueryQuery, GQLQueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QueryQueryResult = Apollo.QueryResult<GQLQueryQuery, GQLQueryQueryVariables>;