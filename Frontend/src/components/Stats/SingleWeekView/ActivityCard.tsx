import React from 'react';
import { format } from '../../../functions';
import './ActivityCard.css';
import { Activity } from '@/Activity';
import { Link, useParams } from 'react-router-dom';
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
			<ul className="activity-card">
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
