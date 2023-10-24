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

export type Activity = {
  __typename?: 'Activity';
  achievement_count?: Maybe<Scalars['Float']['output']>;
  athlete?: Maybe<Athlete>;
  athlete_count?: Maybe<Scalars['Float']['output']>;
  average_cadence?: Maybe<Scalars['Float']['output']>;
  average_heartrate?: Maybe<Scalars['Float']['output']>;
  average_speed?: Maybe<Scalars['Float']['output']>;
  comment_count?: Maybe<Scalars['Float']['output']>;
  commute?: Maybe<Scalars['Boolean']['output']>;
  display_hide_heartrate_option?: Maybe<Scalars['Boolean']['output']>;
  distance?: Maybe<Scalars['Float']['output']>;
  elapsed_time?: Maybe<Scalars['Float']['output']>;
  elev_high?: Maybe<Scalars['Float']['output']>;
  elev_low?: Maybe<Scalars['Float']['output']>;
  end_latlng?: Maybe<Array<Scalars['Float']['output']>>;
  external_id?: Maybe<Scalars['String']['output']>;
  flagged?: Maybe<Scalars['Boolean']['output']>;
  from_accepted_tag?: Maybe<Scalars['Boolean']['output']>;
  gear_id?: Maybe<Scalars['String']['output']>;
  has_heartrate?: Maybe<Scalars['Boolean']['output']>;
  has_kudoed?: Maybe<Scalars['Boolean']['output']>;
  heartrate_opt_out?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  kudos_count?: Maybe<Scalars['Float']['output']>;
  location_city?: Maybe<Scalars['String']['output']>;
  location_country?: Maybe<Scalars['String']['output']>;
  location_state?: Maybe<Scalars['String']['output']>;
  manual?: Maybe<Scalars['Boolean']['output']>;
  map?: Maybe<Map>;
  max_heartrate?: Maybe<Scalars['Float']['output']>;
  max_speed?: Maybe<Scalars['Float']['output']>;
  moving_time?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  photo_count?: Maybe<Scalars['Float']['output']>;
  pr_count?: Maybe<Scalars['Float']['output']>;
  private?: Maybe<Scalars['Boolean']['output']>;
  resource_state?: Maybe<Scalars['Float']['output']>;
  sport_type?: Maybe<Scalars['String']['output']>;
  start_date?: Maybe<Scalars['String']['output']>;
  start_date_local?: Maybe<Scalars['String']['output']>;
  start_latlng?: Maybe<Array<Scalars['Float']['output']>>;
  timezone?: Maybe<Scalars['String']['output']>;
  total_elevation_gain?: Maybe<Scalars['Float']['output']>;
  total_photo_count?: Maybe<Scalars['Float']['output']>;
  trainer?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  upload_id?: Maybe<Scalars['Float']['output']>;
  upload_id_str?: Maybe<Scalars['String']['output']>;
  utc_offset?: Maybe<Scalars['Float']['output']>;
  visibility?: Maybe<Scalars['String']['output']>;
  workout_type?: Maybe<Scalars['String']['output']>;
};

export type Athlete = {
  __typename?: 'Athlete';
  id?: Maybe<Scalars['Float']['output']>;
  resource_state?: Maybe<Scalars['Float']['output']>;
};

export type Book = {
  __typename?: 'Book';
  name: Scalars['String']['output'];
};

export type Coords = {
  __typename?: 'Coords';
  lat?: Maybe<Scalars['Float']['output']>;
  long?: Maybe<Scalars['Float']['output']>;
};

export type Map = {
  __typename?: 'Map';
  id?: Maybe<Scalars['String']['output']>;
  resource_state?: Maybe<Scalars['Float']['output']>;
  summary_polyline?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getActivity: Activity;
  getBooks?: Maybe<Array<Book>>;
};

export type GetActivityQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActivityQuery = { __typename?: 'Query', getActivity: { __typename?: 'Activity', start_date?: string | null, id?: number | null, average_heartrate?: number | null, average_cadence?: number | null, distance?: number | null, elapsed_time?: number | null } };

export type ExampleQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ExampleQueryQuery = { __typename?: 'Query', getBooks?: Array<{ __typename?: 'Book', name: string }> | null };


export const GetActivityDocument = gql`
    query GetActivity {
  getActivity {
    start_date
    id
    average_heartrate
    average_cadence
    distance
    elapsed_time
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
export function useGetActivityQuery(baseOptions?: Apollo.QueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, options);
      }
export function useGetActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, options);
        }
export type GetActivityQueryHookResult = ReturnType<typeof useGetActivityQuery>;
export type GetActivityLazyQueryHookResult = ReturnType<typeof useGetActivityLazyQuery>;
export type GetActivityQueryResult = Apollo.QueryResult<GetActivityQuery, GetActivityQueryVariables>;
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