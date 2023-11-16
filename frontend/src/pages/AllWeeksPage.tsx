import React from 'react';
import { Link } from 'react-router-dom';
import WeekCard from '../components/Cards/WeekCard';
import { useGetActivitiesQuery } from '../graphql';

const AllWeeksPage: React.FunctionComponent = () => {
	const { data, loading } = useGetActivitiesQuery();

	if (data !== undefined) {
		const weeks = [...new Set(data.getActivities.map(element => element.week))].sort().reverse();

		return (
			<div className="grid grid-cols-4 gap-10 place-items-center">
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
