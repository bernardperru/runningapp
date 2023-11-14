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
  activityId: Scalars['Float']['output'];
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

export type GQLAuthPayload = {
  __typename: 'AuthPayload';
  hasRefreshToken: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  user: GQLUser;
};

export type GQLMutation = {
  __typename: 'Mutation';
  addRefreshToken?: Maybe<GQLAuthPayload>;
  login?: Maybe<GQLAuthPayload>;
  signup?: Maybe<GQLAuthPayload>;
};


export type GQLMutationAddRefreshTokenArgs = {
  accessToken: Scalars['String']['input'];
};


export type GQLMutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type GQLMutationSignupArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GQLQuery = {
  __typename: 'Query';
  getActivities: Array<GQLActivity>;
  getUserInfo: GQLUser;
};

export type GQLUser = {
  __typename: 'User';
  activities?: Maybe<Array<Maybe<GQLActivity>>>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type GQLGetActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLGetActivitiesQuery = { __typename: 'Query', getActivities: Array<{ __typename: 'Activity', id: number, activityId: number, zone: number, week: number, average_heartrate: number, average_cadence: number, summary_polyline: string, distance: number, elapsed_time: number, start_date: string }> };

export type GQLAddRefreshTokenMutationVariables = Exact<{
  accessToken: Scalars['String']['input'];
}>;


export type GQLAddRefreshTokenMutation = { __typename: 'Mutation', addRefreshToken?: { __typename: 'AuthPayload', token: string, hasRefreshToken: boolean } | null };

export type GQLLoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type GQLLoginMutation = { __typename: 'Mutation', login?: { __typename: 'AuthPayload', token: string, hasRefreshToken: boolean, user: { __typename: 'User', name: string, email: string } } | null };

export type GQLSignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type GQLSignupMutation = { __typename: 'Mutation', signup?: { __typename: 'AuthPayload', token: string, hasRefreshToken: boolean, user: { __typename: 'User', name: string, email: string } } | null };


export const GetActivitiesDocument = gql`
    query GetActivities {
  getActivities {
    id
    activityId
    zone
    week
    average_heartrate
    average_cadence
    summary_polyline
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
export const AddRefreshTokenDocument = gql`
    mutation AddRefreshToken($accessToken: String!) {
  addRefreshToken(accessToken: $accessToken) {
    token
    hasRefreshToken
  }
}
    `;
export type GQLAddRefreshTokenMutationFn = Apollo.MutationFunction<GQLAddRefreshTokenMutation, GQLAddRefreshTokenMutationVariables>;

/**
 * __useAddRefreshTokenMutation__
 *
 * To run a mutation, you first call `useAddRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRefreshTokenMutation, { data, loading, error }] = useAddRefreshTokenMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useAddRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<GQLAddRefreshTokenMutation, GQLAddRefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQLAddRefreshTokenMutation, GQLAddRefreshTokenMutationVariables>(AddRefreshTokenDocument, options);
      }
export type AddRefreshTokenMutationHookResult = ReturnType<typeof useAddRefreshTokenMutation>;
export type AddRefreshTokenMutationResult = Apollo.MutationResult<GQLAddRefreshTokenMutation>;
export type AddRefreshTokenMutationOptions = Apollo.BaseMutationOptions<GQLAddRefreshTokenMutation, GQLAddRefreshTokenMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      name
      email
    }
    token
    hasRefreshToken
  }
}
    `;
export type GQLLoginMutationFn = Apollo.MutationFunction<GQLLoginMutation, GQLLoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<GQLLoginMutation, GQLLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQLLoginMutation, GQLLoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<GQLLoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<GQLLoginMutation, GQLLoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    user {
      name
      email
    }
    token
    hasRefreshToken
  }
}
    `;
export type GQLSignupMutationFn = Apollo.MutationFunction<GQLSignupMutation, GQLSignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<GQLSignupMutation, GQLSignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQLSignupMutation, GQLSignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<GQLSignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<GQLSignupMutation, GQLSignupMutationVariables>;