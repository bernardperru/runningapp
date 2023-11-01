import React from 'react';
import { average, format } from '../../../functions';
import { GQLActivity, useGetActivitiesQuery } from '../../../graphql';

type label = {
	label: string;
	type: 'avg' | 'sum' | 'none';
};

const stats: { [key in keyof Omit<GQLActivity, '__typename' | 'summary_polyline' | 'id'>]: label } = {
	distance: { label: 'Distance', type: 'sum' },
	elapsed_time: { label: 'Time', type: 'sum' },
	average_heartrate: { label: 'Average Heartrate', type: 'avg' },
	average_cadence: { label: 'Average Cadence', type: 'avg' },
	start_date: { label: 'Date', type: 'none' },
	week: { label: 'Week', type: 'none' },
	zone: { label: 'Zone', type: 'none' },
};

const WeekCard: React.FunctionComponent<{ weekNumber: number }> = ({ weekNumber }) => {
	const { data, loading, error } = useGetActivitiesQuery({ variables: {} });

	if (data !== undefined) {
		const keys = (
			Object.keys(data.getActivities[0]) as (keyof Omit<GQLActivity, '__typename' | 'summary_polyline' | 'id'>)[]
		).filter(key => {
			return stats[key];
		});

		return (
			<div className="bg-white shadow-sm rounded-md w-1/4 mt-12 mb-5 mx-5 p-5 text-center hover:bg-blue-400 float-left">
				<h1>{weekNumber}</h1>
				<ul>
					{keys.map(
						(key, index) =>
							stats[key].type !== 'none' && (
								<li key={index}>
									<span>
										{stats[key].label}
										{' : '}
										<span>{format(key, average(key, weekNumber, data.getActivities, stats[key].type))}</span>
										<span></span>
									</span>
								</li>
							)
					)}
				</ul>
			</div>
		);
	}
};

export default WeekCard;
