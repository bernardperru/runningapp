import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  activityId: Scalars['Float']['output'];
  average_cadence: Scalars['Float']['output'];
  average_heartrate: Scalars['Float']['output'];
  average_pace: Scalars['String']['output'];
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  start_date: Scalars['String']['output'];
  summary_polyline: Scalars['String']['output'];
  week?: Maybe<GQLWeek>;
  zone: Scalars['Int']['output'];
};

export type GQLActivityPageInput = {
  cursor?: InputMaybe<Scalars['Float']['input']>;
  first: Scalars['Int']['input'];
};

export type GQLActivityPageResponse = {
  __typename?: 'ActivityPageResponse';
  edges: Array<GQLActivity>;
  pageInfo: GQLPageInfo;
};

export type GQLAuthPayload = {
  __typename?: 'AuthPayload';
  hasRefreshToken: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  user: GQLUser;
};

export type GQLMutation = {
  __typename?: 'Mutation';
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

export type GQLPageInfo = {
  __typename?: 'PageInfo';
  endCursors?: Maybe<Scalars['Float']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type GQLQuery = {
  __typename?: 'Query';
  getActivities: Array<GQLActivity>;
  getActivityPage: GQLActivityPageResponse;
  getDistanceSum: Scalars['Float']['output'];
  getUserInfo: GQLUser;
  getWeeks: Array<GQLWeek>;
  getYears: Array<Maybe<GQLYear>>;
};


export type GQLQueryGetActivityPageArgs = {
  input: GQLActivityPageInput;
};

export type GQLUser = {
  __typename?: 'User';
  activities?: Maybe<Array<Maybe<GQLActivity>>>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  weeks?: Maybe<Array<Maybe<GQLWeek>>>;
};

export type GQLWeek = {
  __typename?: 'Week';
  activities: Array<GQLActivity>;
  cadence: Scalars['Int']['output'];
  distance: Scalars['Float']['output'];
  heartrate: Scalars['Int']['output'];
  time: Scalars['Float']['output'];
  week: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type GQLYear = {
  __typename?: 'Year';
  distance: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = ResolversObject<{
  Activity: ResolverTypeWrapper<GQLActivity>;
  ActivityPageInput: GQLActivityPageInput;
  ActivityPageResponse: ResolverTypeWrapper<GQLActivityPageResponse>;
  AuthPayload: ResolverTypeWrapper<GQLAuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<GQLPageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<GQLUser>;
  Week: ResolverTypeWrapper<GQLWeek>;
  Year: ResolverTypeWrapper<GQLYear>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = ResolversObject<{
  Activity: GQLActivity;
  ActivityPageInput: GQLActivityPageInput;
  ActivityPageResponse: GQLActivityPageResponse;
  AuthPayload: GQLAuthPayload;
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PageInfo: GQLPageInfo;
  Query: {};
  String: Scalars['String']['output'];
  User: GQLUser;
  Week: GQLWeek;
  Year: GQLYear;
}>;

export type GQLHasRoleDirectiveArgs = {
  role?: Maybe<Scalars['String']['input']>;
};

export type GQLHasRoleDirectiveResolver<Result, Parent, ContextType = MyContext, Args = GQLHasRoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type GQLActivityResolvers<ContextType = MyContext, ParentType extends GQLResolversParentTypes['Activity'] = GQLResolversParentTypes['Activity']> = ResolversObject<{
  activityId?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  average_cadence?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  average_heartrate?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  average_pace?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  distance?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  elapsed_time?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  start_date?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  summary_polyline?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  week?: Resolver<Maybe<GQLResolversTypes['Week']>, ParentType, ContextType>;
  zone?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLActivityPageResponseResolvers<ContextType = MyContext, ParentType extends GQLResolversParentTypes['ActivityPageResponse'] = GQLResolversParentTypes['ActivityPageResponse']> = ResolversObject<{
  edges?: Resolver<Array<GQLResolversTypes['Activity']>, ParentType, ContextType>;
  pageInfo?: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLAuthPayloadResolvers<ContextType = MyContext, ParentType extends GQLResolversParentTypes['AuthPayload'] = GQLResolversParentTypes['AuthPayload']> = ResolversObject<{
  hasRefreshToken?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<GQLResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLMutationResolvers<ContextType = MyContext, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = ResolversObject<{
  addRefreshToken?: Resolver<Maybe<GQLResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<GQLMutationAddRefreshTokenArgs, 'accessToken'>>;
  login?: Resolver<Maybe<GQLResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<GQLMutationLoginArgs, 'email' | 'password'>>;
  signup?: Resolver<Maybe<GQLResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<GQLMutationSignupArgs, 'email' | 'name' | 'password'>>;
}>;

export type GQLPageInfoResolvers<ContextType = MyContext, ParentType extends GQLResolversParentTypes['PageInfo'] = GQLResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursors?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  hasNextPage?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLQueryResolvers<ContextType = MyContext, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = ResolversObject<{
  getActivities?: Resolver<Array<GQLResolversTypes['Activity']>, ParentType, ContextType>;
  getActivityPage?: Resolver<GQLResolversTypes['ActivityPageResponse'], ParentType, ContextType, RequireFields<GQLQueryGetActivityPageArgs, 'input'>>;
  getDistanceSum?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  getUserInfo?: Resolver<GQLResolversTypes['User'], ParentType, ContextType>;
  getWeeks?: Resolver<Array<GQLResolversTypes['Week']>, ParentType, ContextType>;
  getYears?: Resolver<Array<Maybe<GQLResolversTypes['Year']>>, ParentType, ContextType>;
}>;

export type GQLUserResolvers<ContextType = MyContext, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = ResolversObject<{
  activities?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Activity']>>>, ParentType, ContextType>;
  email?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  weeks?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['Week']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLWeekResolvers<ContextType = MyContext, ParentType extends GQLResolversParentTypes['Week'] = GQLResolversParentTypes['Week']> = ResolversObject<{
  activities?: Resolver<Array<GQLResolversTypes['Activity']>, ParentType, ContextType>;
  cadence?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  distance?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  heartrate?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  time?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  week?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  year?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLYearResolvers<ContextType = MyContext, ParentType extends GQLResolversParentTypes['Year'] = GQLResolversParentTypes['Year']> = ResolversObject<{
  distance?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  year?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLResolvers<ContextType = MyContext> = ResolversObject<{
  Activity?: GQLActivityResolvers<ContextType>;
  ActivityPageResponse?: GQLActivityPageResponseResolvers<ContextType>;
  AuthPayload?: GQLAuthPayloadResolvers<ContextType>;
  Mutation?: GQLMutationResolvers<ContextType>;
  PageInfo?: GQLPageInfoResolvers<ContextType>;
  Query?: GQLQueryResolvers<ContextType>;
  User?: GQLUserResolvers<ContextType>;
  Week?: GQLWeekResolvers<ContextType>;
  Year?: GQLYearResolvers<ContextType>;
}>;

export type GQLDirectiveResolvers<ContextType = MyContext> = ResolversObject<{
  hasRole?: GQLHasRoleDirectiveResolver<any, any, ContextType>;
}>;
