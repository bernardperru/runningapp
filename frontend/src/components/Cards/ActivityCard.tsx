import React from 'react';
import { format } from '../../utils/utils';
import { useGetActivitiesQuery } from '../../graphql';
import { activityCardType } from '../../utils/constants';

const labels: {
	[key in keyof activityCardType]: string;
} = {
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	distance: 'Distance',
	elapsed_time: 'Time',
	zone: 'Zone',
	average_pace: 'Average Pace',
};

const ActivityCard: React.FunctionComponent<{ activityId: number }> = ({ activityId }) => {
	const { data } = useGetActivitiesQuery({ variables: {} });

	if (data !== undefined) {
		const keys = (Object.keys(data.getActivities[0]) as (keyof activityCardType)[]).filter(key => {
			return labels[key];
		});

		const activity = data.getActivities.filter(a => {
			return a.id === activityId;
		})[0];

		return (
			<div className="bg-sky-200 hover:bg-blue-400 shadow-lg rounded-md py-7 px-12 mt-6">
				<h1 className="text-2xl font-sans border-b-2 border-black w-fit">
					{format('start_date', activity.start_date)}
				</h1>
				<ul className="">
					{keys.map((key, index) => (
						<li key={index}>
							{labels[key]} : {format(key, activity[key])}
						</li>
					))}
				</ul>
			</div>
		);
	}
};

export default ActivityCard;
