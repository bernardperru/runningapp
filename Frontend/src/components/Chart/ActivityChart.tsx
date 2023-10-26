import React from 'react';
import {
	Chart as ChartJS,
	ChartConfiguration,
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
import { Activity } from '@/Activity';
import { useGetActivityQuery, GQLActivity } from '../../graphql';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart: React.FunctionComponent<{ key: keyof GQLActivity }> = ({ key }) => {
	const { data, loading } = useGetActivityQuery();

	if (data !== undefined) {
		const activities = [...data?.getActivity];

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

		const labels = activities.map(activity => {
			return activity.start_date;
		});

		const datax: ChartData<keyof ChartTypeRegistry> = {
			labels,
			datasets: [
				{
					label: 'distance',
					data: activities.map(activity => {
						return activity['distance'];
					}),
					borderColor: 'rgb(53, 162, 235)',
					backgroundColor: 'rgba(53, 162, 235, 0.5)',
				},
			],
		};

		return <Line options={options} data={datax as ChartData<'line'>}></Line>;
	}
};

export default LineChart;
