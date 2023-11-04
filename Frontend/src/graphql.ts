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
  athlete: GQLUser;
  average_cadence: Scalars['Float']['output'];
  average_heartrate: Scalars['Float']['output'];
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  start_date: Scalars['String']['output'];
  summary_polyline: Scalars['String']['output'];
  week: Scalars['Int']['output'];
  zone: Scalars['Int']['output'];
};

export type GQLQuery = {
  __typename: 'Query';
  getActivities: Array<GQLActivity>;
};

export type GQLUser = {
  __typename: 'User';
  activities?: Maybe<Array<GQLActivity>>;
  name: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type GQLGetActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLGetActivitiesQuery = { __typename: 'Query', getActivities: Array<{ __typename: 'Activity', id: number, distance: number, elapsed_time: number, start_date: string, summary_polyline: string, average_cadence: number, average_heartrate: number, week: number, zone: number }> };


export const GetActivitiesDocument = gql`
    query getActivities {
  getActivities {
    id
    distance
    elapsed_time
    start_date
    summary_polyline
    average_cadence
    average_heartrate
    week
    zone
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