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
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface IAxisType<T> {
	key: keyof T;
	title: string;
}

interface Props<T> {
	data: T[];
	y: IAxisType<T>;
	x: IAxisType<T>;
}

export function Chart<T>({ data, y, x }: Props<T>) {
	const options: any = {
		responsive: true,
		maintainAspectRatio: true,
		scaleShowValues: true,

		plugins: {
			legend: {
				position: 'top' as const,
			},
		},
	};

	const labels = data.map(obj => obj[x.key]);

	const datax: ChartData<keyof ChartTypeRegistry> = {
		labels,
		datasets: [
			{
				label: y.title,
				data: [...data]
					.sort((a, b) => (get(a, x.key) > get(b, x.key) ? 1 : -1))
					.map(obj => {
						return get(obj, y.key);
					}),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return (
		<div className="h-3/4 w-3/4 overflow-x-scroll">
			<Line options={options} data={datax as ChartData<'line'>} />
		</div>
	);
}

export default Chart;
