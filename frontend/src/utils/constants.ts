import { GQLActivity } from '../graphql';

export const AUTH_TOKEN = 'auth-token';

export type activityType = Omit<GQLActivity, '__typename' | 'summary_polyline' | 'activityId' | 'id'>;
export type activityCardType = Omit<
	GQLActivity,
	'__typename' | 'summary_polyline' | 'id' | 'start_date' | 'activityId'
>;
