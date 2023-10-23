import React from 'react';
import { average, format } from '../../../funktioner';
import { Activity } from '@/Activity';

type label = {
	label: string;
	type: 'avg' | 'sum' | 'none';
};

const stats: { [key in keyof Activity]: label } = {
	distance: { label: 'Distance', type: 'sum' },
	elapsed_time: { label: 'Time', type: 'sum' },
	average_heartrate: { label: 'Average Heartrate', type: 'avg' },
	average_cadence: { label: 'Average Cadence', type: 'avg' },
	id: { label: 'Id', type: 'none' },
	start_date: { label: 'Date', type: 'none' },
	week: { label: 'Week', type: 'none' },
	zone: { label: 'Zone', type: 'none' },
	map: { label: 'Map', type: 'none' },
};

const WeekCard: React.FunctionComponent<{ weekNumber: number; activities: Activity[] }> = ({
	weekNumber,
	activities,
}) => {
	const keys = (Object.keys(activities[0]) as (keyof Activity)[]).filter(key => {
		return stats[key];
	});

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
									<span>{format(key, average(key, weekNumber, activities, stats[key].type))}</span>
								</span>
							</li>
						)
				)}
			</ul>
		</div>
	);
};

export default WeekCard;
