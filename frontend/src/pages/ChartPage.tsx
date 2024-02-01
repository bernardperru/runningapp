import Chart from '../components/Chart/Chart';
import { IAxisType } from '../components/Chart/Chart';
import { useGetActivitiesQuery, GQLActivity } from '../graphql';
import { ChartSelectField } from '../components/Chart/ChartSelectField';
import { useChartFilter } from '../components/Chart/useChartFilter';
import React from 'react';
import { IFilter } from '../components/Chart/useChartFilter';

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
];

const filters: IFilter<GQLActivity>[] = [
	{ key: 'distance', title: 'Distance', type: 'number' },
	{ key: 'average_cadence', title: 'Cadence', type: 'number' },
	{ key: 'average_heartrate', title: 'Heartrate', type: 'number' },
	{ key: 'average_pace', title: 'Pace', type: 'number' },
	{ key: 'elapsed_time', title: 'Time', type: 'number' },
	{ key: 'start_date', title: 'Date', type: 'date' },
];
const ChartPage: React.FunctionComponent = () => {
	const [yLeft, setYLeft] = React.useState<IAxisType<GQLActivity>>(yAxis[0]);
	const [yRight, setYRight] = React.useState<IAxisType<GQLActivity>>(yAxis[0]);
	const [x, setX] = React.useState<IAxisType<GQLActivity>>(xAxis[0]);

	const { FilterInput } = useChartFilter(filters);
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

	const filterActivities = () => {
		if (data) {
			return [...data.getActivities].filter(val => {
				return true;
			});
		}
	};

	if (!data) {
		return <></>;
	}

	return (
		<div className="m-4">
			<ChartSelectField interact={selectYLeft} selectField={yAxis} name="Y Left" />
			<ChartSelectField interact={selectYRight} selectField={yAxis} name="Y Right" />
			<ChartSelectField interact={selectX} selectField={xAxis} name="x" />
			<FilterInput></FilterInput>
			<div className="flex justify-center">
				<Chart data={filterActivities()} x={x} yLeft={yLeft} yRight={yRight} />
			</div>
		</div>
	);
};

export default ChartPage;
