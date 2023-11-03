import React from 'react';
import ActivityCard from './ActivityCard';
import { Link, useParams } from 'react-router-dom';
import { useGetActivitiesQuery } from '../../../graphql';

const WeekPage: React.FunctionComponent = () => {
	let { weekNumber } = useParams();
	const { data, loading, error } = useGetActivitiesQuery({ variables: {} });
	if (data !== undefined) {
		return (
			<div className="grid grid-cols-4 gap-10 place-items-center">
				{data.getActivities.map(
					activity =>
						activity.week.toString() === weekNumber && (
							<Link to={'/weekly/' + weekNumber + '/' + activity.id}>
								<div key={activity.id}>
									<ActivityCard activityId={activity.id}></ActivityCard>
								</div>
							</Link>
						)
				)}
			</div>
		);
	}
};

export default WeekPage;
