import React from 'react';
import './AllWeeksPage.css';
import { Link } from 'react-router-dom';
import WeekCard from './WeekCard';
import { useGetActivityQuery } from '../../../graphql';

const AllWeeksPage: React.FunctionComponent = () => {
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

export default AllWeeksPage;
