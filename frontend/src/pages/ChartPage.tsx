import Chart from '../components/Chart/Chart';
import { IAxisType } from '../components/Chart/Chart';
import { useGetActivitiesQuery, GQLActivity, GQLGetActivitiesQuery } from '../graphql';
import { ChartSelectField } from '../components/Chart/ChartSelectField';
import MultiRangeSlider from 'multi-range-slider-react';
import ReactSlider from 'react-slider';
import React from 'react';

interface IFilter<T> {
	key: keyof T;
	title: string;
	type: 'number';
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
	{ key: 'elapsed_time', title: 'Time', type: 'number', lower: 0, upper: 20000 },
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

	const handleUpper = (event: number[], filter: IFilter<Omit<GQLActivity, 'week'>>) => {
		setFilterValues(
			filterValues.map(currentFilter => {
				return filter.key === currentFilter.key
					? { ...currentFilter, upper: event[1], lower: event[0] }
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
			{filterValues.map(filter => (
				<ReactSlider
					className="w-1/2 h-6 bg-slate-500"
					thumbClassName="example-thumb"
					trackClassName="example-track"
					defaultValue={[
						typeof filter.lower === 'number' ? filter.lower : parseFloat(filter.lower),
						typeof filter.upper === 'number' ? filter.upper : parseFloat(filter.upper),
					]}
					ariaLabel={['Leftmost thumb', 'Middle thumb', 'Rightmost thumb']}
					renderThumb={(props, state) => (
						<div className="" {...props}>
							{state.valueNow}
						</div>
					)}
					pearling
					onChange={e => handleUpper(e, filter)}
					max={typeof filter.upper === 'number' ? filter.upper : parseFloat(filter.upper)}
					minDistance={10}
				/>
			))}
			<Chart data={filterActivities()} x={x} yLeft={yLeft} yRight={yRight} />
			<div className="flex justify-evenly">
				<span>
					<ChartSelectField interact={selectYLeft} selectField={yAxis} name="Y Left" />
					<ChartSelectField interact={selectYRight} selectField={yAxis} name="Y Right" />
					<ChartSelectField interact={selectX} selectField={xAxis} name="x" />
				</span>
			</div>
		</div>
	);
};

export default ChartPage;
