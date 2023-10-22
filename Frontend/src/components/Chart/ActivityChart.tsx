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
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { Activity } from '@/Activity';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart: React.FunctionComponent<{ activities: Activity[]; x: keyof Activity }> = ({ activities, x }) => {
	activities = activities.map(activity => activity).reverse();
	const options: ChartConfiguration = {
		type: 'line',
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart',
			},
		},
	};

	const labels = activities.map(activity => {
		return activity.start_date;
	});

	const data = {
		labels,
		datasets: [
			{
				label: x,
				data: activities.map(activity => {
					return activity[x];
				}),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return <Line options={options} data={data}></Line>;
};

export default LineChart;
