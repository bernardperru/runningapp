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
];

const ChartPage: React.FunctionComponent = () => {
	const [yLeft, setYLeft] = React.useState<IAxisType<GQLActivity>>(yAxis[0]);
	const [yRight, setYRight] = React.useState<IAxisType<GQLActivity>>(yAxis[0]);
	const [x, setX] = React.useState<IAxisType<GQLActivity>>(xAxis[0]);

	const [filter, setFilter] = React.useState<{
		dateLower: string;
		dateUpper: string;
		distanceLower: number;
		distanceUpper: number;
		cadenceLower: number;
		cadenceUpper: number;
		heartrateLower: number;
		heartrateUpper: number;
		paceLower: string;
		paceUpper: string;
		timeLower: number;
		timeUpper: number;
	}>({
		dateLower: '',
		dateUpper: new Date().toString(),
		distanceLower: 0,
		distanceUpper: 100000,
		cadenceLower: 140,
		cadenceUpper: 210,
		heartrateLower: 40,
		heartrateUpper: 200,
		paceLower: '',
		paceUpper: '',
		timeLower: 0,
		timeUpper: 9000,
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
		setFilter({ ...filter, dateLower: event.target.value });
	};

	const handleDateChangeUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, dateUpper: event.target.value });
	};

	const handleDistanceLower = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, distanceLower: parseFloat(event.target.value) });
	};

	const handleDistanceUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, distanceUpper: parseFloat(event.target.value) });
	};

	const handleCadenceLower = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, cadenceLower: parseFloat(event.target.value) });
	};

	const handleCadenceUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, cadenceUpper: parseFloat(event.target.value) });
	};

	const handleHeartrateLower = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, heartrateLower: parseFloat(event.target.value) });
	};

	const handleHeartrateUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, heartrateUpper: parseFloat(event.target.value) });
	};

	const handlePaceLower = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, paceLower: event.target.value });
	};

	const handlePaceUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, paceUpper: event.target.value });
	};

	const handleTimeLower = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, timeLower: parseFloat(event.target.value) });
	};

	const handleTimeUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter({ ...filter, timeUpper: parseFloat(event.target.value) });
	};

	const filterActivities = () => {
		if (data) {
			return [...data.getActivities].filter(val => {
				return (
					val.start_date >= filter.dateLower &&
					val.start_date <= filter.dateUpper &&
					val.distance >= filter.distanceLower &&
					val.distance <= filter.distanceUpper
				);
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
			<div className="my-4">
				<div>Date</div>
				<input
					type="date"
					onChange={handleDateChangeLower}
					value={filter.dateLower}
					className="border-gray-400 border-2"></input>
				<> - </>
				<input
					type="date"
					onChange={handleDateChangeUpper}
					value={filter.dateUpper}
					className="border-gray-400 border-2"></input>
			</div>
			<div className="my-4">
				<div>Distance</div>
				<input
					type="number"
					onChange={handleDistanceLower}
					value={filter.distanceLower}
					className="border-gray-400 border-2"></input>
				<> - </>
				<input
					type="number"
					onChange={handleDistanceUpper}
					value={filter.distanceUpper}
					className="border-gray-400 border-2"></input>
			</div>
			<div className="my-4">
				<div>Cadence</div>
				<input
					type="number"
					onChange={handleCadenceLower}
					value={filter.cadenceLower}
					className="border-gray-400 border-2"></input>
				<> - </>
				<input
					type="number"
					onChange={handleCadenceUpper}
					value={filter.cadenceUpper}
					className="border-gray-400 border-2"></input>
			</div>
			<div className="my-4">
				<div>Heartrate</div>
				<input
					type="number"
					onChange={handleHeartrateLower}
					value={filter.heartrateLower}
					className="border-gray-400 border-2"></input>
				<> - </>
				<input
					type="number"
					onChange={handleHeartrateUpper}
					value={filter.heartrateUpper}
					className="border-gray-400 border-2"></input>
			</div>
			<div className="flex justify-center">
				<Chart data={filterActivities()} x={x} yLeft={yLeft} yRight={yRight} />
			</div>
		</div>
	);
};

export default ChartPage;
