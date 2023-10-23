import React from 'react';
import { format } from '../../../funktioner';
import './ActivityCard.css';
import { Activity } from '@/Activity';

const labels: { [key in keyof Activity]: string } = {
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	distance: 'Distance',
	elapsed_time: 'Time',
	id: 'Id',
	start_date: 'Date',
	week: 'Week',
	zone: 'Zone',
	map: 'Map',
};

const ActivityCard: React.FunctionComponent<{ activity: Activity }> = ({ activity }) => {
	const keys = (Object.keys(activity) as (keyof Activity)[]).filter(key => {
		return labels[key];
	});

	return (
		<ul className="activity-card">
			{keys.map(key => (
				<li key={key}>
					{labels[key]} : {format(key, activity[key])}
				</li>
			))}
		</ul>
	);
};

export default ActivityCard;
