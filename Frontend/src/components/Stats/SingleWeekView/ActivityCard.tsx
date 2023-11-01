import React from 'react';
import { format } from '../../../functions';
import { GQLActivity, useGetActivitiesQuery } from '../../../graphql';

const labels: { [key in keyof Omit<GQLActivity, '__typename' | 'summary_polyline' | 'id'>]: string } = {
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	distance: 'Distance',
	elapsed_time: 'Time',
	start_date: 'Date',
	week: 'Week',
	zone: 'Zone',
};

const ActivityCard: React.FunctionComponent<{ activityId: number }> = ({ activityId }) => {
	const { data, loading, error } = useGetActivitiesQuery({ variables: {} });

	if (data !== undefined) {
		const keys = (
			Object.keys(data.getActivities[0]) as (keyof Omit<GQLActivity, '__typename' | 'summary_polyline' | 'id'>)[]
		).filter(key => {
			return labels[key];
		});

		const activity = data.getActivities.filter(a => {
			return a.id === activityId;
		})[0];

		return (
			<ul className="bg-white shadow-sm rounded-md w-1/4 mt-12 mb-5 mx-5 p-5 text-center hover:bg-blue-400 float-left">
				{keys.map((key, index) => (
					<li key={index}>
						{labels[key]} : {format(key, activity[key])}
					</li>
				))}
			</ul>
		);
	}
};

export default ActivityCard;
