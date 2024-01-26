import Chart from '../components/Chart/Chart';
import { IAxisType } from '../components/Chart/Chart';
import { useGetActivitiesQuery, GQLActivity } from '../graphql';
import { ChartSelectField } from '../components/Chart/ChartSelectField';
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
	const { data } = useGetActivitiesQuery();

	if (!data) {
		return <></>;
	}

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

	return (
		<div className="">
			<ChartSelectField interact={selectYLeft} selectField={yAxis} name="Y Left" />
			<ChartSelectField interact={selectYRight} selectField={yAxis} name="Y Right" />
			<ChartSelectField interact={selectX} selectField={xAxis} name="x" />

			<div className="flex justify-center">
				<Chart data={data.getActivities} x={x} yLeft={yLeft} yRight={yRight} />
			</div>
		</div>
	);
};

export default ChartPage;
