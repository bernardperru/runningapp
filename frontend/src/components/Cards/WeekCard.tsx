import React from 'react';
import { format, averageOrSum } from '../../utils/utils';
import { useGetWeeksQuery } from '../../graphql';
import { weekCardType } from '../../utils/constants';
type label = {
	label: string;
	type: 'avg' | 'sum';
};
const stats: { [key in keyof weekCardType]: label } = {
	distance: { label: 'Distance', type: 'sum' },
	time: { label: 'Time', type: 'sum' },
	heartrate: { label: 'Average Heartrate', type: 'avg' },
	cadence: { label: 'Average Cadence', type: 'avg' },
};

const WeekCard: React.FunctionComponent<{ weekNumber: number }> = ({ weekNumber }) => {
	const { data } = useGetWeeksQuery();

	if (data !== undefined) {
		const week = data.getWeeks.find(week => {
			return week.week === weekNumber;
		});
		if (week) {
			const keys = (Object.keys(data.getWeeks[0]) as (keyof weekCardType)[]).filter(key => {
				return stats[key];
			});

			return (
				<div className="bg-sky-200 hover:bg-blue-400 shadow-lg rounded-md py-7 px-12 mt-6">
					<h1 className="text-2xl font-sans border-b-2 border-black w-fit">{weekNumber}</h1>
					<ul>
						{keys.map((key, index) => (
							<li key={index}>
								<span>
									{stats[key].label}
									{' : '}
									<span>{format(key, averageOrSum(week[key], week.activities.length, stats[key].label))}</span>
									<span></span>
								</span>
							</li>
						))}
					</ul>
				</div>
			);
		}
	}
};

export default WeekCard;
