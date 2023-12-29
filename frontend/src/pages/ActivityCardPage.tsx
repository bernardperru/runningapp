import React from 'react';
import ActivityCard from '../components/Cards/ActivityCard';
import { useParams } from 'react-router-dom';
import { GQLActivity, useGetWeekActivitiesQuery } from '../graphql';
import RunMap from '../components/Map/RunMap';

const ActivityCardPage: React.FunctionComponent = () => {
	const { yearNumber, weekNumber } = useParams();
	const [mapView, setMapView] = React.useState(false);
	const [activity, setActivity] = React.useState<GQLActivity>();

	const { data } = useGetWeekActivitiesQuery({
		variables: {
			week: weekNumber ? parseInt(weekNumber) : 0,
			year: yearNumber ? parseInt(yearNumber) : 0,
		},
	});

	if (!data) {
		return <></>;
	}

	return mapView && activity ? (
		<div>
			<button onClick={() => setMapView(false)}>Return</button>
			<RunMap activity={activity} />
		</div>
	) : (
		<div className="grid grid-cols-4 gap-10 place-items-center">
			{data.getWeekActivities.map(activity => (
				<div
					key={activity.id}
					onClick={() => {
						setMapView(true);
						setActivity(activity);
					}}>
					<ActivityCard activity={activity}></ActivityCard>
				</div>
			))}
		</div>
	);
};

export default ActivityCardPage;
