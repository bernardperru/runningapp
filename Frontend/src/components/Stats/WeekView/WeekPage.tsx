import React from 'react';
import ActivityCard from './ActivityCard';
import './WeekPage.css';
import { useParams } from 'react-router-dom';
import { Activity } from '@/Activity';

const WeekPage: React.FunctionComponent<{ activities: Activity[] }> = ({ activities }) => {
	let { weekNumber } = useParams();

	return (
		<div>
			{activities.map(
				activity =>
					activity.week.toString() === weekNumber && (
						<div key={activity.id}>
							<ActivityCard activity={activity}></ActivityCard>
						</div>
					)
			)}
		</div>
	);
};

export default WeekPage;
