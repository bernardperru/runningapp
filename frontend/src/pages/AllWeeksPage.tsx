import React from 'react';
import { Link } from 'react-router-dom';
import WeekCard from '../components/Cards/WeekCard';
import { useGetWeeksQuery } from '../graphql';

const AllWeeksPage: React.FunctionComponent = () => {
	const { data } = useGetWeeksQuery();

	if (data !== undefined) {
		let weeks = data.getWeeks;

		return (
			<div className="grid grid-cols-4 gap-10 place-items-center">
				{weeks.map(week => (
					<Link to={'/weekly/' + week.week}>
						<WeekCard weekNumber={week.week}></WeekCard>
					</Link>
				))}
			</div>
		);
	}
};

export default AllWeeksPage;
