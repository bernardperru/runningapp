import { GQLActivity } from '../graphql';

//returns an array of week numbers - Used to iterate
export function getWeeks(activities: GQLActivity[]) {
	const activitiesWithWeek = activities.map(activity => {
		const currentDate = new Date(activity['start_date']);
		const startDate = new Date(currentDate.getFullYear(), 0, 1);

		const days = Math.floor((currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));

		const weekNumber = Math.ceil(days / 7);

		return weekNumber;
	});

	let uniqueWeeks: number[] = [];

	activitiesWithWeek.forEach(x => {
		if (!uniqueWeeks.includes(x)) {
			uniqueWeeks.push(x);
		}
	});

	return uniqueWeeks;
}

//Averages ou
export function averageOrSum(value: number, denominator: number, type: string): number {
	if (type === 'avg') {
		return value / denominator;
	}
	return value;
}

function addZero(value: number): string {
	if (value < 10) {
		return '0' + value.toString();
	}
	return value.toString();
}

export function format(key: string, value: string | number) {
	switch (key) {
		case 'distance':
			return (parseFloat(value.toString()) / 1000).toFixed(2) + ' km';
		case 'average_cadence':
			return parseFloat(value.toString()).toFixed(0) + ' spm';
		case 'elapsed_time':
			const hours = Math.floor(parseFloat(value.toString()) / 3600);
			const newValue = parseFloat(value.toString()) - hours * 3600;
			const minutes = Math.floor(newValue / 60);
			const seconds = newValue - minutes * 60;
			return addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + '';
		case 'average_heartrate':
			return parseFloat(value.toString()).toFixed(0) + ' bpm';
		case 'start_date':
			const date = new Date(value);
			return date.toDateString();
		case 'summary_polyline':
			return '';
		case 'average_pace':
			return value;
		default:
			return value;
	}
}

export function formatWeek(key: string, value: string | number) {
	switch (key) {
		case 'distance':
			return (parseFloat(value.toString()) / 1000).toFixed(2) + ' km';
		case 'cadence':
			return parseFloat(value.toString()).toFixed(0) + ' spm';
		case 'time':
			const hours = Math.floor(parseFloat(value.toString()) / 3600);
			const newValue = parseFloat(value.toString()) - hours * 3600;
			const minutes = Math.floor(newValue / 60);
			const seconds = newValue - minutes * 60;
			return addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + '';
		case 'heartrate':
			return parseFloat(value.toString()).toFixed(0) + ' bpm';
		case 'pace':
			return value;
		default:
			return value;
	}
}
export function formatDate(value: string) {
	const date = new Date(value);
	return date.toDateString();
}
