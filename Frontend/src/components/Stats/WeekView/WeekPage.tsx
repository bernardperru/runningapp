import React from 'react';
import ActivityCard from './ActivityCard';
import './WeekPage.css';
import { Link, useParams } from 'react-router-dom';
import { Activity } from '@/Activity';

const WeekPage: React.FunctionComponent<{ activities: Activity[] }> = ({ activities }) => {
	let { weekNumber } = useParams();

	return (
		<div>
			{activities.map(
				activity =>
					activity.week.toString() === weekNumber && (
						<Link to={'/weekly/' + weekNumber + '/' + activity.id}>
							<div key={activity.id}>
								<ActivityCard activity={activity}></ActivityCard>
							</div>
						</Link>
					)
			)}
		</div>
	);
};

export default WeekPage;
