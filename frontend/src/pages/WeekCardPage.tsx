import React from 'react';
import { Link } from 'react-router-dom';
import WeekCard from '../components/Cards/WeekCard';
import { useGetWeeksPageQuery } from '../graphql';
import { usePagination } from '../hooks/usePagination';

const WeekCardPage: React.FunctionComponent = () => {
	const { paginationData, Pagination } = usePagination(12);

	const { data } = useGetWeeksPageQuery({
		variables: {
			first: paginationData.first,
			offset: paginationData.offset,
		},
	});

	if (!data) {
		return <></>;
	}

	return (
		<div>
			<div className="grid grid-cols-4 gap-10 place-items-center">
				{data.getWeeksPage.weeks.map((week, index) => (
					<Link key={index} to={'/weekly/' + week.year + '/' + week.week}>
						<WeekCard week={week}></WeekCard>
					</Link>
				))}
			</div>
			<div className="py-4">
				<Pagination pagesNumber={data.getWeeksPage.pages}></Pagination>
			</div>
		</div>
	);
};

export default WeekCardPage;
