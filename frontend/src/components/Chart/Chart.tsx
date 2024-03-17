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
	data?: T[];
	yLeft: AxisType<T>;
	yRight: AxisType<T>;
	x: AxisType<T>;
}

export function Chart<T>({ data, yLeft, yRight, x }: Props<T>) {
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

	const labels = [...data].sort((a, b) => (a[x.key] > b[x.key] ? 1 : -1)).map(obj => obj[x.key]);

	const datax: ChartData<'line'> = {
		labels,
		datasets: [
			{
				label: yLeft.title,
				data: [...data]
					.sort((a, b) => (a[x.key] > b[x.key] ? 1 : -1))
					.map(obj => {
						return obj[yLeft.key] as number;
					}),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: yLeft.color ? yLeft.color : 'rgba(53, 162, 235, 0.5)',
				yAxisID: 'yLeft',
			},
			{
				label: yRight.title,
				data: [...data]
					.sort((a, b) => (a[x.key] > b[x.key] ? 1 : -1))
					.map(obj => {
						return obj[yRight.key] as number;
					}),
				borderColor: 'rgba(215, 17, 17, 0.8)',
				backgroundColor: yRight.color ? yRight.color : 'rgba(215, 17, 17, 0.8)',
				yAxisID: 'yRight',
			},
		],
	};

	return <Line options={options} data={datax} />;
}

export default Chart;
