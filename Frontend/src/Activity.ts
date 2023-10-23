export interface StravaActivity {
	id: number;
	start_date: string;
	average_heartrate: number;
	average_cadence: number;
	distance: number;
	elapsed_time: number;
	map: {
		summary_polyline: string;
	};
}

export type Activity = StravaActivity & {
	week: number;
	zone: number;
};
