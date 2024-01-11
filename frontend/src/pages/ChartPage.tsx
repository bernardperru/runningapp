import { activityType } from '@/utils/constants';
import Chart from '../components/Chart/Chart';
import { IAxis } from '../components/Chart/Chart';
import { useGetWeeksQuery, useGetActivitiesQuery } from '../graphql';
import React from 'react';

// const axis: IAxis<activityType>[] = Object.keys(x);

const ChartPage: React.FunctionComponent = () => {
	const [y, setY] = React.useState<string>('');
	const [x, setX] = React.useState<string>('');
	const { data } = useGetActivitiesQuery();

	if (!data) {
		return <></>;
	}

	const keys = (Object.keys(data.getActivities[0]) as string[]).filter(key => {
		return key.toString() !== '__typename';
	});

	const selectY = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setY(value);
	};

	const selectX = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setX(value);
	};

	console.log(y);

	return (
		<div>
			X
			<select className="border border-black flex justify-center" onChange={selectX}>
				{keys.map(key => (
					<option>{key}</option>
				))}
			</select>
			Y
			<select className="border border-black flex justify-center" onChange={selectY}>
				{keys.map(key => (
					<option>{key}</option>
				))}
			</select>
			<Chart data={data.getActivities} y={y} x={x}></Chart>
		</div>
	);
};

export default ChartPage;
