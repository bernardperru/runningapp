export function averageOrSum(value: number, denominator: number, type: string): number {
	if (type === 'avg') {
		return value / denominator;
	}
	return value;
}

export function getCurrentWeekAndYear(): { week: number; year: number } {
	const today = new Date();

	const oneDay = 24 * 60 * 60 * 1000;
	const firstThursday = new Date(today.getFullYear(), 0, 4); // Set to a Thursday

	// Adjust to Thursday in the same week
	firstThursday.setDate(
		firstThursday.getDate() - (firstThursday.getDay() === 4 ? 0 : (firstThursday.getDay() || 7) - 4)
	);

	const daysSinceStart = Math.floor((today.getTime() - firstThursday.getTime()) / oneDay) + 1;
	const weekNumber = Math.ceil(daysSinceStart / 7);

	return { week: weekNumber, year: today.getFullYear() };
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

export function formatDate(value: string) {
	const date = new Date(value);
	return date.toDateString();
}

export function formatTime(value: number): string {
	const hours = Math.floor(value / 3600);
	const newValue = value - hours * 3600;
	const minutes = Math.floor(newValue / 60);
	const seconds = newValue - minutes * 60;
	return addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + '';
}
