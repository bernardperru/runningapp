import React from 'react';
import { format } from '../../../funktioner';
import './ActivityCard.css';
import { Activity } from '@/Activity';
import { Link, useParams } from 'react-router-dom';
import { GQLActivity, useGetActivityQuery } from '../../../graphql';

const labels: { [key in keyof GQLActivity]: string } = {
	__typename: 'Activity',
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	distance: 'Distance',
	elapsed_time: 'Time',
	id: 'Id',
	start_date: 'Date',
	map: 'Map',
	week: 'Week',
	zone: 'Zone',
};

const ActivityCard: React.FunctionComponent<{ activityId: number }> = ({ activityId }) => {
	const { data, loading, error } = useGetActivityQuery({ variables: {} });

	if (data !== undefined) {
		const keys = Object.keys(data.getActivity[0] as GQLActivity);

		const activity = data.getActivity.filter(a => {
			return a.id === activityId;
		})[0];

		return (
			<ul className="activity-card">
				{keys.map((key, index) => (
					<li key={index}>
						{key} : {activity.average_cadence}
					</li>
				))}
			</ul>
		);
	}
};

export default ActivityCard;
