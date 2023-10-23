import React from 'react';
import { getWeeks } from '../../../funktioner';
import './MonthPage.css';
import { Link } from 'react-router-dom';
import { Activity } from '@/Activity';
import WeekCard from './WeekCard';

const WeeklyData: React.FunctionComponent<{ activities: Activity[] }> = ({ activities }) => {
	const weeks = getWeeks(activities);

	return (
		<div>
			{weeks.map(weekNumber => (
				<Link to={'/weekly/' + weekNumber}>
					<WeekCard weekNumber={weekNumber} activities={activities}></WeekCard>
				</Link>
			))}
		</div>
	);
};

export default WeeklyData;
