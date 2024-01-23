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
	y: IAxisType<T>[];
	x: IAxisType<T>;
}

export function Chart<T>({ data, y, x }: Props<T>) {
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
		datasets: y.map(axis => {
			return {
				label: axis.title + ' over ' + x.title,
				data: [...data]
					.sort((a, b) => (a[x.key] > b[x.key] ? 1 : -1))
					.map(obj => {
						return obj[axis.key] as number;
					}),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
				yAxisID: axis.title,
			};
		}),
	};

	return (
		<div className="h-3/4 w-3/4">
			<Line options={options} data={datax} />
		</div>
	);
}

export default Chart;
