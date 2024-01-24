import Chart from '../components/Chart/Chart';
import { IAxisType } from '../components/Chart/Chart';
import { useGetActivitiesQuery, GQLActivity } from '../graphql';
import React from 'react';

const yAxis: IAxisType<GQLActivity>[] = [
	{ key: 'distance', title: 'Distance' },
	{ key: 'average_cadence', title: 'Cadence' },
	{ key: 'average_heartrate', title: 'Heartrate' },
	{ key: 'elapsed_time', title: 'Time' },
];

const xAxis: IAxisType<GQLActivity>[] = [
	{ key: 'activityId', title: 'ID' },
	{ key: 'distance', title: 'Distance' },
	{ key: 'average_cadence', title: 'Cadence' },
	{ key: 'average_heartrate', title: 'Heartrate' },
	{ key: 'average_pace', title: 'Pace' },
	{ key: 'elapsed_time', title: 'Time' },
	{ key: 'start_date', title: 'Date' },
	{ key: 'week', title: 'Week' },
];

const ChartPage: React.FunctionComponent = () => {
	const [y1, setY1] = React.useState<IAxisType<GQLActivity>>(yAxis[0]);
	const [y2, setY2] = React.useState<IAxisType<GQLActivity>>(yAxis[0]);

	const [x, setX] = React.useState<IAxisType<GQLActivity>>(xAxis[0]);
	const { data } = useGetActivitiesQuery();

	if (!data) {
		return <></>;
	}

	const selectY1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setY1(yAxis.filter(x => x.title === value)[0]);
	};

	const selectY2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setY2(yAxis.filter(x => x.title === value)[0]);
	};

	const selectX = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setX(xAxis.filter(x => x.title === value)[0]);
	};

	return (
		<div className="">
			X
			<select className="border border-black flex justify-center" onChange={selectX}>
				{xAxis.map((el, index) => (
					<option key={index}>{el.title}</option>
				))}
			</select>
			Y1
			<select className="border border-black flex justify-center" onChange={selectY1}>
				{yAxis.map((el, index) => (
					<option key={index}>{el.title}</option>
				))}
			</select>
			Y2
			<select className="border border-black flex justify-center" onChange={selectY2}>
				{yAxis.map((el, index) => (
					<option key={index}>{el.title}</option>
				))}
			</select>
			<div className="flex justify-center">
				<Chart data={data.getActivities} y1={y1} y2={y2} x={x} />
			</div>
		</div>
	);
};

export default ChartPage;
