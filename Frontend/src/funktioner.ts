import { Activity, StravaActivity } from './Activity';

//returns an array of week numbers - Used to iterate
export function getWeeks(activities: Activity[]) {
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

function weekNumber(start_date: StravaActivity['start_date']) {
	const currentDate = new Date(start_date);
	const startDate = new Date(currentDate.getFullYear(), 0, 1);
	const days = Math.floor((currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
	const weekNumber = Math.ceil(days / 7);

	return weekNumber;
}

export function formatStravaActivities(activity: StravaActivity): Activity {
	return {
		...activity,
		week: weekNumber(activity.start_date),
		zone: zone(activity.average_heartrate),
	};
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
export function average(
	key: keyof Activity,
	week: number,
	activities: Activity[],
	type: 'avg' | 'sum' | 'none'
): number {
	let accumulator = 0;
	let i = 0;
	activities.map(activity => {
		const temp = activity[key];
		if (activity.week === week && typeof temp === 'number') {
			accumulator += temp;
			i++;
		}
	});

	if (type === 'avg') {
		return accumulator / i;
	}
	return accumulator;
}

export function format<T extends keyof Activity>(key: T, value: Activity[T]) {
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
			if (typeof value === 'number' || typeof value === 'string') {
				const date = new Date(value);
				return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
			}
			return value.toString();
		case 'map':
			return 'map';
		default:
			return value.toString();
	}
}
