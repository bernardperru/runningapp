import { get } from 'lodash';

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

export interface IAxis<T> {
	key: string;
	title: string;
}

interface Props<T> {
	data: T[];
	x: string;
}

export function Chart<T>({ data, x }: Props<T>) {
	// const { data } = useGetWeeksQuery();

	const options: any = {
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

	const labels = data.map(obj => get(obj, 'week'));

	const datax: ChartData<keyof ChartTypeRegistry> = {
		labels,
		datasets: [
			{
				label: 'distance',
				data: data.map(obj => {
					return get(obj, x);
				}),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return <Line options={options} data={datax as ChartData<'line'>}></Line>;
}

export default Chart;
