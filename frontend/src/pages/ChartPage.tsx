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

	const [filter, setFilter] = React.useState<{
		dateFilterLower: string;
		dateFilterUpper: string;
		distanceFilterLower: number;
		distanceFilterUpper: number;
	}>({
		dateFilterLower: '',
		dateFilterUpper: new Date().toString(),
		distanceFilterLower: 0,
		distanceFilterUpper: 100000,
	});

	const { data } = useGetActivitiesQuery();

	const selectYRight = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setYRight(yAxis.filter(x => x.title === event.target.value)[0]);
	};

	const selectYLeft = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setYLeft(yAxis.filter(x => x.title === event.target.value)[0]);
	};

	const selectX = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setX(xAxis.filter(x => x.title === event.target.value)[0]);
	};

	const handleDateChangeLower = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, dateFilterLower: event.target.value });
	};

	const handleDateChangeUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, dateFilterUpper: event.target.value });
	};

	const handleDistanceLower = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, distanceFilterLower: parseFloat(event.target.value) });
	};

	const handleDistanceUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, distanceFilterUpper: parseFloat(event.target.value) });
	};

	const filterActivities = () => {
		if (data) {
			return [...data.getActivities].filter(val => {
				return (
					val.start_date >= filter.dateFilterLower &&
					val.start_date <= filter.dateFilterUpper &&
					val.distance >= filter.distanceFilterLower &&
					val.distance <= filter.distanceFilterUpper
				);
			});
		}
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
				<input
					type="date"
					onChange={handleDateChangeLower}
					value={filter.dateFilterLower}
					className="border-black border-2"></input>
				<input
					type="date"
					onChange={handleDateChangeUpper}
					value={filter.dateFilterUpper}
					className="border-black border-2"></input>
			</div>
			<div className="">
				<input
					type="number"
					onChange={handleDistanceLower}
					value={filter.distanceFilterLower}
					className="border-black border-2"></input>
				<input
					type="number"
					onChange={handleDistanceUpper}
					value={filter.distanceFilterUpper}
					className="border-black border-2"></input>
			</div>
			<div className="flex justify-center">
				<Chart data={filterActivities()} x={x} yLeft={yLeft} yRight={yRight} />
			</div>
		</div>
	);
};

export default ChartPage;
