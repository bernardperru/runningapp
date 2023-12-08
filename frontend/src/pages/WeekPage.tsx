import React from 'react';
import ActivityCard from '../components/Cards/ActivityCard';
import { Link, useParams } from 'react-router-dom';
import { useGetWeeksQuery } from '../graphql';

const WeekPage: React.FunctionComponent = () => {
	let { weekNumber } = useParams();
	const { data } = useGetWeeksQuery();
	if (data) {
		const week = data.getWeeks.find(week => week.week.toString() === weekNumber);
		if (week) {
			return (
				<div className="grid grid-cols-4 gap-10 place-items-center">
					{week.activities.map(activity => (
						<Link to={'/weekly/' + weekNumber + '/' + activity.id}>
							<div key={activity.id}>
								<ActivityCard activityId={activity.id}></ActivityCard>
							</div>
						</Link>
					))}
				</div>
			);
		}
	}
};

export default WeekPage;
