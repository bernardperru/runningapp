import Chart from '../components/Chart/Chart';
import { IAxisType } from '../components/Chart/Chart';
import { useGetActivitiesQuery, GQLActivity, GQLGetActivitiesQuery } from '../graphql';
import { ChartSelectField } from '../components/Chart/ChartSelectField';
import ReactRanger from 'react-ranger';

import React from 'react';

interface IFilter<T> {
	key: keyof T;
	title: string;
	type: 'date' | 'number';
	lower: number | string;
	upper: number | string;
}

const yAxis: IAxisType<Omit<GQLActivity, 'week'>>[] = [
	{ key: 'distance', title: 'Distance' },
	{ key: 'average_cadence', title: 'Cadence' },
	{ key: 'average_heartrate', title: 'Heartrate' },
	{ key: 'elapsed_time', title: 'Time' },
];

const xAxis: IAxisType<Omit<GQLActivity, 'week'>>[] = [
	{ key: 'distance', title: 'Distance' },
	{ key: 'average_cadence', title: 'Cadence' },
	{ key: 'average_heartrate', title: 'Heartrate' },
	{ key: 'average_pace', title: 'Pace' },
	{ key: 'elapsed_time', title: 'Time' },
	{ key: 'start_date', title: 'Date' },
];

const filters: IFilter<Omit<GQLActivity, 'week'>>[] = [
	{ key: 'distance', title: 'Distance', type: 'number', lower: 0, upper: 42000 },
	{ key: 'average_cadence', title: 'Cadence', type: 'number', lower: 0, upper: 200 },
	{ key: 'average_heartrate', title: 'Heartrate', type: 'number', lower: 0, upper: 200 },
	// { key: 'average_pace', title: 'Pace', type: 'number' },
	{ key: 'elapsed_time', title: 'Time', type: 'number', lower: 0, upper: 20000 },
	{ key: 'start_date', title: 'Date', type: 'date', lower: '', upper: 42000 },
];
const ChartPage: React.FunctionComponent = () => {
	const [yLeft, setYLeft] = React.useState<IAxisType<Omit<GQLActivity, 'week'>>>(yAxis[0]);
	const [yRight, setYRight] = React.useState<IAxisType<Omit<GQLActivity, 'week'>>>(yAxis[0]);
	const [x, setX] = React.useState<IAxisType<Omit<GQLActivity, 'week'>>>(xAxis[0]);
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

	const [filterValues, setFilterValues] = React.useState<IFilter<Omit<GQLActivity, 'week'>>[]>(filters);

	const handleLower = (event: React.ChangeEvent<HTMLInputElement>, filter: IFilter<Omit<GQLActivity, 'week'>>) => {
		setFilterValues(
			filterValues.map(currentFilter => {
				return filter.key === currentFilter.key
					? { ...currentFilter, lower: filter.type === 'date' ? event.target.value : parseFloat(event.target.value) }
					: currentFilter;
			})
		);
	};

	const handleUpper = (event: React.ChangeEvent<HTMLInputElement>, filter: IFilter<Omit<GQLActivity, 'week'>>) => {
		setFilterValues(
			filterValues.map(currentFilter => {
				return filter.key === currentFilter.key
					? { ...currentFilter, upper: filter.type === 'date' ? event.target.value : parseFloat(event.target.value) }
					: currentFilter;
			})
		);
	};

	const filterActivities = () => {
		if (data) {
			return [...data.getActivities].filter(val => {
				for (var filter of filterValues) {
					if (filter.lower > val[filter.key] || val[filter.key] > filter.upper) {
						return false;
					}
				}
				return true;
			});
		}
		return [];
	};

	if (!data) {
		return <></>;
	}

	return (
		<div className="m-4">
			<Slider></Slider>
			<Chart data={filterActivities()} x={x} yLeft={yLeft} yRight={yRight} />
			<div className="flex justify-evenly">
				<span>
					<ChartSelectField interact={selectYLeft} selectField={yAxis} name="Y Left" />
					<ChartSelectField interact={selectYRight} selectField={yAxis} name="Y Right" />
					<ChartSelectField interact={selectX} selectField={xAxis} name="x" />
				</span>
			</div>
			<span className="">
				{filterValues.map((filter, index) => (
					<div key={index}>
						{filter.title}
						<input
							name={filter.title}
							type={filter.type}
							onChange={e => handleLower(e, filter)}
							value={filter.lower}
							className="border-gray-400 border-2"></input>
						<input
							name={filter.title}
							type={filter.type}
							onChange={e => handleUpper(e, filter)}
							value={filter.upper}
							className="border-gray-400 border-2"></input>
					</div>
				))}
			</span>
		</div>
	);
};

export default ChartPage;
