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
	y: string;
	x: string;
}

export function Chart<T>({ data, y, x }: Props<T>) {
	const options: any = {
		responsive: true,
		maintainAspectRatio: true,
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

	// const sortedData = data.sort((a, b) => get(a, x) - get(b, x));
	const labels = data.map(obj => get(obj, x));

	const datax: ChartData<keyof ChartTypeRegistry> = {
		labels,
		datasets: [
			{
				label: y,
				data: data.map(obj => {
					return get(obj, y);
				}),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return (
		<div className="w-3/4">
			<Line options={options} data={datax as ChartData<'line'>} />
		</div>
	);
}

export default Chart;
