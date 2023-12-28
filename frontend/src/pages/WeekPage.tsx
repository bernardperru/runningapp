import React from 'react';
import ActivityCard from '../components/Cards/ActivityCard';
import { Link, useParams } from 'react-router-dom';
import { useGetWeekActivitiesQuery } from '../graphql';

const WeekPage: React.FunctionComponent = () => {
	const { yearNumber, weekNumber } = useParams();

	const { data } = useGetWeekActivitiesQuery({
		variables: {
			week: weekNumber ? parseInt(weekNumber) : 0,
			year: yearNumber ? parseInt(yearNumber) : 0,
		},
	});

	if (!data) {
		return <></>;
	}

	return (
		<div className="grid grid-cols-4 gap-10 place-items-center">
			{data.getWeekActivities.map(activity => (
				<Link to={'/weekly/' + yearNumber + '/' + weekNumber + '/' + activity.id}>
					<div key={activity.id}>
						<ActivityCard activityId={activity.id}></ActivityCard>
					</div>
				</Link>
			))}
		</div>
	);
};

export default WeekPage;
