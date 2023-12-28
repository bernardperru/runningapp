import React from 'react';
import { format } from '../../utils/utils';
import { GQLActivity, useGetWeekActivitiesQuery } from '../../graphql';
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

const ActivityCard: React.FunctionComponent<{ activity: GQLActivity }> = ({ activity }) => {
	const keys = (Object.keys(activity) as (keyof activityCardType)[]).filter(key => {
		return labels[key];
	});

	return (
		<div className="bg-grey-300 hover:bg-sky-300 shadow-lg rounded-md py-7 px-12 mt-6">
			<h1 className="text-2xl text-gray-900 font-normal border-b-2 border-black w-fit">
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
};

export default ActivityCard;
