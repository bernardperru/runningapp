import React from 'react';
import { Link } from 'react-router-dom';
import WeekCard from '../components/Cards/WeekCard';
import { useGetWeeksPageQuery } from '../graphql';

const AllWeeksPage: React.FunctionComponent = () => {
	const { data } = useGetWeeksPageQuery({
		variables: {
			first: 16,
			offset: 0,
		},
	});

	if (!data) {
		return <></>;
	}

	return (
		<div className="grid grid-cols-4 gap-10 place-items-center">
			{data.getWeeksPage.weeks.map((week, index) => (
				<Link key={index} to={'/weekly/' + week.year + '/' + week.week}>
					<WeekCard week={week}></WeekCard>
				</Link>
			))}
		</div>
	);
};

export default AllWeeksPage;
