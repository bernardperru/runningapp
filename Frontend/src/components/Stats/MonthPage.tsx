import React from 'react';
import { getWeeks } from '../../funktioner';
import WeekPage from './WeekPage';
import ActivityCard from './ActivityCard';
import RunMap from '../Map/RunMap';
import './WeekPage.css';
import { Link } from 'react-router-dom';
import { Activity } from '@/Activity';

const WeeklyData: React.FunctionComponent<{ activities: Activity[] }> = ({ activities }) => {
	const weeks = getWeeks(activities);

	return (
		<div>
			{weeks.map(weekNumber => (
				<div key={weekNumber}>
					<Link to={'/weekly/' + weekNumber}>
						<WeekPage activities={activities}></WeekPage>
					</Link>
				</div>
			))}
			{/* {view.viewSingleWeek && (
				<div>
					{activities.map(
						activity =>
							activity.week === week.weekNumber && (
								<div key={activity.id}>
									<ActivityCard activity={activity}></ActivityCard>
								</div>
							)
					)}
				</div>
			)} 
			{view.viewSingleActivity && (
				<div>
					<RunMap activity={activity.activity}></RunMap>
				</div>
			)}
      */}
		</div>
	);
};

export default WeeklyData;
