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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart: React.FunctionComponent<{ activities: Activity[]; x: keyof Activity }> = ({ activities, x }) => {
	activities = activities.map(activity => activity).reverse();

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

	const data: ChartData<keyof ChartTypeRegistry> = {
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

	return <Line options={options} data={data as ChartData<'line'>}></Line>;
};

export default LineChart;
