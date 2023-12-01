import React from 'react';
import { format, formatDate } from '../../utils/utils';
import { activityType } from '../../utils/constants';

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
import { useGetActivitiesQuery, GQLActivity } from '../../graphql';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ActivityChart: React.FunctionComponent = () => {
	const { data } = useGetActivitiesQuery();
	const [chartAxis, setChartAxis] = React.useState({
		x: '',
		y: '',
	});

	if (data) {
		const activities = [...data?.getActivities];

		console.log(activities.length);

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

		const labels = activities
			.filter(activity => activity.distance >= 5000 && activity.distance <= 6000)
			.map(activity => {
				return formatDate(activity.start_date);
			});

		const datax: ChartData<keyof ChartTypeRegistry> = {
			labels,
			datasets: [
				{
					label: 'distance',
					data: activities
						.filter(activity => activity.distance >= 5000 && activity.distance <= 6000)
						.map(activity => {
							return activity.average_heartrate;
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
