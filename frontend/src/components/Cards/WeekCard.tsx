// import React from 'react';
// import { formatWeek, averageOrSum } from '../../utils/utils';
// import { GQLWeek, useGetWeeksQuery } from '../../graphql';
// import { weekCardType } from '../../utils/constants';
// type label = {
// 	label: string;
// 	type: 'avg' | 'sum';
// };
// const stats: { [key in keyof weekCardType]: label } = {
// 	distance: { label: 'Distance', type: 'sum' },
// 	time: { label: 'Time', type: 'sum' },
// 	heartrate: { label: 'Average Heartrate', type: 'avg' },
// 	cadence: { label: 'Average Cadence', type: 'avg' },
// };

// const WeekCard: React.FunctionComponent<{ week: GQLWeek }> = ({ week }) => {
// 	if (!week) {
// 		return <div></div>;
// 	}

// 	const keys = (Object.keys(week) as (keyof weekCardType)[]).filter(key => {
// 		return stats[key];
// 	});

// 	return (
// 		<div className="bg-grey-300 hover:bg-sky-300 shadow-lg rounded-md py-7 px-12 mt-6">
// 			<h1 className="text-2xl text-gray-900 font-normal border-b-2 border-black w-fit">
// 				{week.year} - {week.week}
// 			</h1>
// 			<ul>
// 				{keys.map((key, index) => (
// 					<li key={index}>
// 						<span>
// 							{stats[key].label}
// 							{': '}
// 							<span>{formatWeek(key, averageOrSum(week[key], week.activityCount, stats[key].type))}</span>
// 							<span></span>
// 						</span>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default WeekCard;
