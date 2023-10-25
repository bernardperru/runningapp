import { GQLActivity } from './graphql';

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

	activitiesWithWeek.map(x => {
		if (!uniqueWeeks.includes(x)) {
			uniqueWeeks.push(x);
		}
	});

	return uniqueWeeks;
}

function weekNumber(start_date: GQLActivity['start_date']) {
	const currentDate = new Date(start_date);
	const startDate = new Date(currentDate.getFullYear(), 0, 1);
	const days = Math.floor((currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
	const weekNumber = Math.ceil(days / 7);

	return weekNumber;
}

//Chooses zone based on heartrate -- Currently static, but can be based on % of max heartrate
function zone(heartRate: number) {
	if (98 <= heartRate && heartRate <= 116) {
		return 1;
	} else if (117 <= heartRate && heartRate <= 136) {
		return 2;
	} else if (137 <= heartRate && heartRate <= 155) {
		return 3;
	} else if (156 <= heartRate && heartRate <= 175) {
		return 4;
	} else if (175 < heartRate) {
		return 5;
	} else {
		return 0;
	}
}

//Averages ou
// export function average(
// 	key: keyof Omit<GQLActivity, '__typename | map | id | start_date'>,
// 	week: number,
// 	activities: GQLActivity[],
// 	type: 'avg' | 'sum' | 'none'
// ): number {
// 	let accumulator = 0;
// 	let i = 0;
// 	activities.map(activity => {
// 		const temp = activity[key];
// 		if (activity.week === week && typeof temp === 'number') {
// 			accumulator += temp;
// 			i++;
// 		}
// 	});

// 	if (type === 'avg') {
// 		return accumulator / i;
// 	}
// 	return accumulator;
// }

export function format(key: keyof GQLActivity, value: number | string) {
	console.log(key + value);

	switch (key) {
		case 'distance':
			return (parseFloat(value.toString()) / 1000).toFixed(2) + ' km';
		case 'average_cadence':
			return (parseFloat(value.toString()) * 2).toFixed(0) + ' spm';
		case 'elapsed_time':
			const hours = Math.floor(parseFloat(value.toString()) / 3600);
			const newValue = parseFloat(value.toString()) - hours * 3600;
			const minutes = Math.floor(newValue / 60);
			const seconds = newValue - minutes * 60;
			return hours + ':' + minutes + ':' + seconds.toFixed(0) + '';
		case 'average_heartrate':
			return parseFloat(value.toString()).toFixed(0) + ' bpm';
		case 'start_date':
			const date = new Date(value);
			return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
		case 'map':
			return 'map';
		default:
			return value.toString();
	}
}
