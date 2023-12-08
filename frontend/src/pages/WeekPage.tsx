import React from 'react';
import ActivityCard from '../components/Cards/ActivityCard';
import { Link, useParams } from 'react-router-dom';
import { useGetWeeksQuery } from '../graphql';

const WeekPage: React.FunctionComponent = () => {
	let { weekNumber } = useParams();
	const { data } = useGetWeeksQuery();
	if (data !== undefined) {
		return (
			<div className="grid grid-cols-4 gap-10 place-items-center">
				{/* {data.getWeeks.map(
					week =>
						week.week.toString() === weekNumber && (
							<Link to={'/weekly/' + weekNumber + '/' + week.activities}>
								<div key={activity.id}>
									<ActivityCard activityId={activity.id}></ActivityCard>
								</div>
							</Link>
						)
				)} */}
			</div>
		);
	}
};

export default WeekPage;
