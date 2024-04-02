import { AxisType } from '../../utils';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
	LogarithmicScale,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LogarithmicScale, Title, Tooltip, Legend);

interface Props<T> {
	data: T[];
	y1: keyof T;
	y2: keyof T;
	x: keyof T;
}

export function Chart<T>({ data, y1, y2, x }: Props<T>) {
	const options: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
		},
		scales: {
			yRight: {
				position: 'right',
			},
			yLeft: {
				position: 'left',
			},
		},
	};

	if (!data) {
		return <div>no data</div>;
	}

	const labels = [...data].sort((a, b) => (a[x] > b[x] ? 1 : -1)).map(obj => obj[x]);

	const datax: ChartData<'line'> = {
		labels,
		datasets: [
			{
				label: '1',
				data: [...data]
					.sort((a, b) => (a[x] > b[x] ? 1 : -1))
					.map(obj => {
						return obj[y1] as number;
					}),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
				yAxisID: 'yLeft',
			},
			{
				label: '2',
				data: [...data]
					.sort((a, b) => (a[x] > b[x] ? 1 : -1))
					.map(obj => {
						return obj[y2] as number;
					}),
				borderColor: 'rgba(215, 17, 17, 0.8)',
				backgroundColor: 'rgba(215, 17, 17, 0.8)',
				yAxisID: 'yRight',
			},
		],
	};

	return <Line options={options} data={datax} />;
}

export default Chart;
