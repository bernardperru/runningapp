import React from 'react';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartTypeRegistry,
	ChartData,
	ChartOptions,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { useGetWeeksQuery } from '../../graphql';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ActivityChart: React.FunctionComponent = () => {
	// const { data } = useGetActivitiesQuery();
	const { data } = useGetWeeksQuery();

	if (data) {
		const weeks = [...data?.getWeeks];
		console.log(weeks.length);
		const options: ChartOptions<keyof ChartTypeRegistry> = {
			responsive: true,
			indexAxis: 'x' as const,
			plugins: {
				legend: {
					position: 'top' as const,
				},
				title: {
					display: true,
					text: 'Chart.js Chart',
				},
			},
		};

		const labels = weeks
			.sort((a, b) => (a.week < b.week ? -1 : 1))
			.map(week => {
				return week.week.toString();
			});

		const datax: ChartData<keyof ChartTypeRegistry> = {
			labels,
			datasets: [
				{
					label: 'distance',
					data: weeks.map(week => {
						return week.time;
					}),
					borderColor: 'rgb(53, 162, 235)',
					backgroundColor: 'rgba(53, 162, 235, 0.5)',
				},
			],
		};

		return <Line options={options} data={datax as ChartData<'line'>}></Line>;
	}
};

export default ActivityChart;
