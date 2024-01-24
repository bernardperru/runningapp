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

export interface IAxisType<T> {
	key: keyof T;
	title: string;
}

export interface IAxisType<T> {
	key: keyof T;
	title: string;
}

interface Props<T> {
	data: T[];
	y1: IAxisType<T>;
	y2: IAxisType<T>;
	x: IAxisType<T>;
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
	};

	const labels = [...data].sort((a, b) => (a[x.key] > b[x.key] ? 1 : -1)).map(obj => obj[x.key]);

	const datax: ChartData<'line'> = {
		labels,
		datasets: [
			{
				label: y1.title + ' over ' + x.title,
				data: [...data]
					.sort((a, b) => (a[x.key] > b[x.key] ? 1 : -1))
					.map(obj => {
						return obj[y1.key] as number;
					}),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
				yAxisID: y1.title,
			},
			{
				label: y2.title + ' over ' + x.title,
				data: [...data]
					.sort((a, b) => (a[x.key] > b[x.key] ? 1 : -1))
					.map(obj => {
						return obj[y2.key] as number;
					}),
				borderColor: 'rgb(233, 21, 21)',
				backgroundColor: 'rgba(233, 21, 21, 0.8)',
				yAxisID: y2.title,
			},
		],
	};

	return (
		<div className="h-3/4 w-3/4">
			<Line options={options} data={datax} />
		</div>
	);
}

export default Chart;
