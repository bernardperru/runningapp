import { GQLActivity } from '../graphql';

export const AUTH_TOKEN = 'auth-token';

export type activityType = Omit<GQLActivity, '__typename' | 'summary_polyline' | 'activityId' | 'id' | 'year' | 'week'>;

//Chart types
export interface ChartFilter<T> {
	key: keyof T;
	title: string;
	lower: number;
	upper: number;
	multiplier: number;
}

export type ChartActivity = {
	__typename: 'Activity';
	id: number;
	activityId: number;
	distance: number;
	elapsed_time: number;
	start_date: string;
	summary_polyline: string;
	average_cadence: number;
	average_heartrate: number;
	average_pace: string;
	zone: number;
};

export type AxisType<T> = {
	key: keyof T;
	title: string;
	color?: string;
};

export const yAxis: AxisType<ChartActivity>[] = [
	{ key: 'distance', title: 'Distance' },
	{ key: 'average_cadence', title: 'Cadence' },
	{ key: 'average_heartrate', title: 'Heartrate' },
	{ key: 'elapsed_time', title: 'Time' },
];

export const xAxis: AxisType<ChartActivity>[] = [
	{ key: 'distance', title: 'Distance' },
	{ key: 'average_cadence', title: 'Cadence' },
	{ key: 'average_heartrate', title: 'Heartrate' },
	{ key: 'average_pace', title: 'Pace' },
	{ key: 'elapsed_time', title: 'Time' },
	{ key: 'start_date', title: 'Date' },
];

export const chartFilters: ChartFilter<ChartActivity>[] = [
	{ key: 'distance', title: 'Distance', lower: 0, upper: 42, multiplier: 1000 },
	{ key: 'average_cadence', title: 'Cadence', lower: 0, upper: 200, multiplier: 1 },
	{ key: 'average_heartrate', title: 'Heartrate', lower: 0, upper: 200, multiplier: 1 },
	{ key: 'elapsed_time', title: 'Time', lower: 0, upper: 20, multiplier: 1000 },
];
