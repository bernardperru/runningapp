import React from 'react';
import { getWeeks } from '../../../funktioner';
import './MonthPage.css';
import { Link } from 'react-router-dom';
import { Activity } from '@/Activity';
import WeekCard from './WeekCard';
import { useGetActivityQuery } from '../../../graphql';

const WeeklyData: React.FunctionComponent = () => {
	const { data, loading } = useGetActivityQuery();

	if (data !== undefined) {
		const weeks = [...new Set(data.getActivity.map(element => element.week))];

		return (
			<div>
				{weeks.map(weekNumber => (
					<Link to={'/weekly/' + weekNumber}>
						<WeekCard weekNumber={weekNumber}></WeekCard>
					</Link>
				))}
			</div>
		);
	}
};

export default WeeklyData;
