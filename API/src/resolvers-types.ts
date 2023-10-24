import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  achievement_count?: Maybe<Scalars['Float']['output']>;
  athlete?: Maybe<GQLAthlete>;
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
  map?: Maybe<GQLMap>;
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

export type GQLAthlete = {
  __typename?: 'Athlete';
  id?: Maybe<Scalars['Float']['output']>;
  resource_state?: Maybe<Scalars['Float']['output']>;
};

export type GQLBook = {
  __typename?: 'Book';
  name: Scalars['String']['output'];
};

export type GQLCoords = {
  __typename?: 'Coords';
  lat?: Maybe<Scalars['Float']['output']>;
  long?: Maybe<Scalars['Float']['output']>;
};

export type GQLMap = {
  __typename?: 'Map';
  id?: Maybe<Scalars['String']['output']>;
  resource_state?: Maybe<Scalars['Float']['output']>;
  summary_polyline?: Maybe<Scalars['String']['output']>;
};

export type GQLQuery = {
  __typename?: 'Query';
  getActivity: GQLActivity;
  getBooks?: Maybe<Array<GQLBook>>;
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
  Athlete: ResolverTypeWrapper<GQLAthlete>;
  Book: ResolverTypeWrapper<GQLBook>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Coords: ResolverTypeWrapper<GQLCoords>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Map: ResolverTypeWrapper<GQLMap>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = ResolversObject<{
  Activity: GQLActivity;
  Athlete: GQLAthlete;
  Book: GQLBook;
  Boolean: Scalars['Boolean']['output'];
  Coords: GQLCoords;
  Float: Scalars['Float']['output'];
  Map: GQLMap;
  Query: {};
  String: Scalars['String']['output'];
}>;

export type GQLActivityResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Activity'] = GQLResolversParentTypes['Activity']> = ResolversObject<{
  achievement_count?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  athlete?: Resolver<Maybe<GQLResolversTypes['Athlete']>, ParentType, ContextType>;
  athlete_count?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  average_cadence?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  average_heartrate?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  average_speed?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  comment_count?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  commute?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  display_hide_heartrate_option?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  distance?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  elapsed_time?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  elev_high?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  elev_low?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  end_latlng?: Resolver<Maybe<Array<GQLResolversTypes['Float']>>, ParentType, ContextType>;
  external_id?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  flagged?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  from_accepted_tag?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  gear_id?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  has_heartrate?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  has_kudoed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  heartrate_opt_out?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  kudos_count?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  location_city?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  location_country?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  location_state?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  manual?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  map?: Resolver<Maybe<GQLResolversTypes['Map']>, ParentType, ContextType>;
  max_heartrate?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  max_speed?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  moving_time?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  photo_count?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  pr_count?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  private?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  resource_state?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  sport_type?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  start_date?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  start_date_local?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  start_latlng?: Resolver<Maybe<Array<GQLResolversTypes['Float']>>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  total_elevation_gain?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  total_photo_count?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  trainer?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  type?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  upload_id?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  upload_id_str?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  utc_offset?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  visibility?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  workout_type?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLAthleteResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Athlete'] = GQLResolversParentTypes['Athlete']> = ResolversObject<{
  id?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  resource_state?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLBookResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Book'] = GQLResolversParentTypes['Book']> = ResolversObject<{
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLCoordsResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Coords'] = GQLResolversParentTypes['Coords']> = ResolversObject<{
  lat?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  long?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLMapResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Map'] = GQLResolversParentTypes['Map']> = ResolversObject<{
  id?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  resource_state?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  summary_polyline?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = ResolversObject<{
  getActivity?: Resolver<GQLResolversTypes['Activity'], ParentType, ContextType>;
  getBooks?: Resolver<Maybe<Array<GQLResolversTypes['Book']>>, ParentType, ContextType>;
}>;

export type GQLResolvers<ContextType = any> = ResolversObject<{
  Activity?: GQLActivityResolvers<ContextType>;
  Athlete?: GQLAthleteResolvers<ContextType>;
  Book?: GQLBookResolvers<ContextType>;
  Coords?: GQLCoordsResolvers<ContextType>;
  Map?: GQLMapResolvers<ContextType>;
  Query?: GQLQueryResolvers<ContextType>;
}>;

