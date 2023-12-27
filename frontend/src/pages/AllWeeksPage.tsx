import React from 'react';
import { Link } from 'react-router-dom';
import WeekCard from '../components/Cards/WeekCard';
import { useGetWeeksPageQuery } from '../graphql';

const AllWeeksPage: React.FunctionComponent = () => {
	const { data } = useGetWeeksPageQuery({
		variables: {
			first: 8,
			offset: 0,
		},
	});

	if (data !== undefined) {
		const weeks = [
			...data.getWeeksPage.weeks.map(week => {
				return week;
			}),
		].sort((a, b) => (a.week > b.week ? -1 : 1));

		return (
			<div className="grid grid-cols-4 gap-10 place-items-center">
				{weeks.map(week => (
					<Link to={'/weekly/' + week.year + '/' + week.week}>
						<WeekCard weekNumber={week.week}></WeekCard>
					</Link>
				))}
			</div>
		);
	}
};

export default AllWeeksPage;
