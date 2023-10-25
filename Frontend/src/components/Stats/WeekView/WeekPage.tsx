import React from 'react';
import ActivityCard from './ActivityCard';
import './WeekPage.css';
import { Link, useParams } from 'react-router-dom';
import { Activity } from '@/Activity';
import { GQLActivity, useGetActivityQuery } from '../../../graphql';

const WeekPage: React.FunctionComponent = () => {
	let { weekNumber } = useParams();
	const { data, loading, error } = useGetActivityQuery({ variables: {} });
	if (data !== undefined) {
		return (
			<div>
				{data.getActivity.map(
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
