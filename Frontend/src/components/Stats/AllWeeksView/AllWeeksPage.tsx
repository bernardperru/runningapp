import React from 'react';
import { Link } from 'react-router-dom';
import WeekCard from './WeekCard';
import { useGetActivitiesQuery } from '../../../graphql';

const AllWeeksPage: React.FunctionComponent = () => {
	const { data, loading } = useGetActivitiesQuery();

	if (data !== undefined) {
		const weeks = [...new Set(data.getActivities.map(element => element.week))].sort().reverse();

		return (
			<div className="">
				{weeks.map(weekNumber => (
					<Link to={'/weekly/' + weekNumber}>
						<WeekCard weekNumber={weekNumber}></WeekCard>
					</Link>
				))}
			</div>
		);
	}
};

export default AllWeeksPage;
