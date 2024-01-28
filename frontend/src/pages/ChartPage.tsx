import Chart from '../components/Chart/Chart';
import { IAxisType } from '../components/Chart/Chart';
import { useGetActivitiesQuery, GQLActivity } from '../graphql';
import { ChartSelectField } from '../components/Chart/ChartSelectField';
import { ChartFilter } from '../components/Chart/ChartFilter';
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
	const [yLeft, setYLeft] = React.useState<IAxisType<GQLActivity>>(yAxis[0]);
	const [yRight, setYRight] = React.useState<IAxisType<GQLActivity>>(yAxis[0]);
	const [x, setX] = React.useState<IAxisType<GQLActivity>>(xAxis[0]);
	const [dateFilterLower, setDateFilterLower] = React.useState('');
	const [dateFilterHigher, setDateFilterHigher] = React.useState('');

	const { data } = useGetActivitiesQuery();

	const selectYRight = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setYRight(yAxis.filter(x => x.title === value)[0]);
	};

	const selectYLeft = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setYLeft(yAxis.filter(x => x.title === value)[0]);
	};

	const selectX = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setX(xAxis.filter(x => x.title === value)[0]);
	};

	const handleDateChangeLower = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDateFilterLower(event.target.value);
		console.log(event.target.value);
	};

	const handleDateChangeHigher = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDateFilterHigher(event.target.value);
		console.log(event.target.value);
	};

	const filterActivities = () => {
		if (data && dateFilterLower && dateFilterHigher) {
			return [...data.getActivities].filter(val => {
				return val.start_date >= dateFilterLower && val.start_date <= dateFilterHigher;
			});
		}

		return data?.getActivities;
	};

	if (!data) {
		return <></>;
	}

	return (
		<div className="">
			<ChartSelectField interact={selectYLeft} selectField={yAxis} name="Y Left" />
			<ChartSelectField interact={selectYRight} selectField={yAxis} name="Y Right" />
			<ChartSelectField interact={selectX} selectField={xAxis} name="x" />
			<div>
				<input type="date" onChange={handleDateChangeLower} value={dateFilterLower}></input>
				<input type="date" onChange={handleDateChangeHigher} value={dateFilterHigher}></input>
			</div>
			<div className="flex justify-center">
				<Chart data={filterActivities()} x={x} yLeft={yLeft} yRight={yRight} />
			</div>
		</div>
	);
};

export default ChartPage;
