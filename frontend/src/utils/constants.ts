import { GQLActivity, GQLWeek } from '../graphql';

export const AUTH_TOKEN = 'auth-token';

export type activityType = Omit<GQLActivity, '__typename' | 'summary_polyline' | 'activityId' | 'id' | 'year' | 'week'>;
export type activityCardType = Omit<
	GQLActivity,
	'__typename' | 'summary_polyline' | 'id' | 'start_date' | 'activityId' | 'year' | 'week'
>;

export type weekCardType = Omit<GQLWeek, 'id' | '__typename' | 'activities' | 'week' | 'year' | 'activityCount'>;
