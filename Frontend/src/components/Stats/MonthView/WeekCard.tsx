import React from 'react';
import { average, format } from '../../../funktioner';
import { GQLActivity, useGetActivityQuery } from '../../../graphql';

type label = {
	label: string;
	type: 'avg' | 'sum' | 'none';
};

const stats: { [key in keyof Omit<GQLActivity, '__typename' | 'map' | 'id'>]: label } = {
	distance: { label: 'Distance', type: 'sum' },
	elapsed_time: { label: 'Time', type: 'sum' },
	average_heartrate: { label: 'Average Heartrate', type: 'avg' },
	average_cadence: { label: 'Average Cadence', type: 'avg' },
	start_date: { label: 'Date', type: 'none' },
	week: { label: 'Week', type: 'none' },
	zone: { label: 'Zone', type: 'none' },
};

const WeekCard: React.FunctionComponent<{ weekNumber: number }> = ({ weekNumber }) => {
	const { data, loading, error } = useGetActivityQuery({ variables: {} });

	if (data !== undefined) {
		const keys = (Object.keys(data.getActivity[0]) as (keyof Omit<GQLActivity, '__typename' | 'map' | 'id'>)[]).filter(
			key => {
				return stats[key];
			}
		);

		return (
			<div className="weekcard">
				<h1>{weekNumber}</h1>
				<ul>
					{keys.map(
						(key, index) =>
							stats[key].type !== 'none' && (
								<li key={index}>
									<span>
										{stats[key].label}
										{' : '}
										<span>{format(key, average(key, weekNumber, data.getActivity, stats[key].type))}</span>
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
