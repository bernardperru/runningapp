import Chart from '../components/Chart/Chart';
import { IAxisType } from '../components/Chart/Chart';
import { useGetActivitiesQuery } from '../graphql';
import { ChartSelectField } from '../components/Chart/ChartSelectField';
import ReactSlider from 'react-slider';
import React from 'react';

type Activity = {
	__typename: 'Activity';
	id: number;
	activityId: number;
	distance: number;
	elapsed_time: number;
	start_date: string;
	summary_polyline: string;
	average_cadence: number;
	average_heartrate: number;
	average_pace: string;
	zone: number;
};

interface IFilter<T> {
	key: keyof T;
	title: string;
	lower: number;
	upper: number;
	multiplier: number;
}

const yAxis: IAxisType<Activity>[] = [
	{ key: 'distance', title: 'Distance' },
	{ key: 'average_cadence', title: 'Cadence' },
	{ key: 'average_heartrate', title: 'Heartrate' },
	{ key: 'elapsed_time', title: 'Time' },
];

const xAxis: IAxisType<Activity>[] = [
	{ key: 'distance', title: 'Distance' },
	{ key: 'average_cadence', title: 'Cadence' },
	{ key: 'average_heartrate', title: 'Heartrate' },
	{ key: 'average_pace', title: 'Pace' },
	{ key: 'elapsed_time', title: 'Time' },
	{ key: 'start_date', title: 'Date' },
];

const filters: IFilter<Activity>[] = [
	{ key: 'distance', title: 'Distance', lower: 0, upper: 42, multiplier: 1000 },
	{ key: 'average_cadence', title: 'Cadence', lower: 0, upper: 200, multiplier: 1 },
	{ key: 'average_heartrate', title: 'Heartrate', lower: 0, upper: 200, multiplier: 1 },
	{ key: 'elapsed_time', title: 'Time', lower: 0, upper: 20, multiplier: 1000 },
];

export const ChartPage: React.FunctionComponent = () => {
	const [yLeft, setYLeft] = React.useState<IAxisType<Activity>>(yAxis[0]);
	const [yRight, setYRight] = React.useState<IAxisType<Activity>>(yAxis[0]);
	const [x, setX] = React.useState<IAxisType<Activity>>(xAxis[0]);
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

	const [filterValues, setFilterValues] = React.useState<IFilter<Activity>[]>(filters);

	const handleUpper = (event: number[], filter: IFilter<Activity>) => {
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
				for (const filter of filterValues) {
					if (
						parseFloat(val[filter.key].toString()) < filter.lower * filter.multiplier ||
						parseFloat(val[filter.key].toString()) > filter.upper * filter.multiplier
					) {
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
					className="w-1/2 h-6"
					thumbClassName="border-2"
					trackClassName=""
					defaultValue={[filter.lower, filter.upper]}
					renderThumb={(props, state) => (
						<div className="" {...props}>
							{state.valueNow}
						</div>
					)}
					pearling
					onChange={e => handleUpper(e, filter)}
					minDistance={1}
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
